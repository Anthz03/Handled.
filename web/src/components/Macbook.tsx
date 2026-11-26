"use client";
import { forwardRef, useEffect, useMemo } from "react";
import { BoxGeometry, CanvasTexture, CylinderGeometry, ExtrudeGeometry, MeshStandardMaterial, Shape, ShapeGeometry, SRGBColorSpace, type Group, type Material } from "three";

// A MacBook-style laptop built from simple shapes, in model units (about metres: a 14-inch class machine).
// Silver aluminium, a black glass bezel with a notch, a black keyboard area with speaker grilles either side, a wide
// trackpad and a hinge tucked into the back of the base. No maker's logo: the lid carries the "h." mark.
//   Base: y 0 → BASE.h, centred on x and z, front edge at +z. Lid: a group at the hinge (the "pivot"); rotation.x = 0
//   lies closed on the base, about -1.83 stands open. Lid-local z runs from the hinge (0) to the top edge (BASE.d).

export const BASE = { w: 0.312, d: 0.2212, h: 0.0086 };
export const LID_T = 0.0048;
export const HINGE = { y: 0.0101, z: -BASE.d / 2 };
export const SCREEN = { w: 0.2976, h: 0.2025, z: BASE.d - 0.0058 - 0.2025 / 2 };
export const LAPTOP_W = BASE.w;

function roundedRect(w: number, d: number, r: number) {
  const s = new Shape();
  const x = -w / 2;
  const y = -d / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x + w, y + d - r);
  s.absarc(x + w - r, y + d - r, r, 0, Math.PI / 2, false);
  s.lineTo(x + r, y + d);
  s.absarc(x + r, y + d - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x, y + r);
  s.absarc(x + r, y + r, r, Math.PI, 1.5 * Math.PI, false);
  return s;
}

// A rounded slab with softened edges, lying flat: y 0 → h
function slab(w: number, d: number, h: number, r: number, b: number) {
  const g = new ExtrudeGeometry(roundedRect(w - 2 * b, d - 2 * b, r - b), {
    depth: h - 2 * b,
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 4,
    curveSegments: 16,
  });
  g.rotateX(-Math.PI / 2);
  g.translate(0, b, 0);
  return g;
}

// A flat rounded panel facing up (+y) or down (-y)
function panel(w: number, d: number, r: number, down = false) {
  const g = new ShapeGeometry(roundedRect(w, d, r), 12);
  // ShapeGeometry's UVs are the raw shape coordinates; map them to 0 → 1 so textures fill the panel
  const uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) / w + 0.5, uv.getY(i) / d + 0.5);
  g.rotateX(down ? Math.PI / 2 : -Math.PI / 2);
  return g;
}

// Keyboard rows in key units (a row is 14.5 units wide). [width, height] where height 1 is a full key.
const ROWS: { h: number; keys: number[] }[] = [
  { h: 0.55, keys: Array(14).fill(14.5 / 14) }, // esc, F1–F12, Touch ID
  { h: 1, keys: [...Array(13).fill(1), 1.5] }, // numbers, delete
  { h: 1, keys: [1.5, ...Array(13).fill(1)] }, // tab
  { h: 1, keys: [1.8, ...Array(11).fill(1), 1.7] }, // caps lock, return
  { h: 1, keys: [2.3, ...Array(10).fill(1), 2.2] }, // shift
  { h: 1, keys: [1, 1, 1, 1.25, 5, 1.25, 1] }, // fn, control, option, command, space, command, option (arrows added below)
];
const KB_W = 0.232;
const KB_BACK = -0.0975; // z of the keyboard's back edge
const U = KB_W / 14.5;
const GAP = 0.0016;
const KEY_H = 0.0006;

function useKeyLayout() {
  return useMemo(() => {
    const keys: { x: number; z: number; w: number; d: number }[] = [];
    let z = KB_BACK;
    ROWS.forEach((row, ri) => {
      const rowD = row.h * U;
      let x = -KB_W / 2;
      row.keys.forEach((k) => {
        keys.push({ x: x + (k * U) / 2, z: z + rowD / 2, w: k * U - GAP, d: rowD - GAP });
        x += k * U;
      });
      if (ri === ROWS.length - 1) {
        // inverted-T arrows: left and right half height at the bottom, up and down stacked between
        const half = (rowD - GAP) / 2 - GAP / 4;
        const lowZ = z + rowD - GAP / 2 - half / 2;
        const highZ = z + GAP / 2 + half / 2;
        keys.push({ x: x + U / 2, z: lowZ, w: U - GAP, d: half });
        keys.push({ x: x + 1.5 * U, z: highZ, w: U - GAP, d: half });
        keys.push({ x: x + 1.5 * U, z: lowZ, w: U - GAP, d: half });
        keys.push({ x: x + 2.5 * U, z: lowZ, w: U - GAP, d: half });
      }
      z += rowD;
    });
    return { keys, depth: z - KB_BACK };
  }, []);
}

function useGrilleTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 320;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#1b1f21";
    for (let y = 4; y < c.height; y += 8)
      for (let x = 4 + ((y / 8) % 2) * 4; x < c.width; x += 8) {
        ctx.beginPath();
        ctx.arc(x, y, 1.7, 0, Math.PI * 2);
        ctx.fill();
      }
    const t = new CanvasTexture(c);
    t.colorSpace = SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);
}

type Props = { logo?: CanvasTexture | null; children?: React.ReactNode };

// The lid group is forwarded as the ref: the scene opens and closes it. Lid-local children (the screen) go in children.
export const Macbook = forwardRef<Group, Props>(function Macbook({ logo, children }, lidRef) {
  const { keys, depth: kbD } = useKeyLayout();
  const grille = useGrilleTexture();

  const geo = useMemo(
    () => ({
      base: slab(BASE.w, BASE.d, BASE.h, 0.0095, 0.0016),
      lid: slab(BASE.w, BASE.d, LID_T, 0.0095, 0.0014),
      key: new BoxGeometry(1, 1, 1),
      well: panel(KB_W + 0.006, kbD + 0.006, 0.003),
      grille: panel(0.017, kbD, 0.002),
      trackpad: panel(0.152, 0.094, 0.006),
      bezel: panel(BASE.w - 0.0045, BASE.d - 0.004, 0.0082, true),
      notch: panel(0.032, 0.0066, 0.0018, true),
      lens: new CylinderGeometry(0.0011, 0.0011, 0.0001, 20),
      hinge: new CylinderGeometry(0.0041, 0.0041, 0.262, 24),
      foot: new CylinderGeometry(0.0055, 0.0055, 0.0008, 20),
      logo: panel(0.05, 0.05, 0.0001),
    }),
    [kbD],
  );

  const mat = useMemo(
    () => ({
      // silver aluminium, softly reflective (the scene adds an environment for the sheen)
      alu: new MeshStandardMaterial({ color: "#d3d7da", metalness: 0.45, roughness: 0.4 }),
      hinge: new MeshStandardMaterial({ color: "#a9b0b4", metalness: 0.6, roughness: 0.4 }),
      trackpad: new MeshStandardMaterial({ color: "#c3c8cb", metalness: 0.45, roughness: 0.5 }),
      well: new MeshStandardMaterial({ color: "#0a0c0d", roughness: 0.85 }),
      key: new MeshStandardMaterial({ color: "#2b3033", roughness: 0.55 }),
      grille: new MeshStandardMaterial({ map: grille, transparent: true, roughness: 0.8 }),
      glass: new MeshStandardMaterial({ color: "#060708", metalness: 0, roughness: 0.15 }),
      lens: new MeshStandardMaterial({ color: "#1d2b35", roughness: 0.2 }),
      foot: new MeshStandardMaterial({ color: "#5b6266", roughness: 0.9 }),
      logo: new MeshStandardMaterial({ transparent: true, metalness: 0.3, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -2 }),
    }),
    [grille],
  );

  useEffect(() => {
    mat.logo.map = logo ?? null;
    mat.logo.visible = !!logo;
    mat.logo.needsUpdate = true;
  }, [logo, mat]);

  useEffect(
    () => () => {
      Object.values(geo).forEach((g) => g.dispose());
      Object.values(mat).forEach((m: Material) => m.dispose());
      grille.dispose();
    },
    [geo, mat, grille],
  );

  const top = BASE.h + 0.00002;
  const kbCenterZ = KB_BACK + kbD / 2;
  const grilleX = KB_W / 2 + 0.0065 + 0.0085;

  return (
    <group>
      {/* Base */}
      <mesh geometry={geo.base} material={mat.alu} />
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz], i) => (
        <mesh key={i} geometry={geo.foot} material={mat.foot} position={[sx * 0.134, -0.0003, sz * 0.0886]} />
      ))}
      <mesh geometry={geo.hinge} material={mat.hinge} rotation={[0, 0, Math.PI / 2]} position={[0, 0.0068, -BASE.d / 2 + 0.0026]} />
      <mesh geometry={geo.well} material={mat.well} position={[0, top, kbCenterZ]} />
      {keys.map((k, i) => (
        <mesh key={i} geometry={geo.key} material={mat.key} position={[k.x, BASE.h + KEY_H / 2, k.z]} scale={[k.w, KEY_H, k.d]} />
      ))}
      <mesh geometry={geo.grille} material={mat.grille} position={[-grilleX, top, kbCenterZ]} />
      <mesh geometry={geo.grille} material={mat.grille} position={[grilleX, top, kbCenterZ]} />
      <mesh geometry={geo.trackpad} material={mat.trackpad} position={[0, top, BASE.d / 2 - 0.0095 - 0.047]} />

      {/* Lid, hinged at the back of the base */}
      <group ref={lidRef} position={[0, HINGE.y, HINGE.z]}>
        <mesh geometry={geo.lid} material={mat.alu} position={[0, 0, BASE.d / 2]} />
        <mesh geometry={geo.bezel} material={mat.glass} position={[0, -0.00004, BASE.d / 2 + 0.0003]} />
        <mesh geometry={geo.notch} material={mat.glass} position={[0, -0.00014, SCREEN.z + SCREEN.h / 2 - 0.0066 / 2 + 0.0012]} />
        <mesh geometry={geo.lens} material={mat.lens} position={[0, -0.00017, SCREEN.z + SCREEN.h / 2 - 0.0021]} />
        <mesh geometry={geo.logo} material={mat.logo} position={[0, LID_T + 0.00004, BASE.d / 2]} />
        {children}
      </group>
    </group>
  );
});
