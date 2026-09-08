# 🌱 Reclaim

A cozy, top-down city-builder-style web app for redesigning a parking space into something the whole block can enjoy — outdoor dining, a pocket park, a studio home, a transit stop, containerized trash, and more.

Pick a scale (one spot → a small lot), start from a template or a blank grass plot, place elements from the toy box, watch live impact stats grow, then export a shareable snapshot and a one-page proposal for community meetings.

## Why

Reclaim is an advocacy tool tied to **[PARK(ing) Day](https://en.wikipedia.org/wiki/PARK(ing)_Day)** — September 18, 2026 marks the 20th anniversary of the first parklet-in-a-parking-space — and is intended as a companion resource to the **[Parking Reform Network](https://parkingreform.org)**. Reclaiming space should feel joyful, not bureaucratic: the tone is deliberately warm, playful, Stardew-Valley-ish.

## Setup

```sh
npm install
npm run dev      # local dev server
npm test         # unit tests for the impact math (Vitest)
npm run build    # typecheck + production build
```

## How it works

- **1 grid cell = 1 foot.** All impact stats (sq ft reprogrammed, land-use breakdown, car spaces reclaimed at 160 sq ft per space) derive from real square footage, so the numbers stay defensible. The math lives in [`src/lib/impact.ts`](src/lib/impact.ts) (pure, unit-tested).
- **No backend.** Projects persist to localStorage ("My plots"), and the **Share** button encodes the full project into the URL hash (lz-string) so a link fully reconstructs a design.
- **Canvas** is react-konva: drag with 1-ft grid snapping, boundary enforcement, 90° rotation (R key or button), delete (Delete key or button), arrow-key nudging, soft collision warning (overlaps tint red), and a bouncy pop-in on placement (disabled under `prefers-reduced-motion`).
- **Exports:** high-res PNG snapshot of the plot, and a one-page HTML proposal (with print-to-PDF button) showing before/after, headline stats, the itemized element list, and cost ranges.

## Data-sourcing TODO (do before real advocacy use)

The cost/impact numbers are **placeholder planning-level ranges, not sourced**. Every element in [`src/data/elements.ts`](src/data/elements.ts) carries a `source` field currently marked as a placeholder; the in-app "How we estimate" page surfaces these so the numbers are transparent. See [`SOURCES.md`](SOURCES.md) for the verification checklist (NYC DOT parklet/streetery costs, ADU benchmarks, bus-shelter and bike-corral costs, etc.). The on-screen disclaimer — *planning-level estimates, not construction bids* — stays until that work is done.

## Stack

Vite · React 19 · TypeScript · Tailwind CSS 4 · Zustand · react-konva · lz-string · Vitest

## Not yet built

- Map backdrop (Leaflet + OSM tiles) to design over a real block — stretch goal from the spec, behind a toggle.
- Cited cost data (see above).
