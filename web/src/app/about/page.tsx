import type { Metadata } from "next";
import { PageHeader, SectionHeading } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { values } from "@/lib/data";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "About Us",
  description: "Handled was started by two Benildean students who love technology and want to build solutions for real-world problems.",
};

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About us" title="Built by students who love solving real problems." body="A small team with a simple goal: make practical technology accessible to the people and businesses who need it." />

      <section className="container-x grid gap-12 py-28 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32 lg:self-start"><SectionHeading eyebrow="Our story" title="It started on a whim." /></div>
        <Reveal className="space-y-6 text-xl leading-relaxed text-navy">
          <p>
            Handled began with two students from De La Salle-College of Saint Benilde and one spontaneous decision. We both loved technology, and we kept noticing the same thing around us: small businesses, organizations, and people with good ideas who were held back by manual processes, scattered records, or no online presence at all.
          </p>
          <p>
            So one day we stopped just talking about it and decided to start a company. No big plan, just a shared belief that technology should solve real problems, and that we could help.
          </p>
          <p>
            Today Handled is how we put that belief to work: designing websites, building systems, structuring databases, and giving honest technology advice to clients who need practical solutions.
          </p>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-soft py-28">
        <Parallax speed={0.4} className="pointer-events-none absolute -top-10 left-0 right-0 select-none text-center font-display text-[18vw] font-extrabold leading-none tracking-tighter text-navy/[0.04]">
          <span aria-hidden="true">PURPOSE</span>
        </Parallax>
        <Stagger className="container-x relative grid gap-6 md:grid-cols-2">
          <StaggerItem className="rounded-[2rem] bg-white p-10 md:p-12">
            <p className="font-display text-sm font-bold text-brand">Our mission</p>
            <p className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy">To empower individuals and businesses through accessible, practical, and thoughtfully developed technology solutions.</p>
          </StaggerItem>
          <StaggerItem className="rounded-[2rem] bg-navy p-10 text-white md:p-12 on-dark">
            <p className="font-display text-sm font-bold text-brand">Our vision</p>
            <p className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight">To become a trusted technology consulting partner recognized for delivering meaningful digital solutions and helping businesses adapt and grow through innovation.</p>
          </StaggerItem>
        </Stagger>
      </section>

      <section className="container-x py-28">
        <SectionHeading eyebrow="Core values" title="What guides our work." />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <StaggerItem key={v.title} className="h-full">
              <div className="group h-full rounded-3xl bg-soft p-8 transition-all duration-500 hover:-translate-y-1.5 hover:bg-brand">
                <span className="font-mono text-sm text-brand transition-colors group-hover:text-white/70">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-extrabold text-navy transition-colors group-hover:text-white">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-slate transition-colors group-hover:text-white/85">{v.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-navy py-28 text-white on-dark">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeading light eyebrow="Our approach" title="Understand first. Build second." />
          <Reveal delay={0.1}><p className="text-xl leading-relaxed text-white/75">
            Every project begins with understanding your requirements: what you do, who you serve, and what is getting in the way. Only then do we recommend technology, and sometimes the honest answer is a simpler tool than you expected. When we build, we build exactly what was agreed, document it clearly, and stay with you until it works.
          </p></Reveal>
        </div>
      </section>

      <CTA />
    </>
  );
}
