"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Language = "pt" | "en";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
  nativeName: string;
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<Language>("pt");
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const languages: LanguageOption[] = [
    { 
      code: "pt", 
      name: "Portuguese", 
      flag: "🇧🇷", 
      nativeName: "Português" 
    },
    { 
      code: "en", 
      name: "English", 
      flag: "🇺🇸", 
      nativeName: "English" 
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language)!;
  const nextLanguage = languages.find((lang) => lang.code !== language)!;

  const handleToggle = () => {
    setIsAnimating(true);
    setShowTooltip(false);
    
    // Haptic feedback se suportado
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    setTimeout(() => {
      setLanguage((prev) => (prev === "pt" ? "en" : "pt"));
      setIsAnimating(false);
      
      // Trigger custom event para outros componentes
      const event = new CustomEvent('languageChange', {
        detail: { 
          newLanguage: nextLanguage.code,
          previousLanguage: currentLanguage.code 
        }
      });
      window.dispatchEvent(event);
      
    }, 200);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    } else if (event.key === 'Escape') {
      setShowTooltip(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "relative rounded-full border border-border-subtle bg-bg-tertiary/60 px-3 py-2 transition-all duration-300 hover:border-brand-green/60 hover:bg-brand-green/10",
          "focus:ring-2 focus:ring-brand-green/40 focus:ring-offset-2",
          isAnimating && "scale-95 opacity-70"
        )}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        disabled={isAnimating}
        aria-label={`Mudar idioma de ${currentLanguage.nativeName} para ${nextLanguage.nativeName}`}
        aria-live="polite"
        title={`Clique para mudar para ${nextLanguage.nativeName}`}
        role="button"
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
          {/* Indicador visual do idioma ativo com animação */}
          <div className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white transition-all duration-300",
            language === "pt" 
              ? "bg-brand-blue shadow-sm shadow-brand-blue/30" 
              : "bg-brand-green shadow-sm shadow-brand-green/30",
            isAnimating && "animate-pulse"
          )}>
            <span className="text-sm">{currentLanguage.flag}</span>
          </div>
          
          {/* Label com animação de transição */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-text-secondary">Idioma:</span>
            <div className="relative overflow-hidden">
              <span 
                className={cn(
                  "font-semibold uppercase tracking-wide transition-all duration-300 block",
                  language === "pt" ? "text-brand-blue" : "text-brand-green",
                  isAnimating && "translate-y-2 opacity-0"
                )}
              >
                {language}
              </span>
            </div>
          </div>

          {/* Indicador visual de que pode clicar com animação */}
          <div className="ml-1 flex items-center gap-0.5 opacity-60">
            <div 
              className={cn(
                "h-1 w-1 rounded-full transition-all duration-300",
                language === "pt" ? "bg-brand-blue" : "bg-brand-green"
              )} 
            />
            <div className="h-1 w-1 rounded-full bg-border-subtle opacity-40" />
            <div className="h-1 w-1 rounded-full bg-border-subtle opacity-20" />
          </div>
        </div>

        {/* Hover effect overlay com gradiente */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-green/10 to-brand-blue/10 opacity-0 transition-opacity duration-200 hover:opacity-100" />
        
        {/* Loading indicator durante transição */}
        {isAnimating && (
          <div className="absolute inset-0 rounded-full bg-brand-green/20 animate-pulse" />
        )}
      </Button>

      {/* Tooltip melhorado com posicionamento inteligente */}
      {showTooltip && !isAnimating && (
        <div 
          className={cn(
            "absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform rounded-lg bg-bg-secondary/95 px-3 py-2 text-xs text-text-secondary",
            "border border-border-subtle/50 shadow-lg backdrop-blur transition-all duration-200 pointer-events-none z-50",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
          )}
          role="tooltip"
          aria-live="polite"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm">{currentLanguage.flag}</span>
              <span className="font-semibold text-text-primary">{currentLanguage.nativeName}</span>
            </div>
            <span className="text-text-muted">→</span>
            <div className="flex items-center gap-1">
              <span className="text-sm">{nextLanguage.flag}</span>
              <span className="font-semibold text-brand-green">{nextLanguage.nativeName}</span>
            </div>
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-border-subtle/50" />
        </div>
      )}

      {/* Status indicator para screen readers */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {isAnimating 
          ? "Trocando idioma..." 
          : `Idioma atual: ${currentLanguage.nativeName}`
        }
      </div>
    </div>
  );
}

// Hook para usar em outros componentes
export function useLanguage() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("pt");

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setCurrentLanguage(event.detail.newLanguage);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const t = (key: string, translations: Record<Language, string>) => {
    return translations[currentLanguage] || translations.pt || key;
  };

  return { currentLanguage, setCurrentLanguage: (lang: Language) => {
    setCurrentLanguage(lang);
    window.dispatchEvent(new CustomEvent('languageChange', {
      detail: { newLanguage: lang }
    }));
  }, t };
}
