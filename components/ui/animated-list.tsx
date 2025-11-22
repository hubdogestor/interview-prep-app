"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

import { staggerContainer, listItemStagger } from "@/lib/animations";

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedList({ children, className }: AnimatedListProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={listItemStagger}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
