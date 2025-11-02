"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Plus,
  Mic,
  MessageSquare,
  HelpCircle,
  Briefcase,
  Star,
  Target as TargetIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { buttonHover, buttonTap } from "@/lib/animations";
import { JobFitAnalyzer } from "@/components/dashboard/job-fit-analyzer";

const quickActions = [
  {
    label: "Novo Icebreaker",
    href: "/icebreakers/novo",
    icon: Mic,
    color: "text-chart-1",
    tooltip: "Crie uma nova apresentação de 30-60 segundos",
  },
  {
    label: "Novo Speech",
    href: "/speeches/novo",
    icon: MessageSquare,
    color: "text-chart-2",
    tooltip: "Prepare uma narrativa profissional estruturada",
  },
  {
    label: "Nova Question",
    href: "/questions/new",
    icon: HelpCircle,
    color: "text-chart-3",
    tooltip: "Adicione uma pergunta para fazer ao entrevistador",
  },
  {
    label: "Nova Experiência",
    href: "/experiencias/novo",
    icon: Briefcase,
    color: "text-chart-4",
    tooltip: "Documente uma experiência profissional com STAR Cases",
  },
  {
    label: "Nova Competência",
    href: "/competencias/novo",
    icon: Star,
    color: "text-chart-1",
    tooltip: "Registre uma competência técnica ou comportamental",
  },
  {
    label: "Histórico de Práticas",
    href: "/practice",
    icon: TargetIcon,
    color: "text-chart-4",
    tooltip: "Veja seu histórico e estatísticas de práticas",
  },
];

const specialActions = [
  {
    label: "Analisar Fit com Vaga",
    action: "job-fit",
    icon: TargetIcon,
    color: "text-chart-2",
    tooltip: "Analise seu fit com uma vaga específica usando IA",
  },
];

export function QuickActions() {
  const [jobFitOpen, setJobFitOpen] = useState(false);

  const handleSpecialAction = (action: string) => {
    if (action === "job-fit") {
      setJobFitOpen(true);
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display uppercase">Quick Actions</h2>
          <Plus className="h-5 w-5 text-muted-foreground" />
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
            {quickActions.map((action) => (
              <Tooltip key={action.href}>
                <TooltipTrigger asChild>
                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Link href={action.href}>
                      <Button
                        variant="outline"
                        className="w-full h-auto flex flex-col items-center gap-2 py-4 hover:bg-accent/50 hover:border-primary transition-colors"
                      >
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                        <span className="text-xs font-medium text-center">
                          {action.label}
                        </span>
                      </Button>
                    </Link>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}

            {specialActions.map((action) => (
              <Tooltip key={action.action}>
                <TooltipTrigger asChild>
                  <motion.div whileHover={buttonHover} whileTap={buttonTap}>
                    <Button
                      variant="outline"
                      onClick={() => handleSpecialAction(action.action)}
                      className="w-full h-auto flex flex-col items-center gap-2 py-4 hover:bg-accent/50 hover:border-primary transition-colors"
                    >
                      <action.icon className={`h-6 w-6 ${action.color}`} />
                      <span className="text-xs font-medium text-center">
                        {action.label}
                      </span>
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{action.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </Card>

      <JobFitAnalyzer open={jobFitOpen} onOpenChange={setJobFitOpen} />
    </>
  );
}
