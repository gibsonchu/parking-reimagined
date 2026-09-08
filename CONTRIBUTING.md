# Contributing to Parking, Reimagined

Thanks for your interest in helping! This is a small, friendly, open-source project, and contributions of all sizes are welcome — from fixing a typo to adding a whole new Library precedent.

By participating, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug or suggest an idea** — open an [issue](https://github.com/gibsonchu/parking-reimagined/issues).
- **Ask a question or float a proposal** — start a [discussion](https://github.com/gibsonchu/parking-reimagined/discussions).
- **Improve the code, content, or data** — open a pull request (see below).

### High-value contributions

- **Add a real-world precedent** to the Library — a parklet, plaza, green street, bike corral, etc. Add it to `src/data/precedents.ts` with a `sourceName` + `sourceUrl`, and an image in `public/precedents/` that is either openly licensed (include the author and license in `credit`) or one you have permission to use.
- **Replace a placeholder cost range with a cited figure** — update the element in `src/data/elements.ts` and record the citation in [`SOURCES.md`](SOURCES.md). Numbers on this site should be defensible.
- **Improve accessibility** — keyboard navigation, screen-reader labels, color contrast, reduced-motion.
- **Internationalization** or adapting the **Take Action** guide to a specific city.

## Development setup

**Prerequisites:** Node.js 18+ and npm.

```sh
npm install
npm run dev      # local dev server
npm test         # unit tests (Vitest)
npm run build    # typecheck + production build
```

## Pull request checklist

Before opening a PR, please make sure:

- [ ] `npm run build` passes (this typechecks and builds).
- [ ] `npm test` passes.
- [ ] New content is **accurate and sourced** — especially numbers and real-world claims. Don't invent costs, statistics, or projects.
- [ ] Images you add are **openly licensed or used with permission**, with attribution in the `credit` field.
- [ ] The change matches the existing style — small, focused commits and the surrounding code's conventions.

## A note on tone and accuracy

Two things make this project trustworthy: a warm, non-bureaucratic voice, and numbers/examples that hold up. Please preserve both. When in doubt about a figure or a source, open an issue to discuss before adding it.

Thank you for helping make public space a little more imaginable.
