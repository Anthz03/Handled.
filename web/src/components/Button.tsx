import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "outline-light";
  className?: string;
};

const styles = {
  primary: "pop-sm bg-signal text-ink hover:-rotate-2 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--pop-shadow)]",
  secondary: "pop-sm bg-white text-navy hover:rotate-1 hover:-translate-y-0.5 hover:bg-sand hover:shadow-[6px_6px_0_var(--pop-shadow)]",
  ghost: "text-brand hover:text-navy px-0!",
  light: "bg-white text-navy hover:bg-sand hover:text-navy",
  "outline-light": "border border-white/25 text-white hover:border-white hover:bg-white hover:text-navy",
};

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-bold transition duration-300 ease-[var(--ease-bounce)] active:scale-[0.97] ${styles[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
