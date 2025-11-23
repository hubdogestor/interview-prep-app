"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  HelpCircle,
  Home,
  Loader2,
  MessageSquare,
  Mic,
  Plus,
  Search,
  Star,
  Target,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc/react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
  shortcut?: string;
  type?: "navigation" | "create" | "content";
  category?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Search queries with debounce
  const shouldSearch = search.length >= 2;
  
  const { data: icebreakers, isLoading: loadingIcebreakers } = trpc.icebreakers.list.useQuery(
    undefined,
    { enabled: shouldSearch && open }
  );
  
  const { data: speeches, isLoading: loadingSpeeches } = trpc.speeches.list.useQuery(
    undefined,
    { enabled: shouldSearch && open }
  );
  
  const { data: experiencias, isLoading: loadingExperiencias } = trpc.experiencias.list.useQuery(
    undefined,
    { enabled: shouldSearch && open }
  );
  
  const { data: competencias, isLoading: loadingCompetencias } = trpc.competencias.list.useQuery(
    undefined,
    { enabled: shouldSearch && open }
  );

  const isSearching = shouldSearch && (loadingIcebreakers || loadingSpeeches || loadingExperiencias || loadingCompetencias);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "home",
      label: "Dashboard",
      description: "Go to dashboard overview",
      icon: Home,
      action: () => router.push("/"),
      keywords: ["home", "dashboard", "overview"],
      shortcut: "Ctrl+H",
    },
    {
      id: "practice",
      label: "Histórico de Práticas",
      description: "View practice history and stats",
      icon: Target,
      action: () => router.push("/practice"),
      keywords: ["practice", "prática", "histórico"],
      shortcut: "Ctrl+P",
    },
    {
      id: "competencias",
      label: "Competências",
      description: "Manage your skills",
      icon: Star,
      action: () => router.push("/competencias"),
      keywords: ["skills", "competências"],
      shortcut: "Ctrl+Alt+C",
    },
    {
      id: "experiencias",
      label: "Experiências",
      description: "Manage your professional experiences",
      icon: Briefcase,
      action: () => router.push("/experiencias"),
      keywords: ["experience", "experiências", "star"],
      shortcut: "Ctrl+Alt+E",
    },
    {
      id: "icebreakers",
      label: "Icebreakers",
      description: "30-60 second introductions",
      icon: Mic,
      action: () => router.push("/icebreakers"),
      keywords: ["icebreaker", "introduction"],
    },
    {
      id: "speeches",
      label: "Speeches",
      description: "Professional narratives",
      icon: MessageSquare,
      action: () => router.push("/speeches"),
      keywords: ["speech", "narrative"],
    },
    {
      id: "questions",
      label: "Questions",
      description: "Questions for interviewers",
      icon: HelpCircle,
      action: () => router.push("/questions"),
      keywords: ["questions", "perguntas"],
    },
    // Quick create
    {
      id: "new-icebreaker",
      label: "Novo Icebreaker",
      description: "Create a new icebreaker",
      icon: Plus,
      action: () => router.push("/icebreakers/novo"),
      keywords: ["new", "create", "novo", "icebreaker"],
    },
    {
      id: "new-speech",
      label: "Novo Speech",
      description: "Create a new speech",
      icon: Plus,
      action: () => router.push("/speeches/novo"),
      keywords: ["new", "create", "novo", "speech"],
    },
    {
      id: "new-competencia",
      label: "Nova Competência",
      description: "Create a new skill",
      icon: Plus,
      action: () => router.push("/competencias/novo"),
      keywords: ["new", "create", "novo", "competência", "skill"],
    },
    {
      id: "new-experiencia",
      label: "Nova Experiência",
      description: "Create a new experience",
      icon: Plus,
      action: () => router.push("/experiencias/novo"),
      keywords: ["new", "create", "novo", "experiência", "experience"],
    },
    {
      id: "new-question",
      label: "Nova Question",
      description: "Create a new question",
      icon: Plus,
      action: () => router.push("/questions/new"),
      keywords: ["new", "create", "novo", "question", "pergunta"],
    },
  ];

  // Filter commands based on search
  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase();
    return (
      command.label.toLowerCase().includes(searchLower) ||
      command.description?.toLowerCase().includes(searchLower) ||
      command.keywords?.some((kw) => kw.toLowerCase().includes(searchLower))
    );
  });

  // Add content results if searching
  const contentResults: CommandItem[] = [];
  
  if (shouldSearch) {
    // Icebreakers
    icebreakers?.forEach((icebreaker) => {
      const searchLower = search.toLowerCase();
      if (
        icebreaker.titulo.toLowerCase().includes(searchLower) ||
        icebreaker.tipo.toLowerCase().includes(searchLower)
      ) {
        contentResults.push({
          id: `icebreaker-${icebreaker.id}`,
          label: icebreaker.titulo,
          description: `Icebreaker • ${icebreaker.tipo}`,
          icon: Mic,
          action: () => router.push(`/icebreakers/${icebreaker.id}`),
          type: "content",
          category: "Icebreakers",
        });
      }
    });

    // Speeches
    speeches?.forEach((speech) => {
      const searchLower = search.toLowerCase();
      if (
        speech.titulo.toLowerCase().includes(searchLower) ||
        speech.tipoVaga.toLowerCase().includes(searchLower) ||
        speech.foco?.some((f) => f.toLowerCase().includes(searchLower))
      ) {
        contentResults.push({
          id: `speech-${speech.id}`,
          label: speech.titulo,
          description: `Speech • ${speech.tipoVaga} • ${speech.duracaoEstimada}min`,
          icon: MessageSquare,
          action: () => router.push(`/speeches/${speech.id}`),
          type: "content",
          category: "Speeches",
        });
      }
    });

    // Experiências
    experiencias?.forEach((exp) => {
      const searchLower = search.toLowerCase();
      if (
        exp.empresa.toLowerCase().includes(searchLower) ||
        exp.cargo.toLowerCase().includes(searchLower) ||
        exp.starCases?.some((sc) => sc.situation.toLowerCase().includes(searchLower))
      ) {
        contentResults.push({
          id: `experiencia-${exp.id}`,
          label: `${exp.cargo} - ${exp.empresa}`,
          description: `Experiência • ${exp.periodo.inicio} - ${exp.periodo.fim || "Atual"}`,
          icon: Briefcase,
          action: () => router.push(`/experiencias/${exp.id}`),
          type: "content",
          category: "Experiências",
        });
      }
    });

    // Competências
    competencias?.forEach((comp) => {
      const searchLower = search.toLowerCase();
      if (
        comp.nome.toLowerCase().includes(searchLower) ||
        comp.categoria?.toLowerCase().includes(searchLower)
      ) {
        contentResults.push({
          id: `competencia-${comp.id}`,
          label: comp.nome,
          description: `Competência • ${comp.categoria || "Geral"} • ${comp.nivel}`,
          icon: Star,
          action: () => router.push(`/competencias/${comp.id}`),
          type: "content",
          category: "Competências",
        });
      }
    });
  }

  const allResults = [...filteredCommands, ...contentResults];

  // Keyboard shortcut to open (Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) =>
          i < allResults.length - 1 ? i + 1 : i
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const command = allResults[selectedIndex];
        if (command) {
          command.action();
          setOpen(false);
          setSearch("");
          setSelectedIndex(0);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, selectedIndex, allResults]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setSelectedIndex(0);
  };

  // Handle dialog close with state reset
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset state when closing
      setTimeout(() => {
        setSearch("");
        setSelectedIndex(0);
      }, 0);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4">
          <Search className="size-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Buscar comandos, icebreakers, speeches, experiências..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14"
            autoFocus
          />
          {isSearching && <Loader2 className="size-4 animate-spin text-muted-foreground mr-2" />}
          <Badge variant="outline" className="text-xs">
            ESC
          </Badge>
        </div>

        <div className="max-h-[500px] overflow-y-auto">
          {isSearching ? (
            <div className="py-12 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
              <Loader2 className="size-6 animate-spin" />
              <span>Buscando...</span>
            </div>
          ) : allResults.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              {search.length >= 2 ? "Nenhum resultado encontrado" : "Digite para buscar ou escolha um comando"}
            </div>
          ) : (
            <div className="p-2">
              {/* Group by category */}
              {filteredCommands.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Comandos
                  </div>
                  {filteredCommands.map((command, index) => {
                    const Icon = command.icon;
                    return (
                      <button
                        key={command.id}
                        onClick={() => {
                          command.action();
                          setOpen(false);
                          setSearch("");
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          index === selectedIndex
                            ? "bg-accent"
                            : "hover:bg-accent/50"
                        }`}
                      >
                        <div className="size-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {command.label}
                          </div>
                          {command.description && (
                            <div className="text-xs text-muted-foreground truncate">
                              {command.description}
                            </div>
                          )}
                        </div>
                        {command.shortcut && (
                          <Badge variant="outline" className="text-xs">
                            {command.shortcut}
                          </Badge>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Content results */}
              {contentResults.length > 0 && (
                <div>
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Conteúdo ({contentResults.length})
                  </div>
                  {contentResults.map((command, index) => {
                    const Icon = command.icon;
                    const globalIndex = filteredCommands.length + index;
                    return (
                      <button
                        key={command.id}
                        onClick={() => {
                          command.action();
                          setOpen(false);
                          setSearch("");
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          globalIndex === selectedIndex
                            ? "bg-accent"
                            : "hover:bg-accent/50"
                        }`}
                      >
                        <div className="size-8 rounded bg-muted flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {command.label}
                          </div>
                          {command.description && (
                            <div className="text-xs text-muted-foreground truncate">
                              {command.description}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="border-t px-4 py-2 text-xs text-muted-foreground flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs px-1.5">
              ⌘K
            </Badge>
            ou
            <Badge variant="outline" className="text-xs px-1.5">
              Ctrl+K
            </Badge>
            Abrir
          </span>
          <span className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs px-1.5">
              ↑↓
            </Badge>
            Navegar
          </span>
          <span className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs px-1.5">
              Enter
            </Badge>
            Selecionar
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
