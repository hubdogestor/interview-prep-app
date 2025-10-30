"use client";

import type * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sidebar as BaseSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Bullet } from "@/components/ui/bullet";
import { cn } from "@/lib/utils";
import { primaryNav, secondaryNav } from "@/components/dashboard/data";
import type { ProfileSummary } from "@/types/profile";
import BracketsIcon from "@/components/icons/brackets";
import MonkeyIcon from "@/components/icons/monkey";
import QuestionIcon from "@/components/icons/question";
import BriefcaseIcon from "@/components/icons/briefcase";
import StarIcon from "@/components/icons/star";
import MicrophoneIcon from "@/components/icons/microphone";
import AtomIcon from "@/components/icons/atom";
import GearIcon from "@/components/icons/gear";
import EmailIcon from "@/components/icons/email";
import LockIcon from "@/components/icons/lock";
import { useIsV0 } from "@/lib/v0-context";

const primaryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  dashboard: BracketsIcon,
  profile: MonkeyIcon,
  questions: QuestionIcon,
  experiences: BriefcaseIcon,
  competencias: StarIcon,
  skills: StarIcon,
  speech: MicrophoneIcon,
  analytics: AtomIcon,
};

const secondaryIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  settings: GearIcon,
  support: EmailIcon,
  logout: LockIcon,
};

const resolveIcon = (
  key: string,
  fallback: React.ComponentType<{ className?: string }>
): React.ComponentType<{ className?: string }> => primaryIconMap[key] ?? secondaryIconMap[key] ?? fallback;

interface DashboardSidebarProps
  extends Omit<React.ComponentProps<typeof BaseSidebar>, "children"> {
  profile: ProfileSummary;
  activeKey?: string;
}

export function DashboardSidebar({
  profile,
  activeKey = "dashboard",
  className,
  ...props
}: DashboardSidebarProps) {
  const isV0 = useIsV0();

  const navSections = [
    {
      title: "Jornada",
      items: primaryNav.map((item) => ({
        key: item.key,
        title: item.label,
        url: item.key === "dashboard" ? "/" : `/${item.key}`,
        icon: resolveIcon(item.key, BracketsIcon),
        isActive: item.key === activeKey,
      })),
    },
    {
      title: "Organização",
      items: secondaryNav.map((item) => ({
        key: item.key,
        title: item.label,
        url: `/${item.key}`,
        icon: resolveIcon(item.key, GearIcon),
        isActive: false,
      })),
    },
  ];

  const primaryEmail =
    profile.links.find((link) => link.type === "email")?.value ??
    profile.links.find((link) => link.type === "linkedin")?.value ??
    "Defina seus contatos";

  return (
    <BaseSidebar {...props} className={cn("py-6", className)}>
      <SidebarHeader className="flex items-center gap-3 rounded-b-none">
        <div className="flex size-12 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
          <MonkeyIcon className="size-9" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="text-2xl font-display">Interview Prep</span>
          <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Plano diário
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {navSections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <Bullet className="mr-1" />
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.key}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.isActive}
                      className={cn(
                        "transition-colors duration-150",
                        isV0 && "pointer-events-none"
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon className="size-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <Bullet className="mr-1" />
            Sessão atual
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar p-3">
              <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Image
                  src={profile.avatarUrl || "/avatars/user_krimson.png"}
                  alt={profile.name}
                  width={64}
                  height={64}
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-sidebar-foreground">
                  {profile.name || "Seu perfil principal"}
                </p>
                <p className="truncate text-xs text-sidebar-foreground/60">
                  {primaryEmail}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>

      <SidebarRail />
    </BaseSidebar>
  );
}

export type { DashboardSidebarProps };
