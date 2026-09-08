import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { BankElement } from "../data/elements";
import { elementDetail } from "../data/elementDetails";
import { useProject } from "../state/useProject";
import { C, CAT, money } from "../theme/palette";
import { fmtArea, fmtDims } from "../lib/units";
import { useModalDialog } from "../lib/useModalDialog";
import { Accordion } from "./Accordion";
import { PhotoFrame, PhotoCreditLine } from "./PhotoFrame";
import { Sprite } from "./Sprite";

function Section({ title, children, prominent = false }: { title: string; children: ReactNode; prominent?: boolean }) {
  return (
    <section className="mt-7 first:mt-0">
      <h3
        className={`m-0 mb-3 font-extrabold tracking-tight ${prominent ? "text-[20px]" : "text-[16px]"}`}
        style={{ color: C.ink }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

/**
 * One reusable detail modal for every Elements-catalog card. Opens over the
 * Elements page (no routing), traps focus, and restores focus to the opener
 * on close. Card facts come from the element itself; long-form copy comes from
 * elementDetail() (see src/data/elementDetails.ts).
 */
export function ElementDetailModal({ element, onClose }: { element: BankElement; onClose: () => void }) {
  const units = useProject((s) => s.units);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const detail = elementDetail(element);
  const cat = CAT[element.cat];
  const area = element.wFt * element.lFt;

  useModalDialog(dialogRef, closeRef, onClose);

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
            {element.name}
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close element details"
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-[5px]"
            style={{ border: `1px solid ${C.woodDark}`, background: C.white }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6 L18 18 M18 6 L6 18" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          {/* ── Header: identity · dimensions · cost ── */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-md"
              style={{ background: cat.soft, border: `1px solid ${C.woodDark}` }}
            >
              <Sprite icon={element.icon} cat={element.cat} size={42} />
            </span>
            <div className="min-w-0">
              <span
                className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] uppercase"
                style={{ background: cat.soft, color: cat.deep, border: `1px solid ${cat.deep}33` }}
              >
                {cat.label}
              </span>
              <h2 id={titleId} className="m-0 mt-1.5 text-[26px] font-extrabold tracking-tight sm:text-[30px]">
                {element.name}
              </h2>
              <div className="mt-1 text-[14px] font-semibold" style={{ color: C.inkSoft }}>
                {fmtDims(element.wFt, element.lFt, units)} · {fmtArea(area, units)}
              </div>
              <div className="mt-0.5 text-[14px]" style={{ color: C.ink }}>
                {element.impact}
              </div>
              <div className="mt-3">
                <div className="text-[20px] font-extrabold" style={{ color: C.leaf }}>
                  {money(element.cost[0])}–{money(element.cost[1])}
                </div>
                <div className="text-[11px] font-semibold tracking-[0.04em] uppercase" style={{ color: C.inkSoft }}>
                  Planning-level estimate
                </div>
              </div>
            </div>
          </div>

          <div className="my-6 h-px" style={{ background: C.wood }} />

          {/* ── About ── */}
          <Section title="About this element">
            <p className="m-0 text-[14.5px] leading-relaxed">{detail.shortDescription}</p>
          </Section>

          {/* ── Real-world examples (visually prominent) ── */}
          <Section title="See it in the real world" prominent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {detail.precedents.map((p, i) => (
                <figure key={i} className="m-0 overflow-hidden rounded-md" style={{ border: `1px solid ${C.wood}` }}>
                  <PhotoFrame src={p.image} alt={p.title} border="bottom" />
                  <figcaption className="px-3 py-3">
                    <div className="text-[13.5px] font-extrabold leading-snug">{p.title}</div>
                    <div className="mt-0.5 text-[12px] font-semibold" style={{ color: C.inkSoft }}>
                      {p.place} · {p.year}
                    </div>
                    <div className="mt-0.5 text-[11.5px]" style={{ color: C.inkSoft }}>
                      Source: {p.source}
                    </div>
                    {p.credit && <PhotoCreditLine credit={p.credit} className="mt-1" />}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Section>

          {/* ── Benefits ── */}
          <Section title="Benefits">
            <div className="flex flex-wrap gap-2">
              {detail.benefits.map((b, i) => (
                <span
                  key={i}
                  className="rounded-full px-3 py-1 text-[12.5px] font-semibold"
                  style={{ background: C.sky, color: C.ink, border: `1px solid ${C.wood}` }}
                >
                  {b}
                </span>
              ))}
            </div>
          </Section>

          {/* ── Things to consider ── */}
          <Section title="Things to consider">
            <p className="m-0 text-[14.5px] leading-relaxed">{detail.considerations}</p>
          </Section>

          {/* ── Maintenance ── */}
          <Section title="Maintenance">
            <p className="m-0 text-[14.5px] leading-relaxed">{detail.maintenance}</p>
          </Section>

          {/* ── Funding ── */}
          <Section title="How cities can pay for it">
            <p className="m-0 mb-3 text-[14.5px] leading-relaxed">
              Curb-space projects are often funded by pooling several small sources rather than one big one. Common paths
              for this element:
            </p>
            <div className="flex flex-col gap-2">
              {detail.funding.map((f, i) => (
                <div
                  key={i}
                  className="rounded-md px-3.5 py-2.5 text-[13.5px] font-semibold"
                  style={{ background: C.white, border: `1px solid ${C.wood}` }}
                >
                  {f}
                </div>
              ))}
            </div>
          </Section>

          {/* ── Sources (quiet disclosure at the bottom) ── */}
          <div className="mt-8 text-[13px]">
            <Accordion title="View sources">
              <ol className="m-0 list-decimal pl-5 text-[12.5px] leading-relaxed" style={{ color: C.inkSoft }}>
                {detail.citations.map((c, i) => (
                  <li key={i} className="mb-1.5 last:mb-0">
                    <a href={c.href} className="underline" style={{ color: C.inkSoft }}>
                      {c.text}
                    </a>
                  </li>
                ))}
              </ol>
            </Accordion>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
