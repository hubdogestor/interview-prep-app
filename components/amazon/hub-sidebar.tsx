"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { amazonHubStructure } from "@/data/amazon/hub";
import { cn } from "@/lib/utils";

function isActivePath(currentPath: string, href: string) {
  const [base] = href.split("#");
  return base === currentPath;
}

export function AmazonHubSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden xl:block sticky top-[104px] h-fit space-y-6 rounded-2xl border border-border/60 bg-muted/10 p-5">
      {amazonHubStructure.navigation.map((section) => (
        <div key={section.title} className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {section.title}
          </p>
          <div className="space-y-1.5">
            {section.items.map((item) => (
              <div key={item.label} className="space-y-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-start gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
                    isActivePath(pathname, item.href)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted/70"
                  )}
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
                {item.children && (
                  <div className="space-y-1 border-l border-border/50 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className={cn(
                          "block text-xs text-muted-foreground/80 transition-colors hover:text-primary",
                          isActivePath(pathname, child.href) && "text-primary"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}
