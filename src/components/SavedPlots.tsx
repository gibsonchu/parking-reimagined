import { useEffect, useState } from "react";
import { deleteProject, listProjects, type SavedProject } from "../lib/storage";
import { useProject } from "../state/useProject";
import { C } from "../theme/palette";
import { PlotMini } from "./PlotThumb";

/** "My designs" — projects saved to this device's localStorage. */
export function SavedPlots() {
  const openProject = useProject((s) => s.openProject);
  const [saved, setSaved] = useState<SavedProject[]>([]);

  useEffect(() => setSaved(listProjects()), []);

  if (saved.length === 0) return null;

  return (
    <section className="mt-14">
      <h2 className="m-0 mb-1.5 text-2xl font-extrabold tracking-tight">My designs</h2>
      <p className="m-0 mb-4" style={{ color: C.inkSoft }}>
        Saved on this device.
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
        {saved.map((p) => (
          <div key={p.id} className="scale-card flex items-center gap-3">
            <button onClick={() => openProject(p)} className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left">
              <PlotMini p={p} />
              <span className="min-w-0">
                <span className="block truncate text-[15px] font-extrabold">{p.name.trim() || "Untitled design"}</span>
                <span className="text-xs font-semibold" style={{ color: C.inkSoft }}>
                  {p.items.length} elements · {new Date(p.updatedAt).toLocaleDateString()}
                </span>
              </span>
            </button>
            <button
              onClick={() => {
                deleteProject(p.id);
                setSaved(listProjects());
              }}
              className="wood-btn shrink-0"
              aria-label={`Delete ${p.name}`}
              title="Delete"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
