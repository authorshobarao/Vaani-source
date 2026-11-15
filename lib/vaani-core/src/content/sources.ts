export interface MedicalSource {
  name: string;
  url: string;
}
export function getAboutArticle(conditionId: string, customTopic?: { article?: MedicalSource }): MedicalSource | undefined {
  const isCustomTopic = conditionId.startsWith("custom-");
  return ABOUT_ARTICLES[conditionId] ?? (isCustomTopic && customTopic ? customTopic.article ?? {
    name: "MedlinePlus", url: "https://medlineplus.gov/",
  } : undefined);
}
export function getMedicalSources(conditionId: string, customTopicLabel?: string, customTopicArticle?: MedicalSource): MedicalSource[] {
  const conditionSources = CONDITION_SOURCES[conditionId] ?? [];
  const customSources = conditionId.startsWith("custom-") && conditionSources.length === 0 && customTopicLabel
    ? [{ name: `MedlinePlus — ${customTopicLabel}`, url: customTopicArticle?.url ?? "https://medlineplus.gov/" }]
    : [];
  return [...conditionSources, ...customSources, ...GENERAL_SOURCES];
}

export const GENERAL_SOURCES: MedicalSource[] = [
  {
    name: "AHRQ — Questions To Ask Your Doctor (U.S. Agency for Healthcare Research and Quality)",
    url: "https://www.ahrq.gov/questions/index.html",
  },
  {
    name: "MedlinePlus (U.S. National Library of Medicine, NIH)",
    url: "https://medlineplus.gov/",
  },
  {
    name: "CDC — Centers for Disease Control and Prevention",
    url: "https://www.cdc.gov/",
  },
];

export const CONDITION_SOURCES: Record<string, MedicalSource[]> = {
  diabetes: [
    { name: "American Diabetes Association", url: "https://diabetes.org/" },
    {
      name: "NIDDK — Diabetes (National Institute of Diabetes and Digestive and Kidney Diseases)",
      url: "https://www.niddk.nih.gov/health-information/diabetes",
    },
  ],
  "high-blood-pressure": [
    {
      name: "American Heart Association — High Blood Pressure",
      url: "https://www.heart.org/en/health-topics/high-blood-pressure",
    },
    {
      name: "CDC — High Blood Pressure",
      url: "https://www.cdc.gov/high-blood-pressure/",
    },
  ],
  "skin-rash": [
    { name: "American Academy of Dermatology", url: "https://www.aad.org/" },
    {
      name: "MedlinePlus — Rashes",
      url: "https://medlineplus.gov/rashes.html",
    },
  ],
  "skin-bump-lump": [
    { name: "American Academy of Dermatology", url: "https://www.aad.org/" },
    {
      name: "MedlinePlus — Skin Conditions",
      url: "https://medlineplus.gov/skinconditions.html",
    },
  ],
  cancer: [
    {
      name: "National Cancer Institute — Questions to Ask about Your Diagnosis",
      url: "https://www.cancer.gov/about-cancer/diagnosis-staging/questions",
    },
    { name: "American Cancer Society", url: "https://www.cancer.org/" },
  ],
  ckd: [
    {
      name: "National Kidney Foundation",
      url: "https://www.kidney.org/",
    },
    {
      name: "NIDDK — Chronic Kidney Disease",
      url: "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd",
    },
  ],
  thyroid: [
    { name: "American Thyroid Association", url: "https://www.thyroid.org/" },
    {
      name: "MedlinePlus — Thyroid Diseases",
      url: "https://medlineplus.gov/thyroiddiseases.html",
    },
  ],
  "pcos-gyn": [
    {
      name: "ACOG — American College of Obstetricians and Gynecologists",
      url: "https://www.acog.org/womens-health",
    },
    {
      name: "Office on Women's Health — PCOS",
      url: "https://womenshealth.gov/a-z-topics/polycystic-ovary-syndrome",
    },
  ],
  "mental-health": [
    {
      name: "NIMH — National Institute of Mental Health",
      url: "https://www.nimh.nih.gov/health",
    },
    {
      name: "988 Suicide & Crisis Lifeline",
      url: "https://988lifeline.org/",
    },
  ],
  "liver-disease": [
    {
      name: "American Liver Foundation",
      url: "https://liverfoundation.org/",
    },
    {
      name: "NIDDK — Liver Disease",
      url: "https://www.niddk.nih.gov/health-information/liver-disease",
    },
  ],
  "heart-disease": [
    {
      name: "American Heart Association",
      url: "https://www.heart.org/",
    },
    {
      name: "NHLBI — National Heart, Lung, and Blood Institute",
      url: "https://www.nhlbi.nih.gov/health/heart",
    },
  ],
  "joint-pain-arthritis": [
    { name: "Arthritis Foundation", url: "https://www.arthritis.org/" },
    {
      name: "American College of Rheumatology — Patient Resources",
      url: "https://rheumatology.org/patients",
    },
  ],
  asthma: [
    {
      name: "Asthma and Allergy Foundation of America",
      url: "https://aafa.org/",
    },
    {
      name: "NHLBI — Asthma",
      url: "https://www.nhlbi.nih.gov/health/asthma",
    },
  ],
  sciatica: [
    {
      name: "OrthoInfo — Sciatica (American Academy of Orthopaedic Surgeons)",
      url: "https://orthoinfo.aaos.org/en/diseases--conditions/sciatica/",
    },
    {
      name: "MedlinePlus — Sciatica",
      url: "https://medlineplus.gov/sciatica.html",
    },
  ],
  "psoriasis-eczema": [
    {
      name: "American Academy of Dermatology — Psoriasis & Eczema",
      url: "https://www.aad.org/public/diseases",
    },
    {
      name: "National Psoriasis Foundation",
      url: "https://www.psoriasis.org/",
    },
  ],
  gerd: [
    {
      name: "American College of Gastroenterology — GERD",
      url: "https://gi.org/topics/acid-reflux/",
    },
    {
      name: "NIDDK — Acid Reflux (GER & GERD)",
      url: "https://www.niddk.nih.gov/health-information/digestive-diseases/acid-reflux-ger-gerd-adults",
    },
  ],
  infertility: [
    {
      name: "ReproductiveFacts.org (American Society for Reproductive Medicine)",
      url: "https://www.reproductivefacts.org/",
    },
    {
      name: "CDC — Infertility",
      url: "https://www.cdc.gov/reproductive-health/infertility-faq/",
    },
  ],
  "multiple-sclerosis": [
    {
      name: "National Multiple Sclerosis Society",
      url: "https://www.nationalmssociety.org/",
    },
    {
      name: "NINDS — Multiple Sclerosis",
      url: "https://www.ninds.nih.gov/health-information/disorders/multiple-sclerosis",
    },
  ],
  insomnia: [
    {
      name: "American Academy of Sleep Medicine — Sleep Education",
      url: "https://sleepeducation.org/",
    },
    {
      name: "NHLBI — Insomnia",
      url: "https://www.nhlbi.nih.gov/health/insomnia",
    },
  ],
  uti: [
    { name: "American Urological Association — Urology Care Foundation", url: "https://www.urologyhealth.org/urology-a-z/u/urinary-tract-infections-in-adults" },
    { name: "CDC — Urinary Tract Infection", url: "https://www.cdc.gov/uti/about/index.html" },
  ],
  "urinary-incontinence": [
    { name: "Urology Care Foundation — Urinary Incontinence", url: "https://www.urologyhealth.org/urology-a-z/u/urinary-incontinence" },
    { name: "NIDDK — Bladder Control Problems", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-control-problems" },
  ],
  "blood-in-urine": [
    { name: "Urology Care Foundation — Hematuria", url: "https://www.urologyhealth.org/urology-a-z/h/hematuria" },
    { name: "NIDDK — Hematuria (Blood in the Urine)", url: "https://www.niddk.nih.gov/health-information/urologic-diseases/hematuria-blood-urine" },
  ],
  migraine: [
    { name: "American Migraine Foundation", url: "https://americanmigrainefoundation.org/" },
    { name: "NINDS — Migraine", url: "https://www.ninds.nih.gov/health-information/disorders/migraine" },
  ],
  "epilepsy-seizures": [
    { name: "Epilepsy Foundation", url: "https://www.epilepsy.com/" },
    { name: "NINDS — Epilepsy and Seizures", url: "https://www.ninds.nih.gov/health-information/disorders/epilepsy-and-seizures" },
  ],
  vertigo: [
    { name: "VeDA — Vestibular Disorders Association", url: "https://vestibular.org/" },
    { name: "NIDCD — Balance Disorders", url: "https://www.nidcd.nih.gov/health/balance-disorders" },
  ],
  fatigue: [
    { name: "MedlinePlus (NIH) — Fatigue", url: "https://medlineplus.gov/fatigue.html" },
    { name: "CDC — Sleep and Sleep Disorders", url: "https://www.cdc.gov/sleep/" },
  ],
};

export const ABOUT_ARTICLES: Record<string, MedicalSource> = {
  diabetes: {
    name: "MedlinePlus (NIH) — Diabetes",
    url: "https://medlineplus.gov/diabetes.html",
  },
  "high-blood-pressure": {
    name: "MedlinePlus (NIH) — High Blood Pressure",
    url: "https://medlineplus.gov/highbloodpressure.html",
  },
  "skin-rash": {
    name: "MedlinePlus (NIH) — Rashes",
    url: "https://medlineplus.gov/rashes.html",
  },
  "skin-bump-lump": {
    name: "MedlinePlus (NIH) — Skin Conditions",
    url: "https://medlineplus.gov/skinconditions.html",
  },
  cancer: {
    name: "MedlinePlus (NIH) — Cancer",
    url: "https://medlineplus.gov/cancer.html",
  },
  ckd: {
    name: "MedlinePlus (NIH) — Chronic Kidney Disease",
    url: "https://medlineplus.gov/chronickidneydisease.html",
  },
  thyroid: {
    name: "MedlinePlus (NIH) — Thyroid Diseases",
    url: "https://medlineplus.gov/thyroiddiseases.html",
  },
  "pcos-gyn": {
    name: "MedlinePlus (NIH) — Polycystic Ovary Syndrome",
    url: "https://medlineplus.gov/polycysticovarysyndrome.html",
  },
  "mental-health": {
    name: "MedlinePlus (NIH) — Mental Health",
    url: "https://medlineplus.gov/mentalhealth.html",
  },
  "liver-disease": {
    name: "MedlinePlus (NIH) — Liver Diseases",
    url: "https://medlineplus.gov/liverdiseases.html",
  },
  "heart-disease": {
    name: "MedlinePlus (NIH) — Heart Diseases",
    url: "https://medlineplus.gov/heartdiseases.html",
  },
  "joint-pain-arthritis": {
    name: "MedlinePlus (NIH) — Arthritis",
    url: "https://medlineplus.gov/arthritis.html",
  },
  asthma: {
    name: "MedlinePlus (NIH) — Asthma",
    url: "https://medlineplus.gov/asthma.html",
  },
  sciatica: {
    name: "MedlinePlus (NIH) — Sciatica",
    url: "https://medlineplus.gov/sciatica.html",
  },
  "psoriasis-eczema": {
    name: "MedlinePlus (NIH) — Psoriasis",
    url: "https://medlineplus.gov/psoriasis.html",
  },
  gerd: {
    name: "MedlinePlus (NIH) — GERD (Acid Reflux)",
    url: "https://medlineplus.gov/gerd.html",
  },
  infertility: {
    name: "MedlinePlus (NIH) — Infertility",
    url: "https://medlineplus.gov/infertility.html",
  },
  "multiple-sclerosis": {
    name: "MedlinePlus (NIH) — Multiple Sclerosis",
    url: "https://medlineplus.gov/multiplesclerosis.html",
  },
  insomnia: {
    name: "MedlinePlus (NIH) — Insomnia",
    url: "https://medlineplus.gov/insomnia.html",
  },
  uti: {
    name: "MedlinePlus (NIH) — Urinary Tract Infections",
    url: "https://medlineplus.gov/urinarytractinfections.html",
  },
  "urinary-incontinence": {
    name: "MedlinePlus (NIH) — Urinary Incontinence",
    url: "https://medlineplus.gov/urinaryincontinence.html",
  },
  "blood-in-urine": {
    name: "MedlinePlus (NIH) — Blood in Urine (Hematuria)",
    url: "https://medlineplus.gov/ency/article/003138.htm",
  },
  migraine: {
    name: "MedlinePlus (NIH) — Migraine",
    url: "https://medlineplus.gov/migraine.html",
  },
  "epilepsy-seizures": {
    name: "MedlinePlus (NIH) — Epilepsy",
    url: "https://medlineplus.gov/epilepsy.html",
  },
  vertigo: {
    name: "MedlinePlus (NIH) — Dizziness and Vertigo",
    url: "https://medlineplus.gov/dizzinessandvertigo.html",
  },
  fatigue: {
    name: "MedlinePlus (NIH) — Fatigue",
    url: "https://medlineplus.gov/fatigue.html",
  },
};
