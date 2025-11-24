import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

interface AmazonPortalSectionProps {
  title: string;
  description: string;
  kicker?: string;
  updatedAt?: string;
  children: ReactNode;
}

export default function AmazonPortalSection({
  title,
  description,
  kicker,
  updatedAt,
  children,
}: AmazonPortalSectionProps) {
  return (
    <div className="amazon-portal-shell">
      <div className="amazon-portal-hero">
        <Link
          href="/amazon-prep"
          className="amazon-portal-back"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Voltar para o hub
        </Link>
        {kicker && (
          <p className="amazon-portal-kicker">{kicker}</p>
        )}
        <div className="space-y-3">
          <h1 className="amazon-portal-title">{title}</h1>
          <p className="amazon-portal-description">{description}</p>
          {updatedAt && (
            <Badge variant="outline" className="amazon-portal-badge">
              Atualizado {updatedAt}
            </Badge>
          )}
        </div>
      </div>
      <div className="amazon-portal-body">{children}</div>
    </div>
  );
}
