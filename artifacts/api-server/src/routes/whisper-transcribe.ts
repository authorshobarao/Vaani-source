import { Router } from "express";

const router = Router();
const MAX_BYTES = 8 * 1024 * 1024;
const extensions: Record<string, string> = {
  "audio/mp4": "mp4", "audio/m4a": "m4a", "audio/x-m4a": "m4a",
  "audio/webm": "webm", "audio/ogg": "ogg", "audio/wav": "wav",
  "audio/mpeg": "mp3",
};

// Audio is forwarded in memory only; never persist recordings or log transcripts.
router.post("/", async (req, res): Promise<void> => {
  const { audio, lang } = req.body ?? {};
  const mime = typeof audio?.mediaType === "string"
    ? audio.mediaType.split(";")[0].trim().toLowerCase() : "";
  const data = audio?.data;
  if (!extensions[mime] || typeof data !== "string" || !data.length ||
      data.length % 4 !== 0 || !/^[A-Za-z0-9+/]+={0,2}$/.test(data)) {
    res.status(400).json({ error: "Please record a new audio clip." });
    return;
  }
  if (data.length > Math.ceil(MAX_BYTES / 3) * 4) {
    res.status(413).json({ error: "Recording is too large. Please record a shorter answer." });
    return;
  }
  const bytes = Buffer.from(data, "base64");
  if (!bytes.length || bytes.length > MAX_BYTES) {
    res.status(413).json({ error: "Please record a shorter answer." });
    return;
  }
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    res.status(503).json({ error: "Voice input is unavailable. Please type your answer instead." });
    return;
  }
  const form = new FormData();
  form.append("file", new Blob([bytes], { type: mime }), `answer.${extensions[mime]}`);
  form.append("model", "whisper-1");
  if (typeof lang === "string" && /^[a-z]{2}$/.test(lang)) form.append("language", lang);
  try {
    const upstream = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form,
      signal: AbortSignal.timeout(45_000),
    });
    if (!upstream.ok) {
      req.log.warn({ status: upstream.status }, "Whisper transcription failed");
      res.status(502).json({ error: "Couldn't transcribe — please type your answer instead." });
      return;
    }
    const result = await upstream.json() as { text?: unknown };
    if (typeof result.text !== "string") throw new Error("Invalid transcription response");
    res.json({ text: result.text.trim() });
  } catch {
    req.log.warn("Whisper transcription request failed or timed out");
    res.status(502).json({ error: "Couldn't transcribe — please type your answer instead." });
  }
});

export default router;