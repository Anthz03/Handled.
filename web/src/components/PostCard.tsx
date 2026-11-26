import Link from "next/link";
import type { Post } from "@/lib/data";
import { formatDate, postAuthor } from "@/lib/data";

// Generated covers in brand colours. Each category gets its own geometric motif.
const motifs: Record<string, { bg: string; shape: React.ReactNode }> = {
  Websites: { bg: "bg-steel", shape: <rect x="30%" y="25%" width="40%" height="50%" rx="10" fill="none" stroke="#D1BFA8" strokeWidth="2" /> },
  Databases: { bg: "bg-navy on-dark", shape: <g fill="none" stroke="#D1BFA8" strokeWidth="2"><ellipse cx="50%" cy="35%" rx="18%" ry="8%" /><ellipse cx="50%" cy="55%" rx="18%" ry="8%" /><ellipse cx="50%" cy="75%" rx="18%" ry="8%" /></g> },
  Systems: { bg: "bg-navy on-dark", shape: <g fill="#D1BFA8"><rect x="30%" y="30%" width="16%" height="16%" rx="4" /><rect x="54%" y="30%" width="16%" height="16%" rx="4" opacity=".5" /><rect x="30%" y="54%" width="16%" height="16%" rx="4" opacity=".5" /><rect x="54%" y="54%" width="16%" height="16%" rx="4" /></g> },
  Consulting: { bg: "bg-mist", shape: <g fill="none" stroke="#1F2426" strokeWidth="2" opacity=".7"><circle cx="50%" cy="50%" r="22%" /><circle cx="50%" cy="50%" r="10%" /></g> },
  Documentation: { bg: "bg-steel", shape: <g fill="#EEF1F2" opacity=".8"><rect x="30%" y="30%" width="40%" height="5%" rx="3" /><rect x="30%" y="42%" width="30%" height="5%" rx="3" /><rect x="30%" y="54%" width="36%" height="5%" rx="3" /><rect x="30%" y="66%" width="22%" height="5%" rx="3" /></g> },
  Design: { bg: "bg-navy on-dark", shape: <g><circle cx="42%" cy="50%" r="16%" fill="#D1BFA8" /><rect x="48%" y="34%" width="22%" height="32%" rx="6" fill="#EEF1F2" opacity=".85" /></g> },
};

export function PostCover({ p, className = "" }: { p: Post; className?: string }) {
  const m = motifs[p.category] ?? motifs.Systems;
  return (
    <div className={`relative overflow-hidden ${m.bg} ${className}`}>
      <div className="grid-bg absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110" aria-hidden="true">{m.shape}</svg>
      <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy">{p.category}</span>
    </div>
  );
}

export function PostCard({ p }: { p: Post }) {
  return (
    <Link href={`/insights/${p.slug}`} className="group flex h-full flex-col">
      <PostCover p={p} className="aspect-[16/10] rounded-3xl" />
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-sm text-slate">{formatDate(p.date)}, by {postAuthor}</p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug text-navy transition-colors group-hover:text-brand">{p.title}</h3>
        <p className="mt-2 leading-relaxed text-slate">{p.excerpt}</p>
      </div>
    </Link>
  );
}
