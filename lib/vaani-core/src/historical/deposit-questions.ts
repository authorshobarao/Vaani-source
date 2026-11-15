/**
 * Historical copyright-deposit dataset (not runtime clinical content).
 * Preserved verbatim during extraction; do not substitute the current question
 * bank, which has different wording and taxonomy. Used only by deposit exports.
 */
export interface Condition {
  id: string;
  label: string;
  categories: Category[];
  subtypes?: Subtype[];
  extraCategories?: ExtraCategory[];
  safetyNotice?: SafetyNotice;
}

export interface Subtype {
  id: string;
  label: string;
  categories: Category[];
}

export interface ExtraCategory {
  id: string;
  triggerType: "checkbox";
  triggerLabel: string;
  categories: Category[];
}

export interface SafetyNotice {
  message: string;
  linkLabel?: string;
  linkHref?: string;
}

export interface Category {
  id: string;
  title: string;
  questions: string[];
}

export const ckdStages = [
  { id: "stage-1", label: "Stage 1" },
  { id: "stage-2", label: "Stage 2" },
  { id: "stage-3", label: "Stage 3" },
  { id: "stage-4", label: "Stage 4" },
  { id: "stage-5", label: "Stage 5" },
  { id: "not-sure", label: "Not sure" },
];

export const conditions: Condition[] = [
  {
    id: "diabetes",
    label: "Diabetes",
    categories: [
      {
        id: "understanding",
        title: "Understanding it",
        questions: [
          "What type do I have?",
          "What were my key numbers (A1C, fasting glucose)?",
          "What's my target A1C?",
          "Is this manageable or reversible?",
        ],
      },
      {
        id: "treatment",
        title: "Treatment",
        questions: [
          "What medication do I need and how does it work?",
          "Will I need insulin?",
          "What side effects should I watch for?",
        ],
      },
      {
        id: "monitoring",
        title: "Monitoring",
        questions: [
          "How often should I check my blood sugar?",
          "Should I use a CGM?",
          "When do we recheck my A1C?",
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle",
        questions: [
          "What diet changes help most?",
          "How much exercise is recommended?",
          "How does my weight affect this?",
        ],
      },
      {
        id: "followup",
        title: "Follow-up & complications",
        questions: [
          "How does this affect my eyes, kidneys, feet, and heart?",
          "What screenings do I need and when?",
          "When is my next visit?",
        ],
      },
    ],
  },
  {
    id: "high-blood-pressure",
    label: "High blood pressure",
    categories: [
      {
        id: "understanding",
        title: "Understanding it",
        questions: [
          "What were my numbers and what's my target?",
          "What's likely causing it?",
        ],
      },
      {
        id: "treatment",
        title: "Treatment",
        questions: [
          "Which medication and why?",
          "What are the side effects?",
          "Can I try lifestyle changes first?",
        ],
      },
      {
        id: "monitoring",
        title: "Monitoring",
        questions: [
          "Should I check at home, and how often?",
          "What readings should worry me?",
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle",
        questions: [
          "What about salt, alcohol, exercise, weight, and stress?",
        ],
      },
      {
        id: "followup",
        title: "Follow-up",
        questions: [
          "When do we recheck?",
          "What organs are at risk if it's not controlled?",
        ],
      },
    ],
  },
  {
    id: "skin-rash",
    label: "Skin rash",
    categories: [
      {
        id: "what-is-it",
        title: "What is it?",
        questions: [
          "What's the likely cause?",
          "Is it contagious or allergic?",
          "Do I need a test or biopsy?",
        ],
      },
      {
        id: "treatment",
        title: "Treatment",
        questions: [
          "What cream or medication, and for how long?",
          "What if it doesn't clear up?",
        ],
      },
      {
        id: "triggers",
        title: "Triggers",
        questions: [
          "What products, foods, or activities should I avoid?",
        ],
      },
      {
        id: "when-to-worry",
        title: "When to worry",
        questions: [
          "What signs mean it's getting worse?",
          "When should I come back or go to the ER?",
        ],
      },
    ],
  },
  {
    id: "skin-bump-lump",
    label: "Skin bump or lump",
    categories: [
      {
        id: "what-is-it",
        title: "What is it?",
        questions: [
          "What do you think this is?",
          "Do we need a biopsy or imaging?",
          "Could it be cancer?",
        ],
      },
      {
        id: "options",
        title: "Options",
        questions: [
          "Should it be removed?",
          "What are the risks of removing it vs. watching it?",
        ],
      },
      {
        id: "changes",
        title: "Changes",
        questions: [
          "How fast might it change?",
          "What signs mean I should come back urgently?",
        ],
      },
      {
        id: "followup",
        title: "Follow-up",
        questions: [
          "When should we recheck it?",
        ],
      },
    ],
  },
  {
    id: "cancer",
    label: "Cancer",
    categories: [
      {
        id: "diagnosis",
        title: "Diagnosis",
        questions: [
          "What type and stage is it?",
          "What tests confirmed it?",
          "Where is it, and has it spread?",
        ],
      },
      {
        id: "treatment-options",
        title: "Treatment options",
        questions: [
          "What are ALL my options (surgery, chemo, radiation, immunotherapy, targeted therapy, watchful waiting)?",
          "What do you recommend and why?",
          "Is the goal to cure it or control it?",
        ],
      },
      {
        id: "side-effects",
        title: "Side effects",
        questions: [
          "What are the side effects of each option?",
          "Will it affect fertility?",
          "Any long-term effects?",
        ],
      },
      {
        id: "logistics",
        title: "Logistics",
        questions: [
          "How long is treatment?",
          "How will it affect work and daily life?",
          "What about cost and insurance?",
          "How do I get a second opinion?",
        ],
      },
      {
        id: "support",
        title: "Support",
        questions: [
          "Are there clinical trials?",
          "Can I see palliative care for symptom support?",
          "Are there support groups?",
          "Who is my main point of contact?",
        ],
      },
      {
        id: "followup",
        title: "Follow-up",
        questions: [
          "How will we know it's working?",
          "What's the scan schedule?",
          "What are signs of recurrence?",
        ],
      },
    ],
    subtypes: [
      {
        id: "breast",
        label: "Breast",
        categories: [
          {
            id: "breast-specific",
            title: "Breast cancer — specific questions",
            questions: [
              "Should I get genetic testing (BRCA1/BRCA2), and would it change my treatment or my family's screening?",
              "What's my hormone-receptor (ER/PR) and HER2 status, and what does it mean for me?",
              "What are my surgery options (lumpectomy vs. mastectomy) and reconstruction options?",
              "Will I need chemo, radiation, or hormone therapy, and in what order?",
              "How will treatment affect fertility, and can I preserve options before starting?",
            ],
          },
        ],
      },
      {
        id: "lung",
        label: "Lung",
        categories: [
          {
            id: "lung-specific",
            title: "Lung cancer — specific questions",
            questions: [
              "Was it caused by smoking, and does that change treatment?",
              "What is my mutation testing showing?",
              "Am I a surgery candidate?",
            ],
          },
        ],
      },
      {
        id: "colorectal",
        label: "Colorectal",
        categories: [
          {
            id: "colorectal-specific",
            title: "Colorectal cancer — specific questions",
            questions: [
              "Do I need a colostomy?",
              "Was the tumor tested for genetic markers?",
              "What about my family's screening schedule?",
            ],
          },
        ],
      },
      {
        id: "prostate",
        label: "Prostate",
        categories: [
          {
            id: "prostate-specific",
            title: "Prostate cancer — specific questions",
            questions: [
              "What's my Gleason score and PSA?",
              "Is active surveillance an option for me?",
              "How will treatment affect urinary and sexual function?",
            ],
          },
        ],
      },
      {
        id: "melanoma",
        label: "Skin / Melanoma",
        categories: [
          {
            id: "melanoma-specific",
            title: "Skin / Melanoma — specific questions",
            questions: [
              "How deep is it?",
              "Do we need to check my lymph nodes?",
              "How often should I have full-body skin checks?",
            ],
          },
        ],
      },
      {
        id: "cervical",
        label: "Cervical",
        categories: [
          {
            id: "cervical-specific",
            title: "Cervical cancer — specific questions",
            questions: [
              "What stage and HPV status?",
              "How will treatment affect fertility?",
              "What follow-up Pap/HPV schedule should I follow?",
            ],
          },
        ],
      },
      {
        id: "leukemia",
        label: "Leukemia",
        categories: [
          {
            id: "leukemia-specific",
            title: "Leukemia — specific questions",
            questions: [
              "Which type (acute or chronic)?",
              "Do I need treatment now or just monitoring?",
              "Will I need a bone marrow transplant?",
            ],
          },
        ],
      },
      {
        id: "lymphoma",
        label: "Lymphoma",
        categories: [
          {
            id: "lymphoma-specific",
            title: "Lymphoma — specific questions",
            questions: [
              "Hodgkin or non-Hodgkin, and which subtype?",
              "What's the treatment plan and timeline?",
              "What are the long-term effects of treatment?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ckd",
    label: "Chronic kidney disease (CKD)",
    categories: [
      {
        id: "diagnosis-stage",
        title: "My diagnosis & stage",
        questions: [
          "What stage am I, and what is my eGFR?",
          "What's my urine albumin (ACR)?",
          "What caused my CKD?",
          "Is it likely to get worse, and how fast?",
        ],
      },
      {
        id: "protecting-kidneys",
        title: "Protecting my kidneys",
        questions: [
          "What's my blood pressure target?",
          "Should I be on an ACE inhibitor, ARB, or an SGLT2 inhibitor?",
          "Which medicines or supplements should I avoid (for example, NSAIDs like ibuprofen)?",
          "If I'm diabetic, what's my blood sugar target?",
        ],
      },
      {
        id: "diet-lifestyle",
        title: "Diet & lifestyle",
        questions: [
          "Can I see a kidney dietitian?",
          "How much protein, sodium, potassium, and phosphorus is right for me?",
          "Are there any fluid limits I should follow?",
          "Which supplements are safe?",
          "What about exercise?",
        ],
      },
      {
        id: "monitoring",
        title: "Monitoring",
        questions: [
          "How often will we check my labs and eGFR?",
          "Which numbers should I track myself?",
          "What changes would concern you?",
        ],
      },
      {
        id: "medications",
        title: "My medications",
        questions: [
          "Do any of my current medications need dose changes for my kidneys?",
          "Should I start or stop anything?",
        ],
      },
      {
        id: "planning-ahead",
        title: "Planning ahead",
        questions: [
          "At what point do we talk about dialysis or transplant?",
          "What are all my options (hemodialysis, peritoneal dialysis, transplant, conservative care)?",
          "Could I avoid dialysis with an early (\"pre-emptive\") transplant?",
        ],
      },
      {
        id: "emotional-practical",
        title: "Emotional & practical",
        questions: [
          "How might this affect my energy and my work?",
          "Is there mental health support available?",
          "Are there support groups or kidney organizations you recommend?",
          "Where can I get help with insurance and costs?",
        ],
      },
      {
        id: "red-flags",
        title: "Red flags",
        questions: [
          "What symptoms mean I should call you or go to the ER?",
        ],
      },
    ],
    extraCategories: [
      {
        id: "transplant",
        triggerType: "checkbox",
        triggerLabel: "I'm interested in or being evaluated for a kidney transplant.",
        categories: [
          {
            id: "transplant-eval",
            title: "Transplant evaluation",
            questions: [
              "Am I a candidate for a kidney transplant?",
              "How and when do I get referred to a transplant center?",
              "Can I be evaluated before I need dialysis (a pre-emptive transplant)?",
              "What's the difference between a living donor and a deceased donor for me?",
              "How do I find a living donor — and is it okay to ask family or friends?",
              "What tests are involved in evaluation, and how long does the whole process take?",
              "What could make me ineligible, and are any of those things I can work on or fix?",
              "Can we start the evaluation process now?",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "thyroid",
    label: "Thyroid condition",
    categories: [
      {
        id: "understanding",
        title: "Understanding it",
        questions: [
          "Is my thyroid overactive or underactive?",
          "What were my TSH, T3, and T4 levels?",
          "What caused this (for example, Hashimoto's or Graves')?",
          "Is it permanent?",
        ],
      },
      {
        id: "treatment",
        title: "Treatment",
        questions: [
          "What medication do I need, and at what dose?",
          "How long until I feel better?",
          "What if I still feel off after starting it?",
        ],
      },
      {
        id: "monitoring",
        title: "Monitoring",
        questions: [
          "How often do we recheck my levels?",
          "What symptoms mean my dose is wrong?",
        ],
      },
      {
        id: "daily-life",
        title: "Daily life",
        questions: [
          "How should I take my medication (timing, food, other meds)?",
          "Does this affect my weight, energy, mood, hair, or periods?",
          "Does it affect pregnancy or fertility?",
        ],
      },
      {
        id: "followup",
        title: "Follow-up",
        questions: [
          "When is my next blood test and visit?",
        ],
      },
    ],
  },
  {
    id: "pcos-gyn",
    label: "PCOS / gynecological",
    categories: [
      {
        id: "understanding",
        title: "Understanding it",
        questions: [
          "What's causing my symptoms?",
          "What tests confirm it (hormones, ultrasound)?",
        ],
      },
      {
        id: "symptoms-treatment",
        title: "Symptoms & treatment",
        questions: [
          "What are my options for irregular periods, acne, or unwanted hair?",
          "Do I need birth control, metformin, or something else?",
          "What are the side effects?",
        ],
      },
      {
        id: "fertility",
        title: "Fertility",
        questions: [
          "How does this affect my ability to get pregnant?",
          "What can help if I want to conceive — now or later?",
        ],
      },
      {
        id: "long-term-health",
        title: "Long-term health",
        questions: [
          "What's my risk for diabetes, heart issues, or other problems, and how do we watch for them?",
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle",
        questions: [
          "Do diet, weight, or exercise changes help, and how much?",
        ],
      },
      {
        id: "general-gyn",
        title: "General gynecological visit",
        questions: [
          "Do I need a Pap smear or HPV test, and when?",
          "Is this bleeding / pain / discharge normal?",
          "When should I come back?",
        ],
      },
      {
        id: "followup",
        title: "Follow-up & second opinions",
        questions: [
          "When do we recheck?",
          "How do I get a referral if I want one?",
        ],
      },
    ],
  },
  {
    id: "mental-health",
    label: "Mental health (depression / anxiety)",
    safetyNotice: {
      message:
        "If you're in crisis or thinking about harming yourself, you deserve help right now. In the US, call or text 988 (Suicide & Crisis Lifeline). If you're elsewhere, contact your local emergency number or a crisis line.",
    },
    categories: [
      {
        id: "understanding",
        title: "Understanding it",
        questions: [
          "What do you think is going on?",
          "Could anything physical (thyroid, vitamins, sleep, medications) be contributing?",
        ],
      },
      {
        id: "options",
        title: "Options",
        questions: [
          "What are my treatment options — therapy, medication, or both?",
          "What do you recommend and why?",
          "How long until I might feel a difference?",
        ],
      },
      {
        id: "medication",
        title: "Medication",
        questions: [
          "What are the side effects?",
          "Is it habit-forming?",
          "What if the first one doesn't work?",
          "How and when would I stop it safely?",
        ],
      },
      {
        id: "therapy-support",
        title: "Therapy & support",
        questions: [
          "What kind of therapy fits me, and how do I find someone?",
          "Are there support groups or low-cost options?",
        ],
      },
      {
        id: "daily-followup",
        title: "Daily life & follow-up",
        questions: [
          "What can I do day to day?",
          "When should we check in again?",
          "Who do I contact if things get worse before then?",
        ],
      },
    ],
  },
];
