export function DemoBadge({ dark }: { dark?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-medium uppercase tracking-wider ${dark ? "bg-white/10 text-white" : "bg-brand/10 text-brand"}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" /> Concept project
    </span>
  );
}
