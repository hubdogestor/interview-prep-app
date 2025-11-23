"use client";

import React, { useEffect,useState } from "react";
import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TVNoise from "@/components/ui/tv-noise";
import type { WidgetData } from "@/types/dashboard";

interface WidgetProps {
  widgetData: WidgetData;
}

export default function Widget({ widgetData }: WidgetProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    const dayOfWeek = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const restOfDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return { dayOfWeek, restOfDate };
  };

  const dateInfo = formatDate(currentTime);

  return (
    <Card className="w-full aspect-[2] relative overflow-hidden">
      <TVNoise opacity={0.3} intensity={0.2} speed={40} />
      <CardContent className="bg-accent/30 flex-1 flex flex-col justify-between text-[clamp(0.7rem,2.5vw,0.875rem)] font-medium uppercase relative z-20">
        <div className="flex justify-between items-center gap-1">
          <span className="opacity-50 truncate">{dateInfo.dayOfWeek}</span>
          <span className="truncate text-right">{dateInfo.restOfDate}</span>
        </div>
        <div className="text-center">
          <div className="text-[clamp(2rem,8vw,3rem)] font-display" suppressHydrationWarning>
            {formatTime(currentTime)}
          </div>
        </div>

        <div className="flex justify-between items-center gap-1">
          <span className="opacity-50">{widgetData.temperature}</span>
          <span className="truncate flex-1 text-center">{widgetData.location}</span>

          <Badge variant="secondary" className="bg-accent text-[clamp(0.6rem,2vw,0.75rem)] px-1.5">
            {widgetData.timezone}
          </Badge>
        </div>

        <div className="absolute inset-0 -z-[1] opacity-[0.4]">
          <Image
            src="/assets/pc_blueprint.gif"
            alt="logo"
            width={250}
            height={250}
            className="size-full object-contain scale-[0.85]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
