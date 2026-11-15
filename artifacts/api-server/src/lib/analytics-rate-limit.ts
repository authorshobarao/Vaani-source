import rateLimit from "express-rate-limit";

/** Generous limiter for anonymous analytics ingestion (batched client-side). */
export const analyticsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests. Please try again later." },
});
