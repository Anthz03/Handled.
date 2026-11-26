import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

// Renders nothing until site.socials.messenger is set, so there is never a dead button.
export function MessengerButton({ className = "" }: { className?: string }) {
  if (!site.socials.messenger) return null;
  return (
    <a href={site.socials.messenger} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-on-brand transition hover:bg-navy ${className}`}>
      <MessageCircle className="h-4 w-4" aria-hidden="true" /> Message us on Messenger
    </a>
  );
}
