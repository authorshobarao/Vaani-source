import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";

process.env.ADMIN_API_TOKEN = "test-admin-token";

describe("analytics admin access control", () => {
  let app: import("express").Express;

  beforeAll(async () => {
    app = (await import("../app")).default;
  });

  it("rejects pmf-summary without a token", async () => {
    const res = await request(app).get("/api/pmf-summary");
    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty("recentFeedback");
  });

  it("rejects pmf-summary with a wrong token", async () => {
    const res = await request(app)
      .get("/api/pmf-summary")
      .set("Authorization", "Bearer wrong-token");
    expect(res.status).toBe(401);
    expect(res.body).not.toHaveProperty("recentFeedback");
  });

  it("allows pmf-summary with the correct token", async () => {
    const res = await request(app)
      .get("/api/pmf-summary")
      .set("Authorization", "Bearer test-admin-token");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("pmf");
  });
});

describe("AI content reports validation", () => {
  let app: import("express").Express;

  beforeAll(async () => {
    app = (await import("../app")).default;
  });

  const valid = {
    deviceId: "d-test",
    feature: "suggestions",
    reason: "offensive",
    content: "1. Example AI question?",
  };

  it("rejects an unknown reason", async () => {
    const res = await request(app).post("/api/ai-content-reports").send({ ...valid, reason: "spam" });
    expect(res.status).toBe(400);
  });

  it("rejects an unknown feature", async () => {
    const res = await request(app).post("/api/ai-content-reports").send({ ...valid, feature: "chat" });
    expect(res.status).toBe(400);
  });

  it("rejects blank reported content", async () => {
    const res = await request(app).post("/api/ai-content-reports").send({ ...valid, content: "   " });
    expect(res.status).toBe(400);
  });

  it("rejects an over-long comment", async () => {
    const res = await request(app).post("/api/ai-content-reports").send({ ...valid, comment: "x".repeat(1001) });
    expect(res.status).toBe(400);
  });
});
