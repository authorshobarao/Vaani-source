import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

function buildCorsAllowlist(): string[] {
  const domains = process.env.REPLIT_DOMAINS ?? "";
  const allowed = domains
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean)
    .flatMap((d) => [`https://${d}`, `http://${d}`]);

  if (process.env.NODE_ENV !== "production") {
    allowed.push("http://localhost:3000", "http://localhost:5173", "http://localhost:5000");
    for (const env of ["REPLIT_DEV_DOMAIN", "REPLIT_EXPO_DEV_DOMAIN"]) {
      const d = process.env[env];
      if (d) allowed.push(`https://${d}`);
    }
  }

  return allowed;
}

const allowlist = buildCorsAllowlist();

function isDevReplitOrigin(origin: string): boolean {
  if (process.env.NODE_ENV === "production") return false;
  try {
    const { protocol, hostname } = new URL(origin);
    return protocol === "https:" && hostname.endsWith(".replit.dev");
  } catch {
    return false;
  }
}

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowlist.includes(origin) || isDevReplitOrigin(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

app.use("/api", router);

export default app;
