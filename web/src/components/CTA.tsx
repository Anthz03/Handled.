import { Button } from "./Button";
import { Parallax, Reveal } from "./Motion";
import { Sticker } from "./Sticker";
import { DoodleArrow } from "./Doodle";

export function CTA({
  title = "See your new site before you pay.",
  body = "Send us your business name and Facebook or Google Maps page. We'll design a free preview of your homepage.",
  label = "Get my free preview",
}: { title?: string; body?: string; label?: string }) {
  return (
    <section className="container-x py-24">
      <div className="pop relative overflow-hidden rounded-[2.5rem] bg-signal px-6 py-20 text-center md:px-16 md:py-28">
        <div className="grid-bg-light absolute inset-0" />
        {/* Tumbling blocks */}
        <Parallax speed={0.6} className="absolute -left-6 top-8 hidden md:block">
          <div className="h-28 w-28 rotate-12 rounded-3xl border-2 border-ink bg-sand shadow-[5px_5px_0_var(--color-ink)]" />
        </Parallax>
        <Parallax speed={-0.5} className="absolute -right-10 bottom-6 hidden md:block">
          <div className="h-40 w-40 rounded-full border-2 border-ink bg-white shadow-[5px_5px_0_var(--color-ink)]" />
        </Parallax>
        <div className="absolute right-[12%] top-8 hidden lg:block">
          <Sticker className="h-28 w-28 animate-spin-slow drop-shadow-[4px_4px_0_var(--color-ink)]" />
        </div>
        <Reveal className="relative">
          <h2 className="display-xl mx-auto max-w-3xl text-ink">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink">{body}</p>
          <div className="relative mt-10 inline-block">
            <DoodleArrow className="absolute -left-20 -top-8 hidden h-14 w-20 -rotate-12 text-ink md:block" />
            <Button href="/start-project" variant="secondary">{label}</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
