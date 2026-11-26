"use client";
import { useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import { smoothScroll } from "./lenis";

// Scroll progress for a pinned (sticky) section, per the parallax principles in the vault:
// soft pin (lift), eased handover (ramp), state follows the scroll. Under reduced motion p sits at `still`.
const clamp = (v: number) => Math.min(1, Math.max(0, v));
// E: ease into the pin · F: ease out of it
export const softPin = (top: number, left: number, E: number, F: number) =>
  (Math.abs(top) < E ? (top + E) ** 2 / (4 * E) - Math.max(0, top) : 0) +
  (Math.abs(left) < F ? -((F - left) ** 2) / (4 * F) - Math.min(0, left) : 0);
const ramp = (q: number, a: number) => {
  const s = 1 / (1 - a);
  return q < a ? ((q * q) / (2 * a)) * s : q > 1 - a ? 1 - ((1 - q) ** 2 / (2 * a)) * s : (q - a / 2) * s;
};

// `stage` is the sticky child; when it is taller than the screen, the pin lasts section height minus stage height.
// `release`: how long the soft pin eases out as it lets go, as a fraction of the screen height (it eases in over 0.3).
export function usePinProgress(ref: RefObject<HTMLElement | null>, still = 1, stage?: RefObject<HTMLElement | null>, release = 0.3) {
  const reduce = useReducedMotion();
  const p = useMotionValue(reduce ? still : 0);
  const lift = useMotionValue(0);
  // The section's top on screen, and the pin's geometry (px), for motion that continues past the pin
  const top = useMotionValue(0);
  const geo = useRef({ E: 0, span: 1, range: 0, vh: 1, stageH: 1 });

  useEffect(() => {
    if (reduce) { p.set(still); lift.set(0); return; }
    // Update in the same frame the scroll moves: on Lenis's tick when it runs, on native scroll otherwise.
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const E = 0.3 * vh;
      const F = release * vh;
      const stageH = Math.max(vh, stage?.current?.offsetHeight ?? vh);
      const range = r.height - stageH;
      const span = range + 2 * E;
      geo.current = { E, span, range, vh, stageH };
      top.set(r.top);
      lift.set(softPin(r.top, range + r.top, E, F));
      p.set(ramp(clamp((E - r.top) / span), Math.min(0.5, (2 * E) / span)));
    };
    update();
    const offLenis = smoothScroll.lenis?.on("scroll", update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { offLenis?.(); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, [reduce, ref, p, lift, top, still, stage, release]);

  return { p, lift, reduce, top, geo };
}
