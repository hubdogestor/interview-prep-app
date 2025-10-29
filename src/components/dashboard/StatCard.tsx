"use client";

import { useState, useEffect } from "react";
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

function SkeletonLoader() {
  return (
    <div className="space-y-3">
      <div className="h-4 w-20 animate-pulse rounded bg-border-subtle/50" />
      <div className="h-6 w-16 animate-pulse rounded bg-border-subtle/30" />
      <div className="h-20 w-full animate-pulse rounded bg-border-subtle/20" />
    </div>
  );
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

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (isLoading || !hasMounted) {
    return (
      <Card 
        className={cn(
          "relative transition-all duration-200 hover:shadow-lg",
          className
        )}
        role="region"
        aria-label={`Carregando estatísticas de ${label}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <SkeletonLoader />
        </CardHeader>
        <CardContent className="mt-4">
          <div className="h-20 w-full animate-pulse rounded bg-border-subtle/10" />
        </CardContent>
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

  return (
    <Card 
      className={cn(
        "relative group transition-all duration-300 ease-out",
        "hover:shadow-xl hover:shadow-black/10",
        "hover:border-border-subtle/60 hover:scale-[1.02]",
        "cursor-pointer",
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
          // On card interaction
        }
      }}
    >
      {/* Hover effect background */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br transition-opacity duration-300",
          trend === "positive" 
            ? "from-brand-green/5 via-transparent to-brand-green/10" 
            : "from-brand-yellow/5 via-transparent to-brand-yellow/10",
          isHovered ? "opacity-100" : "opacity-0"
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
          >
            {amount}
          </CardTitle>
        </div>
        
        <Badge 
          variant={trend === "positive" ? "success" : "warning"} 
          className={cn(
            "text-xs normal-case transition-all duration-200",
            "border-0 shadow-sm",
            getTrendBg(),
            isHovered && "shadow-md scale-105"
          )}
          aria-label={`Tendência ${trend === "positive" ? "positiva" : "atenção"}: ${change}`}
        >
          <span className="flex items-center gap-1">
            {trend === "positive" ? "↗" : "⚠"}
            {change}
          </span>
        </Badge>
      </CardHeader>
      
      <CardContent className="mt-4 relative z-10">
        <div className="relative">
          {/* SVG Chart with improved accessibility */}
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
            <title>Tendencia de {label}</title>
            <desc>Gráfico de linha mostrando evolução estatística com valor atual de {amount}</desc>
            
            {/* Background grid for better readability */}
            <defs>
              <pattern id={`grid-${gradientId}`} width="32" height="16" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
              </pattern>
              <linearGradient id={gradientId} x1="0%" x2="100%" y1="0%" y2="0%">
                {gradientStops.map((stop, index) => (
                  <stop 
                    key={`${stop.offset}-${index}`} 
                    offset={stop.offset} 
                    stopColor={stop.color}
                  />
                ))}
              </linearGradient>
              
              {/* Glow effect for hover */}
              <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background grid */}
            <rect width="100%" height="100%" fill={`url(#grid-${gradientId})`} />
            
            {/* Main chart line */}
            <path 
              d={path} 
              stroke={`url(#${gradientId})`} 
              strokeWidth="6" 
              fill="none" 
              strokeLinecap="round"
              className={cn(
                "transition-all duration-300",
                isHovered && `drop-shadow-lg filter`,
                "group-hover:stroke-width-7"
              )}
              style={{
                filter: isHovered ? `url(#glow-${gradientId})` : undefined,
              }}
            />
            
            {/* Data points for better interaction */}
            {isHovered && path.split(' ').slice(1, -1).map((point, index) => {
              const coords = point.split(',').map(Number);
              return (
                <circle
                  key={index}
                  cx={coords[0]}
                  cy={coords[1]}
                  r="3"
                  fill={`url(#${gradientId})`}
                  className="transition-all duration-300 hover:r-4"
                />
              );
            })}
          </svg>
          
          {/* Hover overlay with data tooltip */}
          <div 
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="rounded-lg bg-bg-secondary/90 px-3 py-1 text-xs font-medium text-text-primary shadow-lg backdrop-blur border border-border-subtle/30">
              {amount} • {change}
            </div>
          </div>
        </div>
        
        {/* Additional visual feedback */}
        <div className="mt-3 flex items-center justify-center gap-1 text-xs text-text-muted opacity-60">
          <div className={cn(
            "h-1 w-1 rounded-full transition-colors duration-200",
            trend === "positive" ? "bg-brand-green" : "bg-brand-yellow"
          )} />
          <div className="h-1 w-1 rounded-full bg-border-subtle" />
          <div className="h-1 w-1 rounded-full bg-border-subtle/50" />
          <span className="ml-2 font-medium">
            {trend === "positive" ? "Tendência positiva" : "Requer atenção"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
