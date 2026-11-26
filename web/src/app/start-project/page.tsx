import type { Metadata } from "next";
import { Check, Mail } from "lucide-react";
import { PageHeader } from "@/components/Section";
import { getService } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a Project",
  description: "Tell Coreform about your project. We respond within 1–2 business days.",
};

// Phase 1 interim page. Phase 2 replaces this with the guided multi-step inquiry form
// (database, file uploads, reference numbers, and Resend email notifications).
export default async function StartProject({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const service = getService((await searchParams).service ?? "");
  const subject = `Project Inquiry${service ? ` – ${service.title}` : ""}`;
  const body = [
    "Full name:",
    "Contact number:",
    "Location:",
    "Company / organization (optional):",
    "",
    `Services needed: ${service ? service.title : ""}`,
    "Project title:",
    "Project description:",
    "Business problem:",
    "Expected features:",
    "Preferred completion date:",
    "Budget range:",
    "",
  ].join("\n");
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const include = [
    "Your name and how to reach you",
    "What you need (website, system, database, design, consulting, documentation)",
    "The problem you want to solve",
    "Features you have in mind",
    "Your preferred timeline and budget range",
  ];

  return (
    <>
      <PageHeader eyebrow="Start a project" title="Tell us about your project." body="We'll review your requirements and get back to you within 1–2 business days." />
      <section className="container-x relative grid gap-6 py-20 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[2rem] bg-white p-8 shadow-2xl shadow-navy/10 md:p-12">
          <p className="inline-flex rounded-full bg-brand/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-brand">Online form launching soon</p>
          <h2 className="mt-5 text-3xl font-extrabold text-navy">Send us your project details by email</h2>
          <p className="mt-3 leading-relaxed text-slate">
            Our guided project inquiry form is being built. In the meantime, the button below opens an email with a short template you can fill in{service ? ` for ${service.title}` : ""}.
          </p>
          <a href={mailto} className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-on-brand transition-all hover:bg-navy hover:shadow-lg hover:shadow-brand/30 active:scale-[0.97]">
            <Mail className="h-4 w-4" /> Email your project details
          </a>
          <p className="mt-4 text-sm text-slate">Or write to <a href={`mailto:${site.email}`} className="font-medium text-brand">{site.email}</a> directly.</p>
        </div>
        <div className="rounded-[2rem] bg-navy p-8 text-white md:p-12 on-dark">
          <h2 className="font-display text-sm font-bold text-white/60">What to include</h2>
          <ul className="mt-5 space-y-3">
            {include.map((i) => (
              <li key={i} className="flex items-start gap-3 text-white/85"><Check className="mt-1 h-4 w-4 shrink-0 text-brand" /> {i}</li>
            ))}
          </ul>
          <p className="mt-8 text-sm leading-relaxed text-white/60">
            Not sure about some details? That&apos;s okay. Share what you know and we&apos;ll figure out the rest together during the consultation.
          </p>
        </div>
      </section>
    </>
  );
}
