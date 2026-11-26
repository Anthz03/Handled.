import { Button } from "./Button";
import { Parallax, Reveal } from "./Motion";
import { LogoMark } from "./Logo";

export function CTA({
  title = "See your new site before you pay.",
  body = "Send us your business name and Facebook or Google Maps page. We'll design a free preview of your homepage.",
  label = "Get my free preview",
}: { title?: string; body?: string; label?: string }) {
  return (
    <section className="container-x py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-sand px-6 py-20 text-center md:px-16 md:py-28">
        <div className="grid-bg-light absolute inset-0" />
        <Parallax speed={0.6} className="absolute -left-10 top-6 hidden md:block">
          <LogoMark className="h-40 w-40 text-navy opacity-10" />
        </Parallax>
        <Parallax speed={-0.5} className="absolute -right-8 bottom-0 hidden md:block">
          <div className="h-48 w-48 rounded-[2.5rem] border-[14px] border-navy/10" />
        </Parallax>
        <Reveal className="relative">
          <h2 className="display-lg mx-auto max-w-3xl text-navy">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-navy">{body}</p>
          <div className="mt-10">
            <Button href="/start-project">{label}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
