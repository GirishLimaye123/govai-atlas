AI for All research ledger
==========================

This folder tracks perspectives before they become app content.

Use `ai-for-all-perspectives.csv` as the topic and perspective ledger:

- `id`: stable row key for later import or cross-reference.
- `theme`: plain-language issue area.
- `plain_question`: user-facing question this evidence can support.
- `primary_personas`: persona portals this belongs under.
- `pillars`: AI for All pillar mapping.
- `coverage_level`: `Strong`, `Light`, or `Quiet`.
- `policy_force`: `Hard`, `Funded`, `Directional`, or `Open`.
- `viewpoint_type`: official promise, critique, comparator, community view, etc.
- `perspective_summary`: concise view to preserve.
- `source_ids`: matching app source IDs where they already exist, or descriptive slugs for new sources.
- `source_urls`: direct evidence links.
- `app_use`: likely place in the product.
- `next_step`: what to do before this becomes final app copy.
- `status`: research state.

The CSV is intentionally broader than `src/content/sourceLedger.ts`. The TypeScript ledger holds app receipts already shown in the UI; this CSV holds raw policy and commentary perspectives so we do not lose threads while building.

Use `ai-for-all-receipts.csv` as the source evidence ledger:

- one row per claim/source receipt
- links receipts to perspective rows through `perspective_ids`
- keeps the original source, date, section, evidence note, and intended app use

Use `ai-for-all-inputs-map.csv` as the consultation-input ledger:

- one row per major input theme from the public consultation, Task Force reports, or supplementary submissions
- maps each input to personas, pillars, final-strategy response, coverage level, and policy force
- helps track what experts and the wider public asked for, including items the final strategy only partly addressed

Use `comparator-policies.csv` as the jurisdiction and instrument library:

- one row per external policy, law, strategy, toolkit, or international norm
- classifies each comparator by `instrument_type` so we do not compare strategies to laws as if they are equivalent
- keeps a short note on why the comparator is useful for this project

Use `comparison-map.csv` as the topic-to-comparator map:

- one row per persona/topic comparison bundle
- each row can map one topic to multiple comparator policies
- the key question is not "which country is better?" but "what kind of policy instrument did others use for this problem?"

Use `ai-for-all-debate-ledger.csv` and `src/content/debateLedger.json` as the public debate ledger:

- one row/object per debate signal from news, analysis, organization posts, personal posts, social posts, or community threads
- `stance`: `positive`, `negative`, or `mixed`
- `authority_score`, `popularity_score`, and `recency_score`: inputs to the app score shown in each persona-topic debate drawer
- `personas` and `themes`: where the debate should appear in the explainer
- `status`: `reviewed` for hand-checked entries, `candidate` for daily script discoveries that need editorial review

Run `npm run research:debates` from the app root to search for new debate candidates and append them to the JSON ledger. The script also regenerates the CSV and `debate-social-review.md`.

Use `debate-url-submissions.json` for user-suggested debate URLs:

- paste queued URLs from the app's "Suggest a debate URL" control into this file
- each object should include `url`, `personaId`, and `themeId`
- optional fields include `title`, `sourceName`, `publishedDate`, `stance`, `summary`, `debatePoint`, `authorityScore`, `popularityScore`, `recencyScore`, and `tags`
- the daily research script imports these as `candidate` entries, then dedupes them against the existing ledger

Daily automation:

- `.github/workflows/daily-debate-research.yml` runs the debate script every day at 13:20 UTC and commits changes when new items are found.
- Google News RSS and public Reddit search are collected automatically.
- `debate-url-submissions.json` is checked for user-suggested URLs.
- LinkedIn and X are tracked through `debate-social-review.md` because reliable daily collection usually requires authenticated platform access or an API.
