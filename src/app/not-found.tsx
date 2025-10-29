import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[radial-gradient(circle_at_top,var(--color-blue)/12,transparent_55%),var(--bg-primary)] px-6 py-16 text-text-primary">
      <Card className="w-full max-w-xl border-border-subtle/60 bg-bg-secondary/95 p-8 shadow-2xl shadow-black/40 backdrop-blur">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Badge variant="outline" className="px-4 py-1 text-sm uppercase tracking-[0.3em] text-brand-blue">
              Erro 404
            </Badge>
          </div>
          <CardTitle className="text-3xl text-text-primary">Conteúdo não encontrado</CardTitle>
          <CardDescription className="text-base text-text-secondary">
            O recurso que você procurava não está pronto ainda. Volte para o dashboard ou acompanhe o protótipo visual
            enquanto finalizamos esta rota.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/">Voltar para o dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/design-test">Abrir protótipo de layout</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
