// A strip of caution tape that scrolls past at a slight angle. Content is duplicated so the loop is seamless.
export function TapeBand({ items, tilt = "-rotate-2" }: { items: string[]; tilt?: string }) {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((t, i) => (
        <li key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-lg font-extrabold tracking-tight text-ink md:text-2xl">{t}</span>
          <span className="h-3 w-3 shrink-0 rotate-45 bg-ink" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="relative z-20 overflow-hidden py-10">
      <div className={`-mx-8 border-y-2 border-ink bg-signal shadow-[0_6px_0_var(--color-ink)] ${tilt}`}>
        <div className="tape-stripes h-2.5" aria-hidden="true" />
        <div className="flex w-max animate-marquee py-3">
          {row()}
          {row(true)}
        </div>
        <div className="tape-stripes h-2.5" aria-hidden="true" />
      </div>
    </div>
  );
}
