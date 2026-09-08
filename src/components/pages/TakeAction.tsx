import type { ReactNode } from "react";
import {
  ACTION_STEPS,
  CITY_GUIDES,
  DECISION_MAKERS,
  FUNDING_METHODS,
  IMPLEMENTATION_CHECKLIST,
  PROPOSAL_PREVIEW,
  STAKEHOLDERS,
  STAKEHOLDER_QUESTIONS,
  STREET_QUESTIONS,
  TEST_STAGES,
} from "../../data/actionSteps";
import { downloadActionChecklist } from "../../lib/actionChecklist";
import { useProject, type Page } from "../../state/useProject";
import { C } from "../../theme/palette";

const stepById = (id: string) => ACTION_STEPS.find((s) => s.id === id)!;

/* ── small shared building blocks (match the existing design system) ── */

function Callout({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "note" }) {
  const bg = tone === "note" ? C.grass : C.sky;
  return (
    <div className="rounded-md px-4 py-3 text-[13px] leading-relaxed" style={{ background: bg, border: `1px solid ${C.wood}`, color: C.ink }}>
      {children}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      className="rounded-full px-3 py-1 text-[12.5px] font-semibold"
      style={{ background: C.sky, color: C.ink, border: `1px solid ${C.wood}` }}
    >
      {children}
    </span>
  );
}

/** One numbered step in the vertical journey. */
function Step({ id, children }: { id: string; children: ReactNode }) {
  const step = stepById(id);
  const last = step.number === ACTION_STEPS.length;
  return (
    <section aria-labelledby={`step-${id}`} className="flex gap-4 sm:gap-6">
      <div className="flex flex-col items-center">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold"
          style={{ background: C.ink, color: "#fff" }}
          aria-hidden="true"
        >
          {step.number}
        </span>
        {!last && <span className="mt-2 w-px flex-1" style={{ background: C.wood }} aria-hidden="true" />}
      </div>
      <div className="min-w-0 flex-1 pb-10">
        <h2 id={`step-${id}`} className="m-0 text-[20px] font-extrabold tracking-tight sm:text-[22px]">
          <span className="sr-only">Step {step.number}: </span>
          {step.title}
        </h2>
        <p className="mt-1 mb-4 text-[14.5px] leading-relaxed" style={{ color: C.inkSoft }}>
          {step.description}
        </p>
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 list-disc pl-5 text-[14px] leading-relaxed">
      {items.map((t) => (
        <li key={t} className="mb-1 last:mb-0">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Checklist with a square marker; text always carries the meaning (icons are decorative). */
function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="m-0 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-[14px] leading-snug">
          <span
            className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px]"
            style={{ border: `1.5px solid ${C.wood}` }}
            aria-hidden="true"
          />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function TakeAction() {
  const goTo = useProject((s) => s.goTo);
  const nav = (p: Page) => () => goTo(p);

  return (
    <div className="mx-auto max-w-[860px] px-4 pt-10 pb-16 sm:px-6">
      {/* ── Header ── */}
      <h1 className="m-0 text-[30px] font-extrabold tracking-tight sm:text-[38px]">Take Action</h1>
      <p className="m-0 mt-3 max-w-[640px] text-[15.5px] leading-relaxed" style={{ color: C.inkSoft }}>
        This is a guide to help you figure out how to take your newly designed parking spot into something real. This
        will vary on each state and city, but most require the same basic starting points.
      </p>

      {/* Workshop Kit entry point */}
      <div className="mt-4">
        <button
          onClick={nav("workshop")}
          className="element-card panel group flex w-full items-center justify-between gap-4 text-left"
        >
          <span>
            <span className="block text-[15px] font-extrabold">Workshop Kit</span>
            <span className="block text-[13px]" style={{ color: C.inkSoft }}>
              Print everything you need to run a Parking, Reimagined design exercise.
            </span>
          </span>
          <span className="sun-btn shrink-0">Open</span>
        </button>
      </div>

      {/* ── The 8-step journey ── */}
      <div className="mt-10">
        {/* Step 1 — Create your proposal */}
        <Step id="proposal">
          <BulletList items={stepById("proposal").actionItems ?? []} />
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button onClick={nav("choose")} className="sun-btn">
              Design a Space
            </button>
            <button onClick={nav("elements")} className="wood-btn">
              Browse Elements
            </button>
            <button onClick={nav("library")} className="wood-btn">
              Explore the Library
            </button>
          </div>
        </Step>

        {/* Step 2 — Understand the street */}
        <Step id="street">
          <div className="panel">
            <CheckList items={STREET_QUESTIONS} />
          </div>
          <div className="mt-3">
            <Callout tone="note">
              You do not need to answer every question before starting a conversation. These questions help identify the
              people and agencies who may need to be involved.
            </Callout>
          </div>
        </Step>

        {/* Step 3 — Talk to the people affected */}
        <Step id="people">
          <div className="flex flex-wrap gap-2">
            {STAKEHOLDERS.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
          <h3 className="mt-5 mb-2 text-[15px] font-extrabold" style={{ color: C.ink }}>
            Questions to ask
          </h3>
          <BulletList items={STAKEHOLDER_QUESTIONS} />
          <div className="mt-4">
            <button onClick={nav("workshop")} className="sun-btn">
              Run a Community Workshop
            </button>
          </div>
        </Step>

        {/* Step 4 — Find the decision-maker */}
        <Step id="decision">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {DECISION_MAKERS.map((d) => (
              <div key={d.id} className="panel">
                <div className="text-[14px] font-extrabold">{d.name}</div>
                <p className="mt-1 mb-0 text-[13px] leading-snug" style={{ color: C.inkSoft }}>
                  {d.description}
                </p>
              </div>
            ))}
          </div>
        </Step>

        {/* Step 5 — Build support */}
        <Step id="support">
          <p className="m-0 mb-4 text-[14px] leading-relaxed">
            A concise, one-page proposal makes it easy for neighbors, organizations, and officials to understand what
            you are asking for.
          </p>
          <div className="panel">
            <div className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: C.inkSoft }}>
              One-page proposal
            </div>
            <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {PROPOSAL_PREVIEW.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] font-bold tracking-[0.04em] uppercase" style={{ color: C.inkSoft }}>
                    {f.label}
                  </dt>
                  <dd className="m-0 text-[14px] font-semibold" style={{ color: C.ink }}>
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex items-center gap-2">
              <span
                className="inline-block cursor-not-allowed rounded-md px-3.5 py-2 text-[14px] font-bold opacity-70"
                style={{ background: C.wood, color: C.ink }}
                aria-disabled="true"
              >
                Create a Proposal
              </span>
              <span className="text-[12.5px] font-semibold" style={{ color: C.inkSoft }}>
                Coming soon
              </span>
            </div>
          </div>
        </Step>

        {/* Step 6 — Test the idea */}
        <Step id="test">
          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
            {TEST_STAGES.map((stage, i) => (
              <div key={stage.name} className="flex flex-1 items-center gap-2">
                <div className="panel flex-1">
                  <div className="text-[13.5px] font-extrabold">{stage.name}</div>
                  <p className="mt-1 mb-0 text-[12.5px] leading-snug" style={{ color: C.inkSoft }}>
                    {stage.description}
                  </p>
                </div>
                {i < TEST_STAGES.length - 1 && (
                  <span className="hidden shrink-0 text-[18px] font-bold sm:inline" style={{ color: C.inkSoft }} aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-[12px] font-semibold" style={{ color: C.inkSoft }} aria-hidden="true">
            Temporary → Pilot → Permanent
          </div>
        </Step>

        {/* Step 7 — Figure out who pays */}
        <Step id="funding">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {FUNDING_METHODS.map((f) => (
              <div key={f.id} className="panel">
                <div className="text-[14px] font-extrabold">{f.type}</div>
                <p className="mt-1 mb-2 text-[12.5px] leading-snug" style={{ color: C.inkSoft }}>
                  {f.description}
                </p>
                <div className="text-[11.5px] leading-relaxed">
                  <div>
                    <span className="font-bold" style={{ color: C.inkSoft }}>
                      Best suited for:{" "}
                    </span>
                    {f.bestFor}
                  </div>
                  <div>
                    <span className="font-bold" style={{ color: C.inkSoft }}>
                      Who may control it:{" "}
                    </span>
                    {f.controlledBy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Step>

        {/* Step 8 — Move toward implementation */}
        <Step id="implementation">
          <div className="panel">
            <CheckList items={IMPLEMENTATION_CHECKLIST} />
          </div>
          <div className="mt-4">
            <button onClick={downloadActionChecklist} className="sun-btn">
              Download Action Checklist
            </button>
          </div>
        </Step>
      </div>

      {/* ── Ready to take the next step? (own section) ── */}
      <section
        aria-labelledby="next-step"
        className="mt-8 rounded-md px-5 py-5"
        style={{ background: C.grass, border: `1px solid ${C.woodDark}` }}
      >
        <h2 id="next-step" className="m-0 text-[17px] font-extrabold">
          Ready to take the next step?
        </h2>
        <p className="mt-1 mb-4 text-[14px] leading-relaxed" style={{ color: C.inkSoft }}>
          You have the design, the precedents, and a sense of who to talk to. Package it into a one-page proposal and
          bring it to the people who can help make it real.
        </p>
        <div className="flex flex-wrap gap-2.5">
          <button onClick={nav("choose")} className="sun-btn">
            Start Your Design
          </button>
          <button onClick={nav("library")} className="wood-btn">
            Browse Library
          </button>
        </div>
      </section>

      {/* ── How does this work in my city? ── */}
      <section aria-labelledby="my-city" className="mt-6 border-t pt-10" style={{ borderColor: C.wood }}>
        <h2 id="my-city" className="m-0 text-[24px] font-extrabold tracking-tight sm:text-[28px]">
          How does this work in my city?
        </h2>
        <p className="m-0 mt-2 max-w-[640px] text-[14.5px] leading-relaxed" style={{ color: C.inkSoft }}>
          Local rules, agencies, funding programs, and approval processes vary significantly. Future versions of
          Parking, Reimagined will include city-specific guides.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CITY_GUIDES.map((city) => (
            <div key={city} className="panel flex flex-col gap-2">
              <div className="text-[14px] font-extrabold leading-snug">{city}</div>
              <span
                className="w-fit rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.06em] uppercase"
                style={{ background: C.sky, color: C.inkSoft, border: `1px solid ${C.wood}` }}
              >
                Coming soon
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── How this connects to the rest of the site ── */}
      <section aria-labelledby="connects" className="mt-12 border-t pt-8" style={{ borderColor: C.wood }}>
        <h2 id="connects" className="m-0 mb-3 text-[13px] font-bold tracking-[0.12em] uppercase" style={{ color: C.inkSoft }}>
          Keep exploring
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(
            [
              ["design", "Design", "What could I propose?"],
              ["elements", "Elements", "What can I put there?"],
              ["library", "Library", "What has this looked like elsewhere?"],
              ["methodology", "Methodology", "Where does this information come from?"],
            ] as [Page, string, string][]
          ).map(([page, label, q]) => (
            <button
              key={page}
              onClick={nav(page)}
              className="element-card panel group flex items-center justify-between gap-3 text-left"
            >
              <span>
                <span className="block text-[14px] font-extrabold">{label}</span>
                <span className="block text-[12.5px]" style={{ color: C.inkSoft }}>
                  {q}
                </span>
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 transition-transform duration-150 group-hover:translate-x-0.5" style={{ color: C.inkSoft }}>
                <path d="M9 6 L15 12 L9 18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
