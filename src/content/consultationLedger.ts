export type ConsultationSource = "expert-report" | "public-consultation";

export type ConsultationMatch = {
  personaId: string;
  themeIds: string[];
};

export type ConsultationInput = {
  id: string;
  source: ConsultationSource;
  contributor: string;
  focusArea: string;
  keyIdea: string;
  evidence: string;
  echoCount?: number;
  echoLabel: string;
  pillars: string[];
  matches: ConsultationMatch[];
  evidenceRows?: ConsultationEvidenceRow[];
};

export type ConsultationEvidenceRow = {
  rowNumber: number;
  question: string;
  excerpt: string;
};

export const consultationSources = {
  summary:
    "https://ised-isde.canada.ca/site/ised/en/public-consultations/engagements-canadas-next-ai-strategy-summary-inputs",
  taskForceReports:
    "https://open.canada.ca/data/en/dataset/df68c04c-c156-44b1-8cf7-cdf532a2ce9b",
  publicDataset:
    "https://open.canada.ca/data/en/dataset/bc8cdd54-19cf-4f62-a3d3-fa4b7371d49a"
};

export const localPublicSpreadsheetUrl =
  "/assets/consultation/public/ai-strategy-raw-data-2025-1.xlsx";

const reportFocusFileSegments: Record<string, string> = {
  Adoption: "Adoption",
  Commercialization: "Commercialization",
  "Education and skills": "Education-and-Skills",
  Infrastructure: "Infrastructure",
  "Research and talent": "Research-and-Talent",
  "Safety and trust": "Safety-and-Trust",
  Scaling: "Scaling",
  "Scaling champions": "Scaling",
  Security: "Security"
};

function fileSlug(value: string) {
  return value.replace(/\s+/g, "-");
}

export function getConsultationDocumentUrl(input: ConsultationInput) {
  if (input.source === "public-consultation") {
    return localPublicSpreadsheetUrl;
  }

  const focusSegment = reportFocusFileSegments[input.focusArea] ?? fileSlug(input.focusArea);

  return `/assets/consultation/task-force/${fileSlug(input.contributor)}_${focusSegment}_EN.docx`;
}

export function getConsultationDocumentLabel(input: ConsultationInput) {
  return input.source === "public-consultation" ? "Download spreadsheet" : "Open local report";
}

const allPersonaMatches: ConsultationMatch[] = [
  { personaId: "concerned-canadian", themeIds: ["whats-real", "accountability"] },
  { personaId: "student", themeIds: ["what-to-learn-first", "ethics-critical-thinking"] },
  { personaId: "small-business", themeIds: ["where-to-start", "customer-trust"] },
  { personaId: "workplace-adopter", themeIds: ["daily-work", "accountable-workflows"] },
  { personaId: "entrepreneur", themeIds: ["compute-access", "capital-growth"] },
  { personaId: "future-canada", themeIds: ["big-promise", "who-benefits"] }
];

const trustMatches: ConsultationMatch[] = [
  {
    personaId: "concerned-canadian",
    themeIds: ["whats-real", "deepfakes", "my-data", "my-kids", "accountability"]
  },
  { personaId: "small-business", themeIds: ["customer-trust"] },
  { personaId: "workplace-adopter", themeIds: ["public-servant", "accountable-workflows"] },
  { personaId: "future-canada", themeIds: ["public-services", "who-benefits"] }
];

const adoptionMatches: ConsultationMatch[] = [
  { personaId: "small-business", themeIds: ["where-to-start", "sector-opportunity"] },
  { personaId: "workplace-adopter", themeIds: ["daily-work", "training-upskilling"] },
  { personaId: "future-canada", themeIds: ["health-care", "public-services", "real-economy"] }
];

const talentMatches: ConsultationMatch[] = [
  {
    personaId: "student",
    themeIds: ["what-to-learn-first", "trusted-ai-agents", "jobs-placements", "ethics-critical-thinking"]
  },
  { personaId: "workplace-adopter", themeIds: ["training-upskilling", "will-ai-replace-me"] },
  { personaId: "future-canada", themeIds: ["jobs-wages", "who-benefits"] },
  { personaId: "entrepreneur", themeIds: ["global-markets"] }
];

const commercializationMatches: ConsultationMatch[] = [
  { personaId: "entrepreneur", themeIds: ["capital-growth", "government-customer", "ip-and-data", "global-markets"] },
  { personaId: "small-business", themeIds: ["can-i-afford-it", "sector-opportunity"] },
  { personaId: "future-canada", themeIds: ["big-promise", "real-economy"] }
];

const infrastructureMatches: ConsultationMatch[] = [
  { personaId: "entrepreneur", themeIds: ["compute-access", "ip-and-data"] },
  { personaId: "concerned-canadian", themeIds: ["canadian-control", "environment"] },
  { personaId: "future-canada", themeIds: ["real-economy"] },
  { personaId: "small-business", themeIds: ["open-source-choice"] }
];

const securityMatches: ConsultationMatch[] = [
  { personaId: "concerned-canadian", themeIds: ["whats-real", "deepfakes", "accountability", "canadian-control"] },
  { personaId: "workplace-adopter", themeIds: ["accountable-workflows", "public-servant"] },
  { personaId: "entrepreneur", themeIds: ["compute-access", "ip-and-data"] },
  { personaId: "future-canada", themeIds: ["public-services", "real-economy"] }
];

export const expertReportLedger: ConsultationInput[] = [
  {
    id: "expert-adam-keating-commercialization",
    source: "expert-report",
    contributor: "Adam Keating",
    focusArea: "Commercialization",
    keyIdea: "Make entrepreneurship the main success measure for the AI strategy, backed by bold 2030 goals, faster approvals, procurement reform, student-founder hubs, and talent fast tracks.",
    evidence: "The report calls for a national builder culture, public accountability dashboards, buy-Canadian procurement, and university commercialization supports.",
    echoLabel: "Task Force report",
    pillars: ["Powering AI adoption", "Scaling Canadian champions"],
    matches: commercializationMatches
  },
  {
    id: "expert-ajay-agrawal-scaling",
    source: "expert-report",
    contributor: "Ajay Agrawal",
    focusArea: "Scaling champions",
    keyIdea: "Define concrete national AI moonshots around measurable public outcomes instead of abstract AI leadership.",
    evidence: "The report argues AI should be judged by gains such as shorter health wait times, stronger education, natural-resource stewardship, defence capability, and social-service resilience.",
    echoLabel: "Task Force report",
    pillars: ["Powering AI adoption", "Scaling Canadian champions"],
    matches: [
      { personaId: "future-canada", themeIds: ["health-care", "public-services", "real-economy"] },
      { personaId: "entrepreneur", themeIds: ["government-customer", "global-markets"] }
    ]
  },
  {
    id: "expert-alex-laplante-education",
    source: "expert-report",
    contributor: "Alex LaPlante",
    focusArea: "Education and skills",
    keyIdea: "Build a national AI skills system from K-12 through professional work, while making Canada easier to build in through one front door for compute, funding, IP, immigration, and procurement.",
    evidence: "The report proposes a K-12 AI framework, teacher development, AI across curricula, AI fellows, sector academies, and clearer incentives.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Powering AI adoption"],
    matches: talentMatches
  },
  {
    id: "expert-arvind-gupta-research",
    source: "expert-report",
    contributor: "Arvind Gupta",
    focusArea: "Research and talent",
    keyIdea: "Keep strengthening Canada's AI research base while connecting it to sectors, procurement, compute, and interdisciplinary training.",
    evidence: "The report recommends continued AI institute and CIFAR chair support, tri-council AI programs, research compute, SBIR/STTR-style procurement, Canada-AI chairs, graduate training, and immigration fixes.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Sovereign AI foundation"],
    matches: [...talentMatches, ...infrastructureMatches]
  },
  {
    id: "expert-ben-bergen-scaling",
    source: "expert-report",
    contributor: "Ben Bergen",
    focusArea: "Scaling champions",
    keyIdea: "Treat Canadian-owned AI firms, IP, data, and sovereign cloud as prosperity and security assets.",
    evidence: "The report warns that Canada missed the first commercial AI wave and argues for homegrown firms that can retain intangible assets and compete globally.",
    echoLabel: "Task Force report",
    pillars: ["Scaling Canadian champions", "Sovereign AI foundation"],
    matches: commercializationMatches
  },
  {
    id: "expert-cari-covent-adoption",
    source: "expert-report",
    contributor: "Cari Covent",
    focusArea: "Adoption",
    keyIdea: "Move Canada from pilots to scaled adoption through priority-sector platforms, SME supports, government targets, a national coordination office, and outcome metrics.",
    evidence: "The report emphasizes shared data and AI platforms, public-sector adoption targets, AI coordination capacity, and service/productivity KPIs.",
    echoLabel: "Task Force report",
    pillars: ["Powering AI adoption", "Protecting Canadians"],
    matches: adoptionMatches
  },
  {
    id: "expert-dan-debow-adoption",
    source: "expert-report",
    contributor: "Dan Debow",
    focusArea: "Adoption",
    keyIdea: "Make it profitable to build AI companies in Canada and fix government incentives so public agencies and defence leaders become real AI customers.",
    evidence: "The report centers on commercialization, government adoption incentives, and defence procurement as levers for Canadian AI capability.",
    echoLabel: "Task Force report",
    pillars: ["Powering AI adoption", "Scaling Canadian champions"],
    matches: [...adoptionMatches, ...commercializationMatches]
  },
  {
    id: "expert-david-naylor-education",
    source: "expert-report",
    contributor: "David Naylor",
    focusArea: "Education and skills",
    keyIdea: "Prepare schools, post-secondary institutions, and health education for AI without pretending education systems can change overnight.",
    evidence: "The report focuses on institutional realities in K-12, universities, colleges, medicine, and educator capacity.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Protecting Canadians"],
    matches: [
      { personaId: "student", themeIds: ["trusted-ai-agents", "ethics-critical-thinking"] },
      { personaId: "future-canada", themeIds: ["health-care", "jobs-wages"] }
    ]
  },
  {
    id: "expert-diane-gutiw-research",
    source: "expert-report",
    contributor: "Diane Gutiw",
    focusArea: "Research and talent",
    keyIdea: "Create innovation pipelines that connect research, real data, funding, procurement, certification, talent, and market pathways around strategic opportunities.",
    evidence: "The report proposes secure innovation sandboxes, pan-Canadian evaluation and procurement pathways, a centralized funding portal, pragmatic sovereignty guidelines, and talent-retention tax tools.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Powering AI adoption", "Scaling Canadian champions"],
    matches: [...talentMatches, ...commercializationMatches]
  },
  {
    id: "expert-doyin-adeyemi-trust",
    source: "expert-report",
    contributor: "Doyin Adeyemi",
    focusArea: "Safety and trust",
    keyIdea: "Start trust inside government with public-sector AI audits, no-go areas, an AI equity commission, youth protections, chatbot safety rules, and deepfake remedies.",
    evidence: "The report links algorithmic equity, automated decision-making, child-first design, youth digital literacy, and non-consensual deepfake enforcement.",
    echoLabel: "Task Force report",
    pillars: ["Protecting Canadians", "Empowering Canadians"],
    matches: trustMatches
  },
  {
    id: "expert-gail-murphy-research",
    source: "expert-report",
    contributor: "Gail Murphy",
    focusArea: "Research and talent",
    keyIdea: "Focus Canada's AI research advantage in areas of global strength such as health, robotics, and science, supported by pre-competitive industrial R&D centres.",
    evidence: "The report highlights targeted acceleration and internationally recognized research-to-development centres.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Powering AI adoption"],
    matches: [
      { personaId: "future-canada", themeIds: ["health-care", "real-economy"] },
      { personaId: "student", themeIds: ["jobs-placements"] },
      { personaId: "entrepreneur", themeIds: ["global-markets"] }
    ]
  },
  {
    id: "expert-garth-gibson-infrastructure",
    source: "expert-report",
    contributor: "Garth Gibson",
    focusArea: "Infrastructure",
    keyIdea: "Fast-track high-power AI infrastructure zones and long-haul fibre capacity so compute projects can actually be built.",
    evidence: "The report focuses on direct-current power, planned capacity buildout, and network infrastructure for large AI compute orders.",
    echoLabel: "Task Force report",
    pillars: ["Sovereign AI foundation"],
    matches: infrastructureMatches
  },
  {
    id: "expert-ian-rae-infrastructure",
    source: "expert-report",
    contributor: "Ian Rae",
    focusArea: "Infrastructure",
    keyIdea: "Build a national AI corridor with sovereign data trusts, compute/data campus hubs, and trusted compute certification.",
    evidence: "The report frames infrastructure as a connective fabric, not only isolated data centres.",
    echoLabel: "Task Force report",
    pillars: ["Sovereign AI foundation", "Trusted partnerships"],
    matches: infrastructureMatches
  },
  {
    id: "expert-james-neufeld-security",
    source: "expert-report",
    contributor: "James Neufeld",
    focusArea: "Security",
    keyIdea: "Canada should build, buy, and export domestic defence and mission-critical AI rather than mainly regulating foreign technology.",
    evidence: "The report argues sovereignty comes from economic power, government procurement, national defence AI champions, structured government-tech engagement, and talent circulation into Canadian firms.",
    echoLabel: "Task Force report",
    pillars: ["Sovereign AI foundation", "Scaling Canadian champions"],
    matches: [...securityMatches, ...commercializationMatches]
  },
  {
    id: "expert-joelle-pineau-trust",
    source: "expert-report",
    contributor: "Joelle Pineau",
    focusArea: "Safety and trust",
    keyIdea: "Build trustworthy AI through targeted incident reporting and government-visible risk signals, especially cybersecurity and threat intelligence.",
    evidence: "The report cautions against duplicative mandates and focuses trust infrastructure where government has unique visibility.",
    echoLabel: "Task Force report",
    pillars: ["Protecting Canadians", "Trusted partnerships"],
    matches: trustMatches
  },
  {
    id: "expert-louis-tetu-commercialization",
    source: "expert-report",
    contributor: "Louis Tetu",
    focusArea: "Commercialization",
    keyIdea: "Create a coast-to-coast sovereign AI utility: a secure, repeatable AI stack that supports adoption, standards, talent, and global commercialization.",
    evidence: "The report calls for a sovereign AI stack-on-tap, pan-Canadian standards, coordinated ecosystem licensing, and fast-tracked AI talent.",
    echoLabel: "Task Force report",
    pillars: ["Sovereign AI foundation", "Scaling Canadian champions"],
    matches: [...infrastructureMatches, ...commercializationMatches]
  },
  {
    id: "expert-marc-ouimette-infrastructure",
    source: "expert-report",
    contributor: "Marc Etienne Ouimette",
    focusArea: "Infrastructure",
    keyIdea: "Pursue cooperative AI sovereignty: resilient domestic compute capacity plus fast diffusion of AI across priority sectors.",
    evidence: "The report proposes a Canadian Compute Innovation Initiative, strategic adoption clusters, sovereign controls with cloud providers, industry AI adoption plans, and AI change-management talent.",
    echoLabel: "Task Force report",
    pillars: ["Sovereign AI foundation", "Powering AI adoption"],
    matches: [...infrastructureMatches, ...adoptionMatches]
  },
  {
    id: "expert-mary-wells-trust",
    source: "expert-report",
    contributor: "Mary Wells",
    focusArea: "Safety and trust",
    keyIdea: "Define AI red lines and practical trust infrastructure: data rights, redress, an independent regulator, standards, government expertise, innovation sandboxes, and a responsible AI playbook.",
    evidence: "The report links public trust with enforceable risk hierarchy, individual data ownership, and government capacity.",
    echoLabel: "Task Force report",
    pillars: ["Protecting Canadians", "Powering AI adoption"],
    matches: trustMatches
  },
  {
    id: "expert-michael-bowling-research",
    source: "expert-report",
    contributor: "Michael Bowling",
    focusArea: "Research and talent",
    keyIdea: "Canada's AI advantage is talent; scale AI chairs, fund focused research organizations, invest in AI for science, and fix immigration bottlenecks.",
    evidence: "The report recommends expanding and renewing AI chairs, creating frontier focused research organizations at the AI institutes, CERC chairs for AI for science, faster visas, internship flexibility, and reliable PR paths.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Sovereign AI foundation"],
    matches: talentMatches
  },
  {
    id: "expert-michael-serbinis-commercialization",
    source: "expert-report",
    contributor: "Michael Serbinis",
    focusArea: "Commercialization",
    keyIdea: "Tie national AI institutes and programs to commercialization outcomes, priority sectors, data trusts, Canadian-first IP, proof-of-concept funding, and challenge procurement.",
    evidence: "The report proposes commercialization KPIs, sector streams, Founders-in-Residence, a research-to-seed factory, a Canada First Customer program, and public-interest challenge programs.",
    echoLabel: "Task Force report",
    pillars: ["Scaling Canadian champions", "Sovereign AI foundation"],
    matches: commercializationMatches
  },
  {
    id: "expert-michael-serbinis-research",
    source: "expert-report",
    contributor: "Michael Serbinis",
    focusArea: "Research and talent",
    keyIdea: "Focus AI research in strategic breakthrough domains with mission-driven grand challenges, sovereign compute, regional hubs, and commercialization talent embedded early.",
    evidence: "The report names AI for health, scientific discovery, advanced capabilities, robotics, governance, and safety as areas for focused national leadership.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Powering AI adoption"],
    matches: [...talentMatches, ...commercializationMatches]
  },
  {
    id: "expert-michael-serbinis-scaling",
    source: "expert-report",
    contributor: "Michael Serbinis",
    focusArea: "Scaling champions",
    keyIdea: "Make building Canadian global champions a national priority with targets, a 10x council, a prosperity fund, public-sector transformation, leadership talent, and procurement targets.",
    evidence: "The report includes a Buy Canadian First policy, Canada First Customer Program, AI factory program, and funding for scale programs.",
    echoLabel: "Task Force report",
    pillars: ["Scaling Canadian champions", "Powering AI adoption"],
    matches: commercializationMatches
  },
  {
    id: "expert-natiea-vinson-education",
    source: "expert-report",
    contributor: "Natiea Vinson",
    focusArea: "Education and skills",
    keyIdea: "Fund Indigenous-led digital transformation as an ecosystem, including AI literacy, digital skills, and workforce training for Indigenous Peoples.",
    evidence: "The report proposes stable core funding for Indigenous organizations and dedicated federal-provincial AI skills streams.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Trusted partnerships"],
    matches: [
      { personaId: "student", themeIds: ["culture-language", "what-to-learn-first"] },
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "concerned-canadian", themeIds: ["my-data"] }
    ]
  },
  {
    id: "expert-olivier-blais-adoption",
    source: "expert-report",
    contributor: "Olivier Blais",
    focusArea: "Adoption",
    keyIdea: "Close the adoption gap with AI readiness funding, chief AI officers, sector sandboxes, hands-on literacy, and a Canadian AI trust label.",
    evidence: "The report proposes an AI Readiness Fund, AI implementation sandboxes, national coordination structures, training for 100,000 Canadians, and a voluntary trust label.",
    echoLabel: "Task Force report",
    pillars: ["Powering AI adoption", "Protecting Canadians"],
    matches: [...adoptionMatches, ...trustMatches]
  },
  {
    id: "expert-patrick-pichette-scaling",
    source: "expert-report",
    contributor: "Patrick Pichette",
    focusArea: "Scaling champions",
    keyIdea: "Make Canada a low-cost safe data-centre infrastructure leader, back a national LLM champion, attract AI talent, and reform capital pools for deep tech.",
    evidence: "The report recommends large revenue contracts for a Canadian LLM champion, AI/CS talent attraction, pension-fund reform, and fast-track governance for priority AI projects.",
    echoLabel: "Task Force report",
    pillars: ["Scaling Canadian champions", "Sovereign AI foundation"],
    matches: [...commercializationMatches, ...infrastructureMatches]
  },
  {
    id: "expert-sam-ramadori-security",
    source: "expert-report",
    contributor: "Sam Ramadori",
    focusArea: "Security",
    keyIdea: "Treat frontier AI as a security and sovereignty issue by building a middle-powers AI coalition, dual-use investment capacity, modern defence procurement, secure energy/data infrastructure, and science talent fast tracks.",
    evidence: "The report proposes a Canadian In-Q-Tel-style fund, defence procurement modernization, a sovereign AI coalition, infrastructure security planning, and a technology adoption movement.",
    echoLabel: "Task Force report",
    pillars: ["Sovereign AI foundation", "Trusted partnerships"],
    matches: securityMatches
  },
  {
    id: "expert-sarah-ryan-education",
    source: "expert-report",
    contributor: "Sarah Ryan",
    focusArea: "Education and skills",
    keyIdea: "Put workers at the centre of the AI skills strategy with training time, transition supports, privacy/data rights, and workplace legal guardrails.",
    evidence: "The report highlights worker distrust, job displacement concerns, 80/20 training, supports for equity-seeking workers, and labour-market transition services.",
    echoLabel: "Task Force report",
    pillars: ["Empowering Canadians", "Protecting Canadians"],
    matches: [
      { personaId: "workplace-adopter", themeIds: ["training-upskilling", "will-ai-replace-me", "accountable-workflows"] },
      { personaId: "future-canada", themeIds: ["jobs-wages", "who-benefits"] }
    ]
  },
  {
    id: "expert-shelly-bruce-security",
    source: "expert-report",
    contributor: "Shelly Bruce",
    focusArea: "Security",
    keyIdea: "Build AI security on top of stronger national cybersecurity: clear governance, strategic foresight, sovereignty roadmaps, sector models, certification, and active defence against AI-enabled threats.",
    evidence: "The report draws lessons from cybersecurity and recommends AI security research, secure channels, conformity assessment, national cyber defence telemetry, and counter-adversary campaigns.",
    echoLabel: "Task Force report",
    pillars: ["Protecting Canadians", "Sovereign AI foundation"],
    matches: securityMatches
  },
  {
    id: "expert-sonia-sennik-adoption",
    source: "expert-report",
    contributor: "Sonia Sennik",
    focusArea: "Adoption",
    keyIdea: "Focus adoption on measurable productivity use cases, peer-sharing networks, centres of excellence, and practical playbooks.",
    evidence: "The report draws on CDL experience and stresses KPIs, internal capability building, mentorship, and moving enterprises beyond isolated adoption efforts.",
    echoLabel: "Task Force report",
    pillars: ["Powering AI adoption"],
    matches: adoptionMatches
  },
  {
    id: "expert-sonia-sennik-trust",
    source: "expert-report",
    contributor: "Sonia Sennik",
    focusArea: "Safety and trust",
    keyIdea: "Treat trust as a strategic asset by building AI- and quantum-secure cyber resilience into emerging technologies from the start.",
    evidence: "The report argues Canada can lead at the intersection of AI, quantum, and cybersecurity with clear public-sector leadership and early customer demand.",
    echoLabel: "Task Force report",
    pillars: ["Protecting Canadians", "Sovereign AI foundation"],
    matches: trustMatches
  },
  {
    id: "expert-sonia-sennik-scaling",
    source: "expert-report",
    contributor: "Sonia Sennik",
    focusArea: "Scaling champions",
    keyIdea: "Scale Canadian ventures by pushing a global-first mindset, using Canada as a strategic customer, and reducing friction for networks, founders, and capital.",
    evidence: "The report uses CDL evidence to emphasize scarce-resource prioritization, mentorship, international customers from day one, procurement as retention, and faster program decisions.",
    echoLabel: "Task Force report",
    pillars: ["Scaling Canadian champions"],
    matches: commercializationMatches
  },
  {
    id: "expert-taylor-owen-trust",
    source: "expert-report",
    contributor: "Taylor Owen",
    focusArea: "Safety and trust",
    keyIdea: "Use existing online harms and privacy frameworks to protect citizen safety, information integrity, and democratic legitimacy in AI systems.",
    evidence: "The report proposes independent regulatory authority, AI identification and provenance disclosure, research/civil-society data access, reliable information support, child-impact assessments, and crisis protocols.",
    echoLabel: "Task Force report",
    pillars: ["Protecting Canadians", "Trusted partnerships"],
    matches: trustMatches
  }
];

export const publicIdeaLedger: ConsultationInput[] = [
  {
    id: "public-talent-national-asset",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Research and talent",
    keyIdea: "Treat AI talent as a national asset through attraction, retention, scholarships, immigration reforms, research institutions, and academia-industry-government links.",
    evidence: "The official summary says respondents strongly emphasized talent attraction, retention, compensation, scholarships, fellowships, immigration, and responsible governance.",
    echoCount: 1882,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Empowering Canadians"],
    evidenceRows: [
      {
        rowNumber: 7,
        question: "What efforts are needed to attract, develop and retain top AI talent?",
        excerpt:
          "We have this talent, but they go to America to save on costs and make business deals."
      },
      {
        rowNumber: 28,
        question: "What conditions are needed to ensure Canadian AI research remains globally competitive?",
        excerpt:
          "Investment will be absolutely critical, not only from government but also from Canadians."
      }
    ],
    matches: talentMatches
  },
  {
    id: "public-adoption-beyond-pilots",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "AI adoption",
    keyIdea: "Move beyond pilots into real-world adoption in health care, agriculture, public services, productivity, and education, while guarding against privacy, labour, and environmental harms.",
    evidence: "The summary says respondents wanted real-world adoption but warned against premature deployment and overhyped technologies.",
    echoCount: 2064,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Powering AI adoption", "Protecting Canadians"],
    evidenceRows: [
      {
        rowNumber: 49,
        question: "Where is the greatest potential for impactful AI adoption in Canada?",
        excerpt:
          "Use AI to increase productivity in government: response times, implementation, and measurable deliverables."
      },
      {
        rowNumber: 63,
        question: "Where is the greatest potential for impactful AI adoption in Canada?",
        excerpt:
          "Health care, construction, and agriculture stand out where productivity has lagged."
      }
    ],
    matches: adoptionMatches
  },
  {
    id: "public-ip-companies-canada",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Commercialization",
    keyIdea: "Keep IP, data, companies, and economic value in Canada while supporting commercialization through grants, tax credits, public funding, and investor incentives.",
    evidence: "The summary says respondents wanted Canadian ownership of IP and data, financing models that retain control, and protection for creative industries.",
    echoCount: 2024,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Scaling Canadian champions", "Sovereign AI foundation"],
    evidenceRows: [
      {
        rowNumber: 28,
        question: "What needs to be put in place so Canada can grow globally competitive AI companies?",
        excerpt:
          "Create investor tax credits and matching public dollars tied to keeping IP and headquarters in Canada."
      },
      {
        rowNumber: 63,
        question: "What needs to be put in place so Canada can grow globally competitive AI companies?",
        excerpt:
          "Create conditions where AI companies can scale here without immediately selling to foreign buyers."
      }
    ],
    matches: commercializationMatches
  },
  {
    id: "public-sustainable-scaling",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Scaling champions",
    keyIdea: "Scale domestic AI champions with tailored growth supports, mentorship, procurement, capital, and a domestic market, while staying cautious about hype and bubbles.",
    evidence: "The summary says respondents wanted tailored supports and procurement, but many warned against chasing global dominance without sovereignty, education, and safety nets.",
    echoCount: 2392,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Scaling Canadian champions"],
    evidenceRows: [
      {
        rowNumber: 28,
        question: "How does Canada get to more and stronger AI industrial champions?",
        excerpt:
          "Back founders with real capital and long-term support so companies can scale here."
      },
      {
        rowNumber: 63,
        question: "How does Canada get to more and stronger AI industrial champions?",
        excerpt:
          "Deliberately grow a handful of AI companies into true industrial champions."
      }
    ],
    matches: commercializationMatches
  },
  {
    id: "public-trust-audits-disclosure",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Safe AI and public trust",
    keyIdea: "Public trust depends on transparency, accountability, disclosure, risk-based certification, independent audits, oversight bodies, penalties, and AI literacy.",
    evidence: "The summary names certification, audits, disclosure, oversight, strict regulation, penalties, public education, and community engagement.",
    echoCount: 1279,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Protecting Canadians", "Empowering Canadians"],
    evidenceRows: [
      {
        rowNumber: 28,
        question: "How can Canada build public trust in AI technologies?",
        excerpt:
          "Public trust in AI comes from transparency, accountability, and showing real benefits."
      },
      {
        rowNumber: 73,
        question: "What frameworks, standards, regulations and norms are needed?",
        excerpt:
          "Create a Canadian standard for high-risk systems and a public registry for public-service AI."
      }
    ],
    matches: trustMatches
  },
  {
    id: "public-education-literacy-skills",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Education and skills",
    keyIdea: "Combine broad AI literacy with advanced skills through K-12 and post-secondary curricula, stackable credentials, workplace training, ethics, critical thinking, and equitable access.",
    evidence: "The summary says respondents wanted literacy across the education continuum and emphasized ethics and critical thinking over narrow technical training.",
    echoCount: 2410,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Empowering Canadians"],
    evidenceRows: [
      {
        rowNumber: 28,
        question: "What skills are required for a modern, digital economy?",
        excerpt:
          "The key skills are AI literacy, practical digital skills, and the ability to adapt."
      },
      {
        rowNumber: 63,
        question: "What skills are required for a modern, digital economy?",
        excerpt:
          "Canada needs broad digital fluency for everyone and deeper stacks for AI-focused careers."
      }
    ],
    matches: talentMatches
  },
  {
    id: "public-sovereign-sustainable-infrastructure",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Infrastructure",
    keyIdea: "Build sovereign and sustainable infrastructure: domestic compute, shared data resources, connectivity, Canadian-controlled facilities, and energy/water safeguards.",
    evidence: "The summary says respondents called for Canadian-controlled compute and data infrastructure, especially with environmental sustainability and equitable access.",
    echoCount: 2289,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Sovereign AI foundation"],
    evidenceRows: [
      {
        rowNumber: 28,
        question: "Which infrastructure gaps are holding back AI innovation in Canada?",
        excerpt:
          "The biggest gap is compute. Canadian companies need affordable, large-scale compute."
      },
      {
        rowNumber: 63,
        question: "Which infrastructure gaps are holding back AI innovation in Canada?",
        excerpt:
          "Reliable compute, domain datasets, power, and long-haul connectivity are binding constraints."
      }
    ],
    matches: infrastructureMatches
  },
  {
    id: "public-security-critical-infrastructure",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Security",
    keyIdea: "Protect critical infrastructure with AI security centres, red-team exercises, data sovereignty, supply-chain security, liability, human-in-the-loop systems, and cyber defence.",
    evidence: "The summary says respondents highlighted AI-enabled cybersecurity, national defence, red teaming, liability, and protection of data, models, and critical infrastructure.",
    echoCount: 822,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Protecting Canadians", "Sovereign AI foundation"],
    evidenceRows: [
      {
        rowNumber: 28,
        question: "How can Canada strengthen cybersecurity and safeguard critical infrastructure?",
        excerpt:
          "Adopt zero-trust policies, encryption, privacy-preserving methods, access controls, and monitoring."
      },
      {
        rowNumber: 63,
        question: "How can Canada strengthen cybersecurity and safeguard critical infrastructure?",
        excerpt:
          "Set sector-specific baselines for AI security, data provenance, and signed deployments."
      }
    ],
    matches: securityMatches
  },
  {
    id: "public-creative-indigenous-control",
    source: "public-consultation",
    contributor: "Public respondents",
    focusArea: "Creative, Indigenous, and community control",
    keyIdea: "Protect creative works and Indigenous/community control through consent, compensation, Canadian data ownership, anti-bias design, equity funding, and community governance.",
    evidence: "The summary says respondents raised unauthorized use of creative works, opt-in consent, compensation, marginalized-group underrepresentation, audits, and Indigenous/community concerns.",
    echoCount: 1837,
    echoLabel: "Raw keyword echoes in public dataset",
    pillars: ["Empowering Canadians", "Protecting Canadians", "Trusted partnerships"],
    evidenceRows: [
      {
        rowNumber: 156,
        question: "What needs to be put in place so Canada can grow globally competitive AI companies?",
        excerpt:
          "Update trademark and copyright laws; they were made for a previous time."
      },
      {
        rowNumber: 357,
        question: "What are the key barriers to AI adoption?",
        excerpt:
          "The lack of legal or regulatory frameworks around copyright and AI is a barrier."
      }
    ],
    matches: [
      { personaId: "student", themeIds: ["culture-language", "ethics-critical-thinking"] },
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "concerned-canadian", themeIds: ["my-data", "my-kids", "accountability"] },
      { personaId: "entrepreneur", themeIds: ["ip-and-data"] }
    ]
  }
];

export const consultationLedger = [...expertReportLedger, ...publicIdeaLedger];

export function getConsultationInputsForTheme(personaId: string, themeId: string) {
  return consultationLedger.filter((entry) =>
    entry.matches.some(
      (match) => match.personaId === personaId && match.themeIds.includes(themeId)
    )
  );
}
