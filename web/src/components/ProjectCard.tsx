import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/data";
import { MockupPanel } from "./Mockup";
import { DemoBadge } from "./DemoBadge";

export function ProjectCard({ p, large }: { p: Project; large?: boolean }) {
  return (
    <Link href={`/projects/${p.slug}`} className="group flex h-full flex-col">
      <MockupPanel type={p.mock} className={`rounded-3xl ${large ? "aspect-[16/11]" : "aspect-[16/10]"}`} />
      <div className="flex flex-1 flex-col pt-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-slate">{p.category}</span>
          <DemoBadge />
        </div>
        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-extrabold text-navy transition-colors group-hover:text-brand">{p.title}</h3>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-slate/20 text-navy transition-all duration-300 group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-on-brand">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <p className="mt-2 leading-relaxed text-slate">{p.summary}</p>
        <span className="sr-only">View Project</span>
      </div>
    </Link>
  );
}
