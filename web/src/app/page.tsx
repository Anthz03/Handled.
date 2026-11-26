import { Quote } from "lucide-react";
import { Button } from "@/components/Button";
import { HeroVisual } from "@/components/HeroVisual";
import { SectionHeading } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { CTA } from "@/components/CTA";
import { FounderCard } from "@/components/FounderCard";
import { PostCard } from "@/components/PostCard";
import { Marquee } from "@/components/Marquee";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CountUp, Parallax, Reveal, SplitWords, Stagger, StaggerItem } from "@/components/Motion";
import { founders, posts, process, projects, services, whyUs } from "@/lib/data";

export default function Home() {
  const facts = [
    { n: services.length, label: "Core services" },
    { n: projects.length, label: "Concept projects" },
    { n: process.length, label: "Step delivery process" },
    { n: founders.length, label: "Benildean founders" },
  ];

  return (
    <>
      {/* A. Hero */}
      <section className="relative overflow-hidden bg-navy text-white on-dark">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_30%,black,transparent_75%)]" />
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-brand/25 blur-[140px]" />
        <div className="container-x relative grid items-center gap-14 pb-24 pt-14 md:pt-20 lg:grid-cols-[1.1fr_1fr] lg:pb-32">
          <div>
            <Reveal y={12}>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/80">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-brand" /> Technology consulting<span className="hidden sm:inline"> · Manila, PH</span>
              </p>
            </Reveal>
            <h1 className="mt-7 text-[clamp(2.3rem,4.3vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.025em]">
              <SplitWords text="Your Ideas. Our Technology. Real Solutions." accent={["Our", "Technology."]} delay={0.1} />
            </h1>
            <Reveal delay={0.55}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
                We help individuals, startups, and businesses transform their ideas into practical digital solutions through website development, custom systems, database engineering, and technology consulting.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/start-project" arrow>Start a Project</Button>
                <Button href="/services" variant="outline-light">Explore Our Services</Button>
              </div>
            </Reveal>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee items={services.map((s) => s.title)} />

      {/* B. Intro + honest numbers */}
      <section className="container-x py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-end">
          <SectionHeading eyebrow="Who we are" title="Technology That Works for Your Business." />
          <Reveal delay={0.1}>
            <p className="text-xl leading-relaxed text-navy">
              Coreform was started by two Benildean students who love technology and wanted to use it to solve real problems. We listen first, understand how your business works, then recommend and build the technology that actually fits.
            </p>
            <div className="mt-8"><Button href="/about" variant="secondary" arrow>More about us</Button></div>
          </Reveal>
        </div>
        <Stagger className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-slate/15 lg:grid-cols-4">
          {facts.map((f) => (
            <StaggerItem key={f.label} className="bg-white p-8 md:p-10">
              <CountUp to={f.n} className="font-display text-6xl font-extrabold tracking-tight text-brand md:text-7xl" />
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-slate">{f.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
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
                <div className="group flex gap-6 rounded-3xl bg-white/5 p-7 transition-all duration-500 hover:translate-x-2 hover:bg-brand">
                  <span className="font-mono text-sm text-brand transition-colors group-hover:text-white">0{i + 1}</span>
                  <div>
                    <h3 className="text-xl font-extrabold">{w.title}</h3>
                    <p className="mt-1.5 text-white/65 transition-colors group-hover:text-white/90">{w.body}</p>
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
