export type SourceType =
  | "official-strategy"
  | "official-overview"
  | "consultation"
  | "comparator"
  | "commentary";

export type SourceEntry = {
  id: string;
  title: string;
  type: SourceType;
  url: string;
  section: string;
  evidence: string;
};

export const sourceLedger: SourceEntry[] = [
  {
    id: "can-strategy-pillar-1",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Pillar 1: Protecting Canadians and safeguarding our democracy",
    evidence:
      "The strategy frames trust as the foundation for adoption and names deepfakes, disinformation, sensitive personal data, public services, and democratic institutions as risk areas."
  },
  {
    id: "can-strategy-privacy-online-safety",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Strengthen Canadian democracy, safety, and privacy in the AI era",
    evidence:
      "Canada says it will modernize consumer privacy legislation, introduce online safety laws, protect elections from AI-enabled misinformation, and review the Privacy Act for government use."
  },
  {
    id: "can-strategy-safety-institute",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Ensure Canadian AI infrastructure is safe and trustworthy",
    evidence:
      "The strategy commits to funding the Canadian AI Safety Institute, AI transparency work such as watermarking, a trusted AI certification program, standards work, and fraud/cyber defence research."
  },
  {
    id: "can-strategy-health-mission",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Outcomes for Canada and priority sectors",
    evidence:
      "The strategy names health and life sciences as a priority sector and launches an AI Missions Program beginning with funding aimed at improving health outcomes."
  },
  {
    id: "can-overview-results",
    title: "Overview of Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-overview",
    url: "https://www.ised-isde.canada.ca/site/ised/en/artificial-intelligence-ecosystem/overview-canadas-national-artificial-intelligence-strategy",
    section: "Results for Canada",
    evidence:
      "The overview says the strategy should help keep Canadians, especially children, safe from AI risks and online dangers while making AI more transparent."
  },
  {
    id: "pm-launch",
    title: "Prime Minister Carney launches AI for All",
    type: "official-overview",
    url: "https://www.pm.gc.ca/en/news/news-releases/2026/06/04/prime-minister-carney-launches-ai-all-canadas-new-national-artificial",
    section: "June 4, 2026 launch",
    evidence:
      "The Prime Minister's Office says AI for All launched in Toronto on June 4, 2026, targeting $200B in growth, 250,000 AI-related jobs, 90,000 youth opportunities, and AI adoption rising to 60% by 2034."
  },
  {
    id: "can-strategy-literacy",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Pillar 2: Ensuring AI empowers Canadians",
    evidence:
      "The strategy commits to free entry-level AI training, AI learning kits, educator supports, public libraries and community organizations as AI literacy partners, and trusted AI agents for post-secondary students."
  },
  {
    id: "can-strategy-workforce",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Skills, jobs, and worker transition",
    evidence:
      "The strategy targets work placements and AI-related jobs for young Canadians, employer-led upskilling, and training for workers from mid-career professionals to frontline workers."
  },
  {
    id: "can-strategy-culture-inclusion",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Canadian identity, culture, and inclusion",
    evidence:
      "The strategy says Canadian voices, languages, communities, and knowledge should be represented in AI systems, including French-language tools, accessible AI standards, GBA Plus, and a $50M Creative Technology Program."
  },
  {
    id: "can-strategy-indigenous",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Supporting Indigenous leadership in AI",
    evidence:
      "The strategy commits to supporting Indigenous-led AI initiatives, Indigenous data training standards, community-level AI capacity, language models, land-management tools, and cultural heritage systems."
  },
  {
    id: "can-strategy-sme-adoption",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Accelerating AI adoption across Canadian SMEs",
    evidence:
      "The strategy names cost, expertise, and uncertainty as SME barriers and commits BDC LIFT financing, Regional AI Initiative expansion, AI readiness tools, and entrepreneurship supports."
  },
  {
    id: "can-strategy-missions",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "AI Missions Program",
    evidence:
      "The strategy proposes national missions in health, energy, productivity, and public services, with the first mission focused on health outcomes, diagnostics, patient care, and system efficiency."
  },
  {
    id: "can-strategy-real-economy",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Message from the minister and priority sectors",
    evidence:
      "The strategy cites Canadian AI uses in health care, farming, advanced manufacturing, auto parts, mining, energy, transportation, agriculture, manufacturing, robotics, and government services."
  },
  {
    id: "can-strategy-public-service",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Government as anchor adopter",
    evidence:
      "The strategy says the federal government will act as an anchor adopter of trusted Canadian AI, create demand for Canadian solutions, and improve public services."
  },
  {
    id: "can-strategy-sovereign-compute",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Pillar 4: Building the Canadian sovereign AI foundation",
    evidence:
      "The strategy frames compute, cloud, connectivity, data, and talent as sovereign AI foundations, including a public AI supercomputer and sovereign compute and cloud infrastructure."
  },
  {
    id: "can-strategy-data",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Data as a strategic asset",
    evidence:
      "The strategy treats data as a strategic national asset and discusses trusted data access, sensitive data safeguards, and data use in priority sectors such as health."
  },
  {
    id: "can-strategy-capital",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Pillar 5: Scaling Canadian champions",
    evidence:
      "The strategy says Canada will improve access to growth capital, use government procurement as an anchor customer, and support Canadian AI firms with compute, commercialization resources, and IP protections."
  },
  {
    id: "can-strategy-commercialization",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Commercialization, compute, and IP",
    evidence:
      "The strategy includes additional affordable sovereign compute for SMEs, National AI Institute commercialization programs, Founders-in-Residence, and IP supports through Elevate IP and IP Assist."
  },
  {
    id: "can-strategy-foundation-models",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Championing foundation models",
    evidence:
      "The strategy treats Canadian foundation models as strategic assets, citing trusted alternatives, enterprise and government security needs, and safe-by-design research."
  },
  {
    id: "can-strategy-partnerships",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Pillar 6: Trusted partnerships and global alliances",
    evidence:
      "The strategy describes the Sovereign Technology Alliance, trusted partner procurement opportunities, international AI partnerships, shared evaluation standards, and market access for Canadian firms."
  },
  {
    id: "can-strategy-open-source",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    type: "official-strategy",
    url: "https://www.ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all",
    section: "Advancing open-source AI for resilience and choice",
    evidence:
      "The strategy says open-source AI can reduce costs, increase flexibility, support local adaptation, reduce vendor lock-in, and help SMEs, nonprofits, and public-interest innovators."
  },
  {
    id: "consultation-summary-trust",
    title: "Engagements on Canada's next AI Strategy: Summary of inputs",
    type: "consultation",
    url: "https://ised-isde.canada.ca/site/ised/en/public-consultations/engagements-canadas-next-ai-strategy-summary-inputs",
    section: "Safe AI systems and public trust",
    evidence:
      "Respondents called for transparency, accountability, risk-based certification, independent audits, disclosure of AI use, strict regulation, and penalties for non-compliance."
  },
  {
    id: "consultation-infrastructure",
    title: "Engagements on Canada's next AI Strategy: Summary of inputs",
    type: "consultation",
    url: "https://ised-isde.canada.ca/site/ised/en/public-consultations/engagements-canadas-next-ai-strategy-summary-inputs",
    section: "Infrastructure",
    evidence:
      "Respondents emphasized sovereign compute and Canadian-controlled infrastructure, while also raising energy and water concerns around data centres."
  },
  {
    id: "consultation-skills-adoption",
    title: "Engagements on Canada's next AI Strategy: Summary of inputs",
    type: "consultation",
    url: "https://ised-isde.canada.ca/site/ised/en/public-consultations/engagements-canadas-next-ai-strategy-summary-inputs",
    section: "Conclusion and next steps",
    evidence:
      "Participants emphasized AI talent as a national asset, AI literacy, micro-credentials, lifelong learning, ethical standards, and moving adoption beyond pilots into health care, agriculture, and public services."
  },
  {
    id: "consultation-commercialization",
    title: "Engagements on Canada's next AI Strategy: Summary of inputs",
    type: "consultation",
    url: "https://ised-isde.canada.ca/site/ised/en/public-consultations/engagements-canadas-next-ai-strategy-summary-inputs",
    section: "Commercialization and champions",
    evidence:
      "Participants called for Canadian IP and data sovereignty protections, tailored growth supports, mentorship, procurement programs, and growth capital for domestic AI champions."
  },
  {
    id: "eu-ai-act-transparency",
    title: "European Commission: AI Act",
    type: "comparator",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    section: "Risk-based approach and transparency risk",
    evidence:
      "The EU AI Act creates a binding risk-based legal framework, including disclosure duties for chatbots and labeling duties for certain AI-generated content and deepfakes."
  },
  {
    id: "eu-ai-act-high-risk",
    title: "European Commission: AI Act",
    type: "comparator",
    url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
    section: "High risk",
    evidence:
      "The EU model places strict obligations on high-risk systems, including risk mitigation, data quality, logging, documentation, human oversight, robustness, cybersecurity, and accuracy."
  },
  {
    id: "eu-ai-act-gpai-copyright",
    title: "European Commission: General-purpose AI obligations under the AI Act",
    type: "comparator",
    url: "https://digital-strategy.ec.europa.eu/en/factpages/general-purpose-ai-obligations-under-ai-act",
    section: "Transparency and copyright",
    evidence:
      "The EU requires general-purpose AI model providers to publish summaries of model training content and address copyright-related obligations."
  },
  {
    id: "singapore-nais",
    title: "Singapore National AI Strategy 2.0",
    type: "comparator",
    url: "https://file.go.gov.sg/nais2023.pdf",
    section: "Infrastructure and Environment",
    evidence:
      "Singapore's strategy pairs AI ambition with national systems for activity drivers, talent, trusted environment, compute, and data."
  },
  {
    id: "singapore-governance-playbook",
    title: "Singapore Gen AI and Digital FOSS AI Governance Playbook",
    type: "comparator",
    url: "https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2024/gen-ai-and-digital-foss-ai-governance-playbook",
    section: "Governance playbook",
    evidence:
      "Singapore emphasizes practical governance tools and playbooks that help organizations operationalize responsible AI."
  },
  {
    id: "uk-pro-innovation-ai",
    title: "UK AI regulation: a pro-innovation approach",
    type: "comparator",
    url: "https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach",
    section: "Regulator-led framework",
    evidence:
      "The UK model relies on existing sector regulators and cross-cutting principles rather than a single horizontal AI law."
  },
  {
    id: "us-nist-ai-rmf",
    title: "NIST AI Risk Management Framework",
    type: "comparator",
    url: "https://www.nist.gov/itl/ai-risk-management-framework",
    section: "Trustworthy AI risk management",
    evidence:
      "NIST provides a voluntary risk-management framework for mapping, measuring, managing, and governing AI risks."
  },
  {
    id: "us-omb-ai-governance",
    title: "OMB government-wide AI governance policy",
    type: "comparator",
    url: "https://www.whitehouse.gov/wp-content/uploads/2024/03/M-24-10-Advancing-Governance-Innovation-and-Risk-Management-for-Agency-Use-of-Artificial-Intelligence.pdf",
    section: "Federal agency AI use",
    evidence:
      "The U.S. federal approach sets agency-level requirements for governance, innovation, and risk management in government AI use."
  },
  {
    id: "australia-ai-safety-standard",
    title: "Australia Voluntary AI Safety Standard",
    type: "comparator",
    url: "https://www.industry.gov.au/publications/voluntary-ai-safety-standard",
    section: "AI guardrails",
    evidence:
      "Australia's voluntary safety standard translates responsible AI into organizational guardrails such as accountability, transparency, human oversight, and contestability."
  },
  {
    id: "japan-ai-business-guidelines",
    title: "Japan AI Guidelines for Business",
    type: "comparator",
    url: "https://www.meti.go.jp/english/press/2024/0419_002.html",
    section: "Business AI governance",
    evidence:
      "Japan's guidelines give companies lifecycle-oriented governance guidance while preserving an innovation-friendly approach."
  },
  {
    id: "france-ai-strategy",
    title: "France national strategy for artificial intelligence",
    type: "comparator",
    url: "https://www.entreprises.gouv.fr/fr/numerique/enjeux/la-strategie-nationale-pour-l-ia",
    section: "France 2030 and national AI strategy",
    evidence:
      "France frames AI through research strength, industrial policy, strategic sectors, talent, infrastructure, and national champions."
  },
  {
    id: "south-korea-ai-basic-act",
    title: "South Korea AI Basic Act",
    type: "comparator",
    url: "https://www.trade.gov/market-intelligence/south-korea-ai-basic-act",
    section: "AI law and industrial development",
    evidence:
      "South Korea's AI Basic Act combines AI industrial promotion with baseline obligations for trust, safety, transparency, and user protection."
  },
  {
    id: "india-ai-mission",
    title: "IndiaAI Mission",
    type: "comparator",
    url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2012375",
    section: "Compute, datasets, skills, startups, and public-good AI",
    evidence:
      "IndiaAI Mission focuses on compute access, datasets, skills, innovation financing, startups, and AI applications for public benefit."
  },
  {
    id: "sweden-ai-strategy",
    title: "Sweden's AI Strategy",
    type: "comparator",
    url: "https://www.government.se/information-material/2026/02/swedens-ai-strategy/",
    section: "Public administration, infrastructure, and responsible AI",
    evidence:
      "Sweden's strategy emphasizes responsible AI, public administration, research, language models, secure infrastructure, and energy-aware competitiveness."
  },
  {
    id: "norway-ai-strategy",
    title: "Norway National Strategy for Artificial Intelligence",
    type: "comparator",
    url: "https://www.regjeringen.no/en/documents/nasjonal-strategi-for-kunstig-intelligens/id2685594/",
    section: "Data, language, infrastructure, and public-sector AI",
    evidence:
      "Norway's strategy connects AI with data resources, language resources, infrastructure, responsible use, and public-sector modernization."
  },
  {
    id: "finland-auroraai",
    title: "Finland AuroraAI programme",
    type: "comparator",
    url: "https://valtioneuvosto.fi/en/-/10623/the-auroraai-national-artificial-intelligence-programme-begins-with-the-aim-of-using-artificial-intelligence-to-bring-people-and-services-together-in-a-better-way",
    section: "Life-event public services",
    evidence:
      "Finland's AuroraAI programme is useful as a public-service comparator because it aims to connect people with services around life events."
  },
  {
    id: "china-generative-ai-measures",
    title: "China generative AI measures",
    type: "comparator",
    url: "https://www.loc.gov/item/global-legal-monitor/2023-07-18/china-generative-ai-measures-finalized/",
    section: "Public-facing generative AI services",
    evidence:
      "China's generative AI rules are useful as a contrast case for state control, public-facing GenAI services, content governance, and provider responsibility."
  },
  {
    id: "oecd-ai-principles",
    title: "OECD AI Principles",
    type: "comparator",
    url: "https://www.oecd.org/en/topics/ai-principles.html",
    section: "International trustworthy AI baseline",
    evidence:
      "The OECD AI Principles provide an international baseline around inclusive growth, human rights, transparency, robustness, accountability, and responsible stewardship."
  },
  {
    id: "unesco-ai-ethics",
    title: "UNESCO Recommendation on the Ethics of Artificial Intelligence",
    type: "comparator",
    url: "https://www.unesco.org/en/articles/recommendation-ethics-artificial-intelligence?hub=66973",
    section: "Human rights, culture, education, environment, and social wellbeing",
    evidence:
      "UNESCO's recommendation is useful for cultural, educational, environmental, gender, human-rights, and social-wellbeing dimensions of AI governance."
  },
  {
    id: "g7-hiroshima-ai-process",
    title: "G7 Hiroshima AI Process",
    type: "comparator",
    url: "https://transparency.oecd.ai/",
    section: "Advanced AI transparency and voluntary code reporting",
    evidence:
      "The G7 Hiroshima AI Process provides an international voluntary-code and reporting frame for advanced AI developers."
  },
  {
    id: "colorado-ai-act",
    title: "Colorado Consumer Protections for Artificial Intelligence",
    type: "comparator",
    url: "https://leg.colorado.gov/bills/sb24-205",
    section: "High-risk AI and consequential decisions",
    evidence:
      "Colorado's AI Act is a useful state-level comparator for consequential decisions, algorithmic discrimination, documentation, and consumer rights."
  },
  {
    id: "nyc-aedt-law",
    title: "New York City Automated Employment Decision Tools law",
    type: "comparator",
    url: "https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page",
    section: "Hiring tools, bias audits, and candidate notice",
    evidence:
      "New York City's AEDT law is a narrow but concrete comparator for workplace AI, hiring tools, bias audits, and notice requirements."
  },
  {
    id: "geist-details",
    title: "Michael Geist: AI for All, Details to Follow",
    type: "commentary",
    url: "https://www.michaelgeist.ca/2026/06/ai-for-all-details-to-follow-government-releases-a-big-spending-ai-strategy-that-is-still-short-on-the-specifics-that-matter/",
    section: "Opinion",
    evidence:
      "Commentary highlights the strategy's ambition and spending while questioning whether the details on privacy, regulation, and implementation are specific enough."
  },
  {
    id: "betakit-lacks-teeth",
    title: "BetaKit: Canada's AI strategy promises to protect citizens, critics say it still lacks teeth",
    type: "commentary",
    url: "https://betakit.com/canadas-ai-strategy-promises-to-protect-citizens-critics-say-it-still-lacks-teeth/",
    section: "News analysis",
    evidence:
      "Commentary captures criticism that the strategy speaks strongly about protection but still leaves questions about enforceable obligations and regulatory teeth."
  }
];

export function getSources(ids: string[]) {
  return ids
    .map((id) => sourceLedger.find((entry) => entry.id === id))
    .filter((entry): entry is SourceEntry => Boolean(entry));
}
