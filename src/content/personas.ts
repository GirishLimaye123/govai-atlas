import type { SourceEntry } from "./sourceLedger";
import { completedPersonaThemes } from "./extraPersonas";
import { localAssetUrl } from "./assets";
import { getSources } from "./sourceLedger";

export type Coverage = "Clear" | "Some" | "Quiet";
export type Backing = "Law" | "Money" | "Promise" | "Still open";
export type Debate = "Low" | "Medium" | "High";

export type ReceiptGroup = {
  label: string;
  sources: SourceEntry[];
};

export type Theme = {
  id: string;
  label: string;
  eyebrow: string;
  questions: string[];
  answer: string;
  coverage: Coverage;
  backing: Backing[];
  debate: Debate;
  pillars: string[];
  comparator: string;
  stillOpen: string;
  receipts: ReceiptGroup[];
};

export type Persona = {
  id: string;
  name: string;
  question: string;
  accent: string;
  image: string;
  imageAlt: string;
  summary: string;
  themes: Theme[];
};

const strategyReceipts = (ids: string[]) => getSources(ids);

const personaSeed: Persona[] = [
  {
    id: "concerned-canadian",
    name: "Concerned Canadian",
    question: "Can I trust it?",
    accent: "#0f7a5f",
    image:
      "https://images.unsplash.com/photo-1618951871701-f542cd0d877e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Portrait of a mature citizen looking hopeful and thoughtful",
    summary:
      "For people asking whether AI will be safe, fair, transparent, and useful in real life.",
    themes: [
      {
        id: "whats-real",
        label: "What's real?",
        eyebrow: "How do we know what to believe?",
        questions: [
          "How do I know what is real anymore?",
          "Will AI make election misinformation worse?",
          "Will I know when a chatbot, image, or video is AI-generated?"
        ],
        answer:
          "The strategy says trust is the north star and names synthetic media, deepfakes, and AI-generated disinformation as risks to public debate and democratic institutions. It promises election protection, AI transparency work, and capabilities such as watermarking. The part still forming is the practical system Canadians will actually see: clear labels, reliable detection, reporting paths, and consequences when people misuse AI.",
        coverage: "Some",
        backing: ["Promise", "Money", "Still open"],
        debate: "High",
        pillars: [
          "Protecting Canadians",
          "Empowering Canadians",
          "Trusted partnerships"
        ],
        comparator:
          "Canada is still mostly in strategy-and-capacity mode here. The EU shows what binding deepfake and AI-content transparency duties can look like, while the G7 shows a voluntary advanced-AI code and China is a contrast case for much harder content-control rules.",
        stillOpen:
          "Canada names the problem clearly, but this first strategy slice does not yet show the everyday labelling, reporting, and enforcement path Canadians will rely on.",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-pillar-1",
              "can-strategy-safety-institute"
            ])
          },
          {
            label: "Public input",
            sources: strategyReceipts(["consultation-summary-trust"])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "eu-ai-act-transparency",
              "g7-hiroshima-ai-process",
              "china-generative-ai-measures"
            ])
          }
        ]
      },
      {
        id: "deepfakes",
        label: "Scams & deepfakes",
        eyebrow: "What happens when fake looks real?",
        questions: [
          "How do I protect my daughter from deepfakes or AI bullying?",
          "What happens if someone uses AI to impersonate me?",
          "Will AI make election misinformation harder to spot?"
        ],
        answer:
          "The strategy treats deepfakes, synthetic media, online harms, fraud, and election interference as trust problems Canada has to face directly. It promises online safety laws, legal tools for deepfake harms, AI transparency work such as watermarking, and more applied research for fraud and cyber defence. The open question is how quickly those tools become enforceable rights, takedown paths, and practical help for families.",
        coverage: "Clear",
        backing: ["Law", "Money", "Promise", "Still open"],
        debate: "High",
        pillars: [
          "Protecting Canadians",
          "Empowering Canadians",
          "Trusted partnerships"
        ],
        comparator:
          "The EU gives the hard-law comparison for labels and transparency. Australia and NIST are better operational comparators for safety guardrails, while China shows how strict public-facing GenAI controls look under a very different political model.",
        stillOpen:
          "The strategy says Canada will act, but the first slice does not yet answer what a parent, school, platform, or police service must do when harm happens.",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-pillar-1",
              "can-strategy-privacy-online-safety",
              "can-strategy-safety-institute",
              "can-overview-results"
            ])
          },
          {
            label: "Public input",
            sources: strategyReceipts(["consultation-summary-trust"])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "eu-ai-act-transparency",
              "australia-ai-safety-standard",
              "us-nist-ai-rmf",
              "china-generative-ai-measures"
            ])
          },
          {
            label: "Expert commentary",
            sources: strategyReceipts(["geist-details", "betakit-lacks-teeth"])
          }
        ]
      },
      {
        id: "my-data",
        label: "My data",
        eyebrow: "Who gets to use my information?",
        questions: [
          "Who gets to use my personal data?",
          "Can my child’s data be used to train AI?",
          "Will I know when AI is using sensitive health or financial data?"
        ],
        answer:
          "The strategy says privacy is central to trust. It promises modernized consumer privacy law, stronger control over personal data, protection for children's information, and a Privacy Act review for government use. It also recognizes that health, financial, and other sensitive data are more valuable and contested in the AI era. The practical detail still to watch is what new rights, consent rules, enforcement powers, and data-use limits actually look like.",
        coverage: "Clear",
        backing: ["Law", "Promise", "Still open"],
        debate: "High",
        pillars: [
          "Protecting Canadians",
          "Sovereign AI foundation",
          "Trusted partnerships"
        ],
        comparator:
          "The EU and Colorado show harder rights-and-obligations models for high-risk or consequential AI. NIST and the OECD are better baseline comparators for how organizations should govern data and risk even before a binding Canadian law arrives.",
        stillOpen:
          "The strategy points toward law reform, but it does not itself define the final privacy statute, enforcement model, or data-training consent rules.",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-pillar-1",
              "can-strategy-privacy-online-safety"
            ])
          },
          {
            label: "Public input",
            sources: strategyReceipts([
              "consultation-summary-trust",
              "consultation-infrastructure"
            ])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "eu-ai-act-high-risk",
              "colorado-ai-act",
              "us-nist-ai-rmf",
              "oecd-ai-principles"
            ])
          },
          {
            label: "Expert commentary",
            sources: strategyReceipts(["geist-details"])
          }
        ]
      },
      {
        id: "my-kids",
        label: "My kids",
        eyebrow: "What changes for children and schools?",
        questions: [
          "Can my child's data be used to train AI?",
          "How will children learn to use AI safely?",
          "Who protects kids from AI-powered manipulation or abuse?"
        ],
        answer:
          "The strategy repeatedly names children as a group needing protection, especially around privacy, online safety, and personal information. It also funds AI literacy and digital skills training for students and educators. The gap is that child-specific protections will depend on future privacy rules, online safety laws, provincial education choices, and how platforms respond in practice.",
        coverage: "Some",
        backing: ["Law", "Money", "Promise", "Still open"],
        debate: "High",
        pillars: [
          "Protecting Canadians",
          "Empowering Canadians",
          "Trusted partnerships"
        ],
        comparator:
          "The EU gives the hard-law comparison for transparency and prohibited practices. Australia adds practical guardrails, and UNESCO is useful for the child-rights, education, and wellbeing lens Canada will need to make real.",
        stillOpen:
          "The strategy says children should be protected, but parents will still need clearer rules on data use, classroom tools, platform duties, and remedies.",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-privacy-online-safety",
              "can-overview-results"
            ])
          },
          {
            label: "Public input",
            sources: strategyReceipts(["consultation-summary-trust"])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "eu-ai-act-transparency",
              "australia-ai-safety-standard",
              "unesco-ai-ethics"
            ])
          }
        ]
      },
      {
        id: "public-services",
        label: "Health & services",
        eyebrow: "Will this make life better?",
        questions: [
          "Will AI improve health care and public services?",
          "Can AI reduce paperwork without making unfair decisions?",
          "Will I know if AI is part of a public-service decision?"
        ],
        answer:
          "The strategy argues that AI should show up as better services, not just better technology. It names health and life sciences as a priority sector, talks about transforming public service delivery, and starts the AI Missions Program with funding aimed at improving health outcomes. The trust issue is that health care and public services are high-stakes, so speed has to come with transparency, human oversight, privacy, and appeal paths.",
        coverage: "Clear",
        backing: ["Money", "Promise", "Still open"],
        debate: "Medium",
        pillars: [
          "Powering AI adoption",
          "Protecting Canadians",
          "Empowering Canadians"
        ],
        comparator:
          "The EU treats many health and public-service uses as high-risk systems with stricter obligations. The U.S. OMB policy is useful for agency-level AI governance, and Finland's AuroraAI is a public-service comparator focused on connecting people with services.",
        stillOpen:
          "The strategy gives direction and funding, but service-level accountability, disclosure, and appeal mechanisms will depend on future program design and public-sector rules.",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-health-mission",
              "can-strategy-pillar-1",
              "can-overview-results"
            ])
          },
          {
            label: "Public input",
            sources: strategyReceipts(["consultation-summary-trust"])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "eu-ai-act-high-risk",
              "us-omb-ai-governance",
              "finland-auroraai"
            ])
          }
        ]
      },
      {
        id: "accountability",
        label: "Who's accountable?",
        eyebrow: "Who answers when AI gets it wrong?",
        questions: [
          "Who is responsible when AI harms someone?",
          "Can I appeal an AI-assisted decision?",
          "Who audits AI systems before they affect people?"
        ],
        answer:
          "The strategy says safety, accountability, certification, standards, and transparent evaluations are essential for trust. It also recognizes consequential AI decisions in hiring, lending, health care, and public services. But it does not fully define the workplace, platform, vendor, or government accountability chain that a person would use after harm happens.",
        coverage: "Some",
        backing: ["Money", "Promise", "Still open"],
        debate: "High",
        pillars: [
          "Protecting Canadians",
          "Powering AI adoption",
          "Trusted partnerships"
        ],
        comparator:
          "The EU is clearer on high-risk obligations such as logging, documentation, and human oversight. Colorado is a useful North American comparator for consequential decisions, while NIST and Australia translate accountability into operational risk controls.",
        stillOpen:
          "The strategy does not yet answer the most personal accountability question: who do I call, what rights do I have, and what must the organization prove?",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-pillar-1",
              "can-strategy-safety-institute"
            ])
          },
          {
            label: "Public input",
            sources: strategyReceipts(["consultation-summary-trust"])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "eu-ai-act-high-risk",
              "colorado-ai-act",
              "us-nist-ai-rmf",
              "australia-ai-safety-standard"
            ])
          },
          {
            label: "Expert commentary",
            sources: strategyReceipts(["betakit-lacks-teeth", "geist-details"])
          }
        ]
      },
      {
        id: "canadian-control",
        label: "Canadian control",
        eyebrow: "Who controls the foundations?",
        questions: [
          "Where is Canadian data stored?",
          "Who controls the compute and cloud Canada relies on?",
          "Can Canada use AI without becoming too dependent on foreign platforms?"
        ],
        answer:
          "The strategy says sovereignty is one of the foundations of AI for All. It points to Canadian-controlled compute, data, talent, and infrastructure so Canada can build and govern AI on Canadian terms. For citizens, this matters because public services, health data, and critical infrastructure increasingly depend on compute and cloud systems. The strategy is clear on the direction, but the buildout details, governance model, and trade-offs around cost, energy, and procurement still need watching.",
        coverage: "Clear",
        backing: ["Money", "Promise", "Still open"],
        debate: "Medium",
        pillars: [
          "Sovereign AI foundation",
          "Trusted partnerships",
          "Protecting Canadians"
        ],
        comparator:
          "Singapore, France, and India are useful infrastructure-and-industrial-strategy comparators: all treat compute, talent, data, or national champions as strategic assets. The EU comparison is different because its AI Act is primarily a regulatory instrument.",
        stillOpen:
          "The strategy names sovereign infrastructure as a priority, but citizens will need clearer answers on who owns, governs, audits, and pays for it.",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-pillar-1",
              "consultation-infrastructure"
            ])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "singapore-nais",
              "france-ai-strategy",
              "india-ai-mission",
              "eu-ai-act-high-risk"
            ])
          }
        ]
      },
      {
        id: "environment",
        label: "Environment",
        eyebrow: "What does AI cost the planet?",
        questions: [
          "Will AI data centres use too much power or water?",
          "Can Canada build AI infrastructure without weakening climate goals?",
          "Who decides where AI infrastructure gets built?"
        ],
        answer:
          "The official strategy says sovereign compute should be resilient, sustainable, and under Canadian governance. It also recognizes that Canada's clean electricity is an asset but that available power is constrained. Public consultation input pushed harder on environmental impacts, especially energy and water use. That makes this a place where the strategy speaks to the issue, but leaves many local and implementation questions open.",
        coverage: "Some",
        backing: ["Promise", "Still open"],
        debate: "High",
        pillars: [
          "Sovereign AI foundation",
          "Protecting Canadians",
          "Trusted partnerships"
        ],
        comparator:
          "Sweden is useful here because it links AI infrastructure with secure systems and energy-aware competitiveness. Singapore and India show compute as national infrastructure; Canada still needs clearer local rules on siting, power, water, and public benefit.",
        stillOpen:
          "The first strategy text does not settle siting, power allocation, water use, local consultation, or environmental reporting requirements for AI data centres.",
        receipts: [
          {
            label: "Strategy text",
            sources: strategyReceipts([
              "can-strategy-pillar-1",
              "consultation-infrastructure"
            ])
          },
          {
            label: "Public input",
            sources: strategyReceipts(["consultation-infrastructure"])
          },
          {
            label: "Other countries",
            sources: strategyReceipts([
              "sweden-ai-strategy",
              "singapore-nais",
              "india-ai-mission"
            ])
          }
        ]
      }
    ]
  },
  {
    id: "student",
    name: "Student / Future Worker",
    question: "What should I study?",
    accent: "#2767b1",
    image:
      "https://images.unsplash.com/photo-1492462543947-040389c4a66c?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Portrait of a student with a hopeful expression in a bright street setting",
    summary: "Skills, jobs, education, and first career steps.",
    themes: []
  },
  {
    id: "small-business",
    name: "Small Business Owner",
    question: "Can it help my business?",
    accent: "#b5811a",
    image:
      "https://images.unsplash.com/photo-1537808038302-287105ae5567?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Portrait of a small business owner thinking in a cafe setting",
    summary: "Adoption, productivity, customer service, and affordability.",
    themes: []
  },
  {
    id: "workplace-adopter",
    name: "Workplace AI Adopter",
    question: "How does my day-to-day work change?",
    accent: "#2d7188",
    image: localAssetUrl("/assets/personas/workplace-indigenous-adopter.jpg"),
    imageAlt:
      "Portrait of an Indigenous Canadian workplace professional thinking in a bright office setting",
    summary: "Practical adoption, accountability, and team readiness.",
    themes: []
  },
  {
    id: "entrepreneur",
    name: "AI Entrepreneur",
    question: "How do I scale my innovation?",
    accent: "#b54747",
    image: localAssetUrl("/assets/personas/ai-entrepreneur-sharp.jpg"),
    imageAlt:
      "Sharp portrait of an AI entrepreneur in a bright professional setting",
    summary: "Compute, capital, procurement, growth, and global markets.",
    themes: []
  },
  {
    id: "future-canada",
    name: "Future Canadian",
    question: "Will AI make life better in Canada?",
    accent: "#6b6f1e",
    image: localAssetUrl("/assets/personas/future-canadian-kids-flag.jpg"),
    imageAlt:
      "Diverse Canadian children looking hopeful in front of a Canadian flag",
    summary: "Prosperity, jobs, health care, public services, and the Canada the next generation inherits.",
    themes: []
  }
];

const personaOrder = [
  "future-canada",
  "concerned-canadian",
  "student",
  "small-business",
  "workplace-adopter",
  "entrepreneur"
];

export const personas: Persona[] = personaSeed
  .map((persona) => ({
    ...persona,
    themes: persona.themes.length > 0 ? persona.themes : completedPersonaThemes[persona.id] ?? persona.themes
  }))
  .sort((a, b) => personaOrder.indexOf(a.id) - personaOrder.indexOf(b.id));
