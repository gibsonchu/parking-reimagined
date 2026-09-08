import { useProject } from "../../state/useProject";
import { C } from "../../theme/palette";
import { SavedPlots } from "../SavedPlots";
import { ScalePicker } from "../ScalePicker";

/** Choose your space: pick a size to open the planner. Reached from "Start Designing". */
export function ChooseSpace() {
  const goTo = useProject((s) => s.goTo);

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-10 pb-16 sm:px-6">
      <h2 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight sm:text-[36px]">Choose your space</h2>
      <p className="m-0 mb-7 max-w-[600px] text-[15.5px] leading-relaxed" style={{ color: C.inkSoft }}>
        How much space are you designing? Pick a size to open the planner — you can rearrange everything, and resize
        the plan, once you're inside.
      </p>

      <ScalePicker />

      <p className="mt-7 mb-0 text-[14px]" style={{ color: C.inkSoft }}>
        Or start from a ready-made design over on{" "}
        <button onClick={() => goTo("templates")} className="cursor-pointer font-bold underline" style={{ color: C.leaf }}>
          Templates
        </button>
        .
      </p>

      <SavedPlots />
    </div>
  );
}
