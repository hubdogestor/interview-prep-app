"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "./hooks";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button variant="ghost" size="sm" className="rounded-full border border-border-subtle" onClick={toggleLanguage}>
      Idioma: <span className="font-semibold uppercase">{language}</span>
    </Button>
  );
}
