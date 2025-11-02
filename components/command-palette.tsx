"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Home,
  Mic,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Star,
  Target,
  Plus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  keywords?: string[];
  shortcut?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

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
          i < filteredCommands.length - 1 ? i + 1 : i
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => (i > 0 ? i - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const command = filteredCommands[selectedIndex];
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
  }, [open, selectedIndex, filteredCommands]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="flex items-center border-b px-4">
          <Input
            placeholder="Digite um comando ou pesquise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-14"
            autoFocus
          />
          <Badge variant="outline" className="text-xs">
            ESC
          </Badge>
        </div>

        <div className="max-h-[400px] overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Nenhum comando encontrado
            </div>
          ) : (
            <div className="p-2">
              {filteredCommands.map((command, index) => {
                const Icon = command.icon;
                return (
                  <button
                    key={command.id}
                    onClick={() => {
                      command.action();
                      setOpen(false);
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
        </div>

        <div className="border-t px-4 py-2 text-xs text-muted-foreground flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              ↑↓
            </Badge>
            Navegar
          </span>
          <span className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              Enter
            </Badge>
            Selecionar
          </span>
          <span className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs">
              ESC
            </Badge>
            Fechar
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
