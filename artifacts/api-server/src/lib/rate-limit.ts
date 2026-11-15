import rateLimit from "express-rate-limit";

const WINDOW_MS = 15 * 60 * 1000;

export const suggestQuestionsLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});

export const analyzeReportLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: 10,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});
