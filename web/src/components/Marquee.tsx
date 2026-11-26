// Infinite scrolling strip. Content is duplicated so the loop is seamless.
export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((t, i) => (
        <li key={i} className="flex items-center">
          <span className={`whitespace-nowrap px-8 font-display text-2xl font-extrabold tracking-tight md:text-4xl ${dark ? "text-white" : "text-navy"}`}>{t}</span>
          <span className="h-2.5 w-2.5 rotate-45 bg-brand" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden py-7 ${dark ? "bg-navy on-dark" : "bg-soft"}`}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
