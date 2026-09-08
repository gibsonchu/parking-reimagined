/*
 * Library precedents — real-world examples of curb / parking-space
 * interventions, shown as a visual gallery on the Library page.
 *
 * Each record is a real program or project with a public source. Figures come
 * from that source's reporting and are planning-level context, not guarantees.
 * `relatedElementIds` reference real ids from the Elements dataset (BANK) so a
 * precedent can link back to the Elements it uses. Images are shown as blank
 * placeholders until licensed photography is added.
 */

export const LIBRARY_CATEGORIES = [
  "Seating",
  "Trees",
  "Bike Parking",
  "Dining",
  "Rain Gardens",
  "Loading",
  "Accessibility",
  "Transit",
  "Play",
] as const;

import type { PhotoCredit } from "./elements";

export type LibraryCategory = (typeof LIBRARY_CATEGORIES)[number];

/** "All" is the default filter; the rest match LibraryCategory. */
export type LibraryFilter = "All" | LibraryCategory;

export interface Precedent {
  id: string;
  title: string;
  location: string;
  year: string;
  category: LibraryCategory;
  image?: string; // single hero photo in /public/precedents; blank placeholder until set
  images?: string[]; // optional photo set (gallery); the card uses the first
  credit?: PhotoCredit; // attribution for image / images (one source per precedent)
  shortDescription: string;
  longDescription: string;
  observations: string[];
  relatedElementIds: string[]; // ids into the Elements dataset (BANK)
  estimatedCost?: string;
  sourceName: string;
  sourceUrl: string;
}

export const PRECEDENTS: Precedent[] = [
  // ── Featured: a local, first-year Parking Day ──
  {
    id: "ottawa-parking-day",
    images: [
      "/precedents/ottawa-parking-day-1.jpg",
      "/precedents/ottawa-parking-day-2.jpg",
      "/precedents/ottawa-parking-day-3.jpg",
      "/precedents/ottawa-parking-day-4.jpg",
    ],
    credit: {
      author: "Strong Towns Ottawa",
      license: "Courtesy of the organizers",
      href: "https://parkingreform.org/2025/11/06/how-we-organized-ottawas-first-parking-day-and-got-kicked-off-the-street/",
    },
    title: "Ottawa's First Parking Day",
    location: "Bank Street, Ottawa, ON",
    year: "2025",
    category: "Play",
    shortDescription: "Three metered spots became a living room — until by-law officers stepped in.",
    longDescription:
      "On September 19, 2025, Strong Towns Ottawa staged the city's first Parking Day, taking over three metered spots on Bank Street — meters dutifully paid — and furnishing a cozy mock living room of potted plants, area rugs, chairs, tables, a trivia board, and a plein-air art station to talk with passers-by about replacing on-street parking with dedicated bus lanes. About an hour in, by-law officers arrived on a complaint that the setup was “preventing cars from parking,” citing an Ontario Highway Traffic Act rule that only vehicles may occupy a parking space — a sofa, rug, and plants don't qualify. Facing a $500+ fine and confiscation, the group relocated the whole parklet three blocks to a sympathetic bike shop's private lot and carried on: trivia, conversation, and all. The eviction made the point better than the event could have — the rules had room to store a private car, but not a public living room.",
    observations: [
      "Three paid meter spots reclaimed",
      "Part of a Bank Street bus-lane campaign",
      "Removed under the Highway Traffic Act",
      "Relocated to a bike-shop lot and continued",
    ],
    relatedElementIds: ["planter", "bench", "cafe-table", "art"],
    estimatedCost: "Under $100 (meter fees + borrowed furniture)",
    sourceName:
      "“How We Organized Ottawa's First Parking Day (And Got Kicked Off The Street).” Etienne Lefebvre, Parking Reform Network, 2025.",
    sourceUrl: "https://parkingreform.org/2025/11/06/how-we-organized-ottawas-first-parking-day-and-got-kicked-off-the-street/",
  },
  {
    id: "dc-parking-day",
    images: ["/precedents/dc-parking-day-1.jpg", "/precedents/dc-parking-day-2.jpg"],
    credit: {
      author: "Mike Kwan / Parking Reform Network",
      license: "Courtesy of the organizer",
      href: "https://parkingreform.org/2021/09/29/what-parking-day-showed-me-about-the-value-of-public-space-and-what-we-sacrifice-for-cars/",
    },
    title: "Parking Day in Adams Morgan",
    location: "Washington, DC",
    year: "2021",
    category: "Play",
    shortDescription: "A rainy-day pop-up with a free clothing swap and an open chess board.",
    longDescription:
      "For Parking Day 2021, organizer Mike Kwan turned three permitted parking spaces in D.C.'s Adams Morgan into a pop-up parklet built around a free clothing swap — stocked with racks and bags of gently used clothes donated through the neighborhood's “Buy Nothing” group, with the overflow kept dry in a rented U-Haul during the morning rain. An open chess board drew a running series of challengers off the sidewalk, cornhole filled the rest of the space, and a copy of Donald Shoup's “Parking and the City” found a new owner. The day quietly redirected donated clothing to neighbors who needed it — including a man camped in a nearby park and a woman collecting for Haitian families. Meanwhile an SUV sat illegally in one of the paid, permitted spaces for hours (and bumped the truck on its way out) — a pointed reminder of how much public space we hand to private car storage.",
    observations: [
      "Three permitted spots became a parklet",
      "Free clothing swap via a Buy Nothing group",
      "An open chess board pulled neighbors in",
      "An SUV camped illegally in a paid spot",
    ],
    relatedElementIds: ["planter", "cafe-table", "bench", "lawn"],
    estimatedCost: "~$100–$500 (permit, insurance, rentals)",
    sourceName:
      "“What Parking Day Showed Me About the Value of Public Space.” Mike Kwan, Parking Reform Network, 2021.",
    sourceUrl:
      "https://parkingreform.org/2021/09/29/what-parking-day-showed-me-about-the-value-of-public-space-and-what-we-sacrifice-for-cars/",
  },

  // ── Seating ──
  {
    id: "pearl-street-triangle",
    image: "/precedents/pearl-street-triangle.jpg",
    credit: { author: "Wgreaves", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Pearl_Street_Triangle_in_DUMBO.jpg" },
    title: "Pearl Street Triangle Plaza",
    location: "Brooklyn, New York",
    year: "2007",
    category: "Seating",
    shortDescription: "A 12-car parking triangle became DUMBO's first pedestrian plaza.",
    longDescription:
      "The Pearl Street Triangle was an asphalt lot used to park about 12 cars until the local business district asked NYC DOT for help. DOT painted the roadbed, added café tables, umbrellas, and planters, and opened the city's first Plaza Program space. Businesses around the plaza later reported a 172% increase in sales, compared with 18% growth borough-wide.",
    observations: [
      "Started as low-cost paint and movable furniture",
      "Turned a dozen parking spaces into public space",
      "Measurable boost to nearby retail",
    ],
    relatedElementIds: ["bench", "cafe-table", "planter"],
    estimatedCost: "$10,000–$50,000",
    sourceName: "Case Study: Plaza Program, NYC. Global Designing Cities Initiative.",
    sourceUrl:
      "https://globaldesigningcities.org/publication/global-street-design-guide/streets/pedestrian-priority-spaces/pedestrian-plazas/case-study-plaza-program-new-york-city-usa/",
  },
  {
    id: "sf-pavement-to-parks",
    image: "/precedents/sf-pavement-to-parks.jpg",
    credit: { author: "Kathleen Corey", license: "CC BY 2.0", href: "https://commons.wikimedia.org/wiki/File:1331_9th_Avenue_Parklet.jpg" },
    title: "Pavement to Parks Parklets",
    location: "San Francisco, California",
    year: "2010",
    category: "Seating",
    shortDescription: "The program that turned the first metered spaces into tiny public parks.",
    longDescription:
      "Inspired by PARK(ing) Day, San Francisco's Pavement to Parks program installed its first parklets in 2010 — small platforms that convert one or two parking spaces into public seating. The idea spread quickly; the city now manages the program (renamed Groundplay) and has approved well over a hundred parklets, most sponsored by an adjacent business but open to everyone.",
    observations: [
      "One or two parking spaces per parklet",
      "Business-sponsored but publicly open",
      "A template copied by cities worldwide",
    ],
    relatedElementIds: ["bench", "cafe-table", "planter"],
    estimatedCost: "$15,000–$50,000",
    sourceName: "Groundplay (Pavement to Parks). San Francisco Planning.",
    sourceUrl: "https://groundplaysf.org/",
  },
  {
    id: "la-people-st-parklets",
    images: [
      "/precedents/la-people-st-parklets-1.jpg",
      "/precedents/la-people-st-parklets-2.jpg",
      "/precedents/la-people-st-parklets-3.jpg",
      "/precedents/la-people-st-parklets-4.jpg",
    ],
    credit: { author: "Los Angeles DOT", license: "People St program", href: "https://ladotlivablestreets.org/content-detail/about-people-st" },
    title: "People St Parklets",
    location: "Various locations, Los Angeles",
    year: "2014",
    category: "Seating",
    shortDescription: "A citywide 'kit of parts' let neighborhoods build parklets across LA.",
    longDescription:
      "People St is a citywide Los Angeles program — not a single street. Through it, LADOT offers residents and business districts a pre-approved “kit of parts” (standard components, graphics, signage, and budgets) to convert street space into parklets, plazas, and bike corrals. Local partners apply for, sponsor, and maintain each installation, so community-initiated projects get built quickly and consistently instead of being designed from scratch. The photos here are from several different People St parklets around the city.",
    observations: [
      "A citywide program, many locations",
      "Standardized kit speeds approvals",
      "Community partners apply and maintain",
      "One toolkit for parklets, plazas, and corrals",
    ],
    relatedElementIds: ["bench", "cafe-table", "planter"],
    estimatedCost: "$20,000–$60,000",
    sourceName: "About People St. Los Angeles DOT Livable Streets.",
    sourceUrl: "https://ladotlivablestreets.org/content-detail/about-people-st",
  },

  // ── Trees ──
  {
    id: "old-pasadena-streetscape",
    image: "/precedents/old-pasadena-streetscape.jpg",
    credit: { author: "Ken Lund", license: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:Colorado_Boulevard,_Old_Pasadena,_Pasadena,_California_(14494697486).jpg" },
    title: "Old Pasadena Streetscape",
    location: "Pasadena, California",
    year: "1993",
    category: "Trees",
    shortDescription: "Parking-meter revenue funded trees, lighting, and a downtown turnaround.",
    longDescription:
      "Old Pasadena installed parking meters in 1993 and — unusually — kept the revenue in the district, dedicating it to a Streetscape and Alleyways project of trees, tree grates, decorative lighting, and alley restoration. Merchants supported paid parking because they could see where the money went. Over the following years, sales-tax revenue in the district climbed dramatically as the once-neglected area revived.",
    observations: [
      "Meter money stayed in the neighborhood",
      "Funded street trees and lighting",
      "The classic Parking Benefit District example",
    ],
    relatedElementIds: ["tree", "planter"],
    estimatedCost: "$3,000–$5,000 per tree",
    sourceName: "Parking Benefit Districts — A Guide for Activists. Parking Reform Network.",
    sourceUrl: "https://parkingreform.org/playbook/pbd/",
  },
  // ── Bike Parking ──
  {
    id: "portland-bike-corrals",
    images: ["/precedents/portland-bike-corrals-1.jpg", "/precedents/portland-bike-corrals-2.jpg"],
    credit: { author: "City of Portland (PBOT)", license: "Source", href: "https://www.portland.gov/transportation/walking-biking-transit-safety/apply-install-bike-racks-street" },
    title: "On-Street Bike Corrals",
    location: "Portland, Oregon",
    year: "2004",
    category: "Bike Parking",
    shortDescription: "163 car spaces upgraded into parking for 1,644 bikes.",
    longDescription:
      "Portland pioneered the on-street bike corral, replacing a single car space with racks for roughly ten bikes. Over time the city converted 163 on-street car-parking spaces into more than 1,600 bike parking spots. Corrals are usually requested and hosted by the adjacent business, which gains far more customers at the curb than one car could bring.",
    observations: [
      "~10 bikes fit where one car parked",
      "Businesses request and host them",
      "Bike parking earns more spending per square foot",
    ],
    relatedElementIds: ["bikecorral", "bikerack"],
    estimatedCost: "$2,000–$5,000",
    sourceName: "Apply to install bike racks in the street. Portland Bureau of Transportation.",
    sourceUrl: "https://www.portland.gov/transportation/walking-biking-transit-safety/apply-install-bike-racks-street",
  },
  // ── Dining ──
  {
    id: "nyc-open-restaurants",
    image: "/precedents/nyc-open-restaurants.jpg",
    credit: { author: "Andre Carrotflower", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:Alfresco_dining_at_blue_hour_on_Smith_Street,_Brooklyn,_New_York_-_20200906.jpg" },
    title: "Open Restaurants / Dining Out NYC",
    location: "New York City",
    year: "2020",
    category: "Dining",
    shortDescription: "The largest outdoor-dining expansion in the country, now permanent.",
    longDescription:
      "Launched in the 2020 emergency, NYC's Open Restaurants let thousands of restaurants place seating in the curb lane. At its peak the program activated about 2.4 million square feet of former parking space — space that would have cost restaurants an estimated $156 million a year in commercial rent — and it roughly doubled the share of outdoor dining in lower-income neighborhoods. It has since become the permanent Dining Out NYC program.",
    observations: [
      "~2.4 million sq ft of parking reused for dining",
      "Broadened access in lower-income areas",
      "Temporary rules made permanent",
    ],
    relatedElementIds: ["cafe-table", "comm-table", "counter"],
    estimatedCost: "$5,000–$40,000 per setup",
    sourceName: "Economic Boost of Outdoor Dining. NYC DOT, 2022.",
    sourceUrl: "https://www.nyc.gov/html/dot/html/pr2022/outdoor-dining.shtml",
  },
  {
    id: "sf-shared-spaces",
    image: "/precedents/sf-shared-spaces.jpg",
    credit: { author: "Mark Hogan", license: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:SFParklet.jpg" },
    title: "Shared Spaces",
    location: "San Francisco, California",
    year: "2020",
    category: "Dining",
    shortDescription: "Curbside dining and retail parklets that outlasted the pandemic.",
    longDescription:
      "San Francisco's Shared Spaces program let businesses use the curb lane and sidewalk for dining, retail, and gathering. Building on a decade of parklet experience, the city adopted permanent rules so many of the pandemic-era parklets could stay, with design and accessibility standards to keep them safe and open to the public.",
    observations: [
      "Grew out of the parklet program",
      "Made permanent with design standards",
      "Curb lane used for dining and retail",
    ],
    relatedElementIds: ["cafe-table", "comm-table", "counter"],
    estimatedCost: "$10,000–$50,000",
    sourceName: "Shared Spaces Program. San Francisco Planning.",
    sourceUrl: "https://sfplanning.org/shared-spaces",
  },
  {
    id: "old-pasadena-dining",
    images: [
      "/precedents/old-pasadena-dining-1.jpg",
      "/precedents/old-pasadena-dining-2.jpg",
      "/precedents/old-pasadena-dining-3.jpg",
    ],
    credit: { author: "City of Pasadena", license: "On-Street Dining Update, 2020", href: "https://ww2.cityofpasadena.net/2020%20Agendas/Jul_20_20/AR%2026B%20PPT.pdf" },
    title: "Old Pasadena On-Street Dining",
    location: "Pasadena, California",
    year: "2020",
    category: "Dining",
    shortDescription: "The same historic district turned parking lanes into barrier-protected dining.",
    longDescription:
      "Decades after its parking-meter streetscape revival, Old Pasadena reclaimed its curb lanes again — this time for dining. In July 2020, Pasadena's Temporary On-Street Dining program let restaurants along Colorado Boulevard (in both Old Pasadena and the neighboring Playhouse Village) place tables in former parking spaces, protected from traffic by water-filled barriers, with the city taking 14 applications within its first two weeks. It was a fast, low-cost way to give restaurants room to reopen while keeping the sidewalk clear for walking.",
    observations: [
      "Parking lanes converted to dining",
      "Barrier-protected from moving traffic",
      "14 applications in the first two weeks",
      "Deployed along Colorado Boulevard",
    ],
    relatedElementIds: ["cafe-table", "comm-table", "planter"],
    estimatedCost: "$5,000–$30,000 per setup",
    sourceName: "On-Street Dining and Parklet Update. City of Pasadena DOT, July 2020.",
    sourceUrl: "https://ww2.cityofpasadena.net/2020%20Agendas/Jul_20_20/AR%2026B%20PPT.pdf",
  },

  // ── Rain Gardens ──
  {
    id: "portland-green-street",
    images: ["/precedents/portland-green-street-1.jpg", "/precedents/portland-green-street-2.jpg"],
    credit: { author: "City of Portland", license: "via ASLA", href: "https://www.asla.org/focus-areas/climate-biodiversity-action/case-studies/climate-action-case-studies/sw-12th-avenue-green-street" },
    title: "SW 12th Avenue Green Street",
    location: "Portland, Oregon",
    year: "2005",
    category: "Rain Gardens",
    shortDescription: "Four curbside planters that manage a street's runoff for about $30,000.",
    longDescription:
      "Portland's SW 12th Avenue Green Street replaced an unused strip between sidewalk and curb with four landscaped stormwater planters. Runoff enters through a curb cut, slows, filters, and infiltrates — managing nearly all of the street's roughly 180,000 gallons of annual runoff and essentially disconnecting it from the storm sewer. The award-winning project was built for about $30,000.",
    observations: [
      "Manages ~180,000 gallons a year",
      "Built for roughly $30,000",
      "A repeatable, low-cost module",
    ],
    relatedElementIds: ["raingarden", "planter"],
    estimatedCost: "$8,000–$30,000",
    sourceName: "SW 12th Avenue Green Street. ASLA / City of Portland.",
    sourceUrl: "https://www.asla.org/awards/2006/06winners/341.html",
  },
  {
    id: "seattle-sea-streets",
    images: ["/precedents/seattle-sea-streets-1.jpg", "/precedents/seattle-sea-streets-2.jpg"],
    credit: { author: "Seattle Public Utilities", license: "via NACTO", href: "https://nacto.org/latest/street-edge-alternatives-sea-street-pilot-seattle/" },
    title: "Street Edge Alternatives (SEA Streets)",
    location: "Seattle, Washington",
    year: "2001",
    category: "Rain Gardens",
    shortDescription: "A natural-drainage street that cut stormwater runoff by 99%.",
    longDescription:
      "Seattle rebuilt two blocks with swales, bioretention, and over 100 trees in place of conventional curb and gutter. Two years of monitoring found the street reduced the total volume of stormwater leaving it by 99%. Narrower paving and low-impact drainage also cut construction costs compared with a standard street.",
    observations: [
      "99% less stormwater runoff",
      "Swales and trees instead of curb-and-gutter",
      "Also calmed traffic",
    ],
    relatedElementIds: ["raingarden", "planter", "tree"],
    estimatedCost: "$15–$16 per sq ft (bioretention)",
    sourceName: "Street Edge Alternatives (SEA) Street Pilot, Seattle. NACTO.",
    sourceUrl: "https://nacto.org/latest/street-edge-alternatives-sea-street-pilot-seattle/",
  },

  // ── Loading ──
  {
    id: "nyc-clean-curbs",
    images: ["/precedents/nyc-clean-curbs-1.jpg", "/precedents/nyc-clean-curbs-2.jpg"],
    credit: { author: "NYC Sanitation (DSNY)", license: "via Streetsblog", href: "https://nyc.streetsblog.org/2022/09/27/sanitation-depts-clean-curbs-program-spreads-to-staten-island" },
    title: "Clean Curbs / Containerized Waste",
    location: "New York City",
    year: "2020",
    category: "Loading",
    shortDescription: "Sealed containers at the curb that get trash bags off the sidewalk.",
    longDescription:
      "NYC's Clean Curbs program places sealed waste containers in the curb lane so buildings and business districts can move trash bags off the sidewalk. The approach reclaims the walkway, contains odor and litter, and denies rats an easy food source. Piloted with partners like the SoHo Broadway Initiative, it has since spread to more neighborhoods across the boroughs — an early step toward the city's broader move to containerize the mountains of bags that used to sit at the curb.",
    observations: [
      "Trash moves off the sidewalk",
      "Sealed containers deter rats",
      "Curb lane used for waste, not cars",
      "Expanding across the boroughs",
    ],
    relatedElementIds: ["trash", "parcel"],
    estimatedCost: "$2,000–$20,000",
    sourceName: "“Sanitation Dept.'s Clean Curbs Program Spreads to Staten Island.” Streetsblog NYC, 2022.",
    sourceUrl: "https://nyc.streetsblog.org/2022/09/27/sanitation-depts-clean-curbs-program-spreads-to-staten-island",
  },
  // ── Accessibility ──
  {
    id: "hoboken-daylighting",
    images: ["/precedents/hoboken-daylighting-1.jpg", "/precedents/hoboken-daylighting-2.jpg"],
    credit: { author: "City of Hoboken", license: "via Curbed", href: "https://www.curbed.com/2022/06/hoboken-traffic-deaths-none-vision-zero-streets.html" },
    title: "Vision Zero Daylighting",
    location: "Hoboken, New Jersey",
    year: "2019",
    category: "Accessibility",
    shortDescription: "Clearing corners of parked cars — and years with zero traffic deaths.",
    longDescription:
      "Hoboken enforces a 25-foot clear zone at intersections and reinforces it with simple, cheap treatments — sometimes just two bollards per corner at around $20. Keeping cars away from the crosswalk lets drivers and people crossing see each other. Paired with other low-cost fixes, the city has gone several consecutive years without a single traffic death.",
    observations: [
      "25 feet kept clear at each corner",
      "Bollards and paint, not major construction",
      "Years with zero traffic fatalities",
    ],
    relatedElementIds: ["daylight", "planter", "bench"],
    estimatedCost: "$20–$3,000 per corner",
    sourceName: "Vision Zero milestone: seven years without a traffic death. City of Hoboken.",
    sourceUrl:
      "https://www.hobokennj.gov/news/city-of-hoboken-reaches-new-vision-zero-milestone-seven-consecutive-years-without-a-traffic-death",
  },
  // ── Transit ──
  {
    id: "sf-transit-bulbs",
    images: ["/precedents/sf-transit-bulbs-1.jpg", "/precedents/sf-transit-bulbs-2.jpg"],
    credit: { author: "SFMTA", license: "Source", href: "https://www.sfmta.com/" },
    title: "Transit Bulb-Outs & Boarding Islands",
    location: "San Francisco, California",
    year: "2015",
    category: "Transit",
    shortDescription: "Curb extensions that let buses board without pulling out of traffic.",
    longDescription:
      "San Francisco builds transit bulb-outs and boarding islands — the curb (or a protected island) extended to the bus so riders board at a wider, sheltered waiting area and the bus never has to merge back into traffic. Comfortable, sheltered stops matter: riders perceive their wait as much shorter, and better stops are linked to higher ridership.",
    observations: [
      "Bus boards without leaving its lane",
      "Wider, sheltered waiting area",
      "Shelter cuts perceived wait time",
    ],
    relatedElementIds: ["busshelter", "bench"],
    estimatedCost: "$15,000–$150,000",
    sourceName: "SFMTA street & transit projects. San Francisco MTA.",
    sourceUrl: "https://www.sfmta.com/",
  },
  {
    id: "kcmetro-better-bus-stops",
    image: "/precedents/kcmetro-better-bus-stops.jpg",
    credit: { author: "Another Believer", license: "CC BY-SA 4.0", href: "https://commons.wikimedia.org/wiki/File:RapidRide_station_on_7th_Avenue_N,_Seattle,_2024.jpg" },
    title: "Better Bus Stops",
    location: "King County, Washington",
    year: "2016",
    category: "Transit",
    shortDescription: "Adding shelters and seating at stops in underserved neighborhoods.",
    longDescription:
      "King County Metro's Better Bus Stops effort focused on adding shelters, seating, lighting, and information at stops in historically underserved communities. The upgrades make waiting more comfortable and dignified — improvements consistently linked to shorter perceived waits and higher ridership.",
    observations: [
      "Shelters, seating, and lighting",
      "Prioritized equity areas",
      "Comfort supports ridership",
    ],
    relatedElementIds: ["busshelter", "bench"],
    estimatedCost: "$10,000–$30,000 per shelter",
    sourceName: "King County Metro.",
    sourceUrl: "https://kingcounty.gov/en/dept/metro",
  },

  // ── Play ──
  {
    id: "parking-day",
    image: "/precedents/parking-day.jpg",
    credit: { author: "Joe Mabel", license: "CC BY-SA 3.0", href: "https://commons.wikimedia.org/wiki/File:PARK(ing)_Day_Seattle_2009_-_01.jpg" },
    title: "PARK(ing) Day",
    location: "Worldwide (from San Francisco)",
    year: "2005",
    category: "Play",
    shortDescription: "The one-day experiment that launched a global movement.",
    longDescription:
      "In 2005 the design studio Rebar fed a downtown San Francisco parking meter, rolled out sod, added a bench and a tree, and made a tiny public park for as long as the meter ran. The idea became PARK(ing) Day, an open-source annual event that has since reached more than 160 cities across dozens of countries — and helped inspire permanent parklet programs.",
    observations: [
      "Started with one metered space",
      "Now in 160+ cities worldwide",
      "Seeded the parklet movement",
    ],
    relatedElementIds: ["lawn", "tree", "bench"],
    estimatedCost: "$100–$2,000",
    sourceName: "About PARK(ing) Day. myparkingday.org.",
    sourceUrl: "https://www.myparkingday.org/about",
  },
  {
    id: "times-square-plaza",
    image: "/precedents/times-square-plaza.jpg",
    credit: { author: "InSapphoWeTrust", license: "CC BY-SA 2.0", href: "https://commons.wikimedia.org/wiki/File:Times_Square_(6335597908).jpg" },
    title: "Times Square Pedestrian Plaza",
    location: "New York City",
    year: "2009",
    category: "Play",
    shortDescription: "Broadway's roadway handed to people — first with paint and chairs.",
    longDescription:
      "In 2009 NYC closed several blocks of Broadway at Times Square to cars, first with nothing more than paint, planters, and folding chairs. Injuries to pedestrians and drivers fell, traffic kept moving, and the wildly popular space was later rebuilt permanently — a landmark example of testing a big idea cheaply before committing to concrete.",
    observations: [
      "Roadway reclaimed for people",
      "Tested with paint and chairs first",
      "Later made permanent",
    ],
    relatedElementIds: ["lawn", "cafe-table", "art"],
    estimatedCost: "$10,000–$50,000 (interim)",
    sourceName: "Green Light for Midtown / Broadway. NYC DOT.",
    sourceUrl: "https://www.nyc.gov/html/dot/html/pedestrians/broadway.shtml",
  },
  {
    id: "better-block",
    image: "/precedents/better-block.jpg",
    credit: { author: "Office of U.S. Sen. Brian Schatz", license: "Public domain", href: "https://commons.wikimedia.org/wiki/File:Brian_Schatz_at_Better_Block_Hawaii_parklette.jpg" },
    title: "The Better Block",
    location: "Dallas, Texas (and beyond)",
    year: "2010",
    category: "Play",
    shortDescription: "Neighbors temporarily rebuild a block to show what's possible.",
    longDescription:
      "The Better Block began in 2010 when residents temporarily transformed a single Dallas block — adding café seating, bike lanes, greenery, and pop-up shops for a weekend — to demonstrate what the street could be. The tactic spread into a nonprofit and a global playbook for community-led, try-it-first street change.",
    observations: [
      "Community-built, temporary demo",
      "Shows the idea before it's permanent",
      "Grew into a global toolkit",
    ],
    relatedElementIds: ["cafe-table", "bikerack", "art"],
    estimatedCost: "$1,000–$20,000",
    sourceName: "The Better Block Foundation.",
    sourceUrl: "https://www.betterblock.org/",
  },
];

/** Fallback cost label, used only if a precedent omits estimatedCost. */
export const PLACEHOLDER_COST = "Varies by site";

export const filterPrecedents = (filter: LibraryFilter): Precedent[] =>
  filter === "All" ? PRECEDENTS : PRECEDENTS.filter((p) => p.category === filter);
