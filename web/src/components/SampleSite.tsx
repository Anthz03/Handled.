// A made-up café: shows the shape of a free preview without naming a real business.
export function SampleSite() {
  const menu = [["Spanish latte", "₱140"], ["Iced mocha", "₱150"], ["Ube cheese pandesal", "₱65"], ["Matcha cloud", "₱160"]];
  return (
    <div className="text-ink">
      <div className="flex items-center justify-between px-[1.6em] py-[1em]">
        <span className="font-display text-[1.4em] font-extrabold">your café.</span>
        <span className="flex gap-[1.4em] text-[0.9em] text-steel"><span>Menu</span><span>Hours</span><span>Find us</span></span>
      </div>
      <div className="grid grid-cols-[1.2fr_1fr] items-center gap-[1.5em] px-[1.6em] pb-[2em] pt-[1em]">
        <div>
          <p className="font-display text-[3.2em] font-extrabold leading-[0.95] tracking-tight">Coffee on the corner, since this morning.</p>
          <p className="mt-[0.8em] text-steel">Open daily 7am to 9pm. Two minutes from the LRT.</p>
          <span className="mt-[1.2em] inline-block rounded-full bg-signal px-[1.2em] py-[0.6em] font-semibold">Order on Messenger</span>
        </div>
        <div className="relative aspect-square rounded-[1.4em] bg-sand">
          <div className="absolute bottom-[14%] left-1/2 h-[52%] w-[38%] -translate-x-1/2 rounded-b-[1.6em] rounded-t-[0.4em] bg-paper shadow-[inset_0_-1.2em_0_var(--color-sand)]" />
          <div className="absolute bottom-[58%] left-1/2 h-[10%] w-[44%] -translate-x-1/2 rounded-[0.6em] bg-ink" />
          <span className="absolute right-[8%] top-[8%] rotate-12 rounded-full bg-ink px-[0.8em] py-[0.3em] text-[0.8em] font-semibold text-signal">new</span>
        </div>
      </div>
      <div className="bg-ink px-[1.6em] py-[2em] text-paper">
        <p className="font-display text-[1.8em] font-extrabold">The menu</p>
        <ul className="mt-[1em] grid grid-cols-2 gap-[0.8em]">
          {menu.map(([n, pr]) => (
            <li key={n} className="flex justify-between rounded-[0.8em] bg-white/10 px-[1em] py-[0.9em]"><span>{n}</span><span className="text-signal">{pr}</span></li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-2 gap-[1.2em] px-[1.6em] py-[2em]">
        <div>
          <p className="font-display text-[1.8em] font-extrabold">Hours</p>
          <ul className="mt-[0.6em] space-y-[0.3em] text-steel"><li>Mon to Fri, 7am to 9pm</li><li>Sat and Sun, 8am to 10pm</li></ul>
        </div>
        <div className="grid-bg-light relative min-h-[9em] rounded-[1em] bg-mist/40">
          <span className="absolute left-1/2 top-1/2 h-[1.4em] w-[1.4em] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[50%_50%_0_50%] bg-signal ring-[0.3em] ring-ink" />
        </div>
      </div>
      <div className="bg-sand px-[1.6em] py-[2em] text-center">
        <p className="font-display text-[2em] font-extrabold">See you at the counter.</p>
      </div>
    </div>
  );
}
