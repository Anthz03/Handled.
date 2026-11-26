import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader, SectionHeading } from "@/components/Section";
import { Button } from "@/components/Button";
import { CTA } from "@/components/CTA";
import { Stagger, StaggerItem } from "@/components/Motion";
import { addOns, packages, pricingTerms } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Fixed starting prices for websites, booking, and ordering systems for local businesses in Metro Manila. Free homepage preview before you pay.",
};

export default function Pricing() {
  return (
    <>
      <PageHeader eyebrow="Pricing" title="Clear prices. Free preview first." body="No surprise quotes. Pick a starting point, see your free homepage preview, then decide." />
      <section className="container-x py-20">
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <StaggerItem key={p.name} className="h-full">
              <article className={`flex h-full flex-col rounded-[2rem] p-8 md:p-10 ${p.featured ? "bg-navy text-white on-dark" : "bg-white shadow-2xl shadow-navy/10"}`}>
                <h2 className={`font-display text-sm font-bold uppercase tracking-widest ${p.featured ? "text-white/60" : "text-slate"}`}>{p.name}</h2>
                <p className="mt-4">
                  <span className={`text-sm ${p.featured ? "text-white/60" : "text-slate"}`}>from </span>
                  <span className="font-display text-5xl font-extrabold tracking-tight">{p.price}</span>
                  {p.unit && <span className={`text-sm ${p.featured ? "text-white/60" : "text-slate"}`}>{p.unit}</span>}
                </p>
                <p className={`mt-4 leading-relaxed ${p.featured ? "text-white/75" : "text-slate"}`}>{p.forWho}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.includes.map((i) => (
                    <li key={i} className="flex items-start gap-3"><Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {i}</li>
                  ))}
                </ul>
                <div className="mt-8"><Button href="/start-project" variant={p.featured ? "light" : "secondary"} arrow>Get my free preview</Button></div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <section className="bg-soft py-20">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Add-ons" title="Need more? We quote it after a quick call." />
            <ul className="mt-8 space-y-4">
              {addOns.map((a) => (
                <li key={a.name} className="rounded-3xl bg-white p-6">
                  <h3 className="font-bold text-navy">{a.name}</h3>
                  <p className="mt-1 text-slate">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="How payment works" title="Fair and simple." />
            <ul className="mt-8 space-y-4">
              {pricingTerms.map((t) => (
                <li key={t} className="flex items-start gap-3 text-lg text-navy"><Check className="mt-1.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" /> {t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
