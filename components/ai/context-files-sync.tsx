"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle, FileText, RefreshCw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc/client";

interface ContextFile {
  name: string;
  path: string;
  lastModified: Date;
  size: number;
}

interface ContextFilesSyncProps {
  className?: string;
}

/**
 * Component to detect and sync context files changes
 * Shows notification when context files are updated
 */
export function ContextFilesSync({ className }: ContextFilesSyncProps) {
  const [_files, setFiles] = useState<ContextFile[]>([]);
  const [outdatedFiles, setOutdatedFiles] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const { data: syncStatus, isError } = trpc.contextSync.getStatus.useQuery(undefined, {
    refetchInterval: 5 * 60 * 1000, // Refetch a cada 5 minutos
    retry: false,
    refetchOnWindowFocus: false,
  });
  const updateLastSync = trpc.contextSync.updateLastSync.useMutation();
  const dismissFiles = trpc.contextSync.dismissFiles.useMutation();
  const utils = trpc.useUtils();

  useEffect(() => {
    checkContextFiles();
  }, []);

  const checkContextFiles = async () => {
    try {
      // TODO: Implementar API /api/context-files/status
      // Temporariamente desabilitado para evitar 404s
      return;
      
      // Check if context files have changed
      // const response = await fetch("/api/context-files/status");
      // 
      // if (!response.ok) return;
      // 
      // const data = await response.json();
      // 
      // setFiles(data.files || []);
      // 
      // const outdated = (data.files || [])
      //   .filter((file: ContextFile) => syncStatus && new Date(file.lastModified) > new Date(syncStatus.lastSyncAt))
      //   .map((file: ContextFile) => file.name);
      // 
      // setOutdatedFiles(outdated);
      // setVisible(outdated.length > 0);
    } catch (error) {
      console.error("Erro ao verificar context files:", error);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    setSyncProgress(0);

    try {
      // Simulate sync progress
      const progressInterval = setInterval(() => {
        setSyncProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      // Trigger AI to re-process context files
      const response = await fetch("/api/context-files/sync", {
        method: "POST",
      });

      clearInterval(progressInterval);
      setSyncProgress(100);

      if (response.ok) {
        // Update last sync time no banco de dados ou localStorage
        if (!isError) {
          updateLastSync.mutate(undefined, {
            onSuccess: () => {
              utils.contextSync.getStatus.invalidate();
              finalizeSyncSuccess();
            },
          });
        } else {
          // Fallback para localStorage
          localStorage.setItem("context-files-last-sync", JSON.stringify(new Date()));
          finalizeSyncSuccess();
        }
      } else {
        throw new Error("Erro ao sincronizar");
      }
    } catch (error) {
      console.error("Erro ao sincronizar:", error);
      setSyncing(false);
      setSyncProgress(0);
    }
  };

  const finalizeSyncSuccess = () => {
    setTimeout(() => {
      setOutdatedFiles([]);
      setVisible(false);
      setSyncing(false);
      setSyncProgress(0);
    }, 1000);
  };

  const handleDismiss = () => {
    // Mark as seen but don't update sync time
    if (!isError) {
      dismissFiles.mutate(
        { files: outdatedFiles },
        {
          onSuccess: () => {
            utils.contextSync.getStatus.invalidate();
            setVisible(false);
          },
        }
      );
    } else {
      // Fallback para localStorage
      localStorage.setItem(
        "context-files-dismissed",
        JSON.stringify({ files: outdatedFiles, date: new Date() })
      );
      setVisible(false);
    }
  };

  if (!visible || outdatedFiles.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={cn("fixed bottom-4 right-4 z-50 w-96", className)}
      >
        <Card className="p-4 shadow-lg border-orange-500 bg-orange-500/10">
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {syncing ? (
                <RefreshCw className="size-5 text-orange-500 animate-spin" />
              ) : (
                <AlertCircle className="size-5 text-orange-500" />
              )}
            </div>

            <div className="flex-1 space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">
                    Context Files Atualizados
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDismiss}
                    disabled={syncing}
                    className="h-6 w-6 p-0 hover:bg-background/80"
                  >
                    <X className="size-3" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {outdatedFiles.length} {outdatedFiles.length === 1 ? "arquivo foi atualizado" : "arquivos foram atualizados"}
                </p>
              </div>

              <div className="space-y-2">
                {outdatedFiles.slice(0, 3).map((file) => (
                  <div key={file} className="flex items-center gap-2 text-xs">
                    <FileText className="size-3 text-muted-foreground" />
                    <span className="truncate">{file}</span>
                  </div>
                ))}
                {outdatedFiles.length > 3 && (
                  <p className="text-xs text-muted-foreground">
                    +{outdatedFiles.length - 3} outros arquivos
                  </p>
                )}
              </div>

              {syncing && (
                <div className="space-y-2">
                  <Progress value={syncProgress} className="h-2" />
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    {syncProgress < 100 ? (
                      <>
                        <RefreshCw className="size-3 animate-spin" />
                        Sincronizando...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="size-3 text-green-500" />
                        Concluído!
                      </>
                    )}
                  </div>
                </div>
              )}

              {!syncing && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSync}
                    className="flex-1 h-8 text-xs"
                  >
                    <RefreshCw className="size-3 mr-1" />
                    Sincronizar Agora
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDismiss}
                    className="h-8 text-xs"
                  >
                    Depois
                  </Button>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                A IA usará os arquivos atualizados nas próximas gerações
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}
