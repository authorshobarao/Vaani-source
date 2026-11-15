export const HOW_IT_WORKS_CONTENT = {
  navTitle: "How it works",
  seoTitle: "How it works — Vaani",
  seoDescription:
    "Learn how Vaani helps you prepare for your doctor visits in three simple steps.",
  title: "How Vaani Works",
  introduction:
    "Prepare for your appointment in minutes so you can focus on getting answers, not trying to remember your questions.",
  steps: [
    {
      id: "pick-condition",
      title: "1. Pick a condition",
      description:
        "Select your health topic or upload your latest lab report. Vaani loads a checklist of essential questions to ask.",
    },
    {
      id: "review-add",
      title: "2. Review and add",
      description:
        "Check the questions that matter to you. Use the AI to suggest specific questions based on your unique situation.",
    },
    {
      id: "take-to-doctor",
      title: "3. Take it to the doctor",
      description:
        "Bring your checklist to the appointment. Dictate the doctor's answers right into the app so you don't forget anything.",
    },
  ],
  callToAction: "Start preparing now",
} as const;

export const ABOUT_CONTENT = {
  navTitle: "About",
  seoTitle: "About — Vaani",
  seoDescription:
    "Vaani's mission is to help patients feel prepared and heard at their doctor visits.",
  title: "About Vaani",
  mission:
    "Our mission is simple: to help every patient feel prepared and heard when they sit down in the doctor's office.",
  paragraphs: [
    "Doctor visits can be overwhelming. You might wait weeks for an appointment, only to feel rushed when the doctor finally arrives. In the stress of the moment, it's easy to forget the questions you meant to ask or feel unsure about the information you receive.",
    "Vaani was built to change that. We believe that good healthcare starts with a good conversation. By providing a structured way to review essential questions, add your own, and document answers, we empower you to take an active role in your health.",
  ],
  founderNoteTitle: "A Note from the Founder",
  founderNote: [
    '"I started Vaani after experiencing firsthand how difficult it can be to navigate complex medical diagnoses. Whether supporting a loved one or managing my own care, I realized that having the right questions makes all the difference."',
    '"I hope this tool helps you find your voice and get the answers you deserve."',
  ],
  founderName: "Shoba Rao",
  founderUrl: "https://shobarao.com/",
} as const;

export const FAQ_CONTENT = {
  navTitle: "FAQ",
  seoTitle: "FAQ — Vaani",
  seoDescription:
    "Frequently asked questions about Vaani, data privacy, and how to use the app.",
  title: "Frequently Asked Questions",
  introduction:
    "Everything you need to know about using Vaani for your next appointment.",
  items: [
    {
      id: "data-privacy",
      question: "Is my health data saved or shared?",
      answer:
        "No. Vaani does not require an account, and we do not store your personal health data on our servers. The questions you select and notes you take are saved locally on your own device. If you upload a lab report for AI analysis, it is processed securely and discarded immediately.",
    },
    {
      id: "medical-advice",
      question: "Does Vaani provide medical advice?",
      answer:
        "No. Vaani is a preparation tool designed to help you organize your thoughts and communicate effectively with your doctor. It does not provide diagnoses or medical advice. Always consult your healthcare provider for medical decisions.",
    },
    {
      id: "cost",
      question: "Is it free to use?",
      answer:
        "Yes, Vaani is completely free for patients to use. We want to ensure that everyone has access to the tools they need to prepare for their healthcare appointments.",
    },
    {
      id: "ai-generation",
      question: "How does the AI question generation work?",
      answer:
        "When you type a custom description or upload a lab report, we send that text or image securely to an AI service (like Google Gemini). The AI suggests relevant questions you might want to ask your doctor. This data is not used to train models or stored after the suggestions are returned.",
    },
    {
      id: "languages",
      question: "Can I use Vaani in other languages?",
      answer:
        "Yes! You can change the language using the globe icon in the top navigation. The checklist, AI suggestions, and voice dictation all adapt to your selected language.",
    },
  ],
} as const;