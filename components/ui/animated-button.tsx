"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";

import { Button, ButtonProps } from "@/components/ui/button";
import { buttonHover, buttonTap } from "@/lib/animations";

export interface AnimatedButtonProps extends ButtonProps {}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
