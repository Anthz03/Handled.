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
          <p className="mt-5 max-w-xs leading-relaxed">{site.altTagline} A student-founded technology consulting startup from Manila.</p>
          <a href={`mailto:${site.email}`} className="mt-5 inline-block font-display text-lg font-bold text-white transition-colors hover:text-brand">{site.email}</a>
        </div>
        <FooterCol title="Company" links={nav.map((n) => ({ href: n.href, label: n.label }))} />
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
          <Link href="/start-project" className="mt-8 inline-flex rounded-full bg-brand px-5 py-3 text-sm font-semibold text-on-brand transition-colors hover:bg-white hover:text-navy">
            START A PROJECT
          </Link>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none mt-16 select-none text-center font-display text-[14.5vw] font-extrabold leading-[0.75] tracking-[-0.06em] text-white/[0.04]">
        {site.shortName.toUpperCase()}
      </p>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-3 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
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
              <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
