"use client";
import { Canvas, createPortal, useThree } from "@react-three/fiber";
import { ContactShadows, Html, useGLTF } from "@react-three/drei";
import { motion, MotionValue, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { Color, MeshStandardMaterial, type Group, type Mesh, type Object3D } from "three";
import { SampleSite } from "./SampleSite";

// The Blender laptop (public/models/laptop.glb, from Documents/laptop-mockup), driven by the hero's scroll timeline.
// Restyled flat and matte in the site's own colour tokens, like the CSS phone: no reflections, soft even light.
// Renders only when the scroll moves it (frameloop "demand").

const MODEL = "/models/laptop.glb";
// Screen mesh, measured from the model (model units): 0.2976 x 0.2062, corners 0.0035, centred 0.1106 from the hinge
const SCREEN_W = 0.2976;
const SCREEN_H = 0.2062;
const SCREEN_R = 0.0035;
const PX_W = 1600; // CSS width the sample site is laid out at (large, so it stays sharp when the screen fills the view)
const clamp = (v: number) => Math.min(1, Math.max(0, v));

// Blender material name → site colour token
const FINISH: Record<string, string> = {
  SpaceBlack_Aluminium: "--color-alu-200",
  Trackpad: "--color-alu-300",
  Rubber: "--color-alu-600",
  Keyboard_Well: "--color-well",
  Keycaps: "--color-key",
  Display_Glass: "--color-bezel",
  Screen: "--color-bezel",
};

function useFlatFinish(scene: Object3D) {
  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const made = new Map<string, MeshStandardMaterial>();
    scene.traverse((o) => {
      const mesh = o as Mesh;
      if (!mesh.isMesh) return;
      const name = (mesh.material as { name?: string }).name ?? "";
      const token = FINISH[name] ?? "--color-alu-200";
      if (!made.has(token)) made.set(token, new MeshStandardMaterial({ color: new Color(css.getPropertyValue(token).trim()), metalness: 0, roughness: 0.85 }));
      mesh.material = made.get(token)!;
    });
    return () => made.forEach((m) => m.dispose());
  }, [scene]);
}

// The laptop moves between three poses, all drawn by this one renderer so size, place and lid change in the same frame:
//   start: closed, tilted away, under the headline · open: facing you, the screen covering the view · rest: closed,
//   settled low in the view (the hero parks it between its section and the next).
// lid 0 closed → 1 open · toOpen 0 start → 1 open · toRest 0 open → 1 rest (closed: tilt, size, place) · still: no scroll
// story (reduced motion). After the lid shuts the scene holds still; the hero slides the canvas for the glide down.
type Drive = { lid: MotionValue<number>; toOpen: MotionValue<number>; toRest: MotionValue<number>; siteEnd: MotionValue<number>; still?: boolean };
const CAM_Z = 3.2;
const CAM_Y = 0.35;
// R3F aims the default camera at the origin, so the middle of the view is y = 0 at the laptop
const VIEW_H = 2 * Math.hypot(CAM_Z, CAM_Y) * Math.tan((14 * Math.PI) / 180); // visible height at the laptop (fov 28)
const MODEL_SCALE = 4.4;
const LAPTOP_W = 0.312; // model width
// Open and facing you, the whole laptop (lid top to front edge) is about this tall for its width
const OPEN_ASPECT = 1.18;
const OPEN_GROW = 1.08; // open: this much larger than "the whole laptop just fits"
const OPEN_NEAR = 1.17; // the front edge is nearer the camera, so the open laptop draws about this much bigger
// Closed, the laptop sits this far below the middle of the view (fraction of its height), i.e. at 80% of the way down;
// MacbookHero's CLOSED_AT must match
const CLOSED_Y = 0.3;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Laptop({ lid, toOpen, toRest, siteY, siteEnd, still }: Drive & { siteY: MotionValue<string> }) {
  const { scene } = useGLTF(MODEL);
  useFlatFinish(scene);
  const invalidate = useThree((s) => s.invalidate);
  const size = useThree((s) => s.size);
  const rig = useRef<Group>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const pivot = useMemo(() => scene.getObjectByName("LidPivot") as Object3D, [scene]);

  // The Html overlays (screen, logo) mount a moment after the first render; with frameloop "demand" nothing redraws
  // until the scroll moves, so redraw a few times while they settle in
  useEffect(() => {
    const id = setInterval(invalidate, 100);
    const stop = setTimeout(() => clearInterval(id), 1200);
    return () => { clearInterval(id); clearTimeout(stop); };
  }, [invalidate]);

  // How far the sample site scrolls: 1 - screen height / site height. The screen only exists once drei has
  // placed the Html, so measure on the first frame that finds it, and again after a resize.
  const measured = useRef(false);
  useEffect(() => {
    const reset = () => { measured.current = false; };
    window.addEventListener("resize", reset);
    return () => window.removeEventListener("resize", reset);
  }, []);

  useEffect(() => {
    const aspect = size.width / size.height;
    const viewW = VIEW_H * aspect;
    const wide = aspect >= 1;
    // Open: a little larger than the whole laptop just fitting the view, with the screen centred
    const openW = (Math.min(0.86 * viewW, 0.84 * VIEW_H * OPEN_ASPECT) / OPEN_NEAR) * (wide ? OPEN_GROW : 1);
    const openScale = still ? 0.95 : openW / (LAPTOP_W * MODEL_SCALE);
    const fitW = viewW / (LAPTOP_W * MODEL_SCALE); // scale at which the laptop spans the view's width
    const restScale = (wide ? 0.42 : 0.6) * fitW;
    const startScale = (wide ? 0.34 : 0.62) * fitW;
    const poses = {
      // Closed, tilted away, in the lower part of the view under the headline
      start: { rx: 0.95, ry: -0.65, s: startScale, x: (wide ? 0.06 : 0.08) * viewW, y: -(wide ? 0.27 : 0.3) * VIEW_H },
      // Open: the base sits where the closed laptop will be as the lid shuts, so closing adds no up-or-down move
      open: { rx: 0.2, ry: 0, s: openScale, x: 0, y: still ? -0.42 * 0.95 : -CLOSED_Y * VIEW_H },
      rest: { rx: -0.08, ry: 0, s: restScale, x: 0, y: -CLOSED_Y * VIEW_H }, // tipped toward edge-on: a slim closed slab
    };

    const apply = () => {
      const screen = screenRef.current;
      const site = screen?.firstElementChild as HTMLElement | null;
      if (!measured.current && screen && site?.offsetHeight) {
        siteEnd.set(Math.max(0, 1 - screen.offsetHeight / site.offsetHeight));
        measured.current = true;
      }
      const open = lid.get();
      const u = still ? 1 : toOpen.get();
      const v = still ? 0 : toRest.get();
      // Size and height follow u² so the laptop turns to face you first and grows mostly after
      const pose = (k: "rx" | "ry" | "s" | "x" | "y") => lerp(lerp(poses.start[k], poses.open[k], k === "s" || k === "y" ? u * u : u), poses.rest[k], v);
      pivot.rotation.set(-1.83 * open, 0, 0); // closed flat → about 105° open, like the Blender pose
      if (rig.current) {
        rig.current.rotation.set(pose("rx"), pose("ry"), 0);
        rig.current.scale.setScalar(MODEL_SCALE * pose("s"));
        rig.current.position.set(pose("x"), pose("y"), 0);
      }
      if (screen) screen.style.opacity = String(clamp((open - 0.35) / 0.3));
      invalidate();
    };
    apply();
    const offs = [lid, toOpen, toRest].map((m) => m.on("change", apply));
    return () => offs.forEach((off) => off());
  }, [lid, toOpen, toRest, still, size, pivot, invalidate, siteEnd]);

  return (
    <group ref={rig} scale={MODEL_SCALE}>
      <primitive object={scene} />
      <ContactShadows position={[0, -0.001, 0]} scale={0.6} blur={2.6} opacity={0.22} far={0.2} resolution={256} frames={1} />
      {/* The sample site sits on the Screen mesh, inside the lid pivot so it opens with the lid */}
      {createPortal(
        <Html transform distanceFactor={(400 * SCREEN_W) / PX_W} position={[0, -0.0006, 0.1106]} rotation={[Math.PI / 2, 0, 0]} zIndexRange={[5, 0]}>
          <div ref={screenRef} className="overflow-hidden bg-paper [backface-visibility:hidden]" style={{ width: PX_W, height: (PX_W * SCREEN_H) / SCREEN_W, borderRadius: (PX_W * SCREEN_R) / SCREEN_W, fontSize: 24.8, opacity: 0 }}>
            <motion.div data-site style={{ y: siteY }}><SampleSite /></motion.div>
          </div>
        </Html>,
        pivot,
      )}
      {/* The "h." logo on the back of the lid: facing up when closed and reading from the front, hidden when open */}
      {createPortal(
        <Html transform distanceFactor={0.4} position={[0, 0.0049, 0.1106]} rotation={[-Math.PI / 2, 0, 0]} zIndexRange={[4, 0]}>
          <span className="block select-none font-display text-[60px] font-extrabold leading-none text-alu-500 [backface-visibility:hidden]" aria-hidden="true">
            h<span className="text-signal">.</span>
          </span>
        </Html>,
        pivot,
      )}
    </group>
  );
}

// site: 0 → 1 how far the sample site has scrolled
export default function LaptopScene({ site, ...drive }: Drive & { site: MotionValue<number> }) {
  const siteY = useTransform(() => `${-site.get() * drive.siteEnd.get() * 100}%`);
  return (
    <Canvas frameloop="demand" dpr={[1, 1.75]} camera={{ fov: 28, position: [0, CAM_Y, CAM_Z] }} gl={{ alpha: true, antialias: true }} aria-hidden="true">
      {/* Soft, even light: enough to read the form, no highlights or coloured rims */}
      <ambientLight intensity={1.9} />
      <directionalLight position={[1, 3, 4]} intensity={1.1} />
      <Laptop {...drive} siteY={siteY} />
    </Canvas>
  );
}

useGLTF.preload(MODEL);
