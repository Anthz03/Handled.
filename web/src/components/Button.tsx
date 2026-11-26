import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "outline-light";
  arrow?: boolean;
  className?: string;
};

const styles = {
  primary: "bg-brand text-on-brand hover:bg-brand/85 hover:shadow-lg hover:shadow-navy/20",
  secondary: "border border-navy/15 bg-white text-navy hover:border-navy hover:bg-navy hover:text-white",
  ghost: "text-brand hover:text-navy px-0!",
  light: "bg-white text-navy hover:bg-sand hover:text-navy",
  "outline-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-navy",
};

export function Button({ href, children, variant = "primary", arrow, className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97] ${styles[variant]} ${className}`}
    >
      {children}
      {arrow && (
        <span className="relative inline-flex h-4 w-4 overflow-hidden">
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-5" />
          <ArrowRight className="absolute h-4 w-4 -translate-x-5 transition-transform duration-300 group-hover:translate-x-0" />
        </span>
      )}
    </Link>
  );
}
