"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Lightbulb,
  Sparkles,
  Target,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface AIContextualSuggestion {
  id: string;
  type: "improvement" | "action" | "insight" | "tip";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AIContextualSuggestionsProps {
  pageContext: "dashboard" | "icebreakers" | "speeches" | "competencias" | "experiencias" | "practice";
  suggestions: AIContextualSuggestion[];
  className?: string;
}

const typeIcons = {
  improvement: TrendingUp,
  action: Target,
  insight: Lightbulb,
  tip: Zap,
};

const typeColors = {
  improvement: "text-blue-500",
  action: "text-green-500",
  insight: "text-yellow-500",
  tip: "text-purple-500",
};

const priorityColors = {
  high: "border-orange-500 bg-orange-500/10",
  medium: "border-blue-500 bg-blue-500/10",
  low: "border-muted bg-muted/50",
};

/**
 * AI-powered contextual suggestions widget
 * Shows smart suggestions based on current page and user data
 */
export function AIContextualSuggestions({
  pageContext,
  suggestions,
  className,
}: AIContextualSuggestionsProps) {
  const [visible, setVisible] = useState(true);
  
  // Initialize dismissed from localStorage
  const [dismissed, setDismissed] = useState<Set<string>>(() => {
    if (typeof window === "undefined") return new Set();
    const stored = localStorage.getItem(`ai-suggestions-dismissed-${pageContext}`);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });

  const handleDismiss = (id: string) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(id);
    setDismissed(newDismissed);
    localStorage.setItem(
      `ai-suggestions-dismissed-${pageContext}`,
      JSON.stringify(Array.from(newDismissed))
    );
  };

  const visibleSuggestions = suggestions.filter((s) => !dismissed.has(s.id));

  if (!visible || visibleSuggestions.length === 0) {
    return null;
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className={cn("space-y-3", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-purple-500" />
          <h3 className="text-sm font-semibold">Sugestões da IA</h3>
          <Badge variant="secondary" className="text-xs">
            {visibleSuggestions.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setVisible(false)}
          className="h-7 w-7 p-0"
        >
          <X className="size-4" />
        </Button>
      </div>

      <AnimatePresence mode="popLayout">
        {visibleSuggestions.map((suggestion, index) => {
          const Icon = typeIcons[suggestion.type];
          const colorClass = typeColors[suggestion.type];
          const priorityClass = priorityColors[suggestion.priority];

          return (
            <motion.div
              key={suggestion.id}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={cn("p-4 relative overflow-hidden", priorityClass)}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDismiss(suggestion.id)}
                  className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-background/80"
                >
                  <X className="size-3" />
                </Button>

                <div className="flex items-start gap-3 pr-8">
                  <div className={cn("mt-0.5", colorClass)}>
                    <Icon className="size-5" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium leading-tight">
                        {suggestion.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {suggestion.description}
                      </p>
                    </div>

                    {suggestion.action && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={suggestion.action.onClick}
                        className="h-7 text-xs gap-1"
                      >
                        {suggestion.action.label}
                        <ChevronRight className="size-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {visibleSuggestions.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Sugestões personalizadas baseadas no seu perfil e contexto atual
        </p>
      )}
    </motion.div>
  );
}
