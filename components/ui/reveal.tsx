"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease, delay },
  }),
};

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const viewport = { once: true, amount: 0.15 } as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={itemVariants}
      custom={delay}
    >
      {children}
    </m.div>
  );
}

export function RevealList({ children, className }: Omit<RevealProps, "delay">) {
  return (
    <m.ul
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={listVariants}
    >
      {children}
    </m.ul>
  );
}

export function RevealItem({ children, className }: Omit<RevealProps, "delay">) {
  return (
    <m.li className={className} variants={itemVariants}>
      {children}
    </m.li>
  );
}
