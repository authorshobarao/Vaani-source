import { Router, Request, Response } from "express";
import { ai, GEMINI_MODEL } from "../gemini";

const router = Router();

const LANG_NAMES: Record<string, string> = {
  en: "English",
  es: "Spanish",
  hi: "Hindi",
  vi: "Vietnamese",
  zh: "Simplified Chinese",
  ta: "Tamil",
  kn: "Kannada",
};

const MAX_CONDITION_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 2000;

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { condition, description, lang } = req.body as {
    condition?: string;
    description?: string;
    lang?: string;
  };

  if (!condition || !description || typeof description !== "string" || description.trim().length === 0) {
    res.status(400).json({ error: "condition and description are required" });
    return;
  }

  if (typeof condition !== "string" || condition.length > MAX_CONDITION_LENGTH) {
    res.status(400).json({ error: `condition must be at most ${MAX_CONDITION_LENGTH} characters` });
    return;
  }

  if (description.length > MAX_DESCRIPTION_LENGTH) {
    res.status(400).json({ error: `description must be at most ${MAX_DESCRIPTION_LENGTH} characters` });
    return;
  }

  const targetLang = lang && LANG_NAMES[lang] ? LANG_NAMES[lang] : "English";

  const systemPrompt = `You are a patient self-advocacy assistant. Your only job is to generate clear, practical questions a patient can ask their doctor. You never give medical advice, diagnoses, or treatment recommendations. If a user describes an urgent or emergency situation, you suggest they seek emergency care, but you do not diagnose. You always respond in ${targetLang}.`;

  const userPrompt = `The patient is preparing for a doctor visit about: ${condition}.

They describe their situation as: "${description.trim()}"

Generate 5 to 8 specific, helpful questions this patient could ask their doctor, based on their situation. Always include at least one question about side effects to expect from any treatment or medication. If surgery or a procedure could be involved, include a question asking about its probability of success (success rate) and its risks, since this matters for making a decision. Format your response as a plain numbered list (e.g. "1. Question here"). Do not include any preamble, explanation, or follow-up text — only the numbered list of questions. Respond in ${targetLang}.`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      config: { systemInstruction: systemPrompt, maxOutputTokens: 8192 },
    });

    const rawText = response.text ?? "";

    const questions = rawText
      .split("\n")
      .map((line) => line.replace(/^\d+[.)]\s*/, "").trim())
      .filter((line) => line.length > 0);

    res.json({ questions });
  } catch (err) {
    req.log.error({ err }, "Gemini API error");
    res.status(500).json({ error: "AI service returned an error" });
  }
});

export default router;
