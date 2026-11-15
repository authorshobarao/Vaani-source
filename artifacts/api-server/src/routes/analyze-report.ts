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

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const PDF_TYPE = "application/pdf";

// ~8 MB of original bytes; base64 inflates by ~33%.
const MAX_BASE64_LENGTH = Math.ceil((8 * 1024 * 1024 * 4) / 3);
const MAX_CONDITION_LENGTH = 200;

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { condition, lang, file } = req.body as {
    condition?: string;
    lang?: string;
    file?: { mediaType?: string; data?: string };
  };

  if (!file || !file.mediaType || !file.data) {
    res.status(400).json({ error: "file with mediaType and data is required" });
    return;
  }

  if (condition !== undefined && (typeof condition !== "string" || condition.length > MAX_CONDITION_LENGTH)) {
    res.status(400).json({ error: `condition must be at most ${MAX_CONDITION_LENGTH} characters` });
    return;
  }

  const mediaType = file.mediaType;
  if (mediaType !== PDF_TYPE && !IMAGE_TYPES.includes(mediaType)) {
    res.status(400).json({ error: "Unsupported file type" });
    return;
  }

  if (file.data.length > MAX_BASE64_LENGTH) {
    res.status(413).json({ error: "File is too large" });
    return;
  }

  const targetLang = lang && LANG_NAMES[lang] ? LANG_NAMES[lang] : "English";
  const topic = condition && condition.trim().length > 0 ? condition.trim() : "their health";

  const systemPrompt = `You are a patient self-advocacy assistant. Your only job is to generate clear, practical questions a patient can ask their doctor. You never give medical advice, diagnoses, or treatment recommendations, and you never try to interpret results as good or bad. If the document shows an urgent or emergency situation, you suggest they seek emergency care, but you do not diagnose. You always respond in ${targetLang}.`;

  const instruction = `Attached is a photo or PDF of the patient's lab or medical report. The patient is preparing for a follow-up visit about: ${topic}.

Based only on what the report shows, generate 5 to 8 specific questions the patient should ask their doctor. Focus on any results that look notable, out of range, or worth discussing. Always include at least one question about side effects to expect from any treatment or medication. If surgery or a procedure could be involved, include a question asking about its probability of success (success rate) and its risks. Do not diagnose or say whether results are good or bad.

Format your response as a plain numbered list (e.g. "1. Question here"). Do not include any preamble, explanation, or follow-up text — only the numbered list of questions. Respond in ${targetLang}.`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: mediaType, data: file.data } },
            { text: instruction },
          ],
        },
      ],
      config: { systemInstruction: systemPrompt, maxOutputTokens: 8192 },
    });

    const rawText = response.text ?? "";

    const questions = rawText
      .split("\n")
      .map((line) => line.replace(/^\d+[.)]\s*/, "").trim())
      .filter((line) => line.length > 0);

    res.json({ questions });
  } catch (err) {
    req.log.error({ err }, "Gemini report analysis error");
    res.status(500).json({ error: "AI service returned an error" });
  }
});

export default router;
