"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Heart, HelpCircle,MessageSquare, Mic } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fadeInUp,staggerContainer } from "@/lib/animations";

interface RecentItem {
  id: string;
  type: "icebreaker" | "speech" | "question";
  title: string;
  updatedAt: Date;
  favorite?: boolean;
}

interface RecentItemsProps {
  items: RecentItem[];
}

const typeConfig = {
  icebreaker: {
    icon: Mic,
    label: "Icebreaker",
    href: (id: string) => `/icebreakers/${id}/editar`,
    color: "text-chart-1",
  },
  speech: {
    icon: MessageSquare,
    label: "Speech",
    href: (id: string) => `/speeches/${id}`,
    color: "text-chart-2",
  },
  question: {
    icon: HelpCircle,
    label: "Question",
    href: (id: string) => `/questions/${id}/edit`,
    color: "text-chart-3",
  },
};

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMinutes < 1) return "Agora mesmo";
  if (diffInMinutes < 60) return `${diffInMinutes}min atrás`;
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  if (diffInDays < 7) return `${diffInDays}d atrás`;
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function RecentItems({ items }: RecentItemsProps) {
  if (items.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Atividades Recentes
        </h3>
        <p className="text-sm text-muted-foreground text-center py-8">
          Nenhuma atividade recente
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
        <Clock className="h-5 w-5" />
        Atividades Recentes
      </h3>
      <motion.div
        className="space-y-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {items.map((item, index) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <motion.div key={item.id} variants={fadeInUp} custom={index}>
              <Link
                href={config.href(item.id)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors group"
              >
              <div className={`${config.color} opacity-70 group-hover:opacity-100 transition-opacity`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-xs">
                    {config.label}
                  </Badge>
                  {item.favorite && (
                    <Heart className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  )}
                </div>
                <p className="text-sm truncate">{item.title}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {getRelativeTime(item.updatedAt)}
              </span>
            </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </Card>
  );
}
