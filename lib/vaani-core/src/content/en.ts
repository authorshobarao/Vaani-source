import type { LanguageData } from "./types";
import { FEATURE_EN } from "./features";

const en: LanguageData = {
  code: "en",
  label: "English",
  ui: {
    ...FEATURE_EN,
    appTitle: "Vaani",
    appSubtitle: "Find your voice at the doctor's office.",
    heroHeading: "Prepare for your doctor visit",
    heroDescription:
      "Vaani helps you prepare the questions to ask — so you leave your appointment with answers, not regrets.",
    tip: "Tip: Check every question you want to ask — even if it feels small. Your doctor is there to help.",
    conditionSelectLabel: "What would you like to talk to your doctor about?",
    conditionSelectPlaceholder: "— Choose a topic —",
    printButton: "Print this page",
    downloadButton: "Download a copy",
    savedLocallyNotice: "Saved only on this device — download a copy so you don't lose it.",
    visitTypeLabel: "Is this your first visit or a follow-up?",
    visitTypeFirst: "First visit",
    visitTypeFollowup: "Follow-up visit",
    followupCategory: {
      id: "followup-visit",
      title: "Since my last visit",
      questions: [
        "How has my condition changed since my last visit?",
        "What did my latest test or lab results show?",
        "Are my current medications still working — should anything change?",
        "Are there side effects I should keep watching for?",
        "Do we need to adjust my treatment plan?",
        "What should I do or track before my next visit?",
      ],
    },
    uploadTitle: "Add questions from your lab or medical report",
    uploadHint: "Upload a photo or PDF of your latest report. It's sent securely to our server and Google Gemini (an AI service) to suggest questions. Vaani doesn't save it.",
    uploadButton: "Upload report",
    uploadChooseAnother: "Choose a different file",
    uploadAnalyzing: "Reading your report…",
    uploadError: "Couldn't read that file. Please try a clear photo or a PDF.",
    uploadTooLarge: "That file is too large. Please use one under 8 MB.",
    resetButton: "Reset / start fresh",
    resetConfirmText: "This will clear all your checks, notes, and custom questions.",
    resetConfirmYes: "Yes, reset",
    resetConfirmCancel: "Cancel",
    notesLabel: "What my doctor told me",
    notesPlaceholder: "Write notes here during or after your visit…",
    yourQuestionsTitle: "Your questions",
    yourQuestionsPlaceholder: "Add your own question…",
    yourQuestionsAdd: "Add",
    disclaimer:
      "This tool helps you prepare questions — it is not medical advice. Always follow your doctor's guidance.",
    questionsSoonTitle: "Questions coming soon",
    questionsSoonDesc:
      "General questions for this topic are being added. Use the box below to add your own questions now.",
    ckdStageLabel: "My CKD stage",
    ckdStagePlaceholder: "— Select stage —",
    ckdStageOptional: "(optional)",
    ckdStageNotes: {
      "stage-1":
        "Stage 1 (eGFR ≥ 90): Kidney damage present but function is normal or high. Focus is on protecting kidneys and treating the cause.",
      "stage-2":
        "Stage 2 (eGFR 60–89): Mild decrease. Focus on slowing progression.",
      "stage-3":
        "Stage 3 (eGFR 30–59): Moderate decrease. Managing complications is important.",
      "stage-4":
        "Stage 4 (eGFR 15–29): Severe decrease. Time to plan for kidney replacement therapy.",
      "stage-5":
        "Stage 5 (eGFR < 15): Kidney failure. Dialysis or transplant is typically needed.",
      "not-sure": "Not sure of your stage? Ask your doctor for your eGFR number.",
    },
    transplantLabel: "I'm interested in or being evaluated for a kidney transplant.",
    transplantSubLabel: "This adds transplant-specific questions below.",
    cancerSubtypeLabel: "Which type of cancer?",
    cancerSubtypeOptional: "(optional — adds specific questions)",
    cancerSubtypePlaceholder: "— Select type —",
    aiPanelHeading: "Add questions for my situation",
    aiPanelLabel: "Describe your situation and symptoms in your own words",
    aiPanelPlaceholder:
      'For example: "I\'m 62, recently diagnosed with {condition}, and I want to understand my treatment options."',
    aiPanelButton: "Suggest questions for me",
    aiPanelLoading: "Thinking…",
    aiPanelDisclaimer:
      "Your description is sent securely to our server and processed by an AI service to create suggestions; it is not stored. AI-suggested questions are conversation starters only — not medical advice.",
    aiPanelError:
      "Something went wrong. Please try again in a moment.",
    safetyNoticeTitle: "Need help right now?",
    safetyNoticeLine988:
      "If you're in crisis or thinking about harming yourself, you deserve help right now. In the US, call or text 988 (Suicide & Crisis Lifeline).",
    safetyNoticeInternational:
      "Crisis resources vary by country — please look up the crisis line for your region.",
    permissionDeniedTitle: "Permission needed",
    permissionDeniedMessage: "Vaani doesn't have access. Please allow it in your device Settings to use this feature.",
    openSettings: "Open Settings",
    languageLabel: "Language",
    aboutArticleLabel: "Read about this condition:",
    addTopicButton: "Add your topic if not found above",
    addTopicPlaceholder: "Type your topic (for example: knee pain)…",
    addTopicSave: "Add topic",
    sourcesTitle: "Medical sources & references",
    sourcesIntro:
      "The questions and information in this app are informed by guidance from these trusted health organizations. Tap a source to learn more:",
  },
  conditions: [
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
          questions: ["What products, foods, or activities should I avoid?"],
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
          questions: ["When should we recheck it?"],
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
            'Could I avoid dialysis with an early ("pre-emptive") transplant?',
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
          questions: ["What symptoms mean I should call you or go to the ER?"],
        },
      ],
      extraCategories: [
        {
          id: "transplant",
          triggerLabel:
            "I'm interested in or being evaluated for a kidney transplant.",
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
          questions: ["When is my next blood test and visit?"],
        },
      ],
    },
    {
      id: "pcos-gyn",
      label: "PCOS / Gynecological",
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
    {
      id: "liver-disease",
      label: "Liver Disease",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What type of liver disease do I have — fatty liver, hepatitis, cirrhosis, or something else?",
            "What caused it, and can that cause be treated?",
            "What stage or level of damage is my liver at?",
            "Is my liver still functioning normally right now?",
            "Can this improve, or is it likely to get worse over time?",
            "Should I see a liver specialist (hepatologist)?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment & medications",
          questions: [
            "Do I need medication, and what are the side effects?",
            "Are there treatments that can slow down or reverse the damage?",
            "Will I need any procedures, like a liver biopsy or endoscopy?",
            "Are there clinical trials or newer treatments I should know about?",
            "If my liver gets worse, what options do I have — including transplant?",
          ],
        },
        {
          id: "lifestyle",
          title: "Lifestyle & diet",
          questions: [
            "Should I completely stop drinking alcohol?",
            "Are there foods I should eat more of, or avoid?",
            "Would losing weight help my liver, and how much?",
            "Is it safe to take Tylenol, ibuprofen, or other over-the-counter pain relievers?",
            "Which vitamins or supplements are safe — and which should I avoid?",
            "Is exercise safe and helpful for me right now?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoring & tests",
          questions: [
            "What blood tests do I need and how often?",
            "Do I need imaging like an ultrasound, CT scan, or MRI, and how often?",
            "Should I be screened for liver cancer?",
            "How will we know if my condition is improving or getting worse?",
            "Are there any vaccines I should get to protect my liver (hepatitis A, hepatitis B)?",
          ],
        },
        {
          id: "warning-signs",
          title: "Warning signs",
          questions: [
            "What symptoms should make me go to the emergency room right away?",
            "What should I watch for at home and report to you promptly?",
            "If my belly swells up or my skin turns yellow, what should I do?",
            "Should my family members be tested — is any of this hereditary or contagious?",
          ],
        },
      ],
    },
    {
      id: "heart-disease",
      label: "Heart Disease / Cardiovascular",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What type of heart condition do I have exactly?",
            "How serious is it, and what does it mean for my daily life?",
            "What caused this — genetics, lifestyle, or something else?",
            "How well is my heart pumping right now (ejection fraction or other measures)?",
            "Should I see a cardiologist or heart specialist?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment & medications",
          questions: [
            "What medications do I need, and what are the side effects?",
            "Will I need a procedure — like a stent, bypass surgery, or pacemaker?",
            "How will I know if my medications are working?",
            "What happens if I miss a dose of my heart medication?",
            "Are there clinical trials or newer treatments I should know about?",
          ],
        },
        {
          id: "lifestyle",
          title: "Lifestyle & diet",
          questions: [
            "What diet changes will help my heart the most?",
            "How much salt and alcohol is safe?",
            "How much exercise is safe for me, and what kind?",
            "How does stress affect my heart, and what can I do about it?",
            "Should I quit smoking, and what help is available?",
            "Is it safe to be sexually active?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoring & tests",
          questions: [
            "What tests do I need — EKG, echocardiogram, stress test — and how often?",
            "What numbers should I track at home (blood pressure, heart rate, weight)?",
            "What are my target cholesterol, blood pressure, and heart rate numbers?",
            "How will we know if my condition is improving or getting worse?",
          ],
        },
        {
          id: "warning-signs",
          title: "Warning signs",
          questions: [
            "What symptoms mean I should call 911 right away?",
            "What signs should I watch for and report to you promptly?",
            "What should I do if I have chest pain or pressure?",
            "Should anyone in my family be screened for heart disease?",
          ],
        },
      ],
    },
    {
      id: "joint-pain-arthritis",
      label: "Joint Pain / Arthritis",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What type of arthritis do I have — osteoarthritis, rheumatoid, psoriatic, gout, or another?",
            "What is causing the joint damage in my case?",
            "Which joints are affected now, and is this likely to spread?",
            "How do I know if my joint damage is getting worse over time?",
            "Should I see a rheumatologist or orthopedic specialist?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment & medications",
          questions: [
            "What medications do I need — NSAIDs, steroids, DMARDs, or biologics?",
            "What are the side effects, and how long will I need to take them?",
            "Is physical therapy or occupational therapy recommended for me?",
            "Would a joint injection help, and how often can I have one?",
            "At what point would surgery or a joint replacement be considered?",
          ],
        },
        {
          id: "flares",
          title: "Managing flares & pain",
          questions: [
            "What can I do at home when my joints flare up?",
            "Is heat or ice better for my pain?",
            "Are there braces, splints, or assistive devices that would help?",
            "What activities should I avoid to protect my joints?",
            "When should a flare make me call you instead of just managing at home?",
          ],
        },
        {
          id: "lifestyle",
          title: "Lifestyle & diet",
          questions: [
            "Are there foods that reduce inflammation — or foods that make it worse?",
            "How much exercise is safe, and what types are best for my joints?",
            "Would losing weight help reduce my joint pain, and how much?",
            "Are any supplements helpful — like fish oil, turmeric, or glucosamine?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoring & tests",
          questions: [
            "What blood tests or imaging do I need and how often?",
            "How will we measure whether my treatment is working?",
            "What side effects from my medications should I watch for and report?",
            "How often should I come in for check-ups?",
          ],
        },
      ],
    },
    {
      id: "asthma",
      label: "Asthma",
      subtypeLabel: "Which type of asthma?",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What type of asthma do I have?",
            "What is triggering my asthma?",
            "Is my asthma mild, moderate, or severe?",
            "Is my asthma well controlled right now?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment & inhalers",
          questions: [
            "What is the difference between my controller and rescue inhaler?",
            "Can you watch me use my inhaler to check my technique?",
            "How often is it safe to use my rescue inhaler?",
            "Do I need a spacer, and what side effects should I expect?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoring & action plan",
          questions: [
            "Should I track my peak flow at home?",
            "How do I know if my asthma is getting worse?",
            "When should I use my action plan, call you, or go to the ER?",
            "How often should I come in for review?",
          ],
        },
        {
          id: "triggers-lifestyle",
          title: "Triggers & daily life",
          questions: [
            "How can I reduce triggers at home and at work?",
            "Is it safe to exercise, and how do I prevent attacks?",
            "Which vaccines do I need (flu, pneumonia, COVID)?",
            "Does smoking or vaping affect my asthma?",
          ],
        },
      ],
      subtypes: [
        {
          id: "allergic",
          label: "Allergic (extrinsic)",
          categories: [
            {
              id: "allergic-specific",
              title: "Allergic asthma — specific questions",
              questions: [
                "Should I get allergy testing?",
                "Would allergy medicines or immunotherapy help me?",
                "Which allergens should I avoid most?",
              ],
            },
          ],
        },
        {
          id: "non-allergic",
          label: "Non-allergic (intrinsic)",
          categories: [
            {
              id: "non-allergic-specific",
              title: "Non-allergic asthma — specific questions",
              questions: [
                "What sets off my asthma if it is not allergies?",
                "Can infections, cold air, or stress trigger my attacks?",
                "What can I do about non-allergic triggers?",
              ],
            },
          ],
        },
        {
          id: "exercise-induced",
          label: "Exercise-induced",
          categories: [
            {
              id: "exercise-specific",
              title: "Exercise-induced asthma — specific questions",
              questions: [
                "What should I do before exercising to prevent symptoms?",
                "Should I use my inhaler before working out?",
                "Which sports or activities are safest for me?",
              ],
            },
          ],
        },
        {
          id: "cough-variant",
          label: "Cough-variant",
          categories: [
            {
              id: "cough-specific",
              title: "Cough-variant asthma — specific questions",
              questions: [
                "Could my long-lasting cough be asthma?",
                "What treatment helps cough-variant asthma?",
                "How long until the cough improves?",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sciatica",
      label: "Sciatica / Nerve pain",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What is causing my sciatica?",
            "Which nerve or disc is involved?",
            "Is this likely to get better on its own?",
            "How long does recovery usually take?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "What can I do at home to relieve the pain?",
            "Which pain medicines are safe for me, and for how long?",
            "Would physical therapy help?",
            "Do I need an injection or surgery — and if surgery, what is its success rate?",
          ],
        },
        {
          id: "activity",
          title: "Activity & recovery",
          questions: [
            "What movements or positions should I avoid?",
            "Is it better to rest or stay active?",
            "Are there stretches or exercises that help?",
            "When can I return to work or normal activity?",
          ],
        },
        {
          id: "warning-signs",
          title: "Warning signs & tests",
          questions: [
            "What symptoms mean I should call you right away?",
            "Are numbness, weakness, or loss of bladder control an emergency?",
            "What imaging or tests do I need?",
          ],
        },
      ],
    },
    {
      id: "psoriasis-eczema",
      label: "Psoriasis / Eczema",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "Is this psoriasis, eczema, or something else?",
            "What is triggering my flare-ups?",
            "Is this a lifelong condition?",
            "Is it contagious?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "Which creams or ointments should I use, and how?",
            "Are there stronger treatments (light therapy, pills, biologics) for me?",
            "How long until I see improvement?",
            "What side effects should I expect from my treatment?",
          ],
        },
        {
          id: "daily-care",
          title: "Daily skin care",
          questions: [
            "What skincare routine and products do you recommend?",
            "Which soaps, fabrics, or foods should I avoid?",
            "How do I care for my skin during a flare?",
            "How can I reduce the itching?",
          ],
        },
        {
          id: "broader-health",
          title: "Broader health",
          questions: [
            "Is my skin condition linked to anything else (joints, heart, mood)?",
            "Should I see a specialist?",
            "How will we track whether treatment is working?",
          ],
        },
      ],
    },
    {
      id: "gerd",
      label: "Acid reflux / GERD",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What is causing my acid reflux?",
            "Is this GERD, and could it harm my esophagus?",
            "Do I need any tests, like an endoscopy?",
            "Is this a long-term condition?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "Which medication is right for me, and for how long?",
            "Are there risks to taking acid-reducers long term?",
            "What can I do if medication is not enough?",
            "If surgery is suggested, what is its success rate and what are the risks?",
          ],
        },
        {
          id: "diet-lifestyle",
          title: "Diet & lifestyle",
          questions: [
            "Which foods and drinks should I avoid?",
            "How do meal timing and portion sizes affect reflux?",
            "Would losing weight or raising the head of my bed help?",
            "Does smoking or alcohol make it worse?",
          ],
        },
        {
          id: "warning-signs",
          title: "Warning signs",
          questions: [
            "What symptoms mean I should be seen quickly (trouble swallowing, weight loss, vomiting blood)?",
            "Could my symptoms be something other than reflux?",
            "How often should I follow up?",
          ],
        },
      ],
    },
    {
      id: "infertility",
      label: "Infertility / Trying to conceive",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What tests do we both need to find the cause?",
            "What could be making it harder to conceive?",
            "How do my age and health affect our chances?",
            "How long should we keep trying before more testing?",
          ],
        },
        {
          id: "treatment-options",
          title: "Treatment options",
          questions: [
            "What are our options, from simplest to most advanced?",
            "What are the success rates for someone like us?",
            "What does each option cost, and is any of it covered?",
            "What are the risks and side effects of each treatment?",
          ],
        },
        {
          id: "process",
          title: "The process",
          questions: [
            "How long does each step take?",
            "How many cycles or attempts are typical before changing course?",
            "What lifestyle changes could improve our chances?",
            "Should we see a fertility specialist?",
          ],
        },
        {
          id: "emotional-practical",
          title: "Emotional & practical",
          questions: [
            "What support is available for the stress of this process?",
            "What are our options if treatment does not work?",
            "How do we decide when to stop or change plans?",
          ],
        },
      ],
    },
    {
      id: "multiple-sclerosis",
      label: "Multiple sclerosis (MS)",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What type of MS do I have?",
            "What do my MRI and test results show?",
            "How might this affect me over time?",
            "What is the difference between a relapse and progression?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "Which disease-modifying treatment is best for me, and why?",
            "What are the benefits and risks of this treatment?",
            "How is a relapse treated?",
            "What side effects should I expect, and how will we know it is working?",
          ],
        },
        {
          id: "symptoms-daily",
          title: "Symptoms & daily life",
          questions: [
            "How do I manage fatigue, pain, or other symptoms?",
            "Would physical or occupational therapy help?",
            "How do heat, stress, or infections affect my MS?",
            "What can I do to stay as active as possible?",
          ],
        },
        {
          id: "planning-monitoring",
          title: "Planning & monitoring",
          questions: [
            "How often will I need MRIs or check-ups?",
            "What symptoms should make me call you right away?",
            "How could MS affect work, driving, or family planning?",
            "What support services are available to me?",
          ],
        },
      ],
    },
    {
      id: "insomnia",
      label: "Insomnia / Sleep problems",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What could be causing my sleep problems?",
            "Could a health condition or medication be keeping me awake?",
            "Do I need a sleep study?",
            "How much sleep should I aim for?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "What changes can I try before medication?",
            "Is cognitive behavioral therapy for insomnia (CBT-I) an option?",
            "If I need sleep medicine, what are the risks and side effects, and how long should I take it?",
            "Are over-the-counter sleep aids safe for me?",
          ],
        },
        {
          id: "habits",
          title: "Habits & routine",
          questions: [
            "What daily habits help or hurt my sleep?",
            "How do caffeine, alcohol, and screens affect my sleep?",
            "What should a good bedtime routine look like?",
            "Is napping okay?",
          ],
        },
        {
          id: "followup",
          title: "Follow-up",
          questions: [
            "How will we measure if my sleep is improving?",
            "Should I keep a sleep diary?",
            "When should I follow up?",
          ],
        },
      ],
    },
    {
      id: "uti",
      label: "Urinary Tract Infection (UTI)",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "Is this a bladder infection or could it involve my kidneys?",
            "What caused this infection?",
            "Why do I keep getting UTIs?",
            "Do I need a urine culture or other tests?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "Which antibiotic am I getting, and for how many days?",
            "What if my symptoms don't improve in a couple of days?",
            "What side effects should I watch for?",
            "Is there anything I can take for the burning or pain?",
          ],
        },
        {
          id: "prevention",
          title: "Prevention",
          questions: [
            "How can I prevent future UTIs?",
            "Does cranberry juice or a supplement actually help?",
            "How much water should I drink each day?",
            "Are there hygiene habits I should change?",
          ],
        },
        {
          id: "warning",
          title: "When to worry",
          questions: [
            "What symptoms mean the infection is getting worse?",
            "When should I go to urgent care or the ER?",
            "Could fever or back pain mean a kidney infection?",
          ],
        },
      ],
    },
    {
      id: "urinary-incontinence",
      label: "Urinary Incontinence",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What type of incontinence do I have — stress, urge, or mixed?",
            "What's causing my leakage?",
            "Could my medications be making this worse?",
            "Do I need any tests, like a bladder function test?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment options",
          questions: [
            "Can pelvic floor (Kegel) exercises help me — and how do I do them right?",
            "Would bladder training or scheduled bathroom trips help?",
            "Are there medications for this, and what are the side effects?",
            "When would surgery or a procedure be considered?",
          ],
        },
        {
          id: "lifestyle",
          title: "Daily life",
          questions: [
            "Should I change how much or when I drink fluids?",
            "Do caffeine or alcohol make this worse?",
            "What products or protection do you recommend?",
            "Can weight loss improve my symptoms?",
          ],
        },
        {
          id: "referral",
          title: "Specialists",
          questions: [
            "Should I see a urologist or urogynecologist?",
            "Is a pelvic floor physical therapist an option for me?",
          ],
        },
      ],
    },
    {
      id: "blood-in-urine",
      label: "Blood in Urine",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What are the most likely causes of the blood in my urine?",
            "Could this be from an infection, kidney stone, or something more serious?",
            "Could a medication or food be causing the color change?",
            "Is the amount of blood related to how serious it is?",
          ],
        },
        {
          id: "tests",
          title: "Tests",
          questions: [
            "What tests do I need — urine tests, imaging, or a bladder scope (cystoscopy)?",
            "What will each test tell us?",
            "How soon should these tests be done?",
            "Will you check my kidney function too?",
          ],
        },
        {
          id: "nextsteps",
          title: "Next steps",
          questions: [
            "What should I do if I see blood again before my tests?",
            "Do I need to see a urologist or kidney specialist?",
            "What symptoms mean I should seek care right away?",
            "When will we have answers about the cause?",
          ],
        },
      ],
    },
    {
      id: "migraine",
      label: "Migraine",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "Are my headaches actually migraines, or another type of headache?",
            "What are my most likely triggers?",
            "Should I keep a headache diary — what should I track?",
            "Do I need a brain scan or other tests?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "What should I take when a migraine starts, and how quickly?",
            "Am I a candidate for preventive medication?",
            "What about the newer migraine medicines (CGRP blockers) — would they help me?",
            "Can I overuse pain relievers — what is a rebound headache?",
          ],
        },
        {
          id: "lifestyle",
          title: "Triggers & lifestyle",
          questions: [
            "Do certain foods, sleep changes, or stress cause my attacks?",
            "Are my hormones playing a role?",
            "What changes to my routine could reduce attacks?",
          ],
        },
        {
          id: "warning",
          title: "When to worry",
          questions: [
            "What headache symptoms are red flags that need urgent care?",
            "When should I come back if things don't improve?",
          ],
        },
      ],
    },
    {
      id: "epilepsy-seizures",
      label: "Epilepsy / Seizures",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What kind of seizures am I having?",
            "What's causing them — do we know?",
            "What tests do I need (EEG, MRI)?",
            "Will I have more seizures?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "Which medication are you recommending and why?",
            "What side effects should I watch for?",
            "What happens if I miss a dose?",
            "How long will I need to take medication?",
          ],
        },
        {
          id: "safety",
          title: "Safety & daily life",
          questions: [
            "Can I drive — what are the rules in my state?",
            "What should my family do if I have a seizure?",
            "Are there activities I should avoid (swimming, heights)?",
            "Can I drink alcohol with my medication?",
          ],
        },
        {
          id: "monitoring",
          title: "Follow-up",
          questions: [
            "Should I track my seizures — what details help you most?",
            "Do I need blood tests to check my medication levels?",
            "When should I see an epilepsy specialist (neurologist)?",
          ],
        },
      ],
    },
    {
      id: "vertigo",
      label: "Vertigo / Dizziness",
      categories: [
        {
          id: "understanding",
          title: "Understanding it",
          questions: [
            "What's causing my dizziness — inner ear, blood pressure, or something else?",
            "Is this BPPV (loose crystals in the inner ear)?",
            "Could my medications be causing this?",
            "Do I need a hearing test or balance testing?",
          ],
        },
        {
          id: "treatment",
          title: "Treatment",
          questions: [
            "Can a repositioning maneuver (like the Epley) fix this?",
            "Is there medication that helps, and when should I take it?",
            "Would vestibular (balance) therapy help me?",
            "How long will this last?",
          ],
        },
        {
          id: "safety",
          title: "Safety",
          questions: [
            "What should I do during a vertigo attack?",
            "How can I prevent falls at home?",
            "Is it safe for me to drive?",
          ],
        },
        {
          id: "warning",
          title: "When to worry",
          questions: [
            "What dizziness symptoms could signal a stroke or something urgent?",
            "When should I seek immediate care?",
          ],
        },
      ],
    },
    {
      id: "fatigue",
      label: "General Fatigue",
      categories: [
        {
          id: "understanding",
          title: "Finding the cause",
          questions: [
            "What are the most common causes of fatigue like mine?",
            "Could this be anemia, thyroid, vitamin deficiency, or diabetes?",
            "Could my medications be making me tired?",
            "Could poor sleep or sleep apnea be the cause?",
          ],
        },
        {
          id: "tests",
          title: "Tests",
          questions: [
            "What blood tests should I have?",
            "Do I need a sleep study?",
            "What will we do if the tests all come back normal?",
          ],
        },
        {
          id: "mental",
          title: "Mood & stress",
          questions: [
            "Could stress, anxiety, or depression be part of this?",
            "How do we tell physical causes apart from emotional ones?",
          ],
        },
        {
          id: "lifestyle",
          title: "What I can do",
          questions: [
            "What changes to diet, exercise, or sleep would help most?",
            "How much sleep should I be getting?",
            "When should I expect to feel better, and what's our next step if I don't?",
          ],
        },
      ],
    },
  ],
};

export default en;
