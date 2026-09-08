import type { BankElement, ElementCitation, ElementPrecedent } from "./elements";

/*
 * Long-form detail for the Elements catalog modal.
 *
 * The card facts (name, icon, dimensions, cost, capacity) come straight from
 * the element in `BANK`. This module supplies the editorial content — a short
 * description, benefits, considerations, maintenance, real-world precedents,
 * funding paths, and sources — keyed by element id in `DETAILS` below.
 *
 * Figures here are drawn from public research and program reporting (cited in
 * `citations`). They are planning-level context, not engineering guidance.
 * An element with no `DETAILS` entry (or a missing field) falls back to the
 * shared placeholders, so new elements degrade gracefully.
 */

export interface ElementDetail {
  shortDescription: string;
  benefits: string[];
  considerations: string;
  maintenance: string;
  precedents: ElementPrecedent[];
  funding: string[];
  citations: ElementCitation[];
}

/* ── Reusable real-world precedents (referenced by several elements) ── */

const P_OPEN_RESTAURANTS: ElementPrecedent = {
  title: "Open Restaurants / Dining Out NYC",
  place: "New York City",
  year: "2020",
  source: "NYC DOT",
  image: "/precedents/nyc-open-restaurants.jpg",
  credit: { author: "Andre Carrotflower", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Alfresco_dining_at_blue_hour_on_Smith_Street,_Brooklyn,_New_York_-_20200906.jpg" },
};
const P_SHARED_SPACES: ElementPrecedent = {
  title: "Shared Spaces program",
  place: "San Francisco, CA",
  year: "2020",
  source: "SF Planning",
  image: "/precedents/sf-shared-spaces.jpg",
  credit: { author: "Mark Hogan", license: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:SFParklet.jpg" },
};
const P_PARKLET: ElementPrecedent = {
  title: "Pavement to Parks parklets",
  place: "San Francisco, CA",
  year: "2010",
  source: "SF Planning / Groundplay",
  image: "/precedents/sf-pavement-to-parks.jpg",
  credit: { author: "Kathleen Corey", license: "CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:1331_9th_Avenue_Parklet.jpg" },
};
const P_PEARL_PLAZA: ElementPrecedent = {
  title: "Pearl Street Triangle plaza",
  place: "Brooklyn, NY",
  year: "2007",
  source: "NYC DOT Plaza Program",
  image: "/precedents/pearl-street-triangle.jpg",
  credit: { author: "Wgreaves", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Pearl_Street_Triangle_in_DUMBO.jpg" },
};
const P_OLD_PASADENA: ElementPrecedent = {
  title: "Old Pasadena Streetscape",
  place: "Pasadena, CA",
  year: "1993",
  source: "City of Pasadena",
  image: "/precedents/old-pasadena-streetscape.jpg",
  credit: { author: "Ken Lund", license: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:Colorado_Boulevard,_Old_Pasadena,_Pasadena,_California_(14494697486).jpg" },
};
const P_GREEN_STREET: ElementPrecedent = {
  title: "SW 12th Avenue Green Street",
  place: "Portland, OR",
  year: "2005",
  source: "City of Portland",
  image: "/precedents/portland-green-street-1.jpg",
  credit: { author: "City of Portland", license: "via ASLA", href: "https://www.asla.org/focus-areas/climate-biodiversity-action/case-studies/climate-action-case-studies/sw-12th-avenue-green-street" },
};
const P_BIKE_CORRAL: ElementPrecedent = {
  title: "On-street bike corrals",
  place: "Portland, OR",
  year: "2004",
  source: "PBOT",
  image: "/precedents/portland-bike-corrals-1.jpg",
  credit: { author: "City of Portland (PBOT)", license: "Source", href: "https://www.portland.gov/transportation/walking-biking-transit-safety/apply-install-bike-racks-street" },
};
const P_HOBOKEN: ElementPrecedent = {
  title: "Vision Zero daylighting",
  place: "Hoboken, NJ",
  year: "2019",
  source: "City of Hoboken",
  image: "/precedents/hoboken-daylighting-1.jpg",
  credit: { author: "City of Hoboken", license: "via Curbed", href: "https://www.curbed.com/2022/06/hoboken-traffic-deaths-none-vision-zero-streets.html" },
};
const P_PARKING_DAY: ElementPrecedent = {
  title: "PARK(ing) Day",
  place: "Worldwide (from San Francisco)",
  year: "2005",
  source: "Rebar / myparkingday.org",
  image: "/precedents/parking-day.jpg",
  credit: { author: "Joe Mabel", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:PARK(ing)_Day_Seattle_2009_-_01.jpg" },
};
const P_LITTLE_LIBRARY: ElementPrecedent = {
  title: "Little Free Library network",
  place: "128 countries",
  year: "2009",
  source: "Little Free Library",
};

/* ── Reusable citations ── */

const C_PARKING_LAND: ElementCitation = {
  text: "“America has eight parking spaces for every car.” Fast Company, 2021.",
  href: "https://www.fastcompany.com/90645900/america-has-eight-parking-spaces-for-every-car-heres-how-cities-are-rethinking-that-land",
};
const C_OPEN_RESTAURANTS: ElementCitation = {
  text: "“Groundbreaking Report Details Economic Boost of Outdoor Dining.” NYC DOT, 2022.",
  href: "https://www.nyc.gov/html/dot/html/pr2022/outdoor-dining.shtml",
};
const C_SHARED_SPACES: ElementCitation = {
  text: "Shared Spaces Program. San Francisco Planning Department.",
  href: "https://sfplanning.org/shared-spaces",
};
const C_PARKLET_HISTORY: ElementCitation = {
  text: "“From one parking spot to 100 public parks.” Fast Company, 2022.",
  href: "https://www.fastcompany.com/90730521",
};
const C_TREE_VALUE: ElementCitation = {
  text: "“The Value of Urban Trees.” City of Golden Valley, MN (USDA Forest Service data).",
  href: "https://www.goldenvalleymn.gov/324/The-Value-of-Urban-Trees",
};
const C_TREE_COOLING: ElementCitation = {
  text: "“The Cooling Potential of Urban Trees.” World Resources Institute, 2022.",
  href: "https://www.wri.org/insights/urban-trees-cooling-potential",
};
const C_RAIN_GARDEN: ElementCitation = {
  text: "“Soak Up the Rain: Rain Gardens.” US EPA.",
  href: "https://www.epa.gov/soakuptherain/soak-rain-rain-gardens",
};
const C_GREEN_STREET: ElementCitation = {
  text: "“SW 12th Avenue Green Street Project.” ASLA / City of Portland.",
  href: "https://www.asla.org/awards/2006/06winners/341.html",
};
const C_BIKE_CORRAL: ElementCitation = {
  text: "“Portland upgraded 163 car spaces to create 1,644 bike spots.” Seattle Bike Blog, 2013.",
  href: "https://www.seattlebikeblog.com/2013/10/30/portland-has-upgraded-163-car-parking-spaces-to-create-1644-bike-spots/",
};
const C_BIKE_BUSINESS: ElementCitation = {
  text: "Bike Corrals: Local Business Impacts, Benefits, and Attitudes. NACTO.",
  href: "https://nacto.org/wp-content/uploads/bike_corrals_miesel.pdf",
};
const C_TRANSIT_WAIT: ElementCitation = {
  text: "“Transit shelters and amenities affect perceived wait times.” Univ. of Minnesota CTS, 2015.",
  href: "https://www.cts.umn.edu/publications/catalyst/2015/january/transit",
};
const C_ADU_COST: ElementCitation = {
  text: "“How Much Does It Cost to Build an ADU?” HomeGuide, 2026.",
  href: "https://homeguide.com/costs/adu-cost",
};
const C_LITTLE_LIBRARY: ElementCitation = {
  text: "“How many Little Free Libraries are there?” Little Free Library.",
  href: "https://littlefreelibrary.org/docs/how-many-little-free-libraries-are-there/",
};
const C_PACKAGE_THEFT: ElementCitation = {
  text: "“2025 Package Theft Annual Report.” Security.org.",
  href: "https://www.security.org/package-theft/annual-report/",
};
const C_DAYLIGHTING: ElementCitation = {
  text: "“Visibility / Sight Distance.” NACTO Urban Street Design Guide.",
  href: "https://nacto.org/publication/urban-street-design-guide/intersection-design-elements/visibility-sight-distance/",
};
const C_HOBOKEN: ElementCitation = {
  text: "“Hoboken reaches seven consecutive years without a traffic death.” City of Hoboken, 2024.",
  href: "https://www.hobokennj.gov/news/city-of-hoboken-reaches-new-vision-zero-milestone-seven-consecutive-years-without-a-traffic-death",
};
const C_PBD: ElementCitation = {
  text: "Parking Benefit Districts — A Guide for Activists. Parking Reform Network.",
  href: "https://parkingreform.org/playbook/pbd/",
};
const C_PLAZA: ElementCitation = {
  text: "Case Study: Plaza Program, New York City. Global Designing Cities Initiative.",
  href: "https://globaldesigningcities.org/publication/global-street-design-guide/streets/pedestrian-priority-spaces/pedestrian-plazas/case-study-plaza-program-new-york-city-usa/",
};
const C_STREET_VENDORS: ElementCitation = {
  text: "“First National Report on Street Vendors Highlights Their Economic Impact.” Institute for Justice.",
  href: "https://ij.org/press-release/first-national-report-on-street-vendors-highlights-their-economic-impact/",
};

/* Common funding menus, reused across similar elements. */
const FUND_DINING = ["Business Improvement District (BID)", "Merchant or restaurant contribution", "Parking meter revenue / parking benefit district"];
const FUND_GREEN = ["Stormwater utility or green-infrastructure funds", "Adopt-a-planter / adopt-a-tree program", "Grants and neighborhood matching funds"];
const FUND_TRANSIT = ["Transit agency capital budget", "Advertising or shelter concession revenue", "Federal / state transportation grants"];
const FUND_CIVIC = ["City capital or streetscape budget", "Business Improvement District (BID)", "Sponsorship, grants, or community fundraising"];

/* ── Per-element editorial content ── */

const DETAILS: Record<string, Partial<ElementDetail>> = {
  "cafe-table": {
    shortDescription:
      "A small café table turns a curbside parking space into a place to sit, eat, and linger. During the pandemic, cities discovered that a single 160-square-foot space holds enough tables to meaningfully expand a small restaurant's seating.",
    benefits: ["Expands small-business seating", "Draws foot traffic", "Fits one parking space", "Low-cost to start"],
    considerations:
      "Outdoor dining usually needs a permit, clear pedestrian access, and a plan for accessibility. Tables nearest moving traffic typically need a protective barrier.",
    maintenance: "Bring furniture in overnight or secure it; wipe down and sweep the space daily.",
    precedents: [P_OPEN_RESTAURANTS, P_SHARED_SPACES, P_PEARL_PLAZA],
    funding: FUND_DINING,
    citations: [C_OPEN_RESTAURANTS, C_SHARED_SPACES, C_PLAZA],
  },
  "comm-table": {
    shortDescription:
      "A long communal table seats a group and invites strangers to share space — the kind of informal gathering spot that helps a street function as a neighborhood “third place.”",
    benefits: ["Seats a group of ~6", "Encourages gathering", "Good for markets and events", "Flexible use"],
    considerations:
      "Longer furniture needs more clear width and a level surface. Consider who sets up, stores, and takes responsibility for a shared table.",
    maintenance: "Secure or store overnight; inspect fasteners periodically and refinish wood as needed.",
    precedents: [P_OPEN_RESTAURANTS, P_PEARL_PLAZA, P_PARKING_DAY],
    funding: FUND_DINING,
    citations: [C_OPEN_RESTAURANTS, C_PLAZA, C_PARKLET_HISTORY],
  },
  bench: {
    shortDescription:
      "A simple bench gives people a reason and a place to stop. Seating is one of the highest-value, lowest-cost additions to a street — at transit stops, benches and shelter can cut riders' perceived wait time by roughly 20%.",
    benefits: ["Rest for all ages", "Supports transit riders", "Encourages lingering", "Very low cost"],
    considerations:
      "Placement matters: face seating toward activity, keep a clear path around it, and think about shade. Armrests aid people who need help standing.",
    maintenance: "Occasional cleaning and a fastener check; repaint or reseal every few years.",
    precedents: [P_PARKLET, P_PEARL_PLAZA, P_PARKING_DAY],
    funding: FUND_CIVIC,
    citations: [C_TRANSIT_WAIT, C_PARKLET_HISTORY, C_PLAZA],
  },
  counter: {
    shortDescription:
      "A perch counter along the edge of a space offers quick, casual seating for a coffee or a meal without the footprint of a full table — useful where space is tight but people still want to stop.",
    benefits: ["Casual perch seating", "Slim footprint", "Pairs with a café or kiosk", "Activates an edge"],
    considerations:
      "Bar-height seating is less accessible than standard seating; provide at least some lower, accessible seating nearby. Anchor against wind and tipping.",
    maintenance: "Wipe down daily; secure or store stools overnight.",
    precedents: [P_OPEN_RESTAURANTS, P_SHARED_SPACES, P_PARKLET],
    funding: FUND_DINING,
    citations: [C_OPEN_RESTAURANTS, C_SHARED_SPACES],
  },
  planter: {
    shortDescription:
      "Planters bring greenery to the curb and can double as soft edges that separate people from moving traffic. Grouped along a space, they define a room and slow stormwater runoff.",
    benefits: ["Adds greenery", "Buffers from traffic", "Absorbs some runoff", "Movable and modular"],
    considerations:
      "Soil and water make planters heavy — plan for watering access and drainage. Choose hardy plants suited to sun, salt, and low upkeep.",
    maintenance: "Water regularly (especially in summer), weed, and replace seasonal plantings.",
    precedents: [P_GREEN_STREET, P_PEARL_PLAZA, P_PARKLET],
    funding: FUND_GREEN,
    citations: [C_RAIN_GARDEN, C_TREE_COOLING, C_PLAZA],
  },
  tree: {
    shortDescription:
      "A street tree is one of the best returns a curb can offer. Mature trees can lower nearby air temperature by several degrees, and studies value America's urban trees at roughly $18 billion a year in benefits; one Portland study found street trees added about $7,000 to nearby home values.",
    benefits: ["Shade and cooling", "Raises property value", "Captures stormwater", "Cleans the air"],
    considerations:
      "Trees in the roadbed need real soil volume and structural protection. Choose species for the site, and give roots room so they don't damage pavement.",
    maintenance: "Water frequently for the first few years; prune and mulch periodically as the tree establishes.",
    precedents: [P_OLD_PASADENA, P_GREEN_STREET, P_PARKLET],
    funding: FUND_GREEN,
    citations: [C_TREE_VALUE, C_TREE_COOLING, C_PBD],
  },
  raingarden: {
    shortDescription:
      "A rain garden is a planted, shallow basin that catches street runoff and lets it soak into the ground instead of the sewer. Portland's SW 12th Avenue green street — four curbside planters — manages nearly all of the street's 180,000 gallons of annual runoff and was built for about $30,000.",
    benefits: ["Absorbs street runoff", "Filters pollutants", "Reduces flooding", "Adds habitat"],
    considerations:
      "Rain gardens are site-specific: they depend on grading, soil infiltration, and inlet design. Coordinate with the agency that manages drainage.",
    maintenance: "Clear inlets of debris, weed, and replant as needed; check that water drains within a day or two.",
    precedents: [P_GREEN_STREET, P_OLD_PASADENA, P_SHARED_SPACES],
    funding: FUND_GREEN,
    citations: [C_RAIN_GARDEN, C_GREEN_STREET],
  },
  lawn: {
    shortDescription:
      "A small patch of turf or groundcover creates soft ground to sit or play on — a simple way to make a hard street corner feel human. The original 2005 PARK(ing) Day installation was little more than sod, a bench, and a tree in one metered space.",
    benefits: ["Soft place to sit or play", "Cools the surface", "Family-friendly", "Inexpensive"],
    considerations:
      "Real turf needs water and wears in high-traffic spots; artificial or hardy groundcover can be lower-maintenance. Provide drainage so it doesn't pool.",
    maintenance: "Mow and water natural turf; rinse and brush artificial turf periodically.",
    precedents: [P_PARKING_DAY, P_PARKLET, P_PEARL_PLAZA],
    funding: FUND_GREEN,
    citations: [C_PARKLET_HISTORY, C_TREE_COOLING],
  },
  bikerack: {
    shortDescription:
      "A bike rack is a tiny, cheap piece of infrastructure with outsized return. Research finds that space given to bike parking can generate several times more customer spending than the same area used for a car — bikes simply pack more people into less curb.",
    benefits: ["Parks bikes off the sidewalk", "Supports local business", "Very low cost", "Space-efficient"],
    considerations:
      "Use a rack that supports the frame at two points (inverted-U style), and leave clearance so bikes don't block the walkway.",
    maintenance: "Minimal — occasional cleaning and a check that anchors are tight.",
    precedents: [P_BIKE_CORRAL, P_PARKLET, P_SHARED_SPACES],
    funding: FUND_TRANSIT,
    citations: [C_BIKE_BUSINESS, C_BIKE_CORRAL],
  },
  bikecorral: {
    shortDescription:
      "A bike corral converts one car space into parking for roughly ten bikes. Portland turned 163 on-street car spaces into more than 1,600 bike spots this way — the same curb, an order of magnitude more people served.",
    benefits: ["~10 bikes per car space", "Boosts nearby business", "Frees the sidewalk", "Quick to install"],
    considerations:
      "Corrals work best at bike-friendly destinations with demand. They usually need protection at the traffic-facing end and buy-in from the adjacent business.",
    maintenance: "Sweep out debris; periodically check rack and barrier anchoring.",
    precedents: [P_BIKE_CORRAL, P_PARKLET, P_SHARED_SPACES],
    funding: FUND_TRANSIT,
    citations: [C_BIKE_CORRAL, C_BIKE_BUSINESS],
  },
  busshelter: {
    shortDescription:
      "A shelter makes waiting for the bus tolerable — and that changes behavior. Riders at stops with a bench and shelter perceive their wait as far shorter, and better stops are linked to higher ridership.",
    benefits: ["Shelter from sun and rain", "Cuts perceived wait time", "Supports ridership", "Signals investment"],
    considerations:
      "Shelters need a clear, level boarding area and accessible dimensions. Design and siting are usually set with the transit agency.",
    maintenance: "Regular cleaning, glass and lighting repair, and trash service.",
    precedents: [P_PEARL_PLAZA, P_PARKLET, P_OLD_PASADENA],
    funding: FUND_TRANSIT,
    citations: [C_TRANSIT_WAIT],
  },
  scooter: {
    shortDescription:
      "A small docking or corral area gives shared bikes and scooters a defined home at the curb, keeping them upright and off the sidewalk while extending transit's reach for short trips.",
    benefits: ["Organizes micromobility", "Clears the sidewalk", "Extends transit trips", "Small footprint"],
    considerations:
      "Works best coordinated with the shared-mobility operators and the city, with clear striping and signage so the zone is used as intended.",
    maintenance: "Mostly operator-managed; the city keeps the zone clear and striping visible.",
    precedents: [P_BIKE_CORRAL, P_SHARED_SPACES, P_PARKLET],
    funding: FUND_TRANSIT,
    citations: [C_BIKE_CORRAL, C_BIKE_BUSINESS],
  },
  adu: {
    shortDescription:
      "At the largest scale, a curb-adjacent lot can hold a small home. Accessory dwelling units typically run 400–1,200 square feet and cost on the order of $150–$300 per square foot — a way to add housing without new land.",
    benefits: ["Adds a home", "Uses existing land", "Gentle density", "Can house family or renters"],
    considerations:
      "This is a full construction project with zoning, permitting, utilities, and setback requirements — by far the most involved element here.",
    maintenance: "Maintained like any dwelling: systems, roof, and exterior upkeep over time.",
    precedents: [P_PARKING_DAY, P_OLD_PASADENA, P_SHARED_SPACES],
    funding: ["Homeowner financing or construction loan", "Housing grants or ADU incentive programs", "Developer or nonprofit partnership"],
    citations: [C_ADU_COST, C_PARKING_LAND],
  },
  kiosk: {
    shortDescription:
      "A small vendor kiosk gives an entrepreneur an affordable foothold on the street. Street vendors activate public space and feed the local economy — one national study tied them to hundreds of millions in local economic activity.",
    benefits: ["Low-barrier small business", "Activates the street", "Adds daily foot traffic", "Local character"],
    considerations:
      "Vending usually requires a permit, utility access, and a waste plan. Rules on where and when vending is allowed vary widely by city.",
    maintenance: "Vendor-operated: daily setup, cleaning, and waste removal.",
    precedents: [P_PEARL_PLAZA, P_SHARED_SPACES, P_PARKING_DAY],
    funding: FUND_CIVIC,
    citations: [C_STREET_VENDORS, C_PLAZA],
  },
  trash: {
    shortDescription:
      "Moving trash into containers at the curb — instead of bags piled on the sidewalk — reclaims the walkway and denies rats an easy meal. Cities are increasingly containerizing waste in former parking space.",
    benefits: ["Clears the sidewalk", "Deters rats", "Contains odor and litter", "Neater street"],
    considerations:
      "Containers must stay accessible to collection vehicles and residents, and sized to the block's waste volume.",
    maintenance: "Regular collection, occasional cleaning, and repair of lids and latches.",
    precedents: [P_SHARED_SPACES, P_PEARL_PLAZA, P_OLD_PASADENA],
    funding: FUND_CIVIC,
    citations: [C_PARKING_LAND, C_PLAZA],
  },
  library: {
    shortDescription:
      "A little free library is a tiny book exchange anyone can start. The registered network has grown past 200,000 boxes in 128 countries, sharing hundreds of millions of books since 2009 — proof that small civic gestures scale.",
    benefits: ["Free access to books", "Sparks neighborly exchange", "Tiny footprint", "Volunteer-run"],
    considerations:
      "Needs a steward to keep it stocked and tidy, and a spot that's visible but out of the pedestrian path.",
    maintenance: "A volunteer restocks books and keeps the box weatherproof.",
    precedents: [P_LITTLE_LIBRARY, P_PARKLET, P_PEARL_PLAZA],
    funding: ["Community fundraising or donation", "Sponsorship by a local business", "Adopt-a-library volunteer steward"],
    citations: [C_LITTLE_LIBRARY],
  },
  parcel: {
    shortDescription:
      "A shared parcel locker gives deliveries a secure home. With porch theft affecting roughly one in four Americans, a curbside locker bank can consolidate deliveries for a block and cut both theft and delivery-truck dwell time.",
    benefits: ["Secure package pickup", "Reduces porch theft", "Consolidates deliveries", "24/7 access"],
    considerations:
      "Lockers need power and network access, weather protection, and a clear operator. Consider who has access and how it's shared across a building or block.",
    maintenance: "Operator-serviced hardware and software; occasional cleaning.",
    precedents: [P_SHARED_SPACES, P_PEARL_PLAZA, P_PARKING_DAY],
    funding: ["Vendor-operated (revenue-share) model", "Building or BID contribution", "City curb-management pilot"],
    citations: [C_PACKAGE_THEFT],
  },
  art: {
    shortDescription:
      "Public art turns a leftover space into a landmark. A mural, sculpture, or painted surface gives a block identity and is one of the most common opening moves in placemaking and tactical-urbanism projects.",
    benefits: ["Creates identity", "Deters blight", "Engages local artists", "Sparks conversation"],
    considerations:
      "Durable materials and a maintenance plan matter outdoors. Community input and, for murals, wall or ground permission are usually needed.",
    maintenance: "Anti-graffiti coating and periodic touch-ups; repaint painted asphalt as it wears.",
    precedents: [P_PARKING_DAY, P_PEARL_PLAZA, P_PARKLET],
    funding: FUND_CIVIC,
    citations: [C_PARKLET_HISTORY, C_PLAZA],
  },
  daylight: {
    shortDescription:
      "“Daylighting” clears parking right at a corner so drivers and people crossing can see each other. NACTO recommends keeping about 20–25 feet clear of the crosswalk; Hoboken, NJ paired daylighting with simple curb treatments and has gone years without a traffic death.",
    benefits: ["Safer sightlines", "Protects people crossing", "Very low cost", "Can be quick-build"],
    considerations:
      "The clear zone can be reinforced with planters, bollards, or a curb extension. It removes a parking space — the safety payoff is the trade.",
    maintenance: "Minimal for bollards or paint; planted versions need seasonal upkeep.",
    precedents: [P_HOBOKEN, P_PEARL_PLAZA, P_GREEN_STREET],
    funding: ["City safety / Vision Zero budget", "Quick-build or capital street program", "Federal / state safety grants"],
    citations: [C_DAYLIGHTING, C_HOBOKEN],
  },
};

// —— Fallback placeholders (used when an element has no DETAILS entry) ——

const PLACEHOLDER_DESCRIPTION =
  "A flexible element you can place in a reclaimed parking space. Detailed research context for this element is being added.";
const PLACEHOLDER_BENEFITS = ["Activates the curb", "Serves the community", "Fits a small footprint"];
const PLACEHOLDER_CONSIDERATIONS =
  "Most curb-space changes involve a permit, accessibility requirements, and coordination with whoever manages the street.";
const PLACEHOLDER_MAINTENANCE = "Plan for who installs, cleans, and maintains this element over time.";
const PLACEHOLDER_PRECEDENTS: ElementPrecedent[] = [P_PARKING_DAY, P_PARKLET, P_PEARL_PLAZA];
const PLACEHOLDER_FUNDING = FUND_CIVIC;
const PLACEHOLDER_CITATIONS: ElementCitation[] = [C_PARKING_LAND, C_PLAZA];

/** Resolve an element's modal detail from the DETAILS map, its own fields, then shared fallbacks. */
export function elementDetail(b: BankElement): ElementDetail {
  const d = DETAILS[b.id] ?? {};
  return {
    shortDescription: b.shortDescription ?? d.shortDescription ?? PLACEHOLDER_DESCRIPTION,
    benefits: b.benefits ?? d.benefits ?? PLACEHOLDER_BENEFITS,
    considerations: b.considerations ?? d.considerations ?? PLACEHOLDER_CONSIDERATIONS,
    maintenance: b.maintenance ?? d.maintenance ?? PLACEHOLDER_MAINTENANCE,
    precedents: b.precedents ?? d.precedents ?? PLACEHOLDER_PRECEDENTS,
    funding: b.funding ?? d.funding ?? PLACEHOLDER_FUNDING,
    citations: b.citations ?? d.citations ?? PLACEHOLDER_CITATIONS,
  };
}
