"use client";
import Link from "next/link";
import { AnimatePresence, motion, MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import type { Project } from "@/lib/data";
import { usePinProgress } from "@/lib/usePinProgress";
import { Button } from "./Button";
import { DemoBadge } from "./DemoBadge";
import { MockupPanel } from "./Mockup";

// Featured projects: the heading stays left while a CSS-3D phone turns with the scroll and its screen
// rolls through the projects on a wheel. Pinned with the shared soft pin; still and scrollable under reduced motion.

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);
const LAYERS = 9; // stacked frame layers give the phone its thickness when it turns

export function PhoneProjects({ items }: { items: Project[] }) {
  const ref = useRef<HTMLElement>(null);
  const { p, lift, reduce } = usePinProgress(ref, 0);
  const n = items.length;

  // Scroll index through the projects: slows near each one, never stops (parallax principle 5).
  const u = useTransform(p, (v) => {
    const r = clamp((v - 0.14) / 0.72) * (n - 1);
    const i = Math.min(Math.floor(r), n - 2);
    const f = r - i;
    return i + f * 0.35 + smooth(f) * 0.65;
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(u, "change", (v) => setActive(Math.round(v)));

  const rotateY = useTransform(p, [0, 0.16, 0.84, 1], [-34, -14, 12, 26]);
  const rotateX = useTransform(p, [0, 0.16, 0.84, 1], [16, 5, 5, -8]);
  const floatY = useTransform(p, [0, 1], [50, -50]);
  const cur = items[active] ?? items[0];

  return (
    <section ref={ref} className={`relative bg-paper ${reduce ? "py-28" : "h-[320svh]"}`} aria-labelledby="work-heading">
      <motion.div style={{ y: lift }} className={reduce ? "" : "sticky top-0 h-[100svh] overflow-hidden"}>
        <div className="container-x grid h-full items-center gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          {/* Left: the heading stays, the project text follows the phone */}
          <div className="self-end lg:self-center">
            <h2 id="work-heading" className="display-lg text-navy">Things we&apos;ve built for practice.</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate">Concept projects, not client work yet. Scroll through them on the phone.</p>
            <div className="mt-8 hidden min-h-48 lg:block" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={cur.slug} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                  <p className="flex items-center gap-3 text-sm text-slate">{cur.category} <DemoBadge /></p>
                  <h3 className="mt-2 text-2xl font-extrabold text-navy">{cur.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-slate">{cur.summary}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-6 hidden gap-3 sm:flex">
              <Button href={`/projects/${cur.slug}`} variant="secondary">Open this project</Button>
              <Button href="/projects" variant="ghost">See all projects</Button>
            </div>
          </div>

          {/* Right: the phone */}
          <div className="grid place-items-center self-start [--ph:min(560px,58svh)] [perspective:1600px] lg:self-center lg:[--ph:min(660px,76svh)]">
            <motion.div style={reduce ? undefined : { rotateY, rotateX, y: floatY }} className="relative h-[var(--ph)] w-[calc(var(--ph)*0.48)] [transform-style:preserve-3d]">
              <Phone>
                <Wheel items={items} u={u} reduce={!!reduce} />
              </Phone>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  const r = "rounded-[calc(var(--ph)*0.08)]";
  return (
    <>
      {/* Thickness: frame layers stacked behind the front face */}
      {Array.from({ length: LAYERS }).map((_, k) => (
        <div key={k} aria-hidden="true" className={`absolute inset-0 ${r} bg-linear-to-r from-alu-500 via-alu-200 to-alu-500`} style={{ transform: `translateZ(calc(var(--ph) * -0.0055 * ${k + 1}))` }} />
      ))}
      {/* Side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[20%] h-[7%] w-[4px] rounded-l bg-alu-400" style={{ transform: "translateZ(calc(var(--ph) * -0.025))" }} />
      <span aria-hidden="true" className="absolute -left-[3px] top-[30%] h-[7%] w-[4px] rounded-l bg-alu-400" style={{ transform: "translateZ(calc(var(--ph) * -0.025))" }} />
      <span aria-hidden="true" className="absolute -right-[3px] top-[26%] h-[11%] w-[4px] rounded-r bg-alu-400" style={{ transform: "translateZ(calc(var(--ph) * -0.025))" }} />
      {/* Front: metal rim, black bezel, screen */}
      <div className={`absolute inset-0 ${r} bg-linear-to-br from-alu-100 via-alu-300 to-alu-500 p-[calc(var(--ph)*0.006)] shadow-2xl shadow-ink/30`}>
        <div className={`h-full w-full ${r} bg-bezel p-[calc(var(--ph)*0.011)]`}>
          <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[calc(var(--ph)*0.07)] bg-soft text-[calc(var(--ph)*0.021)] text-ink">
            {/* Status bar and the camera pill */}
            <div className="relative flex items-center justify-between px-[1.6em] pt-[1em] text-[0.85em] font-semibold">
              <span>9:41</span>
              <span className="absolute left-1/2 top-[0.7em] h-[1.9em] w-[30%] -translate-x-1/2 rounded-full bg-key" />
              <span className="flex items-center gap-[0.3em]" aria-hidden="true">
                <span className="h-[0.55em] w-[0.25em] rounded-sm bg-ink" /><span className="h-[0.75em] w-[0.25em] rounded-sm bg-ink" /><span className="h-[0.95em] w-[0.25em] rounded-sm bg-ink" />
                <span className="ml-[0.3em] h-[0.95em] w-[1.9em] rounded-[0.3em] border border-ink/60 p-[0.12em]"><span className="block h-full w-[70%] rounded-[0.15em] bg-ink" /></span>
              </span>
            </div>
            <div className="px-[1.4em] pt-[1.6em]">
              <p className="font-display text-[1.05em] font-extrabold">handled<span className="text-signal">.</span></p>
              <p className="font-display text-[1.9em] font-extrabold leading-tight">Our work</p>
            </div>
            {children}
            <span aria-hidden="true" className="absolute bottom-[0.6em] left-1/2 h-[0.3em] w-[35%] -translate-x-1/2 rounded-full bg-ink/70" />
          </div>
        </div>
      </div>
    </>
  );
}

function Wheel({ items, u, reduce }: { items: Project[]; u: MotionValue<number>; reduce: boolean }) {
  if (reduce)
    return (
      <div className="flex-1 space-y-[1em] overflow-y-auto px-[1.2em] pb-[2em] pt-[1em]">
        {items.map((it) => <Card key={it.slug} p={it} />)}
      </div>
    );
  return (
    <div className="relative flex-1 overflow-hidden [perspective:calc(var(--ph)*1.1)]">
      {items.map((it, i) => <WheelItem key={it.slug} i={i} u={u}><Card p={it} /></WheelItem>)}
    </div>
  );
}

// Each card sits on the wheel by its distance from the centre: above tilts back, below tilts forward.
function WheelItem({ i, u, children }: { i: number; u: MotionValue<number>; children: React.ReactNode }) {
  const d = useTransform(u, (v) => i - v);
  const y = useTransform(d, (v) => `calc(-50% + ${v * 78}%)`);
  const rotateX = useTransform(d, (v) => -v * 34);
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 2) * 0.12);
  const opacity = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 1.6) * 0.55);
  const zIndex = useTransform(d, (v) => 10 - Math.round(Math.abs(v) * 2));
  return (
    <motion.div style={{ y, rotateX, scale, opacity, zIndex }} className="absolute inset-x-[1.2em] top-1/2">
      {children}
    </motion.div>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <article className="rounded-[1.4em] bg-white p-[0.8em] shadow-lg shadow-ink/10">
      <MockupPanel type={p.mock} className="aspect-[16/11] rounded-[0.9em]" />
      <div className="px-[0.3em] pb-[0.3em] pt-[0.9em]">
        <p className="text-[0.85em] text-slate">{p.category}</p>
        <h3 className="mt-[0.2em] text-[1.25em] font-extrabold leading-tight">{p.title}</h3>
        <Link href={`/projects/${p.slug}`} className="mt-[0.8em] inline-block rounded-full bg-ink px-[1em] py-[0.5em] text-[0.85em] font-semibold text-paper">
          View project<span className="sr-only">: {p.title}</span>
        </Link>
      </div>
    </article>
  );
}
