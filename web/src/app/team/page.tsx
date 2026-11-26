import type { Metadata } from "next";
import { Plus } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/Section";
import { FounderCard } from "@/components/FounderCard";
import { Stagger, StaggerItem } from "@/components/Motion";
import { CTA } from "@/components/CTA";
import { founders } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Meet the two Benildean co-founders behind Coreform Digital Solutions.",
};

export default function Team() {
  return (
    <>
      <PageHeader eyebrow="Meet the team" title="The People Behind the Solutions." body="Behind every successful digital solution is a team committed to understanding problems, exploring possibilities, and delivering meaningful results." />
      <section className="container-x py-24">
        <SectionHeading eyebrow="Co-founders" title="Two Benildeans who love technology." body="We started Coreform on a spontaneous decision because we wanted to use technology to solve real-world problems." />
        <Stagger className="mt-14 grid gap-6 lg:grid-cols-2">
          {founders.map((f, i) => <StaggerItem key={i}><FounderCard f={f} full /></StaggerItem>)}
        </Stagger>
      </section>
      <section className="container-x pb-4">
        <div className="flex flex-col items-start gap-5 rounded-3xl border-2 border-dashed border-slate/20 p-8 transition-colors hover:border-brand/40 md:flex-row md:items-center">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-on-brand"><Plus className="h-6 w-6" /></span>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-navy">Growing the team</h2>
            <p className="mt-1 text-sm text-slate">We&apos;re open to working with developers, designers, and consultants who share our goals. Interested in collaborating?</p>
          </div>
          <a href={`mailto:${site.email}?subject=Collaboration`} className="rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-brand active:scale-[0.97] on-dark">Get in touch</a>
        </div>
      </section>
      <CTA />
    </>
  );
}
