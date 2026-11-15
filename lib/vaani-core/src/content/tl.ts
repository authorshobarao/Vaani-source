import type { LanguageData } from "./types";
import { FEATURE_TRANSLATIONS } from "./feature-translations";

const tl: LanguageData = {
  "code": "tl",
  "label": "Filipino",
  "ui": {
    ...FEATURE_TRANSLATIONS.tl,
    "appTitle": "Vaani",
    "appSubtitle": "Hanapin ang iyong boses sa opisina ng doktor.",
    "heroHeading": "Maghanda para sa pagbisita sa doktor",
    "heroDescription": "Tinutulungan ka ng Vaani na ihanda ang mga tanong na itatanong — para umalis ka sa iyong appointment na may mga sagot, hindi pagsisisi.",
    "tip": "Tip: Markahan ang bawat tanong na gusto mong itanong — kahit na tila maliit lang ito. Naroon ang iyong doktor upang tumulong.",
    "conditionSelectLabel": "Ano ang gusto mong pag-usapan sa iyong doktor?",
    "conditionSelectPlaceholder": "— Pumili ng paksa —",
    "printButton": "I-print ang pahinang ito",
    "downloadButton": "I-download ang kopya",
    "savedLocallyNotice": "Naka-save lang sa device na ito — i-download ang kopya para hindi mawala.",
    "visitTypeLabel": "Ito ba ang iyong unang pagbisita o follow-up?",
    "visitTypeFirst": "Unang pagbisita",
    "visitTypeFollowup": "Follow-up na pagbisita",
    "followupCategory": {
      "id": "followup-visit",
      "title": "Mula noong huli kong pagbisita",
      "questions": [
        "Paano nagbago ang aking kondisyon mula noong huli kong pagbisita?",
        "Ano ang ipinakita ng aking pinakabagong test o resulta ng lab?",
        "Gumagana pa ba ang kasalukuyan kong mga gamot — may kailangan bang baguhin?",
        "Mayroon bang mga side effect na dapat kong patuloy na bantayan?",
        "Kailangan ba nating ayusin ang aking treatment plan?",
        "Ano ang dapat kong gawin o subaybayan bago ang susunod kong pagbisita?"
      ]
    },
    "uploadTitle": "Magdagdag ng mga tanong mula sa iyong lab o medical report",
    "uploadHint": "Mag-upload ng larawan o PDF ng iyong pinakabagong report. Ipapadala ito sa AI upang magmungkahi ng mga tanong, pagkatapos ay itatapon — hindi ito sine-save.",
    "uploadButton": "I-upload ang report",
    "uploadChooseAnother": "Pumili ng ibang file",
    "uploadAnalyzing": "Binabasa ang iyong report…",
    "uploadError": "Hindi mabasa ang file na iyan. Paki-subukan ang malinaw na larawan o PDF.",
    "uploadTooLarge": "Masyadong malaki ang file na iyan. Gumamit ng file na mas mababa sa 8 MB.",
    "resetButton": "I-reset / magsimulang muli",
    "resetConfirmText": "Burahin nito ang lahat ng iyong checks, notes, at custom questions.",
    "resetConfirmYes": "Oo, i-reset",
    "resetConfirmCancel": "Kanselahin",
    "notesLabel": "Ano ang sinabi ng aking doktor sa akin",
    "notesPlaceholder": "Sumulat ng mga tala dito sa panahon o pagkatapos ng iyong pagbisita…",
    "yourQuestionsTitle": "Iyong mga tanong",
    "yourQuestionsPlaceholder": "Magdagdag ng sarili mong tanong…",
    "yourQuestionsAdd": "Idagdag",
    "disclaimer": "Tinutulungan ka ng tool na ito na maghanda ng mga tanong — hindi ito medikal na payo. Laging sundin ang gabay ng iyong doktor.",
    "questionsSoonTitle": "Mga tanong na paparating",
    "questionsSoonDesc": "Idinaragdag ang mga pangkalahatang tanong para sa paksang ito. Gamitin ang kahon sa ibaba upang magdagdag ng sarili mong mga tanong ngayon.",
    "ckdStageLabel": "Ang aking CKD stage",
    "ckdStagePlaceholder": "— Pumili ng yugto —",
    "ckdStageOptional": "(opsyonal)",
    "ckdStageNotes": {
      "stage-1": "Yugto 1 (eGFR ≥ 90): May pinsala sa bato ngunit normal o mataas ang paggana nito. Nakatuon sa pagprotekta sa bato at paggamot sa sanhi.",
      "stage-2": "Yugto 2 (eGFR 60–89): Bahagyang pagbaba. Nakatuon sa pagpapabagal ng paglala.",
      "stage-3": "Yugto 3 (eGFR 30–59): Katamtamang pagbaba. Mahalaga ang pamamahala sa mga komplikasyon.",
      "stage-4": "Yugto 4 (eGFR 15–29): Malubhang pagbaba. Panahon na upang planuhin ang kidney replacement therapy.",
      "stage-5": "Yugto 5 (eGFR < 15): Kidney failure. Kadalasan, kailangan ang dialysis o transplant.",
      "not-sure": "Hindi sigurado sa iyong yugto? Tanungin ang iyong doktor para sa iyong eGFR number."
    },
    "transplantLabel": "Interesado ako o kasalukuyang sinusuri para sa kidney transplant.",
    "transplantSubLabel": "Nagdaragdag ito ng mga tanong na partikular sa transplant sa ibaba.",
    "cancerSubtypeLabel": "Anong uri ng kanser?",
    "cancerSubtypeOptional": "(opsyonal — nagdaragdag ng mga partikular na tanong)",
    "cancerSubtypePlaceholder": "— Pumili ng uri —",
    "aiPanelHeading": "Magdagdag ng mga tanong para sa aking sitwasyon",
    "aiPanelLabel": "Ilarawan ang iyong sitwasyon at mga sintomas sa sarili mong mga salita",
    "aiPanelPlaceholder": "Halimbawa: \"Ako ay 62, kamakailan lang na-diagnose na may {condition}, at gusto kong maunawaan ang aking mga opsyon sa paggamot.\"",
    "aiPanelButton": "Magmungkahi ng mga tanong para sa akin",
    "aiPanelLoading": "Nag-iisip…",
    "aiPanelDisclaimer": "Ang inyong inilarawan ay ligtas na ipinapadala sa aming server at pinoproseso ng isang AI service para makabuo ng mga mungkahi; hindi ito iniimbak. Ang mga tanong na iminungkahi ng AI ay panimula lamang sa pag-uusap — hindi po ito payong medikal.",
    "aiPanelError": "May nagkamali. Pakisubukang muli maya-maya.",
    "safetyNoticeTitle": "Kailangan ng tulong ngayon din?",
    "safetyNoticeLine988": "Kung ikaw ay nasa krisis o nag-iisip na saktan ang iyong sarili, karapat-dapat kang tulungan ngayon din. Sa US, tumawag o mag-text sa 988 (Suicide & Crisis Lifeline).",
    "safetyNoticeInternational": "Nag-iiba-iba ang mga mapagkukunan ng tulong sa krisis depende sa bansa — pakihanap ang crisis line para sa inyong rehiyon.",
    "permissionDeniedTitle": "Kailangan ng pahintulot",
    "permissionDeniedMessage": "Walang access ang Vaani. Paki-payagan ito sa Settings ng iyong device para magamit ang feature na ito.",
    "openSettings": "Buksan ang Settings",
    "languageLabel": "Wika",
    "aboutArticleLabel": "Basahin ang tungkol sa kondisyong ito:",
    "addTopicButton": "Idagdag ang iyong paksa kung wala dito sa itaas",
    "addTopicPlaceholder": "Ilagay ang iyong paksa (halimbawa: sakit ng tuhod)…",
    "addTopicSave": "Idagdag ang paksa",
    "sourcesTitle": "Mga Pinagmumulan at Sanggunian na Medikal",
    "sourcesIntro": "Ang mga tanong at impormasyon sa app na ito ay batay sa gabay mula sa mga pinagkakatiwalaang organisasyon ng kalusugan. I-tap ang isang pinagmulan para matuto pa:"
  },
  "conditions": [
    {
      "id": "diabetes",
      "label": "Diabetes",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Anong uri mayroon ako?",
            "Ano ang aking mga pangunahing numero (A1C, fasting glucose)?",
            "Ano ang aking target na A1C?",
            "Ito ba ay mapapamahalaan o maaaring baligtarin?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Anong gamot ang kailangan ko at paano ito gumagana?",
            "Kakailanganin ko ba ng insulin?",
            "Anong mga side effect ang dapat kong bantayan?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay",
          "questions": [
            "Gaano kadalas ko dapat suriin ang aking blood sugar?",
            "Dapat ba akong gumamit ng CGM?",
            "Kailan natin muling susuriin ang aking A1C?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Pamumuhay",
          "questions": [
            "Anong mga pagbabago sa diet ang pinakamakatulong?",
            "Gaano karaming ehersisyo ang inirerekomenda?",
            "Paano naaapektuhan ito ng aking timbang?"
          ]
        },
        {
          "id": "followup",
          "title": "Follow-up at mga komplikasyon",
          "questions": [
            "Paano naaapektuhan nito ang aking mga mata, bato, paa, at puso?",
            "Anong mga screening ang kailangan ko at kailan?",
            "Kailan ang aking susunod na appointment?"
          ]
        }
      ]
    },
    {
      "id": "high-blood-pressure",
      "label": "Altapresyon",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ano ang aking mga numero at ano ang aking target?",
            "Ano ang malamang na sanhi nito?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Aling gamot at bakit?",
            "Ano ang mga side effect?",
            "Maaari ba akong subukan muna ang pagbabago sa pamumuhay?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay",
          "questions": [
            "Dapat ba akong mag-check sa bahay, at gaano kadalas?",
            "Anong mga resulta ang dapat kong ikabahala?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Pamumuhay",
          "questions": [
            "Paano ang tungkol sa asin, alkohol, ehersisyo, timbang, at stress?"
          ]
        },
        {
          "id": "followup",
          "title": "Follow-up",
          "questions": [
            "Kailan natin muling titingnan?",
            "Anong mga organo ang nasa panganib kung hindi ito makokontrol?"
          ]
        }
      ]
    },
    {
      "id": "skin-rash",
      "label": "Pantal sa balat",
      "categories": [
        {
          "id": "what-is-it",
          "title": "Ano ito?",
          "questions": [
            "Ano ang malamang na sanhi nito?",
            "Nakakahawa ba ito o alerdyi?",
            "Kailangan ko ba ng test o biopsy?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Anong cream o gamot, at gaano katagal?",
            "Paano kung hindi ito mawala?"
          ]
        },
        {
          "id": "triggers",
          "title": "Mga trigger",
          "questions": [
            "Anong mga produkto, pagkain, o aktibidad ang dapat kong iwasan?"
          ]
        },
        {
          "id": "when-to-worry",
          "title": "Kailan dapat mag-alala",
          "questions": [
            "Anong mga senyales ang ibig sabihin na lumalala ito?",
            "Kailan ako dapat bumalik o pumunta sa ER?"
          ]
        }
      ]
    },
    {
      "id": "skin-bump-lump",
      "label": "Bukol sa balat",
      "categories": [
        {
          "id": "what-is-it",
          "title": "Ano ito?",
          "questions": [
            "Ano sa tingin niyo ito?",
            "Kailangan ba natin ng biopsy o imaging?",
            "Maaari ba itong cancer?"
          ]
        },
        {
          "id": "options",
          "title": "Mga Pagpipilian",
          "questions": [
            "Dapat ba itong alisin?",
            "Ano ang mga panganib ng pag-alis nito kumpara sa pagsubaybay lamang?"
          ]
        },
        {
          "id": "changes",
          "title": "Mga Pagbabago",
          "questions": [
            "Gaano kabilis ito maaaring magbago?",
            "Anong mga senyales ang ibig sabihin na kailangan kong bumalik kaagad?"
          ]
        },
        {
          "id": "followup",
          "title": "Follow-up",
          "questions": [
            "Kailan natin dapat itong muling suriin?"
          ]
        }
      ]
    },
    {
      "id": "cancer",
      "label": "Kanser",
      "categories": [
        {
          "id": "diagnosis",
          "title": "Diyagnosis",
          "questions": [
            "Anong uri at yugto ito?",
            "Anong mga pagsusuri ang nagpatunay nito?",
            "Nasaan ito, at kumalat na ba ito?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Mga Pagpipilian sa Paggamot",
          "questions": [
            "Ano ang LAHAT ng aking mga pagpipilian (operasyon, chemo, radiation, immunotherapy, targeted therapy, watchful waiting)?",
            "Ano ang inirerekomenda ninyo at bakit?",
            "Ang layunin ba ay gamutin ito o kontrolin lamang?"
          ]
        },
        {
          "id": "side-effects",
          "title": "Mga Side Effect",
          "questions": [
            "Ano ang mga side effect ng bawat opsyon?",
            "Maaapektuhan ba nito ang pagiging fertile?",
            "Mayroon bang pangmatagalang epekto?"
          ]
        },
        {
          "id": "logistics",
          "title": "Logistik",
          "questions": [
            "Gaano katagal ang paggamot?",
            "Paano nito maaapektuhan ang trabaho at pang-araw-araw na buhay?",
            "Paano ang tungkol sa gastos at insurance?",
            "Paano ako makakakuha ng pangalawang opinyon?"
          ]
        },
        {
          "id": "support",
          "title": "Suporta",
          "questions": [
            "Mayroon bang clinical trials?",
            "Maaari ba akong makakita ng palliative care para sa suporta sa sintomas?",
            "Mayroon bang support groups?",
            "Sino ang aking pangunahing contact person?"
          ]
        },
        {
          "id": "followup",
          "title": "Follow-up",
          "questions": [
            "Paano natin malalaman kung ito ay gumagana?",
            "Ano ang iskedyul ng scan?",
            "Ano ang mga senyales ng pagbalik ng sakit?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "breast",
          "label": "Dibdib",
          "categories": [
            {
              "id": "breast-specific",
              "title": "Kanser sa dibdib — mga partikular na tanong",
              "questions": [
                "Dapat ba akong magpa-genetic testing (BRCA1/BRCA2), at magbabago ba nito ang aking paggamot o ang screening ng aking pamilya?",
                "Ano ang aking hormone-receptor (ER/PR) at HER2 status, at ano ang ibig sabihin nito para sa akin?",
                "Ano ang aking mga opsyon sa operasyon (lumpectomy vs. mastectomy) at mga opsyon sa reconstruction?",
                "Kakailanganin ko ba ng chemo, radiation, o hormone therapy, at sa anong pagkakasunod-sunod?",
                "Paano makakaapekto ang paggamot sa fertility (kakayahang magkaanak), at mapreserba ko ba ang mga opsyon bago magsimula?"
              ]
            }
          ]
        },
        {
          "id": "lung",
          "label": "Baga",
          "categories": [
            {
              "id": "lung-specific",
              "title": "Kanser sa Baga — mga partikular na tanong",
              "questions": [
                "Sanhi ba ito ng paninigarilyo, at nagbabago ba ang paggamot dahil dito?",
                "Ano ang ipinapakita ng mutation testing ko?",
                "Angkop ba ako para sa operasyon?"
              ]
            }
          ]
        },
        {
          "id": "colorectal",
          "label": "Kolorektal",
          "categories": [
            {
              "id": "colorectal-specific",
              "title": "Kanser sa Kolorektal — mga partikular na tanong",
              "questions": [
                "Kailangan ko ba ng colostomy?",
                "Sinuri ba ang tumor para sa genetic markers?",
                "Paano naman ang iskedyul ng screening ng aking pamilya?"
              ]
            }
          ]
        },
        {
          "id": "prostate",
          "label": "Prostate",
          "categories": [
            {
              "id": "prostate-specific",
              "title": "Kanser sa Prostate — mga partikular na tanong",
              "questions": [
                "Ano ang aking Gleason score at PSA?",
                "Opsyon ba sa akin ang active surveillance?",
                "Paano makakaapekto ang paggamot sa pag-ihi at sexual function (kakayahang makipagtalik)?"
              ]
            }
          ]
        },
        {
          "id": "melanoma",
          "label": "Balat / Melanoma",
          "categories": [
            {
              "id": "melanoma-specific",
              "title": "Balat / Melanoma — mga partikular na tanong",
              "questions": [
                "Gaano ito kalalim?",
                "Kailangan bang suriin ang aking lymph nodes?",
                "Gaano kadalas ko dapat ipasuri ang aking balat ng buong katawan?"
              ]
            }
          ]
        },
        {
          "id": "cervical",
          "label": "Cervical",
          "categories": [
            {
              "id": "cervical-specific",
              "title": "Kanser sa Cervical — mga partikular na tanong",
              "questions": [
                "Anong stage (yugto) at HPV status?",
                "Paano makakaapekto ang paggamot sa fertility (kakayahang magkaanak)?",
                "Anong iskedyul ng follow-up na Pap/HPV ang dapat kong sundin?"
              ]
            }
          ]
        },
        {
          "id": "leukemia",
          "label": "Leukemia",
          "categories": [
            {
              "id": "leukemia-specific",
              "title": "Leukemia — mga partikular na tanong",
              "questions": [
                "Anong uri (acute o chronic)?",
                "Kailangan ko ba ng paggamot ngayon o pagsubaybay lang?",
                "Kailangan ko ba ng bone marrow transplant?"
              ]
            }
          ]
        },
        {
          "id": "lymphoma",
          "label": "Lymphoma",
          "categories": [
            {
              "id": "lymphoma-specific",
              "title": "Lymphoma — mga partikular na tanong",
              "questions": [
                "Hodgkin o non-Hodgkin, at anong subtype (uri)?",
                "Ano ang plano ng paggamot at timeline (takdang panahon)?",
                "Ano ang mga pangmatagalang epekto ng paggamot?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ckd",
      "label": "Chronic kidney disease (CKD)",
      "categories": [
        {
          "id": "diagnosis-stage",
          "title": "Ang aking diyagnosis (pagtukoy ng sakit) at stage (yugto)",
          "questions": [
            "Anong stage (yugto) na ako, at ano ang aking eGFR?",
            "Ano ang aking urine albumin (ACR)?",
            "Ano ang naging sanhi ng aking CKD?",
            "Malamang bang lumala ito, at gaano kabilis?"
          ]
        },
        {
          "id": "protecting-kidneys",
          "title": "Pagprotekta sa aking mga bato",
          "questions": [
            "Ano ang target kong blood pressure?",
            "Dapat ba akong uminom ng ACE inhibitor, ARB, o SGLT2 inhibitor?",
            "Anong mga gamot o supplements ang dapat kong iwasan (halimbawa, mga NSAID tulad ng ibuprofen)?",
            "Kung ako ay diabetic, ano ang target kong blood sugar?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Diyeta at lifestyle",
          "questions": [
            "Maaari ba akong magpakonsulta sa isang kidney dietitian?",
            "Gaano karaming protina, sodium, potassium, at phosphorus ang tama para sa akin?",
            "Mayroon bang anumang limitasyon sa likido na dapat kong sundin?",
            "Aling mga supplements ang ligtas?",
            "Paano ang ehersisyo?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay",
          "questions": [
            "Gaano kadalas natin susuriin ang aking mga labs at eGFR?",
            "Anong mga numero ang dapat kong subaybayan?",
            "Anong mga pagbabago ang ikababahala mo?"
          ]
        },
        {
          "id": "medications",
          "title": "Ang aking mga gamot",
          "questions": [
            "Mayroon ba sa aking kasalukuyang mga gamot na nangangailangan ng pagbabago sa dosis para sa aking mga bato?",
            "Dapat ba akong magsimula o huminto sa anumang bagay?"
          ]
        },
        {
          "id": "planning-ahead",
          "title": "Pagpaplano nang maaga",
          "questions": [
            "Sa anong punto tayo mag-uusap tungkol sa dialysis o transplant?",
            "Ano ang lahat ng aking mga pagpipilian (hemodialysis, peritoneal dialysis, transplant, conservative care)?",
            "Maaari ko bang iwasan ang dialysis sa pamamagitan ng maaga (\"pre-emptive\") na transplant?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Emosyonal at praktikal",
          "questions": [
            "Paano ito makakaapekto sa aking enerhiya at aking trabaho?",
            "Mayroon bang suporta para sa mental health na available?",
            "Mayroon bang support groups o kidney organizations na irerekomenda mo?",
            "Saan ako makakakuha ng tulong para sa insurance at mga gastusin?"
          ]
        },
        {
          "id": "red-flags",
          "title": "Mga senyales ng babala",
          "questions": [
            "Anong mga sintomas ang nangangahulugan na dapat kitang tawagan o pumunta sa ER?"
          ]
        }
      ],
      "extraCategories": [
        {
          "id": "transplant",
          "triggerLabel": "Interesado ako o kasalukuyang sinusuri para sa isang kidney transplant.",
          "categories": [
            {
              "id": "transplant-eval",
              "title": "Pagsusuri sa transplant",
              "questions": [
                "Ako ba ay isang kandidato para sa isang kidney transplant?",
                "Paano at kailan ako ire-refer sa isang transplant center?",
                "Maaari ba akong masuri bago ko kailanganin ang dialysis (isang pre-emptive transplant)?",
                "Ano ang pagkakaiba sa pagitan ng living donor at deceased donor para sa akin?",
                "Paano ako makakahanap ng living donor — at okay lang bang magtanong sa pamilya o mga kaibigan?",
                "Anong mga pagsusuri ang kasama sa pagsusuri, at gaano katagal ang buong proseso?",
                "Ano ang maaaring maging dahilan para hindi ako maging karapat-dapat, at mayroon ba sa mga ito na kaya kong ayusin o pagbutihin?",
                "Maaari na ba nating simulan ang proseso ng pagsusuri ngayon?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "thyroid",
      "label": "Kondisyon ng Thyroid",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa Dito",
          "questions": [
            "Masigla ba ang aking thyroid o mahina?",
            "Ano ang mga antas ng aking TSH, T3, at T4?",
            "Ano ang sanhi nito (halimbawa, Hashimoto's o Graves')?",
            "Ito ba ay permanente?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Anong gamot ang kailangan ko, at sa anong dosis?",
            "Gaano katagal bago bumuti ang pakiramdam ko?",
            "Paano kung hindi pa rin maganda ang pakiramdam ko pagkatapos simulan ang gamot?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay",
          "questions": [
            "Gaano kadalas nating susuriin muli ang aking mga antas?",
            "Anong mga sintomas ang nangangahulugang mali ang aking dosis?"
          ]
        },
        {
          "id": "daily-life",
          "title": "Araw-araw na Pamumuhay",
          "questions": [
            "Paano ko dapat inumin ang aking gamot (oras, pagkain, ibang gamot)?",
            "Naaapektuhan ba nito ang aking timbang, enerhiya, mood, buhok, o regla?",
            "Naaapektuhan ba nito ang pagbubuntis o fertility?"
          ]
        },
        {
          "id": "followup",
          "title": "Follow-up",
          "questions": [
            "Kailan ang susunod kong pagsusuri ng dugo at pagbisita?"
          ]
        }
      ]
    },
    {
      "id": "pcos-gyn",
      "label": "PCOS / Ginekologikal",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa Dito",
          "questions": [
            "Ano ang sanhi ng aking mga sintomas?",
            "Anong mga pagsusuri ang nagpapatunay nito (hormones, ultrasound)?"
          ]
        },
        {
          "id": "symptoms-treatment",
          "title": "Mga Sintomas at Paggamot",
          "questions": [
            "Ano ang aking mga opsyon para sa irregular na regla, acne, o hindi gustong buhok?",
            "Kailangan ko ba ng birth control, metformin, o iba pa?",
            "Ano ang mga side effect?"
          ]
        },
        {
          "id": "fertility",
          "title": "Fertility",
          "questions": [
            "Paano nito naaapektuhan ang aking kakayahang magbuntis?",
            "Ano ang makakatulong kung gusto kong magbuntis — ngayon o sa huli?"
          ]
        },
        {
          "id": "long-term-health",
          "title": "Pangmatagalang Kalusugan",
          "questions": [
            "Ano ang aking panganib para sa diabetes, problema sa puso, o iba pang problema, at paano natin ito babantayan?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Pamumuhay",
          "questions": [
            "Nakakatulong ba ang pagbabago sa diyeta, timbang, o ehersisyo, at gaano kalaki?"
          ]
        },
        {
          "id": "general-gyn",
          "title": "Pangkalahatang Pagbisita sa Gynecologist",
          "questions": [
            "Kailangan ko ba ng Pap smear o HPV test, at kailan?",
            "Normal ba ang pagdurugo / sakit / discharge na ito?",
            "Kailan ako dapat bumalik?"
          ]
        },
        {
          "id": "followup",
          "title": "Pagsubaybay at pangalawang opinyon",
          "questions": [
            "Kailan po tayo muling magpapa-check?",
            "Paano po ako makakakuha ng referral kung gusto ko?"
          ]
        }
      ]
    },
    {
      "id": "mental-health",
      "label": "Kalusugan ng isip (depresyon / pagkabahala)",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ano po sa tingin ninyo ang nangyayari?",
            "Mayroon po bang anumang pisikal (tulad ng thyroid, bitamina, tulog, gamot) na nakakaapekto dito?"
          ]
        },
        {
          "id": "options",
          "title": "Mga Pagpipilian",
          "questions": [
            "Ano po ang mga pagpipilian ko sa paggamot — therapy, gamot, o pareho?",
            "Ano po ang irerekomenda ninyo at bakit?",
            "Gaano po katagal bago ko maramdaman ang pagbabago?"
          ]
        },
        {
          "id": "medication",
          "title": "Gamot",
          "questions": [
            "Ano po ang mga side effect?",
            "Naka-aadik po ba ito?",
            "Paano po kung hindi gumana ang una?",
            "Paano at kailan ko po ito pwedeng itigil nang ligtas?"
          ]
        },
        {
          "id": "therapy-support",
          "title": "Therapy at suporta",
          "questions": [
            "Anong klaseng therapy po ang angkop sa akin, at paano ako makakahanap ng therapist?",
            "Mayroon po bang mga support group o mga opsyon na abot-kaya?"
          ]
        },
        {
          "id": "daily-followup",
          "title": "Araw-araw na buhay at pagsubaybay",
          "questions": [
            "Ano po ang pwede kong gawin araw-araw?",
            "Kailan po tayo muling magkikita?",
            "Sino po ang kokontakin ko kung lumala ang aking kalagayan bago pa man?"
          ]
        }
      ]
    },
    {
      "id": "liver-disease",
      "label": "Sakit sa Atay",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Anong uri po ng sakit sa atay ang mayroon ako — fatty liver, hepatitis, cirrhosis, o iba pa?",
            "Ano po ang dahilan nito, at magagamot po ba ang dahilan?",
            "Anong stage o antas po ng pinsala ang aking atay?",
            "Gumagana pa po ba nang normal ang aking atay ngayon?",
            "Pwede pa po bang bumuti ito, o malamang na lumala sa paglipas ng panahon?",
            "Dapat po ba akong magpatingin sa isang liver specialist (hepatologist)?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot at mga gamot",
          "questions": [
            "Kailangan ko po ba ng gamot, at ano po ang mga side effect?",
            "Mayroon po bang mga paggamot na pwedeng magpabagal o magpabalik ng pinsala?",
            "Kailangan ko po ba ng anumang procedure, tulad ng liver biopsy o endoscopy?",
            "Mayroon po bang clinical trials o mas bagong paggamot na dapat kong malaman?",
            "Kung lumala po ang aking atay, ano po ang mga pagpipilian ko — kasama ang transplant?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Pamumuhay at Diyeta",
          "questions": [
            "Dapat ko po bang tuluyang ihinto ang pag-inom ng alak?",
            "Mayroon po bang mga pagkain na dapat kong kainin nang mas marami, o iwasan?",
            "Makakatulong ba ang pagbaba ng timbang sa aking atay, at gaano kalaki ang maitutulong nito?",
            "Ligtas ba ang pag-inom ng Tylenol, ibuprofen, o iba pang gamot sa sakit na nabibili nang walang reseta?",
            "Aling mga bitamina o suplemento ang ligtas — at alin ang dapat kong iwasan?",
            "Ligtas at makakatulong ba sa akin ang pag-eehersisyo sa ngayon?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay at mga pagsusuri",
          "questions": [
            "Anong mga pagsusuri sa dugo ang kailangan ko at gaano kadalas?",
            "Kailangan ko ba ng imaging tulad ng ultrasound, CT scan, o MRI, at gaano kadalas?",
            "Dapat ba akong magpa-screen para sa liver cancer?",
            "Paano natin malalaman kung bumubuti o lumalala ang aking kondisyon?",
            "Mayroon bang mga bakuna na dapat kong kunin upang protektahan ang aking atay (hepatitis A, hepatitis B)?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Mga babalang senyales",
          "questions": [
            "Anong mga sintomas ang dapat magtulak sa akin na pumunta agad sa emergency room?",
            "Ano ang dapat kong bantayan sa bahay at agad na iulat sa iyo?",
            "Kung lumobo ang aking tiyan o naninilaw ang aking balat, ano ang dapat kong gawin?",
            "Dapat bang suriin ang aking mga kapamilya — mayroon ba sa mga ito na namamana o nakakahawa?"
          ]
        }
      ]
    },
    {
      "id": "heart-disease",
      "label": "Sakit sa Puso / Cardiovascular",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Anong uri ng sakit sa puso ang eksakto kong iniinda?",
            "Gaano ito kalubha, at ano ang ibig sabihin nito para sa aking pang-araw-araw na buhay?",
            "Ano ang sanhi nito — genetika, pamumuhay, o iba pa?",
            "Gaano kahusay ang pagbomba ng aking puso ngayon (ejection fraction o iba pang sukat)?",
            "Dapat ba akong magpatingin sa isang cardiologist o espesyalista sa puso?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot at mga gamot",
          "questions": [
            "Anong mga gamot ang kailangan ko, at ano ang mga side effect nito?",
            "Kailangan ko ba ng pamamaraan — tulad ng stent, bypass surgery, o pacemaker?",
            "Paano ko malalaman kung gumagana ang aking mga gamot?",
            "Ano ang mangyayari kung makaligtaan ko ang isang dosis ng aking gamot sa puso?",
            "Mayroon bang clinical trials o mas bagong paggamot na dapat kong malaman?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Pamumuhay at diyeta",
          "questions": [
            "Anong mga pagbabago sa diyeta ang pinakamakakatulong sa aking puso?",
            "Gaano karaming asin at alak ang ligtas?",
            "Gaano karaming ehersisyo ang ligtas para sa akin, at anong uri?",
            "Paano nakakaapekto ang stress sa aking puso, at ano ang maaari kong gawin dito?",
            "Dapat ba akong huminto sa paninigarilyo, at anong tulong ang magagamit?",
            "Ligtas ba ang maging sexually active?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay at mga pagsusuri",
          "questions": [
            "Anong mga pagsusuri ang kailangan ko — EKG, echocardiogram, stress test — at gaano kadalas?",
            "Anong mga numero ang dapat kong subaybayan sa bahay (presyon ng dugo, tibok ng puso, timbang)?",
            "Ano ang aking target na cholesterol, presyon ng dugo, at tibok ng puso?",
            "Paano natin malalaman kung bumubuti o lumalala ang aking kondisyon?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Mga senyales ng babala",
          "questions": [
            "Anong mga sintomas ang ibig sabihin na kailangan kong tawagan agad ang 911?",
            "Anong mga senyales ang dapat kong bantayan at agad na ipagbigay-alam sa inyo?",
            "Ano ang dapat kong gawin kung nakakaramdam ako ng pananakit o pressure sa dibdib?",
            "Mayroon ba sa pamilya ko na dapat masuri para sa sakit sa puso?"
          ]
        }
      ]
    },
    {
      "id": "joint-pain-arthritis",
      "label": "Pananakit ng Kasu-kasuan / Arthritis",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa Dito",
          "questions": [
            "Anong uri ng arthritis ang mayroon ako — osteoarthritis, rheumatoid, psoriatic, gout, o iba pa?",
            "Ano ang sanhi ng pinsala sa kasu-kasuan sa kaso ko?",
            "Aling mga kasu-kasuan ang apektado ngayon, at posible bang kumalat ito?",
            "Paano ko malalaman kung lumalala ang pinsala sa aking kasu-kasuan sa paglipas ng panahon?",
            "Dapat ba akong kumonsulta sa rheumatologist o orthopedic specialist?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot at Gamot",
          "questions": [
            "Anong mga gamot ang kailangan ko — NSAIDs, steroids, DMARDs, o biologics?",
            "Ano ang mga side effect, at gaano katagal ko kailangan itong inumin?",
            "Inirerekomenda ba ang physical therapy o occupational therapy para sa akin?",
            "Makakatulong ba ang joint injection, at gaano kadalas ako pwedeng magkaroon nito?",
            "Sa anong punto isasalang-alang ang operasyon o pagpapalit ng kasu-kasuan?"
          ]
        },
        {
          "id": "flares",
          "title": "Pamamahala sa mga Paglala at Pananakit",
          "questions": [
            "Ano ang magagawa ko sa bahay kapag lumala ang aking mga kasu-kasuan?",
            "Mas mainam ba ang init o yelo para sa aking pananakit?",
            "Mayroon bang mga brace, splint, o assistive device na makakatulong?",
            "Anong mga aktibidad ang dapat kong iwasan upang maprotektahan ang aking mga kasu-kasuan?",
            "Kailan dapat akong tumawag sa inyo dahil sa paglala ng sintomas, sa halip na pamahalaan lang ito sa bahay?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Pamumuhay at Diyeta",
          "questions": [
            "Mayroon bang mga pagkain na nagpapababa ng pamamaga — o mga pagkaing nagpapalala nito?",
            "Gaano karaming ehersisyo ang ligtas, at anong uri ang pinakamainam para sa aking mga kasu-kasuan?",
            "Makakatulong ba ang pagbaba ng timbang upang mabawasan ang pananakit ng aking kasu-kasuan, at gaano karami?",
            "Mayroon bang anumang supplement na makakatulong — tulad ng fish oil, turmeric, o glucosamine?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay at mga Pagsusuri",
          "questions": [
            "Anong mga blood test o imaging ang kailangan ko at gaano kadalas?",
            "Paano natin susukatin kung epektibo ang aking paggamot?",
            "Anong mga side effect mula sa aking gamot ang dapat kong bantayan at ipagbigay-alam?",
            "Gaano kadalas ako dapat magpatingin para sa check-up?"
          ]
        }
      ]
    },
    {
      "id": "asthma",
      "label": "Hika",
      "subtypeLabel": "Anong uri ng hika?",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa Dito",
          "questions": [
            "Anong uri ng hika ang mayroon ako?",
            "Ano ang nagti-trigger sa aking hika?",
            "Ang aking hika ba ay mild, moderate, o severe?",
            "Nako-kontrol ba nang maayos ang aking hika ngayon?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot at inhaler",
          "questions": [
            "Ano ang pagkakaiba ng aking controller inhaler at rescue inhaler?",
            "Puwede mo bang tingnan kung paano ko ginagamit ang aking inhaler para masuri ang tamang paggamit ko?",
            "Gaano kadalas ko ligtas gamitin ang aking rescue inhaler?",
            "Kailangan ko ba ng spacer, at anong mga side effect ang dapat kong asahan?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay at plano ng aksyon",
          "questions": [
            "Dapat ko bang i-subaybay ang aking peak flow sa bahay?",
            "Paano ko malalaman kung lumalala ang aking hika?",
            "Kailan ko dapat gamitin ang aking action plan, tawagan ka, o pumunta sa ER?",
            "Gaano kadalas ako dapat magpa-check-up?"
          ]
        },
        {
          "id": "triggers-lifestyle",
          "title": "Mga nagti-trigger at pang-araw-araw na buhay",
          "questions": [
            "Paano ko mababawasan ang mga nagti-trigger sa bahay at sa trabaho?",
            "Ligtas ba ang pag-eehersisyo, at paano ko maiiwasan ang mga atake?",
            "Anong mga bakuna ang kailangan ko (flu, pneumonia, COVID)?",
            "Nakakaapekto ba ang paninigarilyo o vaping sa aking hika?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "allergic",
          "label": "Allergic (extrinsic)",
          "categories": [
            {
              "id": "allergic-specific",
              "title": "Allergic asthma — mga partikular na tanong",
              "questions": [
                "Dapat ba akong magpa-allergy testing?",
                "Makakatulong ba sa akin ang mga gamot sa allergy o immunotherapy?",
                "Aling mga allergen ang dapat kong iwasan nang husto?"
              ]
            }
          ]
        },
        {
          "id": "non-allergic",
          "label": "Non-allergic (intrinsic)",
          "categories": [
            {
              "id": "non-allergic-specific",
              "title": "Non-allergic asthma — mga partikular na tanong",
              "questions": [
                "Ano ang nagti-trigger sa aking hika kung hindi ito dahil sa allergy?",
                "Puwede bang mag-trigger ng mga atake ko ang impeksyon, malamig na hangin, o stress?",
                "Ano ang magagawa ko tungkol sa mga non-allergic na nagti-trigger?"
              ]
            }
          ]
        },
        {
          "id": "exercise-induced",
          "label": "Exercise-induced",
          "categories": [
            {
              "id": "exercise-specific",
              "title": "Exercise-induced asthma — mga partikular na tanong",
              "questions": [
                "Ano ang dapat kong gawin bago mag-ehersisyo para maiwasan ang mga sintomas?",
                "Dapat ko bang gamitin ang aking inhaler bago mag-ehersisyo?",
                "Aling sports o aktibidad ang pinakaligtas para sa akin?"
              ]
            }
          ]
        },
        {
          "id": "cough-variant",
          "label": "Cough-variant",
          "categories": [
            {
              "id": "cough-specific",
              "title": "Cough-variant asthma — mga partikular na tanong",
              "questions": [
                "Puwede bang hika ang dahilan ng aking matagal nang ubo?",
                "Anong paggamot ang nakakatulong sa cough-variant asthma?",
                "Gaano katagal bago bumuti ang ubo?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "sciatica",
      "label": "Sciatica / Pananakit ng ugat",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ano ang sanhi ng aking sciatica?",
            "Aling ugat o disc ang apektado?",
            "Kaya ba itong gumaling nang kusa?",
            "Gaano katagal karaniwang inaabot ang paggaling?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Ano ang puwede kong gawin sa bahay para maibsan ang sakit?",
            "Anong mga gamot sa sakit ang ligtas para sa akin, at hanggang kailan ko ito puwedeng inumin?",
            "Makakatulong ba ang physical therapy?",
            "Kailangan ko ba ng iniksyon o operasyon — at kung operasyon, ano ang porsyento ng tagumpay nito?"
          ]
        },
        {
          "id": "activity",
          "title": "Aktibidad at paggaling",
          "questions": [
            "Anong mga galaw o posisyon ang dapat kong iwasan?",
            "Mas maganda bang magpahinga o manatiling aktibo?",
            "May mga stretches o ehersisyo ba na makakatulong?",
            "Kailan ako puwedeng bumalik sa trabaho o sa normal na aktibidad?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Mga babala at pagsusuri",
          "questions": [
            "Anong mga sintomas ang ibig sabihin na dapat kitang tawagan kaagad?",
            "Ang pamamanhid, panghihina, o pagkawala ng kontrol sa pantog ba ay isang emergency?",
            "Anong mga imaging o pagsusuri ang kailangan ko?"
          ]
        }
      ]
    },
    {
      "id": "psoriasis-eczema",
      "label": "Psoriasis / Eczema",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ito ba ay psoriasis, eczema, o iba pa?",
            "Ano ang nagti-trigger sa aking mga flare-up?",
            "Panghabambuhay ba itong kondisyon?",
            "Nakakahawa ba ito?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Anong mga cream o ointment ang dapat kong gamitin, at paano?",
            "Mayroon bang mas malalakas na gamot (light therapy, tableta, biologics) para sa akin?",
            "Gaano katagal bago ko makita ang pagganda?",
            "Anong mga side effect ang dapat kong asahan mula sa aking paggamot?"
          ]
        },
        {
          "id": "daily-care",
          "title": "Pang-araw-araw na pangangalaga sa balat",
          "questions": [
            "Anong skincare routine at produkto ang irerekomenda niyo?",
            "Anong mga sabon, tela, o pagkain ang dapat kong iwasan?",
            "Paano ko aalagaan ang aking balat sa panahon ng flare?",
            "Paano ko mababawasan ang pangangati?"
          ]
        },
        {
          "id": "broader-health",
          "title": "Pangkalahatang kalusugan",
          "questions": [
            "Konektado ba ang kondisyon ng aking balat sa iba pang bagay (kasukasuan, puso, pakiramdam)?",
            "Dapat ba akong kumunsulta sa isang espesyalista?",
            "Paano natin susubaybayan kung umepekto ang paggamot?"
          ]
        }
      ]
    },
    {
      "id": "gerd",
      "label": "Acid reflux / GERD",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ano ang sanhi ng aking acid reflux?",
            "GERD ba ito, at maaari ba nitong saktan ang aking esophagus?",
            "Kailangan ko ba ng anumang pagsusuri, tulad ng endoscopy?",
            "Ito po ba ay pangmatagalang kondisyon?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Aling gamot po ang tama para sa akin, at gaano katagal ko po ito dapat inumin?",
            "May panganib po ba sa pag-inom ng acid-reducers nang pangmatagalan?",
            "Ano po ang puwede kong gawin kung hindi sapat ang gamot?",
            "Kung iminungkahi ang operasyon, ano po ang porsyento ng tagumpay nito at ano po ang mga panganib?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Diet at lifestyle",
          "questions": [
            "Anong mga pagkain at inumin po ang dapat kong iwasan?",
            "Paano po nakakaapekto ang oras ng pagkain at laki ng servings sa reflux?",
            "Makakatulong po ba ang pagbaba ng timbang o pagtaas ng ulunan ng aking kama?",
            "Lalo po ba itong lumalala dahil sa paninigarilyo o alak?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Mga senyales ng babala",
          "questions": [
            "Anong mga sintomas po ang nangangahulugang kailangan kong makita agad (hirap lumunok, pagbaba ng timbang, pagsusuka ng dugo)?",
            "Puwede po bang iba ang dahilan ng aking mga sintomas, bukod sa reflux?",
            "Gaano po kadalas ako dapat magpa-follow up?"
          ]
        }
      ]
    },
    {
      "id": "infertility",
      "label": "Infertility / Sinusubukang magbuntis",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Anong mga pagsusuri po ang kailangan naming dalawa para malaman ang sanhi?",
            "Ano po ang maaaring nagpapahirap sa pagbubuntis?",
            "Paano po nakakaapekto ang aking edad at kalusugan sa aming pagkakataon?",
            "Gaano po katagal kami dapat magpatuloy sa pagsubok bago magkaroon ng mas maraming pagsusuri?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Mga opsyon sa paggamot",
          "questions": [
            "Ano po ang aming mga opsyon, mula sa pinakasimple hanggang sa pinaka-advanced?",
            "Ano po ang porsyento ng tagumpay para sa tulad namin?",
            "Magkano po ang bawat opsyon, at mayroon po bang sakop nito?",
            "Ano po ang mga panganib at side effects ng bawat paggamot?"
          ]
        },
        {
          "id": "process",
          "title": "Ang proseso",
          "questions": [
            "Gaano po katagal ang bawat hakbang?",
            "Ilang cycles o pagtatangka po ang karaniwan bago baguhin ang plano?",
            "Anong mga pagbabago sa lifestyle po ang makapagpapabuti sa aming pagkakataon?",
            "Dapat po ba kaming kumonsulta sa isang fertility specialist?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Emosyonal at praktikal",
          "questions": [
            "Anong suporta po ang available para sa stress ng prosesong ito?",
            "Ano po ang aming mga opsyon kung hindi gumana ang paggamot?",
            "Paano po namin pagpapasyahan kung kailan hihinto o babaguhin ang mga plano?"
          ]
        }
      ]
    },
    {
      "id": "multiple-sclerosis",
      "label": "Multiple sclerosis (MS)",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Anong uri po ng MS ang mayroon ako?",
            "Ano po ang ipinapakita ng aking MRI at mga resulta ng pagsusuri?",
            "Paano po kaya ako maaapektuhan nito sa paglipas ng panahon?",
            "Ano po ang pagkakaiba ng relapse at progression?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Aling gamot po ang pinakamainam para sa akin, at bakit po?",
            "Ano po ang mga benepisyo at panganib ng paggamot na ito?",
            "Paano po ginagamot ang relapse?",
            "Ano po ang mga side effects na dapat kong asahan, at paano po natin malalaman kung umepekto ito?"
          ]
        },
        {
          "id": "symptoms-daily",
          "title": "Mga Sintomas at Araw-araw na Buhay",
          "questions": [
            "Paano ko po mapamahalaan ang pagod, sakit, o iba pang sintomas?",
            "Makakatulong po ba ang physical o occupational therapy?",
            "Paano po nakakaapekto ang init, stress, o impeksyon sa aking MS?",
            "Ano po ang puwede kong gawin para manatiling aktibo hangga't maaari?"
          ]
        },
        {
          "id": "planning-monitoring",
          "title": "Pagpaplano at Pagsubaybay",
          "questions": [
            "Gaano po kadalas ako mangangailangan ng MRI o check-up?",
            "Anong mga sintomas po ang dapat kong ikonsulta agad sa inyo?",
            "Paano po kaya makaaapekto ang MS sa trabaho, pagmamaneho, o family planning?",
            "Ano po ang mga support services na available para sa akin?"
          ]
        }
      ]
    },
    {
      "id": "insomnia",
      "label": "Insomnia / Problema sa Pagtulog",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ano po kaya ang sanhi ng aking problema sa pagtulog?",
            "Mayroon po kaya akong health condition o gamot na nagpapanatili sa akin na gising?",
            "Kailangan ko po ba ng sleep study?",
            "Gaano po karaming tulog ang dapat kong hangarin?"
          ]
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Anong mga pagbabago po ang puwede kong subukan bago maggamot?",
            "Puwede po ba ang cognitive behavioral therapy for insomnia (CBT-I) bilang opsyon?",
            "Kung kailangan ko po ng gamot sa pagtulog, ano po ang mga panganib at side effects nito, at gaano ko po ito katagal dapat inumin?",
            "Ligtas po ba para sa akin ang mga over-the-counter na pantulong sa pagtulog?"
          ]
        },
        {
          "id": "habits",
          "title": "Mga Gawi at Rutina",
          "questions": [
            "Anong mga pang-araw-araw na gawi ang nakakatulong o nakakasama sa aking pagtulog?",
            "Paano po nakakaapekto ang caffeine, alcohol, at screens sa aking pagtulog?",
            "Ano po ang dapat na hitsura ng isang magandang bedtime routine?",
            "Okay po ba ang pag-idlip?"
          ]
        },
        {
          "id": "followup",
          "title": "Follow-up",
          "questions": [
            "Paano po natin susukatin kung bumubuti ang aking pagtulog?",
            "Dapat po ba akong magtago ng sleep diary?",
            "Kailan po ako dapat mag-follow up?"
          ]
        }
      ]
    },
    {
      "id": "uti",
      "label": "Impeksyon sa Daluyan ng Ihi (UTI)",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Impeksyon ba ito sa pantog o posibleng may kinalaman din sa aking mga bato (kidneys)?",
            "Ano ang sanhi ng impeksyong ito?",
            "Bakit ako patuloy na nagkakaroon ng (UTI)?",
            "Kailangan ko ba ng pagsusuri ng ihi (urine culture) o iba pang pagsusuri?",
          ],
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Anong (antibiotic) ang ibibigay sa akin, at sa loob ng ilang araw?",
            "Paano kung hindi bumuti ang aking mga sintomas sa loob ng ilang araw?",
            "Anong mga (side effects) ang dapat kong bantayan?",
            "Mayroon bang anumang gamot na puwede kong inumin para sa hapdi o sakit?",
          ],
        },
        {
          "id": "prevention",
          "title": "Pag-iwas",
          "questions": [
            "Paano ko maiiwasan ang pagkakaroon ng (UTI) sa hinaharap?",
            "Nakakatulong ba talaga ang (cranberry juice) o (supplement)?",
            "Gaano karaming tubig ang dapat kong inumin araw-araw?",
            "Mayroon ba akong mga gawi sa kalinisan na dapat baguhin?",
          ],
        },
        {
          "id": "warning",
          "title": "Kailan Dapat Mag-alala",
          "questions": [
            "Anong mga sintomas ang nangangahulugang lumalala ang impeksyon?",
            "Kailan ko dapat puntahan ang (urgent care) o (ER)?",
            "Maaari bang indikasyon ng impeksyon sa bato (kidney infection) ang lagnat o pananakit ng likod?",
          ],
        },
      ],
    },
    {
      "id": "urinary-incontinence",
      "label": "Pagtagas ng Ihi (Urinary Incontinence)",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Anong uri ng (incontinence) mayroon ako — (stress), (urge), o (mixed)?",
            "Ano ang sanhi ng aking pagtagas ng ihi?",
            "Maaari bang pinapalala ito ng aking mga gamot?",
            "Kailangan ko ba ng anumang pagsusuri, tulad ng (bladder function test)?",
          ],
        },
        {
          "id": "treatment",
          "title": "Mga Opsyon sa Paggamot",
          "questions": [
            "Makatutulong ba sa akin ang (pelvic floor) (Kegel) exercises — at paano ko ito gagawin nang tama?",
            "Makakatulong ba ang (bladder training) o nakatakdang pagpunta sa banyo?",
            "Mayroon bang mga gamot para dito, at ano ang mga (side effects)?",
            "Kailan isasaalang-alang ang (surgery) o isang (procedure)?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Araw-araw na Buhay",
          "questions": [
            "Dapat ko bang baguhin kung gaano karami o kailan ako umiinom ng likido?",
            "Pinapalala ba ito ng (caffeine) o alak?",
            "Anong mga produkto o proteksyon ang inirerekomenda ninyo?",
            "Maaari bang mapabuti ng pagbaba ng timbang ang aking mga sintomas?",
          ],
        },
        {
          "id": "referral",
          "title": "Mga Dalubhasa",
          "questions": [
            "Dapat ba akong kumonsulta sa isang (urologist) o (urogynecologist)?",
            "Ang isang (pelvic floor physical therapist) ba ay isang opsyon para sa akin?",
          ],
        },
      ],
    },
    {
      "id": "blood-in-urine",
      "label": "Dugo sa Ihi",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ano po ba ang mga posibleng dahilan ng dugo sa ihi ko?",
            "Galing po ba ito sa impeksyon, bato sa bato, o may mas seryosong dahilan?",
            "Ang gamot po ba o pagkain ang nagdulot ng pagbabago ng kulay?",
            "Ang dami po ba ng dugo ay may kinalaman sa kung gaano ito kaseryoso?",
          ],
        },
        {
          "id": "tests",
          "title": "Mga Pagsusuri",
          "questions": [
            "Anong mga pagsusuri po ba ang kailangan ko — pagsusuri ng ihi, imaging, o pagsilip sa pantog (cystoscopy)?",
            "Ano po ang malalaman natin sa bawat pagsusuri?",
            "Gaano po kabilis dapat gawin ang mga pagsusuring ito?",
            "Susuriin niyo rin po ba ang function ng kidney ko?",
          ],
        },
        {
          "id": "nextsteps",
          "title": "Mga Susunod na Hakbang",
          "questions": [
            "Ano po ang dapat kong gawin kung makakita ulit ako ng dugo bago ang aking mga pagsusuri?",
            "Kailangan ko po ba magpatingin sa urologist o kidney specialist?",
            "Anong mga sintomas po ang nangangahulugang dapat akong magpatingin agad?",
            "Kailan po natin malalaman ang sagot tungkol sa sanhi?",
          ],
        },
      ],
    },
    {
      "id": "migraine",
      "label": "Migraine",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Ang mga pananakit po ba ng ulo ko ay migraine talaga, o iba pang uri ng sakit ng ulo?",
            "Ano po ba ang mga posibleng nagti-trigger nito?",
            "Dapat po ba akong magtala ng mga sakit ng ulo ko — ano po ang dapat kong ilagay dito?",
            "Kailangan ko po ba ng brain scan o iba pang pagsusuri?",
          ],
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Ano po ang dapat kong inumin kapag nagsimula ang migraine, at gaano kabilis?",
            "Angkop po ba ako para sa preventive na gamot?",
            "Paano po ang mga bagong gamot sa migraine (CGRP blockers) — makakatulong po ba ito sa akin?",
            "Maaari po ba akong sobrahan sa paggamit ng pain relievers — ano po ba ang rebound headache?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Mga Trigger at Pamumuhay",
          "questions": [
            "Ang ilang pagkain po ba, pagbabago sa pagtulog, o stress ang sanhi ng aking mga atake?",
            "May papel po ba ang mga hormones ko dito?",
            "Anong mga pagbabago po sa routine ko ang makakabawas sa mga atake?",
          ],
        },
        {
          "id": "warning",
          "title": "Kailan Dapat Mag-alala",
          "questions": [
            "Anong mga sintomas po ng sakit ng ulo ang 'red flags' na nangangailangan ng agarang medikal na atensyon?",
            "Kailan po ako dapat bumalik kung hindi bumubuti ang sitwasyon?",
          ],
        },
      ],
    },
    {
      "id": "epilepsy-seizures",
      "label": "Epilepsy / Seizures",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa dito",
          "questions": [
            "Anong klase po ng seizures ang nararanasan ko?",
            "Ano po ang sanhi nito — alam po ba natin?",
            "Anong mga pagsusuri po ang kailangan ko (EEG, MRI)?",
            "Magkakaroon pa po ba ako ng seizures?",
          ],
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Anong gamot po ang nirerekomenda ninyo at bakit?",
            "Anong mga side effect po ang dapat kong bantayan?",
            "Ano po ang mangyayari kung makalimutan kong uminom ng gamot (dose)?",
            "Gaano po katagal ko kailangan inumin ang gamot?",
          ],
        },
        {
          "id": "safety",
          "title": "Kaligtasan at pang-araw-araw na buhay",
          "questions": [
            "Puwede po ba akong magmaneho — ano po ang mga patakaran sa aming lugar?",
            "Ano po ang dapat gawin ng pamilya ko kung magkaroon ako ng seizure?",
            "Mayroon po bang mga aktibidad na dapat kong iwasan (paglangoy, matataas na lugar)?",
            "Puwede po ba akong uminom ng alak habang umiinom ng gamot?",
          ],
        },
        {
          "id": "monitoring",
          "title": "Pagsubaybay (Follow-up)",
          "questions": [
            "Dapat po ba akong magtala ng aking mga seizure — anong detalye po ang pinakamakatutulong sa inyo?",
            "Kailangan po ba akong magpa-blood test para suriin ang level ng gamot sa katawan ko?",
            "Kailan po ako dapat magpatingin sa espesyalista sa epilepsy (neurologist)?",
          ],
        },
      ],
    },
    {
      "id": "vertigo",
      "label": "Pagkahilo / Vertigo",
      "categories": [
        {
          "id": "understanding",
          "title": "Pag-unawa rito",
          "questions": [
            "Ano po ang sanhi ng aking pagkahilo — sa panloob na tainga (inner ear), presyon ng dugo, o iba pa?",
            "Ito po ba ay (BPPV) (maluwag na kristal sa panloob na tainga)?",
            "Maaari po bang ang mga gamot ko ang sanhi nito?",
            "Kailangan po ba akong magpa-hearing test o balance testing?",
          ],
        },
        {
          "id": "treatment",
          "title": "Paggamot",
          "questions": [
            "Maaari po bang ayusin ito ng repositioning maneuver (tulad ng Epley)?",
            "Mayroon po bang gamot na makakatulong, at kailan ko po ito dapat inumin?",
            "Makakatulong po ba sa akin ang vestibular (balance) therapy?",
            "Gaano po ito katagal tatagal?",
          ],
        },
        {
          "id": "safety",
          "title": "Kaligtasan",
          "questions": [
            "Ano po ang dapat kong gawin kapag inaatake ng vertigo?",
            "Paano ko po maiiwasan ang pagkadulas o pagkahulog sa bahay?",
            "Ligtas po ba para sa akin ang magmaneho?",
          ],
        },
        {
          "id": "warning",
          "title": "Kailan dapat mag-alala",
          "questions": [
            "Anong mga sintomas ng pagkahilo ang maaaring senyales ng stroke o isang bagay na kagyat?",
            "Kailan po ako dapat humingi ng agarang medikal na atensyon?",
          ],
        },
      ],
    },
    {
      "id": "fatigue",
      "label": "Pangkalahatang Pagkapagod (General Fatigue)",
      "categories": [
        {
          "id": "understanding",
          "title": "Paghahanap ng sanhi",
          "questions": [
            "Ano po ang pinakakaraniwang sanhi ng pagkapagod na tulad ng sa akin?",
            "Maaari po ba itong anemia, thyroid, kakulangan sa bitamina (vitamin deficiency), o diabetes?",
            "Maaari po bang ang mga gamot ko ang dahilan ng pagkapagod ko?",
            "Maaari po bang ang mahinang tulog o sleep apnea ang sanhi?",
          ],
        },
        {
          "id": "tests",
          "title": "Mga Pagsusuri (Tests)",
          "questions": [
            "Anong mga blood test po ang dapat kong gawin?",
            "Kailangan po ba akong magpa-sleep study?",
            "Ano ang gagawin natin kung normal ang lahat ng resulta ng pagsusuri?",
          ],
        },
        {
          "id": "mental",
          "title": "Kalooban at stress",
          "questions": [
            "Maaari bang bahagi nito ang stress, pagkabalisa, o depresyon?",
            "Paano natin malalaman ang pagkakaiba ng pisikal na sanhi mula sa emosyonal na sanhi?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Ano ang magagawa ko?",
          "questions": [
            "Anong mga pagbabago sa diyeta, ehersisyo, o tulog ang pinakamakakatulong?",
            "Ilang oras na tulog ang kailangan ko?",
            "Kailan ko po aasahang bumuti ang pakiramdam, at ano ang susunod nating hakbang kung hindi ako bumuti?",
          ],
        },
      ],
    }
  ]
};

export default tl;
