// The sample site shown on the hero laptop: a made-up matcha café, "leaf & whisk", painted onto a canvas so it can be
// the screen's texture (a DOM overlay drifted off the screen in some browsers; a texture is part of the 3D model).
// Laid out like a real desktop site at 1600 CSS px wide. Product "photos" are painted too, so nothing is downloaded.
// The footer says it's a sample made by Handled: it is a demo, not a real business.

export const SITE_W = 1600;
const PAGE_MAX_H = 3400; // the draft canvas height; the page is trimmed to its real height after drawing

const SERIF = '"Fraunces Variable", "Fraunces", Georgia, serif';
const SANS = '"Instrument Sans Variable", "Instrument Sans", system-ui, sans-serif';
const DISPLAY = '"Archivo Variable", "Archivo", sans-serif';

// The café's own palette (not Handled's): cream, milk, tea greens, wood
const K = {
  cream: "#f5f0e6",
  milk: "#fbf8f1",
  card: "#fffdf8",
  line: "#e4ddcc",
  ink: "#1f2a1f",
  muted: "#666d62",
  green: "#2f4a2c",
  greenDeep: "#1f3320",
  matcha: "#86aa4e",
  matchaLight: "#b7d07f",
  matchaPale: "#e5ecd3",
  pink: "#eaa2b2",
  hoji: "#9c6b45",
  wood: "#c69c6d",
  woodDark: "#9f7650",
};

type Ctx = CanvasRenderingContext2D & { fontStretch?: string; letterSpacing?: string };

export async function loadSiteFonts() {
  try {
    await Promise.all([
      document.fonts.load(`500 40px ${SERIF}`),
      document.fonts.load(`italic 500 40px ${SERIF}`),
      document.fonts.load(`400 20px ${SANS}`),
      document.fonts.load(`600 20px ${SANS}`),
      document.fonts.load(`800 40px ${DISPLAY}`),
    ]);
  } catch {
    /* draw with fallback fonts */
  }
}

export function drawSampleSite(maxTextureSize: number): HTMLCanvasElement {
  const W = SITE_W;
  // Sharp enough for the open laptop filling the view, and within the GPU's texture size limit
  const scale = Math.min(1.25, maxTextureSize / PAGE_MAX_H, maxTextureSize / W);
  const draft = document.createElement("canvas");
  draft.width = Math.floor(W * scale);
  draft.height = Math.floor(PAGE_MAX_H * scale);
  const ctx = draft.getContext("2d") as Ctx;
  ctx.scale(scale, scale);
  const d = painter(ctx);

  ctx.fillStyle = K.cream;
  ctx.fillRect(0, 0, W, PAGE_MAX_H);
  const PAD = 72;

  // ── Announcement bar
  ctx.fillStyle = K.green;
  ctx.fillRect(0, 0, W, 46);
  d.font(500, 16, SANS);
  d.text("New this week: Strawberry Matcha Cloud. Order ahead and skip the line.", W / 2, 29, K.milk, "center");

  // ── Navigation
  let y = 46;
  const navH = 96;
  d.leaf(PAD + 14, y + navH / 2, 15, K.matcha);
  d.font(600, 32, SERIF, true);
  d.text("leaf & whisk", PAD + 38, y + navH / 2 + 10, K.green);
  d.font(500, 18, SANS);
  let nx = 640;
  for (const link of ["Menu", "Our matcha", "Visit us", "About"]) {
    d.text(link, nx, y + navH / 2 + 6, K.ink);
    nx += ctx.measureText(link).width + 44;
  }
  d.font(600, 17, SANS);
  const ord = "Order for pickup";
  const ow = ctx.measureText(ord).width + 52;
  d.rect(W - PAD - ow, y + navH / 2 - 25, ow, 50, 25, K.green);
  d.text(ord, W - PAD - ow / 2, y + navH / 2 + 6, K.milk, "center");
  d.bag(W - PAD - ow - 46, y + navH / 2, K.ink);
  ctx.fillStyle = K.line;
  ctx.fillRect(0, y + navH - 1, W, 1);
  y += navH;

  // ── Hero: copy left, a table scene right
  const heroImg = { x: 820, y: y + 44, w: W - PAD - 820, h: 640 };
  const leftW = 680;
  d.font(500, 88, SERIF);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "-2px";
  const head = d.wrap("Stone-ground matcha, whisked to order.", leftW);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  d.font(400, 21, SANS);
  const sub = d.wrap("Ceremonial-grade matcha from Uji, Kyoto, whisked by hand and poured over fresh milk. Pastries baked every morning.", 560);
  const blockH = 40 + 30 + head.length * 88 + 26 + sub.length * 32 + 40 + 60 + 44 + 24;
  let ly = heroImg.y + (heroImg.h - blockH) / 2;
  // location pill
  d.font(600, 15, SANS);
  const pill = "Matcha bar in Quezon City";
  const pw = ctx.measureText(pill).width + 50;
  d.rect(PAD, ly, pw, 36, 18, K.matchaPale);
  d.circle(PAD + 20, ly + 18, 5, K.matcha);
  d.text(pill, PAD + 34, ly + 23, K.green);
  ly += 36 + 34;
  d.font(500, 88, SERIF);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "-2px";
  head.forEach((l) => {
    ly += 84;
    d.text(l, PAD - 4, ly, K.ink);
  });
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  ly += 30;
  d.font(400, 21, SANS);
  sub.forEach((l) => {
    ly += 32;
    d.text(l, PAD, ly, K.muted);
  });
  ly += 40;
  d.font(600, 18, SANS);
  const b1 = "Order for pickup";
  const b1w = ctx.measureText(b1).width + 64;
  d.rect(PAD, ly, b1w, 60, 30, K.green);
  d.text(b1, PAD + b1w / 2, ly + 37, K.milk, "center");
  const b2 = "View the menu";
  const b2w = ctx.measureText(b2).width + 64;
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = K.ink;
  ctx.beginPath();
  ctx.roundRect(PAD + b1w + 14, ly + 0.75, b2w, 58.5, 30);
  ctx.stroke();
  d.text(b2, PAD + b1w + 14 + b2w / 2, ly + 37, K.ink, "center");
  ly += 60 + 44;
  d.font(500, 16, SANS);
  let ix = PAD;
  for (const [icon, label] of [["clock", "Open daily, 8am to 9pm"], ["leaf", "Oat and soy milk"], ["wifi", "Free Wi-Fi"]] as const) {
    d.icon(icon, ix + 9, ly, K.green);
    d.text(label, ix + 26, ly + 6, K.muted);
    ix += ctx.measureText(label).width + 62;
  }
  d.scene(heroImg.x, heroImg.y, heroImg.w, heroImg.h);
  y = heroImg.y + heroImg.h + 96;

  // ── Bestsellers
  d.font(500, 54, SERIF);
  d.text("Our bestsellers", PAD, y + 46, K.ink);
  d.font(600, 18, SANS);
  d.text("See the full menu  →", W - PAD, y + 40, K.green, "right");
  y += 92;
  const items = [
    { name: "Iced Matcha Latte", desc: "Ceremonial matcha over fresh milk and ice.", price: "₱165", bg: "#e4ebd3", tag: "Bestseller", kind: "latte" },
    { name: "Strawberry Matcha Cloud", desc: "Strawberry purée, milk, matcha cold foam.", price: "₱195", bg: "#f5dfe3", tag: "New", kind: "strawberry" },
    { name: "Hojicha Latte", desc: "Roasted green tea. Nutty, cozy, low caffeine.", price: "₱160", bg: "#efe2d3", tag: "", kind: "hojicha" },
    { name: "Matcha Basque Cheesecake", desc: "Burnt top, creamy matcha middle.", price: "₱185", bg: "#e9e5d2", tag: "", kind: "cake" },
  ] as const;
  const gap = 24;
  const cw = (W - 2 * PAD - 3 * gap) / 4;
  const imgH = 360;
  items.forEach((it, i) => {
    const cx = PAD + i * (cw + gap);
    d.rect(cx, y, cw, imgH + 150, 22, K.card);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cx, y, cw, imgH, [22, 22, 0, 0]);
    ctx.clip();
    d.backdrop(cx, y, cw, imgH, it.bg);
    if (it.kind === "cake") d.cake(cx + cw / 2, y + imgH * 0.72, cw * 0.62);
    else d.glass(cx + cw / 2, y + imgH * 0.86, cw * 0.36, imgH * 0.62, it.kind);
    ctx.restore();
    if (it.tag) {
      d.font(600, 14, SANS);
      const tw = ctx.measureText(it.tag).width + 26;
      d.rect(cx + 16, y + 16, tw, 30, 15, it.tag === "New" ? K.pink : K.card);
      d.text(it.tag, cx + 16 + tw / 2, y + 36, K.ink, "center");
    }
    d.font(500, 25, SERIF);
    d.text(it.name, cx + 22, y + imgH + 44, K.ink);
    d.font(400, 16, SANS);
    d.text(it.desc, cx + 22, y + imgH + 74, K.muted);
    d.font(600, 21, SANS);
    d.text(it.price, cx + 22, y + imgH + 122, K.ink);
    d.circle(cx + cw - 42, y + imgH + 114, 20, K.green);
    ctx.strokeStyle = K.milk;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx + cw - 50, y + imgH + 114);
    ctx.lineTo(cx + cw - 34, y + imgH + 114);
    ctx.moveTo(cx + cw - 42, y + imgH + 106);
    ctx.lineTo(cx + cw - 42, y + imgH + 122);
    ctx.stroke();
  });
  y += imgH + 150 + 104;

  // ── Our matcha (dark green band)
  const storyH = 660;
  ctx.fillStyle = K.green;
  ctx.fillRect(0, y, W, storyH);
  const sq = storyH - 160;
  d.topView(PAD, y + 80, sq, sq);
  const tx = PAD + sq + 90;
  let ty = y + 140;
  d.font(600, 15, SANS);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "2px";
  d.text("OUR MATCHA", tx, ty, K.matchaLight);
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
  d.font(500, 58, SERIF);
  for (const l of ["From Uji, Kyoto,", "to your cup."]) {
    ty += 66;
    d.text(l, tx, ty, K.milk);
  }
  ty += 26;
  d.font(400, 20, SANS);
  for (const l of d.wrap("We buy ceremonial-grade matcha straight from a family farm in Uji, stone-ground in small batches. Every cup is whisked by hand when you order it.", 600)) {
    ty += 32;
    d.text(l, tx, ty, "rgba(251,248,241,0.78)");
  }
  ty += 36;
  for (const f of ["Ceremonial grade, stone-ground", "Whisked by hand, every cup", "Fresh, oat or soy milk"]) {
    ty += 46;
    d.circle(tx + 14, ty - 7, 14, "rgba(183,208,127,0.18)");
    ctx.strokeStyle = K.matchaLight;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(tx + 8, ty - 7);
    ctx.lineTo(tx + 12.5, ty - 2.5);
    ctx.lineTo(tx + 20, ty - 12);
    ctx.stroke();
    d.font(500, 19, SANS);
    d.text(f, tx + 42, ty, K.milk);
  }
  y += storyH + 100;

  // ── Visit
  d.font(500, 54, SERIF);
  d.text("Come say hi.", PAD, y + 50, K.ink);
  d.font(400, 20, SANS);
  d.text("Ground floor, 24 Sample Street, Quezon City", PAD, y + 104, K.muted);
  d.text("Five minutes' walk from the LRT.", PAD, y + 136, K.muted);
  let hy = y + 196;
  for (const [day, time] of [["Monday to Friday", "8am to 9pm"], ["Saturday and Sunday", "9am to 10pm"]]) {
    d.font(500, 19, SANS);
    d.text(day, PAD, hy, K.ink);
    d.text(time, PAD + 480, hy, K.ink, "right");
    ctx.fillStyle = K.line;
    ctx.fillRect(PAD, hy + 18, 480, 1);
    hy += 50;
  }
  hy += 20;
  d.font(600, 17, SANS);
  const g1 = "Get directions";
  const g1w = ctx.measureText(g1).width + 56;
  d.rect(PAD, hy, g1w, 54, 27, K.green);
  d.text(g1, PAD + g1w / 2, hy + 33, K.milk, "center");
  const g2 = "Message us";
  const g2w = ctx.measureText(g2).width + 56;
  ctx.strokeStyle = K.ink;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(PAD + g1w + 12, hy + 0.75, g2w, 52.5, 27);
  ctx.stroke();
  d.text(g2, PAD + g1w + 12 + g2w / 2, hy + 33, K.ink, "center");
  d.map(700, y, W - PAD - 700, 400);
  y += 400 + 100;

  // ── Footer
  const footH = 170;
  ctx.fillStyle = K.greenDeep;
  ctx.fillRect(0, y, W, footH);
  d.leaf(PAD + 12, y + 62, 13, K.matchaLight);
  d.font(600, 28, SERIF, true);
  d.text("leaf & whisk", PAD + 34, y + 71, K.milk);
  d.font(400, 16, SANS);
  d.text("Matcha, hojicha and pastries in Quezon City.", PAD, y + 112, "rgba(251,248,241,0.65)");
  let fx = W - PAD;
  for (const l of ["Instagram", "Facebook", "Menu", "Visit"].reverse()) {
    d.font(500, 17, SANS);
    d.text(l, fx, y + 70, K.milk, "right");
    fx -= ctx.measureText(l).width + 36;
  }
  d.font(400, 14, SANS);
  d.text("© 2026 leaf & whisk. A sample website made by Handled.", W - PAD, y + 112, "rgba(251,248,241,0.5)", "right");
  y += footH;

  const out = document.createElement("canvas");
  out.width = draft.width;
  out.height = Math.ceil(y * scale);
  out.getContext("2d")!.drawImage(draft, 0, 0);
  return out;
}

// Drawing helpers, all in page px
function painter(ctx: Ctx) {
  const font = (weight: number, size: number, family: string, italic = false) => {
    ctx.font = `${italic ? "italic " : ""}${weight} ${size}px ${family}`;
    if ("fontStretch" in ctx) ctx.fontStretch = "normal";
  };
  const text = (s: string, x: number, y: number, fill: string, align: CanvasTextAlign = "left") => {
    ctx.fillStyle = fill;
    ctx.textAlign = align;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(s, x, y);
  };
  const rect = (x: number, y: number, w: number, h: number, r: number | number[], fill: string | CanvasGradient) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  };
  const circle = (x: number, y: number, r: number, fill: string | CanvasGradient) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };
  const ellipse = (x: number, y: number, rx: number, ry: number, fill: string | CanvasGradient) => {
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
  };
  const wrap = (s: string, maxW: number) => {
    const lines: string[] = [];
    let line = "";
    for (const word of s.split(" ")) {
      const next = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(next).width > maxW) {
        lines.push(line);
        line = word;
      } else line = next;
    }
    lines.push(line);
    return lines;
  };
  // A soft contact shadow on a surface
  const shadow = (x: number, y: number, rx: number, ry: number, a = 0.28) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(1, ry / rx);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx);
    g.addColorStop(0, `rgba(40,30,20,${a})`);
    g.addColorStop(0.6, `rgba(40,30,20,${a * 0.4})`);
    g.addColorStop(1, "rgba(40,30,20,0)");
    circle(0, 0, rx, g);
    ctx.restore();
  };
  // Seeded noise so the "photos" look the same on every load
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  const leaf = (x: number, y: number, s: number, fill: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-0.6);
    ctx.fillStyle = fill;
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(s * 0.95, 0, 0, s);
    ctx.quadraticCurveTo(-s * 0.95, 0, 0, -s);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.7);
    ctx.lineTo(0, s * 0.8);
    ctx.stroke();
    ctx.restore();
  };

  const bag = (x: number, y: number, c: string) => {
    ctx.strokeStyle = c;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x - 11, y - 7, 22, 19, 3);
    ctx.moveTo(x - 5, y - 7);
    ctx.arc(x, y - 7, 5, Math.PI, 0);
    ctx.stroke();
  };

  const icon = (kind: "clock" | "leaf" | "wifi", x: number, y: number, c: string) => {
    ctx.strokeStyle = c;
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (kind === "clock") {
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.moveTo(x, y - 4.5);
      ctx.lineTo(x, y);
      ctx.lineTo(x + 3.5, y + 2.5);
      ctx.stroke();
    } else if (kind === "wifi") {
      for (const r of [9, 5.5]) {
        ctx.beginPath();
        ctx.arc(x, y + 5, r, -Math.PI * 0.78, -Math.PI * 0.22);
        ctx.stroke();
      }
      circle(x, y + 5, 1.8, c);
    } else leaf(x, y, 8, c);
  };

  // A pastel studio backdrop with a soft floor, for product cards
  const backdrop = (x: number, y: number, w: number, h: number, bg: string) => {
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, h);
    const g = ctx.createLinearGradient(0, y + h * 0.62, 0, y + h);
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(0.02, "rgba(0,0,0,0.05)");
    g.addColorStop(1, "rgba(0,0,0,0.02)");
    ctx.fillStyle = g;
    ctx.fillRect(x, y + h * 0.62, w, h * 0.38);
    const light = ctx.createRadialGradient(x + w * 0.3, y + h * 0.2, 0, x + w * 0.3, y + h * 0.2, w * 0.9);
    light.addColorStop(0, "rgba(255,255,255,0.45)");
    light.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = light;
    ctx.fillRect(x, y, w, h);
  };

  // A tall clear glass with an iced drink. kind picks the layers.
  const glass = (cx: number, baseY: number, w: number, h: number, kind: string) => {
    const top = baseY - h;
    const bw = w * 0.82;
    shadow(cx + w * 0.18, baseY, w * 0.75, w * 0.14, 0.3);
    const outline = () => {
      ctx.beginPath();
      ctx.moveTo(cx - w / 2, top);
      ctx.lineTo(cx - bw / 2, baseY - 10);
      ctx.quadraticCurveTo(cx - bw / 2, baseY, cx - bw / 2 + 10, baseY);
      ctx.lineTo(cx + bw / 2 - 10, baseY);
      ctx.quadraticCurveTo(cx + bw / 2, baseY, cx + bw / 2, baseY - 10);
      ctx.lineTo(cx + w / 2, top);
      ctx.closePath();
    };
    // straw (only the part above the drink shows)
    ctx.save();
    ctx.lineCap = "round";
    ctx.strokeStyle = kind === "strawberry" ? "#f3c6cf" : "#dfe8cf";
    ctx.lineWidth = w * 0.09;
    ctx.beginPath();
    ctx.moveTo(cx + w * 0.08, baseY - h * 0.3);
    ctx.lineTo(cx + w * 0.26, top - h * 0.2);
    ctx.stroke();
    ctx.restore();
    // drink
    ctx.save();
    outline();
    ctx.clip();
    const fillTop = top + h * (kind === "strawberry" ? 0.06 : 0.13);
    const g = ctx.createLinearGradient(0, fillTop, 0, baseY);
    const stops: Record<string, [number, string][]> = {
      latte: [[0, "#8fb04f"], [0.3, "#86a84a"], [0.46, "#b9cc8c"], [0.56, "#eee9da"], [1, "#f4f0e4"]],
      strawberry: [[0, "#cfe0a6"], [0.16, "#b9d27f"], [0.24, "#f1ede2"], [0.58, "#f3ede4"], [0.7, "#ec9fb0"], [1, "#d9667f"]],
      hojicha: [[0, "#a8774d"], [0.34, "#9c6b45"], [0.5, "#cdb498"], [0.6, "#efe7da"], [1, "#f4efe5"]],
    };
    for (const [o, c] of stops[kind] ?? stops.latte) g.addColorStop(o, c);
    ctx.fillStyle = g;
    ctx.fillRect(cx - w, fillTop, w * 2, baseY - fillTop);
    // a few marbled swirls where the layers meet
    ctx.globalAlpha = 0.25;
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = i % 2 ? "#ffffff" : kind === "hojicha" ? "#9c6b45" : "#86a84a";
      ctx.lineWidth = 3 + rnd() * 4;
      ctx.beginPath();
      const sy = fillTop + (baseY - fillTop) * (0.35 + rnd() * 0.25);
      ctx.moveTo(cx - w / 2, sy);
      ctx.bezierCurveTo(cx - w * 0.2, sy - 18, cx + w * 0.1, sy + 22, cx + w / 2, sy - 4);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    // ice cubes near the top
    for (let i = 0; i < 4; i++) {
      const s = w * (0.26 + rnd() * 0.08);
      const ixp = cx - w * 0.32 + (i % 2) * w * 0.34 + rnd() * 8;
      const iyp = fillTop + s * 0.1 + Math.floor(i / 2) * s * 0.85;
      ctx.save();
      ctx.translate(ixp + s / 2, iyp + s / 2);
      ctx.rotate((rnd() - 0.5) * 0.8);
      rect(-s / 2, -s / 2, s, s, s * 0.18, "rgba(255,255,255,0.28)");
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    }
    // surface
    ellipse(cx, fillTop, w * 0.48, w * 0.07, kind === "strawberry" ? "#dfeab9" : kind === "hojicha" ? "#b4865c" : "#9dbc5e");
    // thick glass base
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.fillRect(cx - w, baseY - h * 0.06, w * 2, h * 0.06);
    ctx.restore();
    // glass edges and highlights
    outline();
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    const hl = ctx.createLinearGradient(cx - w / 2, 0, cx - w * 0.2, 0);
    hl.addColorStop(0, "rgba(255,255,255,0.55)");
    hl.addColorStop(1, "rgba(255,255,255,0)");
    ctx.save();
    outline();
    ctx.clip();
    ctx.fillStyle = hl;
    ctx.fillRect(cx - w / 2 + 6, top, w * 0.18, h);
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.fillRect(cx + w * 0.34, top + h * 0.08, 4, h * 0.8);
    ctx.restore();
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(cx, top, w / 2, w * 0.075, 0, 0, Math.PI * 2);
    ctx.stroke();
  };

  // A ceramic tea bowl of whisked matcha, side view
  const bowl = (cx: number, baseY: number, w: number) => {
    const rimY = baseY - w * 0.5;
    shadow(cx + w * 0.2, baseY, w * 0.7, w * 0.12, 0.32);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx - w / 2, rimY);
    ctx.bezierCurveTo(cx - w / 2, rimY + w * 0.36, cx - w * 0.3, baseY - w * 0.06, cx - w * 0.18, baseY - w * 0.06);
    ctx.lineTo(cx + w * 0.18, baseY - w * 0.06);
    ctx.bezierCurveTo(cx + w * 0.3, baseY - w * 0.06, cx + w / 2, rimY + w * 0.36, cx + w / 2, rimY);
    ctx.closePath();
    const g = ctx.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
    g.addColorStop(0, "#5b5249");
    g.addColorStop(0.35, "#7a6e62");
    g.addColorStop(1, "#3c352f");
    ctx.fillStyle = g;
    ctx.fill();
    ctx.clip();
    // pale glaze dripping down from the rim
    ctx.fillStyle = "rgba(226,214,196,0.85)";
    ctx.beginPath();
    ctx.moveTo(cx - w / 2, rimY);
    for (let i = 0; i <= 12; i++) {
      const px = cx - w / 2 + (w * i) / 12;
      ctx.lineTo(px, rimY + w * (0.1 + (i % 3 === 0 ? 0.08 : 0.02) + rnd() * 0.04));
    }
    ctx.lineTo(cx + w / 2, rimY);
    ctx.fill();
    ctx.restore();
    // foot
    rect(cx - w * 0.16, baseY - w * 0.065, w * 0.32, w * 0.065, 3, "#b39c80");
    // rim and foam
    ellipse(cx, rimY, w / 2, w * 0.13, "#e6dccb");
    const foam = ctx.createRadialGradient(cx - w * 0.08, rimY - w * 0.02, 0, cx, rimY, w * 0.46);
    foam.addColorStop(0, "#c3d98d");
    foam.addColorStop(0.7, "#9fbf5c");
    foam.addColorStop(1, "#7f9f45");
    ellipse(cx, rimY + 2, w * 0.46, w * 0.11, foam);
    for (let i = 0; i < 70; i++) {
      const a = rnd() * Math.PI * 2;
      const r = Math.sqrt(rnd());
      circle(cx + Math.cos(a) * r * w * 0.42, rimY + 2 + Math.sin(a) * r * w * 0.095, 0.8 + rnd() * 1.6, "rgba(235,245,210,0.6)");
    }
  };

  // A bamboo whisk standing on its handle, tines up
  const whisk = (cx: number, baseY: number, h: number) => {
    shadow(cx + h * 0.15, baseY, h * 0.32, h * 0.07, 0.25);
    const hw = h * 0.16;
    const handleTop = baseY - h * 0.42;
    const hg = ctx.createLinearGradient(cx - hw / 2, 0, cx + hw / 2, 0);
    hg.addColorStop(0, "#c9ad78");
    hg.addColorStop(0.4, "#e6d3a3");
    hg.addColorStop(1, "#b0915e");
    rect(cx - hw / 2, handleTop, hw, h * 0.42, [4, 4, 6, 6], hg);
    ctx.fillStyle = "rgba(120,90,50,0.35)";
    ctx.fillRect(cx - hw / 2, handleTop + h * 0.12, hw, 2);
    // tines flare out and curl back in
    const tineTop = baseY - h;
    for (let i = 0; i < 26; i++) {
      const t = i / 25 - 0.5;
      ctx.strokeStyle = i % 2 ? "rgba(214,192,140,0.95)" : "rgba(236,222,186,0.95)";
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.moveTo(cx + t * hw * 0.9, handleTop);
      ctx.bezierCurveTo(cx + t * h * 0.62, handleTop - h * 0.18, cx + t * h * 0.5, tineTop + h * 0.12, cx + t * h * 0.16, tineTop + Math.abs(t) * h * 0.08);
      ctx.stroke();
    }
  };

  // The hero "photo": a café table by the window
  const scene = (x: number, y: number, w: number, h: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 28);
    ctx.clip();
    const wall = ctx.createLinearGradient(0, y, 0, y + h);
    wall.addColorStop(0, "#efe6d6");
    wall.addColorStop(1, "#ddcfb6");
    ctx.fillStyle = wall;
    ctx.fillRect(x, y, w, h);
    // window light falling across the wall
    ctx.save();
    ctx.translate(x + w * 0.2, y);
    ctx.rotate(0.35);
    for (let i = 0; i < 5; i++) {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(255,250,236,0.5)");
      g.addColorStop(1, "rgba(255,250,236,0.05)");
      ctx.fillStyle = g;
      ctx.fillRect(i * 70, -40, 38, h * 1.3);
    }
    ctx.restore();
    // a plant leaf shadow in the corner
    ctx.globalAlpha = 0.12;
    for (let i = 0; i < 5; i++) leaf(x + w * (0.78 + rnd() * 0.2), y + h * (0.08 + rnd() * 0.3), 40 + rnd() * 30, "#3d4a32");
    ctx.globalAlpha = 1;
    // table
    const ty = y + h * 0.66;
    const wood = ctx.createLinearGradient(0, ty, 0, y + h);
    wood.addColorStop(0, K.wood);
    wood.addColorStop(1, K.woodDark);
    ctx.fillStyle = wood;
    ctx.fillRect(x, ty, w, h - (ty - y));
    for (let i = 0; i < 18; i++) {
      ctx.strokeStyle = `rgba(110,70,35,${0.06 + rnd() * 0.08})`;
      ctx.lineWidth = 1 + rnd() * 2;
      ctx.beginPath();
      const gy = ty + 6 + rnd() * (h - (ty - y) - 6);
      ctx.moveTo(x, gy);
      ctx.bezierCurveTo(x + w * 0.3, gy + (rnd() - 0.5) * 10, x + w * 0.7, gy + (rnd() - 0.5) * 10, x + w, gy + (rnd() - 0.5) * 8);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,240,215,0.35)";
    ctx.fillRect(x, ty, w, 3);
    // props
    whisk(x + w * 0.86, ty + h * 0.2, h * 0.3);
    bowl(x + w * 0.66, ty + h * 0.24, w * 0.34);
    glass(x + w * 0.3, ty + h * 0.27, w * 0.2, h * 0.56, "latte");
    // a small card on the table
    ctx.save();
    ctx.translate(x + w * 0.1, ty + h * 0.2);
    ctx.rotate(-0.08);
    rect(-50, -24, 100, 48, 4, "#fbf6ea");
    font(600, 14, SERIF, true);
    text("leaf & whisk", 0, 5, K.green, "center");
    ctx.restore();
    ctx.restore();
  };

  // A slice of matcha Basque cheesecake on a plate
  const cake = (cx: number, baseY: number, w: number) => {
    shadow(cx + w * 0.08, baseY + 6, w * 0.62, w * 0.12, 0.25);
    ellipse(cx, baseY, w * 0.6, w * 0.16, "#f7f4ee");
    ellipse(cx, baseY - 2, w * 0.5, w * 0.12, "#efeae0");
    const h = w * 0.42;
    // side (creamy matcha), then the burnt top
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.42, baseY - 8);
    ctx.lineTo(cx + w * 0.28, baseY + 6);
    ctx.lineTo(cx + w * 0.3, baseY + 6 - h);
    ctx.lineTo(cx - w * 0.4, baseY - 8 - h);
    ctx.closePath();
    const side = ctx.createLinearGradient(0, baseY - h, 0, baseY);
    side.addColorStop(0, "#a9c26c");
    side.addColorStop(0.5, "#c7d79a");
    side.addColorStop(1, "#b2c77d");
    ctx.fillStyle = side;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.4, baseY - 8 - h);
    ctx.lineTo(cx + w * 0.3, baseY + 6 - h);
    ctx.lineTo(cx + w * 0.44, baseY - h - 30);
    ctx.quadraticCurveTo(cx + w * 0.1, baseY - h - 62, cx - w * 0.4, baseY - 8 - h);
    const topG = ctx.createLinearGradient(cx - w * 0.4, 0, cx + w * 0.4, 0);
    topG.addColorStop(0, "#5c3b20");
    topG.addColorStop(0.5, "#7d5530");
    topG.addColorStop(1, "#4a2f19");
    ctx.fillStyle = topG;
    ctx.fill();
    // the side face of the wedge
    ctx.beginPath();
    ctx.moveTo(cx + w * 0.28, baseY + 6);
    ctx.lineTo(cx + w * 0.42, baseY - 24);
    ctx.lineTo(cx + w * 0.44, baseY - h - 30);
    ctx.lineTo(cx + w * 0.3, baseY + 6 - h);
    ctx.closePath();
    ctx.fillStyle = "#93ad57";
    ctx.fill();
    for (let i = 0; i < 40; i++) circle(cx - w * 0.38 + rnd() * w * 0.64, baseY - h * (0.1 + rnd() * 0.8), 0.8 + rnd(), "rgba(255,255,240,0.35)");
  };

  // Overhead shot for the "our matcha" band: bowl, whisk, scoop and a little powder on linen
  const topView = (x: number, y: number, w: number, h: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 24);
    ctx.clip();
    const bg = ctx.createLinearGradient(x, y, x + w, y + h);
    bg.addColorStop(0, "#e9e1d0");
    bg.addColorStop(1, "#d3c6ad");
    ctx.fillStyle = bg;
    ctx.fillRect(x, y, w, h);
    for (let i = 0; i < 90; i++) {
      ctx.fillStyle = `rgba(120,100,70,${0.03 + rnd() * 0.03})`;
      ctx.fillRect(x, y + rnd() * h, w, 1);
    }
    const bx = x + w * 0.45;
    const by = y + h * 0.5;
    const r = w * 0.3;
    shadow(bx + 18, by + 22, r * 1.12, r * 1.12, 0.3);
    circle(bx, by, r, "#4d453d");
    circle(bx, by, r * 0.93, "#e2d6c2");
    const foam = ctx.createRadialGradient(bx - r * 0.2, by - r * 0.2, 0, bx, by, r * 0.82);
    foam.addColorStop(0, "#c6dc92");
    foam.addColorStop(0.75, "#9cbc58");
    foam.addColorStop(1, "#7d9c43");
    circle(bx, by, r * 0.82, foam);
    for (let i = 0; i < 260; i++) {
      const a = rnd() * Math.PI * 2;
      const rr = Math.sqrt(rnd()) * r * 0.78;
      circle(bx + Math.cos(a) * rr, by + Math.sin(a) * rr, 0.8 + rnd() * 2.2, "rgba(236,246,212,0.55)");
    }
    // whisk lying at an angle
    ctx.save();
    ctx.translate(x + w * 0.83, y + h * 0.3);
    ctx.rotate(0.5);
    shadow(10, 12, 40, 110, 0.2);
    rect(-16, -10, 32, 120, 8, "#dcc592");
    for (let i = 0; i < 22; i++) {
      const t = i / 21 - 0.5;
      ctx.strokeStyle = i % 2 ? "#d4bc86" : "#eadcb4";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(t * 26, -10);
      ctx.quadraticCurveTo(t * 110, -60, t * 30, -120);
      ctx.stroke();
    }
    ctx.restore();
    // bamboo scoop and a little matcha powder
    ctx.strokeStyle = "#c6a96f";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x + w * 0.12, y + h * 0.9);
    ctx.quadraticCurveTo(x + w * 0.3, y + h * 0.86, x + w * 0.42, y + h * 0.9);
    ctx.stroke();
    for (let i = 0; i < 120; i++) {
      const a = rnd() * Math.PI * 2;
      const rr = Math.sqrt(rnd()) * 34;
      circle(x + w * 0.16 + Math.cos(a) * rr, y + h * 0.82 + Math.sin(a) * rr * 0.6, 1 + rnd() * 2.5, `rgba(${110 + rnd() * 30},${150 + rnd() * 20},70,0.85)`);
    }
    ctx.restore();
  };

  // A simple street map with a pin
  const map = (x: number, y: number, w: number, h: number) => {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 24);
    ctx.clip();
    ctx.fillStyle = "#e9e5d8";
    ctx.fillRect(x, y, w, h);
    rect(x + w * 0.62, y + h * 0.08, w * 0.3, h * 0.36, 14, "#d3e0b8"); // park
    ctx.fillStyle = "#cfe0e6"; // creek
    ctx.beginPath();
    ctx.moveTo(x, y + h * 0.82);
    ctx.bezierCurveTo(x + w * 0.3, y + h * 0.7, x + w * 0.6, y + h * 0.98, x + w, y + h * 0.84);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineCap = "butt";
    for (const [lw, x1, y1, x2, y2] of [
      [22, 0, 0.55, 1, 0.42],
      [14, 0.32, 0, 0.4, 1],
      [10, 0.75, 0, 0.7, 1],
      [8, 0, 0.2, 0.55, 0.25],
      [8, 0.1, 1, 0.2, 0.55],
    ]) {
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(x + x1 * w, y + y1 * h);
      ctx.lineTo(x + x2 * w, y + y2 * h);
      ctx.stroke();
    }
    font(500, 13, SANS);
    text("Sample Street", x + w * 0.1, y + h * 0.53, "#8b8a80");
    // pin with a label
    const px = x + w * 0.38;
    const py = y + h * 0.46;
    shadow(px + 4, py + 4, 16, 5, 0.3);
    ctx.fillStyle = K.green;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.bezierCurveTo(px - 22, py - 26, px - 18, py - 50, px, py - 50);
    ctx.bezierCurveTo(px + 18, py - 50, px + 22, py - 26, px, py);
    ctx.fill();
    circle(px, py - 33, 7, K.milk);
    font(600, 15, SERIF, true);
    const lw = ctx.measureText("leaf & whisk").width + 28;
    rect(px + 18, py - 72, lw, 34, 17, K.card);
    text("leaf & whisk", px + 18 + lw / 2, py - 50, K.green, "center");
    ctx.restore();
  };

  return { font, text, rect, circle, wrap, leaf, bag, icon, backdrop, glass, bowl, scene, cake, topView, map };
}

// The "h." mark on the back of the lid
export function drawLidLogo(): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d") as Ctx;
  ctx.font = `800 170px ${DISPLAY}`;
  if ("fontStretch" in ctx) ctx.fontStretch = "semi-expanded";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const w = ctx.measureText("h.").width;
  const hw = ctx.measureText("h").width;
  const x = (256 - w) / 2;
  ctx.fillStyle = "#6c7478";
  ctx.fillText("h", x, 190);
  ctx.fillStyle = "#ffb627";
  ctx.fillText(".", x + hw, 190);
  return c;
}

// A browser toolbar across the top of the screen (it stays put while the page scrolls under it). Its height, in page
// px, is BROWSER_BAR_H; the MacBook notch sits inside it, as it does over a real browser window.
export const BROWSER_BAR_H = 84;
export function drawBrowserBar(scale = 1.25): HTMLCanvasElement {
  const W = SITE_W;
  const H = BROWSER_BAR_H;
  const c = document.createElement("canvas");
  c.width = Math.floor(W * scale);
  c.height = Math.floor(H * scale);
  const ctx = c.getContext("2d") as Ctx;
  ctx.scale(scale, scale);
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#f4f3f0");
  bg.addColorStop(1, "#ebeae6");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#d6d4ce";
  ctx.fillRect(0, H - 1, W, 1);
  const midY = 58;
  // window buttons
  [["#ff5f57", 28], ["#febc2e", 52], ["#28c840", 76]].forEach(([col, x]) => {
    ctx.fillStyle = col as string;
    ctx.beginPath();
    ctx.arc(x as number, midY, 7, 0, Math.PI * 2);
    ctx.fill();
  });
  // back and forward
  ctx.strokeStyle = "#5f625c";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const [x, dir] of [[124, -1], [156, 1]]) {
    ctx.globalAlpha = dir === 1 ? 0.35 : 1;
    ctx.beginPath();
    ctx.moveTo(x - dir * 4, midY - 7);
    ctx.lineTo(x + dir * 4, midY);
    ctx.lineTo(x - dir * 4, midY + 7);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  // address field
  const fw = 560;
  const fx = (W - fw) / 2;
  ctx.fillStyle = "#e2e1dc";
  ctx.beginPath();
  ctx.roundRect(fx, midY - 16, fw, 32, 9);
  ctx.fill();
  ctx.font = `500 15px ${SANS}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  const url = "leafandwhisk.ph";
  const uw = ctx.measureText(url).width;
  const ux = W / 2 - uw / 2 + 8;
  ctx.fillStyle = "#2b2d29";
  ctx.fillText(url, ux, midY + 5);
  // padlock
  ctx.strokeStyle = "#5f625c";
  ctx.lineWidth = 1.6;
  ctx.fillStyle = "#5f625c";
  ctx.beginPath();
  ctx.roundRect(ux - 22, midY - 2, 11, 9, 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(ux - 16.5, midY - 2, 3.6, Math.PI, 0);
  ctx.stroke();
  // share, new tab
  ctx.strokeStyle = "#5f625c";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W - 92, midY - 8);
  ctx.lineTo(W - 92, midY + 8);
  ctx.moveTo(W - 100, midY);
  ctx.lineTo(W - 84, midY);
  ctx.moveTo(W - 52, midY + 9);
  ctx.lineTo(W - 52, midY - 9);
  ctx.moveTo(W - 57, midY - 4);
  ctx.lineTo(W - 52, midY - 9);
  ctx.lineTo(W - 47, midY - 4);
  ctx.stroke();
  return c;
}
