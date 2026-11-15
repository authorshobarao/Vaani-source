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
  fr: "French",
  pt: "Brazilian Portuguese",
  tl: "Tagalog",
  ja: "Japanese",
  ko: "Korean",
  th: "Thai",
  id: "Indonesian",
  bn: "Bengali",
  ur: "Urdu",
  te: "Telugu",
  ml: "Malayalam",
};

const AUDIO_TYPES = [
  "audio/mp4",
  "audio/m4a",
  "audio/x-m4a",
  "audio/aac",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/webm",
  "audio/ogg",
  "audio/flac",
];

// ~8 MB of original bytes; base64 inflates by ~33%.
const MAX_BASE64_LENGTH = Math.ceil((8 * 1024 * 1024 * 4) / 3);

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { lang, audio } = req.body as {
    lang?: string;
    audio?: { mediaType?: string; data?: string };
  };

  if (!audio || !audio.mediaType || !audio.data) {
    res.status(400).json({ error: "audio with mediaType and data is required" });
    return;
  }

  const mediaType = audio.mediaType.split(";")[0].trim().toLowerCase();
  if (!AUDIO_TYPES.includes(mediaType)) {
    res.status(400).json({ error: "Unsupported audio type" });
    return;
  }

  if (audio.data.length > MAX_BASE64_LENGTH) {
    res.status(413).json({ error: "Audio is too large" });
    return;
  }

  const langName = lang && LANG_NAMES[lang] ? LANG_NAMES[lang] : null;
  const instruction = `Transcribe the attached voice recording verbatim into plain text.${
    langName ? ` The speaker is most likely speaking ${langName}.` : ""
  } Output only the transcribed words with normal punctuation — no preamble, no labels, no commentary. If there is no intelligible speech, output an empty string.`;

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { inlineData: { mimeType: mediaType, data: audio.data } },
            { text: instruction },
          ],
        },
      ],
      config: { maxOutputTokens: 4096 },
    });

    const text = (response.text ?? "").trim();
    res.json({ text });
  } catch (err) {
    req.log.error({ err }, "Gemini API error (transcribe)");
    res.status(500).json({ error: "AI service returned an error" });
  }
});

export default router;
