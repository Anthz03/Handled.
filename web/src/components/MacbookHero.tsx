"use client";
import { motion, MotionValue, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { SampleSite } from "./SampleSite";

// Pinned hero: a CSS-3D MacBook opens, turns to face you, and scrolls a sample homepage on its screen.
// Follows the parallax principles in the vault: state follows the scroll, soft pin, eased handover,
// only transform/opacity per frame, still composition under reduced motion.

const clamp = (v: number) => Math.min(1, Math.max(0, v));
// Vertical speed fades out over E before the stage sticks and back in after it lets go.
const softPin = (top: number, left: number, E: number) =>
  (Math.abs(top) < E ? (top + E) ** 2 / (4 * E) - Math.max(0, top) : 0) +
  (Math.abs(left) < E ? -((E - left) ** 2) / (4 * E) - Math.min(0, left) : 0);
// Progress eases in and out over the arriving/leaving stretch.
const ramp = (q: number, a: number) => {
  const s = 1 / (1 - a);
  return q < a ? ((q * q) / (2 * a)) * s : q > 1 - a ? 1 - ((1 - q) ** 2 / (2 * a)) * s : (q - a / 2) * s;
};

export function MacbookHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const p = useMotionValue(reduce ? 1 : 0);
  const lift = useMotionValue(0);
  const siteEnd = useMotionValue(0.6); // how far the sample site scrolls: 1 - screen height / site height
  const [wide, setWide] = useState(false);

  useEffect(() => {
    if (reduce) { p.set(1); lift.set(0); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const E = 0.3 * vh;
      const range = r.height - vh;
      const span = range + 2 * E;
      lift.set(softPin(r.top, range + r.top, E));
      const site = el.querySelector<HTMLElement>("[data-site]");
      if (site?.parentElement) siteEnd.set(Math.max(0, 1 - site.parentElement.offsetHeight / site.offsetHeight));
      setWide(window.innerWidth >= 1024);
      p.set(ramp(clamp((E - r.top) / span), Math.min(0.5, (2 * E) / span)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, [reduce, p, lift, siteEnd]);

  // Timeline (p 0 → 1): intro beat, lid opens and laptop turns, screen scrolls, outro.
  const lidAngle = useTransform(p, [0.08, 0.42], [-90, 14]);
  const rx = useTransform(p, [0, 0.45], [-58, -14]);
  const ry = useTransform(p, [0, 0.45], [34, 0]);
  const scale = useTransform(p, [0, 0.45], [0.62, 1]);
  // Starts low and to the right of the headline (clear of the text), ends centered.
  const intro = useTransform(p, [0, 0.45], [1, 0]);
  const x = useTransform(intro, (v) => `${v * (wide ? 20 : 0)}vw`);
  const y = useTransform(intro, (v) => `${v * (wide ? 18 : 26)}svh`);
  const siteY = useTransform(() => `${-clamp((p.get() - 0.48) / 0.38) * siteEnd.get() * 100}%`);
  const glare = useTransform(p, [0.2, 0.5], [0, 1]);
  const introOpacity = useTransform(p, [0.06, 0.2], [1, 0]);
  const introY = useTransform(p, [0.06, 0.2], [0, -60]);
  const outroOpacity = useTransform(p, [0.84, 0.96], [0, 1]);
  const outroY = useTransform(p, [0.84, 0.96], [30, 0]);
  const sticker = useTransform(p, [0, 1], [-20, 300]);
  const stickerScale = useTransform(p, [0.4, 0.5], [0, 1]);

  return (
    <section ref={ref} className={`relative bg-navy text-white on-dark ${reduce ? "" : "h-[340svh] md:h-[380svh]"}`} aria-label="Intro">
      <motion.div style={{ y: lift }} className={`${reduce ? "relative py-16" : "sticky top-0 h-[100svh]"} overflow-hidden`}>
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_72%)]" />
        <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[120px]" />

        {/* Intro beat: its own space before the laptop moves (principle 13) */}
        <motion.div style={reduce ? undefined : { opacity: introOpacity, y: introY }} className={`container-x z-10 ${reduce ? "relative" : "absolute inset-x-0 top-[12svh] md:top-[16svh]"}`}>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-mono text-xs text-white/80">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-signal" /> Websites for local businesses in Metro Manila
          </p>
          <h1 className="hero-type mt-6 max-w-[11ch] md:max-w-[13ch]">We build your website first.</h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
            You pay only if you like it. Two Benildean students, one free homepage preview, zero pressure.
          </p>
          {!reduce && <p className="mt-8 font-mono text-xs text-white/50">Scroll to open it</p>}
        </motion.div>

        {/* The laptop */}
        <div className={`${reduce ? "relative mt-14 h-[calc(var(--w)*0.72)]" : "absolute inset-0"} grid place-items-center [--w:min(820px,90vw,74svh)] [perspective:1800px]`}>
          <motion.div style={reduce ? { x: 0, y: 0 } : { x, y, scale }} className="relative h-0 w-0 [transform-style:preserve-3d] translate-y-[calc(var(--w)*0.16)]">
            <motion.div style={{ rotateX: reduce ? -14 : rx, rotateY: reduce ? 0 : ry }} className="absolute [transform-style:preserve-3d]">
              <Laptop lidAngle={reduce ? undefined : lidAngle} siteY={reduce ? undefined : siteY} glare={glare} />
            </motion.div>
            <motion.div style={reduce ? undefined : { rotate: sticker, scale: stickerScale }} className="absolute -top-[calc(var(--w)*0.62)] right-[calc(var(--w)*-0.5)] z-10 hidden sm:block">
              <Sticker />
            </motion.div>
          </motion.div>
        </div>

        {/* Outro: the point of the scene, then the actions */}
        <motion.div style={reduce ? undefined : { opacity: outroOpacity, y: outroY }} className={`container-x z-10 text-center ${reduce ? "relative mt-10" : "absolute inset-x-0 bottom-[6svh]"}`}>
          <p className="mx-auto max-w-lg text-base text-white/75 md:text-lg">That&apos;s what a free preview looks like. Yours shows your business, your menu, your hours.</p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/start-project" arrow>Get my free preview</Button>
            <Button href="/pricing" variant="outline-light">See pricing</Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Laptop({ lidAngle, siteY, glare }: { lidAngle?: MotionValue<number>; siteY?: MotionValue<string>; glare: MotionValue<number> }) {
  // Units: --w is the laptop width. Deck depth 0.66w, lid height 0.64w (16:10 screen + bezel), slab 0.024w.
  const face = "absolute [backface-visibility:hidden]";
  return (
    <div className="relative [transform-style:preserve-3d]">
      {/* Deck: lies flat, front edge at z = +D/2 */}
      <div className="absolute left-[calc(var(--w)*-0.5)] top-[calc(var(--w)*-0.66)] h-[calc(var(--w)*0.66)] w-[var(--w)] origin-bottom [transform:translateZ(calc(var(--w)*0.33))_rotateX(90deg)] rounded-[calc(var(--w)*0.025)] bg-[linear-gradient(180deg,#c9cfd2,#aab2b6)] p-[calc(var(--w)*0.05)]">
        <div className="grid h-[58%] grid-cols-[repeat(14,1fr)] gap-[calc(var(--w)*0.004)] rounded-[calc(var(--w)*0.01)] bg-[#2a3033] p-[calc(var(--w)*0.008)]">
          {Array.from({ length: 70 }).map((_, i) => <span key={i} className="rounded-[2px] bg-[#1a1f21]" />)}
        </div>
        <div className="mx-auto mt-[calc(var(--w)*0.03)] h-[30%] w-[42%] rounded-[calc(var(--w)*0.012)] bg-[#b3babd] shadow-[inset_0_0_0_1px_rgba(31,36,38,.12)]" />
      </div>
      {/* Slab front edge */}
      <div className="absolute left-[calc(var(--w)*-0.5)] top-0 h-[calc(var(--w)*0.024)] w-[var(--w)] rounded-b-[calc(var(--w)*0.03)] bg-[linear-gradient(180deg,#9aa2a6,#6c7478)] [transform:translateZ(calc(var(--w)*0.33))]">
        <div className="mx-auto h-[40%] w-[16%] rounded-b-md bg-[#5b6266]" />
      </div>
      {/* Shadow on the "table" */}
      <div className="absolute left-[calc(var(--w)*-0.56)] top-[calc(var(--w)*-0.7)] h-[calc(var(--w)*0.76)] w-[calc(var(--w)*1.12)] origin-bottom [transform:translateY(calc(var(--w)*0.03))_translateZ(calc(var(--w)*0.36))_rotateX(90deg)] rounded-[50%] bg-black/45 blur-2xl" />

      {/* Lid: hinged at the back edge of the deck */}
      <motion.div
        style={lidAngle ? { rotateX: lidAngle } : { rotateX: 14 }}
        className="absolute left-[calc(var(--w)*-0.5)] top-[calc(var(--w)*-0.64)] h-[calc(var(--w)*0.64)] w-[var(--w)] origin-bottom [transform-style:preserve-3d] [translate:0_0_calc(var(--w)*-0.33)]"
      >
        {/* Screen side */}
        <div className={`${face} inset-0 rounded-t-[calc(var(--w)*0.03)] bg-[#111517] p-[calc(var(--w)*0.018)] pb-[calc(var(--w)*0.03)] ring-1 ring-[#6c7478]/50`}>
          <div className="relative h-full w-full overflow-hidden rounded-[calc(var(--w)*0.006)] bg-paper text-[calc(var(--w)*0.0155)]">
            <motion.div data-site style={siteY ? { y: siteY } : undefined}><SampleSite /></motion.div>
            <motion.div style={{ opacity: glare }} className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.14),transparent_40%)]" />
          </div>
          <span className="absolute left-1/2 top-[calc(var(--w)*0.007)] h-[calc(var(--w)*0.006)] w-[calc(var(--w)*0.006)] -translate-x-1/2 rounded-full bg-[#2a3033]" />
        </div>
        {/* Back of the lid, lifted off the deck so it shows when closed */}
        <div className={`${face} inset-0 grid place-items-center rounded-t-[calc(var(--w)*0.03)] bg-[linear-gradient(160deg,#d3d8da,#9aa2a6)] [transform:translateZ(calc(var(--w)*-0.01))_rotateY(180deg)]`}>
          <span className="rotate-180 font-display text-[calc(var(--w)*0.05)] font-extrabold text-[#6c7478]/70">h.</span>
        </div>
      </motion.div>
    </div>
  );
}

function Sticker() {
  return (
    <svg viewBox="0 0 120 120" className="h-24 w-24 drop-shadow-xl md:h-28 md:w-28" aria-hidden="true">
      <defs><path id="sticker-ring" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
      <circle cx="60" cy="60" r="58" fill="#ffb627" />
      <text fill="#1f2426" fontSize="12.5" fontWeight="700" letterSpacing="2.4" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href="#sticker-ring">FREE PREVIEW · FREE PREVIEW ·</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fill="#1f2426" fontSize="26" fontWeight="800" style={{ fontFamily: "var(--font-display)" }}>₱0</text>
    </svg>
  );
}
