import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { byId } from "../data/elements";
import { PLACEHOLDER_COST, type Precedent } from "../data/precedents";
import { useProject } from "../state/useProject";
import { C } from "../theme/palette";
import { useModalDialog } from "../lib/useModalDialog";
import { PhotoFrame, PhotoCreditLine } from "./PhotoFrame";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-7">
      <h3 className="m-0 mb-3 text-[16px] font-extrabold tracking-tight" style={{ color: C.ink }}>
        {title}
      </h3>
      {children}
    </section>
  );
}

/**
 * One reusable detail modal for every Library precedent. Image-first, opens
 * over the Library page (no routing), traps focus, and restores focus to the
 * opener on close. Content is placeholder until real research is added.
 */
export function LibraryPrecedentModal({ precedent, onClose }: { precedent: Precedent; onClose: () => void }) {
  const openElementInCatalog = useProject((s) => s.openElementInCatalog);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useModalDialog(dialogRef, closeRef, onClose);

  const related = precedent.relatedElementIds.map((id) => byId(id)).filter((b): b is NonNullable<typeof b> => !!b);
  // a precedent may carry a single `image` or an `images` set; normalize to a list
  const gallery = precedent.images ?? (precedent.image ? [precedent.image] : []);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-stretch justify-center overflow-y-auto sm:items-start sm:p-6"
      style={{ background: "rgba(31,35,40,.5)" }}
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-[940px] flex-col overflow-hidden bg-white sm:my-auto sm:h-auto sm:max-h-[90vh] sm:rounded-lg"
        style={{ border: `1px solid ${C.woodDark}`, boxShadow: "0 16px 48px rgba(31,35,40,.28)", color: C.ink }}
      >
        {/* sticky bar keeps the close control reachable while the body scrolls */}
        <div
          className="flex shrink-0 items-center justify-between gap-4 px-5 py-3 sm:px-7"
          style={{ borderBottom: `1px solid ${C.wood}`, background: C.white }}
        >
          <span className="truncate text-[13px] font-bold tracking-[0.02em]" style={{ color: C.inkSoft }}>
            {precedent.title}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close example details"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[5px]"
            style={{ border: `1px solid ${C.woodDark}`, background: C.white }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          {/* ── Photo(s) first (dominant): a set shows a hero + thumbnail grid ── */}
          <PhotoFrame src={gallery[0]} alt={precedent.title} aspect="16 / 9" border="full" className="rounded-md" />
          {gallery.length > 1 && (
            <div className="mt-2 grid grid-cols-3 gap-2">
              {gallery.slice(1).map((src, i) => (
                <PhotoFrame key={src} src={src} alt={`${precedent.title} — photo ${i + 2}`} aspect="4 / 3" border="full" className="rounded-md" />
              ))}
            </div>
          )}
          {precedent.credit && <PhotoCreditLine credit={precedent.credit} className="mt-1.5" />}

          {/* ── Identity ── */}
          <div className="mt-5">
            <span
              className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] uppercase"
              style={{ background: C.sky, color: C.ink, border: `1px solid ${C.wood}` }}
            >
              {precedent.category}
            </span>
            <h2 id={titleId} className="m-0 mt-1.5 text-[26px] font-extrabold tracking-tight sm:text-[30px]">
              {precedent.title}
            </h2>
            <div className="mt-1 text-[14px] font-semibold" style={{ color: C.inkSoft }}>
              {precedent.location} · {precedent.year}
            </div>
          </div>

          <div className="my-6 h-px" style={{ background: C.wood }} />

          {/* ── About ── */}
          <Section title="About this example">
            <p className="m-0 text-[14.5px] leading-relaxed">{precedent.longDescription}</p>
          </Section>

          {/* ── What to notice ── */}
          <Section title="What to notice">
            <div className="flex flex-wrap gap-2">
              {precedent.observations.map((o, i) => (
                <span
                  key={i}
                  className="rounded-full px-3 py-1 text-[12.5px] font-semibold"
                  style={{ background: C.sky, color: C.ink, border: `1px solid ${C.wood}` }}
                >
                  {o}
                </span>
              ))}
            </div>
          </Section>

          {/* ── Elements used (links into the Elements catalog) ── */}
          {related.length > 0 && (
            <Section title="Elements used">
              <div className="flex flex-wrap gap-2">
                {related.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      onClose();
                      openElementInCatalog(b.id);
                    }}
                    className="flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-bold transition-colors hover:brightness-95"
                    style={{ background: C.white, color: C.ink, border: `1px solid ${C.woodDark}` }}
                  >
                    {b.name}
                    <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" style={{ color: C.inkSoft }}>
                      <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* ── Estimated cost ── */}
          <Section title="Estimated cost">
            <div className="text-[20px] font-extrabold" style={{ color: C.leaf }}>
              {precedent.estimatedCost ?? PLACEHOLDER_COST}
            </div>
            <div className="text-[11px] font-semibold tracking-[0.04em] uppercase" style={{ color: C.inkSoft }}>
              Planning-level estimate
            </div>
          </Section>

          {/* ── Source (quiet) ── */}
          <Section title="Source">
            <a href={precedent.sourceUrl} className="text-[13px] underline" style={{ color: C.inkSoft }}>
              {precedent.sourceName}
            </a>
          </Section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
