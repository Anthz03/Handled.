"use client";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { CanvasTexture, MeshBasicMaterial, PlaneGeometry, SRGBColorSpace, type Group } from "three";
import { LAPTOP_W, Macbook, SCREEN } from "./Macbook";
import { BROWSER_BAR_H, drawBrowserBar, drawLidLogo, drawSampleSite, loadSiteFonts, SITE_W } from "@/lib/sampleSite";
// The sample café site on the screen uses a serif; only this lazily loaded chunk pulls it in
import "@fontsource-variable/fraunces";
import "@fontsource-variable/fraunces/wght-italic.css";

// The MacBook-style laptop (Macbook.tsx), driven by the hero's scroll timeline. The sample site is painted onto the
// screen as a texture, so it is part of the 3D model and stays exactly on the screen at any size, zoom or GPU.
// Renders only when the scroll moves it (frameloop "demand").

const clamp = (v: number) => Math.min(1, Math.max(0, v));

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
// Open and facing you, the whole laptop (lid top to front edge) is about this tall for its width
const OPEN_ASPECT = 1.18;
const OPEN_GROW = 1.08; // open: this much larger than "the whole laptop just fits"
const OPEN_NEAR = 1.17; // the front edge is nearer the camera, so the open laptop draws about this much bigger
// Closed, the laptop sits this far below the middle of the view (fraction of its height), i.e. at 80% of the way down;
// MacbookHero's CLOSED_AT must match
const CLOSED_Y = 0.3;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function Laptop({ lid, toOpen, toRest, site, siteEnd, still }: Drive & { site: MotionValue<number> }) {
  const invalidate = useThree((s) => s.invalidate);
  const size = useThree((s) => s.size);
  const gl = useThree((s) => s.gl);
  const rig = useRef<Group>(null);
  const pivot = useRef<Group>(null);
  const [siteTex, setSiteTex] = useState<CanvasTexture | null>(null);
  const [logoTex, setLogoTex] = useState<CanvasTexture | null>(null);
  const [barTex, setBarTex] = useState<CanvasTexture | null>(null);

  // Paint the sample site and the lid logo once the brand fonts are ready
  useEffect(() => {
    let live = true;
    let made: CanvasTexture[] = [];
    loadSiteFonts().then(() => {
      if (!live) return;
      const siteCanvas = drawSampleSite(gl.capabilities.maxTextureSize);
      const t = new CanvasTexture(siteCanvas);
      t.colorSpace = SRGBColorSpace;
      t.anisotropy = gl.capabilities.getMaxAnisotropy();
      // Show one screen's worth of the page under the browser bar; the scroll moves the window down it
      const screenPx = (SITE_W * SCREEN.h) / SCREEN.w - BROWSER_BAR_H;
      t.repeat.set(1, Math.min(1, (screenPx / SITE_W) * (siteCanvas.width / siteCanvas.height)));
      t.offset.set(0, 1 - t.repeat.y);
      siteEnd.set(1 - t.repeat.y);
      const l = new CanvasTexture(drawLidLogo());
      l.colorSpace = SRGBColorSpace;
      const b = new CanvasTexture(drawBrowserBar());
      b.colorSpace = SRGBColorSpace;
      b.anisotropy = t.anisotropy;
      made = [t, l, b];
      setSiteTex(t);
      setLogoTex(l);
      setBarTex(b);
    });
    return () => { live = false; made.forEach((t) => t.dispose()); };
  }, [gl, siteEnd]);

  // The screen: the browser bar along the top, the page below it. Both face the keyboard when closed, the viewer
  // when open.
  const screen = useMemo(() => {
    const barH = (SCREEN.h * BROWSER_BAR_H * SCREEN.w) / (SITE_W * SCREEN.h);
    const page = new PlaneGeometry(SCREEN.w, SCREEN.h - barH);
    page.rotateX(Math.PI / 2);
    page.translate(0, 0, -barH / 2);
    const bar = new PlaneGeometry(SCREEN.w, barH);
    bar.rotateX(Math.PI / 2);
    bar.translate(0, 0, SCREEN.h / 2 - barH / 2);
    return {
      geo: page,
      barGeo: bar,
      mat: new MeshBasicMaterial({ color: "#000", toneMapped: false }),
      barMat: new MeshBasicMaterial({ color: "#000", toneMapped: false }),
    };
  }, []);
  useEffect(() => () => { screen.geo.dispose(); screen.barGeo.dispose(); screen.mat.dispose(); screen.barMat.dispose(); }, [screen]);
  useEffect(() => {
    screen.mat.map = siteTex;
    screen.mat.needsUpdate = true;
    screen.barMat.map = barTex;
    screen.barMat.needsUpdate = true;
    invalidate();
  }, [siteTex, barTex, screen, invalidate]);

  // Scroll the page on the screen
  useEffect(() => {
    if (!siteTex) return;
    const update = () => {
      siteTex.offset.y = 1 - siteTex.repeat.y - clamp(site.get()) * (1 - siteTex.repeat.y);
      invalidate();
    };
    update();
    return site.on("change", update);
  }, [site, siteTex, invalidate]);

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
      const open = lid.get();
      const u = still ? 1 : toOpen.get();
      const v = still ? 0 : toRest.get();
      // Size and height follow u² so the laptop turns to face you first and grows mostly after
      const pose = (k: "rx" | "ry" | "s" | "x" | "y") => lerp(lerp(poses.start[k], poses.open[k], k === "s" || k === "y" ? u * u : u), poses.rest[k], v);
      pivot.current?.rotation.set(-1.83 * open, 0, 0); // closed flat → about 105° open
      if (rig.current) {
        rig.current.rotation.set(pose("rx"), pose("ry"), 0);
        rig.current.scale.setScalar(MODEL_SCALE * pose("s"));
        rig.current.position.set(pose("x"), pose("y"), 0);
      }
      // The screen wakes up as the lid opens
      const glow = clamp((open - 0.35) / 0.3);
      screen.mat.color.setScalar(glow);
      screen.barMat.color.setScalar(glow);
      invalidate();
    };
    apply();
    const offs = [lid, toOpen, toRest].map((m) => m.on("change", apply));
    return () => offs.forEach((off) => off());
  }, [lid, toOpen, toRest, still, size, invalidate, screen]);

  return (
    <group ref={rig} scale={MODEL_SCALE}>
      <Macbook ref={pivot} logo={logoTex}>
        <mesh geometry={screen.geo} material={screen.mat} position={[0, -0.0001, SCREEN.z]} />
        <mesh geometry={screen.barGeo} material={screen.barMat} position={[0, -0.0001, SCREEN.z]} />
      </Macbook>
      <ContactShadows position={[0, -0.001, 0]} scale={0.6} blur={2.6} opacity={0.22} far={0.2} resolution={256} frames={1} />
    </group>
  );
}

// site: 0 → 1 how far the sample site has scrolled
export default function LaptopScene(props: Drive & { site: MotionValue<number> }) {
  return (
    <Canvas frameloop="demand" dpr={[1, 1.75]} camera={{ fov: 28, position: [0, CAM_Y, CAM_Z] }} gl={{ alpha: true, antialias: true }} aria-hidden="true">
      {/* Soft studio light, plus a few light panels for the aluminium to reflect */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[1, 3, 4]} intensity={1.4} />
      <Environment resolution={128} frames={1}>
        <Lightformer intensity={1.3} position={[0, 4, 2]} scale={[8, 3, 1]} />
        <Lightformer intensity={1.2} position={[-4, 1, 2]} scale={[3, 6, 1]} />
        <Lightformer intensity={1.2} position={[4, 1, 2]} scale={[3, 6, 1]} />
        <Lightformer intensity={0.6} position={[0, -3, 2]} scale={[8, 2, 1]} />
      </Environment>
      <Laptop {...props} />
    </Canvas>
  );
}
