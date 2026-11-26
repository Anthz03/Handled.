import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { MessengerButton } from "@/components/MessengerButton";
import { getService } from "@/lib/data";

export const metadata: Metadata = {
  title: "Get a Free Preview",
  description: "Request a free preview of your new homepage from Handled. We reply within 1–2 business days.",
};

export default async function StartProject({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const service = getService((await searchParams).service ?? "");

  const include = [
    "Your business name",
    "Your Facebook page or Google Maps link, so we can use your photos, menu, and colors",
    "What you want customers to do: order, book, call, or visit",
    "Anything you like or dislike about your current site, if you have one",
  ];

  return (
    <>
      <PageHeader eyebrow="Free preview" title="See your new website before you pay." body="Tell us about your business. We'll design your homepage for free and send it within 1–2 business days." />
      <section className="container-x relative grid gap-6 py-20 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm preview topic={service?.title ?? ""} />
        <div className="self-start rounded-[2rem] bg-navy p-8 text-white md:p-12 on-dark">
          <h2 className="font-display text-sm font-bold text-white/60">What helps us most</h2>
          <ul className="mt-5 space-y-3">
            {include.map((i) => (
              <li key={i} className="flex items-start gap-3 text-white/85"><Check className="mt-1 h-4 w-4 shrink-0 text-brand" aria-hidden="true" /> {i}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-white/60">
            No commitment. If you don&apos;t like the preview, you owe us nothing.
          </p>
          <MessengerButton className="mt-6" />
        </div>
      </section>
    </>
  );
}
