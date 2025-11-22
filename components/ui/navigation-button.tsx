import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { KeyboardHint } from "@/components/ui/keyboard-hint";
import { cn } from "@/lib/utils";

interface NavigationButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
  shortcut?: string[];
  isActive?: boolean;
  onClick?: () => void;
}

/**
 * Navigation button with keyboard shortcut hint
 */
export function NavigationButton({
  href,
  icon: Icon,
  label,
  shortcut,
  isActive,
  onClick,
}: NavigationButtonProps) {
  return (
    <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
      <Button
        asChild
        variant={isActive ? "default" : "ghost"}
        className={cn(
          "w-full justify-between group",
          isActive && "bg-primary text-primary-foreground"
        )}
        onClick={onClick}
      >
        <Link href={href}>
          <div className="flex items-center gap-2">
            <Icon className="size-4" />
            <span>{label}</span>
          </div>
          {shortcut && (
            <KeyboardHint
              keys={shortcut}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          )}
        </Link>
      </Button>
    </motion.div>
  );
}
