'use client';

import { motion } from 'motion/react';
import type { Variants } from 'motion/react';

interface TerminalLine {
  text: string;
  className?: string;
}

interface TypingEffectProps {
  lines: TerminalLine[];
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

export default function TypingEffect({ lines }: TypingEffectProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={containerVariants}
    >
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className={`block ${line.className || ''}`}
          variants={lineVariants}
        >
          {line.text}
        </motion.span>
      ))}
    </motion.div>
  );
}
