import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Reveal, SplitWords, Stagger, StaggerItem } from "@/components/Motion";
import { DemoBadge } from "@/components/DemoBadge";
import { MockupPanel } from "@/components/Mockup";
import { ServiceCard } from "@/components/ServiceCard";
import { CTA } from "@/components/CTA";
import { getProject, getService, projects } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.title} (Concept Project)`, description: p.summary } : {};
}

export default async function ProjectDetail({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const related = p.services.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white on-dark">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_0%,black,transparent_70%)]" />
        <div className="container-x relative pb-40 pt-14 md:pb-56 md:pt-20">
          <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All projects
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-white/70">{p.category}</span>
            <DemoBadge dark />
          </div>
          <h1 className="display-xl mt-5 max-w-4xl"><SplitWords text={p.title} /></h1>
          <Reveal delay={0.3}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{p.overview}</p></Reveal>
        </div>
      </section>

      <section className="container-x relative -mt-32 pb-16 md:-mt-44">
        <Reveal y={60}>
          <div className="group">
            <MockupPanel type={p.mock} className="mx-auto max-w-5xl rounded-[2.5rem] bg-brand! p-8 md:p-16" />
          </div>
        </Reveal>
        <p className="mt-4 text-center text-sm text-slate">Concept mockup</p>
      </section>

      <section className="container-x grid gap-12 pb-20 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-extrabold text-navy">The business problem</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy">{p.problem}</p>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-navy">Proposed solution</h2>
            <p className="mt-3 text-lg leading-relaxed text-navy">{p.solution}</p>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-navy">Key functionalities</h2>
            <Stagger as="ul" gap={0.06} className="mt-5 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <StaggerItem as="li" key={f}>
                  <span className="flex items-start gap-3 rounded-2xl bg-soft p-4 font-medium text-navy transition-colors hover:bg-brand hover:text-on-brand">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" /> {f}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          {p.erd && (
            <div>
              <h2 className="text-3xl font-extrabold text-navy">Data structure (simplified ERD)</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {p.erd.map((e) => (
                  <div key={e.entity} className="overflow-hidden rounded-2xl bg-soft">
                    <div className="bg-navy px-4 py-2 font-mono text-sm font-semibold text-white on-dark">{e.entity}</div>
                    <ul className="divide-y divide-white font-mono text-xs text-navy">
                      {e.fields.map((f) => <li key={f} className="px-4 py-2">{f}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-navy p-7 text-white on-dark">
            <h2 className="font-display text-sm font-bold text-white/60">Technologies</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tech.map((t) => <li key={t} className="rounded-full bg-brand px-3 py-1 text-xs font-medium text-on-brand">{t}</li>)}
            </ul>
          </div>
          <div className="rounded-3xl bg-soft p-7">
            <h2 className="font-display text-sm font-bold text-brand">Expected benefits</h2>
            <ul className="mt-4 space-y-3">
              {p.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-slate"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {b}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-slate/80">Expected benefits of this type of solution. Not measured results.</p>
          </div>
        </aside>
      </section>

      <section className="bg-soft py-20">
        <div className="container-x">
          <Reveal><h2 className="display-lg text-navy">Related services</h2></Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => <ServiceCard key={s.slug} s={s} />)}
          </div>
        </div>
      </section>

      <CTA title="Build Something Similar." body="Have a project like this in mind? Tell us about it." label="Build Something Similar" />
    </>
  );
}
