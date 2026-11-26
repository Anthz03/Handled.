import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { CTA } from "@/components/CTA";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal } from "@/components/Motion";
import { TimelineBar } from "@/components/TimelineBar";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How Handled delivers projects: discovery, planning, design and development, testing, and deployment.",
};

const details = [
  ["Initial consultation call", "Understanding your goals and constraints", "Reviewing any existing systems"],
  ["Project scope document", "Technical recommendations", "Timeline and quotation"],
  ["Wireframes and UI design", "Database and system architecture", "Development in reviewable stages"],
  ["Functional testing", "Performance checks", "Agreed revisions"],
  ["Launch and deployment", "Documentation handover", "Support and maintenance as agreed"],
];

export default function Process() {
  return (
    <>
      <PageHeader eyebrow="Our process" title="A clear path from idea to launch." body="Five steps that keep every project organized, transparent, and on track." />
      <section className="container-x py-24">
        <ProcessTimeline details={details} />
      </section>

      <section className="bg-soft py-20">
        <div className="container-x">
          <Reveal>
            <h2 className="display-lg text-navy">Sample project timeline</h2>
            <p className="mt-4 max-w-2xl text-lg text-slate">An illustration only. Actual timelines depend on project complexity and scope, and are confirmed in the proposal.</p>
          </Reveal>
          <div className="mt-10 overflow-x-auto rounded-3xl bg-white p-8">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-8 gap-1 font-mono text-[11px] text-slate">
                {Array.from({ length: 8 }).map((_, i) => <span key={i}>Week {i + 1}</span>)}
              </div>
              {[
                { t: "Discovery", s: 0, w: 1 },
                { t: "Planning", s: 1, w: 1 },
                { t: "Design & Development", s: 2, w: 4 },
                { t: "Testing", s: 5, w: 2 },
                { t: "Deployment", s: 7, w: 1 },
              ].map((r) => (
                <div key={r.t} className="mt-3 grid grid-cols-8 gap-1">
                  <TimelineBar start={r.s} span={r.w} label={r.t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
