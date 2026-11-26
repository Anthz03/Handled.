import { Button } from "@/components/Button";
import { MacbookHero } from "@/components/MacbookHero";
import { PhoneProjects } from "@/components/PhoneProjects";
import { SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { CTA } from "@/components/CTA";
import { FounderCard } from "@/components/FounderCard";
import { PostCard } from "@/components/PostCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { founders, packages, posts, projects, services } from "@/lib/data";

export default function Home() {
  const steps = [
    { title: "We design a free preview", body: "Send us your business name and your Facebook or Google Maps page. We mock up your homepage at no cost." },
    { title: "You decide", body: "Like it? We agree on a fixed price and build the rest. Don't like it? You owe us nothing." },
    { title: "We launch and look after it", body: "Your site goes live, and we're one Messenger message away for updates and fixes." },
  ];
  const industries = ["Cafés", "Restaurants", "Barbershops", "Salons", "Clinics", "Studios", "Local shops"];

  return (
    <>
      {/* A + B. Hero: the laptop opens on a free preview, then closes onto the intro behind it */}
      <MacbookHero>
        <div className="container-x w-full py-10">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-12">
            <SectionHeading title="You run the business. We handle the website." />
            <div>
              <p className="text-xl leading-relaxed text-navy">
                Handled was started by two Benildean students who love building things. You run your business; we handle the website, the bookings, and the tech behind them, at a fixed price you see upfront.
              </p>
              <div className="mt-8"><Button href="/about" variant="secondary">Our story</Button></div>
            </div>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-slate/15 md:grid-cols-3">
            {steps.map((st, i) => (
              <li key={st.title} className="bg-white p-6 md:p-8">
                <span className="font-display text-5xl font-extrabold tracking-tight text-brand">0{i + 1}</span>
                <h3 className="mt-4 text-xl font-extrabold text-navy">{st.title}</h3>
                <p className="mt-2 leading-relaxed text-slate">{st.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm font-semibold text-navy">Built for</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {industries.map((x, i) => <li key={x} className={`rounded-full px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 hover:rotate-0 hover:scale-110 ${i % 3 === 1 ? "bg-signal rotate-2" : i % 3 === 2 ? "bg-sand -rotate-2" : "bg-soft rotate-1"}`}>{x}</li>)}
          </ul>
          <p className="mt-4 text-sm text-slate">Don&apos;t see your business? If you serve local customers, we can help.</p>
        </div>
      </MacbookHero>

      {/* C. Services */}
      <section className="relative bg-soft py-28">
        <div className="grid-bg-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-x relative">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading title="Stuff we make." body="Websites first. Booking, ordering and the techy stuff behind them when your business needs it." />
            <Reveal><Button href="/services" variant="secondary">See everything we do</Button></Reveal>
          </div>
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <StaggerItem key={s.slug} className="h-full"><ServiceCard s={s} /></StaggerItem>)}
          </Stagger>
        </div>
      </section>

      {/* D. Featured projects: heading left, the projects roll past inside a 3D phone */}
      <PhoneProjects items={projects.slice(0, 4)} />

      {/* E. Prices: the offer, published, so nobody has to ask */}
      <section className="bg-navy py-28 text-white on-dark">
        <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-end">
          <div>
            <SectionHeading light title="Prices you see before you ask." body="The preview is free. Then 50% down, 50% on launch, two rounds of revisions." />
            <Reveal delay={0.1}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/start-project">Get my free preview</Button>
                <Button href="/pricing" variant="outline-light">What each includes</Button>
              </div>
            </Reveal>
          </div>
          <Stagger as="ul" className="grid gap-8 sm:grid-cols-3">
            {packages.map((pk) => (
              <StaggerItem as="li" key={pk.name} className="border-t border-white/15 pt-6">
                <p className="text-sm font-semibold text-white/70">{pk.name}</p>
                <p className={`mt-3 font-display text-5xl font-extrabold tracking-tight ${pk.featured ? "text-signal" : "text-white"}`}>
                  {pk.price}<span className="text-base font-semibold text-white/60">{pk.unit}</span>
                </p>
                <p className="mt-4 leading-relaxed text-white/65">{pk.forWho}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* F. Founders */}
      <section className="container-x py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div>
            <SectionHeading title="Two students. One spontaneous idea." body="We're Benildeans who share a love for technology and a drive to build things that solve real-world problems." />
            <Reveal delay={0.15}><div className="mt-8"><Button href="/team" variant="secondary">Meet the team</Button></div></Reveal>
          </div>
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {founders.map((f, i) => (
              <StaggerItem key={i} className={i === 1 ? "sm:mt-16" : ""}><FounderCard f={f} /></StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* G. Process */}
      <section className="bg-soft py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.5fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading title="How it goes, start to finish." />
            <Reveal delay={0.1}><div className="mt-8"><Button href="/process" variant="secondary">How we work</Button></div></Reveal>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* I. Insights */}
      <section className="bg-soft py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading title="Quick reads for busy owners." />
            <Reveal><Button href="/insights" variant="secondary">Read them all</Button></Reveal>
          </div>
          <Stagger className="mt-14 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => <StaggerItem key={p.slug}><PostCard p={p} /></StaggerItem>)}
          </Stagger>
        </div>
      </section>

      {/* J. Final CTA */}
      <CTA />
    </>
  );
}
