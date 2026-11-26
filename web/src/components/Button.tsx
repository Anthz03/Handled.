import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "outline-light";
  className?: string;
};

const styles = {
  primary: "bg-signal text-ink hover:-rotate-1 hover:shadow-[4px_4px_0_#1f2426] hover:-translate-y-0.5",
  secondary: "border border-navy/15 bg-white text-navy hover:border-navy hover:bg-navy hover:text-white",
  ghost: "text-brand hover:text-navy px-0!",
  light: "bg-white text-navy hover:bg-sand hover:text-navy",
  "outline-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-navy",
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-300 active:scale-[0.97] ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
