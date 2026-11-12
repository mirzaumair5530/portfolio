"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
  section: motion.section,
  article: motion.article,
};

type RevealProps = {
  as?: keyof typeof tags;
  /** Reveal the `RevealItem` children one after another, 0.08 s apart. */
  stagger?: boolean;
  className?: string;
  children: React.ReactNode;
};

// Fade and lift into place once when scrolled into view (clone spec, effect
// 12). The hidden state is server-rendered, so the layout has a <noscript>
// rule that shows `[data-reveal]` content when scripts are off.
export function Reveal({
  as = "div",
  stagger = false,
  className,
  children,
}: RevealProps) {
  // The tags share the props used here; one type serves them all.
  const Tag = tags[as] as typeof motion.div;
  return (
    <Tag
      data-reveal=""
      className={className}
      variants={stagger ? group : item}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
    >
      {children}
    </Tag>
  );
}

/** A child of `<Reveal stagger>`. It takes its timing from the parent. */
export function RevealItem({
  as = "div",
  className,
  children,
}: Omit<RevealProps, "stagger">) {
  const Tag = tags[as] as typeof motion.div;
  return (
    <Tag data-reveal="" className={className} variants={item}>
      {children}
    </Tag>
  );
}
