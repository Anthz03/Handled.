"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { Button } from "./Button";
import { Sticker } from "./Sticker";
import { DoodleArrow } from "./Doodle";
import { softPin, usePinProgress } from "@/lib/usePinProgress";

// three.js loads after the page is up; the laptop draws in once it arrives.
const LaptopScene = dynamic(() => import("./LaptopScene"), { ssr: false });

// Pinned hero, one scroll story: the closed laptop under the headline opens until its screen covers the view, its sample
// homepage scrolls to the end, then the lid closes, uncovering the next section (children), and the laptop settles,
// closed, on the line between this section and the next. Follows the vault's parallax principles: state follows the
// scroll, soft pin, eased handover, only transform/opacity per frame, a still and complete page under reduced motion.

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);
const CLOSED_AT = 0.8; // the closed laptop sits this far down the first screen (LaptopScene's CLOSED_Y: 0.5 + 0.3)

export function MacbookHero({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const { p, lift, reduce, top, geo } = usePinProgress(ref, 1, stage);
  const siteEnd = useMotionValue(0.6); // how far the sample site scrolls; LaptopScene measures it

  // Timeline (p 0 → 1)
  //   0    → 0.30  lid opens; the laptop turns to face you and grows until its screen covers the view
  //   0.34 → 0.66  the sample site scrolls to its end
  //   0.70 → 0.86  lid closes while the next section fades in; the laptop takes its closed tilt and size and comes to a
  //                spot a little above where it rests (only ever moving down)
  //   then the line between this section and the next rises to meet the closed laptop and carries it off (eased pick-up)
  const toOpen = useTransform(p, (v) => smooth(clamp(v / 0.3)));
  const toRest = useTransform(p, (v) => smooth(clamp((v - 0.7) / 0.16)));
  // The glide, in screen space: once the lid has shut, the laptop holds its spot on screen while the line between this
  // section and the next rises towards it; the line then picks it up and carries it. The pick-up is a soft minimum, so
  // the laptop eases from still to the page's speed: one path, always upward, no dip. The scene holds still and only
  // its canvas moves, so nothing can drift out of step.
  const glideY = useTransform(() => {
    const t = top.get();
    const { E, span, range, vh, stageH } = geo.current;
    const F = 0.3 * vh;
    // Hold from the lid shutting, or from the pin starting to let go if that comes first
    const from = Math.max(E - 0.86 * span, F - range);
    if (t >= from) return 0;
    const stageTop = Math.min(Math.max(t, 0), t + range) + lift.get(); // where the sticky stage is on screen
    const line = stageTop + stageH;
    const held = softPin(from, range + from, E, F) + CLOSED_AT * vh; // the laptop's screen spot when the hold starts
    const k = 0.22 * vh; // how gradual the pick-up is
    const h = clamp(0.5 + (0.5 * (line - held)) / k);
    const spot = line + (held - line) * h - k * h * (1 - h); // smooth min(held, line)
    return spot - stageTop - CLOSED_AT * vh;
  });
  const lid = useTransform(p, (v) => (reduce ? 1 : smooth(clamp((v - 0.06) / 0.24)) * (1 - smooth(clamp((v - 0.7) / 0.16)))));
  const site = useTransform(p, (v) => clamp((v - 0.34) / 0.32));
  const headOpacity = useTransform(p, [0.04, 0.16], [1, 0]);
  const headY = useTransform(p, [0.04, 0.16], [0, -60]);
  const headVisibility = useTransform(headOpacity, (v) => (v < 0.02 ? "hidden" : "visible"));
  // The next section fades in as the lid closes, over the same stretch
  const backOpacity = useTransform(p, [0.7, 0.86], [0, 1]);
  const sticker = useTransform(p, [0, 1], [-20, 300]);
  const stickerScale = useTransform(p, [0.3, 0.34, 0.66, 0.7], [0, 1, 1, 0]);

  const headline = (
    <motion.div style={reduce ? undefined : { opacity: headOpacity, y: headY, visibility: headVisibility }} className={`container-x ${reduce ? "relative pt-16" : "absolute inset-x-0 top-[12svh] z-20 md:top-[14svh]"}`}>
      <h1 className="hero-type max-w-[11ch] md:max-w-[13ch]">We build your website first.</h1>
      <p className="mt-5 max-w-md text-lg leading-relaxed text-steel">Free homepage preview for Metro Manila businesses. Pay if you like it.</p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button href="/start-project">Get my free preview</Button>
        {!reduce && <p className="hidden items-center gap-2 text-sm font-semibold text-ink sm:flex"><DoodleArrow className="h-9 w-12 rotate-[70deg] animate-bob" />or scroll to watch one get built</p>}
      </div>
    </motion.div>
  );

  if (reduce)
    return (
      <section ref={ref} className="relative bg-paper text-ink" aria-label="Intro">
        {headline}
        <div className="relative mt-6 h-[70svh]">
          <LaptopScene still lid={lid} toOpen={toOpen} toRest={toRest} site={site} siteEnd={siteEnd} />
        </div>
        {children}
      </section>
    );

  return (
    // z-10: the resting laptop hangs over the top of the next section
    <section ref={ref} className="relative z-10 bg-paper text-ink" aria-label="Intro">
      <motion.div ref={stage} style={{ y: lift }} className="sticky top-0 min-h-[100svh]">
        <div className="grid-bg-light absolute inset-x-0 top-0 h-[100svh] [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_72%)]" />
        {/* Back: the next section, faded in behind the laptop, then uncovered by the closing lid; bottom space for the laptop to settle in */}
        <motion.div style={{ opacity: backOpacity }} className="relative flex min-h-[100svh] items-center pb-[24svh]">
          {children}
        </motion.div>
        {/* Front: the laptop, one screen tall; after the lid shuts it slides down as a whole (the glide) and may hang over
            the next section */}
        <motion.div style={{ y: glideY }} className="pointer-events-none absolute inset-x-0 top-0 h-[100svh]">
          <div className="h-full">
            <LaptopScene lid={lid} toOpen={toOpen} toRest={toRest} site={site} siteEnd={siteEnd} />
            <motion.div style={{ rotate: sticker, scale: stickerScale }} className="absolute right-[7%] top-[12%] hidden sm:block">
              <Sticker />
            </motion.div>
          </div>
        </motion.div>
        {headline}
      </motion.div>
      {/* Scroll distance the story plays over */}
      <div aria-hidden="true" className="h-[300svh]" />
    </section>
  );
}
