import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/Section";
import { Button } from "@/components/Button";
import { ServiceIcon } from "@/components/ServiceIcon";
import { CTA } from "@/components/CTA";
import { services } from "@/lib/data";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

export const metadata: Metadata = {
  title: "Services",
  description: "Website development, custom system development, database design and ERD, UI/UX design, IT consulting, and technical documentation services in the Philippines.",
};

export default function Services() {
  return (
    <>
      <PageHeader title="Everything you need to go from idea to working solution." body="Six focused services you can use on their own or together." />
      <section className="container-x py-12">
        {services.map((s) => (
          <article key={s.slug} id={s.slug} className="grid gap-10 border-b border-slate/20 py-20 last:border-0 lg:grid-cols-[1fr_1.2fr]">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-on-brand"><ServiceIcon icon={s.icon} /></span>
              </div>
              <h2 className="display-lg mt-6 text-navy">{s.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-slate">{s.overview}</p>
              <div className="mt-8"><Button href={`/services/${s.slug}`} variant="secondary">Service details</Button></div>
            </Reveal>
            <Stagger as="ul" gap={0.06} className="grid content-start gap-3 sm:grid-cols-2">
              {s.offers.map((o) => (
                <StaggerItem as="li" key={o}>
                  <span className="flex h-full items-start gap-3 rounded-2xl bg-soft p-5 font-medium text-navy transition duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {o}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </article>
        ))}
      </section>
      <CTA />
    </>
  );
}
