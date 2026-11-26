import { SplitWords, Reveal } from "./Motion";

export function SectionHeading({ title, body, center, light }: { title: string; body?: string; center?: boolean; light?: boolean }) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <h2 className={`display-lg ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {body && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/70" : "text-slate"}`}>{body}</p>}
    </Reveal>
  );
}

export function PageHeader({ title, body }: { title: string; body?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white on-dark">
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_0%,black,transparent_70%)]" />
      <div className="container-x relative pb-20 pt-20 md:pb-28 md:pt-28">
        <h1 className="display-xl max-w-4xl"><SplitWords text={title} /></h1>
        {body && (
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{body}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
