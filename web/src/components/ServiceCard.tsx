import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/data";
import { ServiceIcon } from "./ServiceIcon";

// Each card is a sticker: its own colour and tilt, picked by its place in the grid. Hover straightens it.
const looks = [
  { bg: "bg-white", tilt: "-rotate-1" },
  { bg: "bg-signal", tilt: "rotate-1" },
  { bg: "bg-sand", tilt: "-rotate-[0.6deg]" },
  { bg: "bg-sand", tilt: "rotate-[0.8deg]" },
  { bg: "bg-white", tilt: "-rotate-[0.8deg]" },
  { bg: "bg-signal", tilt: "rotate-[0.5deg]" },
];

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  const look = looks[i % looks.length];
  return (
    <Link
      href={`/services/${s.slug}`}
      className={`pop pop-hover group flex h-full flex-col rounded-3xl p-7 text-ink hover:rotate-0 ${look.bg} ${look.tilt}`}
    >
      <div className="flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-ink text-paper group-hover:animate-wiggle">
          <ServiceIcon icon={s.icon} className="h-6 w-6" />
        </span>
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink transition-transform duration-500 ease-[var(--ease-bounce)] group-hover:rotate-45 group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <h3 className="mt-8 text-2xl font-extrabold">{s.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-ink/80">{s.summary}</p>
      <span className="mt-6 text-sm font-bold underline decoration-2 underline-offset-4">Learn more</span>
    </Link>
  );
}
