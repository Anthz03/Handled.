import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: `How ${site.name} collects and protects personal information.` };

// [PLACEHOLDER] Draft policy. Have it reviewed before launch to ensure compliance with RA 10173.
export default function Privacy() {
  return (
    <>
      <PageHeader title="Privacy Policy" body="Draft. Last updated: November 2026." />
      <section className="container-x max-w-3xl! py-14 prose-body">
        <p>{site.name} respects your privacy and is committed to protecting your personal information in accordance with the Data Privacy Act of 2012 (Republic Act No. 10173).</p>
        <h2>Information we collect</h2>
        <p>We only collect information you choose to give us, such as your name, email address, contact number, location, company, and project details when you contact us or submit a project inquiry.</p>
        <h2>Why we collect it</h2>
        <ul>
          <li>To evaluate and respond to your inquiry</li>
          <li>To communicate with you about your project</li>
          <li>To provide the consulting or development services you request</li>
        </ul>
        <h2>Sharing</h2>
        <p>We do not sell your information. We only share it with service providers that help us operate (for example, email and hosting providers), and only as needed for the purposes above.</p>
        <h2>Retention</h2>
        <p>We keep inquiry information only as long as needed for the purposes above or as required by law, after which it is securely deleted.</p>
        <h2>Your rights</h2>
        <p>You have the right to be informed, to access, correct, and request deletion of your personal data, and to object to its processing. To exercise these rights, email us at <a className="text-brand" href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </section>
    </>
  );
}
