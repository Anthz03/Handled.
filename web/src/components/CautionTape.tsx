"use client";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Two crossing bands of caution tape that slide with the scroll, in opposite directions.
// They track the scroll the whole time, so they never jump when they come into view.
export function CautionTape({ top, bottom }: { top: string; bottom: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["-4%", "-30%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-30%", "-4%"]);
  const band = (text: string) => (
    <p className="flex w-max gap-8 whitespace-nowrap py-3 font-display text-lg font-extrabold uppercase tracking-wide text-ink md:text-2xl">
      {Array.from({ length: 10 }).map((_, i) => <span key={i} className="flex items-center gap-8">{text}<span aria-hidden="true">✱</span></span>)}
    </p>
  );
  return (
    <div ref={ref} className="relative h-40 overflow-hidden bg-paper md:h-56" aria-label={`${top}. ${bottom}.`} role="img">
      <motion.div style={reduce ? undefined : { x: b }} className="tape absolute left-0 top-1/2 w-[160%] -translate-y-1/2 rotate-[4deg] opacity-90">
        {band(bottom)}
      </motion.div>
      <motion.div style={reduce ? undefined : { x: a }} className="tape absolute left-0 top-1/2 w-[160%] -translate-y-1/2 -rotate-[3deg] shadow-[0_10px_30px_rgba(31,36,38,.25)]">
        {band(top)}
      </motion.div>
    </div>
  );
}
