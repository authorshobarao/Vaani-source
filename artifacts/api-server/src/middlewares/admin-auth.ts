import { timingSafeEqual } from "node:crypto";
import type { NextFunction, Request, Response } from "express";

/**
 * Guards admin-only analytics endpoints. Requires
 * `Authorization: Bearer <ADMIN_API_TOKEN>`; fails closed (503) when the
 * token is not configured so summary data is never exposed by accident.
 */
export function requireAdminToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const expected = process.env.ADMIN_API_TOKEN;
  if (!expected) {
    res.status(503).json({ error: "Admin access is not configured" });
    return;
  }
  const header = req.get("authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
