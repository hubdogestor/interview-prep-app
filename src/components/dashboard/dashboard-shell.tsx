"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { trpc } from "@/lib/trpc/client";
import { placeholderProfileSummary, type ProfileSummary } from "@/types/profile";
import { ProfileCard } from "./profile-card";
import { Menu, X } from "lucide-react";
import {
  analytics,
  primaryNav,
  reviewChecklist,
  secondaryNav,
  statCards,
  timeline,
  transactions,
} from "./data";

const TIMER_DEFAULT_SECONDS = 25 * 60;

type CountdownControls = {
  seconds: number;
  running: boolean;
  toggle: () => void;
  reset: () => void;
};

function useCountdown(initialSeconds: number = TIMER_DEFAULT_SECONDS): CountdownControls {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    const id = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [running]);

  const toggle = () => setRunning((prev) => !prev);
  const reset = () => {
    setSeconds(initialSeconds);
    setRunning(false);
  };

  return { seconds, running, toggle, reset };
}

function formatSeconds(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function LanguageToggle() {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const handleToggle = () => setLanguage((prev) => (prev === "pt" ? "en" : "pt"));

  return (
    <Button variant="ghost" size="sm" className="rounded-full border border-border-subtle" onClick={handleToggle}>
      Idioma: <span className="font-semibold uppercase">{language}</span>
    </Button>
  );
}

type TimerWidgetProps = {
  className?: string;
};

function TimerWidget({ className }: TimerWidgetProps) {
  const countdown = useCountdown();
  const progress = useMemo(() => 1 - countdown.seconds / TIMER_DEFAULT_SECONDS, [countdown.seconds]);

  return (
    <div className={cn("flex items-center gap-3 rounded-2xl border border-border-subtle bg-bg-tertiary/60 p-3", className)}>
      <div className="relative h-12 w-12">
        <svg viewBox="0 0 36 36" className="h-12 w-12">
          <path
            className="text-border-subtle"
            strokeWidth="3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
            opacity={0.35}
          />
          <path
            className="text-brand-green"
            strokeWidth="3"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="M18 2a16 16 0 1 1 0 32 16 16 0 0 1 0-32z"
            strokeDasharray={100}
            strokeDashoffset={100 - Math.floor(progress * 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-text-primary">
          {formatSeconds(countdown.seconds)}
        </span>
      </div>
      <div className="flex flex-col gap-2 text-xs text-text-secondary">
        <span>Proxima sessao</span>
        <div className="flex gap-2">
          <Button size="sm" onClick={countdown.toggle}>
            {countdown.running ? "Pausar" : "Iniciar"}
          </Button>
          <Button variant="ghost" size="sm" onClick={countdown.reset}>
            Resetar
          </Button>
        </div>
      </div>
    </div>
  );
}

type DashboardSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

function DashboardSidebar({ className, onNavigate }: DashboardSidebarProps) {
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onNavigate?.();
  };

  return (
    <Card className={cn("dashboard-sidebar flex h-full flex-col gap-6", className)}>
      <div className="flex items-center gap-3">
        <Image
          src="/favicon-32x32.png"
          alt="Interview Prep logo"
          width={32}
          height={32}
          className="rounded-lg ring-2 ring-brand-green/40"
        />
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-green">Interview Prep</span>
          <p className="font-grotesk text-lg font-semibold text-text-primary">Interview Prep App</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {primaryNav.map((item) => (
          <a
            key={item.key}
            href={`/${item.key}`}
            onClick={handleNavClick}
            className={`sidebar-link ${item.active ? "sidebar-link-active" : ""}`}
          >
            <span className={`h-2 w-2 rounded-full ${item.active ? "bg-brand-green" : "bg-border-default"}`} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="mt-auto space-y-4">
        <div className="rounded-2xl border border-brand-blue/40 bg-brand-blue/10 p-4 text-sm text-brand-blue">
          <p className="font-sans font-semibold">Pronto para a proxima entrevista?</p>
          <p className="mt-2 text-xs text-text-secondary">
            Revise perguntas, pratique respostas e acompanhe seus indicadores.
          </p>
        </div>

        <div className="space-y-2">
          {secondaryNav.map((item) => (
            <Button
              key={item.key}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
              onClick={onNavigate}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}

type DashboardHeaderProps = {
  onToggleSidebar: () => void;
};

function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Card className="flex flex-col gap-4">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">Snapshot</span>
              <CardTitle className="mt-1 text-text-primary">Plano de estudo para a semana</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="flex items-center gap-2 rounded-full border border-border-subtle/60 bg-bg-tertiary/40 text-xs font-medium uppercase tracking-[0.25em] text-text-muted lg:hidden"
            >
              <Menu className="h-4 w-4" />
              Menu
            </Button>
          </div>
          <CardDescription>
            Resumo das atividades prioritarias e progresso das ultimas sessoes, atualizado em tempo real com os dados
            mais recentes.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap items-center gap-3 lg:justify-end">
          <Input placeholder="Buscar sessões, perguntas ou feedbacks..." className="w-full min-w-[240px] max-w-xs" />
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <TimerWidget className="w-full cursor-pointer transition hover:border-brand-green/60 sm:w-auto" />
                </div>
              </TooltipTrigger>
              <TooltipContent>Contagem regressiva de foco (25 minutos)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <LanguageToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="rounded-full">
                Acoes rapidas
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Atalhos</DropdownMenuLabel>
              <DropdownMenuItem>Iniciar modo pratica</DropdownMenuItem>
              <DropdownMenuItem>Carregar ultimo feedback</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Exportar progresso</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogTrigger asChild>
            <Button size="sm">Adicionar tarefa</Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar tarefa rapida</DialogTitle>
          <DialogDescription>
            Defina um lembrete basico para incluir no seu plano de estudo. Este stub sera integrado ao banco na Fase 2.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm">
            <span className="text-text-secondary">Titulo</span>
            <input
              type="text"
              placeholder="Ex: Revisar perguntas de comportamento"
              className="rounded-xl border border-border-subtle bg-bg-tertiary/60 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/40"
            />
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-text-secondary">Descricao</span>
            <textarea
              rows={3}
              placeholder="Adicione detalhes ou links importantes."
              className="rounded-xl border border-border-subtle bg-bg-tertiary/60 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/40"
            />
          </label>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDialogOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={() => setDialogOpen(false)}>Salvar stub</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function StatOverview() {
  return (
    <section className="panel-grid">
      {statCards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </section>
  );
}

function WeeklyChecklist() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
            Checklist da semana
          </span>
          <CardTitle className="mt-2 text-lg">Prioridades para estudar</CardTitle>
        </div>
        <Button variant="ghost" size="sm">
          Ver plano completo
        </Button>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {reviewChecklist.map((item) => (
            <li key={item.title} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-green/10 font-semibold text-brand-green">
                  {item.type === "voice" ? "AI" : "TO"}
                </span>
                <div>
                  <p className="font-sans text-sm text-text-primary">{item.title}</p>
                  <p className="text-xs text-text-muted">
                    {item.type === "voice" ? "Sessao guiada por voz" : "Tarefa de estudo"}
                  </p>
                </div>
              </div>
              <Badge variant={item.type === "voice" ? "success" : "default"}>
                {item.type === "voice" ? "Voice AI" : "Deep dive"}
              </Badge>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-blue/20 via-brand-green/15 to-brand-lime/20 p-6 text-sm text-text-primary">
          <p className="font-sans font-semibold">Insight do coach virtual</p>
          <p className="mt-2 text-text-secondary">
            Explore respostas narrativas com o framework STAR e destaque um resultado mensuravel por historia.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionsPanel() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">Fluxo financeiro</span>
          <CardTitle className="mt-2 text-lg">Transacoes recentes</CardTitle>
        </div>
        <Button variant="ghost" size="sm" type="button">
          Ver tudo
        </Button>
      </CardHeader>
      <CardContent className="gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.name}
            className="flex items-center justify-between rounded-2xl border border-border-subtle/70 bg-bg-tertiary/60 px-4 py-3"
          >
            <div>
              <p className="font-sans text-sm text-text-primary">{transaction.name}</p>
              <p className="text-xs text-text-muted">{transaction.date}</p>
            </div>
            <span
              className={`font-mono text-sm font-semibold ${
                transaction.amount.startsWith("+") ? "trend-positive" : "trend-negative"
              }`}
            >
              {transaction.amount}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function CompetencyAnalysis() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">
            Analise de competencias
          </span>
          <CardTitle className="mt-2 text-lg">Trilha Interview Prep</CardTitle>
        </div>
        <Badge variant="success" className="text-xs normal-case">
          Atualizado hoje
        </Badge>
      </CardHeader>
      <CardContent className="space-y-5">
        {analytics.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <p>{item.label}</p>
              <p>{item.value}%</p>
            </div>
            <div className="mt-2 h-2 rounded-full bg-border-subtle">
              <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-3 rounded-2xl border border-brand-blue/30 bg-brand-blue/10 p-5">
        <span className="text-xs uppercase tracking-[0.35em] text-brand-blue">Insight</span>
        <p className="text-sm text-text-secondary">
          Foque em tecnicas de storytelling para reforcar respostas de cultura da empresa.
        </p>
      </CardFooter>
    </Card>
  );
}

function PerformanceSummary() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">Desempenho geral</span>
          <CardTitle className="mt-2 text-lg">Evolucao do preparo</CardTitle>
        </div>
        <Badge className="bg-brand-blue/20 text-brand-blue">+12% nas ultimas 2 semanas</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {timeline.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div>
              <p className="font-sans text-sm text-text-primary">{item.label}</p>
              <p className="text-xs text-text-muted">Feedback recente</p>
            </div>
            <span className={`font-semibold ${item.tone === "positive" ? "trend-positive" : "trend-warning"}`}>
              {item.value}%
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-start gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/10 p-5">
        <span className="text-xs uppercase tracking-[0.35em] text-brand-green">Proximo passo</span>
        <p className="text-sm text-text-secondary">
          Reforce respostas tecnicas com dados concretos de impacto e resultados.
        </p>
      </CardFooter>
    </Card>
  );
}

function AnalyticsGrid() {
  return (
    <section className="analytics-grid">
      <PerformanceSummary />
      <WeeklyChecklist />
      <TransactionsPanel />
      <CompetencyAnalysis />
    </section>
  );
}

type StatCardProps = (typeof statCards)[number];

function StatCard({ amount, change, gradientId, gradientStops, label, path, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">{label}</span>
          <CardTitle className="text-lg text-text-primary">{amount}</CardTitle>
        </div>
        <Badge variant={trend === "positive" ? "success" : "warning"} className="text-xs normal-case">
          {change}
        </Badge>
      </CardHeader>
      <CardContent className="mt-4">
        <svg viewBox="0 0 320 80" className="h-20 w-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
              {gradientStops.map((stop) => (
                <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} />
              ))}
            </linearGradient>
          </defs>
          <path d={path} stroke={`url(#${gradientId})`} strokeWidth="6" fill="none" strokeLinecap="round" />
        </svg>
      </CardContent>
    </Card>
  );
}

function DashboardFooter() {
  const actions = [
    {
      label: "Completar card de perfil",
      description: "Conecte dados do Prisma e finalize contatos principais.",
    },
    {
      label: "Validar breakpoints",
      description: "Revise o comportamento em 1280 / 1024 / 768 / 390 px antes da próxima sessão.",
    },
    {
      label: "Esboçar página 404",
      description: "Escreva mensagens-chave e links de escape para a versão final.",
    },
    {
      label: "Listar animações Framer",
      description: "Mapeie componentes que receberão transições suaves.",
    },
  ];

  return (
    <footer>
      <Card className="border-border-subtle/60 bg-bg-secondary/90 backdrop-blur">
        <CardHeader className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted">Encerramento</span>
          <CardTitle className="text-text-primary">Checklist rápido antes de fechar a sessão</CardTitle>
          <CardDescription>
            Um lembrete visual dos próximos passos para que nada importante fique para depois.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {actions.map((action) => (
              <div
                key={action.label}
                className="rounded-2xl border border-border-subtle/60 bg-bg-tertiary/50 p-4 shadow-sm shadow-black/10"
              >
                <p className="font-sans text-sm text-text-primary">{action.label}</p>
                <p className="mt-1 text-xs text-text-muted">{action.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle/40 bg-bg-tertiary/30 px-6 py-4 text-xs text-text-muted">
          <span className="max-w-xl">
            Mantenha o alinhamento registrando o progresso em <code className="font-mono text-brand-blue">todo29-10.md</code> e
            anotando aprendizados rápidos ao final de cada dia.
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://github.com/seu-github-username/interview-prep-app/blob/main/todo29-10.md" target="_blank">
                Abrir TODO
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild>
              <a href="mailto:leonardo@example.com">Enviar atualização</a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </footer>
  );
}

type DashboardMainProps = {
  profile: ProfileSummary;
  profileLoading: boolean;
  onToggleSidebar: () => void;
};

function DashboardMain({ profile, profileLoading, onToggleSidebar }: DashboardMainProps) {
  return (
    <main className="flex flex-col gap-6">
      <DashboardHeader onToggleSidebar={onToggleSidebar} />
      <ProfileCard profile={profile} isLoading={profileLoading} />
      <StatOverview />
      <AnalyticsGrid />
      <DashboardFooter />
    </main>
  );
}

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

function MobileSidebar({ open, onClose, children }: MobileSidebarProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto flex h-full w-72 max-w-[85%] flex-col overflow-y-auto border-l border-border-subtle bg-bg-secondary/95 p-6 shadow-2xl shadow-black/40">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">Navegação</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-border-subtle/60"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    data: profileData,
    isLoading: profileLoading,
  } = trpc.profile.summary.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const profile = profileData ?? placeholderProfileSummary;

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:grid lg:grid-cols-[260px,1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <DashboardSidebar />
        </aside>
        <DashboardMain
          profile={profile}
          profileLoading={profileLoading}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
      </div>
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <DashboardSidebar onNavigate={() => setSidebarOpen(false)} className="shadow-none" />
      </MobileSidebar>
    </div>
  );
}

export default DashboardShell;
