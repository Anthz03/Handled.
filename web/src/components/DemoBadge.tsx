export function DemoBadge({ dark }: { dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${dark ? "border-2 border-dashed border-white/50 text-white" : "border-2 border-dashed border-ink/60 text-ink -rotate-2"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> Concept project
    </span>
  );
}
