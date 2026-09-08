import Konva from "konva";
import { useEffect, useMemo, useRef, useState } from "react";
import { Group, Image as KImage, Layer, Line, Rect, Stage, Text } from "react-konva";
import { byId, type BankElement } from "../data/elements";
import { footprint, overlappingUids, type PlacedItem } from "../lib/impact";
import { registerStage } from "../lib/exportPng";
import { carDataUrl, spriteDataUrl } from "../lib/sprites";
import { plotDims, useProject } from "../state/useProject";
import { C, CAT } from "../theme/palette";
import { fmtArea, fmtLen } from "../lib/units";
import { SPACE_L_FT, SPACE_W_FT } from "../data/scales";

const prefersReducedMotion = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

function useImageEl(src: string): HTMLImageElement | undefined {
  const [img, setImg] = useState<HTMLImageElement>();
  useEffect(() => {
    const i = new window.Image();
    i.onload = () => setImg(i);
    i.src = src;
    return () => {
      i.onload = null;
    };
  }, [src]);
  return img;
}

/** 1-ft drafting grid on paper, rendered once per zoom level. */
function useGridPattern(pxPerFt: number): HTMLCanvasElement {
  return useMemo(() => {
    const s = Math.max(2, Math.round(pxPerFt));
    const cv = document.createElement("canvas");
    cv.width = s;
    cv.height = s;
    const ctx = cv.getContext("2d")!;
    ctx.fillStyle = C.grass;
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = C.grassDark;
    ctx.fillRect(0, s - 1, s, 1);
    ctx.fillRect(s - 1, 0, 1, s);
    return cv;
  }, [pxPerFt]);
}

interface PlotItemProps {
  item: PlacedItem;
  el: BankElement;
  px: number;
  plotW: number;
  plotL: number;
  isSelected: boolean;
  isOverlapping: boolean;
  popIn: boolean;
}

function PlotItem({ item, el, px, plotW, plotL, isSelected, isOverlapping, popIn }: PlotItemProps) {
  const units = useProject((s) => s.units);
  const cat = CAT[el.cat];
  const fp = footprint(el, item.rotation);
  const w = fp.w * px;
  const h = fp.l * px;
  const select = useProject((s) => s.select);
  const moveItem = useProject((s) => s.moveItem);
  const sprite = useImageEl(spriteDataUrl(el.icon, el.cat, 128));
  const groupRef = useRef<Konva.Group>(null);

  // quick settle-in when first placed (subtler than the old cozy bounce)
  useEffect(() => {
    if (!popIn || prefersReducedMotion()) return;
    const node = groupRef.current;
    if (!node) return;
    node.scale({ x: 0.82, y: 0.82 });
    node.opacity(0.4);
    node.to({ scaleX: 1, scaleY: 1, opacity: 1, duration: 0.22, easing: Konva.Easings.BackEaseOut });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spriteSize = Math.min(38, Math.min(w, h) * 0.55);
  const showSprite = w > 24 && h > 24;
  const showLabel = w > 44 && h > 40;

  return (
    <Group
      ref={groupRef}
      x={item.x * px + w / 2}
      y={item.y * px + h / 2}
      offsetX={w / 2}
      offsetY={h / 2}
      draggable
      onClick={(e) => {
        e.cancelBubble = true;
        select(item.uid);
      }}
      onTap={(e) => {
        e.cancelBubble = true;
        select(item.uid);
      }}
      onDragStart={() => select(item.uid)}
      dragBoundFunc={(pos) => {
        // snap to the 1-ft grid and keep the footprint inside the plot
        const gx = Math.round(Math.max(0, Math.min(plotW - fp.w, (pos.x - w / 2) / px)));
        const gy = Math.round(Math.max(0, Math.min(plotL - fp.l, (pos.y - h / 2) / px)));
        return { x: gx * px + w / 2, y: gy * px + h / 2 };
      }}
      onDragEnd={(e) => {
        moveItem(item.uid, Math.round((e.target.x() - w / 2) / px), Math.round((e.target.y() - h / 2) / px));
      }}
      onMouseEnter={(e) => {
        const st = e.target.getStage();
        if (st) st.container().style.cursor = "grab";
      }}
      onMouseLeave={(e) => {
        const st = e.target.getStage();
        if (st) st.container().style.cursor = "default";
      }}
    >
      <Rect
        width={w}
        height={h}
        cornerRadius={2}
        fill={isOverlapping ? "#f6ddd6" : cat.soft}
        stroke={isOverlapping ? "#c93a26" : C.woodDark}
        strokeWidth={1.4}
      />
      {isSelected && (
        <Rect
          width={w + 8}
          height={h + 8}
          x={-4}
          y={-4}
          cornerRadius={4}
          stroke={C.leaf}
          strokeWidth={2}
          dash={[7, 5]}
          listening={false}
        />
      )}
      {showSprite && sprite && (
        <KImage
          image={sprite}
          width={spriteSize}
          height={spriteSize}
          x={w / 2}
          y={h / 2 - (showLabel ? 5 : 0)}
          offsetX={spriteSize / 2}
          offsetY={spriteSize / 2}
          rotation={item.rotation}
          listening={false}
        />
      )}
      {showLabel && (
        <>
          <Text
            text={el.name.toUpperCase()}
            x={-20}
            y={h / 2 + spriteSize / 2 - 1}
            width={w + 40}
            align="center"
            wrap="none"
            fontSize={8}
            fontStyle="600"
            letterSpacing={0.8}
            fontFamily="Inter, system-ui, sans-serif"
            fill={C.ink}
            listening={false}
          />
          {h > 78 && (
            <Text
              text={`A: ${fmtArea(el.wFt * el.lFt, units)}`}
              x={0}
              y={h / 2 + spriteSize / 2 + 9}
              width={w}
              align="center"
              fontSize={7}
              fontFamily="Inter, system-ui, sans-serif"
              fill={C.inkSoft}
              listening={false}
            />
          )}
        </>
      )}
    </Group>
  );
}

function CarsOverlay({ px, plotW, plotL }: { px: number; plotW: number; plotL: number }) {
  const car = useImageEl(carDataUrl());
  if (!car) return null;
  const cols = Math.max(1, Math.round(plotW / SPACE_W_FT));
  const rows = Math.max(1, Math.floor(plotL / SPACE_L_FT));
  const cells: { x: number; y: number }[] = [];
  for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) cells.push({ x: c, y: r });
  return (
    <>
      {cells.map(({ x, y }) => (
        <KImage
          key={`${x}-${y}`}
          image={car}
          x={x * SPACE_W_FT * px + 5}
          y={y * SPACE_L_FT * px + 5}
          width={SPACE_W_FT * px - 10}
          height={SPACE_L_FT * px - 10}
          opacity={0.55}
          listening={false}
        />
      ))}
    </>
  );
}

/**
 * Center canvas: a react-konva stage over a tiled grass plot. Items snap to
 * the 1-ft grid, drag within bounds, rotate in 90° steps, and pop in bouncily.
 */
export function PlotCanvas() {
  const project = useProject((s) => s.project);
  const selectedUid = useProject((s) => s.selectedUid);
  const showBefore = useProject((s) => s.showBefore);
  const justPlacedUid = useProject((s) => s.justPlacedUid);
  const select = useProject((s) => s.select);
  const addElement = useProject((s) => s.addElement);
  const units = useProject((s) => s.units);

  const { wFt, lFt } = plotDims(project);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [px, setPx] = useState(16);

  useEffect(() => {
    const fit = () => {
      const avail = (wrapRef.current?.clientWidth ?? 400) - 12;
      setPx(Math.max(6, Math.min(22, avail / wFt)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [wFt]);

  const cw = wFt * px;
  const ch = lFt * px;
  const grid = useGridPattern(px);
  const overlaps = useMemo(() => overlappingUids(project.items), [project.items]);

  return (
    <div ref={wrapRef} className="min-w-0">
      <div className="flex items-start gap-1.5">
        <span
          className="dim shrink-0 self-center"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", height: Math.min(ch, 360) }}
        >
          ← {fmtLen(lFt, units)} →
        </span>
        <div
          className="relative rounded-[3px]"
          style={{
            width: cw + 4,
            border: `2px solid ${C.woodDark}`,
            overflow: "hidden",
            lineHeight: 0,
            touchAction: "none",
          }}
          onDragOver={(e) => {
            if (e.dataTransfer.types.includes("text/reclaim-element")) e.preventDefault();
          }}
          onDrop={(e) => {
            const ref = e.dataTransfer.getData("text/reclaim-element");
            const el = byId(ref);
            if (!el) return;
            e.preventDefault();
            const rect = e.currentTarget.getBoundingClientRect();
            addElement(ref, {
              x: (e.clientX - rect.left) / px - el.wFt / 2,
              y: (e.clientY - rect.top) / px - el.lFt / 2,
            });
          }}
        >
          <Stage
            ref={(node) => registerStage(node)}
            width={cw}
            height={ch}
            onMouseDown={(e) => {
              if (e.target === e.target.getStage()) select(null);
            }}
            onTouchStart={(e) => {
              if (e.target === e.target.getStage()) select(null);
            }}
          >
            <Layer listening={false}>
              {/* Konva accepts canvas pattern sources; its TS types only name HTMLImageElement */}
              <Rect width={cw} height={ch} fillPatternImage={grid as unknown as HTMLImageElement} />
              {showBefore && <CarsOverlay px={px} plotW={wFt} plotL={lFt} />}
            </Layer>
            <Layer>
              {project.items.map((p) => {
                const el = byId(p.ref);
                if (!el) return null;
                return (
                  <PlotItem
                    key={p.uid}
                    item={p}
                    el={el}
                    px={px}
                    plotW={wFt}
                    plotL={lFt}
                    isSelected={selectedUid === p.uid}
                    isOverlapping={overlaps.has(p.uid)}
                    popIn={justPlacedUid === p.uid}
                  />
                );
              })}
            </Layer>
            {/* sheet annotations: north arrow, top-right */}
            <Layer listening={false}>
              <Group x={cw - 16} y={20} opacity={0.8}>
                <Line points={[0, 8, 0, -6]} stroke={C.ink} strokeWidth={1.2} />
                <Line points={[-3.5, -2, 0, -7, 3.5, -2]} closed fill={C.ink} />
                <Text text="N" x={-4} y={11} fontSize={9} fontStyle="600" fill={C.ink} fontFamily="Inter, system-ui, sans-serif" />
              </Group>
            </Layer>
          </Stage>
          {project.items.length === 0 && !showBefore && (
            <div
              className="note pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1 p-5 text-center text-[15px]"
              style={{ color: C.inkSoft, lineHeight: 1.5 }}
            >
              What would you do with open space?
            </div>
          )}
        </div>
      </div>
      <div className="dim text-center" style={{ width: cw + 4, marginLeft: 22 }}>
        ← {fmtLen(wFt, units)} →
      </div>
      <div
        className="mt-1 text-[10px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: C.inkSoft, width: cw + 4, marginLeft: 22, textAlign: "center" }}
      >
        Site plan · {fmtArea(wFt * lFt, units)} · 1 grid cell = {fmtLen(1, units)}
      </div>
    </div>
  );
}
