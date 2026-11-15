import type { LanguageData } from "./types";
import { FEATURE_TRANSLATIONS } from "./feature-translations";

const pt: LanguageData = {
  "code": "pt",
  "label": "Português",
  "ui": {
    ...FEATURE_TRANSLATIONS.pt,
    "appTitle": "Vaani",
    "appSubtitle": "Encontre sua voz no consultório médico.",
    "heroHeading": "Prepare-se para sua consulta médica",
    "heroDescription": "Vaani ajuda você a preparar as perguntas para fazer — assim você sai da sua consulta com respostas, não com arrependimentos.",
    "tip": "Dica: Marque cada pergunta que você quer fazer — mesmo que pareça pequena. Seu médico está lá para ajudar.",
    "conditionSelectLabel": "Sobre o que você gostaria de conversar com seu médico?",
    "conditionSelectPlaceholder": "— Escolha um tópico —",
    "printButton": "Imprimir esta página",
    "downloadButton": "Baixar uma cópia",
    "savedLocallyNotice": "Salvo apenas neste dispositivo — baixe uma cópia para não perder.",
    "visitTypeLabel": "É sua primeira consulta ou um acompanhamento?",
    "visitTypeFirst": "Primeira consulta",
    "visitTypeFollowup": "Consulta de acompanhamento",
    "followupCategory": {
      "id": "followup-visit",
      "title": "Desde minha última consulta",
      "questions": [
        "Como minha condição mudou desde minha última consulta?",
        "O que meus últimos exames ou resultados de laboratório mostraram?",
        "Meus medicamentos atuais ainda estão funcionando — algo deveria mudar?",
        "Existem efeitos colaterais que eu deveria continuar observando?",
        "Precisamos ajustar meu plano de tratamento?",
        "O que devo fazer ou acompanhar antes da minha próxima consulta?"
      ]
    },
    "uploadTitle": "Adicionar perguntas do seu relatório de exames ou médico",
    "uploadHint": "Envie uma foto ou PDF do seu último relatório. Ele é enviado à IA para sugerir perguntas, e depois descartado — não é salvo.",
    "uploadButton": "Enviar relatório",
    "uploadChooseAnother": "Escolher um arquivo diferente",
    "uploadAnalyzing": "Lendo seu relatório…",
    "uploadError": "Não foi possível ler este arquivo. Por favor, tente uma foto nítida ou um PDF.",
    "uploadTooLarge": "Este arquivo é muito grande. Por favor, use um com menos de 8 MB.",
    "resetButton": "Redefinir / começar do zero",
    "resetConfirmText": "Isso vai apagar todas as suas marcações, anotações e perguntas personalizadas.",
    "resetConfirmYes": "Sim, redefinir",
    "resetConfirmCancel": "Cancelar",
    "notesLabel": "O que meu médico me disse",
    "notesPlaceholder": "Escreva anotações aqui durante ou depois da sua consulta…",
    "yourQuestionsTitle": "Suas perguntas",
    "yourQuestionsPlaceholder": "Adicione sua própria pergunta…",
    "yourQuestionsAdd": "Adicionar",
    "disclaimer": "Esta ferramenta ajuda você a preparar perguntas — não é um conselho médico. Sempre siga a orientação do seu médico.",
    "questionsSoonTitle": "Perguntas em breve",
    "questionsSoonDesc": "Perguntas gerais para este tópico estão sendo adicionadas. Use a caixa abaixo para adicionar suas próprias perguntas agora.",
    "ckdStageLabel": "Meu estágio de CKD",
    "ckdStagePlaceholder": "— Selecionar estágio —",
    "ckdStageOptional": "(opcional)",
    "ckdStageNotes": {
      "stage-1": "Estágio 1 (eGFR ≥ 90): Dano renal presente, mas a função é normal ou alta. O foco é proteger os rins e tratar a causa.",
      "stage-2": "Estágio 2 (eGFR 60–89): Diminuição leve. O foco é desacelerar a progressão.",
      "stage-3": "Estágio 3 (eGFR 30–59): Diminuição moderada. Gerenciar as complicações é importante.",
      "stage-4": "Estágio 4 (eGFR 15–29): Diminuição grave. Hora de planejar a terapia de substituição renal.",
      "stage-5": "Estágio 5 (eGFR < 15): Falha renal. Diálise ou transplante é geralmente necessário.",
      "not-sure": "Não tem certeza do seu estágio? Pergunte ao seu médico o seu número de eGFR."
    },
    "transplantLabel": "Tenho interesse ou estou sendo avaliado para um transplante de rim.",
    "transplantSubLabel": "Isso adiciona perguntas específicas sobre transplante abaixo.",
    "cancerSubtypeLabel": "Qual tipo de câncer?",
    "cancerSubtypeOptional": "(opcional — adiciona perguntas específicas)",
    "cancerSubtypePlaceholder": "— Selecionar tipo —",
    "aiPanelHeading": "Adicionar perguntas para a minha situação",
    "aiPanelLabel": "Descreva sua situação e seus sintomas com suas próprias palavras",
    "aiPanelPlaceholder": "Por exemplo: \"Tenho 62 anos, fui recentemente diagnosticado com {condição} e quero entender minhas opções de tratamento.\"",
    "aiPanelButton": "Sugerir perguntas para mim",
    "aiPanelLoading": "Pensando…",
    "aiPanelDisclaimer": "Sua descrição é enviada com segurança para nosso servidor e processada por um serviço de IA para criar sugestões; ela não é armazenada. As perguntas sugeridas pela IA são apenas para iniciar uma conversa — não são conselhos médicos.",
    "aiPanelError": "Algo deu errado. Por favor, tente novamente em um momento.",
    "safetyNoticeTitle": "Precisa de ajuda agora?",
    "safetyNoticeLine988": "Se você está em crise ou pensando em se machucar, você merece ajuda agora mesmo. Nos EUA, ligue ou envie uma mensagem de texto para 988 (Suicide & Crisis Lifeline).",
    "safetyNoticeInternational": "Os recursos de crise variam por país — por favor, procure a linha de apoio para sua região.",
    "permissionDeniedTitle": "Permissão necessária",
    "permissionDeniedMessage": "O Vaani não tem acesso. Permita nos Ajustes do seu dispositivo para usar este recurso.",
    "openSettings": "Abrir Ajustes",
    "languageLabel": "Idioma",
    "aboutArticleLabel": "Leia sobre esta condição:",
    "addTopicButton": "Adicione seu tópico se não o encontrou acima",
    "addTopicPlaceholder": "Digite seu tópico (por exemplo: dor no joelho)…",
    "addTopicSave": "Adicionar tópico",
    "sourcesTitle": "Fontes e referências médicas",
    "sourcesIntro": "As perguntas e informações neste aplicativo são baseadas nas orientações dessas organizações de saúde confiáveis. Toque em uma fonte para saber mais:"
  },
  "conditions": [
    {
      "id": "diabetes",
      "label": "Diabetes",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo-a",
          "questions": [
            "Que tipo eu tenho?",
            "Quais foram os meus números principais (A1C, glicose em jejum)?",
            "Qual é o meu alvo de A1C?",
            "É gerenciável ou reversível?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Que medicamento eu preciso e como ele funciona?",
            "Vou precisar de insulina?",
            "Quais efeitos colaterais devo observar?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento",
          "questions": [
            "Com que frequência devo verificar meu açúcar no sangue?",
            "Devo usar um CGM?",
            "Quando vamos verificar meu A1C novamente?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Estilo de vida",
          "questions": [
            "Quais mudanças na dieta mais ajudam?",
            "Quanto exercício é recomendado?",
            "Como meu peso afeta isso?"
          ]
        },
        {
          "id": "followup",
          "title": "Acompanhamento e complicações",
          "questions": [
            "Como isso afeta meus olhos, rins, pés e coração?",
            "Quais exames de rastreamento preciso e quando?",
            "Quando é minha próxima consulta?"
          ]
        }
      ]
    },
    {
      "id": "high-blood-pressure",
      "label": "Pressão alta",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo-a",
          "questions": [
            "Quais foram meus números e qual é meu alvo?",
            "O que provavelmente está causando isso?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Qual medicamento e por quê?",
            "Quais são os efeitos colaterais?",
            "Posso tentar mudanças no estilo de vida primeiro?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento",
          "questions": [
            "Devo verificar em casa e com que frequência?",
            "Quais leituras devem me preocupar?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Estilo de vida",
          "questions": [
            "E quanto a sal, álcool, exercício, peso e estresse?"
          ]
        },
        {
          "id": "followup",
          "title": "Acompanhamento",
          "questions": [
            "Quando vamos verificar novamente?",
            "Quais órgãos estão em risco se não for controlada?"
          ]
        }
      ]
    },
    {
      "id": "skin-rash",
      "label": "Erupção na pele",
      "categories": [
        {
          "id": "what-is-it",
          "title": "O que é?",
          "questions": [
            "Qual é a causa provável?",
            "É contagioso ou alérgico?",
            "Preciso de um exame ou biópsia?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Qual creme ou medicamento, e por quanto tempo?",
            "E se não melhorar?"
          ]
        },
        {
          "id": "triggers",
          "title": "Gatilhos",
          "questions": [
            "Quais produtos, alimentos ou atividades devo evitar?"
          ]
        },
        {
          "id": "when-to-worry",
          "title": "Quando se preocupar",
          "questions": [
            "Quais sinais indicam que está piorando?",
            "Quando devo voltar ou ir à emergência?"
          ]
        }
      ]
    },
    {
      "id": "skin-bump-lump",
      "label": "Nódulo ou caroço na pele",
      "categories": [
        {
          "id": "what-is-it",
          "title": "O que é?",
          "questions": [
            "O que você acha que é isso?",
            "Precisamos de uma biópsia ou exames de imagem?",
            "Pode ser câncer?"
          ]
        },
        {
          "id": "options",
          "title": "Opções",
          "questions": [
            "Deve ser removido?",
            "Quais são os riscos de removê-lo versus observá-lo?"
          ]
        },
        {
          "id": "changes",
          "title": "Mudanças",
          "questions": [
            "Com que rapidez pode mudar?",
            "Quais sinais indicam que devo retornar com urgência?"
          ]
        },
        {
          "id": "followup",
          "title": "Acompanhamento",
          "questions": [
            "Quando devemos reavaliá-lo?"
          ]
        }
      ]
    },
    {
      "id": "cancer",
      "label": "Câncer",
      "categories": [
        {
          "id": "diagnosis",
          "title": "Diagnóstico",
          "questions": [
            "Qual é o tipo e o estágio?",
            "Quais exames confirmaram?",
            "Onde está e se espalhou?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Opções de tratamento",
          "questions": [
            "Quais são TODAS as minhas opções (cirurgia, quimioterapia, radioterapia, imunoterapia, terapia-alvo, observação atenta)?",
            "O que você recomenda e por quê?",
            "O objetivo é curar ou controlar?"
          ]
        },
        {
          "id": "side-effects",
          "title": "Efeitos colaterais",
          "questions": [
            "Quais são os efeitos colaterais de cada opção?",
            "Afetará a fertilidade?",
            "Algum efeito a longo prazo?"
          ]
        },
        {
          "id": "logistics",
          "title": "Logística",
          "questions": [
            "Quanto tempo dura o tratamento?",
            "Como isso afetará o trabalho e a vida diária?",
            "E quanto ao custo e ao seguro?",
            "Como obtenho uma segunda opinião?"
          ]
        },
        {
          "id": "support",
          "title": "Apoio",
          "questions": [
            "Existem ensaios clínicos?",
            "Posso ter cuidados paliativos para apoio aos sintomas?",
            "Existem grupos de apoio?",
            "Quem é meu principal ponto de contato?"
          ]
        },
        {
          "id": "followup",
          "title": "Acompanhamento",
          "questions": [
            "Como saberemos se está funcionando?",
            "Qual é o cronograma de exames de imagem?",
            "Quais são os sinais de recorrência?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "breast",
          "label": "Mama",
          "categories": [
            {
              "id": "breast-specific",
              "title": "Câncer de mama — perguntas específicas",
              "questions": [
                "Devo fazer testes genéticos (BRCA1/BRCA2), e isso mudaria meu tratamento ou o rastreamento da minha família?",
                "Qual é o meu status de receptor hormonal (RE/RP) e HER2, e o que isso significa para mim?",
                "Quais são minhas opções de cirurgia (tumorectomia vs. mastectomia) e opções de reconstrução?",
                "Precisarei de quimioterapia, radioterapia ou terapia hormonal, e em que ordem?",
                "Como o tratamento afetará a fertilidade, e posso preservar opções antes de começar?"
              ]
            }
          ]
        },
        {
          "id": "lung",
          "label": "Pulmão",
          "categories": [
            {
              "id": "lung-specific",
              "title": "Câncer de pulmão — perguntas específicas",
              "questions": [
                "Foi causado por tabagismo, e isso muda o tratamento?",
                "O que o meu teste de mutação está mostrando?",
                "Sou um candidato à cirurgia?"
              ]
            }
          ]
        },
        {
          "id": "colorectal",
          "label": "Colorretal",
          "categories": [
            {
              "id": "colorectal-specific",
              "title": "Câncer colorretal — perguntas específicas",
              "questions": [
                "Preciso de uma colostomia?",
                "O tumor foi testado para marcadores genéticos?",
                "E sobre o cronograma de rastreamento da minha família?"
              ]
            }
          ]
        },
        {
          "id": "prostate",
          "label": "Próstata",
          "categories": [
            {
              "id": "prostate-specific",
              "title": "Câncer de próstata — perguntas específicas",
              "questions": [
                "Qual é a minha pontuação de Gleason e o PSA?",
                "A vigilância ativa é uma opção para mim?",
                "Como o tratamento afetará a função urinária e sexual?"
              ]
            }
          ]
        },
        {
          "id": "melanoma",
          "label": "Pele / Melanoma",
          "categories": [
            {
              "id": "melanoma-specific",
              "title": "Pele / Melanoma — perguntas específicas",
              "questions": [
                "Qual a profundidade?",
                "Precisamos verificar meus gânglios linfáticos?",
                "Com que frequência devo fazer exames de pele de corpo inteiro?"
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
              "title": "Câncer cervical — perguntas específicas",
              "questions": [
                "Qual o estágio e o status de HPV?",
                "Como o tratamento afetará a fertilidade?",
                "Qual cronograma de acompanhamento de Papanicolau/HPV devo seguir?"
              ]
            }
          ]
        },
        {
          "id": "leukemia",
          "label": "Leucemia",
          "categories": [
            {
              "id": "leukemia-specific",
              "title": "Leucemia — perguntas específicas",
              "questions": [
                "Qual tipo (aguda ou crônica)?",
                "Preciso de tratamento agora ou apenas monitoramento?",
                "Precisarei de um transplante de medula óssea?"
              ]
            }
          ]
        },
        {
          "id": "lymphoma",
          "label": "Linfoma",
          "categories": [
            {
              "id": "lymphoma-specific",
              "title": "Linfoma — perguntas específicas",
              "questions": [
                "Hodgkin ou não-Hodgkin, e qual subtipo?",
                "Qual é o plano de tratamento e o cronograma?",
                "Quais são os efeitos de longo prazo do tratamento?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ckd",
      "label": "Doença renal crônica (CKD)",
      "categories": [
        {
          "id": "diagnosis-stage",
          "title": "Meu diagnóstico e estágio",
          "questions": [
            "Em que estágio estou, e qual é o meu eGFR?",
            "Qual é a minha albumina na urina (ACR)?",
            "O que causou a minha CKD?",
            "É provável que piore, e com que rapidez?"
          ]
        },
        {
          "id": "protecting-kidneys",
          "title": "Protegendo meus rins",
          "questions": [
            "Qual é a minha meta de pressão arterial?",
            "Devo usar um inibidor da ECA, ARB ou um inibidor de SGLT2?",
            "Quais medicamentos ou suplementos devo evitar (por exemplo, AINEs como ibuprofeno)?",
            "Se eu sou diabético, qual é a minha meta de açúcar no sangue?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Dieta e estilo de vida",
          "questions": [
            "Posso consultar um nutricionista renal?",
            "Quanta proteína, sódio, potássio e fósforo é ideal para mim?",
            "Há alguma restrição de líquidos que devo seguir?",
            "Quais suplementos são seguros?",
            "E quanto ao exercício?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento",
          "questions": [
            "Com que frequência vamos verificar meus exames e eGFR?",
            "Quais números devo acompanhar por conta própria?",
            "Quais mudanças o(a) preocupariam?"
          ]
        },
        {
          "id": "medications",
          "title": "Meus medicamentos",
          "questions": [
            "Algum dos meus medicamentos atuais precisa de ajuste de dose por causa dos meus rins?",
            "Devo começar ou parar de tomar algo?"
          ]
        },
        {
          "id": "planning-ahead",
          "title": "Planejamento futuro",
          "questions": [
            "Em que momento falamos sobre diálise ou transplante?",
            "Quais são todas as minhas opções (hemodiálise, diálise peritoneal, transplante, cuidados conservadores)?",
            "Eu poderia evitar a diálise com um transplante precoce (\"pre-emptive\")?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Emocional e prático",
          "questions": [
            "Como isso pode afetar minha energia e meu trabalho?",
            "Existe apoio de saúde mental disponível?",
            "Há grupos de apoio ou organizações renais que você recomenda?",
            "Onde posso conseguir ajuda com seguro e custos?"
          ]
        },
        {
          "id": "red-flags",
          "title": "Sinais de alerta",
          "questions": [
            "Quais sintomas significam que devo ligar para você ou ir para a emergência?"
          ]
        }
      ],
      "extraCategories": [
        {
          "id": "transplant",
          "triggerLabel": "Estou interessado(a) ou sendo avaliado(a) para um transplante de rim.",
          "categories": [
            {
              "id": "transplant-eval",
              "title": "Avaliação para transplante",
              "questions": [
                "Sou um(a) candidato(a) para um transplante de rim?",
                "Como e quando sou encaminhado(a) a um centro de transplante?",
                "Posso ser avaliado(a) antes de precisar de diálise (um transplante pré-emptive)?",
                "Qual a diferença entre um doador vivo e um doador falecido para mim?",
                "Como encontro um doador vivo — e posso perguntar a familiares ou amigos?",
                "Quais exames estão envolvidos na avaliação e quanto tempo todo o processo leva?",
                "O que poderia me tornar inelegível, e alguma dessas coisas pode ser trabalhada ou corrigida por mim?",
                "Podemos iniciar o processo de avaliação agora?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "thyroid",
      "label": "Condição da tireoide",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo-a",
          "questions": [
            "Minha tireoide está hiperativa ou hipoativa?",
            "Quais eram os meus níveis de TSH, T3 e T4?",
            "O que causou isso (por exemplo, Hashimoto ou Graves)?",
            "É permanente?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Qual medicamento preciso, e em qual dose?",
            "Quanto tempo até eu me sentir melhor?",
            "E se eu ainda me sentir mal depois de começar?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento",
          "questions": [
            "Com que frequência vamos verificar meus níveis novamente?",
            "Quais sintomas indicam que minha dose está errada?"
          ]
        },
        {
          "id": "daily-life",
          "title": "Vida diária",
          "questions": [
            "Como devo tomar meu medicamento (horário, alimentação, outros remédios)?",
            "Isso afeta meu peso, energia, humor, cabelo ou menstruação?",
            "Isso afeta a gravidez ou a fertilidade?"
          ]
        },
        {
          "id": "followup",
          "title": "Acompanhamento",
          "questions": [
            "Quando é meu próximo exame de sangue e consulta?"
          ]
        }
      ]
    },
    {
      "id": "pcos-gyn",
      "label": "SOP / Ginecológico",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo-a",
          "questions": [
            "O que está causando meus sintomas?",
            "Quais exames confirmam isso (hormônios, ultrassom)?"
          ]
        },
        {
          "id": "symptoms-treatment",
          "title": "Sintomas e tratamento",
          "questions": [
            "Quais são minhas opções para menstruação irregular, acne ou pelos indesejados?",
            "Preciso de anticoncepcional, metformina ou algo mais?",
            "Quais são os efeitos colaterais?"
          ]
        },
        {
          "id": "fertility",
          "title": "Fertilidade",
          "questions": [
            "Como isso afeta minha capacidade de engravidar?",
            "O que pode ajudar se eu quiser engravidar — agora ou depois?"
          ]
        },
        {
          "id": "long-term-health",
          "title": "Saúde a longo prazo",
          "questions": [
            "Qual é o meu risco para diabetes, problemas cardíacos ou outros problemas, e como podemos monitorá-los?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Estilo de vida",
          "questions": [
            "Mudanças na dieta, peso ou exercício ajudam, e o quanto?"
          ]
        },
        {
          "id": "general-gyn",
          "title": "Consulta ginecológica geral",
          "questions": [
            "Preciso de um Papanicolau ou teste de HPV, e quando?",
            "Este sangramento / dor / corrimento é normal?",
            "Quando devo voltar?"
          ]
        },
        {
          "id": "followup",
          "title": "Acompanhamento e segundas opiniões",
          "questions": [
            "Quando devemos verificar novamente?",
            "Como consigo um encaminhamento, caso eu queira um?"
          ]
        }
      ]
    },
    {
      "id": "mental-health",
      "label": "Saúde mental (depressão / ansiedade)",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "O que você acha que está acontecendo?",
            "Algo físico (tireoide, vitaminas, sono, medicamentos) pode estar contribuindo?"
          ]
        },
        {
          "id": "options",
          "title": "Opções",
          "questions": [
            "Quais são minhas opções de tratamento — terapia, medicação, ou ambos?",
            "O que você recomenda e por quê?",
            "Quanto tempo até eu sentir alguma diferença?"
          ]
        },
        {
          "id": "medication",
          "title": "Medicação",
          "questions": [
            "Quais são os efeitos colaterais?",
            "Causa dependência?",
            "E se o primeiro não funcionar?",
            "Como e quando eu pararia de usá-lo com segurança?"
          ]
        },
        {
          "id": "therapy-support",
          "title": "Terapia e apoio",
          "questions": [
            "Que tipo de terapia seria melhor para mim, e como encontro um profissional?",
            "Existem grupos de apoio ou opções de baixo custo?"
          ]
        },
        {
          "id": "daily-followup",
          "title": "Vida diária e acompanhamento",
          "questions": [
            "O que posso fazer no dia a dia?",
            "Quando devemos nos falar novamente?",
            "Quem devo contatar se as coisas piorarem antes disso?"
          ]
        }
      ]
    },
    {
      "id": "liver-disease",
      "label": "Doença do Fígado",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "Que tipo de doença do fígado eu tenho — fígado gorduroso, hepatite, cirrose ou algo mais?",
            "O que causou isso, e essa causa pode ser tratada?",
            "Em que estágio ou nível de dano está o meu fígado?",
            "Meu fígado ainda está funcionando normalmente agora?",
            "Isso pode melhorar, ou é provável que piore com o tempo?",
            "Devo consultar um especialista em fígado (hepatologista)?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento e medicamentos",
          "questions": [
            "Preciso de medicação, e quais são os efeitos colaterais?",
            "Existem tratamentos que podem retardar ou reverter o dano?",
            "Vou precisar de algum procedimento, como uma biópsia de fígado ou endoscopia?",
            "Existem ensaios clínicos ou tratamentos mais recentes que eu deveria conhecer?",
            "Se o meu fígado piorar, quais opções eu tenho — incluindo transplante?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Estilo de vida e dieta",
          "questions": [
            "Devo parar completamente de beber álcool?",
            "Existem alimentos que devo comer mais, ou evitar?",
            "Perder peso ajudaria meu fígado, e quanto?",
            "É seguro tomar Tylenol, ibuprofeno ou outros analgésicos de venda livre?",
            "Quais vitaminas ou suplementos são seguros — e quais devo evitar?",
            "Fazer exercícios é seguro e útil para mim agora?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento e exames",
          "questions": [
            "Que exames de sangue preciso fazer e com que frequência?",
            "Preciso de exames de imagem como ultrassom, tomografia computadorizada (CT scan) ou ressonância magnética (MRI), e com que frequência?",
            "Devo fazer exames para detectar câncer de fígado?",
            "Como saberemos se minha condição está melhorando ou piorando?",
            "Existem vacinas que devo tomar para proteger meu fígado (hepatite A, hepatite B)?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Sinais de alerta",
          "questions": [
            "Quais sintomas devem me levar ao pronto-socorro imediatamente?",
            "O que devo observar em casa e relatar a você prontamente?",
            "Se minha barriga inchar ou minha pele ficar amarela, o que devo fazer?",
            "Meus familiares devem fazer exames — algo disso é hereditário ou contagioso?"
          ]
        }
      ]
    },
    {
      "id": "heart-disease",
      "label": "Doença Cardíaca / Cardiovascular",
      "categories": [
        {
          "id": "understanding",
          "title": "Compreendendo-a",
          "questions": [
            "Que tipo de problema cardíaco eu tenho exatamente?",
            "Qual a gravidade e o que isso significa para minha vida diária?",
            "O que causou isso — genética, estilo de vida ou outra coisa?",
            "Quão bem meu coração está bombeando agora (fração de ejeção ou outras medidas)?",
            "Devo consultar um cardiologista ou especialista em coração?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento e medicamentos",
          "questions": [
            "Que medicamentos preciso, e quais são os efeitos colaterais?",
            "Precisarei de algum procedimento — como um stent, cirurgia de ponte de safena ou marca-passo?",
            "Como saberei se meus medicamentos estão funcionando?",
            "O que acontece se eu esquecer uma dose do meu medicamento para o coração?",
            "Existem estudos clínicos ou tratamentos mais recentes que eu deveria conhecer?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Estilo de vida e dieta",
          "questions": [
            "Quais mudanças na dieta ajudarão mais meu coração?",
            "Quanto sal e álcool são seguros?",
            "Quanto exercício é seguro para mim, e de que tipo?",
            "Como o estresse afeta meu coração, e o que posso fazer a respeito?",
            "Devo parar de fumar, e que ajuda está disponível?",
            "É seguro ser sexualmente ativo?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento e exames",
          "questions": [
            "Que exames preciso — EKG, ecocardiograma, teste ergométrico — e com que frequência?",
            "Que números devo monitorar em casa (pressão arterial, frequência cardíaca, peso)?",
            "Quais são minhas metas de colesterol, pressão arterial e frequência cardíaca?",
            "Como saberemos se minha condição está melhorando ou piorando?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Sinais de alerta",
          "questions": [
            "Quais sintomas significam que devo ligar para o 911 imediatamente?",
            "Quais sinais devo observar e relatar a você prontamente?",
            "O que devo fazer se tiver dor ou pressão no peito?",
            "Alguém da minha família deve fazer exames para doença cardíaca?"
          ]
        }
      ]
    },
    {
      "id": "joint-pain-arthritis",
      "label": "Dor nas Articulações / Artrite",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "Que tipo de artrite eu tenho — osteoartrite, reumatoide, psoriática, gota ou outra?",
            "O que está causando o dano articular no meu caso?",
            "Quais articulações estão afetadas agora, e é provável que isso se espalhe?",
            "Como sei se o dano articular está piorando com o tempo?",
            "Devo consultar um reumatologista ou um ortopedista?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento e medicamentos",
          "questions": [
            "Quais medicamentos preciso — AINEs, esteroides, DMARDs ou biológicos?",
            "Quais são os efeitos colaterais e por quanto tempo precisarei tomá-los?",
            "Fisioterapia ou terapia ocupacional são recomendadas para mim?",
            "Uma injeção articular ajudaria, e com que frequência posso fazer uma?",
            "Em que ponto a cirurgia ou a substituição articular seria considerada?"
          ]
        },
        {
          "id": "flares",
          "title": "Gerenciando crises e dor",
          "questions": [
            "O que posso fazer em casa quando minhas articulações têm uma crise?",
            "Calor ou gelo é melhor para a minha dor?",
            "Existem talas, órteses ou dispositivos de assistência que ajudariam?",
            "Quais atividades devo evitar para proteger minhas articulações?",
            "Quando uma crise deve me fazer ligar para você em vez de apenas gerenciar em casa?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Estilo de vida e dieta",
          "questions": [
            "Existem alimentos que reduzem a inflamação — ou alimentos que a pioram?",
            "Quanto exercício é seguro, e que tipos são melhores para minhas articulações?",
            "Perder peso ajudaria a reduzir minha dor articular, e quanto?",
            "Algum suplemento é útil — como óleo de peixe, cúrcuma ou glucosamina?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento e exames",
          "questions": [
            "Quais exames de sangue ou de imagem preciso e com que frequência?",
            "Como vamos medir se o meu tratamento está funcionando?",
            "Quais efeitos colaterais dos meus medicamentos devo observar e relatar?",
            "Com que frequência devo vir para as consultas de acompanhamento?"
          ]
        }
      ]
    },
    {
      "id": "asthma",
      "label": "Asma",
      "subtypeLabel": "Qual tipo de asma?",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "Que tipo de asma eu tenho?",
            "O que está desencadeando minha asma?",
            "Minha asma é leve, moderada ou grave?",
            "Minha asma está bem controlada agora?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento e inaladores",
          "questions": [
            "Qual é a diferença entre meu inalador de controle e meu inalador de alívio?",
            "Você pode me observar usando meu inalador para verificar minha técnica?",
            "Com que frequência é seguro usar meu inalador de alívio?",
            "Preciso de um espaçador, e quais efeitos colaterais devo esperar?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Monitoramento e plano de ação",
          "questions": [
            "Devo monitorar meu pico de fluxo em casa?",
            "Como sei se minha asma está piorando?",
            "Quando devo usar meu plano de ação, ligar para você ou ir para a emergência?",
            "Com que frequência devo vir para uma avaliação?"
          ]
        },
        {
          "id": "triggers-lifestyle",
          "title": "Gatilhos e vida diária",
          "questions": [
            "Como posso reduzir os gatilhos em casa e no trabalho?",
            "É seguro fazer exercícios, e como previno ataques?",
            "Quais vacinas preciso (gripe, pneumonia, COVID)?",
            "Fumar ou usar cigarros eletrônicos afeta minha asma?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "allergic",
          "label": "Alérgica (extrínseca)",
          "categories": [
            {
              "id": "allergic-specific",
              "title": "Asma alérgica — perguntas específicas",
              "questions": [
                "Devo fazer testes de alergia?",
                "Medicamentos para alergia ou imunoterapia me ajudariam?",
                "Quais alérgenos devo evitar mais?"
              ]
            }
          ]
        },
        {
          "id": "non-allergic",
          "label": "Não alérgica (intrínseca)",
          "categories": [
            {
              "id": "non-allergic-specific",
              "title": "Asma não alérgica — perguntas específicas",
              "questions": [
                "O que desencadeia minha asma se não for alergias?",
                "Infecções, ar frio ou estresse podem desencadear minhas crises?",
                "O que posso fazer sobre gatilhos não alérgicos?"
              ]
            }
          ]
        },
        {
          "id": "exercise-induced",
          "label": "Induzida por exercício",
          "categories": [
            {
              "id": "exercise-specific",
              "title": "Asma induzida por exercício — perguntas específicas",
              "questions": [
                "O que devo fazer antes de me exercitar para prevenir sintomas?",
                "Devo usar meu inalador antes de treinar?",
                "Quais esportes ou atividades são mais seguros para mim?"
              ]
            }
          ]
        },
        {
          "id": "cough-variant",
          "label": "Variante da tosse",
          "categories": [
            {
              "id": "cough-specific",
              "title": "Asma variante da tosse — perguntas específicas",
              "questions": [
                "Minha tosse persistente pode ser asma?",
                "Qual tratamento ajuda a asma variante da tosse?",
                "Quanto tempo até a tosse melhorar?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "sciatica",
      "label": "Ciática / Dor no nervo",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo-a",
          "questions": [
            "O que está causando minha ciática?",
            "Qual nervo ou disco está envolvido?",
            "É provável que isso melhore sozinho?",
            "Quanto tempo a recuperação geralmente leva?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "O que posso fazer em casa para aliviar a dor?",
            "Quais analgésicos são seguros para mim e por quanto tempo?",
            "A fisioterapia ajudaria?",
            "Preciso de uma injeção ou cirurgia — e se for cirurgia, qual é a taxa de sucesso?"
          ]
        },
        {
          "id": "activity",
          "title": "Atividade e recuperação",
          "questions": [
            "Quais movimentos ou posições devo evitar?",
            "É melhor descansar ou permanecer ativo?",
            "Existem alongamentos ou exercícios que ajudem?",
            "Quando posso voltar ao trabalho ou às atividades normais?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Sinais de alerta e exames",
          "questions": [
            "Quais sintomas significam que devo ligar para você imediatamente?",
            "Dormência, fraqueza ou perda de controle da bexiga são uma emergência?",
            "Quais exames de imagem ou testes preciso?"
          ]
        }
      ]
    },
    {
      "id": "psoriasis-eczema",
      "label": "Psoríase / Eczema",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "Isso é psoríase, eczema ou outra coisa?",
            "O que está desencadeando minhas crises?",
            "Esta é uma condição para a vida toda?",
            "É contagioso?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Quais cremes ou pomadas devo usar e como?",
            "Existem tratamentos mais fortes (fototerapia, pílulas, produtos biológicos) para mim?",
            "Quanto tempo até eu ver melhora?",
            "Quais efeitos colaterais devo esperar do meu tratamento?"
          ]
        },
        {
          "id": "daily-care",
          "title": "Cuidados diários com a pele",
          "questions": [
            "Qual rotina de cuidados com a pele e produtos você recomenda?",
            "Quais sabonetes, tecidos ou alimentos devo evitar?",
            "Como cuido da minha pele durante uma crise?",
            "Como posso reduzir a coceira?"
          ]
        },
        {
          "id": "broader-health",
          "title": "Saúde geral",
          "questions": [
            "Minha condição de pele está ligada a mais alguma coisa (articulações, coração, humor)?",
            "Devo procurar um especialista?",
            "Como vamos acompanhar se o tratamento está funcionando?"
          ]
        }
      ]
    },
    {
      "id": "gerd",
      "label": "Refluxo ácido / DRGE",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "O que está causando meu refluxo ácido?",
            "Isso é DRGE e poderia prejudicar meu esôfago?",
            "Preciso de algum exame, como uma endoscopia?",
            "Esta é uma condição de longo prazo?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Qual medicação é a certa para mim e por quanto tempo?",
            "Existem riscos em tomar redutores de ácido a longo prazo?",
            "O que posso fazer se a medicação não for suficiente?",
            "Se a cirurgia for sugerida, qual é a sua taxa de sucesso e quais são os riscos?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Dieta e estilo de vida",
          "questions": [
            "Quais alimentos e bebidas devo evitar?",
            "Como o horário das refeições e o tamanho das porções afetam o refluxo?",
            "Perder peso ou elevar a cabeceira da minha cama ajudaria?",
            "Fumar ou beber álcool piora a situação?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Sinais de alerta",
          "questions": [
            "Quais sintomas indicam que devo ser atendido rapidamente (dificuldade para engolir, perda de peso, vômito com sangue)?",
            "Meus sintomas poderiam ser algo diferente de refluxo?",
            "Com que frequência devo fazer o acompanhamento?"
          ]
        }
      ]
    },
    {
      "id": "infertility",
      "label": "Infertilidade / Tentando engravidar",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo",
          "questions": [
            "Que exames nós dois precisamos fazer para encontrar a causa?",
            "O que poderia estar dificultando a concepção?",
            "Como minha idade e saúde afetam nossas chances?",
            "Por quanto tempo devemos continuar tentando antes de fazer mais exames?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Opções de tratamento",
          "questions": [
            "Quais são nossas opções, das mais simples às mais avançadas?",
            "Quais são as taxas de sucesso para alguém como nós?",
            "Quanto custa cada opção e alguma delas é coberta?",
            "Quais são os riscos e efeitos colaterais de cada tratamento?"
          ]
        },
        {
          "id": "process",
          "title": "O processo",
          "questions": [
            "Quanto tempo leva cada etapa?",
            "Quantos ciclos ou tentativas são típicos antes de mudar de rumo?",
            "Que mudanças no estilo de vida poderiam melhorar nossas chances?",
            "Devemos consultar um especialista em fertilidade?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Emocional e prático",
          "questions": [
            "Que apoio está disponível para o estresse deste processo?",
            "Quais são nossas opções se o tratamento não funcionar?",
            "Como decidimos quando parar ou mudar os planos?"
          ]
        }
      ]
    },
    {
      "id": "multiple-sclerosis",
      "label": "Esclerose múltipla (EM)",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo",
          "questions": [
            "Que tipo de EM eu tenho?",
            "O que meus resultados de MRI e exames mostram?",
            "Como isso pode me afetar com o tempo?",
            "Qual a diferença entre uma recaída e a progressão da doença?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Qual tratamento modificador da doença é o melhor para mim e por quê?",
            "Quais os benefícios e riscos deste tratamento?",
            "Como uma recaída é tratada?",
            "Quais efeitos colaterais devo esperar e como saberemos se está funcionando?"
          ]
        },
        {
          "id": "symptoms-daily",
          "title": "Sintomas e vida diária",
          "questions": [
            "Como eu lido com fadiga, dor ou outros sintomas?",
            "A fisioterapia ou terapia ocupacional ajudaria?",
            "Como o calor, o estresse ou infecções afetam minha EM?",
            "O que posso fazer para me manter o mais ativo possível?"
          ]
        },
        {
          "id": "planning-monitoring",
          "title": "Planejamento e monitoramento",
          "questions": [
            "Com que frequência precisarei de MRIs ou consultas de acompanhamento?",
            "Quais sintomas devem me fazer ligar para você imediatamente?",
            "Como a EM poderia afetar o trabalho, a direção ou o planejamento familiar?",
            "Quais serviços de apoio estão disponíveis para mim?"
          ]
        }
      ]
    },
    {
      "id": "insomnia",
      "label": "Insônia / Problemas de sono",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo",
          "questions": [
            "O que poderia estar causando meus problemas de sono?",
            "Alguma condição de saúde ou medicação poderia estar me mantendo acordado?",
            "Preciso de um estudo do sono?",
            "Quantas horas de sono devo buscar?"
          ]
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Quais mudanças posso tentar antes da medicação?",
            "A terapia cognitivo-comportamental para insônia (TCC-I) é uma opção?",
            "Se eu precisar de remédio para dormir, quais são os riscos e efeitos colaterais e por quanto tempo devo tomá-lo?",
            "Os soníferos vendidos sem receita são seguros para mim?"
          ]
        },
        {
          "id": "habits",
          "title": "Hábitos e rotina",
          "questions": [
            "Quais hábitos diários ajudam ou prejudicam meu sono?",
            "Como cafeína, álcool e telas afetam meu sono?",
            "Como deve ser uma boa rotina antes de dormir?",
            "Posso tirar uma soneca?"
          ]
        },
        {
          "id": "followup",
          "title": "Acompanhamento",
          "questions": [
            "Como vamos medir se meu sono está melhorando?",
            "Devo manter um diário do sono?",
            "Quando devo fazer o acompanhamento?"
          ]
        }
      ]
    },
    {
      "id": "uti",
      "label": "Infecção do Trato Urinário (ITU)",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "É uma infecção na bexiga ou pode estar afetando meus rins?",
            "O que causou esta infecção?",
            "Por que eu continuo tendo infecções urinárias (ITUs)?",
            "Preciso fazer uma cultura de urina ou outros exames?",
          ],
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Qual antibiótico vou tomar e por quantos dias?",
            "E se meus sintomas não melhorarem em alguns dias?",
            "Quais efeitos colaterais devo observar?",
            "Existe algo que eu possa tomar para a ardência ou dor?",
          ],
        },
        {
          "id": "prevention",
          "title": "Prevenção",
          "questions": [
            "Como posso prevenir futuras infecções urinárias (ITUs)?",
            "Suco de cranberry ou um suplemento realmente ajudam?",
            "Quanta água devo beber por dia?",
            "Existem hábitos de higiene que devo mudar?",
          ],
        },
        {
          "id": "warning",
          "title": "Quando se preocupar",
          "questions": [
            "Quais sintomas indicam que a infecção está piorando?",
            "Quando devo ir a um pronto-atendimento ou à emergência?",
            "Febre ou dor nas costas podem significar uma infecção renal?",
          ],
        },
      ],
    },
    {
      "id": "urinary-incontinence",
      "label": "Incontinência Urinária",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo a condição",
          "questions": [
            "Que tipo de incontinência eu tenho — de esforço, de urgência ou mista?",
            "O que está causando a perda de urina?",
            "Meus medicamentos podem estar piorando isso?",
            "Preciso fazer algum exame, como um teste de função da bexiga?",
          ],
        },
        {
          "id": "treatment",
          "title": "Opções de tratamento",
          "questions": [
            "Exercícios para o assoalho pélvico (Kegel) podem me ajudar — e como os faço corretamente?",
            "O treinamento da bexiga ou idas programadas ao banheiro ajudariam?",
            "Existem medicamentos para isso e quais são os efeitos colaterais?",
            "Quando uma cirurgia ou procedimento seria considerado?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Vida diária",
          "questions": [
            "Devo mudar a quantidade ou a hora em que bebo líquidos?",
            "Cafeína ou álcool pioram isso?",
            "Quais produtos ou proteção você recomenda?",
            "A perda de peso pode melhorar meus sintomas?",
          ],
        },
        {
          "id": "referral",
          "title": "Especialistas",
          "questions": [
            "Devo consultar um urologista ou uroginecologista?",
            "Um fisioterapeuta especializado em assoalho pélvico é uma opção para mim?",
          ],
        },
      ],
    },
    {
      "id": "blood-in-urine",
      "label": "Sangue na Urina",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo",
          "questions": [
            "Quais são as causas mais prováveis de sangue na minha urina?",
            "Isso pode ser de uma infecção, pedra no rim ou algo mais grave?",
            "Um medicamento ou alimento pode estar causando a mudança de cor?",
            "A quantidade de sangue está relacionada à gravidade do problema?",
          ],
        },
        {
          "id": "tests",
          "title": "Exames",
          "questions": [
            "Que exames eu preciso — exames de urina, de imagem ou uma cistoscopia?",
            "O que cada exame nos dirá?",
            "Com que urgência esses exames devem ser feitos?",
            "Vocês também verificarão a função dos meus rins?",
          ],
        },
        {
          "id": "nextsteps",
          "title": "Próximos passos",
          "questions": [
            "O que devo fazer se eu vir sangue novamente antes dos meus exames?",
            "Preciso consultar um urologista ou um nefrologista?",
            "Quais sintomas indicam que devo procurar atendimento imediatamente?",
            "Quando teremos respostas sobre a causa?",
          ],
        },
      ],
    },
    {
      "id": "migraine",
      "label": "Enxaqueca",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo",
          "questions": [
            "Minhas dores de cabeça são realmente enxaquecas, ou outro tipo de dor de cabeça?",
            "Quais são meus gatilhos mais prováveis?",
            "Devo manter um diário de dor de cabeça — o que devo registrar?",
            "Preciso de um exame de imagem do cérebro ou outros exames?",
          ],
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "O que devo tomar quando uma enxaqueca começa, e com que rapidez?",
            "Sou um(a) candidato(a) para medicação preventiva?",
            "E os medicamentos mais recentes para enxaqueca (bloqueadores de CGRP) — eles me ajudariam?",
            "Posso usar demais analgésicos — o que é uma dor de cabeça de rebote?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Gatilhos e estilo de vida",
          "questions": [
            "Certos alimentos, mudanças no sono ou estresse causam minhas crises?",
            "Meus hormônios estão desempenhando um papel?",
            "Que mudanças na minha rotina poderiam reduzir as crises?",
          ],
        },
        {
          "id": "warning",
          "title": "Quando se preocupar",
          "questions": [
            "Quais sintomas de dor de cabeça são sinais de alerta que precisam de atendimento urgente?",
            "Quando devo voltar se as coisas não melhorarem?",
          ],
        },
      ],
    },
    {
      "id": "epilepsy-seizures",
      "label": "Epilepsia / Convulsões",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo",
          "questions": [
            "Que tipo de convulsões estou tendo?",
            "O que as está causando — sabemos?",
            "Que exames eu preciso (EEG, MRI)?",
            "Terei mais convulsões?",
          ],
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Qual medicamento você está recomendando e por quê?",
            "Quais efeitos colaterais devo observar?",
            "O que acontece se eu esquecer uma dose?",
            "Por quanto tempo precisarei tomar o medicamento?",
          ],
        },
        {
          "id": "safety",
          "title": "Segurança e vida diária",
          "questions": [
            "Posso dirigir — quais são as regras no meu estado?",
            "O que minha família deve fazer se eu tiver uma convulsão?",
            "Existem atividades que devo evitar (natação, alturas)?",
            "Posso beber álcool com meu medicamento?",
          ],
        },
        {
          "id": "monitoring",
          "title": "Acompanhamento",
          "questions": [
            "Devo registrar minhas convulsões — quais detalhes o ajudam mais?",
            "Preciso fazer exames de sangue para verificar os níveis do meu medicamento?",
            "Quando devo consultar um especialista em epilepsia (neurologista)?",
          ],
        },
      ],
    },
    {
      "id": "vertigo",
      "label": "Vertigem / Tontura",
      "categories": [
        {
          "id": "understanding",
          "title": "Entendendo",
          "questions": [
            "O que está causando minha tontura — ouvido interno, pressão arterial ou outra coisa?",
            "Isso é VPPB (cristais soltos no ouvido interno)?",
            "Meus medicamentos poderiam estar causando isso?",
            "Preciso de um exame de audição ou testes de equilíbrio?",
          ],
        },
        {
          "id": "treatment",
          "title": "Tratamento",
          "questions": [
            "Uma manobra de reposicionamento (como a de Epley) pode resolver isso?",
            "Existe medicamento que ajuda, e quando devo tomá-lo?",
            "A terapia vestibular (de equilíbrio) me ajudaria?",
            "Quanto tempo isso vai durar?",
          ],
        },
        {
          "id": "safety",
          "title": "Segurança",
          "questions": [
            "O que devo fazer durante um ataque de vertigem?",
            "Como posso prevenir quedas em casa?",
            "É seguro para mim dirigir?",
          ],
        },
        {
          "id": "warning",
          "title": "Quando se preocupar",
          "questions": [
            "Quais sintomas de tontura podem indicar um AVC ou algo urgente?",
            "Quando devo procurar atendimento imediato?",
          ],
        },
      ],
    },
    {
      "id": "fatigue",
      "label": "Fadiga Geral",
      "categories": [
        {
          "id": "understanding",
          "title": "Encontrando a causa",
          "questions": [
            "Quais são as causas mais comuns de fadiga como a minha?",
            "Isso poderia ser anemia, tireoide, deficiência de vitamina ou diabetes?",
            "Meus medicamentos poderiam estar me deixando cansado?",
            "O sono de má qualidade ou a apneia do sono poderiam ser a causa?",
          ],
        },
        {
          "id": "tests",
          "title": "Exames",
          "questions": [
            "Quais exames de sangue devo fazer?",
            "Preciso de um estudo do sono?",
            "O que faremos se todos os exames derem resultados normais?",
          ],
        },
        {
          "id": "mental",
          "title": "Humor e estresse",
          "questions": [
            "Estresse, ansiedade ou depressão podem estar relacionados a isso?",
            "Como diferenciamos causas físicas de emocionais?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "O que posso fazer",
          "questions": [
            "Que mudanças na alimentação, exercícios ou sono ajudariam mais?",
            "Quantas horas de sono devo ter?",
            "Quando devo me sentir melhor, e qual será o próximo passo se eu não melhorar?",
          ],
        },
      ],
    }
  ]
};

export default pt;
