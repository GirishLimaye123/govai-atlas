import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CalendarClock,
  ChevronDown,
  CircleAlert,
  ClipboardList,
  Copy,
  FileText,
  Filter,
  ListChecks,
  MessageCircle,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users
} from "lucide-react";
import { useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import {
  actionLedger,
  countActionForces,
  getActionsForTheme,
  summarizeActionForces,
  type PolicyAction
} from "./content/actionLedger";
import {
  consultationSources,
  expertReportLedger,
  getConsultationInputsForTheme,
  getConsultationDocumentLabel,
  getConsultationDocumentUrl,
  publicIdeaLedger,
  type ConsultationInput
} from "./content/consultationLedger";
import {
  debateLedger,
  getDebatesForTheme,
  getDebateScore,
  type DebateEntry,
  type DebateStance
} from "./content/debateLedger";
import { personas, type Persona, type ReceiptGroup, type Theme } from "./content/personas";

type AppRoute = {
  version: "v1" | "v2";
  page: "home" | "persona" | "actions" | "debates" | "methodology";
  personaId?: string;
  themeId?: string;
};

type DebateSuggestion = {
  id: string;
  personaId: string;
  themeId: string;
  url: string;
  submittedAt: string;
};

const suggestionStorageKey = "ai-for-all-debate-suggestions";

const v2HomeHash = () => "#/";
const v2ActionHash = () => "#/actions";
const v2DebateHash = () => "#/debates";
const v2MethodologyHash = () => "#/methodology";
const v1HomeHash = () => "#/v1";

const personaHash = (personaId: string, themeId?: string) =>
  themeId ? `#/persona/${personaId}/theme/${themeId}` : `#/persona/${personaId}`;

const legacyPersonaHash = (personaId: string, themeId?: string) =>
  themeId ? `#/v1/persona/${personaId}/theme/${themeId}` : `#/v1/persona/${personaId}`;

function parseRoute(): AppRoute {
  const hash = window.location.hash || "#/";
  const legacyMatch = hash.match(/^#\/v1(?:\/persona\/([^/]+)(?:\/theme\/([^/]+))?)?$/);

  if (legacyMatch) {
    return {
      version: "v1",
      page: legacyMatch[1] ? "persona" : "home",
      personaId: legacyMatch[1] ? decodeURIComponent(legacyMatch[1]) : undefined,
      themeId: legacyMatch[2] ? decodeURIComponent(legacyMatch[2]) : undefined
    };
  }

  if (hash === "#/actions") {
    return { version: "v2", page: "actions" };
  }

  if (hash === "#/debates") {
    return { version: "v2", page: "debates" };
  }

  if (hash === "#/methodology") {
    return { version: "v2", page: "methodology" };
  }

  const match = hash.match(/^#\/persona\/([^/]+)(?:\/theme\/([^/]+))?$/);

  if (!match) {
    return { version: "v2", page: "home" };
  }

  return {
    version: "v2",
    page: "persona",
    personaId: decodeURIComponent(match[1]),
    themeId: match[2] ? decodeURIComponent(match[2]) : undefined
  };
}

const pillars = [
  "Protecting Canadians",
  "Empowering Canadians",
  "Powering AI adoption",
  "Sovereign AI foundation",
  "Scaling Canadian champions",
  "Trusted partnerships"
];

const promiseCards = [
  {
    value: "$200B",
    label: "targeted economic growth",
    detail: "The launch frames AI as a national productivity and growth strategy through 2034."
  },
  {
    value: "60%",
    label: "business adoption target",
    detail: "Canada wants AI adoption across Canadian businesses to rise sharply by 2034."
  },
  {
    value: "250K",
    label: "AI-related jobs",
    detail: "The strategy links skills, adoption, and company growth to new work opportunities."
  },
  {
    value: "Health",
    label: "first national AI mission",
    detail: "The first mission focuses on better health outcomes, diagnostics, patient care, and system efficiency."
  }
];

type TopicEntry = {
  persona: Persona;
  theme: Theme;
};

type V2SearchResult =
  | {
      type: "topic";
      title: string;
      eyebrow: string;
      description: string;
      href: string;
    }
  | {
      type: "action";
      title: string;
      eyebrow: string;
      description: string;
      href: string;
    }
  | {
      type: "debate";
      title: string;
      eyebrow: string;
      description: string;
      href: string;
    };

const topicEntries: TopicEntry[] = personas.flatMap((persona) =>
  persona.themes.map((theme) => ({ persona, theme }))
);

const updateCards = [
  {
    date: "June 8, 2026",
    title: "V2 civic atlas added",
    detail:
      "New landing page, search, 60-action tracker, debate hub, update feed, and share tools."
  },
  {
    date: "June 8, 2026",
    title: "Key actions made verbatim",
    detail:
      "The action ledger now mirrors the official strategy wording and links directly to each action."
  },
  {
    date: "June 8, 2026",
    title: "Consultation evidence mapped",
    detail:
      "Task Force reports and public consultation themes are connected to persona topics."
  }
];

const normalizeText = (value: string) => value.toLowerCase().replace(/\s+/g, " ").trim();

const forceLabels = ["Money", "Law", "Promise", "Still open"] as const;

const commitmentForceDefinitions = [
  {
    label: "Law",
    detail: "A legal or regulatory move, such as legislation, statutory review, enforceable rules, or formal standards work."
  },
  {
    label: "Money",
    detail: "A named funding envelope, program investment, procurement commitment, or financial instrument."
  },
  {
    label: "Promise",
    detail: "An official commitment or direction in the strategy. It may still need law, money, timelines, or delivery rules."
  },
  {
    label: "Still open",
    detail: "A delivery question remains, such as who owns it, when it happens, how it is enforced, or how success is measured."
  }
] as const;

const debateStanceLabels: Record<DebateStance, string> = {
  positive: "Positive",
  negative: "Critical",
  mixed: "Mixed"
};

function getPersonaTheme(personaId?: string, themeId?: string) {
  const persona = personas.find((entry) => entry.id === personaId) ?? personas[0];
  const theme = persona.themes.find((entry) => entry.id === themeId) ?? persona.themes[0];

  return { persona, theme };
}

function getTopicHref(personaId: string, themeId: string) {
  return personaHash(personaId, themeId);
}

function getTopicQuestion(theme: Theme) {
  return theme.questions[0] ?? theme.label;
}

function getActionTopicMatches(action: PolicyAction) {
  return action.matches.flatMap((match) => {
    const persona = personas.find((entry) => entry.id === match.personaId);

    if (!persona) {
      return [];
    }

    return match.themeIds.flatMap((themeId) => {
      const theme = persona.themes.find((entry) => entry.id === themeId);

      if (!theme) {
        return [];
      }

      return [{ persona, theme }];
    });
  });
}

function getDebateTopicMatches(entry: DebateEntry) {
  return entry.matches.flatMap((match) => {
    const persona = personas.find((item) => item.id === match.personaId);

    if (!persona) {
      return [];
    }

    return match.themeIds.flatMap((themeId) => {
      const theme = persona.themes.find((item) => item.id === themeId);

      if (!theme) {
        return [];
      }

      return [{ persona, theme }];
    });
  });
}

function getV2SearchResults(query: string): V2SearchResult[] {
  const needle = normalizeText(query);

  if (needle.length < 2) {
    return [];
  }

  const topicResults = topicEntries
    .filter(({ persona, theme }) =>
      normalizeText(
        `${persona.name} ${persona.question} ${persona.summary} ${theme.label} ${theme.eyebrow} ${theme.questions.join(
          " "
        )} ${theme.answer} ${theme.stillOpen}`
      ).includes(needle)
    )
    .slice(0, 5)
    .map(({ persona, theme }) => ({
      type: "topic" as const,
      title: `${persona.name}: ${getTopicQuestion(theme)}`,
      eyebrow: "Question path",
      description: theme.answer,
      href: getTopicHref(persona.id, theme.id)
    }));

  const actionResults = actionLedger
    .filter((entry) =>
      normalizeText(`${entry.id} ${entry.pillar} ${entry.sourceSection} ${entry.summary} ${entry.forces.join(" ")}`)
        .includes(needle)
    )
    .slice(0, 5)
    .map((entry) => ({
      type: "action" as const,
      title: `${entry.id}: ${entry.sourceSection}`,
      eyebrow: "Official key action",
      description: entry.summary,
      href: v2ActionHash()
    }));

  const debateResults = debateLedger
    .filter((entry) =>
      normalizeText(`${entry.title} ${entry.sourceName} ${entry.summary} ${entry.debatePoint} ${entry.tags.join(" ")}`)
        .includes(needle)
    )
    .slice(0, 5)
    .map((entry) => ({
      type: "debate" as const,
      title: entry.title,
      eyebrow: `${debateStanceLabels[entry.stance]} debate signal`,
      description: entry.debatePoint,
      href: v2DebateHash()
    }));

  return [...topicResults, ...actionResults, ...debateResults].slice(0, 10);
}

function SignalBadge({
  label,
  value,
  tone
}: {
  label: string;
  value: string;
  tone: "coverage" | "backing" | "debate";
}) {
  const normalizedValue = value.toLowerCase();
  const variant =
    normalizedValue.includes("open") || value === "High" || value === "Quiet"
      ? "open"
      : value === "Clear" || value === "Low"
      ? "strong"
      : value === "Some" ||
          value === "Medium" ||
          value.includes("Money") ||
          normalizedValue.includes("funded")
        ? "medium"
        : "neutral";

  return (
    <span className={`signal signal-${tone} signal-${variant}`} title={`${label}: ${value}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </span>
  );
}

function CommitmentForceGuide({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className={`commitment-force-guide ${compact ? "commitment-force-guide-compact" : ""}`}
      aria-label="Commitment force definitions"
    >
      <div>
        <p className="v2-kicker">Policy vs promise</p>
        <h2>What gives a commitment force?</h2>
        <p>
          Policy is the overall direction. These tags explain whether each promise appears to be
          backed by legal tools, money, delivery detail, or unresolved implementation questions.
          Tags can stack on the same action.
        </p>
      </div>
      <dl>
        {commitmentForceDefinitions.map((entry) => (
          <div key={entry.label}>
            <dt className={`action-force-${entry.label.toLowerCase().replace(/\s/g, "-")}`}>
              {entry.label}
            </dt>
            <dd>{entry.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function ShareButton({ title, text, href }: { title: string; text: string; href?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = new URL(href ?? (window.location.hash || "#/"), window.location.href).toString();

    if (navigator.share) {
      await navigator.share({ title, text, url });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button className="v2-share-button" onClick={share} type="button">
      {copied ? <Copy size={16} aria-hidden="true" /> : <Share2 size={16} aria-hidden="true" />}
      {copied ? "Copied" : "Share"}
    </button>
  );
}

function V2Nav({ current }: { current: AppRoute["page"] }) {
  const navItems = [
    { label: "Questions", href: v2HomeHash(), page: "home" },
    { label: "60 Actions", href: v2ActionHash(), page: "actions" },
    { label: "Debates", href: v2DebateHash(), page: "debates" },
    { label: "Method", href: v2MethodologyHash(), page: "methodology" }
  ];

  return (
    <header className="v2-nav">
      <a className="v2-brand" href={v2HomeHash()}>
        <ShieldCheck size={19} aria-hidden="true" />
        <span>
          <strong>Canada AI Strategy Atlas</strong>
          <small>A GovAI.fm civic project</small>
        </span>
      </a>
      <nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <a className={current === item.page ? "is-active" : ""} href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function V2SearchBox({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => getV2SearchResults(query), [query]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (results[0]) {
      window.location.hash = results[0].href.replace(/^#/, "");
    }
  };

  return (
    <form className={`v2-search ${compact ? "v2-search-compact" : ""}`} onSubmit={submitSearch}>
      <label htmlFor={compact ? "v2-search-compact" : "v2-search-home"}>
        Search questions, commitments, debates, and sources
      </label>
      <div className="v2-search-row">
        <Search size={19} aria-hidden="true" />
        <input
          id={compact ? "v2-search-compact" : "v2-search-home"}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try privacy, jobs, deepfakes, compute, health..."
          type="search"
          value={query}
        />
        <button type="submit">Go</button>
      </div>
      {results.length > 0 && (
        <div className="v2-search-results">
          {results.map((result) => (
            <a href={result.href} key={`${result.type}-${result.title}`}>
              <span>{result.eyebrow}</span>
              <strong>{result.title}</strong>
              <small>{result.description}</small>
            </a>
          ))}
        </div>
      )}
    </form>
  );
}

function V2HomePage() {
  const actionCounts = countActionForces(actionLedger);
  const debateScore = debateLedger.length
    ? Math.round(debateLedger.reduce((sum, entry) => sum + getDebateScore(entry), 0) / debateLedger.length)
    : 0;

  return (
    <main className="v2-page">
      <V2Nav current="home" />
      <section className="v2-hero" aria-label="Canada AI Strategy Atlas">
        <div className="v2-hero-copy">
          <p className="v2-kicker">V2 civic atlas · Last updated June 8, 2026</p>
          <h1>Understand Canada’s AI strategy by the question you actually have.</h1>
          <p>
            A public-facing map of AI for All: plain-language answers, verbatim commitments,
            debate signals, consultation evidence, comparator strategies, and the open questions
            Canadians should keep tracking.
          </p>
          <div className="v2-hero-actions">
            <a className="v2-primary-link" href="#role-paths">
              Pick your path
            </a>
            <a className="v2-secondary-link" href={v2ActionHash()}>
              Track the 60 actions
            </a>
            <ShareButton
              href={v2HomeHash()}
              text="Canada AI Strategy Atlas explains AI for All by question, commitment, debate, and evidence."
              title="Canada AI Strategy Atlas"
            />
          </div>
        </div>
        <aside className="v2-hero-panel" aria-label="Atlas status">
          <strong>Live accountability surface</strong>
          <div>
            <span>{actionLedger.length}</span>
            <p>official key actions</p>
          </div>
          <div>
            <span>{topicEntries.length}</span>
            <p>question paths</p>
          </div>
          <div>
            <span>{debateLedger.length}</span>
            <p>debate signals</p>
          </div>
          <small>
            {actionCounts.Money} funded · {actionCounts.Law} legal · {actionCounts["Still open"]} still open ·
            debate heat avg. {debateScore}
          </small>
        </aside>
      </section>

      <section className="v2-search-section" aria-label="Search the atlas">
        <V2SearchBox />
      </section>

      <section className="v2-role-section" id="role-paths" aria-label="Question paths">
        <div className="v2-section-heading">
          <p className="v2-kicker">Start with a human question</p>
          <h2>Six ways into the same strategy.</h2>
          <p>
            The official strategy has pillars. Canadians have roles, worries, ambitions, and
            practical decisions. Pick the door that matches the conversation you want to have.
          </p>
        </div>
        <div className="v2-role-grid">
          {personas.map((persona) => (
            <a
              className="v2-role-card"
              href={personaHash(persona.id)}
              key={persona.id}
              style={{ "--accent": persona.accent } as CSSProperties}
            >
              <img src={persona.image} alt="" />
              <span>
                <small>{persona.name}</small>
                <strong>{persona.question}</strong>
                <em>{persona.themes.length} topics</em>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="v2-map-section" aria-label="Atlas layers">
        <div className="v2-layer-card">
          <FileText size={20} aria-hidden="true" />
          <strong>Answer</strong>
          <p>Plain-language topic pages explain what Canada says, what it means, and what remains unresolved.</p>
        </div>
        <div className="v2-layer-card">
          <BookOpen size={20} aria-hidden="true" />
          <strong>Evidence</strong>
          <p>Official strategy text, consultations, expert reports, public input, and country comparators sit underneath each answer.</p>
        </div>
        <div className="v2-layer-card">
          <ListChecks size={20} aria-hidden="true" />
          <strong>Accountability</strong>
          <p>The 60 verbatim key actions are tagged by commitment force: law, money, promise, and still-open delivery work.</p>
        </div>
        <div className="v2-layer-card">
          <MessageCircle size={20} aria-hidden="true" />
          <strong>Debate</strong>
          <p>Signals from media, researchers, advocates, industry, and community voices show where discussion is heating up.</p>
        </div>
      </section>

      <section className="v2-update-section" aria-label="What changed">
        <div className="v2-section-heading">
          <p className="v2-kicker">What changed?</p>
          <h2>A strategy hub should have memory.</h2>
        </div>
        <div className="v2-update-grid">
          {updateCards.map((card) => (
            <article className="v2-update-card" key={card.title}>
              <span>{card.date}</span>
              <strong>{card.title}</strong>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-trust-strip" aria-label="Trust markers">
        <span>Independent explainer, not an official Government of Canada site</span>
        <a href="https://www.govai.fm/" target="_blank" rel="noreferrer">
          Built by GovAI.fm
        </a>
        <span>Key actions quoted verbatim</span>
        <span>Source-led and update-ready</span>
        <a href={v2MethodologyHash()}>Read methodology</a>
      </section>
    </main>
  );
}

function V2ActionTrackerPage() {
  const [query, setQuery] = useState("");
  const [forceFilter, setForceFilter] = useState<"All" | (typeof forceLabels)[number]>("All");
  const counts = countActionForces(actionLedger);
  const filteredActions = actionLedger.filter((entry) => {
    const matchesForce = forceFilter === "All" || entry.forces.includes(forceFilter);
    const matchesQuery =
      normalizeText(`${entry.id} ${entry.pillar} ${entry.sourceSection} ${entry.summary}`).includes(
        normalizeText(query)
      ) || query.trim().length === 0;

    return matchesForce && matchesQuery;
  });

  return (
    <main className="v2-page">
      <V2Nav current="actions" />
      <section className="v2-index-hero">
        <div>
          <p className="v2-kicker">Accountability tracker</p>
          <h1>All 60 official key actions, searchable and mapped back to Canadians’ questions.</h1>
          <p>
            Wording is verbatim from the strategy. The tracker adds interpretation only through
            commitment force, country comparison, and topic mapping.
          </p>
        </div>
        <ShareButton
          href={v2ActionHash()}
          text="Track all 60 official key actions in Canada’s AI for All strategy."
          title="AI for All 60-action tracker"
        />
      </section>

      <section className="v2-filter-bar" aria-label="Action filters">
        <label>
          <Search size={16} aria-hidden="true" />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter actions by privacy, compute, jobs..."
            type="search"
            value={query}
          />
        </label>
        <div className="v2-filter-buttons">
          {(["All", ...forceLabels] as const).map((force) => (
            <button
              className={forceFilter === force ? "is-active" : ""}
              key={force}
              onClick={() => setForceFilter(force)}
              type="button"
            >
              {force}
            </button>
          ))}
        </div>
      </section>

      <section className="v2-action-stats" aria-label="Action counts">
        <span>
          <strong>{actionLedger.length}</strong>
          total
        </span>
        <span>
          <strong>{counts.Money}</strong>
          funded
        </span>
        <span>
          <strong>{counts.Law}</strong>
          legal
        </span>
        <span>
          <strong>{counts.Promise}</strong>
          promised
        </span>
        <span>
          <strong>{counts["Still open"]}</strong>
          still open
        </span>
      </section>

      <CommitmentForceGuide compact />

      <section className="v2-action-index" aria-label="Filtered action list">
        {filteredActions.map((entry) => {
          const matches = getActionTopicMatches(entry);

          return (
            <article className="v2-action-row" id={entry.id} key={entry.id}>
              <div className="v2-action-row-top">
                <span>{entry.id}</span>
                <strong>{entry.pillar}</strong>
                <em>{entry.sourceSection}</em>
              </div>
              <p>{entry.summary}</p>
              <div className="action-force-tags" aria-label="Commitment type">
                {entry.forces.map((force) => (
                  <span className={`action-force-${force.toLowerCase().replace(/\s/g, "-")}`} key={force}>
                    {force}
                  </span>
                ))}
              </div>
              <div className="v2-topic-links">
                {matches.slice(0, 5).map(({ persona, theme }) => (
                  <a href={getTopicHref(persona.id, theme.id)} key={`${entry.id}-${persona.id}-${theme.id}`}>
                    {persona.name}: {theme.label}
                  </a>
                ))}
                {matches.length > 5 && <span>+{matches.length - 5} more topics</span>}
              </div>
              <a className="action-link" href={entry.sourceUrl} target="_blank" rel="noreferrer">
                Open exact key action
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function V2DebateHubPage() {
  const [query, setQuery] = useState("");
  const [stanceFilter, setStanceFilter] = useState<"All" | DebateStance>("All");
  const filteredDebates = debateLedger
    .filter((entry) => {
      const matchesStance = stanceFilter === "All" || entry.stance === stanceFilter;
      const matchesQuery =
        query.trim().length === 0 ||
        normalizeText(`${entry.title} ${entry.sourceName} ${entry.debatePoint} ${entry.summary} ${entry.tags.join(" ")}`)
          .includes(normalizeText(query));

      return matchesStance && matchesQuery;
    })
    .sort((a, b) => getDebateScore(b) - getDebateScore(a));

  return (
    <main className="v2-page">
      <V2Nav current="debates" />
      <section className="v2-index-hero">
        <div>
          <p className="v2-kicker">Discussion radar</p>
          <h1>The public conversation around AI for All, organized by signal and stance.</h1>
          <p>
            This is where the atlas becomes a watering hole: sources, critique, support, gaps, and
            emerging questions can be tracked together instead of scattered across feeds.
          </p>
        </div>
        <ShareButton
          href={v2DebateHash()}
          text="Track debate signals around Canada’s AI for All strategy."
          title="AI for All debate hub"
        />
      </section>

      <section className="v2-filter-bar" aria-label="Debate filters">
        <label>
          <Search size={16} aria-hidden="true" />
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by source, tag, topic..."
            type="search"
            value={query}
          />
        </label>
        <div className="v2-filter-buttons">
          {(["All", "positive", "mixed", "negative"] as const).map((stance) => (
            <button
              className={stanceFilter === stance ? "is-active" : ""}
              key={stance}
              onClick={() => setStanceFilter(stance)}
              type="button"
            >
              {stance === "All" ? "All" : debateStanceLabels[stance]}
            </button>
          ))}
        </div>
      </section>

      <section className="v2-debate-index" aria-label="Debate signals">
        {filteredDebates.map((entry) => {
          const matches = getDebateTopicMatches(entry);

          return (
            <article className="v2-debate-row" key={entry.id}>
              <div className="debate-card-topline">
                <span className={`stance-pill stance-${entry.stance}`}>
                  {debateStanceLabels[entry.stance]}
                </span>
                <span className="debate-score">Heat {getDebateScore(entry)}</span>
              </div>
              <h2>{entry.title}</h2>
              <p>{entry.debatePoint}</p>
              <div className="debate-meta">
                <span>{entry.sourceName}</span>
                <span>{entry.platform}</span>
                <span>{formatLedgerDate(entry.publishedDate)}</span>
              </div>
              <div className="debate-tags">
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="v2-topic-links">
                {matches.slice(0, 4).map(({ persona, theme }) => (
                  <a href={getTopicHref(persona.id, theme.id)} key={`${entry.id}-${persona.id}-${theme.id}`}>
                    {persona.name}: {theme.label}
                  </a>
                ))}
              </div>
              <a className="debate-link" href={entry.url} target="_blank" rel="noreferrer">
                Open source
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </section>
    </main>
  );
}

function V2TopicPanel({ persona, theme }: { persona: Persona; theme: Theme }) {
  const actions = getActionsForTheme(persona.id, theme.id);
  const debates = getDebatesForTheme(persona.id, theme.id);
  const consultationInputs = getConsultationInputsForTheme(persona.id, theme.id);
  const actionForce = actions.length > 0 ? summarizeActionForces(actions) : theme.backing.join(" / ");
  const canadaReceiptGroups = theme.receipts.filter((group) => group.label === "Strategy text");
  const comparisonReceiptGroups = theme.receipts.filter((group) => group.label === "Other countries");
  const inputReceiptGroups = theme.receipts.filter(
    (group) => group.label === "Public input" || group.label === "Expert commentary"
  );

  return (
    <article className="v2-topic-panel">
      <div className="v2-topic-heading">
        <div>
          <p className="v2-kicker">{theme.eyebrow}</p>
          <span className="v2-topic-label-pill">{theme.label}</span>
          <h1>{getTopicQuestion(theme)}</h1>
        </div>
        <ShareButton
          href={getTopicHref(persona.id, theme.id)}
          text={`${persona.name}: ${getTopicQuestion(theme)} in Canada’s AI for All strategy.`}
          title={`${persona.name}: ${getTopicQuestion(theme)}`}
        />
      </div>

      <div className="v2-answer-card">
        <div>
          <span>Short answer</span>
          <p>{theme.answer}</p>
        </div>
        <div>
          <span>What Canadians are asking</span>
          <ul>
            {theme.questions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="v2-signal-grid" aria-label="Topic signal">
        <span>
          <small>How clearly answered?</small>
          <strong>{theme.coverage}</strong>
        </span>
        <span>
          <small>Commitment type</small>
          <strong>{actionForce}</strong>
        </span>
        <span>
          <small>Debate heat</small>
          <strong>{theme.debate}</strong>
        </span>
        <span>
          <small>Mapped evidence</small>
          <strong>{consultationInputs.length} inputs · {debates.length} debates</strong>
        </span>
      </div>

      <div className="v2-open-question">
        <CircleAlert size={18} aria-hidden="true" />
        <div>
          <strong>Still open</strong>
          <p>{theme.stillOpen}</p>
        </div>
      </div>

      <EvidenceBand
        groups={canadaReceiptGroups}
        note="Official AI for All material connected to this topic."
        title="Canada says"
        variant="canada"
      />

      <div className="compare-note">
        <h3>How others handle it</h3>
        <p>{theme.comparator}</p>
      </div>

      <EvidenceBand
        groups={comparisonReceiptGroups}
        note="Comparator laws, strategies, standards, and global norms for this issue."
        title="Comparator receipts"
        variant="comparison"
      />

      <DebateLedgerSection persona={persona} theme={theme} />
      <ActionLedgerSection actions={actions} />
      <TopicConsultationSection defaultOpen={false} persona={persona} theme={theme} />

      <EvidenceBand
        groups={inputReceiptGroups}
        note="Public consultation, expert commentary, and critique linked to this topic."
        title="Public & expert receipts"
        variant="input"
      />

      <ReceiptDrawer theme={theme} />
    </article>
  );
}

function V2PersonaPage({
  persona,
  selectedThemeId,
  onSelectTheme
}: {
  persona: Persona;
  selectedThemeId?: string;
  onSelectTheme: (theme: Theme) => void;
}) {
  const selectedTheme = useMemo(
    () => persona.themes.find((theme) => theme.id === selectedThemeId) ?? persona.themes[0],
    [persona.themes, selectedThemeId]
  );

  return (
    <main className="v2-page">
      <V2Nav current="persona" />
      <section className="v2-persona-layout" style={{ "--accent": persona.accent } as CSSProperties}>
        <aside className="v2-persona-sidebar">
          <img src={persona.image} alt={persona.imageAlt} />
          <p>{persona.name}</p>
          <h1>{persona.question}</h1>
          <span>{persona.summary}</span>
          <div className="v2-topic-nav" aria-label={`${persona.name} question topics`}>
            {persona.themes.map((theme) => (
              <button
                className={theme.id === selectedTheme.id ? "is-active" : ""}
                aria-label={getTopicQuestion(theme)}
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                type="button"
              >
                <span>{theme.label}</span>
                <strong>{getTopicQuestion(theme)}</strong>
              </button>
            ))}
          </div>
        </aside>
        <V2TopicPanel persona={persona} theme={selectedTheme} />
      </section>
    </main>
  );
}

function V2MethodologyPage() {
  return (
    <main className="v2-page">
      <V2Nav current="methodology" />
      <section className="v2-index-hero">
        <div>
          <p className="v2-kicker">Trust and method</p>
          <h1>How the atlas separates explanation, evidence, debate, and accountability.</h1>
          <p>
            This site is an independent explainer. It is designed to help Canadians understand AI
            for All without pretending the launch document answers every implementation question.
          </p>
        </div>
      </section>
      <section className="v2-method-grid">
        <article>
          <ShieldCheck size={20} aria-hidden="true" />
          <h2>Source hierarchy</h2>
          <p>Official strategy and launch material are separated from public consultation, expert reports, comparator strategies, and commentary.</p>
        </article>
        <article>
          <ListChecks size={20} aria-hidden="true" />
          <h2>Verbatim commitments</h2>
          <p>The 60 key actions are quoted exactly from the official strategy and linked with text-fragment URLs where possible.</p>
        </article>
        <article>
          <Filter size={20} aria-hidden="true" />
          <h2>Commitment force</h2>
          <p>Policy is the overall direction. Promise, law, money, and still open describe how much force each commitment appears to have.</p>
        </article>
        <article>
          <CalendarClock size={20} aria-hidden="true" />
          <h2>Update loop</h2>
          <p>The atlas should be updated when new legislation, program guidance, funding details, debate sources, or delivery milestones appear.</p>
        </article>
      </section>
      <CommitmentForceGuide />
      <section className="v2-trust-strip">
        <span>Independent explainer by GovAI.fm</span>
        <span>Not an official Government of Canada site</span>
        <span>Last content update: June 8, 2026</span>
        <a href="https://www.govai.fm/" target="_blank" rel="noreferrer">
          Visit GovAI.fm
        </a>
      </section>
    </main>
  );
}

function PersonaTile({
  persona,
  onOpen
}: {
  persona: Persona;
  onOpen: (persona: Persona) => void;
}) {
  return (
    <button
      aria-label={`Open ${persona.name}: ${persona.question}`}
      className="persona-tile"
      style={{ "--accent": persona.accent } as CSSProperties}
      onClick={() => onOpen(persona)}
      type="button"
    >
      <img src={persona.image} alt="" />
      <span className="persona-shade" />
      <span className="tile-state">Open portal</span>
      <span className="persona-copy">
        <span>{persona.name}</span>
        <strong>{persona.question}</strong>
      </span>
    </button>
  );
}

function ReceiptLinks({ group, compact = false }: { group: ReceiptGroup; compact?: boolean }) {
  return (
    <section className="receipt-group" key={group.label}>
      <h4>{group.label}</h4>
      {group.sources.map((source) => (
        <a
          className={`receipt-link ${compact ? "receipt-link-compact" : ""}`}
          href={source.url}
          key={source.id}
          target="_blank"
          rel="noreferrer"
        >
          <span>
            <strong>{source.title}</strong>
            <em>{source.section}</em>
            {!compact && <small>{source.evidence}</small>}
          </span>
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      ))}
    </section>
  );
}

function EvidenceBand({
  title,
  note,
  groups,
  variant
}: {
  title: string;
  note: string;
  groups: ReceiptGroup[];
  variant: "canada" | "comparison" | "input";
}) {
  if (groups.length === 0) {
    return null;
  }

  return (
    <section className={`evidence-band evidence-band-${variant}`}>
      <div className="evidence-band-copy">
        <h3>{title}</h3>
        <p>{note}</p>
      </div>
      <div className="inline-receipts">
        {groups.map((group) => (
          <ReceiptLinks compact group={group} key={group.label} />
        ))}
      </div>
    </section>
  );
}

function ReceiptDrawer({ theme }: { theme: Theme }) {
  return (
    <details className="receipts">
      <summary>
        <BookOpen size={18} aria-hidden="true" />
        <span>All source links</span>
      </summary>
      <div className="receipt-groups">
        {theme.receipts.map((group) => (
          <ReceiptLinks group={group} key={group.label} />
        ))}
      </div>
    </details>
  );
}

const stanceLabels: Record<DebateEntry["stance"], string> = {
  positive: "Positive",
  negative: "Critical",
  mixed: "Mixed"
};

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

function formatLedgerDate(value: string) {
  const date = new Date(`${value}T12:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return dateFormatter.format(date);
}

function readDebateSuggestions(): DebateSuggestion[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(suggestionStorageKey);

    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as DebateSuggestion[]) : [];
  } catch {
    return [];
  }
}

function isValidHttpUrl(value: string) {
  try {
    const url = new URL(value);

    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

function DebateLedgerSection({ persona, theme }: { persona: Persona; theme: Theme }) {
  const [showAll, setShowAll] = useState(false);
  const [suggestedUrl, setSuggestedUrl] = useState("");
  const [suggestionMessage, setSuggestionMessage] = useState("");
  const [suggestions, setSuggestions] = useState<DebateSuggestion[]>(() => readDebateSuggestions());
  const debates = getDebatesForTheme(persona.id, theme.id);
  const visibleDebates = showAll ? debates : debates.slice(0, 3);
  const topScore = debates[0] ? getDebateScore(debates[0]) : 0;
  const topicSuggestions = suggestions.filter(
    (suggestion) => suggestion.personaId === persona.id && suggestion.themeId === theme.id
  );
  const lastSeen = debates
    .map((entry) => entry.lastSeenDate)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

  useEffect(() => {
    setShowAll(false);
    setSuggestedUrl("");
    setSuggestionMessage("");
  }, [persona.id, theme.id]);

  const saveSuggestions = (nextSuggestions: DebateSuggestion[]) => {
    setSuggestions(nextSuggestions);
    window.localStorage.setItem(suggestionStorageKey, JSON.stringify(nextSuggestions));
  };

  const submitSuggestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUrl = suggestedUrl.trim();

    if (!isValidHttpUrl(trimmedUrl)) {
      setSuggestionMessage("Add a full URL starting with http or https.");
      return;
    }

    if (
      suggestions.some(
        (suggestion) =>
          suggestion.personaId === persona.id &&
          suggestion.themeId === theme.id &&
          suggestion.url.toLowerCase() === trimmedUrl.toLowerCase()
      )
    ) {
      setSuggestionMessage("Already queued for this topic.");
      return;
    }

    saveSuggestions([
      ...suggestions,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        personaId: persona.id,
        themeId: theme.id,
        url: trimmedUrl,
        submittedAt: new Date().toISOString()
      }
    ]);
    setSuggestedUrl("");
    setSuggestionMessage("Queued for review in this browser.");
  };

  const copyTopicSuggestions = async () => {
    const payload = topicSuggestions.map(({ url, personaId, themeId, submittedAt }) => ({
      url,
      personaId,
      themeId,
      submittedAt
    }));

    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setSuggestionMessage("Copied this topic's review queue.");
  };

  const clearTopicSuggestions = () => {
    saveSuggestions(
      suggestions.filter(
        (suggestion) => suggestion.personaId !== persona.id || suggestion.themeId !== theme.id
      )
    );
    setSuggestionMessage("Cleared this topic's queue.");
  };

  return (
    <details className="debate-ledger">
      <summary>
        <span className="debate-summary-main">
          <MessageCircle size={18} aria-hidden="true" />
          <span>
            <strong>Debates to watch</strong>
            <small>
              {debates.length > 0
                ? `${debates.length} signals matched to this topic${
                    lastSeen ? ` · Updated ${formatLedgerDate(lastSeen)}` : ""
                  }`
                : "No tracked debate signals yet"}
            </small>
          </span>
        </span>
        <span className="debate-summary-score">
          <TrendingUp size={16} aria-hidden="true" />
          {topScore}
        </span>
        <ChevronDown className="debate-chevron" size={18} aria-hidden="true" />
      </summary>

      <div className="debate-toolbar">
        <span>Ranked by authority, reach, and recency</span>
        <span>{debates.length > 0 ? (showAll ? "Full ledger" : "Top signals") : "Open slot"}</span>
      </div>

      {visibleDebates.length > 0 ? (
        <div className="debate-list">
          {visibleDebates.map((entry) => {
            const score = getDebateScore(entry);

            return (
              <article className="debate-card" key={entry.id}>
                <div className="debate-card-topline">
                  <span className={`stance-pill stance-${entry.stance}`}>
                    {stanceLabels[entry.stance]}
                  </span>
                  <span className="debate-score">{score}</span>
                </div>
                <h3>{entry.title}</h3>
                <p>{entry.debatePoint}</p>
                <div className="debate-meta">
                  <span>{entry.sourceName}</span>
                  <span>{entry.platform}</span>
                  <span>{formatLedgerDate(entry.publishedDate)}</span>
                  {entry.status === "candidate" && <span>Needs review</span>}
                </div>
                <div className="debate-metrics" aria-label="Debate score inputs">
                  <span>Authority {entry.authorityScore.toFixed(1)}</span>
                  <span>Reach {entry.popularityScore.toFixed(1)}</span>
                  <span>Freshness {entry.recencyScore.toFixed(1)}</span>
                </div>
                <div className="debate-tags">
                  {entry.tags.slice(0, 5).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a className="debate-link" href={entry.url} target="_blank" rel="noreferrer">
                  Open source
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="debate-empty">
          <strong>No debate logged for this topic yet.</strong>
          <p>Use this slot to queue a source when you find a useful article, post, or thread.</p>
        </div>
      )}

      {debates.length > 3 && (
        <button className="debate-expand" onClick={() => setShowAll((value) => !value)} type="button">
          {showAll ? "Show top only" : `Show all ${debates.length}`}
        </button>
      )}

      <form className="debate-suggest" onSubmit={submitSuggestion}>
        <label htmlFor={`debate-url-${persona.id}-${theme.id}`}>Suggest a debate URL</label>
        <div className="debate-suggest-row">
          <input
            id={`debate-url-${persona.id}-${theme.id}`}
            inputMode="url"
            onChange={(event) => {
              setSuggestedUrl(event.target.value);
              setSuggestionMessage("");
            }}
            placeholder="https://..."
            type="url"
            value={suggestedUrl}
          />
          <button type="submit">Queue</button>
        </div>
        <div className="debate-suggest-footer">
          <span>
            {topicSuggestions.length > 0
              ? `${topicSuggestions.length} queued for this topic`
              : "Queued links stay local until copied into the research file"}
          </span>
          {topicSuggestions.length > 0 && (
            <span className="debate-suggest-actions">
              <button onClick={copyTopicSuggestions} type="button">
                Copy queue
              </button>
              <button onClick={clearTopicSuggestions} type="button">
                Clear queue
              </button>
            </span>
          )}
        </div>
        {suggestionMessage && <p className="debate-suggest-message">{suggestionMessage}</p>}
      </form>
    </details>
  );
}

function ActionLedgerSection({ actions }: { actions: PolicyAction[] }) {
  const counts = countActionForces(actions);

  if (actions.length === 0) {
    return null;
  }

  return (
    <details className="action-ledger">
      <summary>
        <span className="action-summary-main">
          <ListChecks size={18} aria-hidden="true" />
          <span>
            <strong>Key actions</strong>
            <small>{actions.length} official actions matched to this topic</small>
          </span>
        </span>
        <span className="action-summary-score">
          {summarizeActionForces(actions)}
        </span>
        <ChevronDown className="action-chevron" size={18} aria-hidden="true" />
      </summary>

      <div className="action-toolbar">
        <span>Official strategy commitments</span>
        <span>
          {counts.Money} funded · {counts.Law} legal · {counts["Still open"]} open
        </span>
      </div>

      <div className="action-list">
        {actions.map((entry) => (
          <article className="action-card" key={entry.id}>
            <div className="action-card-topline">
              <span className="action-id">{entry.id}</span>
              <span>{entry.pillar}</span>
              <span>{entry.sourceSection}</span>
            </div>
            <p>{entry.summary}</p>
            <div className="action-force-tags" aria-label="Action force">
              {entry.forces.map((force) => (
                <span className={`action-force-${force.toLowerCase().replace(/\s/g, "-")}`} key={force}>
                  {force}
                </span>
              ))}
            </div>
            <a className="action-link" href={entry.sourceUrl} target="_blank" rel="noreferrer">
              Open strategy
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>
    </details>
  );
}

const consultationSourceLabels: Record<ConsultationInput["source"], string> = {
  "expert-report": "Expert report",
  "public-consultation": "Public input"
};

function ConsultationCard({ input, compact = false }: { input: ConsultationInput; compact?: boolean }) {
  const documentUrl = getConsultationDocumentUrl(input);

  return (
    <article className={`consultation-card ${compact ? "consultation-card-compact" : ""}`}>
      <div className="consultation-card-topline">
        <span>{consultationSourceLabels[input.source]}</span>
        <strong>{input.focusArea}</strong>
      </div>
      <h3>{input.contributor}</h3>
      <p>{input.keyIdea}</p>
      {!compact && <small>{input.evidence}</small>}
      <div className="consultation-card-footer">
        <span>{input.echoCount ? `${input.echoCount.toLocaleString()} ${input.echoLabel}` : input.echoLabel}</span>
      </div>
      {input.evidenceRows && input.evidenceRows.length > 0 && (
        <details className="public-evidence-lines">
          <summary>View matched spreadsheet lines</summary>
          <div>
            {input.evidenceRows.map((row) => (
              <section key={`${input.id}-${row.rowNumber}`}>
                <strong>Row {row.rowNumber}</strong>
                <span>{row.question}</span>
                <p>{row.excerpt}</p>
              </section>
            ))}
          </div>
        </details>
      )}
      <a className="consultation-doc-link" href={documentUrl} target="_blank" rel="noreferrer">
        {getConsultationDocumentLabel(input)}
        <ArrowUpRight size={14} aria-hidden="true" />
      </a>
    </article>
  );
}

function TopicConsultationSection({
  persona,
  theme,
  defaultOpen = true
}: {
  persona: Persona;
  theme: Theme;
  defaultOpen?: boolean;
}) {
  const inputs = getConsultationInputsForTheme(persona.id, theme.id);

  if (inputs.length === 0) {
    return null;
  }

  const expertCount = inputs.filter((input) => input.source === "expert-report").length;
  const publicCount = inputs.length - expertCount;

  return (
    <details className="topic-consultation" open={defaultOpen}>
      <summary>
        <span className="debate-summary-main">
          <ClipboardList size={18} aria-hidden="true" />
          <span>
            <strong>Input received from consultation</strong>
            <small>
              {expertCount} expert ideas
              {publicCount ? ` · ${publicCount} public themes` : ""}
            </small>
          </span>
        </span>
        <ChevronDown className="debate-chevron" size={18} aria-hidden="true" />
      </summary>
      <div className="topic-consultation-list">
        {inputs.map((input) => (
          <ConsultationCard compact input={input} key={input.id} />
        ))}
      </div>
    </details>
  );
}

function ThemePanel({ persona, theme }: { persona: Persona; theme: Theme }) {
  const actions = getActionsForTheme(persona.id, theme.id);
  const actionForce = actions.length > 0 ? summarizeActionForces(actions) : theme.backing.join(" / ");
  const canadaReceiptGroups = theme.receipts.filter((group) => group.label === "Strategy text");
  const comparisonReceiptGroups = theme.receipts.filter((group) => group.label === "Other countries");
  const inputReceiptGroups = theme.receipts.filter(
    (group) => group.label === "Public input" || group.label === "Expert commentary"
  );

  return (
    <article className="theme-panel">
      <p className="eyebrow">{theme.eyebrow}</p>
      <h2>{theme.label}</h2>

      <div className="question-stack">
        {theme.questions.map((question) => (
          <p key={question}>{question}</p>
        ))}
      </div>

      <p className="plain-answer">{theme.answer}</p>

      <EvidenceBand
        groups={canadaReceiptGroups}
        note="Official AI for All material connected to this topic."
        title="Canada says"
        variant="canada"
      />

      <div className="signals" aria-label="Strategy signal">
        <SignalBadge label="Coverage" value={theme.coverage} tone="coverage" />
        <SignalBadge label="Commitment force" value={actionForce} tone="backing" />
        <SignalBadge label="Debate" value={theme.debate} tone="debate" />
      </div>

      <div className="pillar-row">
        {theme.pillars.map((pillar) => (
          <span key={pillar}>{pillar}</span>
        ))}
      </div>

      <div className="compare-note">
        <h3>How others handle it</h3>
        <p>{theme.comparator}</p>
      </div>

      <EvidenceBand
        groups={comparisonReceiptGroups}
        note="Comparator laws, strategies, standards, and global norms for this issue."
        title="Comparator receipts"
        variant="comparison"
      />

      <div className="open-note">
        <CircleAlert size={18} aria-hidden="true" />
        <p>{theme.stillOpen}</p>
      </div>

      <DebateLedgerSection persona={persona} theme={theme} />

      <ActionLedgerSection actions={actions} />

      <TopicConsultationSection persona={persona} theme={theme} />

      <EvidenceBand
        groups={inputReceiptGroups}
        note="Public consultation, expert commentary, and critique linked to this topic."
        title="Public & expert receipts"
        variant="input"
      />

      <ReceiptDrawer theme={theme} />
    </article>
  );
}

function PersonaPage({
  persona,
  selectedThemeId,
  onBack,
  onSelectTheme
}: {
  persona: Persona;
  selectedThemeId?: string;
  onBack: () => void;
  onSelectTheme: (theme: Theme) => void;
}) {
  const selectedTheme = useMemo(
    () => persona.themes.find((theme) => theme.id === selectedThemeId) ?? persona.themes[0],
    [persona.themes, selectedThemeId]
  );

  return (
    <main className="persona-page" style={{ "--accent": persona.accent } as CSSProperties}>
      <button className="back-button" onClick={onBack} type="button">
        <ArrowLeft size={18} aria-hidden="true" />
        Personas
      </button>

      <section className="portal-layout">
        <aside className="portal-identity">
          <img src={persona.image} alt={persona.imageAlt} />
          <div className="identity-copy">
            <p>{persona.name}</p>
            <h1>{persona.question}</h1>
            <span>{persona.summary}</span>
          </div>
          <div className="theme-chips" aria-label={`${persona.name} themes`}>
            {persona.themes.map((theme) => (
              <button
                className={theme.id === selectedTheme.id ? "is-active" : ""}
                key={theme.id}
                onClick={() => onSelectTheme(theme)}
                type="button"
              >
                {theme.label}
              </button>
            ))}
          </div>
        </aside>

        {selectedTheme && <ThemePanel persona={persona} theme={selectedTheme} />}
      </section>
    </main>
  );
}

function HomePage({ onOpen }: { onOpen: (persona: Persona) => void }) {
  return (
    <main className="home-page">
      <section className="editorial-context" aria-label="AI for All context">
        <div className="context-copy">
          <p className="kicker">Explainer | Launched June 4, 2026</p>
          <h1>Canada's AI for All strategy, explained by the question you bring to it.</h1>
          <p>
            Prime Minister Mark Carney launched the strategy as a national plan for trust,
            productivity, health, Canadian companies, and sovereign AI infrastructure. The promise
            is large. The implementation details are uneven. This guide separates what is clear,
            what is funded, and what remains open.
          </p>
        </div>
        <figure className="carney-figure">
          <img
            src="https://www.pm.gc.ca/sites/pm/files/2025-10/Photo-2025-07-29%2C-12-47-23-PM_4.jpg"
            alt="Prime Minister Mark Carney working in his office"
          />
          <figcaption>Prime Minister Mark Carney launched AI for All in Toronto.</figcaption>
        </figure>
      </section>

      <section className="home-intro">
        <p className="kicker">Canada's AI strategy, by your question</p>
        <h2>Six ways into AI for All.</h2>
        <p>
          The strategy has pillars. People have questions. This explainer starts with the question
          that feels closest to your life, then shows what the strategy says and what is still open.
        </p>
      </section>

      <section className="persona-grid" aria-label="Persona portals">
        {personas.map((persona) => (
          <PersonaTile persona={persona} onOpen={onOpen} key={persona.id} />
        ))}
      </section>

      <section className="promise-section" aria-label="Big promises in AI for All">
        <div className="section-heading">
          <p className="kicker">The national promise</p>
          <h2>Canada says AI for All is not just about risk. It is also a growth, jobs, and services agenda.</h2>
          <p>
            These are headline ambitions from the launch and strategy. Treat them as targets to track,
            not proof that outcomes have already arrived.
          </p>
        </div>
        <div className="promise-grid">
          {promiseCards.map((card) => (
            <article className="promise-card" key={card.value}>
              <strong>{card.value}</strong>
              <span>{card.label}</span>
              <p>{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="launch-overview" aria-label="AI for All launch overview">
        <div className="launch-copy">
          <p className="kicker">The strategy structure</p>
          <h2>The six pillars are the strategy's filing system. The personas are the reading path.</h2>
          <p>
            The pillars show how Ottawa organized the strategy. The role portals translate that structure
            into the questions people are more likely to ask first.
          </p>
          <div className="pillar-mini-grid" aria-label="Six strategy pillars">
            {pillars.map((pillar) => (
              <span key={pillar}>{pillar}</span>
            ))}
          </div>
          <a
            className="launch-link"
            href="https://www.pm.gc.ca/en/news/news-releases/2026/06/04/prime-minister-carney-launches-ai-all-canadas-new-national-artificial"
            target="_blank"
            rel="noreferrer"
          >
            Read the June 4 launch
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="consultation-section" aria-label="Input received from consultation">
        <div className="section-heading">
          <p className="kicker">Input received from consultation</p>
          <h2>What the Task Force and public asked Canada to build into AI for All.</h2>
          <p>
            The consultation produced 32 Task Force reports and more than 64,600 public
            responses. This ledger maps those ideas back to the explainer topics above.
          </p>
        </div>

        <div className="consultation-stats">
          <span>
            <strong>32</strong>
            expert reports
          </span>
          <span>
            <strong>9</strong>
            public themes over 5 echoes
          </span>
          <span>
            <strong>6</strong>
            strategy pillars mapped
          </span>
        </div>

        <div className="consultation-ledgers">
          <details className="consultation-ledger-block" open>
            <summary>
              <span>
                <ClipboardList size={18} aria-hidden="true" />
                Expert report ledger
              </span>
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <div className="consultation-ledger-grid consultation-ledger-grid-experts">
              {expertReportLedger.map((input) => (
                <ConsultationCard input={input} key={input.id} />
              ))}
            </div>
          </details>

          <details className="consultation-ledger-block" open>
            <summary>
              <span>
                <Users size={18} aria-hidden="true" />
                Public ideas ledger
              </span>
              <ChevronDown size={18} aria-hidden="true" />
            </summary>
            <p className="consultation-note">
              Public echo counts are raw keyword screens against the Open Government XLSX, used
              only to enforce the 5+ echo threshold.
            </p>
            <div className="consultation-ledger-grid">
              {publicIdeaLedger.map((input) => (
                <ConsultationCard input={input} key={input.id} />
              ))}
            </div>
          </details>
        </div>

        <div className="consultation-source-row">
          <a href={consultationSources.summary} target="_blank" rel="noreferrer">
            Consultation summary
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={consultationSources.taskForceReports} target="_blank" rel="noreferrer">
            Task Force reports
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a href={consultationSources.publicDataset} target="_blank" rel="noreferrer">
            Public dataset
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => parseRoute());
  const activePersona = personas.find((persona) => persona.id === route.personaId) ?? null;

  useEffect(() => {
    const syncRoute = () => setRoute(parseRoute());

    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);

    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  const openLegacyPersona = (persona: Persona) => {
    window.history.pushState(null, "", legacyPersonaHash(persona.id));
    setRoute({ version: "v1", page: "persona", personaId: persona.id });
  };

  const closeLegacyPersona = () => {
    window.history.pushState(null, "", v1HomeHash());
    setRoute({ version: "v1", page: "home" });
  };

  const selectLegacyTheme = (persona: Persona, theme: Theme) => {
    window.history.replaceState(null, "", legacyPersonaHash(persona.id, theme.id));
    setRoute({ version: "v1", page: "persona", personaId: persona.id, themeId: theme.id });
  };

  const selectV2Theme = (persona: Persona, theme: Theme) => {
    window.history.replaceState(null, "", personaHash(persona.id, theme.id));
    setRoute({ version: "v2", page: "persona", personaId: persona.id, themeId: theme.id });
  };

  if (route.version === "v1") {
    return activePersona ? (
      <PersonaPage
        persona={activePersona}
        selectedThemeId={route.themeId}
        onBack={closeLegacyPersona}
        onSelectTheme={(theme) => selectLegacyTheme(activePersona, theme)}
      />
    ) : (
      <HomePage onOpen={openLegacyPersona} />
    );
  }

  if (route.page === "actions") {
    return <V2ActionTrackerPage />;
  }

  if (route.page === "debates") {
    return <V2DebateHubPage />;
  }

  if (route.page === "methodology") {
    return <V2MethodologyPage />;
  }

  if (route.page === "persona") {
    const { persona } = getPersonaTheme(route.personaId, route.themeId);

    return (
      <V2PersonaPage
        persona={persona}
        selectedThemeId={route.themeId}
        onSelectTheme={(theme) => selectV2Theme(persona, theme)}
      />
    );
  }

  return <V2HomePage />;
}
