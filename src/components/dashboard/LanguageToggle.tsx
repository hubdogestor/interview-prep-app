"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Language = "pt" | "en";

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("pt");
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
      setIsAnimating(false);
    }, 150);
  };

  const languages = [
    { code: "pt" as Language, name: "Português", flag: "BR" },
    { code: "en" as Language, name: "English", flag: "US" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language)!;
  const nextLanguage = languages.find((lang) => lang.code !== language)!;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "relative rounded-full border border-border-subtle bg-bg-tertiary/60 px-3 py-2 transition-all duration-200 hover:border-brand-green/60 hover:bg-brand-green/10",
          isAnimating && "scale-95 opacity-70"
        )}
        onClick={handleToggle}
        disabled={isAnimating}
        aria-label={`Mudar idioma de ${currentLanguage.name} para ${nextLanguage.name}`}
        aria-live="polite"
        title={`Clique para mudar para ${nextLanguage.name}`}
      >
        <div className="flex items-center gap-2">
          {/* Indicador visual do idioma ativo */}
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
            {currentLanguage.flag}
          </div>
          
          {/* Label com animação */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-text-secondary">Idioma:</span>
            <span 
              className={cn(
                "font-semibold uppercase tracking-wide transition-colors duration-200",
                language === "pt" ? "text-brand-blue" : "text-brand-green"
              )}
            >
              {language}
            </span>
          </div>

          {/* Indicador de que pode clicar */}
          <div className="ml-1 flex items-center gap-0.5 opacity-60">
            <div 
              className={cn(
                "h-1 w-1 rounded-full transition-all duration-200",
                language === "pt" ? "bg-brand-blue" : "bg-brand-green"
              )}
            />
            <div className="h-1 w-1 rounded-full bg-border-subtle opacity-40" />
            <div className="h-1 w-1 rounded-full bg-border-subtle opacity-20" />
          </div>
        </div>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-green/10 to-brand-blue/10 opacity-0 transition-opacity duration-200 hover:opacity-100" />
      </Button>

      {/* Tooltip/tooltip alternativo para mostrar próxima linguagem */}
      <div 
        className={cn(
          "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-lg bg-bg-secondary/95 px-2 py-1 text-xs text-text-secondary opacity-0 transition-all duration-200",
          "border border-border-subtle/50 shadow-lg backdrop-blur",
          "pointer-events-none group-hover:opacity-100"
        )}
        role="tooltip"
      >
        <div className="whitespace-nowrap">
          Próximo: <span className="font-semibold">{nextLanguage.flag}</span> {nextLanguage.name}
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-border-subtle/50" />
      </div>
    </div>
  );
}
