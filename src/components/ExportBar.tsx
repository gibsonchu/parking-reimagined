import { useState } from "react";
import { download3DPng, has3DCanvas } from "../lib/export3d";
import { exportPlotPng } from "../lib/exportPng";
import { exportProposal } from "../lib/exportProposal";
import { saveProject } from "../lib/storage";
import { shareUrl } from "../lib/share";
import { useProject } from "../state/useProject";
import { C } from "../theme/palette";
import { PresentationModal } from "./PresentationModal";

/*
 * Sticky top bar of the editor: design title, "show cars" before/after
 * toggle, save, share-link, PNG snapshot and proposal export.
 */
export function ExportBar() {
  const project = useProject((s) => s.project);
  const setName = useProject((s) => s.setName);
  const backToStart = useProject((s) => s.backToStart);
  const showBefore = useProject((s) => s.showBefore);
  const setShowBefore = useProject((s) => s.setShowBefore);
  const markProjectSaved = useProject((s) => s.markProjectSaved);
  const [flash, setFlash] = useState<string | null>(null);
  const [presenting, setPresenting] = useState(false);

  const note = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 1800);
  };

  const onSave = () => {
    const saved = saveProject(project);
    markProjectSaved(saved.id);
    note("Saved to My plots");
  };

  const onShare = async () => {
    const url = shareUrl(project);
    history.replaceState(null, "", url);
    try {
      await navigator.clipboard.writeText(url);
      note("Link copied");
    } catch {
      note("Link is in the address bar");
    }
  };

  return (
    <div className="sticky top-0 z-10" style={{ borderBottom: `2px solid ${C.woodDark}`, background: C.creamPanel }}>
      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-2 px-4 py-2.5 sm:gap-3 sm:px-6">
        <button onClick={backToStart} className="wood-btn">
          ← New plot
        </button>
        <input
          value={project.name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Design title"
          placeholder="Title your new space"
          className="title-input min-w-[140px] flex-1 rounded px-3 py-1.5 text-[15px] font-bold outline-none focus-visible:ring-2 sm:max-w-[240px] sm:flex-none sm:basis-[190px]"
          style={{ border: `1px solid ${C.woodDark}`, background: C.white, color: C.ink }}
        />
        <div className="grow" />
        {flash && (
          <span className="note text-[13px]" style={{ color: C.leaf }} role="status">
            {flash}
          </span>
        )}
        <label className="flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold" style={{ color: C.inkSoft }}>
          <input type="checkbox" checked={showBefore} onChange={(e) => setShowBefore(e.target.checked)} /> Show cars
        </label>
        <button onClick={onSave} className="wood-btn">
          Save
        </button>
        <button onClick={onShare} className="wood-btn">
          Share
        </button>
        <button
          onClick={async () => {
            // in the 3D view, snapshot the 3D render; otherwise the 2D plan
            if (has3DCanvas()) {
              if (!download3DPng(project.name)) note("Nothing to snapshot yet");
              return;
            }
            if (!(await exportPlotPng(project.name))) note("Nothing to snapshot yet");
          }}
          className="wood-btn"
        >
          Snapshot
        </button>
        <button onClick={() => void exportProposal(project)} className="wood-btn">
          Download PDF
        </button>
        <button onClick={() => setPresenting(true)} className="sun-btn">
          Present
        </button>
      </div>
      {presenting && <PresentationModal onClose={() => setPresenting(false)} />}
    </div>
  );
}
