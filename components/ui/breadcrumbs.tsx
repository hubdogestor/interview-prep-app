"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs() {
  const pathname = usePathname();

  // Skip breadcrumbs on home page
  if (pathname === "/" || pathname === "/dashboard") {
    return null;
  }

  // Generate breadcrumb items from pathname
  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [
    { label: "Dashboard", href: "/" },
  ];

  // Map for better labels
  const labelMap: Record<string, string> = {
    icebreakers: "Icebreakers",
    speeches: "Speeches",
    questions: "Questions",
    competencias: "Competências",
    experiencias: "Experiências",
    practice: "Práticas",
    novo: "Novo",
    new: "Novo",
    edit: "Editar",
  };

  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;

    // Skip ID segments (MongoDB IDs or UUIDs)
    if (segment.length > 20 || segment.match(/^[0-9a-f]{24}$/i)) {
      return;
    }

    const label = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    items.push({
      label,
      href: currentPath,
    });
  });

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
      <Link
        href="/"
        className="hover:text-foreground transition-colors flex items-center gap-1"
      >
        <Home className="h-4 w-4" />
      </Link>

      {items.slice(1).map((item, _index) => {
        const isLast = _index === items.length - 2;

        return (
          <Fragment key={item.href}>
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-foreground font-medium">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
