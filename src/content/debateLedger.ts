import debateLedgerData from "./debateLedger.json";

export type DebateStance = "positive" | "negative" | "mixed";

export type DebateSourceType =
  | "news"
  | "news-analysis"
  | "analysis"
  | "own-post"
  | "social-post"
  | "industry-statement"
  | "advocacy-post"
  | "community-thread";

export type DebateMatch = {
  personaId: string;
  themeIds: string[];
};

export type DebateEntry = {
  id: string;
  title: string;
  sourceName: string;
  sourceType: DebateSourceType;
  platform: string;
  url: string;
  publishedDate: string;
  lastSeenDate: string;
  stance: DebateStance;
  summary: string;
  debatePoint: string;
  authorityScore: number;
  popularityScore: number;
  recencyScore: number;
  tags: string[];
  status: "reviewed" | "candidate";
  matches: DebateMatch[];
};

export const debateLedger = debateLedgerData as DebateEntry[];

export function getDebateScore(entry: DebateEntry) {
  return Math.round(
    (entry.authorityScore / 5) * 45 +
      (entry.popularityScore / 5) * 35 +
      (entry.recencyScore / 5) * 20
  );
}

export function getDebatesForTheme(personaId: string, themeId: string) {
  return debateLedger
    .filter((entry) =>
      entry.matches.some(
        (match) => match.personaId === personaId && match.themeIds.includes(themeId)
      )
    )
    .sort((a, b) => {
      const scoreDelta = getDebateScore(b) - getDebateScore(a);

      if (scoreDelta !== 0) {
        return scoreDelta;
      }

      return new Date(b.lastSeenDate).getTime() - new Date(a.lastSeenDate).getTime();
    });
}
