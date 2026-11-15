import { Router, type IRouter } from "express";
import healthRouter from "./health";
import suggestQuestionsRouter from "./suggest-questions";
import analyzeReportRouter from "./analyze-report";
import customTopicRouter from "./custom-topic";
import transcribeRouter from "./transcribe";
import whisperTranscribeRouter from "./whisper-transcribe";
import analyticsRouter from "./analytics";
import { suggestQuestionsLimiter, analyzeReportLimiter } from "../lib/rate-limit";
import { analyticsLimiter } from "../lib/analytics-rate-limit";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/suggest-questions", suggestQuestionsLimiter, suggestQuestionsRouter);
router.use("/custom-topic-questions", suggestQuestionsLimiter, customTopicRouter);
router.use("/analyze-report", analyzeReportLimiter, analyzeReportRouter);
router.use("/transcribe", analyzeReportLimiter, transcribeRouter);
router.use("/whisper-transcribe", analyzeReportLimiter, whisperTranscribeRouter);
router.use(analyticsLimiter, analyticsRouter);

export default router;
