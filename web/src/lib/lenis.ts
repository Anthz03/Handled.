import type Lenis from "lenis";

// The page's Lenis instance, so scroll-driven scenes can update on Lenis's own tick (no frame of lag).
export const smoothScroll: { lenis: Lenis | null } = { lenis: null };
