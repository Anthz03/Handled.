import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Minus } from "lucide-react";
import { Parallax, Reveal, SplitWords, Stagger, StaggerItem } from "@/components/Motion";
import { Button } from "@/components/Button";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { getService, projects, services } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  return s ? { title: `${s.title} Services`, description: s.summary } : {};
}

function List({ title, items, icon = "check" }: { title: string; items: string[]; icon?: "check" | "minus" }) {
  const Icon = icon === "check" ? Check : Minus;
  return (
    <div className="h-full rounded-3xl bg-soft p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-navy/5">
      <h2 className="font-display text-sm font-bold text-brand">{title}</h2>
      <ul className="mt-4 space-y-3">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3 leading-relaxed text-navy">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${icon === "check" ? "text-brand" : "text-slate/60"}`} /> {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServiceDetail({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const related = projects.filter((p) => p.services.includes(s.slug));

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white on-dark">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_0%,black,transparent_70%)]" />
        <Parallax speed={0.5} className="absolute -bottom-10 right-[6%] hidden text-white/[0.06] lg:block">
          <ServiceIcon icon={s.icon} className="h-72 w-72" />
        </Parallax>
        <div className="container-x relative py-20 md:py-28">
          <div className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-on-brand"><ServiceIcon icon={s.icon} /></span>
          </div>
          <h1 className="display-xl mt-6 max-w-4xl"><SplitWords text={s.title} /></h1>
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{s.overview}</p>
            <div className="mt-10"><Button href={`/start-project?service=${s.slug}`}>Request this service</Button></div>
          </Reveal>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal><h2 className="display-lg text-navy">What we offer</h2></Reveal>
        <Stagger as="ul" gap={0.05} className="mt-8 flex flex-wrap gap-3">
          {s.offers.map((o) => <StaggerItem as="li" key={o}><span className="block rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand on-dark">{o}</span></StaggerItem>)}
        </Stagger>
        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          <StaggerItem><List title="Problems we address" items={s.problems} icon="minus" /></StaggerItem>
          <StaggerItem><List title="How we solve them" items={s.solutions} /></StaggerItem>
          <StaggerItem><List title="Deliverables" items={s.deliverables} /></StaggerItem>
          <StaggerItem><List title="Benefits" items={s.benefits} /></StaggerItem>
        </Stagger>
      </section>

      {related.length > 0 && (
        <section className="bg-soft py-20">
          <div className="container-x">
            <Reveal><h2 className="display-lg text-navy">Related concept projects</h2></Reveal>
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="container-x py-24">
        <Reveal><h2 className="display-lg text-navy">Frequently asked questions</h2></Reveal>
        <div className="mt-10 space-y-3">
          {s.faqs.map((f) => (
            <details key={f.q} className="group rounded-3xl bg-soft p-6 transition-colors open:bg-navy open:text-white open:on-dark md:p-8">
              <summary className="cursor-pointer list-none text-lg font-bold marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-mono text-on-brand transition-transform duration-300 group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-white/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <CTA title={`Need ${s.title.toLowerCase()}?`} body="Tell us about your project and we'll get back to you within 1–2 business days." label="Request this service" />
    </>
  );
}
