"use client";

import { AIContextualSuggestions } from "@/components/ai/contextual-suggestions";
import { useContextualSuggestions } from "@/hooks/use-contextual-suggestions";

interface IcebreakersPageSuggestionsProps {
  itemCount: number;
  hasEmptyState: boolean;
}

export function IcebreakersPageSuggestions({
  itemCount,
  hasEmptyState,
}: IcebreakersPageSuggestionsProps) {
  const suggestions = useContextualSuggestions({
    page: "icebreakers",
    itemCount,
    hasEmptyState,
  });

  return (
    <AIContextualSuggestions
      pageContext="icebreakers"
      suggestions={suggestions}
      className="mb-6"
    />
  );
}
