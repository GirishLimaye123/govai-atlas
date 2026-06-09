export type ActionForce = "Law" | "Money" | "Promise" | "Still open";

export type ActionMatch = {
  personaId: string;
  themeIds: string[];
};

export type PolicyAction = {
  id: string;
  pillar: string;
  sourceSection: string;
  summary: string;
  forces: ActionForce[];
  sourceUrl: string;
  matches: ActionMatch[];
};

export type ActionForceCounts = Record<ActionForce, number>;

const strategyUrl =
  "https://ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all";

const keyActionUrl = (summary: string) =>
  `${strategyUrl}#:~:text=${encodeURIComponent(summary)}`;

const action = (
  id: string,
  pillar: string,
  sourceSection: string,
  summary: string,
  forces: ActionForce[],
  matches: ActionMatch[]
): PolicyAction => ({
  id,
  pillar,
  sourceSection,
  summary,
  forces,
  sourceUrl: keyActionUrl(summary),
  matches
});

export const actionLedger: PolicyAction[] = [
  action(
    "act-001",
    "Pillar 1",
    "Democracy, safety, and privacy",
    "Canada will modernize consumer privacy legislation to enshrine a fundamental right to privacy, safeguard children’s information from exploitation and harm, and strengthen people’s control over their personal data.",
    ["Law", "Promise", "Still open"],
    [
      { personaId: "concerned-canadian", themeIds: ["my-data", "my-kids"] },
      { personaId: "small-business", themeIds: ["customer-trust"] },
      { personaId: "future-canada", themeIds: ["who-benefits"] }
    ]
  ),
  action(
    "act-002",
    "Pillar 1",
    "Democracy, safety, and privacy",
    "Canada will introduce online safety laws to protect Canadians in the digital age, ensuring citizens, children, and customers are safeguarded.",
    ["Law", "Promise", "Still open"],
    [
      { personaId: "concerned-canadian", themeIds: ["deepfakes", "my-kids"] },
      { personaId: "small-business", themeIds: ["customer-trust"] }
    ]
  ),
  action(
    "act-003",
    "Pillar 1",
    "Democracy, safety, and privacy",
    "Canada will protect elections and democratic institutions from AI‑enabled misinformation and foreign interference.",
    ["Law", "Promise", "Still open"],
    [
      { personaId: "concerned-canadian", themeIds: ["whats-real", "deepfakes"] },
      { personaId: "future-canada", themeIds: ["who-benefits"] }
    ]
  ),
  action(
    "act-004",
    "Pillar 1",
    "Democracy, safety, and privacy",
    "For the Government’s own use of personal information, the Government will continue its review of the Privacy Act to meets the needs of Canadians in the digital age. This will include considerations around transparency, privacy, and alignment with international standards.",
    ["Law", "Promise", "Still open"],
    [
      { personaId: "concerned-canadian", themeIds: ["my-data", "public-services"] },
      { personaId: "workplace-adopter", themeIds: ["public-servant"] },
      { personaId: "future-canada", themeIds: ["public-services"] }
    ]
  ),
  action(
    "act-005",
    "Pillar 1",
    "Safe and trustworthy AI infrastructure",
    "Canada will invest $50 million to expand the capabilities of the Canadian AI Safety Institute to track emerging AI risks, advance technical research, and to conduct transparent evaluations of AI models.",
    ["Money", "Promise"],
    [
      { personaId: "concerned-canadian", themeIds: ["whats-real", "accountability"] },
      { personaId: "entrepreneur", themeIds: ["government-customer"] },
      { personaId: "future-canada", themeIds: ["big-promise"] }
    ]
  ),
  action(
    "act-006",
    "Pillar 1",
    "Safe and trustworthy AI infrastructure",
    "Canada will work on AI transparency, including capabilities like watermarking of AI-generated content, so Canadians can better understand when they are interacting with AI systems and AI-generated content.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "concerned-canadian", themeIds: ["whats-real", "deepfakes"] },
      { personaId: "small-business", themeIds: ["customer-trust"] }
    ]
  ),
  action(
    "act-007",
    "Pillar 1",
    "Safe and trustworthy AI infrastructure",
    "Canada will proactively work with frontier AI companies and international partners, leveraging our strengths in AI safety and cybersecurity, to ensure that Canadians and critical systems are protected from cyber and national security threats from advanced AI systems.",
    ["Promise", "Still open"],
    [
      { personaId: "concerned-canadian", themeIds: ["canadian-control", "accountability"] },
      { personaId: "entrepreneur", themeIds: ["global-markets"] },
      { personaId: "future-canada", themeIds: ["who-benefits"] }
    ]
  ),
  action(
    "act-008",
    "Pillar 1",
    "Safe and trustworthy AI infrastructure",
    "Canada will create a Canada Trusted AI Certification program to help Canadians identify trustworthy AI products in the marketplace.",
    ["Promise", "Still open"],
    [
      { personaId: "small-business", themeIds: ["customer-trust"] },
      { personaId: "concerned-canadian", themeIds: ["accountability"] },
      { personaId: "entrepreneur", themeIds: ["government-customer"] }
    ]
  ),
  action(
    "act-009",
    "Pillar 1",
    "Safe and trustworthy AI infrastructure",
    "Canada will renew funding for the Standards Council of Canada’s AI Program to support our standardization ecosystem, shape global AI standards, and grow a robust AI quality assurance ecosystem. This work will enable standards-based AI testing, certification, interoperability, and global market access.",
    ["Money", "Promise"],
    [
      { personaId: "small-business", themeIds: ["customer-trust"] },
      { personaId: "workplace-adopter", themeIds: ["accountable-workflows"] },
      { personaId: "entrepreneur", themeIds: ["government-customer", "global-markets"] }
    ]
  ),
  action(
    "act-010",
    "Pillar 1",
    "Safe and trustworthy AI infrastructure",
    "Canada will accelerate, in partnership with law enforcement and security and intelligence agencies, applied AI research, testing, and deployment of Canadian technologies for fraud and extortion prevention, cyber defence, threat detection, and data protection.",
    ["Money", "Promise"],
    [
      { personaId: "concerned-canadian", themeIds: ["deepfakes", "accountability"] },
      { personaId: "future-canada", themeIds: ["public-services"] }
    ]
  ),
  action(
    "act-011",
    "Pillar 2",
    "Foundational AI literacy",
    "Canada will create a National AI Literacy Initiative that will offer entry-level AI training accessible to all Canadians.",
    ["Money", "Promise"],
    [
      { personaId: "student", themeIds: ["what-to-learn-first"] },
      { personaId: "workplace-adopter", themeIds: ["training-upskilling"] },
      { personaId: "future-canada", themeIds: ["jobs-wages"] }
    ]
  ),
  action(
    "act-012",
    "Pillar 2",
    "Foundational AI literacy",
    "AI literacy content will reach 1 million entry level post-secondary students and train more than 3,000 educators with AI learning kits in their classrooms. Free, accessible AI learning will include practical courses and sector-relevant modules.",
    ["Money", "Promise"],
    [{ personaId: "student", themeIds: ["what-to-learn-first", "trusted-ai-agents"] }]
  ),
  action(
    "act-013",
    "Pillar 2",
    "Foundational AI literacy",
    "Canada will ensure all post-secondary students have access to trusted AI agents, putting capable, personal AI tools in the hands of the next generation of Canadian workers, researchers, and innovators.",
    ["Promise", "Still open"],
    [{ personaId: "student", themeIds: ["trusted-ai-agents", "ethics-critical-thinking"] }]
  ),
  action(
    "act-014",
    "Pillar 2",
    "Foundational AI literacy",
    "Through the National AI Literacy initiative, Canada will empower public libraries and community organizations, long trusted as hubs for learning, as natural partners to bring AI literacy initiatives into every community, especially those in rural, remote, and northern regions.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "student", themeIds: ["what-to-learn-first"] }
    ]
  ),
  action(
    "act-015",
    "Pillar 2",
    "Foundational AI literacy",
    "Canada is investing $50 million over five years through Budget 2025 to modernize the Job Bank with AI-powered job matching that automatically aligns people with opportunities matching their skills profiles and has launched a national online training platform connecting adults to free and low-cost short-duration courses, including sector-specific AI literacy skills.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "workplace-adopter", themeIds: ["training-upskilling"] },
      { personaId: "student", themeIds: ["jobs-placements"] },
      { personaId: "future-canada", themeIds: ["jobs-wages"] }
    ]
  ),
  action(
    "act-016",
    "Pillar 2",
    "Foundational AI literacy",
    "Canada will invest $30 million in CanCode to fund not-for-profit organizations to deliver free digital skills training — including coding, AI, and emerging technologies — to youth from kindergarten to grade 12 and their educators, with emphasis on reaching underrepresented groups.",
    ["Money", "Promise"],
    [
      { personaId: "student", themeIds: ["what-to-learn-first"] },
      { personaId: "future-canada", themeIds: ["jobs-wages"] }
    ]
  ),
  action(
    "act-017",
    "Pillar 2",
    "Applied workforce skills",
    "Canada will create up to 90,000 AI-related job opportunities, including 45,000 through the Student Work Placement Program and Canada Summer Jobs, and 35,000 through other initiatives such as the Skills for Success Program, and 10,000 through the Mitacs ADOPT and AI+X programs.",
    ["Money", "Promise"],
    [
      { personaId: "student", themeIds: ["jobs-placements"] },
      { personaId: "future-canada", themeIds: ["jobs-wages"] },
      { personaId: "workplace-adopter", themeIds: ["training-upskilling"] }
    ]
  ),
  action(
    "act-018",
    "Pillar 2",
    "Applied workforce skills",
    "Canada will assess training and upskill offerings for mid-career workers, including in skilled trades, to scale-up employer-led training nationwide with a strong priority on AI-related skills. This will also include work with Colleges, CÉGEPs and Polytechnics as applied AI leaders to leverage regional reach, applied research capacity, and SME partnerships to deliver hands-on adoption and improve workforce productivity.",
    ["Promise", "Still open"],
    [{ personaId: "workplace-adopter", themeIds: ["training-upskilling", "will-ai-replace-me"] }]
  ),
  action(
    "act-019",
    "Pillar 2",
    "Applied workforce skills",
    "Canada will accelerate AI adoption across female-dominated sectors most exposed to early disruption through the existing Women’s Program — unlocking new economic opportunities, softening transition shocks, and confronting AI-fueled online abuse that disproportionately targets women.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "workplace-adopter", themeIds: ["will-ai-replace-me"] },
      { personaId: "future-canada", themeIds: ["who-benefits", "jobs-wages"] }
    ]
  ),
  action(
    "act-020",
    "Pillar 2",
    "Applied workforce skills",
    "Canada will track and assess the societal, labour market, and economic impacts of AI to guide policy and maximize benefits, leveraging Statistics Canada’s Artificial Intelligence and Technology Measurement Program.",
    ["Money", "Promise"],
    [
      { personaId: "future-canada", themeIds: ["big-promise", "jobs-wages"] },
      { personaId: "workplace-adopter", themeIds: ["will-ai-replace-me"] },
      { personaId: "concerned-canadian", themeIds: ["accountability"] }
    ]
  ),
  action(
    "act-021",
    "Pillar 2",
    "Indigenous leadership in AI",
    "Canada will support and amplify Indigenous-led AI initiatives that reinforce cultural expression and linguistic vitality in Canada and around the world, building on existing efforts such as the Indigenous Languages Program at Canadian Heritage, the Indigenous Languages Technology Program at the National Research Council, and First Languages AI Reality at Mila.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "student", themeIds: ["culture-language"] },
      { personaId: "concerned-canadian", themeIds: ["canadian-control"] }
    ]
  ),
  action(
    "act-022",
    "Pillar 2",
    "Canadian identity, culture, and inclusion",
    "Canada will work on the adoption of tools that protect and promote the French language, including in Québec and in Canada’s vibrant Francophone minority communities. Critically, AI systems deployed within the government will perform equally well in both official languages.",
    ["Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "student", themeIds: ["culture-language"] },
      { personaId: "workplace-adopter", themeIds: ["public-servant"] }
    ]
  ),
  action(
    "act-023",
    "Pillar 2",
    "Canadian identity, culture, and inclusion",
    "Canada will establish a $50 million Creative Technology Program to support Canadian creators in using AI on their own terms.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "student", themeIds: ["culture-language"] }
    ]
  ),
  action(
    "act-024",
    "Pillar 2",
    "Canadian identity, culture, and inclusion",
    "Canada will promote the world’s first AI equity-based national standard on accessible AI to drive inclusive and accessible AI and remove accessibility barriers from AI systems, and ensure Canadian AI reflects the Accessible Canada Act principles.",
    ["Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "concerned-canadian", themeIds: ["accountability"] },
      { personaId: "student", themeIds: ["culture-language"] }
    ]
  ),
  action(
    "act-025",
    "Pillar 2",
    "Canadian identity, culture, and inclusion",
    "The Government of Canada commits to applying Gender-Based Analysis Plus in a meaningful way across policy design, skills development, innovation, and governance to ensure that AI reflects our values, protects those most impacted, and leads to outcomes that are safe, inclusive, and beneficial for all Canadians.",
    ["Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["who-benefits"] },
      { personaId: "workplace-adopter", themeIds: ["will-ai-replace-me"] },
      { personaId: "concerned-canadian", themeIds: ["accountability"] }
    ]
  ),
  action(
    "act-026",
    "Pillar 3",
    "SME adoption",
    "Canada will utilize the LIFT program, a $500 million initiative from the Business Development Bank of Canada (BDC) to help Canadian SMEs access financing to incorporate AI tools in their operations.",
    ["Money", "Promise"],
    [{ personaId: "small-business", themeIds: ["can-i-afford-it", "where-to-start"] }]
  ),
  action(
    "act-027",
    "Pillar 3",
    "SME adoption",
    "Canada will invest $500 million to expand and enhance the Regional Artificial Intelligence Initiative delivered through Regional Development Agencies to accelerate adoption and commercialization of AI across the country.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "small-business", themeIds: ["can-i-afford-it", "sector-opportunity"] },
      { personaId: "entrepreneur", themeIds: ["capital-growth"] },
      { personaId: "future-canada", themeIds: ["real-economy"] }
    ]
  ),
  action(
    "act-028",
    "Pillar 3",
    "SME adoption",
    "Canada will support the development of an AI Literacy and Adoption Assessment tool and other online resources that help SMEs and entrepreneurs assess their AI readiness, identify practical use cases, understand potential business impacts in a low-risk environment, and connect with critical programs and development agencies.",
    ["Promise", "Still open"],
    [
      { personaId: "small-business", themeIds: ["where-to-start", "customer-trust"] },
      { personaId: "workplace-adopter", themeIds: ["daily-work"] }
    ]
  ),
  action(
    "act-029",
    "Pillar 3",
    "SME adoption",
    "Canada will provide targeted support to strengthen AI adoption among Canadian entrepreneurs through the Small Business and Entrepreneurship Development Program.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "small-business", themeIds: ["can-i-afford-it"] },
      { personaId: "entrepreneur", themeIds: ["capital-growth"] }
    ]
  ),
  action(
    "act-030",
    "Pillar 3",
    "SME adoption",
    "Canada will leverage the SR&ED tax credit and the Productivity Super-Deduction announced in Budget 2025 to catalyze private sector investment and make innovation more affordable.",
    ["Money", "Promise"],
    [
      { personaId: "small-business", themeIds: ["can-i-afford-it"] },
      { personaId: "entrepreneur", themeIds: ["capital-growth"] }
    ]
  ),
  action(
    "act-031",
    "Pillar 3",
    "AI missions",
    "Canada will launch a new AI Missions Program to advance targeted, high-impact projects that deliver significant public good and demonstrate meaningful improvements in Canadians' lives. The first mission will commit $200 million to improving health outcomes for Canadians. More missions will follow in other priority sectors.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["health-care", "public-services"] },
      { personaId: "concerned-canadian", themeIds: ["public-services"] },
      { personaId: "entrepreneur", themeIds: ["government-customer"] }
    ]
  ),
  action(
    "act-032",
    "Pillar 3",
    "AI missions",
    "Canada will launch sector-specific Workforce Alliances across six priority sectors to bring together governments, employers, unions, post-secondary institutions, and Indigenous partners to identify skills gaps, coordinate talent pipelines, and align public-private investment with workforce transformation needs across essential economic sectors.",
    ["Promise", "Still open"],
    [
      { personaId: "workplace-adopter", themeIds: ["training-upskilling"] },
      { personaId: "future-canada", themeIds: ["jobs-wages", "real-economy"] },
      { personaId: "small-business", themeIds: ["sector-opportunity"] }
    ]
  ),
  action(
    "act-033",
    "Pillar 3",
    "Public service delivery",
    "Canada will accelerate the procurement and delivery of AI solutions across the federal government through the Office of Digital Transformation.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "workplace-adopter", themeIds: ["public-servant"] },
      { personaId: "entrepreneur", themeIds: ["government-customer"] },
      { personaId: "future-canada", themeIds: ["public-services"] }
    ]
  ),
  action(
    "act-034",
    "Pillar 3",
    "Public service delivery",
    "Canada will launch the Prime Minister’s Innovation Fellows Program to recruit and deploy technical talent that rapidly builds the internal muscle, operational capacity, and commercial fluency required to procure, evaluate, and deploy AI systems effectively within government.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "workplace-adopter", themeIds: ["public-servant"] },
      { personaId: "entrepreneur", themeIds: ["government-customer"] },
      { personaId: "future-canada", themeIds: ["public-services"] }
    ]
  ),
  action(
    "act-035",
    "Pillar 4",
    "Sovereign compute, cloud, and connectivity",
    "Canada will build a world-leading public supercomputer, giving Canadian researchers and SMEs access to secure, sovereign, high-performance compute for cutting-edge public and industry-driven innovation.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["compute-access"] },
      { personaId: "small-business", themeIds: ["can-i-afford-it", "open-source-choice"] },
      { personaId: "future-canada", themeIds: ["real-economy"] }
    ]
  ),
  action(
    "act-036",
    "Pillar 4",
    "Sovereign compute, cloud, and connectivity",
    "Canada will leverage government and industrial AI workloads and crowd-in private capital to significantly expand sovereign compute and cloud infrastructure. This will support the construction of large‑scale AI data centres that can scale to at least 100 megawatts (MW), and that are designed to serve a broad spectrum of Canadian clients. These partnerships are being finalized, and have proposed providing 850 MW of compute capacity by 2030, with scaling capacity of up to 2.3 GW with corresponding investments in the tens of billions.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "concerned-canadian", themeIds: ["canadian-control", "environment"] },
      { personaId: "entrepreneur", themeIds: ["compute-access"] },
      { personaId: "future-canada", themeIds: ["real-economy"] }
    ]
  ),
  action(
    "act-037",
    "Pillar 4",
    "Sovereign compute, cloud, and connectivity",
    "Canada will expand diverse high-capacity fibre lines and satellite connectivity, resulting in resilient network infrastructure with sovereign capabilities.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["real-economy", "who-benefits"] },
      { personaId: "small-business", themeIds: ["sector-opportunity"] }
    ]
  ),
  action(
    "act-038",
    "Pillar 4",
    "Sovereign compute, cloud, and connectivity",
    "Canada will further enhance and secure its chip design and fabrication capabilities, building on the recent announcement to spin off the National Research Council’s Photonics Fabrication Centre.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["compute-access"] },
      { personaId: "future-canada", themeIds: ["real-economy"] }
    ]
  ),
  action(
    "act-039",
    "Pillar 4",
    "Sovereign compute, cloud, and connectivity",
    "Canada will invest to build and reinforce secure digital systems used for Government operations, including sovereign cloud, AI, cyber and quantum initiatives.",
    ["Money", "Promise"],
    [
      { personaId: "concerned-canadian", themeIds: ["canadian-control", "accountability"] },
      { personaId: "workplace-adopter", themeIds: ["public-servant"] },
      { personaId: "future-canada", themeIds: ["public-services"] }
    ]
  ),
  action(
    "act-040",
    "Pillar 4",
    "Data",
    "Canada will invest $100 million to launch the Health Sector Data Space, in partnership with the Canadian Institute for Health Information (CIHI), to link secure, private and standardized datasets to strengthen clinical trials, health services research and performance measurements.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["health-care"] },
      { personaId: "concerned-canadian", themeIds: ["my-data", "public-services"] },
      { personaId: "entrepreneur", themeIds: ["ip-and-data"] }
    ]
  ),
  action(
    "act-041",
    "Pillar 4",
    "Data",
    "Canada will also invest $100 million to expand VITAL in five additional provinces, supporting its ability to leverage clinical data from hospitals and enable health data innovation that reduces mortality rates and accelerates critical care for Canadians.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "future-canada", themeIds: ["health-care"] },
      { personaId: "concerned-canadian", themeIds: ["public-services"] }
    ]
  ),
  action(
    "act-042",
    "Pillar 4",
    "Research talent",
    "Canada will strengthen our network of national AI institutes and increase the Canada CIFAR AI Chairs program from 130 to nearly 200 researchers. This means more world-class AI talent working in Canada, more ideas moving from research labs into businesses and public services, and more support to help Canadians understand and use AI.",
    ["Money", "Promise"],
    [
      { personaId: "student", themeIds: ["jobs-placements", "what-to-learn-first"] },
      { personaId: "entrepreneur", themeIds: ["capital-growth"] },
      { personaId: "future-canada", themeIds: ["big-promise"] }
    ]
  ),
  action(
    "act-043",
    "Pillar 4",
    "Research talent",
    "Canada will expand the Global Talent Stream to accelerate entry and onboarding of highly-skilled AI workers, and align measures for permanent residency to retain the talent Canada recruits.",
    ["Law", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["global-markets", "capital-growth"] },
      { personaId: "student", themeIds: ["jobs-placements"] },
      { personaId: "future-canada", themeIds: ["jobs-wages"] }
    ]
  ),
  action(
    "act-044",
    "Pillar 5",
    "Investment flywheel",
    "Canada will establish a $500 million Canadian Tech Growth Fund to help close the scale-up capital gap facing Canada’s most promising AI companies. The Fund will provide flexible growth capital and investment support, and enable the federal government, at times, to take equity stakes in the most promising Canadian AI firms. This will help them attract private capital, compete globally, retain talent and intellectual property, and remain anchored in Canada. Where appropriate, Canada will leverage its recently announced Sovereign Wealth Fund to further support emerging national champions.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["capital-growth"] },
      { personaId: "future-canada", themeIds: ["big-promise"] }
    ]
  ),
  action(
    "act-045",
    "Pillar 5",
    "Investment flywheel",
    "By Budget 2026, the Department of Finance will work with experts to explore mechanisms that encourage Canadians to reinvest gains earned from successful tech companies into new Canadian AI startups.",
    ["Promise", "Still open"],
    [{ personaId: "entrepreneur", themeIds: ["capital-growth"] }]
  ),
  action(
    "act-046",
    "Pillar 5",
    "Investment flywheel",
    "Canada will also leverage $1.75 billion of federal investments and commitments announced in Budget 2025 to stimulate private sector investment in venture capital and address access to capital gaps for innovative companies, including those in AI.",
    ["Money", "Promise"],
    [{ personaId: "entrepreneur", themeIds: ["capital-growth"] }]
  ),
  action(
    "act-047",
    "Pillar 5",
    "Investment flywheel",
    "Canada will establish the federal government as a strategic anchor customer and leverage the Buy Canadian policy to provide domestic scale-ups with the revenue and validation they need to successfully export their solutions globally.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["government-customer"] },
      { personaId: "workplace-adopter", themeIds: ["public-servant"] },
      { personaId: "future-canada", themeIds: ["public-services"] }
    ]
  ),
  action(
    "act-048",
    "Pillar 5",
    "SME commercialization",
    "Canada will provide Canadian SMEs with an additional $700 million in affordable sovereign compute through an expansion of the Compute Access Fund.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["compute-access"] },
      { personaId: "small-business", themeIds: ["can-i-afford-it", "open-source-choice"] }
    ]
  ),
  action(
    "act-049",
    "Pillar 5",
    "SME commercialization",
    "Canada will invest $130 million for commercialization programs across the National AI Institutes, including for Founders-in-Residence, to cultivate a new generation of AI entrepreneurs.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["capital-growth"] },
      { personaId: "student", themeIds: ["jobs-placements"] }
    ]
  ),
  action(
    "act-050",
    "Pillar 5",
    "SME commercialization",
    "Canada will assess the full continuum of innovation programs to better align existing innovation instruments so that the path from research to market is shorter, clearer, and built around the needs of Canadian entrepreneurs.",
    ["Promise", "Still open"],
    [{ personaId: "entrepreneur", themeIds: ["capital-growth", "government-customer"] }]
  ),
  action(
    "act-051",
    "Pillar 5",
    "SME commercialization",
    "Canada will leverage $159 million invested in Budget 2025 through the Elevate IP and IP Assist programs to protect Canadian intellectual property and support SMEs to commercialize their intangible assets in the global marketplace.",
    ["Money", "Promise"],
    [
      { personaId: "entrepreneur", themeIds: ["ip-and-data"] },
      { personaId: "small-business", themeIds: ["can-i-afford-it"] }
    ]
  ),
  action(
    "act-052",
    "Pillar 5",
    "Foundation models",
    "Canada will anchor its homegrown foundation model capabilities at home, and support their international growth by exporting them to a growing global market actively seeking trusted alternatives.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["global-markets", "ip-and-data"] },
      { personaId: "concerned-canadian", themeIds: ["canadian-control"] }
    ]
  ),
  action(
    "act-053",
    "Pillar 5",
    "Foundation models",
    "Canada will support research in Canadian foundation models built with safety at their core, drawing on the country's deep bench of AI safety research to make trustworthiness a defining feature of Canadian models.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["ip-and-data"] },
      { personaId: "concerned-canadian", themeIds: ["accountability", "canadian-control"] }
    ]
  ),
  action(
    "act-054",
    "Pillar 6",
    "Sovereign Technology Alliance",
    "Canada will expand the newly formed Sovereign Technology Alliance to enable secure and interoperable AI capabilities and open procurement opportunities for domestic champions. This will accelerate responsible AI adoption, de-risk private-sector investment and cross-border deployment, reduce strategic dependence on dominant technology ecosystems while safeguarding rights and data, and expand joint research, talent, and investment opportunities.",
    ["Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["global-markets", "government-customer"] },
      { personaId: "concerned-canadian", themeIds: ["canadian-control"] },
      { personaId: "future-canada", themeIds: ["big-promise"] }
    ]
  ),
  action(
    "act-055",
    "Pillar 6",
    "Sovereign Technology Alliance",
    "Canada will leverage the Trade Commissioner Service and diplomatic networks to attract foreign investment in AI, showcase Canadian champions abroad, and enable new markets for Canadian firms.",
    ["Promise", "Still open"],
    [{ personaId: "entrepreneur", themeIds: ["global-markets"] }]
  ),
  action(
    "act-056",
    "Pillar 6",
    "Open-source AI",
    "Canada will lead a global, multi-stakeholder effort to invest in and sustain open-source AI development in the public interest, working with like-minded countries, Canadian AI institutes, researchers, civil society, industry, and global open-source organizations.",
    ["Money", "Promise", "Still open"],
    [
      { personaId: "small-business", themeIds: ["open-source-choice"] },
      { personaId: "entrepreneur", themeIds: ["global-markets"] },
      { personaId: "future-canada", themeIds: ["who-benefits"] }
    ]
  ),
  action(
    "act-057",
    "Pillar 6",
    "Open-source AI",
    "Canada will support the responsible adoption of open-source AI by Canadian researchers, SMEs, not-for-profit organizations, and public-interest innovators, working to create an inventory and shared library of access tools that are transparent, adaptable, secure, and aligned with Canadian needs.",
    ["Promise", "Still open"],
    [
      { personaId: "small-business", themeIds: ["open-source-choice"] },
      { personaId: "workplace-adopter", themeIds: ["daily-work"] },
      { personaId: "entrepreneur", themeIds: ["compute-access"] },
      { personaId: "student", themeIds: ["ethics-critical-thinking"] }
    ]
  ),
  action(
    "act-058",
    "Pillar 6",
    "International partnerships",
    "Europe: Germany is Canada’s anchor partner through the Sovereign Technology Alliance, with broader cooperation on critical minerals, clean energy, aerospace and defence. The UK is advancing joint work on AI safety, standards and defence AI. France is coordinating with Canada on AI governance under its G7 Presidency. The EU-Canada Strategic Partnership of the Future will embed AI alongside critical minerals, clean energy and defence. Finland and Norway add complementary strengths in connectivity, space, digitalization and critical minerals.",
    ["Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["global-markets"] },
      { personaId: "concerned-canadian", themeIds: ["accountability", "canadian-control"] }
    ]
  ),
  action(
    "act-059",
    "Pillar 6",
    "International partnerships",
    "Indo-Pacific: Canada, Australia, and India are formalizing a trilateral technology and innovation partnership covering AI, quantum, trade missions, and private-sector matchmaking. Canada is also collaborating with Australia's AI Safety Institute on shared evaluation expertise. Japan offers opportunities in semiconductors, robotics, industrial AI, and quantum computing through the modernized Canada-Japan Joint Economic Committee.",
    ["Promise", "Still open"],
    [
      { personaId: "entrepreneur", themeIds: ["global-markets"] },
      { personaId: "future-canada", themeIds: ["real-economy"] }
    ]
  ),
  action(
    "act-060",
    "Pillar 6",
    "International partnerships",
    "Middle East: The UAE is drawing sovereign wealth investment into Canadian data infrastructure and AI projects. Qatar is partnering with Canada on AI and emerging technologies, opening Gulf market access and supporting Vision 2030 diversification. Saudi Arabia is cooperating on tech and AI through the relaunched Joint Economic Commission.",
    ["Promise", "Still open"],
    [{ personaId: "entrepreneur", themeIds: ["global-markets"] }]
  )

];

const emptyCounts = (): ActionForceCounts => ({
  Law: 0,
  Money: 0,
  Promise: 0,
  "Still open": 0
});

export function getActionsForTheme(personaId: string, themeId: string) {
  return actionLedger.filter((entry) =>
    entry.matches.some(
      (match) => match.personaId === personaId && match.themeIds.includes(themeId)
    )
  );
}

export function countActionForces(actions: PolicyAction[]) {
  return actions.reduce<ActionForceCounts>((counts, entry) => {
    entry.forces.forEach((force) => {
      counts[force] += 1;
    });

    return counts;
  }, emptyCounts());
}

export function summarizeActionForces(actions: PolicyAction[]) {
  const counts = countActionForces(actions);
  const parts = [
    counts.Money > 0 ? `${counts.Money} funded` : "",
    counts.Law > 0 ? `${counts.Law} legal` : "",
    counts["Still open"] > 0 ? `${counts["Still open"]} open` : ""
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" / ") : `${actions.length} promised`;
}
