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
      <span className={`absolute bottom-8 left-[27px] top-8 w-0.5 md:left-[35px] ${light ? "bg-white/10" : "bg-slate/15"}`} aria-hidden="true" />
      <motion.span style={{ scaleY: reduce ? 1 : scaleY }} className="absolute bottom-8 left-[27px] top-8 w-0.5 origin-top bg-brand md:left-[35px]" aria-hidden="true" />
      {process.map((p, i) => (
        <motion.li
          key={p.step}
          className="relative flex gap-5 md:gap-8"
          initial={reduce ? false : { opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand font-mono text-sm font-semibold text-on-brand shadow-lg shadow-brand/30 md:h-[72px] md:w-[72px] md:text-base">
            {p.step}
          </span>
          <div className={`group flex-1 rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 md:p-8 ${light ? "bg-white/5 hover:bg-white/10" : "bg-soft hover:bg-white hover:shadow-xl hover:shadow-navy/5"}`}>
            <h3 className={`text-xl font-extrabold md:text-2xl ${light ? "text-white" : "text-navy"}`}>{p.title}</h3>
            <p className={`mt-2 leading-relaxed ${light ? "text-white/65" : "text-slate"}`}>{p.body}</p>
            {details && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {details[i].map((d) => (
                  <li key={d} className={`rounded-full px-3 py-1 text-xs font-medium ${light ? "bg-white/10 text-white" : "bg-white text-navy"}`}>{d}</li>
                ))}
              </ul>
            )}
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
