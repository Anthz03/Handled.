"use client";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useInView, animate } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fade + rise once when scrolled into view. */
export function Reveal({ children, delay = 0, className, y = 24 }: { children: React.ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Parent that staggers its <StaggerItem> children. */
export function Stagger({ children, className, gap = 0.08, as = "div" }: { children: React.ReactNode; className?: string; gap?: number; as?: "div" | "ul" | "ol" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={{ hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
    >
      {children}
    </M>
  );
}

/** Headline that reveals word by word on load. */
export function SplitWords({ text, className, accent = [], delay = 0 }: { text: string; className?: string; accent?: string[]; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden="true">
            <motion.span
              className={`inline-block ${accent.includes(w) ? "text-brand" : ""}`}
              initial={reduce ? false : { y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: delay + i * 0.06, ease }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

/** Moves its children vertically relative to scroll (parallax). speed > 0 moves slower than scroll. */
export function Parallax({ children, speed = 0.2, className }: { children: React.ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Thin brand-coloured bar at the top showing page scroll progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-sand" aria-hidden="true" />;
}

/** Counts up to a number when visible. */
export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease, onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref} className={className}>{String(v).padStart(2, "0")}</span>;
}

/** Card wrapper with cursor-following spotlight glow. */
export function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`spotlight ${className}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
