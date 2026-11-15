import { describe, expect, it } from "vitest";
import en from "@workspace/vaani-core/content/en";
import { CONDITION_SPECIALISTS, getConditionSpecialists, sanitizeSpecialists } from "@workspace/vaani-core/content/specialists";

describe("conservative specialist guidance", () => {
  it("has curated guidance for every preset with primary care first and at most three entries", () => {
    for (const condition of en.conditions) {
      expect(CONDITION_SPECIALISTS[condition.id], condition.id).toBeDefined();
      const result = getConditionSpecialists(condition.id);
      expect(result[0].name).toBe("Primary care doctor");
      expect(result.length).toBeLessThanOrEqual(3);
      expect(result.every(item => item.description.length > 15)).toBe(true);
    }
  });
  it("includes the requested curated diabetes and rash specialties", () => {
    expect(getConditionSpecialists("diabetes").map(item => item.name)).toContain("Endocrinologist");
    expect(getConditionSpecialists("skin-rash").map(item => item.name)).toContain("Dermatologist");
  });
  it("drops providers and unknown names and replaces untrusted descriptions", () => {
    const result = sanitizeSpecialists([
      { name: "Dr Example", description: "Visit a clinic" },
      { name: "rheumatologist", description: "Go to https://example.test/clinic" },
      { name: "Rheumatologist", description: "duplicate" },
      { name: "Cardiologist", description: "another untrusted description" },
      { name: "Dermatologist" },
    ]);
    expect(result.map(item => item.name)).toEqual(["Primary care doctor", "Rheumatologist", "Cardiologist"]);
    expect(JSON.stringify(result)).not.toMatch(/https|clinic|untrusted|duplicate/);
  });
  it.each([null, {}, [], [{ name: "Made-up specialty" }]])("falls back to primary care for malformed or unrecognized output", input => {
    expect(sanitizeSpecialists(input).map(item => item.name)).toEqual(["Primary care doctor"]);
  });
});
