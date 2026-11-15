export const privacyPolicy = {
  operator: "Your Voice First",
  effectiveDate: "November 2026",
  contactUrl: "https://yourvoicefirst.org",
  description:
    "How Your Voice First handles Vaani's local preparation data, AI and voice features, usage analytics, feedback, and privacy requests.",
  notice:
    "This privacy policy provides general information and does not constitute legal advice.",
  sections: [
    {
      id: "overview",
      title: "Who we are and how Vaani works",
      paragraphs: [
        "Your Voice First operates Vaani, a doctor-visit preparation tool available as a mobile app and website. This policy applies to both.",
        "Vaani does not require an account to prepare for a visit. Saved preparation information is generally stored on your device or in your browser. Optional AI, report-analysis, and certain voice features send information you submit to our servers and service providers. We also collect usage events and optional survey responses as described below.",
        "We do not sell your personal information or display advertising. You do not need to provide a name, email address, or phone number to prepare for a visit. However, anything you type, upload, dictate, or include in feedback may contain personal or sensitive health information.",
      ],
    },
    {
      id: "local-storage",
      title: "Information stored on your device",
      paragraphs: [
        "Saved question checklists, personal questions, notes, and answer text are stored locally in the mobile app or your browser. Vaani does not routinely upload your entire saved preparation. Information you submit to an AI or transcription feature leaves your device as described in this policy.",
        "Reset / start fresh clears the preparation information covered by that feature. It does not delete analytics or survey records already sent to our servers, exported or shared files, or copies held in device backups.",
        "Device or operating-system backups may include local app information, depending on settings and backup configuration. Uninstalling the app or clearing browser storage does not necessarily remove backup copies or files you exported or shared. Temporary recordings and selected-file copies may remain in local cache until removed by the app or operating system.",
      ],
    },
    {
      id: "reports",
      title: "Lab reports and documents you choose to analyze",
      paragraphs: [
        "If you choose report analysis, the selected photo or PDF, relevant condition or context, and selected language are sent over HTTPS to Vaani's server and processed using Google Gemini to suggest questions for your doctor.",
        "Documents may contain sensitive health information and identifying details. Share only information you are comfortable having processed for this purpose, and remove unnecessary identifiers where practical.",
        "The report-analysis handler processes the submitted document to return suggestions; it does not intentionally save the document as a permanent application database record. This is separate from provider processing, technical logs, and the analytics described below.",
      ],
    },
    {
      id: "voice",
      title: "Voice dictation and recordings",
      paragraphs: [
        "The transcription method depends on the feature and platform. Device or browser speech-recognition services may process audio on the device or through their provider, depending on the service, language, and settings. Their handling of audio is governed by their own terms and privacy practices.",
        "When the mobile app uses its recording-based transcription fallback, the recording and selected language are sent over HTTPS to Vaani's server and then to Google Gemini to produce a transcript.",
        "Recordings made through the website's Doctor's answer feature are sent over HTTPS to Vaani's server and then to OpenAI's Whisper transcription service. The transcript is returned so you can review, edit, and use it in your preparation.",
        "Our transcription handlers process recordings in memory and do not intentionally save recordings or transcripts as permanent application database records. This does not mean audio never leaves your device or that hosting and transcription providers retain no data. We do not promise zero retention or particular model-training terms for every provider arrangement.",
        "Only record information you are permitted to record or share. Recording a clinician or another person may require their permission or consent under applicable law.",
      ],
    },
    {
      id: "ai",
      title: "AI questions and medical reference lookups",
      paragraphs: [
        "When you request suggested questions, Vaani sends the condition, custom topic or medication name, the description or context submitted for that request, and your selected language to its server and Google Gemini. Inputs containing health details are not anonymous merely because an account is not required.",
        "These handlers process inputs to return suggestions and do not intentionally create permanent application database records of free-text AI prompts. Analytics and survey records are stored separately as described below.",
        "Relevant topic or medication search terms may be sent to U.S. National Library of Medicine services, including MedlinePlus, RxNorm, and DailyMed, to find medical reference information. Opening an external source link causes your browser to communicate with that source under its own privacy practices.",
      ],
    },
    {
      id: "analytics",
      title: "Usage analytics and optional feedback",
      paragraphs: [
        "The mobile app automatically sends usage events to help us understand whether Vaani works well and which features are useful. It creates and locally stores a random device-scoped identifier so events from the same installation can be associated. This is not an advertising identifier, but it is still an identifier.",
        "Events can include language, timestamps, app openings, feature use, question-preparation activity, export method, and the identifier of a selected preset condition. A preset condition identifier can indicate health-related interests. The custom-condition selection event records the category custom rather than the typed topic text.",
        "The event stream is not intended to include the full text of saved notes, dictated answers, uploaded documents, or custom-topic inputs. Information submitted separately to an AI feature is handled as described above.",
        "If you choose the optional feedback survey, we store your response, optional free-text feedback, language, and the associated random device identifier. Avoid including unnecessary health details or identifying information in feedback.",
        "Analytics and survey records are stored in our backend database. Clearing local preparation or uninstalling the app does not automatically delete these server records. Website feature events may also be processed when website analytics integration is enabled.",
      ],
    },
    {
      id: "providers",
      title: "Service providers",
      paragraphs: [
        "We use service providers to operate Vaani and deliver the features described in this policy. Their processing is subject to the arrangements and terms applicable to those services.",
      ],
      items: [
        "Google Gemini: processes submitted inputs for question generation, report analysis, applicable audio transcription, and supported content translation.",
        "OpenAI: processes recordings and language information for the website's Doctor's answer transcription.",
        "Replit and our hosting/database infrastructure: support application hosting, request processing, backend storage, and managed service routing where configured. Infrastructure providers may process network addresses, timestamps, and error information for operation, security, and troubleshooting.",
        "Device/browser speech-recognition providers: may process audio when their speech services are used.",
        "U.S. National Library of Medicine services: receive relevant search terms for medical-source lookups.",
        "Umami: the website has an optional analytics integration that can receive feature events and associated usage information when enabled.",
      ],
    },
    {
      id: "retention",
      title: "Retention, backups, and deletion",
      paragraphs: [
        "Local preparation remains until removed through relevant app/browser controls, app-data removal, or the operating system, subject to backups and previously exported copies. Temporary request processing is distinct from persistent analytics and survey storage, technical logs, and provider retention.",
        "Analytics and survey records remain in the backend until removed; the current application does not automatically expire them on a published schedule. We do not promise a fixed deletion period for these records, logs, backups, or data handled by providers.",
        "You can contact Your Voice First about access, correction, or deletion. Depending on your location and applicable law, you may have rights concerning your personal information. We may need information sufficient to identify the relevant records and verify a request. Do not send unnecessary health details.",
        "There is currently no self-service server-data deletion or analytics opt-out control in Vaani. A local reset is not a server-data deletion request. We cannot identify every server record from a name or email address alone because Vaani does not require an account.",
      ],
    },
    {
      id: "choices",
      title: "Your choices, storage, and security",
      paragraphs: [
        "You can choose not to use voice input, report uploads, AI suggestions, or the optional survey. Microphone and camera permissions can be managed in device/browser settings. Automatic usage analytics are separate from these optional inputs.",
        "The website uses browser storage and the mobile app uses local app storage to retain preparation and settings. Local storage is not a promise of end-to-end encryption or exclusion from operating-system backups.",
        "Submitted requests use HTTPS in transit. No method of storage or transmission is completely secure. Information exported or shared outside Vaani is also subject to the handling of the destination you choose.",
      ],
    },
    {
      id: "medical",
      title: "Not medical advice",
      paragraphs: [
        "Vaani is an educational preparation tool. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional about your health.",
      ],
    },
    {
      id: "children",
      title: "Children",
      paragraphs: [
        "Vaani is intended for adults and is not directed at children under 13. We do not knowingly collect information from children. Contact Your Voice First if you believe a child has submitted personal information.",
      ],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      paragraphs: [
        "If we make material changes, we will update this page and the effective date above. Please review the policy periodically.",
      ],
    },
  ],
} satisfies {
  operator: string;
  effectiveDate: string;
  contactUrl: string;
  description: string;
  notice: string;
  sections: { id: string; title: string; paragraphs: string[]; items?: string[] }[];
};
