# Precedent photos — status

**Every Library precedent now has a photo.** The earlier "still needs a photo"
list is empty. Images live in `public/precedents/<id>-N.jpg` and are wired via
the `image` / `images` + `credit` fields in `src/data/precedents.ts` (and the
shared `P_*` constants in `src/data/elementDetails.ts`).

## Photo sets added (multi-image galleries)
- **Ottawa's First Parking Day** (4) — courtesy Strong Towns Ottawa
- **Parking Day in Adams Morgan** (2) — courtesy Mike Kwan / Parking Reform Network
- **People St Parklets** (4) — Los Angeles DOT (People St); clarified as a *citywide program*, photos from several locations
- **Old Pasadena On-Street Dining** (3) — City of Pasadena (2020 On-Street Dining Update); new card, separate from the 1993 "Old Pasadena Streetscape"
- **On-Street Bike Corrals**, Portland (2) — City of Portland (PBOT)
- **SW 12th Avenue Green Street** (2) — City of Portland, via ASLA
- **Street Edge Alternatives (SEA)** (2) — Seattle Public Utilities, via NACTO
- **Clean Curbs / Containerized Waste** (2) — NYC Sanitation, via Streetsblog; noted the citywide expansion
- **Vision Zero Daylighting**, Hoboken (2) — City of Hoboken, via Curbed
- **Transit Bulb-Outs & Boarding Islands**, SF (2) — SFMTA

## Single-photo precedents (from earlier, Wikimedia Commons, CC-licensed)
Pearl Street Triangle · Pavement to Parks · Shared Spaces · Open Restaurants ·
PARK(ing) Day · Times Square Plaza · Old Pasadena Streetscape · The Better Block ·
Better Bus Stops.

## Removed from the Library
- MillionTreesNYC
- People St Bike Corrals
- Neighborhood Loading Zones (NYC)
- Curb Extensions & Pedestrian Islands (NYC)

## Provenance / credit note
The newer sets come from the sources the site owner supplied (city/agency pages,
NACTO, ASLA, Streetsblog, Curbed, and event organizers). Each carries a credit
line naming the organization and linking the source, per the owner's direction —
these are not all Creative-Commons licensed the way the Wikimedia set is. If any
should be swapped for a differently-licensed image or a specific photographer
credit, replace the file in `public/precedents/` and update the `credit` in
`src/data/precedents.ts`.
