// Hand-drawn marks: a loose arrow, used to point at the next thing to do.
export function DoodleArrow({ className = "h-12 w-16", flip }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 60" className={className} style={flip ? { scale: "-1 1" } : undefined} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10c18-6 40-2 50 12s6 26 0 30" />
      <path d="M44 44l10 9 8-12" />
    </svg>
  );
}
