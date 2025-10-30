import { Badge } from "@/components/ui/badge";
import DashboardCard from "@/components/dashboard-v0/card";
import type { FocusRankingItem } from "@/types/dashboard";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FocusRankingProps {
  items: FocusRankingItem[];
}

export function FocusRanking({ items }: FocusRankingProps) {
  const highlight = items[0]?.highlight;

  return (
    <DashboardCard
      title="Radar de competências"
      intent="default"
      addon={
        highlight ? (
          <Badge variant="outline-warning" className="uppercase">
            {highlight}
          </Badge>
        ) : null
      }
    >
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-1 w-full">
              <div
                className={cn(
                  "flex items-center justify-center rounded text-sm font-bold px-1.5 mr-1 md:mr-2",
                  item.featured
                    ? "h-10 bg-primary text-primary-foreground"
                    : "h-8 bg-secondary text-secondary-foreground",
                )}
              >
                {item.id}
              </div>

              <div
                className={cn(
                  "rounded-lg overflow-hidden bg-muted",
                  item.featured ? "size-14 md:size-16" : "size-10 md:size-12",
                )}
              >
                {item.avatar ? (
                  <Image
                    src={item.avatar}
                    alt={item.area}
                    width={120}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </div>

              <div
                className={cn(
                  "flex flex-1 h-full items-center justify-between py-2 px-2.5 rounded",
                  item.featured && "bg-accent",
                )}
              >
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "font-display",
                        item.featured ? "text-xl md:text-2xl" : "text-lg md:text-xl",
                      )}
                    >
                      {item.area}
                    </span>
                    <Badge variant={item.featured ? "default" : "secondary"} className="tracking-wide">
                      {item.score}%
                    </Badge>
                  </div>
                  {item.description && (
                    <span className="text-sm text-muted-foreground italic">{item.description}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}

