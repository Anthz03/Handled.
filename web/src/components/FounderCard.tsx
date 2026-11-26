import { ExternalLink } from "lucide-react";
import type { Founder } from "@/lib/data";

export function FounderCard({ f, full }: { f: Founder; full?: boolean }) {
  return (
    <article className="group h-full overflow-hidden rounded-3xl bg-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-navy/10">
      {/* [PLACEHOLDER] Replace with a professional portrait: <Image src="/team/name.jpg" fill className="object-cover" ... /> */}
      <div className="relative aspect-[4/3] overflow-hidden bg-navy on-dark" aria-label="Portrait placeholder" role="img">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand/50 blur-3xl transition-transform duration-700 group-hover:scale-150" />
        <span className="absolute inset-0 grid place-items-center font-display text-7xl font-extrabold tracking-tighter text-white/90 transition-transform duration-700 group-hover:scale-110">
          {f.initials}
        </span>
      </div>
      <div className="p-7">
        <p className="font-mono text-xs uppercase tracking-wider text-brand">{f.role}</p>
        <h3 className="mt-2 text-2xl font-extrabold text-navy">{f.name}</h3>
        <p className="mt-3 leading-relaxed text-slate">{f.bio}</p>
        {full && (
          <div className="mt-7 space-y-6">
            <div>
              <h4 className="font-display text-sm font-bold text-navy">Areas of specialization</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {f.specializations.map((s) => <li key={s} className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-on-brand">{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-navy">Technical skills</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {f.skills.map((s, i) => <li key={i} className="rounded-full bg-white px-3 py-1 text-xs text-slate">{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-display text-sm font-bold text-navy">Background</h4>
              <p className="mt-2 text-sm text-slate">{f.background}</p>
            </div>
          </div>
        )}
        <a href={f.linkedin} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand">
          LinkedIn <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
