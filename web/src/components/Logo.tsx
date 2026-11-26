import Link from "next/link";
import { site } from "@/lib/site";

// Geometric "C" lettermark built from modular blocks: structure + connectivity.
export function LogoMark({ className = "h-8 w-8", accent = "#6C7478" }: { className?: string; accent?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2.5" fill={accent} />
      <rect x="18" y="2" width="12" height="12" rx="2.5" fill="currentColor" opacity="0.9" />
      <rect x="2" y="18" width="12" height="12" rx="2.5" fill="currentColor" opacity="0.9" />
      <rect x="18" y="18" width="12" height="12" rx="2.5" fill="currentColor" opacity="0.18" />
      <rect x="13" y="6.5" width="6" height="3" fill={accent} />
      <rect x="6.5" y="13" width="3" height="6" fill={accent} />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 ${light ? "text-white" : "text-navy"}`} aria-label={`${site.name} home`}>
      <LogoMark accent={light ? "#D1BFA8" : "#6C7478"} />
      <span className="font-display text-[17px] font-extrabold tracking-tight">
        {site.shortName}
        <span className="font-medium opacity-60"> Digital</span>
      </span>
    </Link>
  );
}
