"use client";

import { useState } from "react";
import { History } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DiffView } from "@/components/ui/diff-view";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Version {
  id: string;
  content: string;
  createdAt: Date;
  label?: string;
}

interface VersionCompareDialogProps {
  versions: Version[];
  currentVersion?: string;
  title?: string;
}

/**
 * Dialog for comparing different versions of content
 * Allows selecting two versions to compare side-by-side
 */
export function VersionCompareDialog({
  versions,
  currentVersion: _currentVersion,
  title = "Comparar Versões",
}: VersionCompareDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedOldVersion, setSelectedOldVersion] = useState<string>(
    versions.length > 1 ? versions[versions.length - 2].id : versions[0]?.id || ""
  );
  const [selectedNewVersion, setSelectedNewVersion] = useState<string>(
    versions[0]?.id || ""
  );

  const oldVersion = versions.find((v) => v.id === selectedOldVersion);
  const newVersion = versions.find((v) => v.id === selectedNewVersion);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (versions.length === 0) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <History className="size-4" />
          <span className="hidden sm:inline">Comparar Versões</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="size-5" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Selecione duas versões para comparar as diferenças
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Version Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Versão Anterior</label>
              <Select value={selectedOldVersion} onValueChange={setSelectedOldVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.label || formatDate(version.createdAt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Versão Atual</label>
              <Select value={selectedNewVersion} onValueChange={setSelectedNewVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.label || formatDate(version.createdAt)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Diff View */}
          {oldVersion && newVersion && (
            <DiffView
              oldText={oldVersion.content}
              newText={newVersion.content}
              oldLabel={oldVersion.label || formatDate(oldVersion.createdAt)}
              newLabel={newVersion.label || formatDate(newVersion.createdAt)}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
