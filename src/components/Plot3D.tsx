import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { Canvas } from "@react-three/fiber";
import { Edges, Grid, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { byId } from "../data/elements";
import { footprint, type PlacedItem } from "../lib/impact";
import { download3DPng, register3DCanvas } from "../lib/export3d";
import { plotDims, useProject } from "../state/useProject";
import { CAT } from "../theme/palette";

/*
 * A switchable 3D "dollhouse" view of the same design. Read-only: editing happens
 * in the 2D plan; this visualizes it. Cozy massing by category with ink edges to
 * match the floor-plan look — trees as trunk + canopy, bike parking as hoops, a
 * bus-shelter canopy, benches with backs, soft drop shadows, hover labels, a
 * reset-view and a save-PNG control. Lazy-loaded so three.js never touches the
 * initial bundle.
 */

const INK = "#2a2d31";
const TRUNK = "#8a6a43";

type Kind = "box" | "tree" | "pad" | "house" | "bike" | "shelter" | "seat";
const SPEC: Record<string, { h: number; kind: Kind }> = {
  "cafe-table": { h: 2.4, kind: "box" },
  "comm-table": { h: 2.4, kind: "box" },
  bench: { h: 1.4, kind: "seat" },
  counter: { h: 3.4, kind: "box" },
  planter: { h: 2.2, kind: "box" },
  tree: { h: 16, kind: "tree" },
  raingarden: { h: 0.4, kind: "pad" },
  lawn: { h: 0.35, kind: "pad" },
  bikerack: { h: 2.4, kind: "bike" },
  bikecorral: { h: 2.4, kind: "bike" },
  busshelter: { h: 8, kind: "shelter" },
  scooter: { h: 3, kind: "box" },
  adu: { h: 11, kind: "house" },
  kiosk: { h: 8, kind: "house" },
  trash: { h: 3.6, kind: "box" },
  library: { h: 4, kind: "box" },
  parcel: { h: 5, kind: "box" },
  art: { h: 6, kind: "box" },
  daylight: { h: 0.35, kind: "pad" },
};
const DEFAULT_SPEC = { h: 2.5, kind: "box" as Kind };

function Piece({ item }: { item: PlacedItem }) {
  const el = byId(item.ref);
  const [hover, setHover] = useState(false);
  if (!el) return null;

  const fp = footprint(el, item.rotation);
  const { h, kind } = SPEC[el.id] ?? DEFAULT_SPEC;
  const cat = CAT[el.cat];
  const cx = item.x + fp.w / 2;
  const cz = item.y + fp.l / 2;

  let content: ReactElement;
  let labelY = h;

  if (kind === "pad") {
    labelY = 1;
    content = (
      <mesh position={[0, h / 2, 0]} receiveShadow>
        <boxGeometry args={[fp.w, h, fp.l]} />
        <meshStandardMaterial color={cat.color} roughness={1} />
      </mesh>
    );
  } else if (kind === "tree") {
    const r = Math.min(fp.w, fp.l) / 2;
    const trunkH = Math.max(3.5, r * 1.6);
    labelY = trunkH + r * 1.7;
    content = (
      <>
        <mesh position={[0, trunkH / 2, 0]} castShadow>
          <cylinderGeometry args={[r * 0.18, r * 0.24, trunkH, 8]} />
          <meshStandardMaterial color={TRUNK} roughness={1} />
        </mesh>
        <mesh position={[0, trunkH + r * 0.7, 0]} castShadow>
          <sphereGeometry args={[r, 16, 12]} />
          <meshStandardMaterial color={cat.color} roughness={1} />
        </mesh>
      </>
    );
  } else if (kind === "bike") {
    const count = Math.max(2, Math.round(Math.max(fp.w, fp.l) / 3));
    const along = fp.l >= fp.w; // arches run along the longer axis
    const span = along ? fp.l : fp.w;
    const R = Math.min(1.3, (along ? fp.w : fp.l) * 0.42);
    labelY = R + 1.2;
    content = (
      <>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <boxGeometry args={[fp.w, 0.2, fp.l]} />
          <meshStandardMaterial color={cat.soft} roughness={1} />
        </mesh>
        {Array.from({ length: count }, (_, i) => {
          const t = -span / 2 + (span / (count + 1)) * (i + 1);
          return (
            <mesh key={i} position={along ? [0, 0, t] : [t, 0, 0]} rotation={[0, along ? 0 : Math.PI / 2, 0]} castShadow>
              <torusGeometry args={[R, 0.12, 8, 18, Math.PI]} />
              <meshStandardMaterial color={cat.color} roughness={0.85} metalness={0.1} />
            </mesh>
          );
        })}
      </>
    );
  } else if (kind === "shelter") {
    const postH = h * 0.82;
    const roofT = 0.4;
    const pw = 0.3;
    labelY = h + 0.8;
    const corners: [number, number][] = [
      [-fp.w / 2 + 0.4, -fp.l / 2 + 0.4],
      [fp.w / 2 - 0.4, -fp.l / 2 + 0.4],
      [-fp.w / 2 + 0.4, fp.l / 2 - 0.4],
      [fp.w / 2 - 0.4, fp.l / 2 - 0.4],
    ];
    content = (
      <>
        {corners.map(([x, z], i) => (
          <mesh key={i} position={[x, postH / 2, z]} castShadow>
            <boxGeometry args={[pw, postH, pw]} />
            <meshStandardMaterial color={cat.deep} roughness={0.9} />
          </mesh>
        ))}
        {/* back panel */}
        <mesh position={[0, postH / 2, -fp.l / 2 + 0.2]} castShadow>
          <boxGeometry args={[fp.w, postH * 0.82, 0.2]} />
          <meshStandardMaterial color={cat.soft} roughness={0.9} transparent opacity={0.85} />
        </mesh>
        {/* canopy roof */}
        <mesh position={[0, postH + roofT / 2, 0]} castShadow>
          <boxGeometry args={[fp.w + 0.6, roofT, fp.l + 0.6]} />
          <meshStandardMaterial color={cat.color} roughness={0.9} />
          <Edges color={INK} threshold={15} />
        </mesh>
      </>
    );
  } else if (kind === "seat") {
    const seatH = 1.3;
    const slabT = 0.4;
    labelY = seatH + 1.8;
    const backAlongX = fp.w >= fp.l; // back runs along the longer edge
    content = (
      <>
        {/* seat slab */}
        <mesh position={[0, seatH, 0]} castShadow>
          <boxGeometry args={[fp.w, slabT, fp.l]} />
          <meshStandardMaterial color={cat.color} roughness={0.9} />
          <Edges color={INK} threshold={15} />
        </mesh>
        {/* base */}
        <mesh position={[0, (seatH - slabT) / 2, 0]}>
          <boxGeometry args={[fp.w * 0.8, seatH - slabT, fp.l * 0.5]} />
          <meshStandardMaterial color={cat.deep} roughness={1} />
        </mesh>
        {/* backrest along the back edge */}
        <mesh
          position={backAlongX ? [0, seatH + 0.75, -fp.l / 2 + 0.2] : [-fp.w / 2 + 0.2, seatH + 0.75, 0]}
          castShadow
        >
          <boxGeometry args={backAlongX ? [fp.w, 1.4, 0.3] : [0.3, 1.4, fp.l]} />
          <meshStandardMaterial color={cat.color} roughness={0.9} />
          <Edges color={INK} threshold={15} />
        </mesh>
      </>
    );
  } else {
    // box or house
    const roofH = kind === "house" ? Math.min(h * 0.4, 5) : 0;
    const bodyH = h - roofH;
    labelY = h;
    content = (
      <>
        <mesh position={[0, bodyH / 2, 0]} castShadow>
          <boxGeometry args={[fp.w, bodyH, fp.l]} />
          <meshStandardMaterial color={cat.color} roughness={0.95} />
          <Edges color={INK} threshold={15} />
        </mesh>
        {roofH > 0 && (
          <mesh position={[0, bodyH + roofH / 2, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[Math.max(fp.w, fp.l) * 0.72, roofH, 4]} />
            <meshStandardMaterial color={cat.deep} roughness={0.95} />
            <Edges color={INK} threshold={15} />
          </mesh>
        )}
      </>
    );
  }

  return (
    <group
      position={[cx, 0, cz]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
      }}
      onPointerOut={() => setHover(false)}
    >
      {content}
      {hover && (
        <Html position={[0, labelY + 1, 0]} center style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: INK,
              color: "#fff",
              padding: "2px 7px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 700,
              whiteSpace: "nowrap",
            }}
          >
            {el.name}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Plot3D() {
  const project = useProject((s) => s.project);
  const { wFt, lFt } = plotDims(project);
  const maxDim = Math.max(wFt, lFt);
  const center: [number, number, number] = [wFt / 2, 0, lFt / 2];
  const defaultCam: [number, number, number] = [wFt / 2 - maxDim * 0.55, maxDim * 1.05, lFt + maxDim * 0.45];
  const controls = useRef<{ object: THREE.Camera; target: THREE.Vector3; update: () => void } | null>(null);
  const lightTarget = useMemo(() => new THREE.Object3D(), []);

  // clear the registered canvas when leaving the 3D view
  useEffect(() => () => register3DCanvas(null), []);

  const resetView = () => {
    const c = controls.current;
    if (!c) return;
    c.object.position.set(defaultCam[0], defaultCam[1], defaultCam[2]);
    c.target.set(center[0], center[1], center[2]);
    c.update();
  };

  return (
    <div
      className="relative overflow-hidden rounded-md"
      style={{ height: 460, border: `1px solid ${INK}`, background: "#eef1f4" }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ position: defaultCam, fov: 42 }}
        onCreated={({ gl }) => register3DCanvas(gl.domElement)}
      >
        <color attach="background" args={["#eef1f4"]} />
        <ambientLight intensity={0.68} />
        <primitive object={lightTarget} position={center} />
        <directionalLight
          position={[wFt + maxDim, maxDim * 1.6, lFt * 0.2 + maxDim * 0.5]}
          intensity={1.15}
          castShadow
          target={lightTarget}
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0004}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-maxDim * 1.3, maxDim * 1.3, maxDim * 1.3, -maxDim * 1.3, 0.1, maxDim * 6]}
          />
        </directionalLight>
        <directionalLight position={[-maxDim * 0.4, maxDim, -maxDim * 0.3]} intensity={0.3} />

        {/* ground + foot grid */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={center} receiveShadow>
          <planeGeometry args={[wFt, lFt]} />
          <meshStandardMaterial color="#fbf9f2" roughness={1} />
        </mesh>
        <Grid
          position={[wFt / 2, 0.02, lFt / 2]}
          args={[wFt, lFt]}
          cellSize={1}
          cellThickness={0.6}
          cellColor="#e7e4d9"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#d8d4c9"
          fadeDistance={maxDim * 3}
          fadeStrength={1}
          infiniteGrid={false}
        />

        {project.items.map((it) => (
          <Piece key={it.uid} item={it} />
        ))}

        <OrbitControls
          ref={controls as never}
          target={center}
          enableDamping
          maxPolarAngle={Math.PI / 2 - 0.04}
          minDistance={maxDim * 0.4}
          maxDistance={maxDim * 4}
        />
      </Canvas>

      {/* overlay controls */}
      <div className="absolute right-2 top-2 flex gap-1.5">
        <button
          onClick={resetView}
          className="cursor-pointer rounded px-2.5 py-1 text-[12px] font-bold"
          style={{ background: "rgba(255,255,255,.92)", border: "1px solid #d8d4c9", color: INK }}
        >
          Reset view
        </button>
        <button
          onClick={() => download3DPng(project.name)}
          className="cursor-pointer rounded px-2.5 py-1 text-[12px] font-bold"
          style={{ background: "rgba(255,255,255,.92)", border: "1px solid #d8d4c9", color: INK }}
        >
          Save PNG
        </button>
      </div>
    </div>
  );
}
