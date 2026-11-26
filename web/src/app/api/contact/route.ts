import { NextResponse } from "next/server";

// Sends one plain-text notification email to the founders through Resend's HTTP API (no SDK needed).
// Env: RESEND_API_KEY, CONTACT_TO_EMAIL, optional CONTACT_FROM_EMAIL (defaults to Resend's test sender,
// which can only deliver to the Resend account owner's address until a domain is verified).
// shortcut: no rate limiting beyond the honeypot; add one (e.g. Upstash) if spam shows up.

const MAX = { name: 100, email: 200, phone: 40, business: 120, businessType: 60, need: 60, link: 300, message: 3000 };
type Field = keyof typeof MAX;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (data.website) return NextResponse.json({ ok: true }); // honeypot filled: pretend success, send nothing

  const f = {} as Record<Field, string>;
  for (const k of Object.keys(MAX) as Field[]) f[k] = String(data[k] ?? "").trim().slice(0, MAX[k]);
  if (!f.name || !f.email || !f.message) return NextResponse.json({ error: "Please fill in your name, email, and message." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const text = [
    `Name: ${f.name}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone || "-"}`,
    `Business: ${f.business || "-"}`,
    `Type: ${f.businessType || "-"}`,
    `Needs: ${f.need || "-"}`,
    `FB / Maps / website: ${f.link || "-"}`,
    "",
    f.message,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Handled website <onboarding@resend.dev>",
      to: [to],
      reply_to: f.email,
      subject: `New inquiry: ${f.business || f.name}${f.need ? ` (${f.need})` : ""}`,
      text,
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
