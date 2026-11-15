import { afterEach, describe, expect, it, vi } from "vitest";
import express from "express";
import request from "supertest";
import router from "./whisper-transcribe";

const app = express();
app.use(express.json({ limit: "20mb" }));
app.use((req, _res, next) => {
  req.log = { warn: vi.fn() } as unknown as typeof req.log;
  next();
});
app.use(router);
const clip = { lang: "en", audio: { mediaType: "audio/mp4", data: "YXVkaW8=" } };
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

describe("Whisper audio forwarding", () => {
  it("forwards Safari MP4 as multipart whisper-1 and returns text", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-only");
    const upstream = vi.fn().mockResolvedValue(new Response(JSON.stringify({ text: " Take with food. " })));
    vi.stubGlobal("fetch", upstream);
    const res = await request(app).post("/").send(clip);
    expect(res.body).toEqual({ text: "Take with food." });
    const [url, options] = upstream.mock.calls[0];
    expect(url).toBe("https://api.openai.com/v1/audio/transcriptions");
    expect(options.body.get("model")).toBe("whisper-1");
    expect(options.body.get("file").name).toBe("answer.mp4");
  });
  it("accepts Chrome WebM with codec parameters", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-only");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response('{"text":"Hello"}')));
    expect((await request(app).post("/").send({
      ...clip, audio: { ...clip.audio, mediaType: "audio/webm;codecs=opus" },
    })).status).toBe(200);
  });
  it("rejects invalid input before calling OpenAI", async () => {
    const upstream = vi.fn();
    vi.stubGlobal("fetch", upstream);
    for (const body of [{}, { audio: { mediaType: "text/plain", data: "YQ==" } },
      { audio: { mediaType: "audio/mp4", data: "%%%" } }]) {
      expect((await request(app).post("/").send(body)).status).toBe(400);
    }
    expect(upstream).not.toHaveBeenCalled();
  });
  it("fails safely when configuration is absent", async () => {
    vi.stubEnv("OPENAI_API_KEY", "");
    expect((await request(app).post("/").send(clip)).status).toBe(503);
  });
  it("returns friendly errors without provider details", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-only");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("private upstream details", { status: 401 })));
    const res = await request(app).post("/").send(clip);
    expect(res.status).toBe(502);
    expect(res.body.error).toContain("please type your answer");
    expect(JSON.stringify(res.body)).not.toContain("private");
  });
  it("handles network failures", async () => {
    vi.stubEnv("OPENAI_API_KEY", "test-only");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect((await request(app).post("/").send(clip)).status).toBe(502);
  });
});