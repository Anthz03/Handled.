"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useEffect(() => setOpen(false), [pathname]);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !open);
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const dark = !scrolled && !open; // over the navy page tops

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-colors duration-300 ${dark ? "bg-navy on-dark" : "bg-white/90 shadow-[0_1px_0_rgba(16,29,53,0.08)] backdrop-blur-md"}`}
    >
      <div className={`container-x flex items-center justify-between gap-6 transition-[height] duration-300 ${scrolled ? "h-16" : "h-20"}`}>
        <Logo light={dark} />
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {nav.slice(1).map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(n.href) ? (dark ? "text-white" : "text-navy") : dark ? "text-white/60 hover:text-white" : "text-slate hover:text-navy"
              }`}
            >
              {isActive(n.href) && (
                <motion.span layoutId="nav-pill" className={`absolute inset-0 -z-10 rounded-full ${dark ? "bg-white/10" : "bg-soft"}`} transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/start-project"
            className="group hidden items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-on-brand transition-all hover:bg-navy hover:shadow-lg hover:shadow-brand/30 active:scale-95 sm:inline-flex"
          >
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" /> FREE PREVIEW
          </Link>
          <button
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors xl:hidden ${dark ? "border-white/20 text-white" : "border-slate/20 text-navy"}`}
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white xl:hidden"
          >
            <div className="container-x flex flex-col py-4">
              {nav.map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <Link href={n.href} className={`block py-3 font-display text-2xl font-extrabold ${isActive(n.href) ? "text-brand" : "text-navy"}`}>
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <Link href="/start-project" className="mt-4 rounded-full bg-brand px-4 py-4 text-center text-base font-semibold text-on-brand">
                FREE PREVIEW
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
