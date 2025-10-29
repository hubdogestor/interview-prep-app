"use client";

import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  amount: string;
  change: string;
  gradientId: string;
  gradientStops: Array<{
    offset: string;
    color: string;
  }>;
  label: string;
  path: string;
  trend: "positive" | "warning";
  isLoading?: boolean;
  className?: string;
};

// Loading skeleton component com animação melhorada
function SkeletonLoader() {
  return (
    <div className="space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-3 w-20 animate-pulse rounded bg-border-subtle/50" />
          <div className="h-6 w-16 animate-pulse rounded bg-border-subtle/40" />
        </div>
        <div className="h-6 w-12 animate-pulse rounded bg-border-subtle/30" />
      </div>
      
      {/* Chart skeleton */}
      <div className="space-y-3">
        <div className="h-20 w-full animate-pulse rounded bg-border-subtle/20" />
        <div className="flex justify-between">
          <div className="h-3 w-16 animate-pulse rounded bg-border-subtle/30" />
          <div className="h-3 w-12 animate-pulse rounded bg-border-subtle/30" />
        </div>
      </div>
      
      {/* Status indicators skeleton */}
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-1 animate-pulse rounded-full bg-border-subtle/40" />
        <div className="h-3 w-20 animate-pulse rounded bg-border-subtle/30" />
      </div>
    </div>
  );
}

// Hook para Intersection Observer para lazy loading
function useInView<T extends Element>(options?: IntersectionObserverInit) {
  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options, inView]);

  return { ref, inView };
}

export function StatCard({ 
  amount, 
  change, 
  gradientId, 
  gradientStops, 
  label, 
  path, 
  trend, 
  isLoading = false,
  className 
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [animatedValue, setAnimatedValue] = useState("0");
  const [showTooltip, setShowTooltip] = useState(false);

  const { ref: cardRef, inView } = useInView<HTMLDivElement>();
  
  // Animações e efeitos quando o card fica visível
  useEffect(() => {
    setHasMounted(true);
    
    if (inView) {
      // Animar o valor quando o card entra na viewport
      const timer = setTimeout(() => {
        setAnimatedValue(amount);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [inView, amount]);

  // Animação de progresso para o gráfico
  useEffect(() => {
    if (!inView || isHovered) return;

    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, [inView, isHovered]);

  if (isLoading || !hasMounted || !inView) {
    return (
      <Card 
        ref={cardRef}
        className={cn(
          "relative transition-all duration-300 hover:shadow-lg",
          className
        )}
        role="region"
        aria-label={`Carregando estatísticas de ${label}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <SkeletonLoader />
        </CardHeader>
      </Card>
    );
  }

  const getTrendColor = () => {
    return trend === "positive" ? "text-brand-green" : "text-brand-yellow";
  };

  const getTrendBg = () => {
    return trend === "positive" 
      ? "bg-brand-green/10 hover:bg-brand-green/20" 
      : "bg-brand-yellow/10 hover:bg-brand-yellow/20";
  };

  const getGradientColors = () => {
    return gradientStops.map(stop => stop.color).join(', ');
  };

  return (
    <Card 
      ref={cardRef}
      className={cn(
        "relative group transition-all duration-300 ease-out",
        "hover:shadow-xl hover:shadow-black/10",
        "hover:border-border-subtle/60 hover:scale-[1.02]",
        "cursor-pointer focus:ring-2 focus:ring-brand-green/40 focus:outline-none",
        className
      )}
      role="region"
      aria-label={`Estatísticas ${label}: ${amount} (${change})`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // TODO: Implementar ação de clique
        }
      }}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      {/* Hover effect background com gradiente dinâmico */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity duration-300",
          trend === "positive" 
            ? "bg-gradient-to-br from-brand-green/5 via-transparent to-brand-green/10" 
            : "bg-gradient-to-br from-brand-yellow/5 via-transparent to-brand-yellow/10",
          isHovered || showTooltip ? "opacity-100" : "opacity-0"
        )}
      />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 relative z-10">
        <div className="space-y-1">
          <span 
            className="text-xs font-medium uppercase tracking-[0.18em] text-text-muted transition-colors duration-200 group-hover:text-text-secondary"
            role="heading"
            aria-level={3}
          >
            {label}
          </span>
          <CardTitle 
            className={cn(
              "text-lg transition-all duration-200",
              "group-hover:scale-105",
              getTrendColor(),
              isHovered && "text-opacity-90"
            )}
            aria-live="polite"
          >
            {animatedValue}
          </CardTitle>
        </div>
        
        <Badge 
          variant={trend === "positive" ? "success" : "warning"} 
          className={cn(
            "text-xs normal-case transition-all duration-200",
            "border-0 shadow-sm",
            getTrendBg(),
            isHovered && "shadow-md scale-105",
            "focus:ring-2 focus:ring-brand-green/40"
          )}
          aria-label={`Tendência ${trend === "positive" ? "positiva" : "atenção"}: ${change}`}
        >
          <span className="flex items-center gap-1">
            <span aria-hidden="true">
              {trend === "positive" ? "↗" : "⚠"}
            </span>
            {change}
          </span>
        </Badge>
      </CardHeader>
      
      <CardContent className="mt-4 relative z-10">
        <div className="relative">
          {/* SVG Chart com acessibilidade melhorada */}
          <svg 
            viewBox="0 0 320 80" 
            className={cn(
              "h-20 w-full transition-all duration-300",
              "group-hover:scale-105",
              isHovered && "filter drop-shadow-sm"
            )}
            role="img"
            aria-label={`Gráfico de tendência para ${label} mostrando ${amount}`}
            preserveAspectRatio="none"
          >
            <title>{`Tendência de ${label}`}</title>
            <desc>Gráfico de linha mostrando evolução estatística com valor atual de {amount}</desc>
            
            <defs>
              {/* Pattern para grid de fundo */}
              <pattern id={`grid-${gradientId}`} width="32" height="16" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
              
              {/* Gradiente dinâmico */}
              <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                {gradientStops.map((stop, index) => (
                  <stop 
                    key={`${stop.offset}-${index}`} 
                    offset={stop.offset} 
                    stopColor={stop.color}
                    stopOpacity={isHovered ? 1 : 0.8}
                  />
                ))}
              </linearGradient>
              
              {/* Efeito de brilho para hover */}
              <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              {/* Gradiente para pontos de dados */}
              <radialGradient id={`point-gradient-${gradientId}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="white" stopOpacity="1"/>
                <stop offset="100%" stopColor={getGradientColors().split(',')[0] || '#10b981'} stopOpacity="0.8"/>
              </radialGradient>
            </defs>
            
            {/* Grid de fundo para melhor legibilidade */}
            <rect width="100%" height="100%" fill={`url(#grid-${gradientId})`} />
            
            {/* Linha principal do gráfico */}
            <path 
              d={path} 
              stroke={`url(#${gradientId})`} 
              strokeWidth="6" 
              fill="none" 
              strokeLinecap="round"
              className={cn(
                "transition-all duration-300",
                "group-hover:stroke-width-7",
                showTooltip && "animate-pulse"
              )}
              style={{
                filter: isHovered ? `url(#glow-${gradientId})` : undefined,
                strokeDasharray: isHovered ? "none" : "5,5",
                strokeDashoffset: showTooltip ? "0" : "none",
              }}
            />
            
            {/* Pontos de dados para melhor interatividade */}
            {isHovered && path.split(' ').slice(1, -1).map((point, index) => {
              const coords = point.split(',').map(Number);
              return (
                <g key={index}>
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r="4"
                    fill={`url(#point-gradient-${gradientId})`}
                    className="transition-all duration-300 hover:r-6"
                    opacity="0.8"
                  />
                  <circle
                    cx={coords[0]}
                    cy={coords[1]}
                    r="2"
                    fill="white"
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
            
            {/* Indicadores de valor nos pontos extremos */}
            <circle
              cx="20"
              cy="60"
              r="2"
              fill="currentColor"
              opacity="0.6"
            />
            <circle
              cx="300"
              cy="20"
              r="2"
              fill="currentColor"
              opacity="0.6"
            />
          </svg>
          
          {/* Tooltip flutuante com dados */}
          {(isHovered || showTooltip) && (
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
              <div 
                className={cn(
                  "rounded-lg bg-bg-secondary/95 px-4 py-2 text-sm font-semibold text-text-primary shadow-xl backdrop-blur border border-border-subtle/30",
                  "transform transition-all duration-200",
                  isHovered ? "scale-110 opacity-100" : "scale-100 opacity-90"
                )}
                role="tooltip"
                aria-label={`Dados atuais: ${amount}, variação: ${change}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-text-primary">{amount}</span>
                  <span className="text-text-muted">•</span>
                  <span className={cn(
                    "font-semibold",
                    trend === "positive" ? "text-brand-green" : "text-brand-yellow"
                  )}>
                    {change}
                  </span>
                </div>
                <div className="mt-1 text-xs text-text-muted text-center">
                  {label}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Indicadores visuais adicionais */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-text-muted">
          <div className={cn(
            "h-1.5 w-1.5 rounded-full transition-colors duration-200",
            trend === "positive" ? "bg-brand-green" : "bg-brand-yellow"
          )} />
          <div className="h-1 w-1 rounded-full bg-border-subtle" />
          <div className="h-1 w-1 rounded-full bg-border-subtle/70" />
          <div className="h-1 w-1 rounded-full bg-border-subtle/40" />
          <span className="ml-2 font-medium">
            {trend === "positive" ? "Crescendo" : "Atenção necessária"}
          </span>
        </div>
        
        {/* Acessibilidade - descrição expandida para screen readers */}
        <div className="sr-only">
          Esta estatística mostra {label.toLowerCase()} com valor atual de {amount}, 
          apresentando uma variação de {change} que indica 
          {trend === "positive" ? "melhora no desempenho" : "área que precisa de atenção"}.
        </div>
      </CardContent>
    </Card>
  );
}
