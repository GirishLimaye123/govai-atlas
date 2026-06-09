import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = path.resolve(new URL("..", import.meta.url).pathname);
const ledgerPath = path.join(rootDir, "src/content/debateLedger.json");
const csvPath = path.join(rootDir, "research/ai-for-all-debate-ledger.csv");
const socialQueuePath = path.join(rootDir, "research/debate-social-review.md");
const urlSubmissionsPath = path.join(rootDir, "research/debate-url-submissions.json");

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const syncOnly = args.has("--sync-only");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const dayArg = process.argv.find((arg) => arg.startsWith("--days="));
const perQueryLimit = limitArg ? Number(limitArg.split("=")[1]) : 3;
const maxAgeDays = dayArg ? Number(dayArg.split("=")[1]) : 14;

const topicQueries = [
  {
    query: '"AI for All" Canada AI strategy criticism',
    tags: ["criticism", "trust", "implementation"],
    matches: [
      { personaId: "concerned-canadian", themeIds: ["accountability", "my-data"] },
      { personaId: "future-canada", themeIds: ["big-promise", "who-benefits"] }
    ]
  },
  {
    query: '"Canada AI strategy" "data centres" AI',
    tags: ["data centres", "energy", "compute"],
    matches: [
      { personaId: "concerned-canadian", themeIds: ["environment", "canadian-control"] },
      { personaId: "entrepreneur", themeIds: ["compute-access"] }
    ]
  },
  {
    query: '"AI for All" Canada jobs workers AI',
    tags: ["jobs", "workers", "skills"],
    matches: [
      { personaId: "student", themeIds: ["jobs-placements"] },
      { personaId: "workplace-adopter", themeIds: ["will-ai-replace-me", "training-upskilling"] },
      { personaId: "future-canada", themeIds: ["jobs-wages"] }
    ]
  },
  {
    query: '"AI for All" Canada privacy children deepfakes',
    tags: ["privacy", "children", "deepfakes"],
    matches: [
      { personaId: "concerned-canadian", themeIds: ["my-data", "my-kids", "deepfakes"] },
      { personaId: "student", themeIds: ["ethics-critical-thinking"] }
    ]
  },
  {
    query: '"AI for All" Canada startups compute procurement',
    tags: ["startups", "procurement", "commercialization"],
    matches: [
      { personaId: "entrepreneur", themeIds: ["capital-growth", "government-customer", "global-markets"] },
      { personaId: "small-business", themeIds: ["can-i-afford-it", "sector-opportunity"] }
    ]
  },
  {
    query: '"AI for All" Canada sovereign AI hyperscalers',
    tags: ["sovereignty", "hyperscalers", "alliances"],
    matches: [
      { personaId: "concerned-canadian", themeIds: ["canadian-control"] },
      { personaId: "entrepreneur", themeIds: ["compute-access", "global-markets"] },
      { personaId: "future-canada", themeIds: ["who-benefits"] }
    ]
  }
];

const socialSearches = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/search/results/content/?keywords=%22AI%20for%20All%22%20Canada%20strategy",
    note: "Use for high-context expert posts and comment debates. LinkedIn public scraping is unreliable without account/API access."
  },
  {
    platform: "X",
    url: "https://x.com/search?q=%22AI%20for%20All%22%20Canada%20strategy&src=typed_query&f=live",
    note: "Use for fast-moving reactions. X search requires an authenticated browser or API for reliable daily collection."
  },
  {
    platform: "Google social search",
    url: "https://www.google.com/search?q=site%3Alinkedin.com%2Fposts+OR+site%3Ax.com+%22AI+for+All%22+Canada+strategy",
    note: "Fallback search for public social pages that have been indexed."
  }
];

const authorityByHost = new Map([
  ["apnews.com", 4.8],
  ["cbc.ca", 4.6],
  ["theglobeandmail.com", 4.5],
  ["betakit.com", 4.4],
  ["globalnews.ca", 4.2],
  ["michaelgeist.ca", 4.9],
  ["canadianinnovators.org", 4.3],
  ["thewalrus.ca", 4.2],
  ["linkedin.com", 3.5],
  ["x.com", 3.2],
  ["reddit.com", 2.8]
]);

const negativeWords = [
  "critic",
  "critics",
  "missing",
  "lacks",
  "lack",
  "hate",
  "skeptic",
  "skeptical",
  "risk",
  "risks",
  "fail",
  "backlash",
  "concern"
];
const positiveWords = ["welcome", "welcomes", "support", "opportunity", "growth", "boost", "leader"];
const contestedWords = [
  ...negativeWords,
  "debate",
  "analysis",
  "opinion",
  "explainer",
  "backlash",
  "questions",
  "what organizations need",
  "what's behind",
  "what is behind"
];
const officialSourcePattern = /(pm\.gc\.ca|canada\.ca|ised-isde\.canada\.ca|newswire\.ca)/i;

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function decodeEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function stripTags(value) {
  return decodeEntities(value.replace(/<[^>]*>/g, "").trim());
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
}

function getHost(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function ageInDays(dateValue) {
  const published = new Date(dateValue);

  if (Number.isNaN(published.getTime())) {
    return 0;
  }

  return Math.max(0, Math.floor((Date.now() - published.getTime()) / 86_400_000));
}

function recencyScore(dateValue) {
  const age = ageInDays(dateValue);

  if (age <= 1) return 5;
  if (age <= 3) return 4.7;
  if (age <= 7) return 4.2;
  if (age <= 14) return 3.5;
  return 2.5;
}

function inferStance(title, summary = "") {
  const haystack = `${title} ${summary}`.toLowerCase();

  if (negativeWords.some((word) => haystack.includes(word))) {
    return "negative";
  }

  if (positiveWords.some((word) => haystack.includes(word))) {
    return "positive";
  }

  return "mixed";
}

function looksLikeDebateSignal(title, source) {
  const haystack = `${title} ${source}`.toLowerCase();

  if (officialSourcePattern.test(source) && !negativeWords.some((word) => haystack.includes(word))) {
    return false;
  }

  return contestedWords.some((word) => haystack.includes(word));
}

function looksLikeAiForAllThread(title) {
  const normalized = title.toLowerCase();

  return (
    normalized.includes("ai for all") ||
    (normalized.includes("canada") && normalized.includes("ai") && normalized.includes("strategy")) ||
    (normalized.includes("carney") && normalized.includes("ai"))
  );
}

function sourceNameFromHost(host) {
  if (!host) return "Unknown source";

  return host
    .split(".")[0]
    .replace(/(^|-)([a-z])/g, (_, prefix, letter) => `${prefix ? " " : ""}${letter.toUpperCase()}`);
}

function escapeCsv(value) {
  const text = Array.isArray(value) ? value.join(";") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function ledgerToCsv(entries) {
  const headers = [
    "id",
    "title",
    "source_name",
    "source_type",
    "platform",
    "url",
    "published_date",
    "last_seen_date",
    "stance",
    "summary",
    "debate_point",
    "authority_score",
    "popularity_score",
    "recency_score",
    "tags",
    "status",
    "personas",
    "themes"
  ];

  const rows = entries.map((entry) => {
    const personas = [...new Set(entry.matches.map((match) => match.personaId))];
    const themes = [...new Set(entry.matches.flatMap((match) => match.themeIds))];

    return [
      entry.id,
      entry.title,
      entry.sourceName,
      entry.sourceType,
      entry.platform,
      entry.url,
      entry.publishedDate,
      entry.lastSeenDate,
      entry.stance,
      entry.summary,
      entry.debatePoint,
      entry.authorityScore,
      entry.popularityScore,
      entry.recencyScore,
      entry.tags,
      entry.status,
      personas,
      themes
    ]
      .map(escapeCsv)
      .join(",");
  });

  return `${headers.join(",")}\n${rows.join("\n")}\n`;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "AIForAllDebateResearch/1.0 (+local research ledger)"
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  return response.text();
}

function parseGoogleNewsRss(xml, queryConfig) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, perQueryLimit);

  return items
    .map(([, item]) => {
      const title = stripTags(item.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
      const link = stripTags(item.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? "");
      const pubDate = stripTags(item.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? "");
      const source = stripTags(item.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1] ?? "");
      const publishedDate = pubDate ? new Date(pubDate).toISOString().slice(0, 10) : todayIso();
      const host = getHost(link);
      const authorityScore = authorityByHost.get(host) ?? 3.4;
      const stance = inferStance(title);

      if (ageInDays(publishedDate) > maxAgeDays || !title || !link || !looksLikeDebateSignal(title, source)) {
        return null;
      }

      return {
        id: `${slugify(host || source)}-${slugify(title)}-${publishedDate}`,
        title,
        sourceName: source || sourceNameFromHost(host),
        sourceType: title.toLowerCase().includes("analysis") ? "news-analysis" : "news",
        platform: "News",
        url: link,
        publishedDate,
        lastSeenDate: todayIso(),
        stance,
        summary: `Candidate found by daily search for: ${queryConfig.query}`,
        debatePoint: `Review this source for the ${queryConfig.tags.join(", ")} debate around Canada's AI for All strategy.`,
        authorityScore,
        popularityScore: Math.min(4.5, authorityScore - 0.2),
        recencyScore: recencyScore(publishedDate),
        tags: queryConfig.tags,
        status: "candidate",
        matches: queryConfig.matches
      };
    })
    .filter(Boolean);
}

async function collectNewsCandidates() {
  const candidates = [];

  for (const queryConfig of topicQueries) {
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
      queryConfig.query
    )}&hl=en-CA&gl=CA&ceid=CA:en`;

    try {
      const xml = await fetchText(url);
      candidates.push(...parseGoogleNewsRss(xml, queryConfig));
    } catch (error) {
      console.warn(`News search failed for "${queryConfig.query}": ${error.message}`);
    }
  }

  return candidates;
}

async function collectRedditCandidates() {
  const query = '"AI for All" "Canada" "AI strategy"';
  const url = `https://www.reddit.com/search.json?q=${encodeURIComponent(query)}&sort=new&t=week&limit=12`;
  const rssUrl = `https://www.reddit.com/search.rss?q=${encodeURIComponent(query)}&sort=new&t=week`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "AIForAllDebateResearch/1.0 (+local research ledger)"
      }
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const payload = await response.json();

    return payload.data.children
      .map(({ data }) => {
        const publishedDate = new Date(data.created_utc * 1000).toISOString().slice(0, 10);

        if (ageInDays(publishedDate) > maxAgeDays || !looksLikeAiForAllThread(data.title)) {
          return null;
        }

        const urlValue = `https://www.reddit.com${data.permalink}`;
        const popularityScore = Math.max(
          2.2,
          Math.min(5, 2 + Math.log10((data.ups ?? 0) + (data.num_comments ?? 0) + 1))
        );

        return {
          id: `reddit-${slugify(data.subreddit)}-${slugify(data.title)}-${publishedDate}`,
          title: data.title,
          sourceName: `r/${data.subreddit}`,
          sourceType: "community-thread",
          platform: "Reddit",
          url: urlValue,
          publishedDate,
          lastSeenDate: todayIso(),
          stance: inferStance(data.title, data.selftext ?? ""),
          summary: `Public discussion with ${data.ups ?? 0} upvotes and ${data.num_comments ?? 0} comments when collected.`,
          debatePoint: "Review the thread to capture recurring public concerns, support, or misconceptions before promoting it from candidate to reviewed.",
          authorityScore: 2.8,
          popularityScore,
          recencyScore: recencyScore(publishedDate),
          tags: ["public reaction", "community debate"],
          status: "candidate",
          matches: [
            { personaId: "concerned-canadian", themeIds: ["accountability", "canadian-control"] },
            { personaId: "future-canada", themeIds: ["who-benefits", "big-promise"] }
          ]
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.warn(`Reddit JSON search failed, trying RSS: ${error.message}`);

    try {
      const xml = await fetchText(rssUrl);
      const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, perQueryLimit);

      return entries
        .map(([, entry]) => {
          const title = stripTags(entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? "");
          const linkMatch = entry.match(/<link[^>]*href="([^"]+)"/);
          const urlValue = decodeEntities(linkMatch?.[1] ?? "");
          const updated = stripTags(entry.match(/<updated>([\s\S]*?)<\/updated>/)?.[1] ?? "");
          const publishedDate = updated ? new Date(updated).toISOString().slice(0, 10) : todayIso();

          if (ageInDays(publishedDate) > maxAgeDays || !title || !urlValue || !looksLikeAiForAllThread(title)) {
            return null;
          }

          return {
            id: `reddit-${slugify(title)}-${publishedDate}`,
            title,
            sourceName: "Reddit search",
            sourceType: "community-thread",
            platform: "Reddit",
            url: urlValue,
            publishedDate,
            lastSeenDate: todayIso(),
            stance: inferStance(title),
            summary: "Public Reddit discussion found through RSS fallback.",
            debatePoint: "Review the thread to capture recurring public concerns, support, or misconceptions before promoting it from candidate to reviewed.",
            authorityScore: 2.8,
            popularityScore: 2.7,
            recencyScore: recencyScore(publishedDate),
            tags: ["public reaction", "community debate"],
            status: "candidate",
            matches: [
              { personaId: "concerned-canadian", themeIds: ["accountability", "canadian-control"] },
              { personaId: "future-canada", themeIds: ["who-benefits", "big-promise"] }
            ]
          };
        })
        .filter(Boolean);
    } catch (rssError) {
      console.warn(`Reddit RSS search failed: ${rssError.message}`);
      return [];
    }
  }
}

async function collectSubmittedUrlCandidates() {
  let submissions = [];

  try {
    submissions = JSON.parse(await readFile(urlSubmissionsPath, "utf8"));
  } catch {
    return [];
  }

  if (!Array.isArray(submissions)) {
    return [];
  }

  return submissions
    .map((submission) => {
      if (!submission?.url || !submission?.personaId || !submission?.themeId) {
        return null;
      }

      const host = getHost(submission.url);
      const submittedDate = submission.submittedAt
        ? new Date(submission.submittedAt).toISOString().slice(0, 10)
        : todayIso();

      return {
        id: `submitted-${slugify(host)}-${slugify(submission.themeId)}-${submittedDate}`,
        title: submission.title || `Suggested debate source: ${host || submission.url}`,
        sourceName: submission.sourceName || sourceNameFromHost(host),
        sourceType: "analysis",
        platform: "Submitted URL",
        url: submission.url,
        publishedDate: submission.publishedDate || submittedDate,
        lastSeenDate: todayIso(),
        stance: submission.stance || "mixed",
        summary:
          submission.summary ||
          `User-suggested source for ${submission.personaId}/${submission.themeId}.`,
        debatePoint:
          submission.debatePoint ||
          "Review this submitted source before promoting it from candidate to reviewed.",
        authorityScore: Number(submission.authorityScore ?? authorityByHost.get(host) ?? 3),
        popularityScore: Number(submission.popularityScore ?? 2.8),
        recencyScore: Number(submission.recencyScore ?? recencyScore(submittedDate)),
        tags: Array.isArray(submission.tags) ? submission.tags : ["user-suggested"],
        status: "candidate",
        matches: [
          {
            personaId: submission.personaId,
            themeIds: [submission.themeId]
          }
        ]
      };
    })
    .filter(Boolean);
}

async function writeSocialQueue() {
  const lines = [
    "# Debate social review queue",
    "",
    `Last generated: ${todayIso()}`,
    "",
    "LinkedIn and X usually require authenticated search or platform APIs for reliable collection. Use these links during review, then add strong items to `src/content/debateLedger.json` or rerun this script after adding API-backed collectors.",
    "",
    ...socialSearches.flatMap((item) => [
      `## ${item.platform}`,
      "",
      item.url,
      "",
      item.note,
      ""
    ])
  ];

  if (!dryRun) {
    await writeFile(socialQueuePath, `${lines.join("\n")}\n`);
  }
}

function dedupe(existingEntries, candidates) {
  const seenIds = new Set(existingEntries.map((entry) => entry.id));
  const seenUrls = new Set(existingEntries.map((entry) => entry.url));
  const seenTitles = new Set(existingEntries.map((entry) => entry.title.toLowerCase()));
  const next = [];

  for (const candidate of candidates) {
    const normalizedTitle = candidate.title.toLowerCase();

    if (seenIds.has(candidate.id) || seenUrls.has(candidate.url) || seenTitles.has(normalizedTitle)) {
      continue;
    }

    seenIds.add(candidate.id);
    seenUrls.add(candidate.url);
    seenTitles.add(normalizedTitle);
    next.push(candidate);
  }

  return next;
}

const ledger = JSON.parse(await readFile(ledgerPath, "utf8"));
const newsCandidates = syncOnly ? [] : await collectNewsCandidates();
const redditCandidates = syncOnly ? [] : await collectRedditCandidates();
const submittedUrlCandidates = syncOnly ? [] : await collectSubmittedUrlCandidates();
const additions = dedupe(ledger, [...submittedUrlCandidates, ...newsCandidates, ...redditCandidates]);
const updatedLedger = [...ledger, ...additions].sort((a, b) => {
  const dateDelta = new Date(b.lastSeenDate).getTime() - new Date(a.lastSeenDate).getTime();

  if (dateDelta !== 0) {
    return dateDelta;
  }

  return a.title.localeCompare(b.title);
});

await writeSocialQueue();

if (!dryRun) {
  await writeFile(ledgerPath, `${JSON.stringify(updatedLedger, null, 2)}\n`);
  await writeFile(csvPath, ledgerToCsv(updatedLedger));
}

console.log(
  `${dryRun ? "Found" : "Added"} ${additions.length} new debate candidate${
    additions.length === 1 ? "" : "s"
  }. Ledger total: ${updatedLedger.length}.`
);

for (const entry of additions.slice(0, 12)) {
  console.log(`- [${entry.platform}] ${entry.title} (${entry.url})`);
}
