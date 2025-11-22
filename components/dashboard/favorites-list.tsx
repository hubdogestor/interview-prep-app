"use client";

import Link from "next/link";
import { Heart, HelpCircle,MessageSquare, Mic } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface FavoriteItem {
  id: string;
  type: "icebreaker" | "speech" | "question";
  title: string;
  description?: string;
}

interface FavoritesListProps {
  items: FavoriteItem[];
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

export function FavoritesList({ items }: FavoritesListProps) {
  if (items.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 fill-yellow-500 text-yellow-500" />
          Favoritos
        </h3>
        <p className="text-sm text-muted-foreground text-center py-8">
          Nenhum item favoritado ainda
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-display uppercase mb-4 flex items-center gap-2">
        <Heart className="h-5 w-5 fill-yellow-500 text-yellow-500" />
        Favoritos
      </h3>
      <div className="space-y-3">
        {items.map((item) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <Link
              key={item.id}
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
                </div>
                <p className="text-sm font-medium truncate">{item.title}</p>
                {item.description && (
                  <p className="text-xs text-muted-foreground truncate">
                    {item.description}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
