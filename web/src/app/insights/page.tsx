import type { Metadata } from "next";
import { PageHeader } from "@/components/Section";
import { PostCard } from "@/components/PostCard";
import { posts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Insights",
  description: "Plain-language articles on websites, databases, ERDs, systems, UI/UX, and technology for small businesses.",
};

export default function Insights() {
  return (
    <>
      <PageHeader eyebrow="Insights" title="Practical tech, explained simply." body="Short, plain-language guides to help you make better technology decisions." />
      <section className="container-x py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => <PostCard key={p.slug} p={p} />)}
        </div>
      </section>
    </>
  );
}
