import { Variants } from "framer-motion";

/**
 * Animação de fade-in para cards e elementos
 */
export const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Animação de fade-in sem movimento vertical
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const,
    },
  },
};

/**
 * Animação escalonada para listas
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Animação de escala para botões e elementos interativos
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/**
 * Animação de slide da esquerda
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Animação de slide da direita
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

/**
 * Propriedades de hover para botões
 */
export const buttonHover = {
  scale: 1.05,
  transition: {
    duration: 0.2,
    ease: "easeOut" as const,
  },
};

/**
 * Propriedades de tap para botões
 */
export const buttonTap = {
  scale: 0.98,
};

/**
 * Animação de bounce suave
 */
export const bounceIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

/**
 * Micro-interactions adicionais
 */

// Hover para cards
export const cardHover = {
  y: -4,
  boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2)",
  transition: {
    duration: 0.2,
    ease: "easeOut" as const,
  },
};

// Tap para cards
export const cardTap = {
  scale: 0.98,
};

// Hover para ícones
export const iconHover = {
  scale: 1.15,
  rotate: [0, -10, 10, 0],
  transition: {
    duration: 0.3,
  },
};

// Pulse animation
export const pulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Shake animation (para erros)
export const shake: Variants = {
  shake: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
};

// Slide up from bottom (para modals/sheets)
export const slideUpFromBottom: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    y: "100%",
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// Fade and blur (para backgrounds)
export const fadeBlur: Variants = {
  hidden: {
    opacity: 0,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    backdropFilter: "blur(8px)",
    transition: {
      duration: 0.3,
    },
  },
};

// Stagger with fade for list items
export const listItemStagger: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
    },
  },
};

