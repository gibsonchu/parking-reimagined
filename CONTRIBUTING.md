# Contributing to Parking, Reimagined

Thanks for your interest in helping! This is a small, friendly, open-source project, and contributions of all sizes and kinds are welcome — from fixing a typo, to adding a real-world precedent, to forking the whole thing for your own city.

**You don't have to write code to contribute.** Suggesting a precedent, verifying a cost figure, flagging confusing copy, or sharing the tool with a community group are all real help. Open an [issue](https://github.com/gibsonchu/parking-reimagined/issues) or start a [discussion](https://github.com/gibsonchu/parking-reimagined/discussions).

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug or suggest an idea** — open an [issue](https://github.com/gibsonchu/parking-reimagined/issues).
- **Suggest content without coding** — use the "Content, data, or source" issue template to propose a precedent, element, or cost figure; we'll help get it in.
- **Ask a question or float a proposal** — start a [discussion](https://github.com/gibsonchu/parking-reimagined/discussions).
- **Improve the code, content, or data** — open a pull request (see below).

## Development setup

**Prerequisites:** Node.js 18+ and npm.

```sh
npm install
npm run dev      # local dev server
npm test         # unit tests (Vitest)
npm run build    # typecheck + production build
```

## How the data works

Almost everything meaningful on the site is **structured data** in `src/data/`, and one definition flows to every surface. Adding content usually means editing one of these files — not touching the UI. (See the "Architecture & data model" section of the [README](README.md#architecture--data-model).)

### Add a curb element

1. Add an entry to the `BANK` array in [`src/data/elements.ts`](src/data/elements.ts):
   ```ts
   {
     id: "rain-planter",              // unique, kebab-case
     name: "Rain planter",
     cat: "green",                    // "dining" | "green" | "transit" | "housing" | "civic"
     wFt: 3, lFt: 6,                  // footprint in feet (the grid draws & counts this)
     icon: "planter",                 // a sprite key (see step 2)
     cost: [800, 2500],               // [low, high] planning-level USD
     impact: "Greenery + stormwater", // short human-readable line
     source: PLACEHOLDER,             // a citation, or the shared placeholder until sourced
     planningArea: "As drawn",        // clearance note for the Methodology table
     costBasis: "Planter and soil",   // what the cost range covers
   }
   ```
   Optional capacity fields: `seats`, `bikes`, or `units`.
2. If it needs a **new icon**, add a `case` to the `spriteInner()` switch in [`src/lib/sprites.ts`](src/lib/sprites.ts) — a small 24×24 floor-plan-style SVG symbol keyed by your `icon` value.
3. Optionally add rich catalog detail (description, benefits, considerations, maintenance, precedents, funding, citations) to the `DETAILS` map in [`src/data/elementDetails.ts`](src/data/elementDetails.ts), keyed by the element `id`. If you skip this, sensible shared placeholders are used.

That one entry now appears automatically in the **Design tool**, the **Elements catalog**, the **impact math** (via its footprint), the printable **Workshop Kit** cut-outs, and the **exports** — no other wiring needed.

### Add a Library precedent

1. Add an entry to the `PRECEDENTS` array in [`src/data/precedents.ts`](src/data/precedents.ts):
   ```ts
   {
     id: "my-parklet",
     title: "Example Parklet",
     location: "City, State",
     year: "2024",
     category: "Seating",            // a LibraryCategory (Seating, Trees, Bike Parking, Dining,
                                     //   Rain Gardens, Loading, Accessibility, Transit, Play)
     shortDescription: "One line for the card.",
     longDescription: "A paragraph for the detail modal.",
     observations: ["What to notice", "…"],
     relatedElementIds: ["bench", "planter"], // ids from BANK
     estimatedCost: "$10,000–$40,000",
     sourceName: "Program name. Agency/Publisher, year.",
     sourceUrl: "https://…",
   }
   ```
2. For photos, put the file(s) in [`public/precedents/`](public/precedents/) and add either `image: "/precedents/my-parklet.jpg"` (single) or `images: [...]` (a gallery), plus a `credit: { author, license, href }`. Use **openly licensed** images (e.g. Wikimedia Commons — include the author and license) or images you have permission to share. No photo? Omit it — a placeholder shows.

### Add or update a source or cost figure

Numbers on this site should be **defensible**, not invented.

- Update the element's `cost` (`[low, high]`) and `source` in [`src/data/elements.ts`](src/data/elements.ts); keep ranges planning-level and describe what they cover in `costBasis`.
- Add the citation to that element's `citations` in [`src/data/elementDetails.ts`](src/data/elementDetails.ts) so it appears under "View sources" in the catalog.
- Record what you verified in [`SOURCES.md`](SOURCES.md).

## Pull request checklist

- [ ] `npm run build` passes (typecheck + build).
- [ ] `npm test` passes.
- [ ] New numbers, claims, or real-world examples are **accurate and sourced**.
- [ ] Images you add are **openly licensed or used with permission**, with attribution in `credit`.
- [ ] The change is small, focused, and matches the surrounding style.

## A note on tone and accuracy

Two things make this project trustworthy: a warm, non-bureaucratic voice, and numbers/examples that hold up. Please preserve both. When in doubt about a figure or source, open an issue to discuss before adding it.

Thank you for helping make public space a little more imaginable.
