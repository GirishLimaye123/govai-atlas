import type { Theme } from "./personas";
import { getSources } from "./sourceLedger";

const sources = (ids: string[]) => getSources(ids);

export const completedPersonaThemes: Record<string, Theme[]> = {
  student: [
    {
      id: "what-to-learn-first",
      label: "Start here",
      eyebrow: "What should everyone know?",
      questions: [
        "What should I learn first?",
        "Do I need to code to be useful with AI?",
        "How do I know if an AI course is practical?"
      ],
      answer:
        "The strategy says AI literacy should become widely available, not limited to computer science students. It points to free entry-level training, public libraries, community organizations, learning kits, and sector-relevant modules. The useful takeaway is: learn enough to ask good questions, judge outputs, protect data, and understand where AI fits in your field.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Empowering Canadians", "Powering AI adoption", "Trusted partnerships"],
      comparator:
        "Singapore and India are useful skills-system comparators because both treat AI literacy and capability building as national infrastructure. The OECD gives the broader trustworthy-AI literacy baseline.",
      stillOpen:
        "The strategy promises broad access, but course quality, provincial education alignment, and credential recognition still need practical detail.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-literacy", "pm-launch"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-nais", "india-ai-mission", "oecd-ai-principles"]) }
      ]
    },
    {
      id: "trusted-ai-agents",
      label: "School tools",
      eyebrow: "Will students get trusted AI?",
      questions: [
        "Will I get access to useful AI tools at school?",
        "Will every program get support, or only STEM?",
        "Who decides which student AI tools are safe?"
      ],
      answer:
        "AI for All says trusted AI agents should be available to every post-secondary student, including arts, commerce, STEM, and medicine. That is a strong signal that Canada wants AI learning to cross disciplines. The quieter part is governance: how tools are chosen, how student data is protected, and what academic integrity rules look like.",
      coverage: "Clear",
      backing: ["Promise", "Still open"],
      debate: "Medium",
      pillars: ["Empowering Canadians", "Protecting Canadians"],
      comparator:
        "Singapore is useful for education-to-workforce implementation. Japan adds a business-guidance lens: students will need not only tool access, but practical judgment inside real organizations.",
      stillOpen:
        "Universities, colleges, provinces, vendors, and privacy rules will determine what students actually see.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-literacy", "can-strategy-privacy-online-safety"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption", "consultation-summary-trust"]) },
        { label: "Other countries", sources: sources(["singapore-nais", "japan-ai-business-guidelines"]) }
      ]
    },
    {
      id: "jobs-placements",
      label: "Jobs & placements",
      eyebrow: "Where is the opportunity?",
      questions: [
        "Will there be AI jobs for students?",
        "What kind of work placement should I look for?",
        "Will AI skills help outside tech companies?"
      ],
      answer:
        "The launch says the strategy will provide up to 90,000 AI-related jobs and work placement opportunities for young Canadians. The strategy direction is not just 'become an AI researcher.' It is also about using AI in health, energy, transportation, agriculture, manufacturing, government services, and creative work.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Empowering Canadians", "Powering AI adoption", "Scaling Canadian champions"],
      comparator:
        "Singapore, India, and France all treat AI talent as part of national competitiveness, not just individual career choice. Canada is similar, but its delivery will depend on placements, institutions, and employers.",
      stillOpen:
        "The strategy gives targets, but the exact programs, employers, geography, and eligibility rules will matter.",
      receipts: [
        { label: "Strategy text", sources: sources(["pm-launch", "can-strategy-workforce"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-nais", "india-ai-mission", "france-ai-strategy"]) }
      ]
    },
    {
      id: "ethics-critical-thinking",
      label: "Ethics & judgment",
      eyebrow: "How do I use AI without being fooled?",
      questions: [
        "How do I learn to check AI instead of just using it?",
        "Should ethics be part of AI training?",
        "What if my AI tool gives confident nonsense?"
      ],
      answer:
        "Public input emphasized ethics, critical thinking, transparency, and accountability. The strategy echoes that by connecting literacy with trust and safe adoption. For students, the practical study path is a mix: AI basics, domain knowledge, data awareness, privacy, bias, and the habit of verifying outputs.",
      coverage: "Some",
      backing: ["Promise", "Still open"],
      debate: "High",
      pillars: ["Empowering Canadians", "Protecting Canadians"],
      comparator:
        "The EU expresses AI judgment through hard obligations for high-risk systems. NIST and Australia are more useful for everyday practice because they translate trust into risk controls and guardrails.",
      stillOpen:
        "The strategy does not yet define a national curriculum for AI judgment, assessment, or academic integrity.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-literacy", "can-strategy-pillar-1"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption", "consultation-summary-trust"]) },
        { label: "Other countries", sources: sources(["eu-ai-act-high-risk", "us-nist-ai-rmf", "australia-ai-safety-standard"]) }
      ]
    },
    {
      id: "culture-language",
      label: "Canadian voices",
      eyebrow: "Will AI understand us?",
      questions: [
        "Will AI work in French and English?",
        "Will Indigenous and multicultural communities be represented?",
        "Can I build AI that reflects where I come from?"
      ],
      answer:
        "The strategy says Canadian voices, languages, communities, and knowledge should be reflected in AI systems. It includes French-language tools, accessible AI standards, GBA Plus, and Indigenous-led AI initiatives. This matters for students because the future AI workforce is not only technical; it is cultural, linguistic, ethical, and civic.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Empowering Canadians", "Protecting Canadians", "Trusted partnerships"],
      comparator:
        "UNESCO and the OECD are useful global baselines for culture, rights, and inclusion. Norway and Sweden are useful Nordic comparators because language resources and public-service inclusion are central to their AI conversations.",
      stillOpen:
        "The strategy names the values clearly, but community-level implementation and data governance will need careful follow-through.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-culture-inclusion", "can-strategy-indigenous"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["unesco-ai-ethics", "oecd-ai-principles", "norway-ai-strategy", "sweden-ai-strategy"]) }
      ]
    }
  ],

  "small-business": [
    {
      id: "where-to-start",
      label: "Where do I start?",
      eyebrow: "From experiment to useful workflow",
      questions: [
        "How do I know where AI actually helps my business?",
        "What if I do not have technical staff?",
        "How do I avoid buying shiny tools that do nothing?"
      ],
      answer:
        "The strategy says many SMEs have experimented with AI but have not integrated it into operations. Canada frames this as a translation problem: businesses need practical, sector-specific use cases, advice, and readiness tools. The useful first move is not a giant AI project; it is finding a real workflow where time, quality, or customer service can improve.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Powering AI adoption", "Empowering Canadians"],
      comparator:
        "Singapore, Australia, Japan, and NIST are the best comparators here because they turn adoption into playbooks, guardrails, lifecycle governance, and risk documentation.",
      stillOpen:
        "The strategy promises readiness tools and supports, but the quality of advice and local delivery will determine whether SMEs actually benefit.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-sme-adoption", "pm-launch"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-governance-playbook", "australia-ai-safety-standard", "japan-ai-business-guidelines", "us-nist-ai-rmf"]) }
      ]
    },
    {
      id: "can-i-afford-it",
      label: "Can I afford it?",
      eyebrow: "Money, tools, and support",
      questions: [
        "Is there funding or financing for AI adoption?",
        "Will this help small firms, or only big companies?",
        "Can nonprofits and regional businesses get support?"
      ],
      answer:
        "AI for All includes major SME adoption supports: BDC's LIFT program, Regional AI Initiative expansion, AI readiness resources, and entrepreneurship supports. That is one of the stronger funded parts of the strategy. The catch is that business owners will need simple eligibility, quick applications, and local help that does not require program expertise.",
      coverage: "Clear",
      backing: ["Money"],
      debate: "Medium",
      pillars: ["Powering AI adoption", "Scaling Canadian champions"],
      comparator:
        "Canada's approach is more program-and-financing led. France and India are better comparators than the EU here because they also use industrial or mission funding to build domestic AI capacity.",
      stillOpen:
        "Program design, timing, eligibility, and regional delivery are still the practical questions.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-sme-adoption", "can-overview-results"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["france-ai-strategy", "india-ai-mission"]) }
      ]
    },
    {
      id: "customer-trust",
      label: "Customer trust",
      eyebrow: "Will my customers be okay with it?",
      questions: [
        "Can I use AI without losing customer trust?",
        "What should I disclose?",
        "How do I protect customer data?"
      ],
      answer:
        "The strategy connects adoption with trust: privacy, online safety, transparency, standards, and certification. For small businesses, that means AI adoption is not only about productivity. It also means being able to explain where AI is used, what data goes in, and who remains accountable.",
      coverage: "Some",
      backing: ["Law", "Promise", "Still open"],
      debate: "High",
      pillars: ["Powering AI adoption", "Protecting Canadians"],
      comparator:
        "The EU is more explicit about disclosure and high-risk obligations. Australia and NIST are practical comparators for the small-business checklist Canada has not yet provided.",
      stillOpen:
        "The strategy does not yet give small businesses a simple disclosure checklist or enforceable AI accountability rulebook.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-pillar-1", "can-strategy-safety-institute"]) },
        { label: "Public input", sources: sources(["consultation-summary-trust"]) },
        { label: "Other countries", sources: sources(["eu-ai-act-transparency", "eu-ai-act-high-risk", "australia-ai-safety-standard", "us-nist-ai-rmf"]) }
      ]
    },
    {
      id: "open-source-choice",
      label: "Choice & lock-in",
      eyebrow: "Can I avoid dependence on one vendor?",
      questions: [
        "Will I get cheaper or more flexible AI options?",
        "Can I use open-source AI safely?",
        "What if I need AI on my own systems?"
      ],
      answer:
        "The strategy says open-source AI can reduce costs, increase flexibility, support local adaptation, and lower barriers for SMEs and nonprofits. This is useful language for small businesses because vendor lock-in is a real risk. The light part is how Canada will make open-source tools safe, maintained, and understandable for non-technical users.",
      coverage: "Some",
      backing: ["Promise", "Still open"],
      debate: "Medium",
      pillars: ["Trusted partnerships", "Powering AI adoption", "Sovereign AI foundation"],
      comparator:
        "Singapore is useful for governance playbooks, while India and France show how compute, datasets, and industrial strategy can support domestic ecosystems. Canada adds an explicit open-source resilience and choice angle.",
      stillOpen:
        "Open-source support will need usable libraries, security guidance, maintenance plans, and advisory help.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-open-source", "can-strategy-sme-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-governance-playbook", "india-ai-mission", "france-ai-strategy"]) }
      ]
    },
    {
      id: "sector-opportunity",
      label: "My sector",
      eyebrow: "Where does AI create value?",
      questions: [
        "Is AI only for tech companies?",
        "Which sectors does Canada care about?",
        "Can AI help real-world operations?"
      ],
      answer:
        "The strategy talks about AI in health, energy, transportation, agriculture, manufacturing, robotics, public services, and government services. It also uses farms and health care as concrete examples. For a business owner, the story is not 'become an AI company'; it is 'use AI where it improves the work you already do.'",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Low",
      pillars: ["Powering AI adoption", "Scaling Canadian champions"],
      comparator:
        "Singapore and Japan are good implementation comparators for sector adoption. France and South Korea are better industrial-policy comparators for strategic sectors and national competitiveness.",
      stillOpen:
        "Sector roadmaps will need to become concrete enough for owners to know what to try this quarter.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-missions", "can-strategy-sme-adoption", "pm-launch"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-nais", "japan-ai-business-guidelines", "france-ai-strategy", "south-korea-ai-basic-act"]) }
      ]
    }
  ],

  "workplace-adopter": [
    {
      id: "daily-work",
      label: "Daily work",
      eyebrow: "What actually changes at work?",
      questions: [
        "How does my day-to-day office work change?",
        "Will AI reduce busywork or just add another tool?",
        "Who decides which tasks AI touches?"
      ],
      answer:
        "The strategy says adoption should turn into productivity, better services, and better work - not just more tools. It speaks broadly about AI across workplaces, SMEs, and public services. The strategy is less specific at the team level, so organizations will still need clear choices about workflows, approvals, data, and human oversight.",
      coverage: "Some",
      backing: ["Promise", "Still open"],
      debate: "Medium",
      pillars: ["Powering AI adoption", "Empowering Canadians"],
      comparator:
        "Singapore shows how adoption can become playbooks. Australia and NIST show practical guardrails and risk controls, while Canada is still mostly giving national direction for everyday workplace redesign.",
      stillOpen:
        "The strategy does not define how a manager, analyst, or team should redesign work week by week.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-sme-adoption", "can-strategy-public-service"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-governance-playbook", "australia-ai-safety-standard", "us-nist-ai-rmf"]) }
      ]
    },
    {
      id: "training-upskilling",
      label: "Training",
      eyebrow: "Will workers get support?",
      questions: [
        "Will my employer train me?",
        "What if I am mid-career?",
        "Can frontline workers get practical AI skills too?"
      ],
      answer:
        "The launch and strategy both point to upskilling for workers, including mid-career professionals and frontline workers, plus employer-led training. This is one of the clearer worker-facing commitments. What remains open is how training time, funding, and worker voice are built into actual workplace adoption.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Empowering Canadians", "Powering AI adoption"],
      comparator:
        "Singapore and India treat workforce readiness as national AI infrastructure. Canada is moving there too, but the labour question is whether training reaches workers before work changes around them.",
      stillOpen:
        "Workers will need details on access, paid time, credentials, and whether training reaches non-technical roles.",
      receipts: [
        { label: "Strategy text", sources: sources(["pm-launch", "can-strategy-workforce", "can-strategy-literacy"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-nais", "india-ai-mission"]) }
      ]
    },
    {
      id: "public-servant",
      label: "Gov worker",
      eyebrow: "What if I work in government?",
      questions: [
        "Will AI change how public servants work?",
        "Can government use AI without unfair decisions?",
        "Will Canadian AI companies get a chance to serve government?"
      ],
      answer:
        "The strategy says government should be an anchor adopter of trusted Canadian AI and should improve public services. That makes government AI workers central, not peripheral. The practical challenge is making adoption responsible: clear assessment, privacy, accessibility, human review, procurement discipline, and appeal paths where services affect people.",
      coverage: "Clear",
      backing: ["Money", "Promise", "Still open"],
      debate: "High",
      pillars: ["Powering AI adoption", "Protecting Canadians", "Scaling Canadian champions"],
      comparator:
        "The EU treats many public-service uses as high risk. The U.S. OMB policy is a better direct comparator for agency-level governance, and Finland shows AI as public-service navigation rather than only automation.",
      stillOpen:
        "The strategy does not itself settle disclosure, appeal, audit, and procurement rules for every public-service use case.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-public-service", "can-strategy-pillar-1"]) },
        { label: "Public input", sources: sources(["consultation-summary-trust", "consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["eu-ai-act-high-risk", "us-omb-ai-governance", "finland-auroraai"]) }
      ]
    },
    {
      id: "will-ai-replace-me",
      label: "Job security",
      eyebrow: "Is this pro-worker?",
      questions: [
        "Will AI replace my job?",
        "Will productivity gains become pay, or just pressure?",
        "Who protects workers during adoption?"
      ],
      answer:
        "The strategy says shared prosperity means productivity gains should flow into paychecks, not only profits. It also targets new AI-related jobs and work placements. But it does not create a hard worker-protection regime by itself. That makes job design, labour consultation, training, and accountability the place to watch.",
      coverage: "Some",
      backing: ["Promise", "Still open"],
      debate: "High",
      pillars: ["Empowering Canadians", "Powering AI adoption"],
      comparator:
        "The EU, New York City, and Colorado show harder rule models for employment or consequential decisions. Canada is more directional here, emphasizing skills and adoption rather than binding worker AI rights.",
      stillOpen:
        "The strategy does not spell out rights around algorithmic management, surveillance, workload, or redeployment.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-workforce", "can-strategy-sme-adoption", "pm-launch"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["eu-ai-act-high-risk", "nyc-aedt-law", "colorado-ai-act"]) },
        { label: "Expert commentary", sources: sources(["geist-details"]) }
      ]
    },
    {
      id: "accountable-workflows",
      label: "Accountability",
      eyebrow: "Who signs off on AI work?",
      questions: [
        "Who is responsible for AI-assisted work?",
        "What should be documented?",
        "When should a human review the output?"
      ],
      answer:
        "The strategy names standards, certification, transparent evaluations, privacy, and trust. In a workplace, that translates into practical governance: approved tools, data rules, audit trails, human review for consequential decisions, and clear ownership. The national strategy points in that direction, but your organization still has to design the control points.",
      coverage: "Some",
      backing: ["Promise", "Still open"],
      debate: "High",
      pillars: ["Protecting Canadians", "Powering AI adoption"],
      comparator:
        "The EU high-risk model is more prescriptive about logging, documentation, human oversight, and robustness. NIST and Australia are better toolkit comparators for the workplace control points teams can actually implement.",
      stillOpen:
        "There is not yet a simple national workplace AI accountability checklist for everyday teams.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-safety-institute", "can-strategy-pillar-1"]) },
        { label: "Public input", sources: sources(["consultation-summary-trust"]) },
        { label: "Other countries", sources: sources(["eu-ai-act-high-risk", "us-nist-ai-rmf", "australia-ai-safety-standard"]) }
      ]
    }
  ],

  entrepreneur: [
    {
      id: "compute-access",
      label: "Compute",
      eyebrow: "Can I get the horsepower?",
      questions: [
        "How do I get compute without leaving Canada?",
        "Will startups get affordable access?",
        "Is sovereign compute real or just a slogan?"
      ],
      answer:
        "The strategy makes compute one of the clearest entrepreneur-facing priorities. It points to a public AI supercomputer, sovereign compute and cloud infrastructure, and additional affordable sovereign compute for SMEs. For founders, this is a strong signal that Canada sees compute access as part of company scaling, not just research infrastructure.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Sovereign AI foundation", "Scaling Canadian champions"],
      comparator:
        "France, India, Singapore, and South Korea are the stronger comparators here because they treat compute and AI infrastructure as industrial strategy. Canada adds a sovereignty frame tied to Canadian governance, cloud, data, and talent.",
      stillOpen:
        "Founders still need timelines, pricing, allocation rules, and clarity on whether access is competitive with hyperscalers.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-sovereign-compute", "can-strategy-commercialization", "pm-launch"]) },
        { label: "Public input", sources: sources(["consultation-infrastructure", "consultation-commercialization"]) },
        { label: "Other countries", sources: sources(["france-ai-strategy", "india-ai-mission", "singapore-nais", "south-korea-ai-basic-act"]) }
      ]
    },
    {
      id: "capital-growth",
      label: "Capital",
      eyebrow: "How do I fund the scale-up?",
      questions: [
        "Where does growth capital come from?",
        "Can Canada help companies stay headquartered here?",
        "Will funding favour real growth over hype?"
      ],
      answer:
        "Pillar 5 is built around scaling Canadian champions. The strategy points to growth capital, procurement, commercialization supports, and keeping Canadian IP and talent anchored here. Consultation input also asked for sustainable growth supports, mentorship, procurement programs, and capital vehicles.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Scaling Canadian champions", "Trusted partnerships"],
      comparator:
        "France, South Korea, Singapore, and India are useful industrial-policy comparators. Canada is pairing capital with sovereignty and procurement, but the implementation test is whether support reaches scale-ups fast enough.",
      stillOpen:
        "The details that matter are investment criteria, speed, matching requirements, and whether support reaches companies outside the usual hubs.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-capital", "can-strategy-commercialization"]) },
        { label: "Public input", sources: sources(["consultation-commercialization"]) },
        { label: "Other countries", sources: sources(["france-ai-strategy", "south-korea-ai-basic-act", "singapore-nais", "india-ai-mission"]) }
      ]
    },
    {
      id: "government-customer",
      label: "First customer",
      eyebrow: "Can government buy from me?",
      questions: [
        "Can government become my anchor customer?",
        "Will procurement help Canadian AI firms scale?",
        "How do I prove trust to public-sector buyers?"
      ],
      answer:
        "The strategy says government should use procurement as a strategic anchor customer and act as an adopter of trusted Canadian AI. That is a major signal for founders because public-sector demand can help validate products. The catch is procurement has to become navigable, fast enough, and still rigorous on safety, privacy, and accountability.",
      coverage: "Clear",
      backing: ["Money", "Promise", "Still open"],
      debate: "Medium",
      pillars: ["Scaling Canadian champions", "Powering AI adoption", "Protecting Canadians"],
      comparator:
        "The U.S. OMB policy and Sweden's public-sector strategy are good procurement/government-use comparators. The EU adds the hard-law lens for high-risk public-facing systems.",
      stillOpen:
        "Procurement reform, security review, pilot-to-scale paths, and evaluation standards will decide whether this works.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-capital", "can-strategy-public-service", "can-strategy-safety-institute"]) },
        { label: "Public input", sources: sources(["consultation-commercialization", "consultation-summary-trust"]) },
        { label: "Other countries", sources: sources(["us-omb-ai-governance", "sweden-ai-strategy", "eu-ai-act-high-risk"]) }
      ]
    },
    {
      id: "ip-and-data",
      label: "IP & data",
      eyebrow: "Will value stay in Canada?",
      questions: [
        "How do I protect my IP?",
        "Will Canadian data help Canadian companies?",
        "Can I scale without selling the company abroad?"
      ],
      answer:
        "The strategy treats IP, data, and company anchoring as sovereignty issues. It references IP supports through Elevate IP and IP Assist, Canadian-controlled infrastructure, and data as a strategic asset. For entrepreneurs, the story is clear: Canada wants more value, headquarters, and strategic assets to stay here.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Scaling Canadian champions", "Sovereign AI foundation"],
      comparator:
        "France and India are useful for comparing domestic AI capacity and public compute/data ecosystems. The EU copyright/transparency model matters when IP and data value cross into training-data rights.",
      stillOpen:
        "The strategy does not settle every data-access, IP ownership, or foreign-investment trade-off founders will face.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-commercialization", "can-strategy-data", "can-strategy-sovereign-compute"]) },
        { label: "Public input", sources: sources(["consultation-commercialization", "consultation-infrastructure"]) },
        { label: "Other countries", sources: sources(["france-ai-strategy", "india-ai-mission", "eu-ai-act-gpai-copyright"]) }
      ]
    },
    {
      id: "global-markets",
      label: "Global markets",
      eyebrow: "How do I sell beyond Canada?",
      questions: [
        "Can Canada open doors internationally?",
        "How do trusted alliances help my company?",
        "Can Canadian AI compete with hyperscalers?"
      ],
      answer:
        "Pillar 6 is about trusted partnerships, global alliances, and market access. The strategy names the Sovereign Technology Alliance, Trade Commissioner Service, diplomatic networks, AI safety standards, and procurement opportunities. For founders, this is the export and partnership lane.",
      coverage: "Clear",
      backing: ["Money", "Promise"],
      debate: "Medium",
      pillars: ["Trusted partnerships", "Scaling Canadian champions"],
      comparator:
        "Canada, Singapore, and the UK all lean on trusted-partner positioning. France and South Korea add the national-champion angle, while G7/OECD norms shape the international trust baseline.",
      stillOpen:
        "The strategy will need tangible buyer access, partner programs, and proof that alliances translate into deals.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-partnerships", "can-strategy-foundation-models"]) },
        { label: "Public input", sources: sources(["consultation-commercialization"]) },
        { label: "Other countries", sources: sources(["singapore-nais", "uk-pro-innovation-ai", "france-ai-strategy", "south-korea-ai-basic-act", "g7-hiroshima-ai-process"]) }
      ]
    }
  ],

  "future-canada": [
    {
      id: "big-promise",
      label: "The big promise",
      eyebrow: "What is Canada saying this will do?",
      questions: [
        "Will AI make life better in Canada?",
        "Is the $200B growth target real or just a headline?",
        "What should Canadians track to know if this is working?"
      ],
      answer:
        "AI for All is not only a risk strategy. It is also a national prosperity strategy. The launch frames AI as a way to add $200B in economic growth, raise business adoption to 60% by 2034, create AI-related jobs, and improve services. The honest reading is: the ambition is clear, but Canadians should watch whether these targets turn into measurable gains in wages, health care, public services, regional opportunity, and affordability.",
      coverage: "Clear",
      backing: ["Money", "Promise", "Still open"],
      debate: "High",
      pillars: ["Powering AI adoption", "Empowering Canadians", "Scaling Canadian champions"],
      comparator:
        "France and South Korea are useful for national-champion and industrial-policy comparisons. Singapore and India help compare execution, skills, and compute at national scale, while Sweden keeps the public-service and welfare-state lens visible.",
      stillOpen:
        "The strategy gives headline targets, but it does not yet show a public scorecard for who benefits, where, and how quickly.",
      receipts: [
        { label: "Strategy text", sources: sources(["pm-launch", "can-overview-results"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["france-ai-strategy", "south-korea-ai-basic-act", "singapore-nais", "india-ai-mission", "sweden-ai-strategy"]) }
      ]
    },
    {
      id: "health-care",
      label: "Health care",
      eyebrow: "Can AI improve care?",
      questions: [
        "Will AI reduce wait times?",
        "Can it improve diagnosis and patient care?",
        "Will health AI be safe, private, and accountable?"
      ],
      answer:
        "Health is the first AI mission in the strategy, which makes it one of the clearest public-benefit promises. The strategy points to better diagnostics, patient care, system efficiency, and reduced administrative burden. This is high-upside and high-risk: health care gains only matter if privacy, oversight, accuracy, explainability, and appeal paths are strong.",
      coverage: "Clear",
      backing: ["Money", "Promise", "Still open"],
      debate: "High",
      pillars: ["Powering AI adoption", "Protecting Canadians", "Empowering Canadians"],
      comparator:
        "The EU treats many health uses as high-risk systems with stricter obligations. NIST and U.S. OMB are useful for operational governance, while Norway and UNESCO add public-service and ethics comparators.",
      stillOpen:
        "The strategy does not yet define which health systems get tools first, how success will be measured, or how patients can challenge AI-assisted decisions.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-health-mission", "can-strategy-missions"]) },
        { label: "Public input", sources: sources(["consultation-summary-trust", "consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["eu-ai-act-high-risk", "us-nist-ai-rmf", "us-omb-ai-governance", "norway-ai-strategy", "unesco-ai-ethics"]) }
      ]
    },
    {
      id: "jobs-wages",
      label: "Jobs & wages",
      eyebrow: "Will prosperity reach workers?",
      questions: [
        "Will AI create good jobs?",
        "Will productivity gains show up in wages?",
        "Will young people get a real pathway into AI work?"
      ],
      answer:
        "The launch points to 250,000 AI-related jobs and up to 90,000 youth work placements and opportunities. The strategy also talks about upskilling workers and spreading AI literacy. The key public-interest question is distribution: whether productivity gains become better pay, better work, and better services, or mainly higher pressure on workers.",
      coverage: "Clear",
      backing: ["Money", "Promise", "Still open"],
      debate: "High",
      pillars: ["Empowering Canadians", "Powering AI adoption", "Scaling Canadian champions"],
      comparator:
        "Singapore and India treat AI talent as national infrastructure. The EU, Colorado, and New York City show harder rule models where AI affects work or consequential decisions; Canada is more focused on training and opportunity so far.",
      stillOpen:
        "Targets are clear; wage growth, job quality, paid training time, and worker voice are less defined.",
      receipts: [
        { label: "Strategy text", sources: sources(["pm-launch", "can-strategy-workforce", "can-strategy-literacy"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["singapore-nais", "india-ai-mission", "eu-ai-act-high-risk", "colorado-ai-act", "nyc-aedt-law"]) }
      ]
    },
    {
      id: "public-services",
      label: "Public services",
      eyebrow: "Can government work better?",
      questions: [
        "Will AI reduce paperwork?",
        "Can it make services faster without unfair decisions?",
        "Will people know when AI is involved?"
      ],
      answer:
        "The strategy says government should be an anchor adopter of trusted Canadian AI and should use AI to improve public services. That is an important promise for everyone, not just businesses. The risk is that faster service can still be unfair service if people cannot understand, appeal, or correct AI-assisted decisions.",
      coverage: "Clear",
      backing: ["Money", "Promise", "Still open"],
      debate: "High",
      pillars: ["Powering AI adoption", "Protecting Canadians", "Scaling Canadian champions"],
      comparator:
        "The EU's high-risk framework is more explicit for consequential public-service uses. U.S. OMB gives agency-level governance, Finland shows life-event public-service delivery, and Sweden/Norway add Nordic public-sector AI comparators.",
      stillOpen:
        "The strategy does not yet provide one clear public-service standard for disclosure, appeal, audit, and human review.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-public-service", "can-strategy-pillar-1"]) },
        { label: "Public input", sources: sources(["consultation-summary-trust"]) },
        { label: "Other countries", sources: sources(["eu-ai-act-high-risk", "us-omb-ai-governance", "finland-auroraai", "sweden-ai-strategy", "norway-ai-strategy"]) }
      ]
    },
    {
      id: "real-economy",
      label: "Real economy",
      eyebrow: "Beyond software companies",
      questions: [
        "Will this help industries outside tech?",
        "Can AI help energy, farms, factories, logistics, and resources?",
        "Where do mining and natural-resource opportunities fit?"
      ],
      answer:
        "The strategy points beyond software into health, energy, agriculture, manufacturing, transportation, robotics, public services, and SMEs. Mining and natural resources fit the same real-economy logic, though the strategy is more explicit about some sectors than others. The practical question is whether AI adoption reaches operational industries across regions, not only large firms in major cities.",
      coverage: "Some",
      backing: ["Money", "Promise", "Still open"],
      debate: "Medium",
      pillars: ["Powering AI adoption", "Sovereign AI foundation", "Scaling Canadian champions"],
      comparator:
        "France and South Korea are better comparators for strategic sectors and industrial competitiveness. Singapore and Japan are better for adoption playbooks, while India's mission is useful for compute, skills, and public-good scale.",
      stillOpen:
        "Sector-specific roadmaps, regional delivery, energy constraints, and local skills pipelines are still the implementation layer to watch.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-missions", "can-strategy-real-economy", "can-strategy-sme-adoption", "can-strategy-sovereign-compute"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption", "consultation-infrastructure"]) },
        { label: "Other countries", sources: sources(["france-ai-strategy", "south-korea-ai-basic-act", "singapore-nais", "japan-ai-business-guidelines", "india-ai-mission"]) }
      ]
    },
    {
      id: "who-benefits",
      label: "Who benefits?",
      eyebrow: "Will this be shared?",
      questions: [
        "Will small towns and rural communities benefit?",
        "Will Indigenous communities lead, not just be consulted?",
        "Will AI reflect Canada's languages and cultures?"
      ],
      answer:
        "AI for All says the benefits should be broad, not limited to insiders. It names Indigenous-led AI, French-language tools, accessibility, GBA Plus, community organizations, public libraries, and inclusive AI literacy. This is important, but it needs follow-through: funding, governance, local capacity, and community control.",
      coverage: "Clear",
      backing: ["Money", "Promise", "Still open"],
      debate: "High",
      pillars: ["Empowering Canadians", "Protecting Canadians", "Trusted partnerships"],
      comparator:
        "UNESCO and the OECD give the global rights-and-inclusion baseline. Norway and Sweden are useful because language, public services, and broad social trust are central to their AI strategy framing.",
      stillOpen:
        "The strategy does not yet show a complete equity scorecard for regions, income groups, Indigenous communities, disability, language, and age.",
      receipts: [
        { label: "Strategy text", sources: sources(["can-strategy-culture-inclusion", "can-strategy-indigenous", "can-strategy-literacy"]) },
        { label: "Public input", sources: sources(["consultation-skills-adoption"]) },
        { label: "Other countries", sources: sources(["unesco-ai-ethics", "oecd-ai-principles", "norway-ai-strategy", "sweden-ai-strategy"]) }
      ]
    }
  ]
};
