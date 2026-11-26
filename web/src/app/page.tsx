import { Quote } from "lucide-react";
import { Button } from "@/components/Button";
import { MacbookHero } from "@/components/MacbookHero";
import { CautionTape } from "@/components/CautionTape";
import { SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { FounderCard } from "@/components/FounderCard";
import { PostCard } from "@/components/PostCard";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Parallax, Reveal, Stagger, StaggerItem } from "@/components/Motion";
import { founders, posts, projects, services, whyUs } from "@/lib/data";

export default function Home() {
  const steps = [
    { title: "We design a free preview", body: "Send us your business name and your Facebook or Google Maps page. We mock up your homepage at no cost." },
    { title: "You decide", body: "Like it? We agree on a fixed price and build the rest. Don't like it? You owe us nothing." },
    { title: "We launch and look after it", body: "Your site goes live, and we're one Messenger message away for updates and fixes." },
  ];
  const industries = ["Cafés", "Restaurants", "Barbershops", "Salons", "Clinics", "Studios", "Local shops"];

  return (
    <>
      {/* A. Hero: the laptop opens and shows a free preview */}
      <MacbookHero />

      <CautionTape top="Free homepage preview" bottom="You pay only if you like it" />

      {/* B. Intro + how "see it before you pay" works */}
      <section className="container-x py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <SectionHeading eyebrow="Who we are" title="You run the business. We handle the website." />
          <Reveal delay={0.1}>
            <p className="text-xl leading-relaxed text-navy">
              Handled was started by two Benildean students who love building things. You run your business; we handle the website, the bookings, and the tech behind them, at a fixed price you see upfront.
            </p>
            <div className="mt-8"><Button href="/about" variant="secondary" arrow>More about us</Button></div>
          </Reveal>
        </div>
        <Stagger as="ol" className="mt-20 grid gap-px overflow-hidden rounded-3xl bg-slate/15 md:grid-cols-3">
          {steps.map((st, i) => (
            <StaggerItem as="li" key={st.title} className="bg-white p-8 md:p-10">
              <span className="font-display text-5xl font-extrabold tracking-tight text-brand">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-extrabold text-navy">{st.title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{st.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal>
          <p className="mt-10 font-mono text-xs uppercase tracking-widest text-slate">Built for</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {industries.map((x, i) => <li key={x} className={`rounded-full px-4 py-2 text-sm font-semibold text-ink transition-transform duration-300 hover:rotate-0 hover:scale-110 ${i % 3 === 1 ? "bg-signal rotate-2" : i % 3 === 2 ? "bg-sand -rotate-2" : "bg-soft rotate-1"}`}>{x}</li>)}
          </ul>
          <p className="mt-4 text-sm text-slate">Don&apos;t see your business? If you serve local customers, we can help.</p>
        </Reveal>
      </section>

      {/* C. Services */}
      <section className="relative bg-soft py-28">
        <div className="grid-bg-light absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="container-x relative">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="What we do" title="Six ways we help you build." body="From a first website to a custom system, we cover the full path from idea to working solution." />
            <Reveal><Button href="/services" variant="secondary" arrow>All services</Button></Reveal>
          </div>
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => <StaggerItem key={s.slug} className="h-full"><ServiceCard s={s} /></StaggerItem>)}
          </Stagger>
        </div>
      </section>

      {/* D. Featured projects — alternating parallax columns */}
      <section className="container-x py-28">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our projects" title="Featured concept projects." body="Internal demonstration projects that show the kinds of solutions we design and build." />
          <Reveal><Button href="/projects" variant="secondary" arrow>View all projects</Button></Reveal>
        </div>
        <div className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {projects.slice(0, 4).map((p, i) => (
            <Parallax key={p.slug} speed={i % 2 ? -0.25 : 0.15} className={i % 2 ? "md:mt-24" : ""}>
              <Reveal><ProjectCard p={p} large /></Reveal>
            </Parallax>
          ))}
        </div>
      </section>

      {/* E. Why us — sticky heading */}
      <section className="bg-navy py-28 text-white on-dark">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading light eyebrow="Why choose us" title="A technology partner, not just a developer." body="We start with your business, not with the code." />
          </div>
          <Stagger as="ul" className="space-y-4">
            {whyUs.map((w, i) => (
              <StaggerItem as="li" key={w.title}>
                <div className="group flex gap-6 rounded-3xl bg-white/5 p-7 transition-all duration-500 hover:translate-x-2 hover:-rotate-1 hover:bg-signal hover:text-ink">
                  <span className="font-mono text-sm text-brand transition-colors group-hover:text-ink">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-extrabold">{w.title}</h3>
                    <p className="mt-1.5 text-white/65 transition-colors group-hover:text-ink/80">{w.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* F. Founders */}
      <section className="container-x py-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Meet the founders" title="Two students. One spontaneous idea." body="We're Benildeans who share a love for technology and a drive to build things that solve real-world problems." />
            <Reveal delay={0.15}><div className="mt-8"><Button href="/team" variant="secondary" arrow>Meet the team</Button></div></Reveal>
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
            <SectionHeading eyebrow="Our process" title="Five clear steps from idea to launch." />
            <Reveal delay={0.1}><div className="mt-8"><Button href="/process" variant="secondary" arrow>How we work</Button></div></Reveal>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* H. Testimonials (placeholder layout only) */}
      <section className="container-x py-28">
        <SectionHeading eyebrow="Client feedback" title="What clients will say." body="We're just getting started. This space is reserved for real feedback from our first clients." center />
        <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <StaggerItem key={i}>
              <figure className="h-full rounded-3xl border-2 border-dashed border-slate/20 p-8 transition-colors hover:border-brand/40">
                <Quote className="h-8 w-8 text-brand" aria-hidden="true" />
                <blockquote className="mt-5 leading-relaxed text-slate">
                  Placeholder: a real client testimonial will appear here once a project is completed and the client agrees to share feedback.
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-soft" />
                  <span className="text-sm font-medium text-slate">Future client</span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* I. Insights */}
      <section className="bg-soft py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Insights" title="Practical tech, explained simply." />
            <Reveal><Button href="/insights" variant="secondary" arrow>All articles</Button></Reveal>
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
