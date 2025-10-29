"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo, type ReactNode } from "react";
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
import { LanguageToggle } from "./LanguageToggle";
import { TimerWidget } from "./TimerWidget";
import { StatCard } from "./StatCard";
import { Menu, X, ChevronDown, Search } from "lucide-react";
import {
  analytics,
  primaryNav,
  reviewChecklist,
  secondaryNav,
  statCards,
  timeline,
  transactions,
} from "./data";

// Memoized components for better performance
const DashboardSidebar = React.memo<DashboardSidebarProps>(({ className, onNavigate }) => {
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
            className={cn(
              "sidebar-link group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-200 hover:bg-brand-green/10 focus:ring-2 focus:ring-brand-green/40 focus:outline-none",
              item.active && "bg-brand-green/20 text-brand-green shadow-sm"
            )}
          >
            <span className={cn(
              "h-2 w-2 rounded-full transition-colors duration-200",
              item.active ? "bg-brand-green" : "bg-border-default group-hover:bg-brand-green/60"
            )} />
            <span className="font-medium">{item.label}</span>
            {item.badge && (
              <Badge variant="outline" className="ml-auto text-[10px]">
                {item.badge}
              </Badge>
            )}
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
              className="w-full justify-start hover:bg-brand-green/10 focus:ring-2 focus:ring-brand-green/40 focus:outline-none"
              onClick={onNavigate}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
});

DashboardSidebar.displayName = "DashboardSidebar";

type DashboardSidebarProps = {
  className?: string;
  onNavigate?: () => void;
};

// Loading skeleton components
function StatOverviewSkeleton() {
  return (
    <section className="panel-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-4 w-20 bg-border-subtle/30 rounded" />
            <div className="h-6 w-16 bg-border-subtle/20 rounded" />
          </CardHeader>
          <CardContent>
            <div className="h-20 w-full bg-border-subtle/10 rounded" />
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

function AnalyticsGridSkeleton() {
  return (
    <section className="analytics-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="h-4 w-32 bg-border-subtle/30 rounded" />
            <div className="h-5 w-24 bg-border-subtle/20 rounded" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="space-y-2">
                <div className="h-3 w-full bg-border-subtle/10 rounded" />
                <div className="h-2 bg-border-subtle/5 rounded" />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

const StatOverview = React.memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <StatOverviewSkeleton />;

  return (
    <section className="panel-grid">
      {statCards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </section>
  );
});

StatOverview.displayName = "StatOverview";

const WeeklyChecklist = React.memo(() => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
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
});

WeeklyChecklist.displayName = "WeeklyChecklist";

const TransactionsPanel = React.memo(() => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
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
            className="flex items-center justify-between rounded-2xl border border-border-subtle/70 bg-bg-tertiary/60 px-4 py-3 transition-all duration-200 hover:border-brand-green/60 hover:shadow-sm"
          >
            <div>
              <p className="font-sans text-sm text-text-primary">{transaction.name}</p>
              <p className="text-xs text-text-muted">{transaction.date}</p>
            </div>
            <span
              className={`font-mono text-sm font-semibold transition-colors duration-200 ${
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
});

TransactionsPanel.displayName = "TransactionsPanel";

const CompetencyAnalysis = React.memo(() => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
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
            <div className="mt-2 h-2 rounded-full bg-border-subtle overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${item.color}`} 
                style={{ width: `${item.value}%` }}
              />
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
});

CompetencyAnalysis.displayName = "CompetencyAnalysis";

const PerformanceSummary = React.memo(() => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg">
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
            <span className={`font-semibold transition-colors duration-200 ${
              item.tone === "positive" ? "trend-positive" : "trend-warning"
            }`}>
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
});

PerformanceSummary.displayName = "PerformanceSummary";

const AnalyticsGrid = React.memo(() => {
  return (
    <section className="analytics-grid">
      <PerformanceSummary />
      <WeeklyChecklist />
      <TransactionsPanel />
      <CompetencyAnalysis />
    </section>
  );
});

AnalyticsGrid.displayName = "AnalyticsGrid";

// Header otimizado com altura reduzida
const DashboardHeader = React.memo<DashboardHeaderProps>(({ onToggleSidebar }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu mobile ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 px-3 sm:px-4 lg:px-6 xl:px-8",
        // Altura otimizada e mais compacta
        isScrolled ? "py-2" : "py-3 sm:py-4"
      )}>
        <div className={cn(
          "w-full rounded-2xl sm:rounded-3xl border border-border-subtle/40 bg-bg-secondary/95 px-3 sm:px-4 shadow-lg shadow-black/20 backdrop-blur transition-all duration-300",
          isScrolled ? "py-2.5" : "py-3 sm:py-4"
        )}>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:flex-nowrap">
            {/* Logo e menu button */}
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-border-subtle/60 lg:hidden focus:ring-2 focus:ring-brand-green/40"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Abrir menu de navegação"
                aria-expanded={isMobileMenuOpen}
                aria-haspopup="true"
              >
                <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              
              <Image
                src="/favicon-32x32.png"
                alt="Interview Prep logo"
                width={32}
                height={32}
                className="hidden rounded-lg ring-2 ring-brand-green/40 sm:block"
              />
              
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-brand-green">Interview Prep</span>
                  <Badge
                    variant="outline"
                    className="hidden px-2 py-0 text-[10px] uppercase tracking-[0.3em] text-text-muted sm:inline"
                  >
                    Dashboard
                  </Badge>
                </div>
                <p className="truncate text-xs sm:text-sm text-text-secondary">Plano de estudo para entrevistas com IA</p>
              </div>
            </div>
            
            {/* Search - responsivo */}
            <div className="hidden w-full flex-1 md:block lg:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
                <Input
                  placeholder="Buscar sessões, perguntas ou feedbacks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border-border-subtle/50 bg-bg-tertiary/60 pl-10 text-sm focus:ring-2 focus:ring-brand-green/40"
                />
              </div>
            </div>
            
            {/* Actions - responsivo */}
            <div className="flex items-center gap-2 lg:gap-3">
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="hidden sm:block">
                      <TimerWidget className="rounded-2xl border border-border-subtle/60 bg-bg-tertiary/60 px-2 transition hover:border-brand-green/60" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Contagem regressiva de foco (25 minutos)</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <LanguageToggle />
              
              {/* Desktop dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="hidden rounded-full lg:flex focus:ring-2 focus:ring-brand-green/40"
                  >
                    Ações rápidas
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Atalhos</DropdownMenuLabel>
                  <DropdownMenuItem>Iniciar modo prática</DropdownMenuItem>
                  <DropdownMenuItem>Carregar último feedback</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Exportar progresso</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                variant="secondary" 
                size="sm" 
                className="hidden sm:flex focus:ring-2 focus:ring-brand-green/40" 
                onClick={() => setDialogOpen(true)}
              >
                Nova tarefa
              </Button>

              {/* Timer para mobile */}
              <div className="block sm:hidden">
                <TimerWidget className="border-0 bg-transparent p-0" />
              </div>
            </div>
          </div>
          
          {/* Mobile search */}
          <div className="mt-3 block md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
              <Input
                placeholder="Buscar sessões, perguntas ou feedbacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border-border-subtle/50 bg-bg-tertiary/60 pl-10 text-sm focus:ring-2 focus:ring-brand-green/40"
              />
            </div>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div 
            className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85%] overflow-y-auto border-r border-border-subtle bg-bg-secondary/95 p-6 shadow-2xl shadow-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/favicon-32x32.png"
                  alt="Interview Prep logo"
                  width={32}
                  height={32}
                  className="rounded-lg ring-2 ring-brand-green/40"
                />
                <span className="text-sm font-semibold text-text-primary">Menu</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border border-border-subtle/60 focus:ring-2 focus:ring-brand-green/40"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DashboardSidebar onNavigate={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
      
      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar tarefa rápida</DialogTitle>
            <DialogDescription>
              Defina um lembrete básico para incluir no seu plano de estudo. Este stub será integrado ao banco na Fase 2.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm">
              <span className="text-text-secondary">Título</span>
              <input
                type="text"
                placeholder="Ex: Revisar perguntas de comportamento"
                className="rounded-xl border border-border-subtle bg-bg-tertiary/60 px-3 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-green/40"
              />
            </label>
            <label className="grid gap-2 text-sm">
              <span className="text-text-secondary">Descrição</span>
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
    </>
  );
});

DashboardHeader.displayName = "DashboardHeader";

const DashboardFooter = React.memo(() => {
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
      description: "Mapeie componentes que receberam transições suaves.",
    },
  ];

  return (
    <footer>
      <Card className="border-border-subtle/60 bg-bg-secondary/90 backdrop-blur transition-all duration-300 hover:shadow-lg">
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
                className="rounded-2xl border border-border-subtle/60 bg-bg-tertiary/50 p-4 shadow-sm shadow-black/10 transition-all duration-200 hover:shadow-md hover:border-brand-green/40 focus-within:ring-2 focus-within:ring-brand-green/40"
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
            <Button variant="ghost" size="sm" asChild className="focus:ring-2 focus:ring-brand-green/40">
              <Link href="https://github.com/seu-github-username/interview-prep-app/blob/main/todo29-10.md" target="_blank">
                Abrir TODO
              </Link>
            </Button>
            <Button variant="secondary" size="sm" asChild className="focus:ring-2 focus:ring-brand-green/40">
              <a href="mailto:leonardo@example.com">Enviar atualização</a>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </footer>
  );
});

DashboardFooter.displayName = "DashboardFooter";

type DashboardMainProps = {
  profile: ProfileSummary;
  profileLoading: boolean;
};

const DashboardMain = React.memo<DashboardMainProps>(({ profile, profileLoading }) => {
  return (
    <main className="flex flex-col gap-6 lg:gap-8">
      <ProfileCard profile={profile} isLoading={profileLoading} />
      <StatOverview />
      <AnalyticsGrid />
      <DashboardFooter />
    </main>
  );
});

DashboardMain.displayName = "DashboardMain";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const MobileSidebar = React.memo<MobileSidebarProps>(({ open, onClose, children }) => {
  if (!open) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 z-50 w-72 max-w-[85%] overflow-y-auto border-l border-border-subtle bg-bg-secondary/95 p-6 shadow-2xl shadow-black/40 lg:hidden">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-text-primary">Navegação</span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-border-subtle/60 focus:ring-2 focus:ring-brand-green/40"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div onClick={onClose}>
          {children}
        </div>
      </div>
    </>
  );
});

MobileSidebar.displayName = "MobileSidebar";

export function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    data: profileData,
    isLoading: profileLoading,
  } = trpc.profile.summary.useQuery(undefined, {
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const profile = useMemo(
    () => profileData ?? placeholderProfileSummary,
    [profileData]
  );

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <DashboardHeader onToggleSidebar={() => setSidebarOpen(true)} />
      
      {/* Main content com espaçamento otimizado */}
      <div className={cn(
        "px-3 pb-12 transition-all duration-300 sm:px-4 lg:px-6 xl:px-8",
        // Espaçamento mais compacto mas ainda com respiro
        "pt-24 sm:pt-28 lg:pt-32 xl:pt-36"
      )}>
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 lg:grid lg:grid-cols-[260px,1fr] lg:gap-8 xl:gap-10">
          <aside className="hidden lg:block">
            <DashboardSidebar />
          </aside>
          <DashboardMain profile={profile} profileLoading={profileLoading} />
        </div>
      </div>
      
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <DashboardSidebar onNavigate={() => setSidebarOpen(false)} className="shadow-none" />
      </MobileSidebar>
    </div>
  );
}

export default DashboardShell;
