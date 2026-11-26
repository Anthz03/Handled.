import type { Project } from "@/lib/data";

// Code-drawn UI previews for concept projects. Brand palette only.
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl bg-white shadow-2xl shadow-navy/40 ring-1 ring-white/10">
      <div className="flex items-center gap-1.5 bg-soft px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-navy/20" />
        <span className="h-2 w-2 rounded-full bg-navy/20" />
        <span className="h-2 w-2 rounded-full bg-brand" />
        <span className="ml-2 h-2 w-24 rounded bg-slate/15" />
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const bar = (w: string, c = "bg-slate/15") => <div className={`h-2 rounded ${c}`} style={{ width: w }} />;

function Site() {
  return (
    <Frame>
      <div className="rounded-md bg-navy p-4 on-dark">
        {bar("55%", "bg-white/80")}
        <div className="mt-2">{bar("35%", "bg-white/30")}</div>
        <div className="mt-3 h-4 w-16 rounded-full bg-brand" />
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md bg-soft p-2">
            <div className={`h-8 rounded ${i === 1 ? "bg-brand/80" : "bg-slate/25"}`} />
            <div className="mt-2">{bar("70%")}</div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Dash({ chart = false }: { chart?: boolean }) {
  return (
    <Frame>
      <div className="flex gap-3">
        <div className="w-12 space-y-2 rounded-md bg-navy p-2 on-dark">
          {[0, 1, 2, 3].map((i) => <div key={i} className={`h-1.5 rounded ${i === 0 ? "bg-brand" : "bg-white/20"}`} />)}
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-3 gap-2">
            {["bg-brand", "bg-navy", "bg-slate"].map((c) => (
              <div key={c} className="rounded-md bg-soft p-2">
                {bar("50%")}
                <div className={`mt-2 h-2.5 w-8 rounded ${c}`} />
              </div>
            ))}
          </div>
          {chart ? (
            <div className="mt-3 flex h-20 items-end gap-1.5 rounded-md bg-soft p-2">
              {[40, 65, 50, 80, 60, 90, 72, 95].map((h, i) => (
                <div key={i} className={`flex-1 rounded-sm ${i === 7 ? "bg-brand" : "bg-navy/70"}`} style={{ height: `${h}%` }} />
              ))}
            </div>
          ) : (
            <div className="mt-3 space-y-1.5 rounded-md bg-soft p-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-brand/10" />
                  {bar("40%")}
                  <span className={`ml-auto h-2 w-8 rounded ${i === 1 ? "bg-brand" : "bg-slate/30"}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Frame>
  );
}

function Table() {
  return (
    <Frame>
      <div className="flex items-center justify-between">
        {bar("30%", "bg-navy/70")}
        <div className="h-4 w-14 rounded-full bg-brand" />
      </div>
      <div className="mt-3 overflow-hidden rounded-md bg-soft">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className={`flex items-center gap-3 px-2 py-1.5 ${i === 0 ? "bg-slate/15" : "border-t border-white"}`}>
            <div className="w-1/3">{bar("80%", i === 0 ? "bg-slate/40" : "bg-slate/20")}</div>
            <div className="w-1/4">{bar("60%", "bg-slate/20")}</div>
            {i > 0 && (
              <span className={`ml-auto rounded px-1.5 py-0.5 font-mono text-[8px] font-bold ${i === 2 ? "bg-brand text-on-brand" : "bg-white text-slate"}`}>
                {i === 2 ? "LOW" : "OK"}
              </span>
            )}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Erd() {
  const box = (t: string, x: string, y: string) => (
    <div className="absolute w-[38%] rounded-md bg-white text-[8px] ring-1 ring-brand/40" style={{ left: x, top: y }}>
      <div className="rounded-t-md bg-navy px-1.5 py-1 font-mono font-bold text-white on-dark">{t}</div>
      <div className="space-y-1 p-1.5">{bar("80%")}{bar("60%")}{bar("70%")}</div>
    </div>
  );
  return (
    <Frame>
      <div className="relative h-40">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          <line x1="38%" y1="22%" x2="62%" y2="22%" stroke="#D1BFA8" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="19%" y1="45%" x2="19%" y2="58%" stroke="#D1BFA8" strokeWidth="1.5" />
          <line x1="81%" y1="45%" x2="81%" y2="58%" stroke="#D1BFA8" strokeWidth="1.5" />
          <line x1="38%" y1="75%" x2="62%" y2="75%" stroke="#D1BFA8" strokeWidth="1.5" />
        </svg>
        {box("customers", "0%", "0%")}
        {box("orders", "62%", "0%")}
        {box("products", "0%", "58%")}
        {box("order_items", "62%", "58%")}
      </div>
    </Frame>
  );
}

function Calendar() {
  return (
    <Frame>
      <div className="flex items-center justify-between">{bar("30%", "bg-navy/70")}{bar("15%")}</div>
      <div className="mt-3 grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className={`aspect-square rounded ${[9, 10, 16].includes(i) ? "bg-brand" : [4, 12, 19, 23].includes(i) ? "bg-navy/15" : "bg-soft"}`} />
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {["9:00", "10:30", "1:00"].map((t, i) => (
          <span key={t} className={`rounded-full px-2 py-0.5 font-mono text-[8px] ${i === 1 ? "bg-brand text-on-brand" : "bg-soft text-slate"}`}>{t}</span>
        ))}
      </div>
    </Frame>
  );
}

export function Mockup({ type }: { type: Project["mock"] }) {
  switch (type) {
    case "site": return <Site />;
    case "dashboard": return <Dash />;
    case "chart": return <Dash chart />;
    case "table": return <Table />;
    case "erd": return <Erd />;
    case "calendar": return <Calendar />;
  }
}

export function MockupPanel({ type, className = "" }: { type: Project["mock"]; className?: string }) {
  return (
    <div className={`relative flex items-center overflow-hidden bg-navy p-6 md:p-8 on-dark ${className}`}>
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/40 blur-3xl transition-transform duration-700 group-hover:scale-150" />
      <div className="relative w-full transition-transform duration-700 ease-out group-hover:-translate-y-1 group-hover:scale-[1.03]">
        <Mockup type={type} />
      </div>
    </div>
  );
}
