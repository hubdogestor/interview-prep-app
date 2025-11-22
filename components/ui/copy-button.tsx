"use client";

import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CopyButtonProps {
  text: string;
  successMessage?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
  className?: string;
}

export function CopyButton({
  text,
  successMessage,
  variant = "outline",
  size = "sm",
  showText = true,
  className = "",
}: CopyButtonProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard();

  const handleCopy = () => {
    copyToClipboard(text, successMessage);
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={className}
    >
      {isCopied ? (
        <>
          <Check className={showText ? "mr-1 h-3 w-3" : "h-3 w-3"} />
          {showText && "Copiado!"}
        </>
      ) : (
        <>
          <Copy className={showText ? "mr-1 h-3 w-3" : "h-3 w-3"} />
          {showText && "Copiar"}
        </>
      )}
    </Button>
  );
}
