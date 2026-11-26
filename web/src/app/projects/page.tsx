import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/Section";
import { ProjectFilter } from "@/components/ProjectFilter";
import { CTA } from "@/components/CTA";

export const metadata: Metadata = {
  title: "Our Projects",
  description: "Concept and demonstration projects showing the websites, systems, databases, and designs Coreform builds.",
};

export default function Projects() {
  return (
    <>
      <PageHeader eyebrow="Our projects" title="What we can build for you." body="Explore our concept projects across websites, systems, databases, and design." />
      <section className="container-x py-20">
        <p className="mb-12 flex items-start gap-3 rounded-2xl bg-brand/10 p-5 text-sm text-navy">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          These are internal demonstration (concept) projects created to show our capabilities. They are not client engagements.
        </p>
        <ProjectFilter />
      </section>
      <CTA title="Have a similar project in mind?" label="Build Something Similar" />
    </>
  );
}
