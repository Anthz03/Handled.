import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions", description: `Terms for using the ${site.name} website.` };

// [PLACEHOLDER] Draft terms. Review before launch.
export default function Terms() {
  return (
    <>
      <PageHeader title="Terms and Conditions" body="Draft. Last updated: November 2026." />
      <section className="container-x max-w-3xl! py-14 prose-body">
        <p>By using this website, you agree to these terms.</p>
        <h2>Website content</h2>
        <p>Content on this site is for general information. Projects shown in our portfolio are concept and demonstration projects unless stated otherwise.</p>
        <h2>Inquiries and quotations</h2>
        <p>Submitting an inquiry does not create a contract. Any project work is governed by a separate written agreement covering scope, timeline, and fees.</p>
        <h2>Intellectual property</h2>
        <p>The {site.name} name, logo, and website content belong to {site.name} and may not be reused without permission.</p>
        <h2>Contact</h2>
        <p>Questions about these terms? Email <a className="text-brand" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </section>
    </>
  );
}
