"use client";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { process } from "@/lib/data";

// Vertical timeline whose line fills in brand blue as you scroll through it.
export function ProcessTimeline({ details, light }: { details?: string[][]; light?: boolean }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <ol ref={ref} className="relative space-y-6">
      <span className={`absolute bottom-8 left-[27px] top-8 w-0.5 md:left-[35px] ${light ? "bg-white/10" : "border-l-2 border-dashed border-ink/30 bg-transparent"}`} aria-hidden="true" />
      <motion.span style={{ scaleY: reduce ? 1 : scaleY }} className="absolute bottom-8 left-[27px] top-8 w-1 origin-top rounded-full bg-brand md:left-[34px]" aria-hidden="true" />
      {process.map((p, i) => (
        <motion.li
          key={p.step}
          className="relative flex gap-5 md:gap-8"
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-ink bg-signal font-display text-lg font-extrabold text-ink transition-transform duration-500 ease-[var(--ease-bounce)] hover:rotate-12 hover:scale-110 md:h-[72px] md:w-[72px] md:text-2xl">
            {p.step}
          </span>
          <div className={`group flex-1 rounded-3xl p-6 md:p-8 ${light ? "bg-white/5 hover:bg-white/10" : `pop pop-hover bg-white hover:rotate-0 ${i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}`}`}>
            <h3 className={`text-xl font-extrabold md:text-2xl ${light ? "text-white" : "text-navy"}`}>{p.title}</h3>
            <p className={`mt-2 leading-relaxed ${light ? "text-white/65" : "text-slate"}`}>{p.body}</p>
            {details && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {details[i].map((d) => (
                  <li key={d} className={`rounded-full px-3 py-1 text-xs font-medium ${light ? "bg-white/10 text-white" : "border-2 border-ink bg-sand text-ink"}`}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
