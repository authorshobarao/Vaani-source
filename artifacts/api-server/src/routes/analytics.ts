import { Router, type IRouter, Request, Response } from "express";
import {
  IngestEventsBody,
  IngestEventsResponse,
  SubmitPmfSurveyBody,
  SubmitPmfSurveyResponse,
  GetPmfSummaryResponse,
  ReportAiContentBody,
} from "@workspace/api-zod";
import {
  db,
  analyticsEventsTable,
  pmfResponsesTable,
  aiContentReportsTable,
} from "@workspace/db";
import { sql, desc, isNotNull, and, ne } from "drizzle-orm";
import { requireAdminToken } from "../middlewares/admin-auth";

const router: IRouter = Router();

router.post("/events", async (req: Request, res: Response): Promise<void> => {
  const parsed = IngestEventsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid events payload" });
    return;
  }
  const { deviceId, events } = parsed.data;
  if (events.length === 0) {
    res.json(IngestEventsResponse.parse({ accepted: 0 }));
    return;
  }
  try {
    await db.insert(analyticsEventsTable).values(
      events.map((e) => ({
        deviceId,
        name: e.name,
        props: e.props ?? null,
        lang: e.lang ?? null,
        clientTs: e.ts ?? null,
      }))
    );
    res.json(IngestEventsResponse.parse({ accepted: events.length }));
  } catch (err) {
    req.log.error({ err }, "Failed to store analytics events");
    res.status(500).json({ error: "Failed to store events" });
  }
});

router.post(
  "/pmf-survey",
  async (req: Request, res: Response): Promise<void> => {
    const parsed = SubmitPmfSurveyBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid survey payload" });
      return;
    }
    const { deviceId, disappointment, feedback, lang } = parsed.data;
    try {
      await db.insert(pmfResponsesTable).values({
        deviceId,
        disappointment,
        feedback: feedback?.trim() || null,
        lang: lang ?? null,
      });
      res.json(SubmitPmfSurveyResponse.parse({ ok: true }));
    } catch (err) {
      req.log.error({ err }, "Failed to store PMF response");
      res.status(500).json({ error: "Failed to store survey response" });
    }
  }
);

/** In-app reports of offensive, harmful, or inaccurate AI-generated content. */
router.post(
  "/ai-content-reports",
  async (req: Request, res: Response): Promise<void> => {
    const parsed = ReportAiContentBody.safeParse(req.body);
    if (!parsed.success || !parsed.data.content.trim()) {
      res.status(400).json({ error: "Invalid report payload" });
      return;
    }
    const { deviceId, feature, reason, content, comment, lang } = parsed.data;
    try {
      await db.insert(aiContentReportsTable).values({
        deviceId,
        feature,
        reason,
        content: content.trim(),
        comment: comment?.trim() || null,
        lang: lang ?? null,
      });
      res.json(SubmitPmfSurveyResponse.parse({ ok: true }));
    } catch (err) {
      req.log.error({ err }, "Failed to store AI content report");
      res.status(500).json({ error: "Failed to store report" });
    }
  }
);

/** Ordered activation funnel steps (by event name). */
const FUNNEL_STEPS = [
  "app_opened",
  "condition_selected",
  "questions_prepared",
  "prep_exported",
];

router.get(
  "/pmf-summary",
  requireAdminToken,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const [totalsRow] = await db
        .select({
          devices: sql<number>`count(distinct ${analyticsEventsTable.deviceId})::int`,
          events: sql<number>`count(*)::int`,
        })
        .from(analyticsEventsTable);

      const eventCounts = await db
        .select({
          name: analyticsEventsTable.name,
          count: sql<number>`count(*)::int`,
          devices: sql<number>`count(distinct ${analyticsEventsTable.deviceId})::int`,
        })
        .from(analyticsEventsTable)
        .groupBy(analyticsEventsTable.name)
        .orderBy(desc(sql`count(*)`));

      const devicesByName = new Map(
        eventCounts.map((r) => [r.name, r.devices])
      );
      const funnel = FUNNEL_STEPS.map((step, i) => {
        const devices = devicesByName.get(step) ?? 0;
        const prev =
          i === 0 ? null : devicesByName.get(FUNNEL_STEPS[i - 1]) ?? 0;
        return {
          step,
          devices,
          ...(prev !== null && prev > 0
            ? { conversionFromPrevious: Math.round((devices / prev) * 1000) / 10 }
            : {}),
        };
      });

      const pmfRows = await db
        .select({
          disappointment: pmfResponsesTable.disappointment,
          count: sql<number>`count(*)::int`,
        })
        .from(pmfResponsesTable)
        .groupBy(pmfResponsesTable.disappointment);
      const byAnswer = new Map(pmfRows.map((r) => [r.disappointment, r.count]));
      const very = byAnswer.get("very") ?? 0;
      const somewhat = byAnswer.get("somewhat") ?? 0;
      const notDisappointed = byAnswer.get("not") ?? 0;
      const responses = very + somewhat + notDisappointed;
      const score =
        responses > 0 ? Math.round((very / responses) * 1000) / 10 : 0;

      const recentFeedback = await db
        .select({
          disappointment: pmfResponsesTable.disappointment,
          feedback: pmfResponsesTable.feedback,
          lang: pmfResponsesTable.lang,
          createdAt: pmfResponsesTable.createdAt,
        })
        .from(pmfResponsesTable)
        .where(
          and(isNotNull(pmfResponsesTable.feedback), ne(pmfResponsesTable.feedback, ""))
        )
        .orderBy(desc(pmfResponsesTable.createdAt))
        .limit(50);

      const data = GetPmfSummaryResponse.parse({
        totals: totalsRow ?? { devices: 0, events: 0 },
        eventCounts,
        funnel,
        pmf: { responses, very, somewhat, notDisappointed, score },
        recentFeedback: recentFeedback.map((f) => ({
          disappointment: f.disappointment,
          feedback: f.feedback ?? "",
          ...(f.lang ? { lang: f.lang } : {}),
          createdAt: f.createdAt,
        })),
      });
      res.json(data);
    } catch (err) {
      req.log.error({ err }, "Failed to build PMF summary");
      res.status(500).json({ error: "Failed to build summary" });
    }
  }
);

export default router;
