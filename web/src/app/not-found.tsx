import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-x py-32 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-3 text-4xl font-extrabold text-navy">Page not found</h1>
      <p className="mt-4 text-slate">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8"><Button href="/" arrow>Back to home</Button></div>
    </section>
  );
}
