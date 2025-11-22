"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="size-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="size-5 text-destructive" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold text-destructive">
                Erro ao carregar componente
              </h3>
              <p className="text-sm text-muted-foreground">
                Este componente encontrou um erro e não pôde ser exibido. Você pode tentar recarregar.
              </p>
              {process.env.NODE_ENV === "development" && this.state.error && (
                <Card className="p-3 bg-muted">
                  <p className="text-xs font-mono text-destructive break-all">
                    {this.state.error.message}
                  </p>
                </Card>
              )}
            </div>
          </div>
          <Button
            onClick={this.handleReset}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RefreshCw className="size-4 mr-2" />
            Tentar Novamente
          </Button>
        </Card>
      );
    }

    return this.props.children;
  }
}
