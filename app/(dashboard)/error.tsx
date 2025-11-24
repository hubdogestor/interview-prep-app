"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error boundary:", error);
  }, [error]);

  return (
    <div className="h-full flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 space-y-6 text-center border-dashed">
        <div className="flex justify-center">
          <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="size-8 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Erro no Dashboard</h2>
          <p className="text-muted-foreground">
            Não foi possível carregar este conteúdo.
          </p>
        </div>

        {process.env.NODE_ENV === "development" && (
          <Card className="p-4 bg-muted text-left">
            <p className="text-xs font-mono break-all text-destructive">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-muted-foreground mt-2">
                Digest: {error.digest}
              </p>
            )}
          </Card>
        )}

        <div className="flex gap-3 justify-center">
          <Button onClick={reset} variant="default">
            Tentar Novamente
          </Button>
        </div>
      </Card>
    </div>
  );
}
