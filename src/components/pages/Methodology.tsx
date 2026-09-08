import type { ReactNode } from "react";
import { BANK } from "../../data/elements";
import { SPACE_SQFT } from "../../data/scales";
import { useProject } from "../../state/useProject";
import { C, CAT, money } from "../../theme/palette";
import { fmtArea, fmtDims, fmtLen } from "../../lib/units";

const UPDATED = "July 2026";
const DATA_VERSION = "1.0";

function P({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-[14.5px] leading-relaxed last:mb-0">{children}</p>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-0 mb-3 list-disc pl-5 text-[14.5px] leading-relaxed last:mb-0">
      {items.map((t, i) => (
        <li key={i} className="mb-1.5 last:mb-0">
          {t}
        </li>
      ))}
    </ul>
  );
}

function SubHead({ children }: { children: ReactNode }) {
  return (
    <h4 className="mt-5 mb-2 text-[15px] font-extrabold first:mt-0" style={{ color: C.ink }}>
      {children}
    </h4>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-5">
      <h3 className="m-0 mb-3 text-[19px] font-extrabold tracking-tight">{title}</h3>
      <div className="panel">{children}</div>
    </section>
  );
}

/** Methodology: how dimensions, capacities, costs and summaries are derived. */
export function Methodology() {
  const units = useProject((s) => s.units);
  return (
    <div className="mx-auto max-w-[860px] px-4 pt-10 pb-10 sm:px-6">
      <h2 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight sm:text-[36px]">Methodology</h2>
      <p className="m-0 mb-8 text-[15.5px] leading-relaxed" style={{ color: C.inkSoft }}>
        Parking, Reimagined is an early-stage visualization tool. This page explains how dimensions, capacities, costs,
        and design summaries are calculated.
      </p>

      <Section title="What the tool measures">
        <SubHead>Space and footprint</SubHead>
        <P>
          The planning canvas uses a one-foot grid. Each element is placed at a defined footprint, allowing the tool to
          calculate the amount and share of space occupied by different uses.
        </P>
        <P>
          A standard parking-space template is represented as {fmtDims(8, 20, units)}, or {fmtArea(SPACE_SQFT, units)}.
          Actual parking-space dimensions vary by city, street type, parking angle, accessibility requirements, and
          local design standards.
        </P>
        <P>There are two different measurements:</P>
        <Bullets
          items={[
            <>
              <b>Object footprint:</b> the physical size of the object
            </>,
            <>
              <b>Planning area:</b> the space needed to use it safely and comfortably
            </>,
          ]}
        />
        <P>For example, a table may be three feet wide, but the usable dining area also needs chairs and circulation.</P>

        <SubHead>Capacity</SubHead>
        <P>
          Capacity figures are based on typical manufacturer specifications, public design guidance, or practical use
          assumptions. This number is illustrative, as actual use depends on layout, accessibility, circulation,
          furniture selection, and local conditions. Examples include seats per table, bicycles per rack, or people
          accommodated by a gathering space.
        </P>

        <SubHead>Cost</SubHead>
        <P>
          Costs are shown as early planning ranges rather than quotes or construction budgets. Depending on the
          element, the range may represent equipment only, equipment plus typical installation, or a comparable public
          project.
        </P>
        <P>
          Freight, design, permitting, utility work, excavation, drainage, labor, maintenance, and local construction
          conditions are not included unless specifically stated.
        </P>
      </Section>

      <Section title="How the design summary works">
        <P>Below are definitions for the design summary provided on each design.</P>
        <Bullets
          items={[
            <>
              <b>Space programmed:</b> The tool adds the footprints of all placed elements and compares them with the
              total usable site area. Overlapping elements should not be counted twice.
            </>,
            <>
              <b>Land-use categories:</b> Each element is assigned to a primary category such as Seating, Nature,
              Mobility, Home, or Service. The land-use breakdown shows how much of the plan is allocated to each
              category.
            </>,
            <>
              <b>Benefits:</b> Benefit indicators describe the intended function of the selected elements. Unless
              otherwise stated, they are not modeled environmental or engineering outcomes.
            </>,
          ]}
        />
      </Section>

      <Section title="Estimated dimensions and pricing">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[12.5px]">
            <thead>
              <tr className="text-left" style={{ color: C.inkSoft }}>
                <th className="py-2 pr-3 font-bold">Element</th>
                <th className="py-2 pr-3 text-right font-bold">Object footprint</th>
                <th className="py-2 pr-3 text-right font-bold">Planning area</th>
                <th className="py-2 pr-3 text-right font-bold">Cost range</th>
                <th className="py-2 font-bold">Cost basis</th>
              </tr>
            </thead>
            <tbody>
              {BANK.map((b) => (
                <tr key={b.id} style={{ borderTop: `1px solid ${C.wood}` }}>
                  <td className="py-2 pr-3 font-bold whitespace-nowrap">
                    <span
                      className="mr-1.5 inline-block h-2 w-2 rounded-sm align-middle"
                      style={{ background: CAT[b.cat].color }}
                    />
                    {b.name}
                  </td>
                  <td className="tnum py-2 pr-3 text-right whitespace-nowrap">
                    {fmtDims(b.wFt, b.lFt, units)}
                  </td>
                  <td className="py-2 pr-3 text-right" style={{ color: C.inkSoft }}>
                    {b.planningArea}
                  </td>
                  <td className="tnum py-2 pr-3 text-right whitespace-nowrap">
                    {money(b.cost[0])}–{money(b.cost[1])}
                  </td>
                  <td className="py-2" style={{ color: C.inkSoft }}>
                    {b.costBasis}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 mb-0 text-[12.5px] leading-relaxed" style={{ color: C.inkSoft }}>
          Object footprints are the dimensions the tool draws and counts. Planning areas are described qualitatively
          because clearance figures have not yet been sourced for each element. All cost ranges shown here are
          currently representative figures pending public sourcing.
        </p>
      </Section>

      <Section title="What is not modeled">
        <P>Parking, Reimagined does not currently evaluate:</P>
        <Bullets
          items={[
            "Local zoning or permit eligibility",
            "Utility conflicts",
            "Drainage and stormwater engineering",
            "Structural loads",
            "Fire access",
            "Traffic operations or turning movements",
            "Accessibility compliance for the full site",
            "Emergency and commercial access",
            "Construction phasing",
            "Ongoing maintenance",
            "Site ownership or legal authority",
          ]}
        />
        <P>
          These conditions should be reviewed by the relevant professionals and public agencies before implementation.
        </P>
      </Section>

      <Section title="Assumptions and versioning">
        <P>Current assumptions:</P>
        <Bullets
          items={[
            `Default parking space: ${fmtDims(8, 20, units)}`,
            `Grid scale: 1 cell = ${fmtLen(1, units)}`,
            "Geography: United States unless otherwise noted",
            "Currency: U.S. dollars",
            "Cost year: 2026 dollars",
            "Costs: before tax, unless otherwise stated",
            "Site conditions: assumed level and unobstructed",
            "Estimates: rounded to avoid false precision",
          ]}
        />
        <P>
          Some elements rely on conceptual or representative figures while additional public sources are reviewed.
          These entries are clearly marked in the source table.
        </P>
        <div
          className="mt-4 pt-3 text-[12.5px] font-semibold"
          style={{ borderTop: `1px solid ${C.wood}`, color: C.inkSoft }}
        >
          Methodology last updated: {UPDATED}
          <br />
          Data version: {DATA_VERSION}
        </div>
      </Section>
    </div>
  );
}
