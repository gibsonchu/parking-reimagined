import { useEffect } from "react";
import { Editor } from "./components/Editor";
import { Footer } from "./components/Footer";
import { About } from "./components/pages/About";
import { ChooseSpace } from "./components/pages/ChooseSpace";
import { Elements } from "./components/pages/Elements";
import { Home } from "./components/pages/Home";
import { Library } from "./components/pages/Library";
import { Methodology } from "./components/pages/Methodology";
import { TakeAction } from "./components/pages/TakeAction";
import { Templates } from "./components/pages/Templates";
import { Workshop } from "./components/pages/Workshop";
import { decodeShareHash } from "./lib/share";
import { useProject, type Page } from "./state/useProject";
import { C, FONT } from "./theme/palette";

const NAV: { id: Page; label: string }[] = [
  { id: "design", label: "Design" },
  { id: "templates", label: "Templates" },
  { id: "elements", label: "Elements" },
  { id: "library", label: "Library" },
  { id: "action", label: "Take Action" },
  { id: "methodology", label: "Methodology" },
  { id: "about", label: "About" },
];

function UnitsToggle() {
  const units = useProject((s) => s.units);
  const setUnits = useProject((s) => s.setUnits);
  const opts: { id: "imperial" | "metric"; label: string }[] = [
    { id: "imperial", label: "ft" },
    { id: "metric", label: "m" },
  ];
  return (
    <div
      className="flex overflow-hidden rounded-[5px]"
      style={{ border: `1px solid ${C.woodDark}` }}
      role="group"
      aria-label="Measurement units"
    >
      {opts.map((o) => {
        const active = units === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setUnits(o.id)}
            aria-pressed={active}
            className="cursor-pointer px-2.5 py-1 text-[12.5px] font-bold transition-colors"
            style={{
              background: active ? C.ink : "transparent",
              color: active ? "#fff" : C.inkSoft,
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Header() {
  const page = useProject((s) => s.page);
  const stage = useProject((s) => s.stage);
  const goTo = useProject((s) => s.goTo);

  return (
    <header style={{ borderBottom: `2px solid ${C.woodDark}`, background: C.white }}>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3.5 sm:px-6">
        <button
          onClick={() => goTo("design")}
          className="flex cursor-pointer items-center gap-3 text-left"
          aria-label="Parking, Reimagined — home"
        >
          {/* plan-view mark: a plot divided into two stalls */}
          <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
            <rect x="2.5" y="2.5" width="19" height="19" fill={C.grass} stroke={C.woodDark} strokeWidth="1.8" />
            <line x1="12" y1="2.5" x2="12" y2="21.5" stroke={C.woodDark} strokeWidth="1.4" />
          </svg>
          <h1 className="m-0 text-[21px] leading-none font-extrabold tracking-tight" style={{ color: C.ink }}>
            Parking, Reimagined
          </h1>
        </button>

        <nav className="ml-auto flex flex-wrap items-center gap-1" aria-label="Main">
          {NAV.map((n) => {
            // the space picker is part of the Design flow, so Design stays lit there
            const active = (page === n.id || (n.id === "design" && page === "choose")) && stage !== "edit";
            return (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                aria-current={active ? "page" : undefined}
                className="cursor-pointer rounded-[4px] px-3 py-1.5 text-[13.5px] font-semibold transition-colors"
                style={{
                  color: active ? C.ink : C.inkSoft,
                  background: active ? C.sky : "transparent",
                  boxShadow: active ? `inset 0 -2px 0 ${C.leaf}` : "none",
                }}
              >
                {n.label}
              </button>
            );
          })}
          <span className="ml-1.5">
            <UnitsToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}

function CurrentPage() {
  const page = useProject((s) => s.page);
  switch (page) {
    case "choose":
      return <ChooseSpace />;
    case "templates":
      return <Templates />;
    case "elements":
      return <Elements />;
    case "library":
      return <Library />;
    case "action":
      return <TakeAction />;
    case "workshop":
      return <Workshop />;
    case "methodology":
      return <Methodology />;
    case "about":
      return <About />;
    default:
      return <Home />;
  }
}

export default function App() {
  const stage = useProject((s) => s.stage);
  const page = useProject((s) => s.page);
  const openProject = useProject((s) => s.openProject);

  // A share link fully reconstructs a design: decode the URL hash on load.
  useEffect(() => {
    const shared = decodeShareHash(location.hash);
    if (shared) openProject(shared);
  }, [openProject]);

  // land at the top when switching pages
  useEffect(() => {
    if (stage !== "edit") window.scrollTo({ top: 0 });
  }, [page, stage]);

  // The landing page is a single screen: lock it to the viewport on desktop so
  // it never scrolls. Narrow screens still scroll, since a hero plus a 16:9
  // visual cannot honestly fit on a phone.
  const isLanding = stage !== "edit" && page === "design";

  return (
    <div
      className={`dots flex flex-col ${isLanding ? "min-h-screen lg:h-screen lg:overflow-hidden" : "min-h-screen"}`}
      style={{ fontFamily: FONT, color: C.ink }}
    >
      <Header />
      <main className={isLanding ? "flex-1 lg:min-h-0" : ""}>
        {stage === "edit" ? <Editor /> : <CurrentPage />}
      </main>
      {/* omitted on the landing page, which is locked to one screen, and in the
          editor, which carries its own estimate disclaimer beside the stats */}
      {!isLanding && stage !== "edit" && <Footer />}
    </div>
  );
}
