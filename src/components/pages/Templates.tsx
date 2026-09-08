import { useProject } from "../../state/useProject";
import { C } from "../../theme/palette";
import { TemplateGallery } from "../TemplateGallery";

/** Templates: ready-made designs to open and rearrange. */
export function Templates() {
  const goTo = useProject((s) => s.goTo);

  return (
    <div className="mx-auto max-w-[1080px] px-4 pt-10 pb-16 sm:px-6">
      <h2 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight sm:text-[36px]">Templates</h2>
      <p className="m-0 mb-7 text-[15.5px] leading-relaxed" style={{ color: C.inkSoft }}>
        Ready-made designs drawn to real dimensions. Open one to rearrange it, swap elements, or resize the plan.
      </p>

      <TemplateGallery />

      <p className="mt-8 mb-0 text-[14px]" style={{ color: C.inkSoft }}>
        Prefer to start from scratch?{" "}
        <button onClick={() => goTo("choose")} className="cursor-pointer font-bold underline" style={{ color: C.leaf }}>
          Choose a blank space
        </button>
        , or run it in person with the{" "}
        <button onClick={() => goTo("workshop")} className="cursor-pointer font-bold underline" style={{ color: C.leaf }}>
          Workshop Kit
        </button>
        .
      </p>
    </div>
  );
}
