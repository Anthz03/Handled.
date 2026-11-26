"use client";
import { TriangleAlert } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Sticker } from "./Sticker";
import { useState } from "react";
import { site } from "@/lib/site";

const businessTypes = ["Café", "Restaurant", "Barbershop", "Salon", "Clinic", "Studio or gym", "Shop", "Other"];
const needs = ["Free website preview", "Starter Page", "Business Site", "Booking or ordering system", "AI Messenger assistant", "Something else"];

// Posts to /api/contact (Resend). If email isn't configured or fails, the visitor is shown direct contact options instead.
export function ContactForm({ preview = false, topic = "" }: { preview?: boolean; topic?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "fallback">("idle");
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const email = String(data.email || "").trim();
    if (!String(data.name || "").trim() || !email || !String(data.message || "").trim()) return setError("Please fill in your name, email, and message.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Please enter a valid email address.");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) return setStatus("sent");
      if (res.status === 400) {
        const body = await res.json().catch(() => ({}));
        setStatus("idle");
        return setError(body.error || "Please check the form and try again.");
      }
      setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "sent")
    return (
      <div role="status" className="relative rounded-[2rem] bg-white p-8 shadow-2xl shadow-navy/10 md:p-12">
        {/* Only shown after the server confirms the send: the sticker slaps onto the card */}
        <motion.div
          className="absolute -right-4 -top-8 md:-right-8"
          initial={reduce ? false : { scale: 2.2, rotate: -40, opacity: 0 }}
          animate={{ scale: 1, rotate: 12, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
        >
          <Sticker />
        </motion.div>
        <h2 className="text-3xl font-extrabold text-navy">Got it, salamat!</h2>
        <p className="mt-3 leading-relaxed text-slate">We&apos;ll get back to you within 1 to 2 business days{preview ? " with your free preview" : ""}.</p>
      </div>
    );

  const input = "mt-2 w-full rounded-2xl border-2 border-transparent bg-soft px-4 py-3.5 text-navy outline-none transition focus:border-brand focus:bg-white";
  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-[2rem] bg-white p-6 shadow-2xl shadow-navy/10 md:p-10">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">Your name *<input name="name" autoComplete="name" className={input} required /></label>
        <label className="block text-sm font-medium text-navy">Email *<input name="email" type="email" autoComplete="email" className={input} required /></label>
        <label className="block text-sm font-medium text-navy">Mobile number<input name="phone" type="tel" autoComplete="tel" className={input} /></label>
        <label className="block text-sm font-medium text-navy">Business name<input name="business" autoComplete="organization" className={input} /></label>
        <label className="block text-sm font-medium text-navy">
          Type of business
          <select name="businessType" className={input} defaultValue="">
            <option value="">Choose one</option>
            {businessTypes.map((b) => <option key={b}>{b}</option>)}
          </select>
        </label>
        <label className="block text-sm font-medium text-navy">
          What do you need?
          <select name="need" className={input} defaultValue={preview ? needs[0] : ""}>
            <option value="">Choose one</option>
            {needs.map((n) => <option key={n}>{n}</option>)}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium text-navy">Facebook page, Google Maps, or current website<input name="link" type="url" placeholder="https://" className={input} /></label>
      <label className="block text-sm font-medium text-navy">
        {preview ? "Anything we should know? *" : "Message *"}
        <textarea name="message" rows={5} className={input} required defaultValue={topic ? `I'm interested in: ${topic}\n\n` : ""} />
      </label>
      {/* honeypot: hidden from people, bots fill it */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {error && <p role="alert" className="rounded-xl bg-navy px-4 py-3 text-sm font-medium text-white on-dark"><TriangleAlert className="mr-2 inline h-4 w-4 align-[-2px]" aria-hidden="true" />{error}</p>}
      {status === "fallback" && (
        <p role="alert" className="rounded-xl bg-brand/10 px-4 py-3 text-sm font-medium text-navy">
          Our form isn&apos;t accepting messages right now. Please email us at{" "}
          <a className="font-bold text-brand" href={`mailto:${site.email}`}>{site.email}</a>
          {site.socials.messenger && (
            <>
              {" "}or <a className="font-bold text-brand" href={site.socials.messenger} target="_blank" rel="noreferrer">message us on Messenger</a>
            </>
          )}
          .
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className="w-full rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-on-brand transition hover:bg-navy hover:shadow-lg hover:shadow-brand/30 active:scale-[0.97] disabled:opacity-60 sm:w-auto">
        {status === "sending" ? "Sending…" : preview ? "Get my free preview" : "Send message"}
      </button>
    </form>
  );
}
