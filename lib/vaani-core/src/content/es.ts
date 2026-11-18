import type { LanguageData } from "./types";
import { FEATURE_TRANSLATIONS } from "./feature-translations";

const es: LanguageData = {
  code: "es",
  label: "Español",
  ui: {
    ...FEATURE_TRANSLATIONS.es,
    appTitle: "Vaani",
    appSubtitle: "Encuentra tu voz en el consultorio médico.",
    heroHeading: "Prepárate para tu visita al médico",
    heroDescription:
      "Vaani te ayuda a preparar las preguntas — para que salgas de tu cita con respuestas, no con arrepentimientos.",
    tip: "Consejo: Marca cada pregunta que quieras hacer, aunque parezca pequeña. Tu médico está ahí para ayudarte.",
    conditionSelectLabel: "¿De qué te gustaría hablar con tu médico?",
    conditionSelectPlaceholder: "— Elige un tema —",
    printButton: "Imprimir esta página",
    downloadButton: "Descargar una copia",
    savedLocallyNotice: "Guardado solo en este dispositivo: descarga una copia para no perderla.",
    visitTypeLabel: "¿Es tu primera visita o una visita de seguimiento?",
    visitTypeFirst: "Primera visita",
    visitTypeFollowup: "Visita de seguimiento",
    followupCategory: {
      id: "followup-visit",
      title: "Desde mi última visita",
      questions: [
        "¿Cómo ha cambiado mi condición desde mi última visita?",
        "¿Qué mostraron mis últimos análisis o resultados de laboratorio?",
        "¿Mis medicamentos actuales siguen funcionando — debería cambiar algo?",
        "¿Hay efectos secundarios que deba seguir vigilando?",
        "¿Necesitamos ajustar mi plan de tratamiento?",
        "¿Qué debo hacer o anotar antes de mi próxima visita?",
      ],
    },
    uploadTitle: "Añade preguntas a partir de tu laboratorio o informe médico",
    uploadHint: "Sube una foto o PDF de tu informe más reciente. Se envía de forma segura a nuestro servidor y a Google Gemini (un servicio de IA) para sugerir preguntas. Vaani no lo guarda.",
    uploadButton: "Subir informe",
    uploadChooseAnother: "Elegir otro archivo",
    uploadAnalyzing: "Leyendo tu informe…",
    uploadError: "No se pudo leer ese archivo. Intenta con una foto clara o un PDF.",
    uploadTooLarge: "Ese archivo es demasiado grande. Usa uno de menos de 8 MB.",
    resetButton: "Reiniciar / comenzar de nuevo",
    resetConfirmText: "Esto borrará todas tus marcas, notas y preguntas personalizadas.",
    resetConfirmYes: "Sí, reiniciar",
    resetConfirmCancel: "Cancelar",
    notesLabel: "Lo que me dijo mi médico",
    notesPlaceholder: "Escribe notas aquí durante o después de tu visita…",
    yourQuestionsTitle: "Tus preguntas",
    yourQuestionsPlaceholder: "Añade tu propia pregunta…",
    yourQuestionsAdd: "Añadir",
    disclaimer:
      "Esta herramienta te ayuda a preparar preguntas — no es consejo médico. Sigue siempre las indicaciones de tu médico.",
    questionsSoonTitle: "Preguntas próximamente",
    questionsSoonDesc:
      "Se están añadiendo preguntas generales para este tema. Usa el campo a continuación para añadir tus propias preguntas ahora.",
    ckdStageLabel: "Mi etapa de ERC",
    ckdStagePlaceholder: "— Selecciona etapa —",
    ckdStageOptional: "(opcional)",
    ckdStageNotes: {
      "stage-1":
        "Etapa 1 (eGFR ≥ 90): Daño renal presente pero la función es normal o alta. El enfoque es proteger los riñones.",
      "stage-2":
        "Etapa 2 (eGFR 60–89): Disminución leve. Enfoque en ralentizar la progresión.",
      "stage-3":
        "Etapa 3 (eGFR 30–59): Disminución moderada. El manejo de complicaciones es importante.",
      "stage-4":
        "Etapa 4 (eGFR 15–29): Disminución severa. Momento de planificar la terapia de reemplazo renal.",
      "stage-5":
        "Etapa 5 (eGFR < 15): Insuficiencia renal. Generalmente se necesita diálisis o trasplante.",
      "not-sure": "¿No sabes tu etapa? Pide a tu médico tu número de eGFR.",
    },
    transplantLabel: "Me interesa o estoy siendo evaluado/a para un trasplante de riñón.",
    transplantSubLabel: "Esto añade preguntas específicas sobre trasplante.",
    cancerSubtypeLabel: "¿Qué tipo de cáncer?",
    cancerSubtypeOptional: "(opcional — añade preguntas específicas)",
    cancerSubtypePlaceholder: "— Selecciona tipo —",
    aiPanelHeading: "Añadir preguntas para mi situación",
    aiPanelLabel: "Describe tu situación y síntomas con tus propias palabras",
    aiPanelPlaceholder:
      'Por ejemplo: "Tengo 62 años, me acaban de diagnosticar {condition} y quiero entender mis opciones de tratamiento."',
    aiPanelButton: "Sugerirme preguntas",
    aiPanelLoading: "Pensando…",
    aiPanelDisclaimer:
      "Su descripción se envía de forma segura a nuestro servidor y es procesada por un servicio de IA para crear sugerencias; no se almacena. Las preguntas sugeridas por la IA son solo para iniciar una conversación, no son consejos médicos.",
    aiPanelError:
      "Algo salió mal. Por favor intenta de nuevo en un momento.",
    safetyNoticeTitle: "¿Necesitas ayuda ahora mismo?",
    safetyNoticeLine988:
      "Si estás en crisis o pensando en hacerte daño, mereces ayuda ahora mismo. En EE.UU., llama o envía un mensaje al 988 (Línea de Crisis de Suicidio).",
    safetyNoticeInternational:
      "Los recursos de crisis varían según el país — busca la línea de crisis de tu región.",
    permissionDeniedTitle: "Se necesita permiso",
    permissionDeniedMessage: "Vaani no tiene acceso. Permítelo en los Ajustes de tu dispositivo para usar esta función.",
    openSettings: "Abrir Ajustes",
    languageLabel: "Idioma",
    aboutArticleLabel: "Lea sobre esta condición:",
    addTopicButton: "Añade tu tema si no lo encuentras arriba",
    addTopicPlaceholder: "Escribe tu tema (por ejemplo: dolor de rodilla)…",
    addTopicSave: "Añadir tema",
    sourcesTitle: "Fuentes y referencias médicas",
    sourcesIntro:
      "Las preguntas e información de esta aplicación se basan en la guía de estas organizaciones de salud confiables. Toca una fuente para saber más:",
  },
  conditions: [
    {
      id: "diabetes",
      label: "Diabetes",
      categories: [
        {
          id: "understanding",
          title: "Entenderla",
          questions: [
            "¿Qué tipo tengo?",
            "¿Cuáles fueron mis números clave (A1C, glucosa en ayunas)?",
            "¿Cuál es mi objetivo de A1C?",
            "¿Se puede controlar o revertir?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué medicamento necesito y cómo funciona?",
            "¿Necesitaré insulina?",
            "¿Qué efectos secundarios debo vigilar?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoreo",
          questions: [
            "¿Con qué frecuencia debo revisar mi azúcar en sangre?",
            "¿Debo usar un MCG?",
            "¿Cuándo revisamos mi A1C de nuevo?",
          ],
        },
        {
          id: "lifestyle",
          title: "Estilo de vida",
          questions: [
            "¿Qué cambios de dieta ayudan más?",
            "¿Cuánto ejercicio se recomienda?",
            "¿Cómo afecta mi peso a esto?",
          ],
        },
        {
          id: "followup",
          title: "Seguimiento y complicaciones",
          questions: [
            "¿Cómo afecta esto a mis ojos, riñones, pies y corazón?",
            "¿Qué exámenes necesito y cuándo?",
            "¿Cuándo es mi próxima visita?",
          ],
        },
      ],
    },
    {
      id: "high-blood-pressure",
      label: "Presión arterial alta",
      categories: [
        {
          id: "understanding",
          title: "Entenderla",
          questions: [
            "¿Cuáles fueron mis números y cuál es mi objetivo?",
            "¿Qué la está causando probablemente?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué medicamento y por qué?",
            "¿Cuáles son los efectos secundarios?",
            "¿Puedo intentar cambios de estilo de vida primero?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoreo",
          questions: [
            "¿Debo revisarla en casa y con qué frecuencia?",
            "¿Qué lecturas me deben preocupar?",
          ],
        },
        {
          id: "lifestyle",
          title: "Estilo de vida",
          questions: [
            "¿Qué pasa con la sal, el alcohol, el ejercicio, el peso y el estrés?",
          ],
        },
        {
          id: "followup",
          title: "Seguimiento",
          questions: [
            "¿Cuándo revisamos de nuevo?",
            "¿Qué órganos están en riesgo si no se controla?",
          ],
        },
      ],
    },
    {
      id: "skin-rash",
      label: "Sarpullido en la piel",
      categories: [
        {
          id: "what-is-it",
          title: "¿Qué es?",
          questions: [
            "¿Cuál es la causa probable?",
            "¿Es contagioso o alérgico?",
            "¿Necesito un análisis o biopsia?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué crema o medicamento y por cuánto tiempo?",
            "¿Qué pasa si no desaparece?",
          ],
        },
        {
          id: "triggers",
          title: "Desencadenantes",
          questions: ["¿Qué productos, alimentos o actividades debo evitar?"],
        },
        {
          id: "when-to-worry",
          title: "Cuándo preocuparse",
          questions: [
            "¿Qué signos indican que está empeorando?",
            "¿Cuándo debo regresar o ir a urgencias?",
          ],
        },
      ],
    },
    {
      id: "skin-bump-lump",
      label: "Bulto o protuberancia en la piel",
      categories: [
        {
          id: "what-is-it",
          title: "¿Qué es?",
          questions: [
            "¿Qué cree que es esto?",
            "¿Necesitamos una biopsia o imagen?",
            "¿Podría ser cáncer?",
          ],
        },
        {
          id: "options",
          title: "Opciones",
          questions: [
            "¿Se debe extraer?",
            "¿Cuáles son los riesgos de extraerlo vs. vigilarlo?",
          ],
        },
        {
          id: "changes",
          title: "Cambios",
          questions: [
            "¿Qué tan rápido podría cambiar?",
            "¿Qué signos significan que debo regresar urgentemente?",
          ],
        },
        {
          id: "followup",
          title: "Seguimiento",
          questions: ["¿Cuándo debemos revisarlo de nuevo?"],
        },
      ],
    },
    {
      id: "cancer",
      label: "Cáncer",
      categories: [
        {
          id: "diagnosis",
          title: "Diagnóstico",
          questions: [
            "¿Qué tipo y etapa es?",
            "¿Qué pruebas lo confirmaron?",
            "¿Dónde está y se ha extendido?",
          ],
        },
        {
          id: "treatment-options",
          title: "Opciones de tratamiento",
          questions: [
            "¿Cuáles son TODAS mis opciones (cirugía, quimio, radioterapia, inmunoterapia, terapia dirigida, vigilancia)?",
            "¿Qué recomienda y por qué?",
            "¿El objetivo es curarlo o controlarlo?",
          ],
        },
        {
          id: "side-effects",
          title: "Efectos secundarios",
          questions: [
            "¿Cuáles son los efectos secundarios de cada opción?",
            "¿Afectará la fertilidad?",
            "¿Hay efectos a largo plazo?",
          ],
        },
        {
          id: "logistics",
          title: "Logística",
          questions: [
            "¿Cuánto dura el tratamiento?",
            "¿Cómo afectará el trabajo y la vida diaria?",
            "¿Qué pasa con los costos y el seguro?",
            "¿Cómo obtengo una segunda opinión?",
          ],
        },
        {
          id: "support",
          title: "Apoyo",
          questions: [
            "¿Hay ensayos clínicos?",
            "¿Puedo ver cuidados paliativos para el manejo de síntomas?",
            "¿Hay grupos de apoyo?",
            "¿Quién es mi principal punto de contacto?",
          ],
        },
        {
          id: "followup",
          title: "Seguimiento",
          questions: [
            "¿Cómo sabremos que está funcionando?",
            "¿Cuál es el calendario de exámenes?",
            "¿Cuáles son los signos de recurrencia?",
          ],
        },
      ],
      subtypes: [
        {
          id: "breast",
          label: "Mama",
          categories: [
            {
              id: "breast-specific",
              title: "Cáncer de mama — preguntas específicas",
              questions: [
                "¿Debo hacerme pruebas genéticas (BRCA1/BRCA2), y cambiaría mi tratamiento o el cribado de mi familia?",
                "¿Cuál es mi estado de receptor hormonal (ER/PR) y HER2, y qué significa para mí?",
                "¿Cuáles son mis opciones de cirugía (tumorectomía vs. mastectomía) y reconstrucción?",
                "¿Necesitaré quimio, radioterapia u hormonoterapia, y en qué orden?",
                "¿Cómo afectará el tratamiento a la fertilidad, y puedo preservar opciones antes de comenzar?",
              ],
            },
          ],
        },
        {
          id: "lung",
          label: "Pulmón",
          categories: [
            {
              id: "lung-specific",
              title: "Cáncer de pulmón — preguntas específicas",
              questions: [
                "¿Fue causado por fumar, y eso cambia el tratamiento?",
                "¿Qué muestran las pruebas de mutación?",
                "¿Soy candidato/a para cirugía?",
              ],
            },
          ],
        },
        {
          id: "colorectal",
          label: "Colorrectal",
          categories: [
            {
              id: "colorectal-specific",
              title: "Cáncer colorrectal — preguntas específicas",
              questions: [
                "¿Necesito una colostomía?",
                "¿Se analizó el tumor para marcadores genéticos?",
                "¿Qué pasa con el calendario de cribado de mi familia?",
              ],
            },
          ],
        },
        {
          id: "prostate",
          label: "Próstata",
          categories: [
            {
              id: "prostate-specific",
              title: "Cáncer de próstata — preguntas específicas",
              questions: [
                "¿Cuál es mi puntuación Gleason y PSA?",
                "¿La vigilancia activa es una opción para mí?",
                "¿Cómo afectará el tratamiento a la función urinaria y sexual?",
              ],
            },
          ],
        },
        {
          id: "melanoma",
          label: "Piel / Melanoma",
          categories: [
            {
              id: "melanoma-specific",
              title: "Piel / Melanoma — preguntas específicas",
              questions: [
                "¿Qué tan profundo es?",
                "¿Necesitamos revisar mis ganglios linfáticos?",
                "¿Con qué frecuencia debo hacerme revisiones completas de la piel?",
              ],
            },
          ],
        },
        {
          id: "cervical",
          label: "Cuello uterino",
          categories: [
            {
              id: "cervical-specific",
              title: "Cáncer cervical — preguntas específicas",
              questions: [
                "¿Qué etapa y estado de VPH?",
                "¿Cómo afectará el tratamiento a la fertilidad?",
                "¿Qué calendario de seguimiento con Papanicolaou/VPH debo seguir?",
              ],
            },
          ],
        },
        {
          id: "leukemia",
          label: "Leucemia",
          categories: [
            {
              id: "leukemia-specific",
              title: "Leucemia — preguntas específicas",
              questions: [
                "¿Qué tipo (aguda o crónica)?",
                "¿Necesito tratamiento ahora o solo monitoreo?",
                "¿Necesitaré un trasplante de médula ósea?",
              ],
            },
          ],
        },
        {
          id: "lymphoma",
          label: "Linfoma",
          categories: [
            {
              id: "lymphoma-specific",
              title: "Linfoma — preguntas específicas",
              questions: [
                "¿Hodgkin o no Hodgkin, y qué subtipo?",
                "¿Cuál es el plan de tratamiento y el cronograma?",
                "¿Cuáles son los efectos a largo plazo del tratamiento?",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "ckd",
      label: "Enfermedad renal crónica (ERC)",
      categories: [
        {
          id: "diagnosis-stage",
          title: "Mi diagnóstico y etapa",
          questions: [
            "¿En qué etapa estoy y cuál es mi eGFR?",
            "¿Cuál es mi albúmina en orina (ICA)?",
            "¿Qué causó mi ERC?",
            "¿Es probable que empeore, y qué tan rápido?",
          ],
        },
        {
          id: "protecting-kidneys",
          title: "Proteger mis riñones",
          questions: [
            "¿Cuál es mi objetivo de presión arterial?",
            "¿Debo tomar un inhibidor de la ECA, ARA-II o un inhibidor SGLT2?",
            "¿Qué medicamentos o suplementos debo evitar (por ejemplo, AINEs como el ibuprofeno)?",
            "Si tengo diabetes, ¿cuál es mi objetivo de azúcar en sangre?",
          ],
        },
        {
          id: "diet-lifestyle",
          title: "Dieta y estilo de vida",
          questions: [
            "¿Puedo ver a un dietista renal?",
            "¿Cuánta proteína, sodio, potasio y fósforo es adecuado para mí?",
            "¿Hay límites de líquidos que deba seguir?",
            "¿Qué suplementos son seguros?",
            "¿Qué pasa con el ejercicio?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoreo",
          questions: [
            "¿Con qué frecuencia revisaremos mis análisis y eGFR?",
            "¿Qué números debo monitorear yo mismo/a?",
            "¿Qué cambios le preocuparían?",
          ],
        },
        {
          id: "medications",
          title: "Mis medicamentos",
          questions: [
            "¿Alguno de mis medicamentos actuales necesita ajuste de dosis para mis riñones?",
            "¿Debo empezar o dejar algo?",
          ],
        },
        {
          id: "planning-ahead",
          title: "Planificar con anticipación",
          questions: [
            "¿En qué punto hablamos de diálisis o trasplante?",
            "¿Cuáles son todas mis opciones (hemodiálisis, diálisis peritoneal, trasplante, cuidado conservador)?",
            '¿Podría evitar la diálisis con un trasplante temprano ("preventivo")?',
          ],
        },
        {
          id: "emotional-practical",
          title: "Aspectos emocionales y prácticos",
          questions: [
            "¿Cómo podría afectar esto mi energía y mi trabajo?",
            "¿Hay apoyo de salud mental disponible?",
            "¿Hay grupos de apoyo u organizaciones renales que recomiende?",
            "¿Dónde puedo obtener ayuda con el seguro y los costos?",
          ],
        },
        {
          id: "red-flags",
          title: "Señales de alerta",
          questions: ["¿Qué síntomas significan que debo llamarle o ir a urgencias?"],
        },
      ],
      extraCategories: [
        {
          id: "transplant",
          triggerLabel: "Me interesa o estoy siendo evaluado/a para un trasplante de riñón.",
          categories: [
            {
              id: "transplant-eval",
              title: "Evaluación de trasplante",
              questions: [
                "¿Soy candidato/a para un trasplante de riñón?",
                "¿Cómo y cuándo me refieren a un centro de trasplantes?",
                "¿Puedo ser evaluado/a antes de necesitar diálisis (trasplante preventivo)?",
                "¿Cuál es la diferencia entre un donante vivo y uno fallecido para mí?",
                "¿Cómo encuentro un donante vivo — y está bien pedirlo a familiares o amigos?",
                "¿Qué pruebas implica la evaluación y cuánto tiempo tarda todo el proceso?",
                "¿Qué podría hacerme inelegible, y hay cosas que pueda trabajar o corregir?",
                "¿Podemos iniciar el proceso de evaluación ahora?",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "thyroid",
      label: "Problema de tiroides",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Mi tiroides está hiperactiva o hipoactiva?",
            "¿Cuáles fueron mis niveles de TSH, T3 y T4?",
            "¿Qué lo causó (por ejemplo, Hashimoto o Graves)?",
            "¿Es permanente?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué medicamento necesito y a qué dosis?",
            "¿Cuánto tiempo hasta que me sienta mejor?",
            "¿Qué pasa si sigo sintiéndome mal después de empezarlo?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoreo",
          questions: [
            "¿Con qué frecuencia revisamos mis niveles?",
            "¿Qué síntomas indican que mi dosis está mal?",
          ],
        },
        {
          id: "daily-life",
          title: "Vida diaria",
          questions: [
            "¿Cómo debo tomar mi medicamento (horario, comida, otros medicamentos)?",
            "¿Esto afecta mi peso, energía, estado de ánimo, cabello o períodos?",
            "¿Afecta el embarazo o la fertilidad?",
          ],
        },
        {
          id: "followup",
          title: "Seguimiento",
          questions: ["¿Cuándo es mi próximo análisis de sangre y visita?"],
        },
      ],
    },
    {
      id: "pcos-gyn",
      label: "SOP / ginecológico",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Qué está causando mis síntomas?",
            "¿Qué pruebas lo confirman (hormonas, ultrasonido)?",
          ],
        },
        {
          id: "symptoms-treatment",
          title: "Síntomas y tratamiento",
          questions: [
            "¿Cuáles son mis opciones para períodos irregulares, acné o vello no deseado?",
            "¿Necesito anticonceptivos, metformina u otra cosa?",
            "¿Cuáles son los efectos secundarios?",
          ],
        },
        {
          id: "fertility",
          title: "Fertilidad",
          questions: [
            "¿Cómo afecta esto mi capacidad de quedar embarazada?",
            "¿Qué puede ayudar si quiero concebir — ahora o después?",
          ],
        },
        {
          id: "long-term-health",
          title: "Salud a largo plazo",
          questions: [
            "¿Cuál es mi riesgo de diabetes, problemas cardíacos u otros, y cómo los vigilamos?",
          ],
        },
        {
          id: "lifestyle",
          title: "Estilo de vida",
          questions: [
            "¿Los cambios en dieta, peso o ejercicio ayudan, y cuánto?",
          ],
        },
        {
          id: "general-gyn",
          title: "Visita ginecológica general",
          questions: [
            "¿Necesito un Papanicolaou o prueba de VPH, y cuándo?",
            "¿Este sangrado / dolor / secreción es normal?",
            "¿Cuándo debo regresar?",
          ],
        },
        {
          id: "followup",
          title: "Seguimiento y segundas opiniones",
          questions: [
            "¿Cuándo revisamos de nuevo?",
            "¿Cómo obtengo una derivación si la quiero?",
          ],
        },
      ],
    },
    {
      id: "mental-health",
      label: "Salud mental (depresión / ansiedad)",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Qué cree que está pasando?",
            "¿Podría algo físico (tiroides, vitaminas, sueño, medicamentos) estar contribuyendo?",
          ],
        },
        {
          id: "options",
          title: "Opciones",
          questions: [
            "¿Cuáles son mis opciones de tratamiento — terapia, medicación o ambas?",
            "¿Qué recomienda y por qué?",
            "¿Cuánto tiempo hasta que pueda sentir una diferencia?",
          ],
        },
        {
          id: "medication",
          title: "Medicación",
          questions: [
            "¿Cuáles son los efectos secundarios?",
            "¿Crea dependencia?",
            "¿Qué pasa si el primero no funciona?",
            "¿Cómo y cuándo la dejaría de forma segura?",
          ],
        },
        {
          id: "therapy-support",
          title: "Terapia y apoyo",
          questions: [
            "¿Qué tipo de terapia me conviene y cómo encuentro a alguien?",
            "¿Hay grupos de apoyo u opciones de bajo costo?",
          ],
        },
        {
          id: "daily-followup",
          title: "Vida diaria y seguimiento",
          questions: [
            "¿Qué puedo hacer día a día?",
            "¿Cuándo debemos hacer un seguimiento?",
            "¿A quién contacto si las cosas empeoran antes de entonces?",
          ],
        },
      ],
    },
    {
      id: "liver-disease",
      label: "Enfermedad Hepática",
      categories: [
        {
          id: "understanding",
          title: "Entendiendo la enfermedad",
          questions: [
            "¿Qué tipo de enfermedad hepática tengo — hígado graso, hepatitis, cirrosis u otra cosa?",
            "¿Cuál fue la causa y se puede tratar?",
            "¿En qué etapa o nivel de daño está mi hígado?",
            "¿Mi hígado todavía funciona con normalidad?",
            "¿Puede mejorar, o es probable que empeore con el tiempo?",
            "¿Debería ver a un especialista del hígado (hepatólogo)?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento y medicamentos",
          questions: [
            "¿Necesito medicamentos y cuáles son los efectos secundarios?",
            "¿Hay tratamientos que puedan frenar o revertir el daño?",
            "¿Necesitaré algún procedimiento, como una biopsia de hígado o endoscopia?",
            "¿Hay ensayos clínicos o tratamientos más nuevos que deba conocer?",
            "Si mi hígado empeora, ¿qué opciones tengo — incluyendo trasplante?",
          ],
        },
        {
          id: "lifestyle",
          title: "Estilo de vida y dieta",
          questions: [
            "¿Debo dejar de beber alcohol por completo?",
            "¿Hay alimentos que deba comer más o evitar?",
            "¿Bajar de peso ayudaría a mi hígado y cuánto?",
            "¿Es seguro tomar Tylenol, ibuprofeno u otros analgésicos de venta libre?",
            "¿Qué vitaminas o suplementos son seguros — y cuáles debo evitar?",
            "¿El ejercicio es seguro y beneficioso para mí ahora?",
          ],
        },
        {
          id: "monitoring",
          title: "Seguimiento y pruebas",
          questions: [
            "¿Qué análisis de sangre necesito y con qué frecuencia?",
            "¿Necesito imágenes como ecografía, TAC o resonancia, y con qué frecuencia?",
            "¿Debo hacerme pruebas para detectar cáncer de hígado?",
            "¿Cómo sabremos si mi condición mejora o empeora?",
            "¿Hay vacunas que deba recibir para proteger mi hígado (hepatitis A, hepatitis B)?",
          ],
        },
        {
          id: "warning-signs",
          title: "Señales de alarma",
          questions: [
            "¿Qué síntomas deben llevarme a urgencias de inmediato?",
            "¿Qué debo vigilar en casa y reportarle con urgencia?",
            "Si mi abdomen se hincha o mi piel se vuelve amarilla, ¿qué hago?",
            "¿Deberían hacerse pruebas mis familiares — ¿es hereditario o contagioso?",
          ],
        },
      ],
    },
    {
      id: "heart-disease",
      label: "Enfermedad Cardíaca / Cardiovascular",
      categories: [
        {
          id: "understanding",
          title: "Entendiendo la enfermedad",
          questions: [
            "¿Qué tipo de enfermedad cardíaca tengo exactamente?",
            "¿Qué tan grave es y qué significa para mi vida diaria?",
            "¿Cuál fue la causa — genética, estilo de vida, u otra cosa?",
            "¿Qué tan bien está bombeando mi corazón ahora (fracción de eyección u otras medidas)?",
            "¿Debería ver a un cardiólogo o especialista del corazón?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento y medicamentos",
          questions: [
            "¿Qué medicamentos necesito y cuáles son los efectos secundarios?",
            "¿Necesitaré un procedimiento — como un stent, cirugía de bypass o marcapasos?",
            "¿Cómo sabré si mis medicamentos están funcionando?",
            "¿Qué pasa si olvido una dosis de mi medicamento para el corazón?",
            "¿Hay ensayos clínicos o tratamientos más nuevos que deba conocer?",
          ],
        },
        {
          id: "lifestyle",
          title: "Estilo de vida y dieta",
          questions: [
            "¿Qué cambios en la dieta ayudarán más a mi corazón?",
            "¿Cuánta sal y alcohol es seguro consumir?",
            "¿Cuánto ejercicio es seguro para mí y de qué tipo?",
            "¿Cómo afecta el estrés a mi corazón y qué puedo hacer al respecto?",
            "¿Debería dejar de fumar y qué ayuda está disponible?",
            "¿Es seguro tener actividad sexual?",
          ],
        },
        {
          id: "monitoring",
          title: "Seguimiento y pruebas",
          questions: [
            "¿Qué pruebas necesito — electrocardiograma, ecocardiograma, prueba de esfuerzo — y con qué frecuencia?",
            "¿Qué números debo controlar en casa (presión arterial, frecuencia cardíaca, peso)?",
            "¿Cuáles son mis valores objetivo de colesterol, presión arterial y frecuencia cardíaca?",
            "¿Cómo sabremos si mi condición mejora o empeora?",
          ],
        },
        {
          id: "warning-signs",
          title: "Señales de alarma",
          questions: [
            "¿Qué síntomas significan que debo llamar al 911 de inmediato?",
            "¿Qué señales debo vigilar y reportarle con urgencia?",
            "¿Qué debo hacer si tengo dolor o presión en el pecho?",
            "¿Debería alguien en mi familia hacerse pruebas para detectar enfermedades del corazón?",
          ],
        },
      ],
    },
    {
      id: "joint-pain-arthritis",
      label: "Dolor Articular / Artritis",
      categories: [
        {
          id: "understanding",
          title: "Entendiendo la enfermedad",
          questions: [
            "¿Qué tipo de artritis tengo — osteoartritis, artritis reumatoide, psoriásica, gota, u otra?",
            "¿Qué está causando el daño articular en mi caso?",
            "¿Qué articulaciones están afectadas ahora y es probable que se extienda?",
            "¿Cómo sé si el daño en mis articulaciones está empeorando?",
            "¿Debería ver a un reumatólogo o especialista en ortopedia?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento y medicamentos",
          questions: [
            "¿Qué medicamentos necesito — antiinflamatorios, esteroides, DMARDs o biológicos?",
            "¿Cuáles son los efectos secundarios y por cuánto tiempo los necesito?",
            "¿Me recomienda fisioterapia o terapia ocupacional?",
            "¿Una inyección articular me ayudaría y con qué frecuencia puedo recibirla?",
            "¿En qué punto se consideraría una cirugía o reemplazo articular?",
          ],
        },
        {
          id: "flares",
          title: "Manejo de brotes y dolor",
          questions: [
            "¿Qué puedo hacer en casa cuando mis articulaciones tienen un brote?",
            "¿Es mejor el calor o el hielo para mi dolor?",
            "¿Hay férulas, ortesis o dispositivos de asistencia que puedan ayudarme?",
            "¿Qué actividades debo evitar para proteger mis articulaciones?",
            "¿Cuándo debo llamarle durante un brote en vez de manejarlo en casa?",
          ],
        },
        {
          id: "lifestyle",
          title: "Estilo de vida y dieta",
          questions: [
            "¿Hay alimentos que reduzcan la inflamación — o que la empeoren?",
            "¿Cuánto ejercicio es seguro y qué tipos son mejores para mis articulaciones?",
            "¿Bajar de peso ayudaría a reducir el dolor articular y cuánto?",
            "¿Algún suplemento puede ser útil — como aceite de pescado, cúrcuma o glucosamina?",
          ],
        },
        {
          id: "monitoring",
          title: "Seguimiento y pruebas",
          questions: [
            "¿Qué análisis de sangre o imágenes necesito y con qué frecuencia?",
            "¿Cómo mediremos si mi tratamiento está funcionando?",
            "¿Qué efectos secundarios de mis medicamentos debo vigilar y reportar?",
            "¿Con qué frecuencia debo venir a revisión?",
          ],
        },
      ],
    },
    {
      id: "asthma",
      label: "Asma",
      subtypeLabel: "¿Qué tipo de asma?",
      categories: [
        {
          id: "understanding",
          title: "Entenderla",
          questions: [
            "¿Qué tipo de asma tengo?",
            "¿Qué está desencadenando mi asma?",
            "¿Mi asma es leve, moderada o grave?",
            "¿Mi asma está bien controlada ahora mismo?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento e inhaladores",
          questions: [
            "¿Cuál es la diferencia entre mi inhalador de control y el de rescate?",
            "¿Puede observar cómo uso mi inhalador para revisar mi técnica?",
            "¿Con qué frecuencia es seguro usar mi inhalador de rescate?",
            "¿Necesito un espaciador, y qué efectos secundarios debo esperar?",
          ],
        },
        {
          id: "monitoring",
          title: "Monitoreo y plan de acción",
          questions: [
            "¿Debo medir mi flujo máximo (peak flow) en casa?",
            "¿Cómo sé si mi asma está empeorando?",
            "¿Cuándo debo usar mi plan de acción, llamarle a usted o ir a urgencias?",
            "¿Con qué frecuencia debo venir a revisión?",
          ],
        },
        {
          id: "triggers-lifestyle",
          title: "Desencadenantes y vida diaria",
          questions: [
            "¿Cómo puedo reducir los desencadenantes en casa y en el trabajo?",
            "¿Es seguro hacer ejercicio, y cómo prevengo los ataques?",
            "¿Qué vacunas necesito (gripe, neumonía, COVID)?",
            "¿Fumar o vapear afecta mi asma?",
          ],
        },
      ],
      subtypes: [
        {
          id: "allergic",
          label: "Alérgica (extrínseca)",
          categories: [
            {
              id: "allergic-specific",
              title: "Asma alérgica — preguntas específicas",
              questions: [
                "¿Debo hacerme pruebas de alergia?",
                "¿Me ayudarían los medicamentos para la alergia o la inmunoterapia?",
                "¿Qué alérgenos debo evitar más?",
              ],
            },
          ],
        },
        {
          id: "non-allergic",
          label: "No alérgica (intrínseca)",
          categories: [
            {
              id: "non-allergic-specific",
              title: "Asma no alérgica — preguntas específicas",
              questions: [
                "¿Qué desencadena mi asma si no son las alergias?",
                "¿Pueden las infecciones, el aire frío o el estrés provocar mis ataques?",
                "¿Qué puedo hacer respecto a los desencadenantes no alérgicos?",
              ],
            },
          ],
        },
        {
          id: "exercise-induced",
          label: "Inducida por el ejercicio",
          categories: [
            {
              id: "exercise-specific",
              title: "Asma inducida por el ejercicio — preguntas específicas",
              questions: [
                "¿Qué debo hacer antes de hacer ejercicio para prevenir los síntomas?",
                "¿Debo usar mi inhalador antes de entrenar?",
                "¿Qué deportes o actividades son más seguros para mí?",
              ],
            },
          ],
        },
        {
          id: "cough-variant",
          label: "Variante con tos",
          categories: [
            {
              id: "cough-specific",
              title: "Asma variante con tos — preguntas específicas",
              questions: [
                "¿Podría mi tos prolongada ser asma?",
                "¿Qué tratamiento ayuda con el asma variante con tos?",
                "¿Cuánto tiempo hasta que mejore la tos?",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sciatica",
      label: "Ciática / dolor nervioso",
      categories: [
        {
          id: "understanding",
          title: "Entenderla",
          questions: [
            "¿Qué está causando mi ciática?",
            "¿Qué nervio o disco está afectado?",
            "¿Es probable que mejore por sí sola?",
            "¿Cuánto suele tardar la recuperación?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué puedo hacer en casa para aliviar el dolor?",
            "¿Qué analgésicos son seguros para mí, y por cuánto tiempo?",
            "¿Me ayudaría la fisioterapia?",
            "¿Necesito una inyección o cirugía — y si es cirugía, cuál es su tasa de éxito?",
          ],
        },
        {
          id: "activity",
          title: "Actividad y recuperación",
          questions: [
            "¿Qué movimientos o posiciones debo evitar?",
            "¿Es mejor descansar o mantenerme activo/a?",
            "¿Hay estiramientos o ejercicios que ayuden?",
            "¿Cuándo puedo volver al trabajo o a mi actividad normal?",
          ],
        },
        {
          id: "warning-signs",
          title: "Señales de alarma y pruebas",
          questions: [
            "¿Qué síntomas significan que debo llamarle de inmediato?",
            "¿El entumecimiento, la debilidad o la pérdida del control de la vejiga son una emergencia?",
            "¿Qué imágenes o pruebas necesito?",
          ],
        },
      ],
    },
    {
      id: "psoriasis-eczema",
      label: "Psoriasis / eczema",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Esto es psoriasis, eczema u otra cosa?",
            "¿Qué está provocando mis brotes?",
            "¿Es una condición de por vida?",
            "¿Es contagioso?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué cremas o ungüentos debo usar, y cómo?",
            "¿Hay tratamientos más fuertes (fototerapia, pastillas, biológicos) para mí?",
            "¿Cuánto tiempo hasta que vea mejoría?",
            "¿Qué efectos secundarios debo esperar de mi tratamiento?",
          ],
        },
        {
          id: "daily-care",
          title: "Cuidado diario de la piel",
          questions: [
            "¿Qué rutina y productos para el cuidado de la piel recomienda?",
            "¿Qué jabones, telas o alimentos debo evitar?",
            "¿Cómo cuido mi piel durante un brote?",
            "¿Cómo puedo reducir la picazón?",
          ],
        },
        {
          id: "broader-health",
          title: "Salud en general",
          questions: [
            "¿Mi condición de la piel está relacionada con algo más (articulaciones, corazón, estado de ánimo)?",
            "¿Debo ver a un especialista?",
            "¿Cómo seguiremos si el tratamiento está funcionando?",
          ],
        },
      ],
    },
    {
      id: "gerd",
      label: "Reflujo ácido / ERGE",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Qué está causando mi reflujo ácido?",
            "¿Es ERGE, y podría dañar mi esófago?",
            "¿Necesito alguna prueba, como una endoscopia?",
            "¿Es una condición de largo plazo?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué medicamento es adecuado para mí, y por cuánto tiempo?",
            "¿Hay riesgos al tomar reductores de ácido por mucho tiempo?",
            "¿Qué puedo hacer si el medicamento no es suficiente?",
            "Si se sugiere cirugía, ¿cuál es su tasa de éxito y cuáles son los riesgos?",
          ],
        },
        {
          id: "diet-lifestyle",
          title: "Dieta y estilo de vida",
          questions: [
            "¿Qué alimentos y bebidas debo evitar?",
            "¿Cómo afectan el horario de las comidas y el tamaño de las porciones al reflujo?",
            "¿Ayudaría bajar de peso o elevar la cabecera de mi cama?",
            "¿Fumar o el alcohol lo empeoran?",
          ],
        },
        {
          id: "warning-signs",
          title: "Señales de alarma",
          questions: [
            "¿Qué síntomas significan que debo ser atendido/a pronto (dificultad para tragar, pérdida de peso, vómito con sangre)?",
            "¿Podrían mis síntomas ser algo distinto al reflujo?",
            "¿Con qué frecuencia debo hacer seguimiento?",
          ],
        },
      ],
    },
    {
      id: "infertility",
      label: "Infertilidad / intentando concebir",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Qué pruebas necesitamos ambos para encontrar la causa?",
            "¿Qué podría estar dificultando concebir?",
            "¿Cómo afectan mi edad y mi salud nuestras probabilidades?",
            "¿Cuánto tiempo debemos seguir intentándolo antes de hacer más pruebas?",
          ],
        },
        {
          id: "treatment-options",
          title: "Opciones de tratamiento",
          questions: [
            "¿Cuáles son nuestras opciones, de la más simple a la más avanzada?",
            "¿Cuáles son las tasas de éxito para alguien como nosotros?",
            "¿Cuánto cuesta cada opción, y el seguro cubre algo?",
            "¿Cuáles son los riesgos y efectos secundarios de cada tratamiento?",
          ],
        },
        {
          id: "process",
          title: "El proceso",
          questions: [
            "¿Cuánto tiempo toma cada paso?",
            "¿Cuántos ciclos o intentos son típicos antes de cambiar de rumbo?",
            "¿Qué cambios en el estilo de vida podrían mejorar nuestras probabilidades?",
            "¿Debemos ver a un especialista en fertilidad?",
          ],
        },
        {
          id: "emotional-practical",
          title: "Aspectos emocionales y prácticos",
          questions: [
            "¿Qué apoyo hay disponible para el estrés de este proceso?",
            "¿Cuáles son nuestras opciones si el tratamiento no funciona?",
            "¿Cómo decidimos cuándo detenernos o cambiar de plan?",
          ],
        },
      ],
    },
    {
      id: "multiple-sclerosis",
      label: "Esclerosis múltiple (EM)",
      categories: [
        {
          id: "understanding",
          title: "Entenderla",
          questions: [
            "¿Qué tipo de EM tengo?",
            "¿Qué muestran mi resonancia magnética y mis resultados de pruebas?",
            "¿Cómo podría afectarme con el tiempo?",
            "¿Cuál es la diferencia entre un brote y la progresión?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué tratamiento modificador de la enfermedad es mejor para mí, y por qué?",
            "¿Cuáles son los beneficios y riesgos de este tratamiento?",
            "¿Cómo se trata un brote?",
            "¿Qué efectos secundarios debo esperar, y cómo sabremos si está funcionando?",
          ],
        },
        {
          id: "symptoms-daily",
          title: "Síntomas y vida diaria",
          questions: [
            "¿Cómo manejo la fatiga, el dolor u otros síntomas?",
            "¿Me ayudaría la fisioterapia o la terapia ocupacional?",
            "¿Cómo afectan el calor, el estrés o las infecciones a mi EM?",
            "¿Qué puedo hacer para mantenerme lo más activo/a posible?",
          ],
        },
        {
          id: "planning-monitoring",
          title: "Planificación y monitoreo",
          questions: [
            "¿Con qué frecuencia necesitaré resonancias magnéticas o chequeos?",
            "¿Qué síntomas deberían hacerme llamarle de inmediato?",
            "¿Cómo podría la EM afectar el trabajo, conducir o la planificación familiar?",
            "¿Qué servicios de apoyo tengo disponibles?",
          ],
        },
      ],
    },
    {
      id: "insomnia",
      label: "Insomnio / problemas de sueño",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Qué podría estar causando mis problemas de sueño?",
            "¿Podría una condición de salud o un medicamento estar manteniéndome despierto/a?",
            "¿Necesito un estudio del sueño?",
            "¿Cuántas horas de sueño debo procurar?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué cambios puedo intentar antes de usar medicamentos?",
            "¿Es una opción la terapia cognitivo-conductual para el insomnio (TCC-I)?",
            "Si necesito medicamento para dormir, ¿cuáles son los riesgos y efectos secundarios, y por cuánto tiempo debo tomarlo?",
            "¿Son seguros para mí los medicamentos para dormir de venta libre?",
          ],
        },
        {
          id: "habits",
          title: "Hábitos y rutina",
          questions: [
            "¿Qué hábitos diarios ayudan o perjudican mi sueño?",
            "¿Cómo afectan la cafeína, el alcohol y las pantallas mi sueño?",
            "¿Cómo debería ser una buena rutina antes de dormir?",
            "¿Está bien tomar siestas?",
          ],
        },
        {
          id: "followup",
          title: "Seguimiento",
          questions: [
            "¿Cómo mediremos si mi sueño está mejorando?",
            "¿Debo llevar un diario de sueño?",
            "¿Cuándo debo hacer seguimiento?",
          ],
        },
      ],
    },
    {
      id: "uti",
      label: "Infección del Tracto Urinario (ITU)",
      categories: [
        {
          id: "understanding",
          title: "Entendiéndola",
          questions: [
            "¿Es una infección de vejiga o podría afectar mis riñones?",
            "¿Qué causó esta infección?",
            "¿Por qué sigo teniendo ITUs?",
            "¿Necesito un urocultivo u otras pruebas?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué antibiótico voy a tomar y por cuántos días?",
            "¿Qué pasa si mis síntomas no mejoran en un par de días?",
            "¿A qué efectos secundarios debo prestar atención?",
            "¿Hay algo que pueda tomar para el ardor o el dolor?",
          ],
        },
        {
          id: "prevention",
          title: "Prevención",
          questions: [
            "¿Cómo puedo prevenir futuras ITUs?",
            "¿El jugo de arándano o un suplemento realmente ayudan?",
            "¿Cuánta agua debo beber cada día?",
            "¿Hay hábitos de higiene que debería cambiar?",
          ],
        },
        {
          id: "warning",
          title: "Cuándo preocuparse",
          questions: [
            "¿Qué síntomas indican que la infección está empeorando?",
            "¿Cuándo debo ir a un centro de atención de urgencias o a la sala de emergencias?",
            "¿Podría la fiebre o el dolor de espalda significar una infección renal?",
          ],
        },
      ],
    },
    {
      id: "urinary-incontinence",
      label: "Incontinencia Urinaria",
      categories: [
        {
          id: "understanding",
          title: "Entendiéndola",
          questions: [
            "¿Qué tipo de incontinencia tengo: de esfuerzo, de urgencia o mixta?",
            "¿Qué está causando mi escape de orina?",
            "¿Mis medicamentos podrían estar empeorando esto?",
            "¿Necesito alguna prueba, como una prueba de función vesical?",
          ],
        },
        {
          id: "treatment",
          title: "Opciones de tratamiento",
          questions: [
            "¿Los ejercicios del suelo pélvico (Kegel) pueden ayudarme, y cómo los hago correctamente?",
            "¿Ayudaría el entrenamiento de la vejiga o las visitas programadas al baño?",
            "¿Hay medicamentos para esto y cuáles son los efectos secundarios?",
            "¿Cuándo se consideraría una cirugía o un procedimiento?",
          ],
        },
        {
          id: "lifestyle",
          title: "Vida diaria",
          questions: [
            "¿Debería cambiar la cantidad o el momento en que bebo líquidos?",
            "¿La cafeína o el alcohol empeoran esto?",
            "¿Qué productos o protección recomienda?",
            "¿Puede la pérdida de peso mejorar mis síntomas?",
          ],
        },
        {
          id: "referral",
          title: "Especialistas",
          questions: [
            "¿Debería ver a un urólogo o uroginecólogo?",
            "¿Es un fisioterapeuta del suelo pélvico una opción para mí?",
          ],
        },
      ],
    },
    {
      id: "blood-in-urine",
      label: "Sangre en la orina",
      categories: [
        {
          id: "understanding",
          title: "Entenderlo",
          questions: [
            "¿Cuáles son las causas más probables de sangre en mi orina?",
            "¿Podría ser por una infección, un cálculo renal o algo más grave?",
            "¿Podría un medicamento o alimento estar causando el cambio de color?",
            "¿La cantidad de sangre está relacionada con la gravedad del problema?",
          ],
        },
        {
          id: "tests",
          title: "Pruebas",
          questions: [
            "¿Qué pruebas necesito: análisis de orina, estudios de imagen o una cistoscopia (examen de la vejiga)?",
            "¿Qué nos dirá cada prueba?",
            "¿Qué tan pronto se deben realizar estas pruebas?",
            "¿También revisará la función de mis riñones?",
          ],
        },
        {
          id: "nextsteps",
          title: "Próximos pasos",
          questions: [
            "¿Qué debo hacer si vuelvo a ver sangre antes de mis pruebas?",
            "¿Necesito ver a un urólogo o un especialista en riñones?",
            "¿Qué síntomas significan que debo buscar atención de inmediato?",
            "¿Cuándo tendremos respuestas sobre la causa?",
          ],
        },
      ],
    },
    {
      id: "migraine",
      label: "Migraña",
      categories: [
        {
          id: "understanding",
          title: "Entenderla",
          questions: [
            "¿Mis dolores de cabeza son realmente migrañas u otro tipo de dolor de cabeza?",
            "¿Cuáles son mis desencadenantes más probables?",
            "¿Debería llevar un diario de mis dolores de cabeza? ¿Qué debería anotar?",
            "¿Necesito una tomografía cerebral u otras pruebas?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué debo tomar cuando comienza una migraña y con qué rapidez?",
            "¿Soy candidato para un medicamento preventivo?",
            "¿Qué hay de los medicamentos más nuevos para la migraña (bloqueadores de CGRP)? ¿Me ayudarían?",
            "¿Puedo usar demasiado los analgésicos? ¿Qué es un dolor de cabeza de rebote?",
          ],
        },
        {
          id: "lifestyle",
          title: "Desencadenantes y estilo de vida",
          questions: [
            "¿Ciertos alimentos, cambios en el sueño o el estrés causan mis ataques?",
            "¿Están jugando un papel mis hormonas?",
            "¿Qué cambios en mi rutina podrían reducir los ataques?",
          ],
        },
        {
          id: "warning",
          title: "Cuándo preocuparse",
          questions: [
            "¿Qué síntomas de dolor de cabeza son señales de alarma que requieren atención urgente?",
            "¿Cuándo debo volver si las cosas no mejoran?",
          ],
        },
      ],
    },
    {
      id: "epilepsy-seizures",
      label: "Epilepsia / Convulsiones",
      categories: [
        {
          id: "understanding",
          title: "Entenderla",
          questions: [
            "¿Qué tipo de convulsiones estoy teniendo?",
            "¿Qué las está causando? ¿Lo sabemos?",
            "¿Qué pruebas necesito (EEG, MRI)?",
            "¿Tendré más convulsiones?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Qué medicamento me recomienda y por qué?",
            "¿Qué efectos secundarios debo observar?",
            "¿Qué sucede si olvido una dosis?",
            "¿Por cuánto tiempo necesitaré tomar el medicamento?",
          ],
        },
        {
          id: "safety",
          title: "Seguridad y vida diaria",
          questions: [
            "¿Puedo conducir? ¿Cuáles son las reglas en mi estado?",
            "¿Qué debe hacer mi familia si tengo una convulsión?",
            "¿Hay actividades que deba evitar (nadar, alturas)?",
            "¿Puedo beber alcohol con mi medicamento?",
          ],
        },
        {
          id: "monitoring",
          title: "Seguimiento",
          questions: [
            "¿Debo registrar mis convulsiones? ¿Qué detalles le son más útiles?",
            "¿Necesito análisis de sangre para verificar los niveles de mi medicamento?",
            "¿Cuándo debo ver a un especialista en epilepsia (neurólogo)?",
          ],
        },
      ],
    },
    {
      id: "vertigo",
      label: "Vértigo / Mareo",
      categories: [
        {
          id: "understanding",
          title: "Entendiéndolo",
          questions: [
            "¿Qué está causando mi mareo: oído interno, presión arterial u otra cosa?",
            "¿Es esto VPPB (cristales sueltos en el oído interno)?",
            "¿Podrían mis medicamentos estar causando esto?",
            "¿Necesito una prueba de audición o de equilibrio?",
          ],
        },
        {
          id: "treatment",
          title: "Tratamiento",
          questions: [
            "¿Puede una maniobra de reposicionamiento (como la de Epley) arreglar esto?",
            "¿Hay algún medicamento que ayude y cuándo debo tomarlo?",
            "¿Me ayudaría la terapia vestibular (de equilibrio)?",
            "¿Cuánto tiempo durará esto?",
          ],
        },
        {
          id: "safety",
          title: "Seguridad",
          questions: [
            "¿Qué debo hacer durante un ataque de vértigo?",
            "¿Cómo puedo prevenir caídas en casa?",
            "¿Es seguro para mí conducir?",
          ],
        },
        {
          id: "warning",
          title: "Cuándo preocuparse",
          questions: [
            "¿Qué síntomas de mareo podrían indicar un derrame cerebral o algo urgente?",
            "¿Cuándo debo buscar atención inmediata?",
          ],
        },
      ],
    },
    {
      id: "fatigue",
      label: "Fatiga General",
      categories: [
        {
          id: "understanding",
          title: "Encontrando la causa",
          questions: [
            "¿Cuáles son las causas más comunes de una fatiga como la mía?",
            "¿Podría ser anemia, tiroides, deficiencia de vitaminas o diabetes?",
            "¿Podrían mis medicamentos estar causándome cansancio?",
            "¿Podría la falta de sueño o la apnea del sueño ser la causa?",
          ],
        },
        {
          id: "tests",
          title: "Pruebas",
          questions: [
            "¿Qué análisis de sangre debería hacerme?",
            "¿Necesito un estudio del sueño?",
            "¿Qué haremos si todas las pruebas salen normales?",
          ],
        },
        {
          id: "mental",
          title: "Ánimo y estrés",
          questions: [
            "¿Podrían el estrés, la ansiedad o la depresión ser parte de esto?",
            "¿Cómo distinguimos las causas físicas de las emocionales?",
          ],
        },
        {
          id: "lifestyle",
          title: "Lo que puedo hacer",
          questions: [
            "¿Qué cambios en la dieta, el ejercicio o el sueño ayudarían más?",
            "¿Cuánto debo dormir?",
            "¿Cuándo debo esperar sentirme mejor, y cuál es nuestro próximo paso si no lo hago?",
          ],
        },
      ],
    },
  ],
};

export default es;
