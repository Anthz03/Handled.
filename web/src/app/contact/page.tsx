import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";
import { MessengerButton } from "@/components/MessengerButton";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Handled about a website, booking system, or a free preview of your new site.",
};

export default function Contact() {
  const items = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: site.location },
    { icon: Clock, label: "Operating hours", value: site.hours },
  ];
  return (
    <>
      <PageHeader eyebrow="Contact us" title="Let's talk." body="Questions, ideas, or just want to say hi? We usually reply within 1–2 business days." />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <ul className="space-y-5">
            {items.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="group flex gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand text-on-brand transition-transform duration-300 group-hover:rotate-[-8deg]"><Icon className="h-5 w-5" /></span>
                <div>
                  <p className="font-display text-sm font-bold text-slate">{label}</p>
                  {href ? <a href={href} className="mt-1 block text-lg font-bold text-navy hover:text-brand">{value}</a> : <p className="mt-1 text-lg font-bold text-navy">{value}</p>}
                </div>
              </li>
            ))}
          </ul>
          <MessengerButton />
          <div className="flex gap-4 text-sm font-semibold">
            <a href={site.socials.facebook} className="text-brand hover:text-navy">Facebook</a>
            <a href={site.socials.linkedin} className="text-brand hover:text-navy">LinkedIn</a>
            <a href={site.socials.instagram} className="text-brand hover:text-navy">Instagram</a>
          </div>
          <div className="rounded-3xl bg-navy p-8 text-white on-dark">
            <h2 className="text-lg font-bold">Want to see your site first?</h2>
            <p className="mt-2 text-sm text-white/70">Request a free homepage preview. No commitment.</p>
            <div className="mt-5"><Button href="/start-project" variant="light" arrow>Get my free preview</Button></div>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
