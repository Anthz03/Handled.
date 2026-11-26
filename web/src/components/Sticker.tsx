import { useId } from "react";

// The "free preview, ₱0" sticker: a die-cut sticker, so its ring text is printed in capitals.
export function Sticker({ className = "h-24 w-24 drop-shadow-xl md:h-28 md:w-28" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs><path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs>
      <circle cx="60" cy="60" r="58" fill="var(--color-signal)" />
      <text fill="var(--color-ink)" fontSize="12.5" fontWeight="700" letterSpacing="2.4" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href={`#${id}`}>FREE PREVIEW · FREE PREVIEW ·</textPath>
      </text>
      <text x="60" y="68" textAnchor="middle" fill="var(--color-ink)" fontSize="26" fontWeight="800" style={{ fontFamily: "var(--font-display)" }}>₱0</text>
    </svg>
  );
}
