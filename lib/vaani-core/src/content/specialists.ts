/** Standard specialty names and plain-language descriptions, never provider recommendations. */
export const SPECIALTIES = {
  "Primary care doctor": "Helps assess symptoms, coordinate care, and decide whether a specialist referral is needed.",
  Endocrinologist: "Treats hormone and metabolic conditions such as diabetes and thyroid disease.",
  Cardiologist: "Treats conditions affecting the heart and blood vessels.",
  Dermatologist: "Treats conditions affecting the skin, hair, and nails.",
  Gastroenterologist: "Treats conditions affecting digestion, the stomach, intestines, and liver.",
  Neurologist: "Treats conditions affecting the brain, spinal cord, and nerves.",
  Oncologist: "Evaluates and treats cancer.",
  Rheumatologist: "Treats inflammatory and autoimmune conditions affecting joints and other parts of the body.",
  Pulmonologist: "Treats conditions affecting the lungs and breathing.",
  Nephrologist: "Treats kidney disease and problems with kidney function.",
  Urologist: "Treats urinary tract conditions and conditions of the male reproductive system.",
  Gynecologist: "Treats conditions affecting the female reproductive system.",
  "ENT specialist": "Treats conditions affecting the ears, nose, throat, and balance.",
  Orthopedist: "Treats conditions affecting bones, joints, muscles, and related structures.",
  Psychiatrist: "Evaluates and treats mental health conditions.",
  Allergist: "Treats allergies, asthma, and conditions affecting the immune system.",
  Hematologist: "Treats conditions affecting blood and blood-forming tissues.",
  "Infectious disease specialist": "Treats complex, persistent, or unusual infections.",
  Ophthalmologist: "Diagnoses and treats eye diseases and vision problems.",
  Hepatologist: "Treats conditions affecting the liver.",
  "Sleep medicine specialist": "Evaluates and treats sleep disorders.",
} as const;

export type SpecialtyName = keyof typeof SPECIALTIES;
export type Specialist = { name: string; description: string };
export const PRIMARY_CARE: Specialist = {
  name: "Primary care doctor", description: SPECIALTIES["Primary care doctor"],
};

/** Curated alongside per-condition sources. At most three, including the usual first stop. */
export const CONDITION_SPECIALISTS: Record<string, readonly SpecialtyName[]> = {
  diabetes: ["Primary care doctor", "Endocrinologist", "Ophthalmologist"],
  "high-blood-pressure": ["Primary care doctor", "Cardiologist"],
  "skin-rash": ["Primary care doctor", "Dermatologist"],
  "skin-bump-lump": ["Primary care doctor", "Dermatologist"],
  cancer: ["Primary care doctor", "Oncologist"],
  ckd: ["Primary care doctor", "Nephrologist"],
  thyroid: ["Primary care doctor", "Endocrinologist"],
  "pcos-gyn": ["Primary care doctor", "Gynecologist", "Endocrinologist"],
  "mental-health": ["Primary care doctor", "Psychiatrist"],
  "liver-disease": ["Primary care doctor", "Gastroenterologist", "Hepatologist"],
  "heart-disease": ["Primary care doctor", "Cardiologist"],
  "joint-pain-arthritis": ["Primary care doctor", "Rheumatologist", "Orthopedist"],
  asthma: ["Primary care doctor", "Pulmonologist", "Allergist"],
  sciatica: ["Primary care doctor", "Neurologist", "Orthopedist"],
  "psoriasis-eczema": ["Primary care doctor", "Dermatologist"],
  gerd: ["Primary care doctor", "Gastroenterologist"],
  infertility: ["Primary care doctor", "Gynecologist", "Urologist"],
  "multiple-sclerosis": ["Primary care doctor", "Neurologist"],
  insomnia: ["Primary care doctor", "Sleep medicine specialist"],
  uti: ["Primary care doctor", "Urologist"],
  "urinary-incontinence": ["Primary care doctor", "Urologist"],
  "blood-in-urine": ["Primary care doctor", "Urologist", "Nephrologist"],
  migraine: ["Primary care doctor", "Neurologist"],
  "epilepsy-seizures": ["Primary care doctor", "Neurologist"],
  vertigo: ["Primary care doctor", "ENT specialist", "Neurologist"],
  fatigue: ["Primary care doctor"],
};

const allowedNames = new Map<string, SpecialtyName>(
  (Object.keys(SPECIALTIES) as SpecialtyName[]).map(name => [name.toLowerCase(), name]),
);
allowedNames.set("ent", "ENT specialist");
allowedNames.set("infectious disease", "Infectious disease specialist");

/** Discard unknown names and all untrusted descriptions. Always keep primary care first. */
export function sanitizeSpecialists(input: unknown): Specialist[] {
  const names = new Set<SpecialtyName>(["Primary care doctor"]);
  if (Array.isArray(input)) {
    for (const item of input) {
      const raw = typeof item === "string" ? item : item?.name;
      const name = typeof raw === "string" ? allowedNames.get(raw.trim().toLowerCase()) : undefined;
      if (name) names.add(name);
      if (names.size === 3) break;
    }
  }
  return [...names].map(name => ({ name, description: SPECIALTIES[name] }));
}

export function getConditionSpecialists(id: string): Specialist[] {
  return sanitizeSpecialists(CONDITION_SPECIALISTS[id]);
}
