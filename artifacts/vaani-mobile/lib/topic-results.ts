import type { CustomTopicCategory, CustomTopicArticle } from "@/context/PrepContext";
import { sanitizeSpecialists, type Specialist } from "@workspace/vaani-core/content/specialists";

export function topicKey(kind: "condition" | "medication", lang: string, topic: string): string {
  return `${kind}:${lang}:${topic.trim().toLowerCase()}`;
}

export interface ConditionResult {
  categories: CustomTopicCategory[];
  article?: CustomTopicArticle;
  specialists: Specialist[];
}

/** Validate the native sidecar without changing the existing preparation schema or IDs. */
export function parseTopicResults(raw: string | null): Record<string, ConditionResult> {
  const value: unknown = JSON.parse(raw ?? "{}");
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid topic results");
  const result: Record<string, ConditionResult> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (!entry || typeof entry !== "object" || !key.startsWith("condition:")) continue;
    const item = entry as Partial<ConditionResult>;
    if (!Array.isArray(item.categories) || !item.categories.every(category =>
      category && typeof category.id === "string" && typeof category.title === "string" &&
      Array.isArray(category.questions) && category.questions.every(q => typeof q === "string"))) continue;
    const article = item.article;
    if (article && (typeof article.name !== "string" || typeof article.url !== "string" ||
      !article.url.startsWith("https://medlineplus.gov/"))) continue;
    result[key] = { categories: item.categories, article, specialists: sanitizeSpecialists(item.specialists) };
  }
  return result;
}
