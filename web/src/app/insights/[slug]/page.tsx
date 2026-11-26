import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostCard, PostCover } from "@/components/PostCard";
import { Button } from "@/components/Button";
import { Reveal, SplitWords } from "@/components/Motion";
import { formatDate, getPost, getService, postAuthor, posts } from "@/lib/data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { type: "article", title: p.title, description: p.excerpt } } : {};
}

export default async function Article({ params }: Props) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const service = getService(p.service);
  const related = posts.filter((x) => x.slug !== p.slug && (x.category === p.category || x.service === p.service)).slice(0, 3);

  return (
    <>
      <header className="relative overflow-hidden bg-navy pb-40 text-white md:pb-52 on-dark">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_0%,black,transparent_70%)]" />
        <div className="container-x relative max-w-3xl! pt-14">
          <Link href="/insights" className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 hover:text-white">
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All insights
          </Link>
          <p className="mt-8 text-sm font-semibold text-brand">{p.category}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"><SplitWords text={p.title} /></h1>
          <p className="mt-6 text-sm text-white/60">By {postAuthor}, <time dateTime={p.date}>{formatDate(p.date)}</time></p>
        </div>
      </header>
      <article className="container-x max-w-3xl! pb-14">
        <Reveal y={50}><PostCover p={p} className="-mt-32 aspect-[2/1] rounded-3xl md:-mt-40" /></Reveal>
        <div className="prose-body mt-10 text-lg">
          {p.body.map((b, i) => (
            <div key={i}>
              {b.h && <h2>{b.h}</h2>}
              {b.p && <p>{b.p}</p>}
              {b.list && <ul>{b.list.map((l) => <li key={l}>{l}</li>)}</ul>}
            </div>
          ))}
        </div>
        {service && (
          <div className="mt-14 rounded-3xl bg-brand p-8 text-on-brand md:p-10">
            <p className="font-display text-sm font-bold text-white/70">Related service</p>
            <h2 className="mt-2 text-2xl font-bold">{service.title}</h2>
            <p className="mt-2 text-white/80">{service.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`/start-project?service=${service.slug}`} variant="light">Start a project</Button>
              <Link href={`/services/${service.slug}`} className="inline-flex items-center px-2 text-sm font-semibold text-white/80 hover:text-white">Learn more</Link>
            </div>
          </div>
        )}
      </article>
      {related.length > 0 && (
        <section className="border-t border-slate/20 bg-soft py-16">
          <div className="container-x">
            <h2 className="display-lg text-navy">Related articles</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">{related.map((r) => <PostCard key={r.slug} p={r} />)}</div>
          </div>
        </section>
      )}
    </>
  );
}
