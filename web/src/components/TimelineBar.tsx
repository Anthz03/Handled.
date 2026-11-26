"use client";
import { motion, useReducedMotion } from "framer-motion";

// Gantt bar that grows from the left when scrolled into view.
export function TimelineBar({ start, span, label }: { start: number; span: number; label: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="origin-left rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-on-brand"
      style={{ gridColumn: `${start + 1} / span ${span}` }}
      initial={reduce ? false : { scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: start * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {label}
    </motion.div>
  );
}
