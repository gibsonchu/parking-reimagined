/*
 * Take Action — reusable content for the "idea → real street project" guide.
 *
 * Everything here is intentionally generic and broadly applicable across U.S.
 * cities: it describes real, common mechanisms (BIDs, parking benefit
 * districts, grants, pilots) without naming a specific city's agency, statute,
 * or program. City-specific detail belongs in future city guides.
 */

/** Planning-level cost for a typical curbside parklet-scale project. */
export const PLACEHOLDER_COST = "$15,000–$40,000";

export interface ActionStep {
  id: string;
  number: number;
  title: string;
  description: string;
  actionItems?: string[];
}

/** The eight steps, idea → implementation. Rich per-step bodies live in the page. */
export const ACTION_STEPS: ActionStep[] = [
  {
    id: "proposal",
    number: 1,
    title: "Create your proposal",
    description:
      "Start with a clear picture of what you want. Sketch a configuration, choose your Elements, and note the rough space and cost so people can react to something concrete.",
    actionItems: [
      "Design a possible street or curb-space configuration",
      "Identify the Elements you want to use",
      "Gather precedent examples from the Library",
      "Estimate the approximate space and cost",
    ],
  },
  {
    id: "street",
    number: 2,
    title: "Understand the street",
    description:
      "Before you pitch, learn how the street works today — who controls it, what the curb is used for, and what's already planned. The answers tell you who needs to be involved.",
  },
  {
    id: "people",
    number: 3,
    title: "Talk to the people affected",
    description:
      "The people who use the block every day can make or break a project. Talk with them early to learn what's working, what isn't, and what they'd want in the space.",
  },
  {
    id: "decision",
    number: 4,
    title: "Find the decision-maker",
    description: "The exact decision-making process varies by location and project type.",
  },
  {
    id: "support",
    number: 5,
    title: "Build support",
    description:
      "A short, clear proposal makes it easy for neighbors, businesses, and officials to say yes. Collect signatures, letters, and precedents that show the idea can work.",
  },
  {
    id: "test",
    number: 6,
    title: "Test the idea",
    description:
      "You rarely have to jump straight to permanent. A temporary demonstration or a pilot lets people experience the idea and work out the problems before anyone pours concrete.",
  },
  {
    id: "funding",
    number: 7,
    title: "Figure out who pays",
    description:
      "Most projects stitch together a few small sources rather than one big check. Match the funding type to whether you're covering one-time construction or ongoing upkeep.",
  },
  {
    id: "implementation",
    number: 8,
    title: "Move toward implementation",
    description:
      "Line up the design, approvals, funding, and a maintenance plan — then move from a tested idea to something that stays.",
  },
];

// —— Step 2: understand the street ——
export const STREET_QUESTIONS: string[] = [
  "Who owns or controls the street?",
  "What are the existing curb regulations?",
  "Is there a bus route or transit stop?",
  "Are there loading needs?",
  "Are there accessibility requirements?",
  "Are there schools, businesses, residences, or institutions nearby?",
  "Is there an upcoming street reconstruction or capital project?",
  "Are there existing plans for this corridor?",
];

// —— Step 3: talk to the people affected ——
export const STAKEHOLDERS: string[] = [
  "Residents",
  "Businesses",
  "Property owners",
  "Delivery workers",
  "Transit riders",
  "People with disabilities",
  "Cyclists",
  "Pedestrians",
  "Schools",
  "Community organizations",
];

export const STAKEHOLDER_QUESTIONS: string[] = [
  "What is working well today?",
  "What problems do people experience?",
  "What uses of the curb are most important?",
  "Who might benefit from this change?",
  "Who could be negatively affected?",
  "What is missing from the proposal?",
];

// —— Step 4: find the decision-maker ——
export interface DecisionMaker {
  id: string;
  name: string;
  description: string;
}
export const DECISION_MAKERS: DecisionMaker[] = [
  {
    id: "dot",
    name: "City transportation / public works department",
    description: "Usually controls the roadway, curb, and on-street parking — often the primary approver for a change in the street.",
  },
  {
    id: "council",
    name: "City Council / local legislature",
    description: "Sets policy, passes budgets, and can champion or authorize a project. Your local council member is a key ally.",
  },
  {
    id: "planning",
    name: "Planning department",
    description: "Oversees land use and public-space design, and in many cities runs the plaza or parklet program directly.",
  },
  {
    id: "board",
    name: "Community board / neighborhood council / commission",
    description: "Advisory bodies that weigh in on local projects. Their support builds credibility even when their vote isn't binding.",
  },
  {
    id: "transit",
    name: "Transit agency",
    description: "Controls bus stops, shelters, and boarding areas. Bring them in whenever a route or stop is affected.",
  },
  {
    id: "statedot",
    name: "State DOT",
    description: "Owns some arterial 'state routes' that run through cities. Changes on those streets need the state's sign-off.",
  },
  {
    id: "owner",
    name: "Other property owner",
    description: "Some curb-adjacent land is privately owned. There, the property owner — not the city — is the decision-maker.",
  },
];

// —— Step 5: one-page proposal preview ——
// An illustrative sample proposal (a generic parklet), not a real project.
export const PROPOSAL_PREVIEW: { label: string; value: string }[] = [
  { label: "Project name", value: "Main Street Parklet" },
  { label: "Location", value: "Curb lane on a two-lane commercial street" },
  { label: "Existing condition", value: "Two metered parking spaces" },
  { label: "Proposed change", value: "Seating, planters, and a bike rack, open to all" },
  { label: "Estimated cost", value: PLACEHOLDER_COST },
  { label: "Community priorities", value: "More places to sit; a safer, greener block" },
  { label: "Potential funding", value: "Business sponsorship + BID contribution" },
  { label: "Precedent", value: "SF Shared Spaces; NYC Plaza Program" },
];

// —— Step 6: test the idea ——
export interface TestStage {
  name: string;
  description: string;
}
export const TEST_STAGES: TestStage[] = [
  {
    name: "Temporary demonstration",
    description: "A day-to-weekend installation of paint, planters, and furniture to show the idea and gather reactions — think PARK(ing) Day or a Better Block.",
  },
  {
    name: "Pilot",
    description: "A months-long trial under a temporary permit, with data collected on how the space is used and what changes.",
  },
  {
    name: "Permanent project",
    description: "A lasting installation, often rebuilt in durable materials once the pilot has proven the concept.",
  },
];

// —— Step 7: figure out who pays ——
export interface FundingMethod {
  id: string;
  type: string;
  description: string;
  bestFor: string;
  controlledBy: string;
}
export const FUNDING_METHODS: FundingMethod[] = [
  {
    id: "capital",
    type: "City capital budget",
    description: "The multi-year budget for building physical infrastructure.",
    bestFor: "Permanent construction",
    controlledBy: "City council and mayor's office",
  },
  {
    id: "operating",
    type: "Agency operating budget",
    description: "The annual budget that runs and maintains programs and services.",
    bestFor: "Ongoing upkeep and staffing",
    controlledBy: "The relevant agency",
  },
  {
    id: "meter",
    type: "Parking meter revenue",
    description: "Money collected from metered parking, sometimes reinvested nearby.",
    bestFor: "Streetscape upkeep near the meters",
    controlledBy: "Transportation / parking agency",
  },
  {
    id: "pbd",
    type: "Parking Benefit District",
    description: "Returns local meter revenue to the district that generates it — the model that funded Old Pasadena's streetscape.",
    bestFor: "Business corridors with paid parking",
    controlledBy: "City, with local district input",
  },
  {
    id: "bid",
    type: "Business Improvement District",
    description: "Property owners tax themselves to fund shared improvements and upkeep.",
    bestFor: "Commercial districts",
    controlledBy: "The BID's board",
  },
  {
    id: "grants",
    type: "State or federal grants",
    description: "Competitive funds such as Transportation Alternatives or safety grants.",
    bestFor: "Larger capital projects",
    controlledBy: "State DOTs and federal programs",
  },
  {
    id: "developer",
    type: "Developer contribution",
    description: "Public-space improvements provided as part of nearby new development.",
    bestFor: "Sites next to construction",
    controlledBy: "The planning / approval process",
  },
  {
    id: "participatory",
    type: "Participatory budgeting",
    description: "Residents directly vote on how to spend a set pot of public money.",
    bestFor: "Community-chosen projects",
    controlledBy: "Residents, within program rules",
  },
  {
    id: "philanthropic",
    type: "Philanthropic funding",
    description: "Grants from foundations or civic nonprofits.",
    bestFor: "Pilots and demonstrations",
    controlledBy: "The funder's priorities",
  },
  {
    id: "sponsorship",
    type: "Private sponsorship",
    description: "A business or institution funds and maintains an element in exchange for recognition.",
    bestFor: "Parklets, plazas, and shelters",
    controlledBy: "Agreement with the sponsor",
  },
];

// —— Step 8: move toward implementation ——
export const IMPLEMENTATION_CHECKLIST: string[] = [
  "Proposal created",
  "Community input gathered",
  "Decision-maker identified",
  "Support documented",
  "Design refined",
  "Funding pathway identified",
  "Pilot considered",
  "Implementation pathway identified",
];

// —— "How does this work in my city?" ——
export const CITY_GUIDES: string[] = [
  "New York City",
  "San Francisco",
  "Los Angeles",
  "Chicago",
  "Boston",
];
