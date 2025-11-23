"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import DashboardPageLayout from "@/components/dashboard/layout";
import GearIcon from "@/components/icons/gear";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const [isClearing, setIsClearing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { toast } = useToast();

  const handleClearAllCards = async () => {
    setIsClearing(true);
    try {
      const response = await fetch("/api/admin/clear-cards", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "✅ Cards limpos com sucesso",
          description: `${data.deleted.kanbans} Kanbans e ${data.deleted.okrs} OKRs foram removidos.`,
        });
        
        // Recarregar página após 2 segundos
        setTimeout(() => {
          window.location.href = "/kanban-leo";
        }, 2000);
      } else {
        throw new Error(data.error || "Erro ao limpar cards");
      }
    } catch (error) {
      toast({
        title: "❌ Erro ao limpar cards",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    } finally {
      setIsClearing(false);
      setShowConfirm(false);
    }
  };

  return (
    <DashboardPageLayout
      header={{
        title: "Admin Settings",
        description: "Configurações administrativas do sistema",
        icon: GearIcon,
      }}
    >
      <section className="space-y-6">
        <div className="rounded-3xl border border-white/5 bg-background/70 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Gerenciamento de Dados</h2>
          
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/5 bg-background/40 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-red-500" />
                    Limpar Todos os Cards
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Remove todos os cards de Kanbans e OKRs. Use isso após atualizar o sistema
                    de flags para garantir que todos os cards usem a nova configuração.
                  </p>
                  <p className="text-xs text-orange-500 mt-2">
                    ⚠️ Esta ação não pode ser desfeita!
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setShowConfirm(true)}
                  disabled={isClearing}
                  className="shrink-0"
                >
                  {isClearing ? "Limpando..." : "Limpar Tudo"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/5 bg-background/70 p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Sistema de Flags</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              O sistema agora suporta flags personalizadas para categorizar cards:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><span className="text-primary">Novo</span> - Cards recém-criados</li>
              <li><span className="text-amber-400">OKR</span> - Objetivos e Key Results</li>
              <li><span className="text-red-400">Urgente</span> - Alta prioridade</li>
              <li><span className="text-orange-400">Importante</span> - Prioridade média</li>
              <li><span className="text-rose-400">Bug</span> - Correções necessárias</li>
              <li><span className="text-green-400">Feature</span> - Novas funcionalidades</li>
              <li><span className="text-blue-400">Melhoria</span> - Otimizações</li>
              <li><span className="text-purple-400">Pesquisa</span> - Investigação/estudos</li>
              <li><span className="text-gray-400">Bloqueado</span> - Impedimentos</li>
            </ul>
          </div>
        </div>
      </section>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ Confirmar Limpeza</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja <strong>excluir TODOS os cards</strong> de Kanbans e OKRs?
              <br /><br />
              Esta ação é <strong className="text-red-500">permanente e irreversível</strong>.
              <br /><br />
              Recomendamos fazer isso apenas após atualizar o sistema de flags.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClearAllCards}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sim, Limpar Tudo
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DashboardPageLayout>
  );
}
