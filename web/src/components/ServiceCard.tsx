import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/data";
import { ServiceIcon } from "./ServiceIcon";
import { Spotlight } from "./Motion";

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Spotlight className="h-full rounded-3xl">
      <Link
        href={`/services/${s.slug}`}
        className="group flex h-full flex-col rounded-3xl border border-slate/20 bg-white/60 p-7 transition duration-500 hover:-rotate-1 hover:border-brand/40"
      >
        <div className="flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-soft text-navy transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-brand group-hover:text-on-brand">
            <ServiceIcon icon={s.icon} />
          </span>
          <span className="text-sm text-slate">{s.number}</span>
        </div>
        <h3 className="mt-8 text-xl font-extrabold text-navy">{s.title}</h3>
        <p className="mt-3 flex-1 leading-relaxed text-slate">{s.summary}</p>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-brand">
          Learn more <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Spotlight>
  );
}
