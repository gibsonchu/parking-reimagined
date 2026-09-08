import { useState, type ReactNode } from "react";
import { C } from "../../theme/palette";
import { Accordion } from "../Accordion";

function P({ children }: { children: ReactNode }) {
  return <p className="mb-3 last:mb-0">{children}</p>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mt-0 mb-3 list-disc pl-5">
      {items.map((t, i) => (
        <li key={i} className="mb-1 last:mb-0">
          {t}
        </li>
      ))}
    </ul>
  );
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="font-bold underline" style={{ color: C.leaf }}>
      {children}
    </a>
  );
}

/*
 * The origin illustration. TO ADD IT: save the graphic as
 * `public/images/parking-comparison.png`. Until that file exists a labelled
 * placeholder is shown in its place.
 */
function OriginFigure() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="mt-4 mb-0">
      {failed ? (
        <div
          className="checker flex items-center justify-center px-6 py-12 text-center"
          style={{ background: C.grass, backgroundSize: "24px 24px", border: `1px solid ${C.woodDark}`, borderRadius: 4 }}
        >
          <span className="text-[13px]" style={{ color: C.inkSoft }}>
            Add <b>public/images/parking-comparison.png</b> — the original illustration
          </span>
        </div>
      ) : (
        <img
          src="/images/parking-comparison.png"
          alt="Alternative uses for parking spaces: two parking spots compared with a studio apartment, an outdoor dining space, and a transit stop, each 520 square feet."
          onError={() => setFailed(true)}
          className="w-full"
          style={{ border: `1px solid ${C.wood}`, borderRadius: 4 }}
        />
      )}
      <figcaption className="mt-2 text-[12.5px] leading-snug" style={{ color: C.inkSoft }}>
        The original illustration that inspired Parking, Reimagined. Created for “Parking the Problem: NYC’s Missed
        Chance to Move Forward.”
      </figcaption>
    </figure>
  );
}

/** About: what the tool is, who it's for, and where it came from. */
export function About() {
  return (
    <div className="mx-auto max-w-[820px] px-4 pt-10 pb-10 sm:px-6">
      <h2 className="m-0 mb-1.5 text-[30px] font-extrabold tracking-tight sm:text-[36px]">About</h2>
      <p className="m-0 mb-8 text-[15.5px] leading-relaxed" style={{ color: C.inkSoft }}>
        Parking, Reimagined is a simple design tool for exploring alternative uses for parking and curb space. Choose a
        site, arrange scaled elements, and create a visual proposal showing what else could fit — from seating and
        greenery to bike parking, loading space, public art, and community amenities.
      </p>

      <Accordion title="What this tool helps you do">
        <P>
          Parking debates can feel abstract. It is easier to have a productive conversation when people can see an
          alternative rather than only imagine one.
        </P>
        <P>Parking, Reimagined lets you:</P>
        <Bullets
          items={[
            "Test ideas on a scaled plan",
            "See how much space different elements require",
            "Compare parking with other possible uses",
            "Create a visual for meetings, workshops, or public discussions",
            "Export and share an early-stage concept",
          ]}
        />
        <P>
          Designs created with this tool are intended to communicate ideas, but not to serve as construction drawings,
          engineering plans, or permit applications. Dimensions, accessibility requirements, utilities, drainage,
          structural considerations, local regulations, and site conditions vary from place to place and should always
          be reviewed before implementation.
        </P>
        <P>
          Cost estimates, footprints, and capacities are representative planning values based on publicly available
          guidance and manufacturer specifications where possible. They are intended to support early conversations,
          not final budgeting.
        </P>
      </Accordion>

      <Accordion title="Who this tool is for">
        <P>Parking, Reimagined is designed for:</P>
        <Bullets
          items={[
            "Residents preparing for a neighborhood or community-board meeting",
            "Advocates illustrating a proposed parking reform",
            "Businesses considering a parklet, bike corral, or loading area",
            "Students and educators studying streets and public space",
            "Planners and designers facilitating early community conversations",
            <>
              <Link href="https://www.myparkingday.org/">PARK(ing) Day</Link> participants creating temporary
              installations
            </>,
          ]}
        />
        <P>You do not need planning or design experience.</P>
        <P>
          The tool is intended to make an early idea easier to understand, revise, and discuss, supporting early-stage
          planning and community conversations. It is not a substitute for professional design, engineering,
          permitting, or construction documentation.
        </P>
      </Accordion>

      <Accordion title="How can I use this tool">
        <P>
          Start by choosing one parking space, several spaces, a curb segment, or a small lot. You can then place and
          rearrange elements, review the approximate space used, and compare the existing condition with your proposal.
        </P>
        <P>When you are finished, you can:</P>
        <Bullets
          items={[
            "Save the design to your device",
            "Share a link containing the plan",
            "Export an image",
            "Generate a one-page proposal for printing or presentation",
          ]}
        />
        <P>
          Because dimensions, costs, regulations, accessibility requirements, utilities, and permits vary by location,
          every design should be treated as a planning-level concept that requires further local review.
        </P>
      </Accordion>

      <Accordion title="Why curb space matters">
        <P>
          The curb is a limited public resource. Along a single block, it may need to support all sorts of things
          including parking, deliveries, passenger pickup, accessible access, transit, bike parking, dining, trees,
          stormwater infrastructure, and public gathering space. Curb management is fundamentally about deciding how
          that limited space should be allocated among competing needs.
        </P>
        <P>
          Parking is one valid use, but it is not the only one. A curbside space can also become a parklet, bike
          corral, rain garden, loading area, seating zone, or other neighborhood amenity.{" "}
          <Link href="https://nacto.org/publication/urban-street-design-guide/interim-design-strategies/parklets/">
            NACTO describes parklets
          </Link>
          , for example, as conversions of curbside parking spaces into public community space.
        </P>
        <P>
          Across the United States, the total parking supply is estimated at roughly three to eight spaces for every
          registered vehicle. Parking requirements can also add construction costs, consume land, and produce more
          parking than some developments actually need.
        </P>
        <P>
          For more information, check out <Link href="https://parkingreform.org/">Parking Reform Network</Link>, an
          incredible resource guide for how to change parking regulation in your city.
        </P>
        <P>
          This tool does not assume that every parking space should disappear. It helps people compare different uses
          and discuss which use best serves a particular community.
        </P>
      </Accordion>

      <Accordion title="About the creator">
        <P>
          Parking, Reimagined was created by me, <Link href="https://gibsonchu.com/">Gibson Chu</Link>, a product
          manager and urban planner based in New York City. My work focuses on civic technology, public space,
          transportation, climate resilience, and the systems that shape how cities function. I research cities and
          public infrastructure through <Link href="https://www.inspacesstudio.com/">In Spaces</Link>.
        </P>
        <P>
          This website grew out of an essay I wrote about New York City’s parking mandates and the amount of
          urban space reserved for cars. While working on the piece, I created a visual comparing two parking spaces
          with other uses that could occupy roughly the same area—including a small apartment, outdoor dining, and a
          transit stop.
        </P>
        <P>
          The graphic made the argument easier to understand, but it also raised a bigger question: what if people
          could create these comparisons themselves?
        </P>
        <P>
          I built Parking, Reimagined to turn that static illustration into an interactive tool. Instead of only
          reading about alternative uses for parking, anyone can arrange scaled elements, test what fits, and create a
          proposal for their own block. The original essay,{" "}
          <Link href="https://www.inspacesstudio.com/p/parking-the-problem-nycs-missed-chance">
            “Parking the Problem: NYC’s Missed Chance to Move Forward,”
          </Link>{" "}
          explored how parking mandates consume land that could instead support housing, businesses, transit, green
          infrastructure, and public space.
        </P>
        <OriginFigure />
        {/* sits below the figure caption, so it needs its own top margin */}
        <p className="mt-5 mb-0">
          Feel free to reach out to me for more information at{" "}
          <Link href="https://x.com/gibsontchu">@gibsontchu</Link>.
        </p>
      </Accordion>
    </div>
  );
}
