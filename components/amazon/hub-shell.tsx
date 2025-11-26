import type { ReactNode } from "react";
import Link from "next/link";

import { amazonHubStructure } from "@/data/amazon/hub";

import { AmazonHubRightRail } from "./hub-right-rail";

interface AmazonHubShellProps {
  children: ReactNode;
  rightSlot?: ReactNode;
}

export function AmazonHubShell({ children, rightSlot }: AmazonHubShellProps) {
  const mobileLinks = amazonHubStructure.navigation.flatMap((group) =>
    group.items.flatMap((item) => [item, ...(item.children ?? [])])
  );

  return (
    <div className="space-y-8">
      <div className="xl:hidden -mx-1 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-2">
          {mobileLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start xl:gap-8">
        <div className="space-y-12">{children}</div>
        <div className="sticky top-[96px] hidden xl:block">
          {rightSlot ?? <AmazonHubRightRail />}
        </div>
      </div>
    </div>
  );
}
