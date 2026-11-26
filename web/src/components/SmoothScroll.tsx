"use client";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { smoothScroll } from "@/lib/lenis";

// Lenis with syncTouch so phones scroll and scrub on the same frame (parallax principle 2).
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const l = new Lenis({ lerp: 0.09, syncTouch: true, anchors: true });
    lenis.current = l;
    smoothScroll.lenis = l;
    let raf = requestAnimationFrame(function loop(t) { l.raf(t); raf = requestAnimationFrame(loop); });
    return () => { cancelAnimationFrame(raf); l.destroy(); lenis.current = null; smoothScroll.lenis = null; };
  }, []);

  useEffect(() => { lenis.current?.scrollTo(0, { immediate: true }); }, [pathname]);
  return null;
}
