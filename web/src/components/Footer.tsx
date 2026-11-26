import Link from "next/link";
import { nav, site } from "@/lib/site";
import { services } from "@/lib/data";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white/60 on-dark">
      <div className="container-x grid gap-12 pt-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs leading-relaxed">{site.altTagline} Websites and systems for local businesses, from two students in Manila.</p>
          <a href={`mailto:${site.email}`} className="mt-5 inline-block font-display text-lg font-bold text-white transition-colors hover:text-brand">{site.email}</a>
        </div>
        <FooterCol title="Company" links={[...nav.map((n) => ({ href: n.href, label: n.label })), { href: "/process", label: "Our Process" }]} />
        <FooterCol title="Services" links={services.map((s) => ({ href: `/services/${s.slug}`, label: s.title }))} />
        <div>
          <FooterCol
            title="Connect"
            links={[
              { href: site.socials.facebook, label: "Facebook" },
              { href: site.socials.linkedin, label: "LinkedIn" },
              { href: site.socials.instagram, label: "Instagram" },
            ]}
          />
          <Link href="/start-project" className="pop-sm mt-8 inline-flex rounded-full bg-signal px-5 py-3 text-sm font-bold text-ink transition ease-[var(--ease-bounce)] hover:-rotate-2 hover:-translate-y-0.5">
            FREE PREVIEW
          </Link>
        </div>
      </div>
      {/* Giant wordmark; each letter hops when the cursor passes over it */}
      <p aria-hidden="true" className="mt-16 flex select-none justify-center font-display text-[16vw] font-extrabold leading-[0.8] tracking-[-0.05em] text-signal">
        {[...site.shortName.toLowerCase(), "."].map((ch, i) => (
          <span key={i} className={`inline-block transition-transform duration-300 ease-[var(--ease-bounce)] hover:-translate-y-[0.12em] hover:-rotate-6 ${ch === "." ? "text-sand" : ""}`}>{ch}</span>
        ))}
      </p>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name.replace(/\.$/, "")}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
              <span className="h-px w-3 origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
