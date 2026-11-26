"use client";
import { useState } from "react";
import { site } from "@/lib/site";

// Phase 1: opens the visitor's email app with the message pre-filled.
// Phase 2 will replace this with a server action that stores messages and sends email via Resend.
export function ContactForm() {
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const email = String(f.get("email") || "").trim();
    const message = String(f.get("message") || "").trim();
    if (!name || !email || !message) return setError("Please fill in your name, email, and message.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");
    setError("");
    const subject = String(f.get("subject") || "").trim() || `Website inquiry from ${name}`;
    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const input = "mt-2 w-full rounded-2xl border-2 border-transparent bg-soft px-4 py-3.5 text-navy outline-none transition focus:border-brand focus:bg-white";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-[2rem] bg-white p-6 shadow-2xl shadow-navy/10 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">Full name *<input name="name" autoComplete="name" className={input} required /></label>
        <label className="block text-sm font-medium text-navy">Email address *<input name="email" type="email" autoComplete="email" className={input} required /></label>
      </div>
      <label className="block text-sm font-medium text-navy">Subject<input name="subject" className={input} /></label>
      <label className="block text-sm font-medium text-navy">Message *<textarea name="message" rows={5} className={input} required /></label>
      {error && <p role="alert" className="rounded-xl bg-navy px-4 py-3 text-sm font-medium text-white on-dark">⚠ {error}</p>}
      {sent && !error && <p role="status" className="rounded-xl bg-brand/10 px-4 py-3 text-sm font-medium text-brand">Your email app should now be open with your message. Just press send.</p>}
      <button type="submit" className="w-full rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-on-brand transition-all hover:bg-navy hover:shadow-lg hover:shadow-brand/30 active:scale-[0.97] sm:w-auto">Send message</button>
      <p className="text-xs text-slate">This opens your email app. Prefer not to? Email us directly at <a className="text-brand" href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </form>
  );
}
