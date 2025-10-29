import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Github, Linkedin, Mail, Phone, ExternalLink, UserRoundPen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProfileSummary } from "@/types/profile";
import { ProfileCardSkeleton } from "./profile-card-skeleton";

type ProfileCardProps = {
  profile: ProfileSummary;
  isLoading?: boolean;
};

const iconMap = {
  email: Mail,
  phone: Phone,
  linkedin: Linkedin,
  github: Github,
} as const;

const contactHref = (type: ProfileSummary["links"][number]["type"], value: string) => {
  if (!value) return "#";
  switch (type) {
    case "email":
      return `mailto:${value}`;
    case "phone":
      return `tel:${value.replace(/\s+/g, "")}`;
    case "linkedin":
    case "github":
    default:
      return value.startsWith("http") ? value : `https://${value}`;
  }
};

function ProfileCardHeaderComponent({ profile }: { profile: ProfileSummary }) {
  const updatedAtLabel = profile.updatedAt
    ? format(new Date(profile.updatedAt), "d MMM yyyy", { locale: ptBR })
    : null;

  return (
    <CardHeader className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-border-subtle/80 bg-bg-tertiary/80 shadow-lg">
          <Image
            src={profile.avatarUrl}
            alt={profile.name}
            fill
            sizes="(max-width: 768px) 80px, 120px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Badge variant={profile.status === "ready" ? "success" : "outline"}>
              {profile.status === "ready" ? "Perfil sincronizado" : "Em configuração"}
            </Badge>
            {updatedAtLabel ? (
              <span className="text-xs text-text-muted">Atualizado em {updatedAtLabel}</span>
            ) : null}
          </div>
          <CardTitle className="mt-2 text-3xl text-text-primary">{profile.name}</CardTitle>
          <p className="text-sm text-text-secondary">{profile.title}</p>
        </div>
      </div>
      <Button variant="secondary" size="sm" className="gap-2">
        <UserRoundPen className="h-4 w-4" />
        Atualizar perfil
      </Button>
    </CardHeader>
  );
}

function ProfileCardContentComponent({ profile }: { profile: ProfileSummary }) {
  return (
    <CardContent className="grid gap-6 md:grid-cols-[minmax(0,2fr),minmax(0,1fr)]">
      <div className="space-y-4">
        <p className="text-sm text-text-secondary leading-6">
          {profile.summaryPt ??
            "Adicionar um resumo em português ajudará a IA a personalizar respostas e montar scripts mais fiéis ao seu estilo."}
        </p>
        <div className="flex flex-wrap gap-2">
          {profile.links.length === 0 ? (
            <Badge variant="outline" className="text-xs uppercase tracking-[0.2em]">
              Adicione links de contato
            </Badge>
          ) : (
            profile.links.map((link) => {
              const Icon = iconMap[link.type];
              return (
                <Button
                  key={`${link.type}-${link.value}`}
                  variant="ghost"
                  size="sm"
                  className="gap-2 border border-border-subtle/60 bg-bg-tertiary/40 px-3 text-xs"
                  asChild
                >
                  <Link href={contactHref(link.type, link.value)} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-4 w-4" />
                    <span>{link.label}</span>
                    <ExternalLink className="h-3 w-3 text-text-muted" />
                  </Link>
                </Button>
              );
            })
          )}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {profile.metrics.map((metric) => (
          <div
            key={metric.key}
            className="rounded-2xl border border-border-subtle/60 bg-bg-tertiary/50 p-4 shadow-sm shadow-black/10"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-text-muted">{metric.label}</p>
            <p className="mt-2 font-grotesk text-xl text-text-primary">{metric.value}</p>
            {metric.hint ? <p className="mt-1 text-[11px] text-text-muted">{metric.hint}</p> : null}
          </div>
        ))}
      </div>
    </CardContent>
  );
}

function ProfileCardFooterComponent({ profile }: { profile: ProfileSummary }) {
  return (
    <CardFooter className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle/40 bg-bg-tertiary/30 px-6 py-4 text-xs text-text-muted">
      <span>
        {profile.status === "ready"
          ? "Sincronizado com MongoDB via Prisma. Campos extras podem ser expostos via tRPC."
          : "Assim que o modelo Profile estiver preenchido no Prisma, os dados aparecerão aqui automaticamente."}
      </span>
      <span className="font-mono uppercase tracking-[0.3em] text-brand-blue">/profile</span>
    </CardFooter>
  );
}

export function ProfileCard({ profile, isLoading }: ProfileCardProps) {
  if (isLoading) {
    return <ProfileCardSkeleton />;
  }

  return (
    <Card className="relative overflow-hidden border-border-subtle/60 bg-bg-secondary/95 backdrop-blur">
      <ProfileCardHeaderComponent profile={profile} />
      <ProfileCardContentComponent profile={profile} />
      <ProfileCardFooterComponent profile={profile} />
    </Card>
  );
}