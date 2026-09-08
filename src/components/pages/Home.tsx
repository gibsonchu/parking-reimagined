import { useProject } from "../../state/useProject";
import { C } from "../../theme/palette";

/**
 * Landing page — a single centered screen, no scrolling on desktop. Everything
 * past the hero lives on its own page ("Choose your space", "Templates").
 */
export function Home() {
  const goTo = useProject((s) => s.goTo);

  return (
    <div className="mx-auto flex h-full max-w-[720px] items-center px-4 py-12 sm:px-6 lg:py-0">
      <section className="w-full text-center">
        <h2 className="m-0 text-[36px] leading-[1.08] font-extrabold tracking-tight sm:text-[48px]">
          Reimagine what a parking space could be.
        </h2>
        <p className="mx-auto mt-5 mb-0 max-w-[520px] text-[16px] leading-relaxed" style={{ color: C.inkSoft }}>
          Transform car parking into something that better serves the community.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={() => goTo("choose")} className="sun-btn px-5 py-2.5 text-[15px]">
            Start Designing
          </button>
          <button onClick={() => goTo("templates")} className="wood-btn px-5 py-2.5 text-[15px]">
            Browse Templates
          </button>
        </div>
      </section>
    </div>
  );
}
