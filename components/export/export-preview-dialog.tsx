"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Download, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExportPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  markdown: string;
  filename: string;
  onDownload: () => void;
}

export function ExportPreviewDialog({
  open,
  onOpenChange,
  markdown,
  filename,
  onDownload,
}: ExportPreviewDialogProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview: {filename}.md
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "preview" | "raw")} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="raw">Markdown</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="flex-1 overflow-auto border rounded-lg p-6 mt-4">
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{markdown}</ReactMarkdown>
            </div>
          </TabsContent>

          <TabsContent value="raw" className="flex-1 overflow-auto mt-4">
            <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto h-full">
              <code>{markdown}</code>
            </pre>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Markdown
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
