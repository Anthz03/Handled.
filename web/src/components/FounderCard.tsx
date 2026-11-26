import { ExternalLink } from "lucide-react";
import type { Founder } from "@/lib/data";

// A polaroid taped to the wall: tilted, straightens on hover.
const tilts = ["-rotate-2", "rotate-2"];
const photoBg = ["bg-signal", "bg-sand"];

export function FounderCard({ f, full, i = 0 }: { f: Founder; full?: boolean; i?: number }) {
  return (
    <article className={`pop pop-hover group relative h-full rounded-xl bg-white p-3 hover:rotate-0 ${tilts[i % 2]}`}>
      <span aria-hidden="true" className="absolute -top-3 left-1/2 z-10 h-7 w-24 -translate-x-1/2 rotate-[-4deg] bg-mist/80 shadow-sm" />
      {/* [PLACEHOLDER] Replace with a professional portrait: <Image src="/team/name.jpg" fill className="object-cover" ... /> */}
      <div className={`relative aspect-[4/3] overflow-hidden rounded-md border-2 border-ink ${photoBg[i % 2]}`} aria-label="Portrait placeholder" role="img">
        <div className="grid-bg-light absolute inset-0" />
        <span className="absolute inset-0 grid place-items-center font-display text-8xl font-extrabold tracking-tighter text-ink transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:-rotate-6 group-hover:scale-110">
          {f.initials}
        </span>
      </div>
      <div className="px-4 pb-4 pt-6">
        <p className="inline-block rounded-full border-2 border-ink px-3 py-0.5 text-xs font-bold text-ink">{f.role}</p>
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
                {f.skills.map((s, i) => <li key={i} className="rounded-full bg-soft px-3 py-1 text-xs text-ink">{s}</li>)}
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
