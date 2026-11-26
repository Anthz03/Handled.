"use client";
import { motion, MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mockup } from "./Mockup";

// Layered "digital architecture": each layer moves at a different speed on scroll (parallax)
// and tilts toward the pointer.
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -180]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 20 });

  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[1/1] w-full max-w-[560px] [perspective:1200px]"
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div style={reduce ? undefined : { rotateX: rx, rotateY: ry }} className="relative h-full w-full [transform-style:preserve-3d]">
        <Layer y={yBack} reduce={reduce} d={0.2} className="absolute inset-[6%]">
          <div className="h-full w-full rounded-[2.5rem] bg-brand/15 ring-1 ring-white/10" />
        </Layer>
        <Layer y={yBack} reduce={reduce} d={0.3} className="absolute right-[2%] top-[4%] h-28 w-28">
          <div className="h-full w-full rounded-3xl bg-brand" />
        </Layer>
        <Layer y={yMid} reduce={reduce} d={0.45} className="absolute left-0 top-[14%] w-[68%]">
          <Mockup type="chart" />
        </Layer>
        <Layer y={yFront} reduce={reduce} d={0.65} className="absolute bottom-[6%] right-0 w-[58%]">
          <Mockup type="erd" />
        </Layer>
        <Layer y={yFront} reduce={reduce} d={0.85} className="absolute bottom-[14%] left-[4%]">
          <div className="rounded-2xl bg-white px-4 py-3 shadow-2xl shadow-navy/30">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate">Status</p>
            <p className="mt-1 flex items-center gap-2 text-sm font-bold text-navy">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-brand" /> Deployed
            </p>
          </div>
        </Layer>
      </motion.div>
    </div>
  );
}

// Outer element = scroll parallax; inner element = one-time entrance. Kept separate so they don't fight over `y`.
function Layer({ y, reduce, d, className, children }: { y: MotionValue<number>; reduce: boolean | null; d: number; className: string; children?: React.ReactNode }) {
  return (
    <motion.div style={reduce ? undefined : { y }} className={className}>
      <motion.div
        className="h-full w-full rounded-[inherit]"
        initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, delay: d, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
