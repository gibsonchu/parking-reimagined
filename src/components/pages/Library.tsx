import { useState } from "react";
import {
  LIBRARY_CATEGORIES,
  filterPrecedents,
  type LibraryFilter,
  type Precedent,
} from "../../data/precedents";
import { C } from "../../theme/palette";
import { PhotoFrame } from "../PhotoFrame";
import { LibraryPrecedentModal } from "../LibraryPrecedentModal";

const FILTERS: LibraryFilter[] = ["All", ...LIBRARY_CATEGORIES];

/**
 * Library: a visual, browsable gallery of real-world precedents — "what could
 * this actually look like?" Distinct from Elements ("what can fit here?").
 * Precedent copy and figures are real and sourced; images are blank
 * placeholders until licensed photography is added (see src/data/precedents.ts).
 */
export function Library() {
  const [filter, setFilter] = useState<LibraryFilter>("All");
  const [selected, setSelected] = useState<Precedent | null>(null);
  const visible = filterPrecedents(filter);

  return (
    <div className="mx-auto max-w-[1180px] px-4 pt-10 pb-16 sm:px-6">
      {/* ── Header ── */}
      <h1 className="m-0 text-[30px] font-extrabold tracking-tight sm:text-[38px]">Library</h1>

      {/* ── Category filters ── */}
      <div className="mt-6 flex flex-wrap gap-1.5" role="group" aria-label="Filter examples by category">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className="cursor-pointer rounded-full px-3 py-1.5 text-[13px] font-semibold transition-colors"
              style={{
                border: `1px solid ${active ? C.woodDark : C.wood}`,
                background: active ? C.ink : C.white,
                color: active ? "#fff" : C.inkSoft,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* ── Visual grid ── */}
      {visible.length === 0 ? (
        <div
          className="mt-8 rounded-md px-6 py-14 text-center"
          style={{ border: `1px dashed ${C.wood}`, background: C.grass }}
        >
          <div className="text-[15px] font-extrabold" style={{ color: C.ink }}>
            No examples in this category yet.
          </div>
          <div className="mt-1 text-[13.5px]" style={{ color: C.inkSoft }}>
            More Library examples will be added soon.
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {visible.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={(e) => {
                e.currentTarget.focus();
                setSelected(p);
              }}
              aria-haspopup="dialog"
              aria-label={`${p.title} — view example`}
              className="element-card group flex flex-col overflow-hidden rounded-md border border-rule bg-white text-left shadow-sm"
            >
              <PhotoFrame src={p.image ?? p.images?.[0]} alt={p.title} aspect="4 / 3" border="bottom" />
              <div className="flex flex-1 flex-col p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-[14px] font-extrabold">{p.title}</div>
                    <div className="truncate text-[12px] font-semibold" style={{ color: C.inkSoft }}>
                      {p.location}
                    </div>
                  </div>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
                    style={{ color: C.inkSoft }}
                  >
                    <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span
                  className="mt-2 inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] uppercase"
                  style={{ background: C.sky, color: C.inkSoft, border: `1px solid ${C.wood}` }}
                >
                  {p.category}
                </span>
                <p className="mt-1.5 mb-0 text-[12px] leading-snug" style={{ color: C.inkSoft }}>
                  {p.shortDescription}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && <LibraryPrecedentModal precedent={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
