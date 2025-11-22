import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface KeyboardHintProps {
  keys: string[];
  className?: string;
}

/**
 * Component to display keyboard shortcut hints
 * 
 * @example
 * <KeyboardHint keys={["Ctrl", "K"]} />
 * <KeyboardHint keys={["Enter"]} />
 */
export function KeyboardHint({ keys, className }: KeyboardHintProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {keys.map((key, index) => (
        <span key={index} className="flex items-center gap-1">
          <Badge
            variant="outline"
            className="font-mono text-xs px-1.5 py-0.5 h-5"
          >
            {key}
          </Badge>
          {index < keys.length - 1 && (
            <span className="text-xs text-muted-foreground">+</span>
          )}
        </span>
      ))}
    </div>
  );
}
