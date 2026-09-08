<h1 align="center">Parking, Reimagined</h1>

<p align="center">
  <strong>Turn a parking space into something the community can enjoy.</strong><br>
  A free, open-source tool for redesigning curb and parking space — and making the case for it.
</p>

<p align="center">
  <a href="https://parking-reimagined.com"><img alt="Live site" src="https://img.shields.io/badge/live-parking--reimagined.com-1f7a3d"></a>
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-green.svg"></a>
  <a href="#tech-stack"><img alt="Built with Vite + React 19" src="https://img.shields.io/badge/built%20with-Vite%20%2B%20React%2019-646cff"></a>
  <a href="CODE_OF_CONDUCT.md"><img alt="Contributor Covenant" src="https://img.shields.io/badge/contributor%20covenant-2.1-blueviolet.svg"></a>
</p>

<p align="center">
  <a href="https://parking-reimagined.com"><strong>▶ Open the live app</strong></a>
</p>

---

Every on-street parking space is a small plot of public land — roughly **8 × 20 feet, about 160 square feet** — that we've agreed to use for storing one private car. **Parking, Reimagined** lets anyone explore what else that land could become: outdoor dining, a pocket park, bike parking, a bus shelter, a rain garden, a little home. Draw a design to real dimensions, watch the impact add up, learn from real-world precedents, and walk out with the materials to make the case in a community meeting.

It runs entirely in the browser, needs no account, and is **free to use, fork, and adapt** — see [**Get involved**](#get-involved).

## Table of Contents

- [About](#about)
- [What you can do](#what-you-can-do)
- [How it works](#how-it-works)
- [Architecture & data model](#architecture--data-model)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Data & sourcing](#data--sourcing)
- [Deployment](#deployment)
- [Get involved](#get-involved)
- [Roadmap](#roadmap)
- [Privacy](#privacy)
- [Tech stack](#tech-stack)
- [Related projects & acknowledgements](#related-projects--acknowledgements)
- [License](#license)

## About

Cities devote an enormous share of their most valuable public space to parking — by some estimates the United States has [several parking spaces for every car](https://www.fastcompany.com/90645900/america-has-eight-parking-spaces-for-every-car-heres-how-cities-are-rethinking-that-land). Reclaiming even one space can measurably change a block, but the idea is easy to dismiss and hard to picture. Advocates need a way to *show* the trade-off, ground it in real numbers, and turn a good idea into a real project.

Parking, Reimagined is that bridge. It pairs a joyful, top-down design tool with a researched library of what's already been built, a transparent methodology, and a practical guide for getting a project approved. The tone is deliberately warm and playful — reclaiming public space should feel inviting, not bureaucratic.

The project is a companion resource to the **[Parking Reform Network](https://parkingreform.org)** and is tied to **[PARK(ing) Day](https://www.myparkingday.org/)**, the global movement — begun in 2005 — of turning metered parking spaces into temporary public parks.

<sub>[↑ Back to top](#table-of-contents)</sub>

## What you can do

| | |
|---|---|
| 🎨 **Design** | Pick a space (one spot → a small lot), start from a template or a blank plot, and place elements from the catalog on a foot-accurate grid — drag, snap, rotate, and nudge, with live impact stats as you go. |
| 🧱 **Browse Elements** | A catalog of curb-space elements — café tables, trees, rain gardens, bike corrals, bus shelters, studio ADUs, parcel lockers, and more — each with dimensions, a planning-level cost range, benefits, maintenance notes, real-world precedents, and sources. |
| 🏙️ **Explore the Library** | A visual gallery of **real projects** — parklets, plazas, bike corrals, green streets, daylighting, containerized waste — each with photos, the elements it uses, an estimated cost, and a link to its source. |
| 📐 **Understand the Methodology** | A plain-language explanation of how every stat is calculated, so the numbers stay defensible. |
| 📣 **Take Action** | An eight-step guide from idea to real street project — understanding the street, finding the decision-maker, building support, testing with a pilot, and funding — plus a one-page **Action Checklist** PDF. |
| ✂️ **Run a Workshop** | A printable **Community Workshop Kit**: a scaled base board, cut-out element pieces at the same scale, instructions, facilitator prompts, and a reflection sheet for running a design exercise in person. |
| 📤 **Export & share** | A high-res PNG snapshot, a one-page proposal, a 16:9 presentation slide (PNG/PDF) for Slides/Keynote/PowerPoint, and a shareable link that encodes the whole design in the URL. |
| 📏 **Imperial or metric** | Toggle units site-wide; geometry is stored in feet and displayed either way. |

<sub>[↑ Back to top](#table-of-contents)</sub>

## How it works

- **1 grid cell = 1 foot.** Every statistic — square feet reimagined, land-use breakdown, and car spaces reclaimed (at 160 sq ft per space) — is derived from real footprints on a one-foot grid, not estimated. The math lives in [`src/lib/impact.ts`](src/lib/impact.ts) and is pure and unit-tested ([`impact.test.ts`](src/lib/impact.test.ts)).
- **No backend.** Designs persist to `localStorage`, and the **Share** button encodes the entire project into the URL hash (via `lz-string`), so a link fully reconstructs a design with nothing stored on a server.
- **Canvas.** Built on `react-konva`: one-foot grid snapping, boundary enforcement, 90° rotation, keyboard nudging and deletion, and a soft collision warning when elements overlap. Motion respects `prefers-reduced-motion`.
- **Exports** are generated client-side with `jsPDF` and canvas rasterization — no server round-trip.
- **One dataset, many views.** The element catalog, the design tool, the stats, the workshop, and the exports all read the same structured data — see [Architecture & data model](#architecture--data-model).

<sub>[↑ Back to top](#table-of-contents)</sub>

## Architecture & data model

Parking, Reimagined is **data-driven**: the substance of the site lives in a handful of typed datasets under [`src/data/`](src/data/), and the UI is a set of views over that data. Add or edit one record and it appears everywhere it's relevant — there's no second copy to keep in sync.

The core dataset is the **element catalog** ([`elements.ts`](src/data/elements.ts)). Each element is a single typed object — a footprint in feet, a category, a cost range, an icon, and optional capacity. From that one definition:

- the **Design tool** lists it in the toy box and draws it to scale on the one-foot grid;
- the **impact calculations** ([`impact.ts`](src/lib/impact.ts)) sum footprints into square feet reimagined, land-use breakdown, car spaces reclaimed, and cost — all from real geometry, and unit-tested;
- the **Elements Library** shows its dimensions and cost alongside its long-form content and sources ([`elementDetails.ts`](src/data/elementDetails.ts));
- the printable **Workshop Kit** produces a cut-out piece at the same scale as the board;
- and the **exports** (snapshot, proposal, presentation slide) read the same numbers, so the screen and the PDF never disagree.

The **Library of precedents** ([`precedents.ts`](src/data/precedents.ts)) follows the same pattern: real projects as structured records that link back to the elements they use.

```
src/data/elements.ts  ──►  Design tool ─► impact.ts (stats) ─► exports
     (one element)    ├─►  Elements Library (+ elementDetails.ts, sources)
                      └─►  Workshop Kit (scaled cut-outs)
src/data/precedents.ts ─►  Library gallery ──► links back to elements
```

Because everything is typed and file-based with no backend, the tool is straightforward to **fork and adapt** (see [Get involved](#get-involved)): edit the datasets and you have a version tuned to your own city, costs, and campaign.

<sub>[↑ Back to top](#table-of-contents)</sub>

## Project structure

```
src/
├── components/
│   ├── pages/           # Home, Design, Templates, Elements, Library,
│   │                    #   Methodology, Take Action, Workshop, About
│   ├── Editor / PlotCanvas / ToyBox / TownStats   # the design tool
│   ├── ElementDetailModal / LibraryPrecedentModal # detail views
│   ├── PresentationModal / WorkshopKitPrint        # export & print
│   └── ...
├── data/                # content datasets (the "source of truth")
│   ├── elements.ts      #   curb-space elements: size, cost, category
│   ├── elementDetails.ts#   long-form element content + citations
│   ├── precedents.ts    #   real-world Library projects + photo credits
│   ├── templates.ts · scales.ts · actionSteps.ts · workshop.ts
├── lib/
│   ├── impact.ts (+test)#   the stat math (pure, unit-tested)
│   ├── units.ts         #   imperial/metric conversion (feet is canonical)
│   ├── share.ts · storage.ts        # URL-hash sharing, localStorage
│   ├── sprites.ts       #   SVG floor-plan symbols for every element
│   └── export*.ts       #   PNG / proposal / presentation / checklist
├── state/useProject.ts  # Zustand store
└── theme/               # palette + design tokens
public/precedents/       # Library photography
```

<sub>[↑ Back to top](#table-of-contents)</sub>

## Getting started

**Prerequisites:** [Node.js](https://nodejs.org/) 18+ and npm.

```sh
git clone https://github.com/gibsonchu/parking-reimagined.git
cd parking-reimagined
npm install

npm run dev      # start the local dev server (Vite)
npm test         # run the impact-math unit tests (Vitest)
npm run build    # typecheck + production build
npm run preview  # preview the production build locally
```

<sub>[↑ Back to top](#table-of-contents)</sub>

## Data & sourcing

Transparency about numbers is a first-class goal of this project.

- **Library precedents are real and cited.** Every project in the Library is a documented real-world program or installation, with a source link and a photo credit. Photos are either openly licensed (Wikimedia Commons, with author + license) or provided courtesy of the organizers/agency, credited under each photo.
- **Element context is researched.** Each element's benefits, considerations, precedents, and "How cities can pay for it" notes are drawn from public research, with sources listed in the element's detail view.
- **Cost ranges are planning-level, not construction bids.** The dollar ranges attached to elements are intended for rough, apples-to-apples comparison, and the app shows a persistent disclaimer to that effect. The verification checklist for turning these into fully cited figures lives in [`SOURCES.md`](SOURCES.md).

**To add or correct a cited figure:** update the relevant entry in `src/data/elements.ts` (or `elementDetails.ts` / `precedents.ts`), add the citation, and note it in `SOURCES.md`. See [Get involved](#get-involved).

<sub>[↑ Back to top](#table-of-contents)</sub>

## Deployment

The app is a static single-page build deployed on [Vercel](https://vercel.com/) at **[parking-reimagined.com](https://parking-reimagined.com)**. The GitHub repository is connected to the Vercel project, so:

- a **push to `main`** ships to production, and
- **pull requests** get their own preview deployment.

<sub>[↑ Back to top](#table-of-contents)</sub>

## Get involved

**This project is meant to be built on, and it needs more than developers.** If you're a **planner, advocate, researcher, designer, educator, or community organizer**, your knowledge is exactly what makes the numbers and examples trustworthy — you're welcome here.

**No code required:**

- Suggest a **real-world precedent** for the Library, or a **curb element** that's missing.
- **Verify or correct a cost figure**, or add a citation (see [`SOURCES.md`](SOURCES.md)).
- Tell us what's **confusing, missing, or could be stronger** — copy, numbers, or design.
- **Use it and share it** — run a workshop, bring it to a city or neighborhood group, and tell us how it went.
- Contribute **openly-licensed photos** of real projects.

Just open an [issue](https://github.com/gibsonchu/parking-reimagined/issues) (there are templates for bugs, ideas, and content) or start a [discussion](https://github.com/gibsonchu/parking-reimagined/discussions).

**With code:** read [CONTRIBUTING.md](CONTRIBUTING.md) — it has step-by-step recipes for adding an element, a precedent, or a source — then open a pull request. All participation is covered by our [Code of Conduct](CODE_OF_CONDUCT.md).

### Fork it and make it yours

A core reason this is open source: **any organization or community should be able to fork Parking, Reimagined and adapt it to their place.** Swap in local elements and costs, add your own precedents, retheme it, or point the Take Action guide at your city's process. It's [MIT-licensed](LICENSE) and has no backend, so a fork is entirely yours to run and change. If you build something on it, we'd love to hear about it in the [discussions](https://github.com/gibsonchu/parking-reimagined/discussions).

<sub>[↑ Back to top](#table-of-contents)</sub>

## Roadmap

- **Cited cost data** — turn planning-level ranges into fully sourced figures (`SOURCES.md`).
- **Map backdrop** — design over a real block (Leaflet + OpenStreetMap), behind a toggle.
- **In-app proposal builder** — fill in and export a real one-page proposal (currently a preview).
- **Native slide export** — PowerPoint/Keynote (`.pptx`) in addition to PNG/PDF.
- **City-specific Take Action guides** — local agencies, processes, and funding programs.

<sub>[↑ Back to top](#table-of-contents)</sub>

## Privacy

Parking, Reimagined has no accounts, no analytics, and no server-side storage. Your designs live in your own browser (`localStorage`), and a shared link carries the design in the URL itself. Nothing you create is sent to or stored by the project.

<sub>[↑ Back to top](#table-of-contents)</sub>

## Tech stack

[Vite 6](https://vitejs.dev/) · [React 19](https://react.dev/) · [TypeScript](https://www.typescriptlang.org/) · [Tailwind CSS 4](https://tailwindcss.com/) · [Zustand](https://github.com/pmndrs/zustand) · [react-konva / Konva](https://konvajs.org/) · [jsPDF](https://github.com/parallax/jsPDF) · [lz-string](https://github.com/pieroxy/lz-string) · [Vitest](https://vitest.dev/)

<sub>[↑ Back to top](#table-of-contents)</sub>

## Related projects & acknowledgements

- **[Parking Reform Network](https://parkingreform.org)** — research and advocacy for parking reform.
- **[PARK(ing) Day](https://www.myparkingday.org/)** — the global movement this tool celebrates.
- **[Strong Towns](https://www.strongtowns.org/)** — community-led, incremental placemaking.
- **[Open Mobility Foundation — Curb Data Specification (CDS)](https://github.com/openmobilityfoundation/curb-data-specification)** — an open standard for describing and managing the curb as structured data. CDS is an inspiration for how this project thinks about the curb: as **public infrastructure that can be described in structured, shareable data**, not an afterthought. To be clear, Parking, Reimagined **does not currently implement CDS** — it's a design-and-advocacy tool, not a data interchange with city systems — but that shared premise (the curb as structured data) is why it's noted here, and CDS interoperability is an interesting future direction.
- The work of **Donald Shoup** (*The High Cost of Free Parking*) underpins much of the thinking here.

Created by [Gibson Chu](https://github.com/gibsonchu). This tool is educational and is not a substitute for professional engineering, planning, or legal advice.

<sub>[↑ Back to top](#table-of-contents)</sub>

## License

Released under the [MIT License](LICENSE). You are free to use, modify, and distribute it with attribution.
