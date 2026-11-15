import type { LanguageData } from "./types";
import { FEATURE_TRANSLATIONS } from "./feature-translations";

const fr: LanguageData = {
  "code": "fr",
  "label": "Français",
  "ui": {
    ...FEATURE_TRANSLATIONS.fr,
    "appTitle": "Vaani",
    "appSubtitle": "Faites entendre votre voix chez le médecin.",
    "heroHeading": "Préparez votre visite chez le médecin",
    "heroDescription": "Vaani vous aide à préparer les questions à poser — pour que vous quittiez votre rendez-vous avec des réponses, et non des regrets.",
    "tip": "Conseil : Cochez chaque question que vous souhaitez poser — même si elle vous semble insignifiante. Votre médecin est là pour vous aider.",
    "conditionSelectLabel": "De quoi aimeriez-vous parler à votre médecin ?",
    "conditionSelectPlaceholder": "— Choisissez un sujet —",
    "printButton": "Imprimer cette page",
    "downloadButton": "Télécharger une copie",
    "savedLocallyNotice": "Enregistré uniquement sur cet appareil — téléchargez une copie pour ne pas la perdre.",
    "visitTypeLabel": "Est-ce votre première visite ou un suivi ?",
    "visitTypeFirst": "Première visite",
    "visitTypeFollowup": "Visite de suivi",
    "followupCategory": {
      "id": "followup-visit",
      "title": "Depuis ma dernière visite",
      "questions": [
        "Comment mon état a-t-il évolué depuis ma dernière visite ?",
        "Qu'ont montré mes derniers résultats d'examen ou de laboratoire ?",
        "Mes médicaments actuels sont-ils toujours efficaces — faut-il changer quelque chose ?",
        "Y a-t-il des effets secondaires dont je devrais surveiller l'apparition ?",
        "Devons-nous ajuster mon plan de traitement ?",
        "Que devrais-je faire ou suivre avant ma prochaine visite ?"
      ]
    },
    "uploadTitle": "Ajouter des questions à partir de votre rapport de laboratoire ou médical",
    "uploadHint": "Téléchargez une photo ou un PDF de votre dernier rapport. Il est envoyé à l'IA pour suggérer des questions, puis supprimé — il n'est pas enregistré.",
    "uploadButton": "Télécharger le rapport",
    "uploadChooseAnother": "Choisir un autre fichier",
    "uploadAnalyzing": "Lecture de votre rapport…",
    "uploadError": "Impossible de lire ce fichier. Veuillez essayer une photo claire ou un PDF.",
    "uploadTooLarge": "Ce fichier est trop volumineux. Veuillez en utiliser un de moins de 8 Mo.",
    "resetButton": "Réinitialiser / recommencer",
    "resetConfirmText": "Cela effacera toutes vos coches, notes et questions personnalisées.",
    "resetConfirmYes": "Oui, réinitialiser",
    "resetConfirmCancel": "Annuler",
    "notesLabel": "Ce que mon médecin m'a dit",
    "notesPlaceholder": "Écrivez vos notes ici pendant ou après votre visite…",
    "yourQuestionsTitle": "Vos questions",
    "yourQuestionsPlaceholder": "Ajoutez votre propre question…",
    "yourQuestionsAdd": "Ajouter",
    "disclaimer": "Cet outil vous aide à préparer des questions — ce n'est pas un avis médical. Suivez toujours les conseils de votre médecin.",
    "questionsSoonTitle": "Questions à venir",
    "questionsSoonDesc": "Des questions générales pour ce sujet sont en cours d'ajout. Utilisez la boîte ci-dessous pour ajouter vos propres questions dès maintenant.",
    "ckdStageLabel": "Mon stade de CKD",
    "ckdStagePlaceholder": "— Sélectionner un stade —",
    "ckdStageOptional": "(facultatif)",
    "ckdStageNotes": {
      "stage-1": "Stade 1 (eGFR ≥ 90) : Les reins sont endommagés, mais leur fonction est normale ou élevée. L'objectif est de protéger les reins et de traiter la cause.",
      "stage-2": "Stade 2 (eGFR 60–89) : Diminution légère. L'objectif est de ralentir la progression.",
      "stage-3": "Stade 3 (eGFR 30–59) : Diminution modérée. La gestion des complications est importante.",
      "stage-4": "Stade 4 (eGFR 15–29) : Diminution sévère. Il est temps de planifier une thérapie de remplacement rénal.",
      "stage-5": "Stade 5 (eGFR < 15) : Insuffisance rénale. Une dialyse ou une greffe est généralement nécessaire.",
      "not-sure": "Vous ne connaissez pas votre stade ? Demandez votre valeur d'eGFR à votre médecin."
    },
    "transplantLabel": "Je suis intéressé(e) par une greffe de rein, ou je suis en cours d'évaluation pour une greffe.",
    "transplantSubLabel": "Ceci ajoute des questions spécifiques à la greffe ci-dessous.",
    "cancerSubtypeLabel": "Quel type de cancer ?",
    "cancerSubtypeOptional": "(facultatif — ajoute des questions spécifiques)",
    "cancerSubtypePlaceholder": "— Sélectionner un type —",
    "aiPanelHeading": "Ajouter des questions pour ma situation",
    "aiPanelLabel": "Décrivez votre situation et vos symptômes avec vos propres mots",
    "aiPanelPlaceholder": "Par exemple : \"J'ai 62 ans, on m'a récemment diagnostiqué {condition}, et je souhaite comprendre mes options de traitement.\"",
    "aiPanelButton": "Suggérer des questions pour moi",
    "aiPanelLoading": "Réflexion en cours…",
    "aiPanelDisclaimer": "Votre description est envoyée en toute sécurité à notre serveur et traitée par un service d'IA pour créer des suggestions ; elle n'est pas stockée. Les questions suggérées par l'IA sont uniquement des points de départ pour la discussion et non des conseils médicaux.",
    "aiPanelError": "Une erreur est survenue. Veuillez réessayer dans un instant.",
    "safetyNoticeTitle": "Besoin d'aide immédiate ?",
    "safetyNoticeLine988": "Si vous êtes en crise ou si vous pensez à vous faire du mal, vous méritez d'être aidé(e) immédiatement. Aux États-Unis, appelez ou envoyez un SMS au 988 (Ligne de prévention du suicide et des crises).",
    "safetyNoticeInternational": "Les ressources d'aide en cas de crise varient selon les pays — veuillez trouver la ligne d'aide pour votre région.",
    "permissionDeniedTitle": "Autorisation requise",
    "permissionDeniedMessage": "Vaani n'a pas accès. Veuillez l'autoriser dans les Réglages de votre appareil pour utiliser cette fonctionnalité.",
    "openSettings": "Ouvrir les Réglages",
    "languageLabel": "Langue",
    "aboutArticleLabel": "En savoir plus sur cette condition :",
    "addTopicButton": "Ajoutez votre sujet s'il ne figure pas ci-dessus",
    "addTopicPlaceholder": "Tapez votre sujet (par exemple : douleur au genou)…",
    "addTopicSave": "Ajouter un sujet",
    "sourcesTitle": "Sources et références médicales",
    "sourcesIntro": "Les questions et informations de cette application sont basées sur les directives de ces organisations de santé fiables. Touchez une source pour en savoir plus :"
  },
  "conditions": [
    {
      "id": "diabetes",
      "label": "Diabète",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre le diabète",
          "questions": [
            "Quel type ai-je ?",
            "Quels étaient mes chiffres clés (HbA1c, glycémie à jeun) ?",
            "Quel est mon objectif d'HbA1c ?",
            "Est-ce gérable ou réversible ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "De quel médicament ai-je besoin et comment agit-il ?",
            "Aurais-je besoin d'insuline ?",
            "Quels effets secondaires dois-je surveiller ?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Suivi",
          "questions": [
            "À quelle fréquence dois-je vérifier ma glycémie ?",
            "Dois-je utiliser un CGM ?",
            "Quand devons-nous vérifier à nouveau mon HbA1c ?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Mode de vie",
          "questions": [
            "Quels changements alimentaires sont les plus utiles ?",
            "Quelle quantité d'exercice est recommandée ?",
            "Comment mon poids affecte-t-il cela ?"
          ]
        },
        {
          "id": "followup",
          "title": "Suivi et complications",
          "questions": [
            "Comment cela affecte-t-il mes yeux, mes reins, mes pieds et mon cœur ?",
            "Quels dépistages dois-je faire et quand ?",
            "Quand est ma prochaine visite ?"
          ]
        }
      ]
    },
    {
      "id": "high-blood-pressure",
      "label": "Pression artérielle élevée",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre la maladie",
          "questions": [
            "Quels étaient mes chiffres et quel est mon objectif ?",
            "Qu'est-ce qui en est probablement la cause ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quel médicament et pourquoi ?",
            "Quels sont les effets secondaires ?",
            "Puis-je essayer des changements de mode de vie en premier ?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Surveillance",
          "questions": [
            "Dois-je vérifier à la maison et à quelle fréquence ?",
            "Quelles mesures devraient m'inquiéter ?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Mode de vie",
          "questions": [
            "Qu'en est-il du sel, de l'alcool, de l'exercice, du poids et du stress ?"
          ]
        },
        {
          "id": "followup",
          "title": "Suivi",
          "questions": [
            "Quand refaisons-nous le point ?",
            "Quels organes sont à risque si ce n'est pas contrôlé ?"
          ]
        }
      ]
    },
    {
      "id": "skin-rash",
      "label": "Éruption cutanée",
      "categories": [
        {
          "id": "what-is-it",
          "title": "Qu'est-ce que c'est ?",
          "questions": [
            "Quelle est la cause probable ?",
            "Est-ce contagieux ou allergique ?",
            "Ai-je besoin d'un test ou d'une biopsie ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quelle crème ou quel médicament, et pendant combien de temps ?",
            "Que faire si ça ne disparaît pas ?"
          ]
        },
        {
          "id": "triggers",
          "title": "Déclencheurs",
          "questions": [
            "Quels produits, aliments ou activités devrais-je éviter ?"
          ]
        },
        {
          "id": "when-to-worry",
          "title": "Quand s'inquiéter",
          "questions": [
            "Quels signes indiquent que ça empire ?",
            "Quand devrais-je revenir ou aller aux urgences ?"
          ]
        }
      ]
    },
    {
      "id": "skin-bump-lump",
      "label": "Bosse ou grosseur sur la peau",
      "categories": [
        {
          "id": "what-is-it",
          "title": "Qu'est-ce que c'est ?",
          "questions": [
            "Qu'est-ce que vous pensez que c'est ?",
            "Avons-nous besoin d'une biopsie ou d'une imagerie ?",
            "Est-ce que ça pourrait être un cancer ?"
          ]
        },
        {
          "id": "options",
          "title": "Options",
          "questions": [
            "Faut-il l'enlever ?",
            "Quels sont les risques de l'enlever par rapport à le laisser sous surveillance ?"
          ]
        },
        {
          "id": "changes",
          "title": "Changements",
          "questions": [
            "À quelle vitesse cela pourrait-il changer ?",
            "Quels signes indiquent que je devrais revenir en urgence ?"
          ]
        },
        {
          "id": "followup",
          "title": "Suivi",
          "questions": [
            "Quand devrions-nous le revoir ?"
          ]
        }
      ]
    },
    {
      "id": "cancer",
      "label": "Cancer",
      "categories": [
        {
          "id": "diagnosis",
          "title": "Diagnostic",
          "questions": [
            "Quel est son type et son stade ?",
            "Quels tests l'ont confirmé ?",
            "Où se trouve-t-il, et s'est-il propagé ?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Options de traitement",
          "questions": [
            "Quelles sont TOUTES mes options (chirurgie, chimiothérapie, radiothérapie, immunothérapie, thérapie ciblée, surveillance active) ?",
            "Que recommandez-vous et pourquoi ?",
            "Le but est-il de le guérir ou de le contrôler ?"
          ]
        },
        {
          "id": "side-effects",
          "title": "Effets secondaires",
          "questions": [
            "Quels sont les effets secondaires de chaque option ?",
            "Cela affectera-t-il la fertilité ?",
            "Y a-t-il des effets à long terme ?"
          ]
        },
        {
          "id": "logistics",
          "title": "Logistique",
          "questions": [
            "Combien de temps dure le traitement ?",
            "Comment cela affectera-t-il le travail et la vie quotidienne ?",
            "Qu'en est-il du coût et de l'assurance ?",
            "Comment puis-je obtenir un deuxième avis ?"
          ]
        },
        {
          "id": "support",
          "title": "Soutien",
          "questions": [
            "Y a-t-il des essais cliniques ?",
            "Puis-je consulter les soins palliatifs pour aider à gérer les symptômes ?",
            "Y a-t-il des groupes de soutien ?",
            "Qui est ma principale personne de contact ?"
          ]
        },
        {
          "id": "followup",
          "title": "Suivi",
          "questions": [
            "Comment saurons-nous que cela fonctionne ?",
            "Quel est le calendrier des examens d'imagerie ?",
            "Quels sont les signes de récidive ?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "breast",
          "label": "Sein",
          "categories": [
            {
              "id": "breast-specific",
              "title": "Cancer du sein — questions spécifiques",
              "questions": [
                "Devrais-je faire un test génétique (BRCA1/BRCA2), et cela changerait-il mon traitement ou le dépistage de ma famille ?",
                "Quel est mon statut des récepteurs hormonaux (ER/PR) et HER2, et qu'est-ce que cela signifie pour moi ?",
                "Quelles sont mes options chirurgicales (tumorectomie ou mastectomie) et mes options de reconstruction ?",
                "Aurais-je besoin de chimiothérapie, de radiothérapie ou d'hormonothérapie, et dans quel ordre ?",
                "Comment le traitement affectera-t-il ma fertilité, et puis-je préserver des options avant de commencer ?"
              ]
            }
          ]
        },
        {
          "id": "lung",
          "label": "Poumon",
          "categories": [
            {
              "id": "lung-specific",
              "title": "Cancer du poumon — questions spécifiques",
              "questions": [
                "Est-ce dû au tabagisme, et cela change-t-il le traitement ?",
                "Que révèle mon test de mutation ?",
                "Suis-je un candidat à la chirurgie ?"
              ]
            }
          ]
        },
        {
          "id": "colorectal",
          "label": "Colorectal",
          "categories": [
            {
              "id": "colorectal-specific",
              "title": "Cancer colorectal — questions spécifiques",
              "questions": [
                "Ai-je besoin d'une colostomie ?",
                "La tumeur a-t-elle été testée pour les marqueurs génétiques ?",
                "Qu'en est-il du calendrier de dépistage de ma famille ?"
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
              "title": "Cancer de la prostate — questions spécifiques",
              "questions": [
                "Quels sont mon score de Gleason et mon PSA ?",
                "La surveillance active est-elle une option pour moi ?",
                "Comment le traitement affectera-t-il les fonctions urinaires et sexuelles ?"
              ]
            }
          ]
        },
        {
          "id": "melanoma",
          "label": "Peau / Mélanome",
          "categories": [
            {
              "id": "melanoma-specific",
              "title": "Peau / Mélanome — questions spécifiques",
              "questions": [
                "Quelle est sa profondeur ?",
                "Faut-il vérifier mes ganglions lymphatiques ?",
                "À quelle fréquence dois-je faire des examens cutanés complets ?"
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
              "title": "Cancer du col de l'utérus — questions spécifiques",
              "questions": [
                "Quel est le stade et le statut HPV ?",
                "Comment le traitement affectera-t-il ma fertilité ?",
                "Quel calendrier de suivi Pap/HPV dois-je suivre ?"
              ]
            }
          ]
        },
        {
          "id": "leukemia",
          "label": "Leucémie",
          "categories": [
            {
              "id": "leukemia-specific",
              "title": "Leucémie — questions spécifiques",
              "questions": [
                "Quel type (aiguë ou chronique) ?",
                "Ai-je besoin d'un traitement maintenant ou juste d'une surveillance ?",
                "Aurais-je besoin d'une greffe de moelle osseuse ?"
              ]
            }
          ]
        },
        {
          "id": "lymphoma",
          "label": "Lymphome",
          "categories": [
            {
              "id": "lymphoma-specific",
              "title": "Lymphome — questions spécifiques",
              "questions": [
                "Hodgkin ou non-Hodgkin, et quel sous-type ?",
                "Quel est le plan de traitement et le calendrier ?",
                "Quels sont les effets à long terme du traitement ?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ckd",
      "label": "Maladie rénale chronique (CKD)",
      "categories": [
        {
          "id": "diagnosis-stage",
          "title": "Mon diagnostic et mon stade",
          "questions": [
            "À quel stade suis-je, et quel est mon eGFR ?",
            "Quel est mon taux d'albumine urinaire (ACR)?",
            "Qu'est-ce qui a causé ma CKD?",
            "Est-il probable que ça s'aggrave, et à quelle vitesse?"
          ]
        },
        {
          "id": "protecting-kidneys",
          "title": "Protéger mes reins",
          "questions": [
            "Quel est mon objectif de tension artérielle?",
            "Devrais-je prendre un inhibiteur de l'ECA, un ARA, ou un inhibiteur de SGLT2?",
            "Quels médicaments ou suppléments devrais-je éviter (par exemple, les AINS comme l'ibuprofène)?",
            "Si je suis diabétique, quel est mon objectif de glycémie?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Alimentation et mode de vie",
          "questions": [
            "Puis-je consulter une diététiste spécialisée dans les maladies rénales?",
            "Quelle quantité de protéines, de sodium, de potassium et de phosphore est appropriée pour moi?",
            "Y a-t-il des restrictions de liquides que je devrais suivre?",
            "Quels suppléments sont sûrs?",
            "Qu'en est-il de l'exercice?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Suivi",
          "questions": [
            "À quelle fréquence allons-nous vérifier mes analyses et mon eGFR?",
            "Quels chiffres devrais-je suivre moi-même?",
            "Quels changements vous inquiéteraient?"
          ]
        },
        {
          "id": "medications",
          "title": "Mes médicaments",
          "questions": [
            "Certains de mes médicaments actuels nécessitent-ils des ajustements de dose pour mes reins?",
            "Devrais-je commencer ou arrêter quelque chose?"
          ]
        },
        {
          "id": "planning-ahead",
          "title": "Planification à l'avance",
          "questions": [
            "À quel moment parlons-nous de dialyse ou de transplantation?",
            "Quelles sont toutes mes options (hémodialyse, dialyse péritonéale, transplantation, soins conservateurs)?",
            "Pourrais-je éviter la dialyse avec une transplantation précoce (\"préemptive\")?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Émotionnel et pratique",
          "questions": [
            "Comment cela pourrait-il affecter mon énergie et mon travail?",
            "Y a-t-il un soutien en santé mentale disponible?",
            "Y a-t-il des groupes de soutien ou des organisations rénales que vous recommandez?",
            "Où puis-je obtenir de l'aide pour l'assurance et les coûts?"
          ]
        },
        {
          "id": "red-flags",
          "title": "Signaux d'alarme",
          "questions": [
            "Quels symptômes signifient que je devrais vous appeler ou aller aux urgences?"
          ]
        }
      ],
      "extraCategories": [
        {
          "id": "transplant",
          "triggerLabel": "Je suis intéressé par ou en cours d'évaluation pour une transplantation rénale.",
          "categories": [
            {
              "id": "transplant-eval",
              "title": "Évaluation pour la transplantation",
              "questions": [
                "Suis-je un candidat pour une transplantation rénale?",
                "Comment et quand suis-je orienté vers un centre de transplantation?",
                "Puis-je être évalué avant d'avoir besoin de dialyse (une transplantation préemptive)?",
                "Quelle est la différence entre un donneur vivant et un donneur décédé pour moi?",
                "Comment trouver un donneur vivant — et est-il acceptable de demander à ma famille ou à mes amis?",
                "Quels tests sont impliqués dans l'évaluation, et combien de temps dure tout le processus?",
                "Qu'est-ce qui pourrait me rendre inéligible, et y a-t-il des choses sur lesquelles je peux travailler ou que je peux corriger ?",
                "Pouvons-nous commencer le processus d'évaluation maintenant ?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "thyroid",
      "label": "Problème de thyroïde",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre la situation",
          "questions": [
            "Ma thyroïde est-elle hyperactive ou hypoactive ?",
            "Quels étaient mes niveaux de TSH, T3 et T4 ?",
            "Quelle est la cause de ceci (par exemple, Hashimoto ou Graves) ?",
            "Est-ce permanent ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "De quel médicament ai-je besoin, et à quelle dose ?",
            "Combien de temps avant que je me sente mieux ?",
            "Que se passe-t-il si je ne me sens toujours pas bien après avoir commencé le traitement ?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Suivi",
          "questions": [
            "À quelle fréquence devons-nous revérifier mes niveaux ?",
            "Quels sont les symptômes qui indiquent que ma dose est incorrecte ?"
          ]
        },
        {
          "id": "daily-life",
          "title": "Vie quotidienne",
          "questions": [
            "Comment dois-je prendre mon médicament (horaire, alimentation, autres médicaments) ?",
            "Cela affecte-t-il mon poids, mon énergie, mon humeur, mes cheveux ou mes règles ?",
            "Cela affecte-t-il la grossesse ou la fertilité ?"
          ]
        },
        {
          "id": "followup",
          "title": "Suivi",
          "questions": [
            "Quand sont mes prochains bilan sanguin et rendez-vous ?"
          ]
        }
      ]
    },
    {
      "id": "pcos-gyn",
      "label": "SOPK / Gynécologique",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre la situation",
          "questions": [
            "Qu'est-ce qui cause mes symptômes ?",
            "Quels tests le confirment (hormones, échographie) ?"
          ]
        },
        {
          "id": "symptoms-treatment",
          "title": "Symptômes et traitement",
          "questions": [
            "Quelles sont mes options pour les règles irrégulières, l'acné ou les poils indésirables ?",
            "Ai-je besoin de contraception, de metformine, ou d'autre chose ?",
            "Quels sont les effets secondaires ?"
          ]
        },
        {
          "id": "fertility",
          "title": "Fertilité",
          "questions": [
            "Comment cela affecte-t-il ma capacité à tomber enceinte ?",
            "Qu'est-ce qui peut m'aider si je veux concevoir — maintenant ou plus tard ?"
          ]
        },
        {
          "id": "long-term-health",
          "title": "Santé à long terme",
          "questions": [
            "Quel est mon risque de diabète, de problèmes cardiaques ou d'autres problèmes, et comment les surveillons-nous ?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Mode de vie",
          "questions": [
            "Les changements de régime alimentaire, de poids ou d'exercice aident-ils, et à quel point ?"
          ]
        },
        {
          "id": "general-gyn",
          "title": "Visite gynécologique générale",
          "questions": [
            "Ai-je besoin d'un frottis de Pap ou d'un test HPV, et quand ?",
            "Est-ce que ces saignements / douleurs / écoulements sont normaux ?",
            "Quand dois-je revenir ?"
          ]
        },
        {
          "id": "followup",
          "title": "Suivi et deuxièmes avis",
          "questions": [
            "Quand devrions-nous faire le point à nouveau ?",
            "Comment puis-je obtenir une orientation si j'en souhaite une ?"
          ]
        }
      ]
    },
    {
      "id": "mental-health",
      "label": "Santé mentale (dépression / anxiété)",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre la situation",
          "questions": [
            "Que pensez-vous qu'il se passe ?",
            "Est-ce que quelque chose de physique (thyroïde, vitamines, sommeil, médicaments) pourrait y contribuer ?"
          ]
        },
        {
          "id": "options",
          "title": "Options",
          "questions": [
            "Quelles sont mes options de traitement — thérapie, médicaments, ou les deux ?",
            "Que recommandez-vous et pourquoi ?",
            "Combien de temps avant que je ressente une différence ?"
          ]
        },
        {
          "id": "medication",
          "title": "Médicaments",
          "questions": [
            "Quels sont les effets secondaires ?",
            "Est-ce que cela peut créer une dépendance ?",
            "Que se passe-t-il si le premier ne fonctionne pas ?",
            "Comment et quand pourrais-je l'arrêter en toute sécurité ?"
          ]
        },
        {
          "id": "therapy-support",
          "title": "Thérapie et soutien",
          "questions": [
            "Quel type de thérapie me convient, et comment trouver quelqu'un ?",
            "Existe-t-il des groupes de soutien ou des options abordables ?"
          ]
        },
        {
          "id": "daily-followup",
          "title": "Vie quotidienne et suivi",
          "questions": [
            "Que puis-je faire au quotidien ?",
            "Quand devrions-nous nous revoir ?",
            "Qui dois-je contacter si la situation s'aggrave avant cela ?"
          ]
        }
      ]
    },
    {
      "id": "liver-disease",
      "label": "Maladie du foie",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre la situation",
          "questions": [
            "Quel type de maladie du foie ai-je — stéatose hépatique, hépatite, cirrhose, ou autre chose ?",
            "Qu'est-ce qui l'a causée, et cette cause peut-elle être traitée ?",
            "À quel stade ou niveau de dommages se trouve mon foie ?",
            "Mon foie fonctionne-t-il encore normalement actuellement ?",
            "Est-ce que cela peut s'améliorer, ou est-il probable que cela s'aggrave avec le temps ?",
            "Devrais-je consulter un spécialiste du foie (hépatologue) ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement et médicaments",
          "questions": [
            "Ai-je besoin de médicaments, et quels sont les effets secondaires ?",
            "Existe-t-il des traitements qui peuvent ralentir ou inverser les dommages ?",
            "Aurais-je besoin de procédures, comme une biopsie hépatique ou une endoscopie ?",
            "Existe-t-il des essais cliniques ou de nouveaux traitements que je devrais connaître ?",
            "Si mon foie s'aggrave, quelles options ai-je — y compris une transplantation ?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Mode de vie et régime alimentaire",
          "questions": [
            "Devrais-je complètement arrêter de boire de l'alcool ?",
            "Y a-t-il des aliments que je devrais manger davantage, ou éviter ?",
            "Perdre du poids aiderait-il mon foie, et dans quelle mesure ?",
            "Est-il sûr de prendre du Tylenol, de l'ibuprofène ou d'autres analgésiques en vente libre ?",
            "Quelles vitamines ou quels suppléments sont sûrs — et lesquels devrais-je éviter ?",
            "L'exercice est-il sûr et utile pour moi en ce moment ?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Suivi et tests",
          "questions": [
            "Quelles analyses de sang dois-je faire et à quelle fréquence ?",
            "Ai-je besoin d'examens d'imagerie comme une échographie, un CT scan ou une IRM, et à quelle fréquence ?",
            "Devrais-je être dépisté pour le cancer du foie ?",
            "Comment saurons-nous si mon état s'améliore ou s'aggrave ?",
            "Y a-t-il des vaccins que je devrais faire pour protéger mon foie (hépatite A, hépatite B) ?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Signes d'alerte",
          "questions": [
            "Quels symptômes devraient me faire aller aux urgences immédiatement ?",
            "À quoi dois-je faire attention à la maison et vous signaler rapidement ?",
            "Si mon ventre gonfle ou ma peau jaunit, que dois-je faire ?",
            "Mes proches devraient-ils être testés — est-ce que quelque chose de cela est héréditaire ou contagieux ?"
          ]
        }
      ]
    },
    {
      "id": "heart-disease",
      "label": "Maladie cardiaque / Cardiovasculaire",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre ma maladie",
          "questions": [
            "Quel type de problème cardiaque ai-je exactement ?",
            "Quelle est sa gravité, et qu'est-ce que cela signifie pour ma vie quotidienne ?",
            "Qu'est-ce qui a causé cela — la génétique, le mode de vie, ou autre chose ?",
            "Comment mon cœur pompe-t-il en ce moment (fraction d'éjection ou autres mesures) ?",
            "Devrais-je consulter un cardiologue ou un spécialiste du cœur ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement et médicaments",
          "questions": [
            "De quels médicaments ai-je besoin, et quels sont les effets secondaires ?",
            "Aurais-je besoin d'une intervention — comme un stent, un pontage coronarien, ou un stimulateur cardiaque ?",
            "Comment saurai-je si mes médicaments agissent ?",
            "Que se passe-t-il si j'oublie une dose de mon médicament pour le cœur ?",
            "Y a-t-il des essais cliniques ou de nouveaux traitements que je devrais connaître ?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Mode de vie et alimentation",
          "questions": [
            "Quels changements alimentaires aideront le plus mon cœur ?",
            "Quelle quantité de sel et d'alcool est sûre ?",
            "Quelle quantité d'exercice est sûre pour moi, et quel type ?",
            "Comment le stress affecte-t-il mon cœur, et que puis-je faire à ce sujet ?",
            "Devrais-je arrêter de fumer, et quelle aide est disponible ?",
            "Est-il sûr d'être sexuellement actif ?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Suivi et tests",
          "questions": [
            "Quels tests ai-je besoin — EKG, échocardiogramme, test d'effort — et à quelle fréquence ?",
            "Quels chiffres devrais-je suivre à la maison (tension artérielle, fréquence cardiaque, poids) ?",
            "Quels sont mes chiffres cibles pour le cholestérol, la tension artérielle et la fréquence cardiaque ?",
            "Comment saurons-nous si mon état s'améliore ou s'aggrave ?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Signes d'alerte",
          "questions": [
            "Quels symptômes signifient que je devrais appeler le 911 immédiatement ?",
            "Quels signes devrais-je surveiller et vous signaler rapidement ?",
            "Que dois-je faire si j'ai des douleurs ou une pression dans la poitrine ?",
            "Quelqu'un dans ma famille devrait-il être dépisté pour une maladie cardiaque ?"
          ]
        }
      ]
    },
    {
      "id": "joint-pain-arthritis",
      "label": "Douleurs articulaires / Arthrite",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre la maladie",
          "questions": [
            "Quel type d'arthrite ai-je — arthrose, polyarthrite rhumatoïde, arthrite psoriasique, goutte ou un autre ?",
            "Qu'est-ce qui cause les dommages articulaires dans mon cas ?",
            "Quelles articulations sont touchées actuellement, et est-ce susceptible de s'étendre ?",
            "Comment savoir si mes dommages articulaires s'aggravent avec le temps ?",
            "Devrais-je consulter un rhumatologue ou un spécialiste orthopédique ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement et médicaments",
          "questions": [
            "De quels médicaments ai-je besoin — AINS, stéroïdes, DMARDs ou produits biologiques ?",
            "Quels sont les effets secondaires, et combien de temps devrai-je les prendre ?",
            "La physiothérapie ou l'ergothérapie est-elle recommandée pour moi ?",
            "Une injection articulaire aiderait-elle, et à quelle fréquence puis-je en avoir une ?",
            "À quel moment la chirurgie ou un remplacement articulaire seraient-ils envisagés ?"
          ]
        },
        {
          "id": "flares",
          "title": "Gérer les poussées et la douleur",
          "questions": [
            "Que puis-je faire à la maison lorsque mes articulations s'enflamment ?",
            "La chaleur ou la glace est-elle meilleure pour ma douleur ?",
            "Existe-t-il des attelles, des orthèses ou des appareils d'assistance qui pourraient aider ?",
            "Quelles activités devrais-je éviter pour protéger mes articulations ?",
            "Quand une poussée devrait-elle me faire vous appeler au lieu de simplement la gérer à la maison ?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Mode de vie et alimentation",
          "questions": [
            "Existe-t-il des aliments qui réduisent l'inflammation — ou des aliments qui l'aggravent ?",
            "Quelle quantité d'exercice est sûre, et quels types sont les meilleurs pour mes articulations ?",
            "Perdre du poids aiderait-il à réduire ma douleur articulaire, et de combien ?",
            "Des suppléments sont-ils utiles — comme l'huile de poisson, le curcuma ou la glucosamine ?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Surveillance et tests",
          "questions": [
            "Quels tests sanguins ou examens d'imagerie ai-je besoin et à quelle fréquence ?",
            "Comment allons-nous mesurer si mon traitement fonctionne ?",
            "Quels effets secondaires de mes médicaments devrais-je surveiller et signaler ?",
            "À quelle fréquence devrais-je venir pour des contrôles ?"
          ]
        }
      ]
    },
    {
      "id": "asthma",
      "label": "Asthme",
      "subtypeLabel": "Quel type d'asthme ?",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre la maladie",
          "questions": [
            "Quel type d'asthme ai-je ?",
            "Qu'est-ce qui déclenche mon asthme ?",
            "Mon asthme est-il léger, modéré ou sévère ?",
            "Mon asthme est-il bien contrôlé en ce moment ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement et inhalateurs",
          "questions": [
            "Quelle est la différence entre mon inhalateur de contrôle et mon inhalateur de secours ?",
            "Pouvez-vous me regarder utiliser mon inhalateur pour vérifier ma technique ?",
            "À quelle fréquence est-il sûr d'utiliser mon inhalateur de secours ?",
            "Ai-je besoin d'une chambre d'espacement, et à quels effets secondaires dois-je m'attendre ?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Suivi et plan d'action",
          "questions": [
            "Dois-je suivre mon débit de pointe à la maison ?",
            "Comment savoir si mon asthme s'aggrave ?",
            "Quand dois-je utiliser mon plan d'action, vous appeler ou aller aux urgences ?",
            "À quelle fréquence dois-je venir pour un suivi ?"
          ]
        },
        {
          "id": "triggers-lifestyle",
          "title": "Déclencheurs et vie quotidienne",
          "questions": [
            "Comment puis-je réduire les déclencheurs à la maison et au travail ?",
            "Est-il sûr de faire de l'exercice, et comment prévenir les crises ?",
            "De quels vaccins ai-je besoin (grippe, pneumonie, COVID) ?",
            "Le tabagisme ou le vapotage affecte-t-il mon asthme ?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "allergic",
          "label": "Allergique (extrinsèque)",
          "categories": [
            {
              "id": "allergic-specific",
              "title": "Asthme allergique — questions spécifiques",
              "questions": [
                "Devrais-je faire des tests d'allergie ?",
                "Les médicaments contre les allergies ou l'immunothérapie m'aideraient-ils ?",
                "Quels allergènes devrais-je éviter le plus ?"
              ]
            }
          ]
        },
        {
          "id": "non-allergic",
          "label": "Non allergique (intrinsèque)",
          "categories": [
            {
              "id": "non-allergic-specific",
              "title": "Asthme non allergique — questions spécifiques",
              "questions": [
                "Qu'est-ce qui déclenche mon asthme si ce ne sont pas les allergies ?",
                "Les infections, l'air froid ou le stress peuvent-ils déclencher mes crises ?",
                "Que puis-je faire concernant les déclencheurs non allergiques ?"
              ]
            }
          ]
        },
        {
          "id": "exercise-induced",
          "label": "Induit par l'exercice",
          "categories": [
            {
              "id": "exercise-specific",
              "title": "Asthme induit par l'exercice — questions spécifiques",
              "questions": [
                "Que devrais-je faire avant de faire de l'exercice pour prévenir les symptômes ?",
                "Devrais-je utiliser mon inhalateur avant de faire de l'exercice ?",
                "Quels sports ou activités sont les plus sûrs pour moi ?"
              ]
            }
          ]
        },
        {
          "id": "cough-variant",
          "label": "Variante tussigène",
          "categories": [
            {
              "id": "cough-specific",
              "title": "Asthme à variante tussigène — questions spécifiques",
              "questions": [
                "Ma toux persistante pourrait-elle être de l'asthme ?",
                "Quel traitement aide l'asthme à variante tussigène ?",
                "Combien de temps avant que la toux ne s'améliore ?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "sciatica",
      "label": "Sciatique / Douleur nerveuse",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Qu'est-ce qui cause ma sciatique ?",
            "Quel nerf ou quel disque est impliqué ?",
            "Est-ce que cela va probablement s'améliorer tout seul ?",
            "Combien de temps dure habituellement la convalescence ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Que puis-je faire à la maison pour soulager la douleur ?",
            "Quels sont les médicaments antidouleur sûrs pour moi, et pendant combien de temps ?",
            "La physiothérapie serait-elle utile ?",
            "Ai-je besoin d'une injection ou d'une intervention chirurgicale — et si c'est une chirurgie, quel est son taux de réussite ?"
          ]
        },
        {
          "id": "activity",
          "title": "Activité et rétablissement",
          "questions": [
            "Quels mouvements ou positions dois-je éviter ?",
            "Est-il préférable de se reposer ou de rester actif ?",
            "Y a-t-il des étirements ou des exercices qui peuvent aider ?",
            "Quand puis-je reprendre le travail ou mes activités normales ?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Signes d'alerte et examens",
          "questions": [
            "Quels symptômes signifient que je devrais vous appeler immédiatement ?",
            "L'engourdissement, la faiblesse ou la perte de contrôle de la vessie constituent-ils une urgence ?",
            "De quels examens d'imagerie ou tests ai-je besoin ?"
          ]
        }
      ]
    },
    {
      "id": "psoriasis-eczema",
      "label": "Psoriasis / Eczéma",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Est-ce du psoriasis, de l'eczéma ou autre chose ?",
            "Qu'est-ce qui déclenche mes poussées ?",
            "Est-ce une maladie à vie ?",
            "Est-ce contagieux ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quelles crèmes ou pommades dois-je utiliser, et comment ?",
            "Existe-t-il des traitements plus puissants (luminothérapie, pilules, produits biologiques) pour moi ?",
            "Combien de temps avant que je voie une amélioration ?",
            "Quels effets secondaires dois-je attendre de mon traitement ?"
          ]
        },
        {
          "id": "daily-care",
          "title": "Soins quotidiens de la peau",
          "questions": [
            "Quelle routine de soins de la peau et quels produits recommandez-vous ?",
            "Quels savons, tissus ou aliments dois-je éviter ?",
            "Comment prendre soin de ma peau pendant une poussée ?",
            "Comment puis-je réduire les démangeaisons ?"
          ]
        },
        {
          "id": "broader-health",
          "title": "Santé générale",
          "questions": [
            "Ma maladie de peau est-elle liée à autre chose (articulations, cœur, humeur) ?",
            "Dois-je consulter un spécialiste ?",
            "Comment allons-nous suivre l'efficacité du traitement ?"
          ]
        }
      ]
    },
    {
      "id": "gerd",
      "label": "Reflux acide / RGO",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Qu'est-ce qui cause mon reflux acide ?",
            "Est-ce du RGO, et cela pourrait-il endommager mon œsophage ?",
            "Ai-je besoin de tests, comme une endoscopie ?",
            "Est-ce une maladie chronique ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quel est le bon médicament pour moi, et pour combien de temps ?",
            "Y a-t-il des risques à prendre des antiacides à long terme ?",
            "Que puis-je faire si les médicaments ne suffisent pas ?",
            "Si une intervention chirurgicale est suggérée, quel est son taux de réussite et quels sont les risques ?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Alimentation et mode de vie",
          "questions": [
            "Quels aliments et boissons devrais-je éviter ?",
            "Comment le moment des repas et la taille des portions affectent-ils le reflux ?",
            "Est-ce que perdre du poids ou surélever la tête de mon lit aiderait ?",
            "Le tabac ou l'alcool aggravent-ils la situation ?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Signes d'alerte",
          "questions": [
            "Quels symptômes signifient que je devrais consulter rapidement (difficulté à avaler, perte de poids, vomissements de sang) ?",
            "Mes symptômes pourraient-ils être autre chose qu'un reflux ?",
            "À quelle fréquence devrais-je faire un suivi ?"
          ]
        }
      ]
    },
    {
      "id": "infertility",
      "label": "Infertilité / Essayer de concevoir",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Quels tests devons-nous faire tous les deux pour trouver la cause ?",
            "Qu'est-ce qui pourrait rendre la conception plus difficile ?",
            "Comment mon âge et ma santé affectent-ils nos chances ?",
            "Combien de temps devrions-nous continuer d'essayer avant de faire plus de tests ?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Options de traitement",
          "questions": [
            "Quelles sont nos options, des plus simples aux plus avancées ?",
            "Quels sont les taux de réussite pour des personnes comme nous ?",
            "Combien coûte chaque option, et est-ce que quelque chose est couvert ?",
            "Quels sont les risques et les effets secondaires de chaque traitement ?"
          ]
        },
        {
          "id": "process",
          "title": "Le processus",
          "questions": [
            "Combien de temps dure chaque étape ?",
            "Combien de cycles ou de tentatives sont typiques avant de changer de cap ?",
            "Quels changements de mode de vie pourraient améliorer nos chances ?",
            "Devrions-nous consulter un spécialiste de la fertilité ?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Émotionnel et pratique",
          "questions": [
            "Quel soutien est disponible pour le stress lié à ce processus ?",
            "Quelles sont nos options si le traitement ne fonctionne pas ?",
            "Comment décidons-nous quand arrêter ou changer de plans ?"
          ]
        }
      ]
    },
    {
      "id": "multiple-sclerosis",
      "label": "Sclérose en plaques (MS)",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Quel type de MS ai-je ?",
            "Que montrent mes résultats d'IRM et de tests ?",
            "Comment cela pourrait-il m'affecter à long terme ?",
            "Quelle est la différence entre une poussée et une progression ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quel traitement de fond est le meilleur pour moi, et pourquoi ?",
            "Quels sont les avantages et les risques de ce traitement ?",
            "Comment une poussée est-elle traitée ?",
            "Quels effets secondaires devrais-je anticiper, et comment saurons-nous si cela fonctionne ?"
          ]
        },
        {
          "id": "symptoms-daily",
          "title": "Symptômes et vie quotidienne",
          "questions": [
            "Comment gérer la fatigue, la douleur ou d'autres symptômes ?",
            "La physiothérapie ou l'ergothérapie seraient-elles utiles ?",
            "Comment la chaleur, le stress ou les infections affectent-ils ma SEP ?",
            "Que puis-je faire pour rester aussi actif que possible ?"
          ]
        },
        {
          "id": "planning-monitoring",
          "title": "Planification et suivi",
          "questions": [
            "À quelle fréquence aurai-je besoin d'IRM ou de contrôles ?",
            "Quels symptômes devraient me pousser à vous appeler immédiatement ?",
            "Comment la SEP pourrait-elle affecter le travail, la conduite ou la planification familiale ?",
            "Quels services de soutien me sont accessibles ?"
          ]
        }
      ]
    },
    {
      "id": "insomnia",
      "label": "Insomnie / Troubles du sommeil",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Qu'est-ce qui pourrait causer mes problèmes de sommeil ?",
            "Une condition médicale ou un médicament pourrait-il me tenir éveillé ?",
            "Ai-je besoin d'une étude du sommeil ?",
            "Combien d'heures de sommeil devrais-je viser ?"
          ]
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quels changements puis-je essayer avant de prendre des médicaments ?",
            "La thérapie cognitivo-comportementale pour l'insomnie (TCC-I) est-elle une option ?",
            "Si j'ai besoin de somnifères, quels sont les risques et les effets secondaires, et combien de temps devrais-je les prendre ?",
            "Les aides au sommeil en vente libre sont-elles sûres pour moi ?"
          ]
        },
        {
          "id": "habits",
          "title": "Habitudes et routine",
          "questions": [
            "Quelles habitudes quotidiennes aident ou nuisent à mon sommeil ?",
            "Comment la caféine, l'alcool et les écrans affectent-ils mon sommeil ?",
            "À quoi devrait ressembler une bonne routine avant de dormir ?",
            "La sieste est-elle acceptable ?"
          ]
        },
        {
          "id": "followup",
          "title": "Suivi",
          "questions": [
            "Comment mesurerons-nous si mon sommeil s'améliore ?",
            "Devrais-je tenir un journal de sommeil ?",
            "Quand devrais-je faire un suivi ?"
          ]
        }
      ]
    },
    {
      "id": "uti",
      "label": "Infection urinaire (UTI)",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Est-ce une infection de la vessie ou pourrait-elle atteindre mes reins ?",
            "Qu'est-ce qui a causé cette infection ?",
            "Pourquoi est-ce que je continue à avoir des infections urinaires (UTI) ?",
            "Ai-je besoin d'une culture d'urine ou d'autres examens ?",
          ],
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quel antibiotique vais-je prendre et pendant combien de jours ?",
            "Que faire si mes symptômes ne s'améliorent pas en quelques jours ?",
            "Quels effets secondaires devrais-je surveiller ?",
            "Y a-t-il quelque chose que je puisse prendre pour la brûlure ou la douleur ?",
          ],
        },
        {
          "id": "prevention",
          "title": "Prévention",
          "questions": [
            "Comment puis-je prévenir de futures infections urinaires (UTI) ?",
            "Le jus de canneberge ou un supplément aide-t-il réellement ?",
            "Combien d'eau devrais-je boire chaque jour ?",
            "Y a-t-il des habitudes d'hygiène que je devrais changer ?",
          ],
        },
        {
          "id": "warning",
          "title": "Quand s'inquiéter",
          "questions": [
            "Quels symptômes indiquent que l'infection s'aggrave ?",
            "Quand devrais-je me rendre aux urgences ou à l'hôpital ?",
            "La fièvre ou les douleurs dorsales pourraient-elles signifier une infection rénale ?",
          ],
        },
      ],
    },
    {
      "id": "urinary-incontinence",
      "label": "Incontinence urinaire",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Quel type d'incontinence ai-je — d'effort, d'urgence ou mixte ?",
            "Qu'est-ce qui cause mes fuites ?",
            "Mes médicaments pourraient-ils aggraver cela ?",
            "Ai-je besoin d'examens, comme un test de fonction vésicale ?",
          ],
        },
        {
          "id": "treatment",
          "title": "Options de traitement",
          "questions": [
            "Les exercices du plancher pelvien (Kegel) peuvent-ils m'aider — et comment les faire correctement ?",
            "Un entraînement de la vessie ou des visites planifiées aux toilettes aideraient-ils ?",
            "Existe-t-il des médicaments pour cela, et quels sont les effets secondaires ?",
            "Quand envisagerait-on une chirurgie ou une procédure ?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Vie quotidienne",
          "questions": [
            "Devrais-je changer la quantité ou le moment où je bois des liquides ?",
            "La caféine ou l'alcool aggravent-ils cela ?",
            "Quels produits ou protections recommandez-vous ?",
            "La perte de poids peut-elle améliorer mes symptômes ?",
          ],
        },
        {
          "id": "referral",
          "title": "Spécialistes",
          "questions": [
            "Devrais-je consulter un urologue ou un urogynécologue ?",
            "Un kinésithérapeute spécialisé dans le plancher pelvien est-il une option pour moi ?",
          ],
        },
      ],
    },
    {
      "id": "blood-in-urine",
      "label": "Sang dans les urines",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Quelles sont les causes les plus probables de sang dans mes urines ?",
            "Cela pourrait-il être dû à une infection, un calcul rénal, ou quelque chose de plus grave ?",
            "Un médicament ou un aliment pourrait-il causer ce changement de couleur ?",
            "La quantité de sang est-elle liée à la gravité de la situation ?",
          ],
        },
        {
          "id": "tests",
          "title": "Examens",
          "questions": [
            "Quels examens dois-je faire — analyses d'urine, imagerie, ou une exploration de la vessie (cystoscopie) ?",
            "Que nous dira chaque examen ?",
            "Dans combien de temps ces examens devraient-ils être faits ?",
            "Vérifierez-vous ma fonction rénale aussi ?",
          ],
        },
        {
          "id": "nextsteps",
          "title": "Prochaines étapes",
          "questions": [
            "Que dois-je faire si je revois du sang avant mes examens ?",
            "Dois-je consulter un urologue ou un spécialiste des reins ?",
            "Quels symptômes signifient que je dois consulter immédiatement ?",
            "Quand aurons-nous des réponses sur la cause ?",
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
          "title": "Comprendre",
          "questions": [
            "Mes maux de tête sont-ils réellement des migraines, ou un autre type de céphalée ?",
            "Quels sont mes déclencheurs les plus probables ?",
            "Dois-je tenir un journal de mes maux de tête — que dois-je y noter ?",
            "Ai-je besoin d'un scanner cérébral ou d'autres examens ?",
          ],
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Que dois-je prendre au début d'une migraine, et à quelle vitesse ?",
            "Suis-je éligible pour un traitement préventif ?",
            "Qu'en est-il des nouveaux médicaments contre la migraine (anti-CGRP) — pourraient-ils m'aider ?",
            "Puis-je abuser des antidouleurs — qu'est-ce qu'une céphalée de rebond ?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Déclencheurs et mode de vie",
          "questions": [
            "Certains aliments, changements de sommeil, ou le stress peuvent-ils provoquer mes crises ?",
            "Mes hormones jouent-elles un rôle ?",
            "Quels changements dans ma routine pourraient réduire les crises ?",
          ],
        },
        {
          "id": "warning",
          "title": "Quand s'inquiéter",
          "questions": [
            "Quels symptômes de mal de tête sont des signaux d'alarme nécessitant des soins urgents ?",
            "Quand devrais-je revenir si les choses ne s'améliorent pas ?",
          ],
        },
      ],
    },
    {
      "id": "epilepsy-seizures",
      "label": "Épilepsie / Crises",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Quel type de crises ai-je ?",
            "Qu'est-ce qui les cause — le savons-nous ?",
            "Quels examens dois-je faire (EEG, IRM) ?",
            "Aurais-je d'autres crises ?",
          ],
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Quel médicament me recommandez-vous et pourquoi ?",
            "Quels effets secondaires dois-je surveiller ?",
            "Que se passe-t-il si j'oublie une dose ?",
            "Pendant combien de temps devrai-je prendre ce médicament ?",
          ],
        },
        {
          "id": "safety",
          "title": "Sécurité et vie quotidienne",
          "questions": [
            "Puis-je conduire — quelles sont les règles dans mon État ?",
            "Que doit faire ma famille si je fais une crise ?",
            "Y a-t-il des activités que je devrais éviter (nage, hauteurs) ?",
            "Puis-je boire de l'alcool avec mon médicament ?",
          ],
        },
        {
          "id": "monitoring",
          "title": "Suivi",
          "questions": [
            "Dois-je suivre mes crises — quels détails vous sont les plus utiles ?",
            "Ai-je besoin d'analyses de sang pour vérifier mon taux de médicament ?",
            "Quand devrais-je consulter un spécialiste de l'épilepsie (neurologue) ?",
          ],
        },
      ],
    },
    {
      "id": "vertigo",
      "label": "Vertiges / Étourdissements",
      "categories": [
        {
          "id": "understanding",
          "title": "Comprendre",
          "questions": [
            "Qu'est-ce qui cause mes étourdissements — l'oreille interne, la tension artérielle, ou autre chose ?",
            "S'agit-il d'un VPPB (cristaux flottants dans l'oreille interne) ?",
            "Mes médicaments pourraient-ils en être la cause ?",
            "Ai-je besoin d'un test auditif ou d'un bilan de l'équilibre ?",
          ],
        },
        {
          "id": "treatment",
          "title": "Traitement",
          "questions": [
            "Une manœuvre de repositionnement (comme l'Epley) peut-elle corriger cela ?",
            "Existe-t-il un médicament qui aide, et quand dois-je le prendre ?",
            "Une thérapie vestibulaire (d'équilibre) m'aiderait-elle ?",
            "Combien de temps cela va-t-il durer ?",
          ],
        },
        {
          "id": "safety",
          "title": "Sécurité",
          "questions": [
            "Que dois-je faire pendant une crise de vertige ?",
            "Comment puis-je prévenir les chutes à la maison ?",
            "Est-il sécuritaire pour moi de conduire ?",
          ],
        },
        {
          "id": "warning",
          "title": "Quand s'inquiéter",
          "questions": [
            "Quels symptômes d'étourdissements pourraient indiquer un AVC ou quelque chose d'urgent ?",
            "Quand devrais-je consulter immédiatement ?",
          ],
        },
      ],
    },
    {
      "id": "fatigue",
      "label": "Fatigue générale",
      "categories": [
        {
          "id": "understanding",
          "title": "Trouver la cause",
          "questions": [
            "Quelles sont les causes les plus courantes de fatigue comme la mienne ?",
            "Cela pourrait-il être l'anémie, la thyroïde, une carence en vitamines, ou le diabète ?",
            "Mes médicaments pourraient-ils me fatiguer ?",
            "Un mauvais sommeil ou l'apnée du sommeil pourrait-il en être la cause ?",
          ],
        },
        {
          "id": "tests",
          "title": "Examens",
          "questions": [
            "Quels examens sanguins devrais-je faire ?",
            "Ai-je besoin d'une étude du sommeil ?",
            "Que ferons-nous si tous les tests sont normaux ?",
          ],
        },
        {
          "id": "mental",
          "title": "Humeur et stress",
          "questions": [
            "Le stress, l'anxiété ou la dépression pourraient-ils être liés à cela ?",
            "Comment différencier les causes physiques des causes émotionnelles ?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Ce que je peux faire",
          "questions": [
            "Quels changements dans l'alimentation, l'exercice ou le sommeil aideraient le plus ?",
            "De combien de sommeil ai-je besoin ?",
            "Quand devrais-je me sentir mieux, et quelle est notre prochaine étape si ce n'est pas le cas ?",
          ],
        },
      ],
    }
  ]
};

export default fr;
