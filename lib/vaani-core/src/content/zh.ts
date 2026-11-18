import type { LanguageData } from "./types";
import { FEATURE_TRANSLATIONS } from "./feature-translations";

const zh: LanguageData = {
  code: "zh",
  label: "中文",
  ui: {
    ...FEATURE_TRANSLATIONS.zh,
    appTitle: "Vaani",
    appSubtitle: "在诊室里找到您的声音。",
    heroHeading: "为您的医生预约做好准备",
    heroDescription: "Vaani帮助您准备好要问的问题——让您带着答案离开诊室，而不是遗憾。",
    tip: "提示：勾选您想问的每一个问题——即使看起来很小。您的医生在这里帮助您。",
    conditionSelectLabel: "您想和医生谈什么？",
    conditionSelectPlaceholder: "— 选择主题 —",
    printButton: "打印此页",
    downloadButton: "下载副本",
    savedLocallyNotice: "仅保存在此设备上 — 请下载副本以免丢失。",
    visitTypeLabel: "这是您的首次就诊还是复诊？",
    visitTypeFirst: "首次就诊",
    visitTypeFollowup: "复诊",
    followupCategory: {
      id: "followup-visit",
      title: "自上次就诊以来",
      questions: [
        "自上次就诊以来，我的病情有什么变化？",
        "我最近的检查或化验结果显示了什么？",
        "我目前的药物还有效吗——需要做任何调整吗？",
        "有哪些副作用是我应该持续留意的？",
        "我们需要调整我的治疗方案吗？",
        "在下次就诊前，我应该做什么或记录什么？",
      ],
    },
    uploadTitle: "从您的化验单或医疗报告中添加问题",
    uploadHint: "上传您最新报告的照片或PDF。它会被安全地发送到我们的服务器和 Google Gemini（一项AI服务）以建议问题。Vaani 不会保存它。",
    uploadButton: "上传报告",
    uploadChooseAnother: "选择其他文件",
    uploadAnalyzing: "正在读取您的报告…",
    uploadError: "无法读取该文件。请尝试清晰的照片或PDF。",
    uploadTooLarge: "该文件太大。请使用小于8 MB的文件。",
    resetButton: "重置 / 重新开始",
    resetConfirmText: "这将清除您所有的勾选、备注和自定义问题。",
    resetConfirmYes: "是的，重置",
    resetConfirmCancel: "取消",
    notesLabel: "医生告诉我的",
    notesPlaceholder: "在就诊期间或之后在此处记录…",
    yourQuestionsTitle: "您的问题",
    yourQuestionsPlaceholder: "添加您自己的问题…",
    yourQuestionsAdd: "添加",
    disclaimer: "此工具帮助您准备问题——不是医疗建议。请始终遵循医生的指导。",
    questionsSoonTitle: "问题即将添加",
    questionsSoonDesc: "正在为此主题添加常规问题。您现在可以使用下面的框添加自己的问题。",
    ckdStageLabel: "我的慢性肾病分期",
    ckdStagePlaceholder: "— 选择分期 —",
    ckdStageOptional: "（可选）",
    ckdStageNotes: {
      "stage-1": "第1期 (eGFR ≥ 90)：肾脏有损伤但功能正常。重点是保护肾脏。",
      "stage-2": "第2期 (eGFR 60–89)：轻度下降。重点是减缓进展。",
      "stage-3": "第3期 (eGFR 30–59)：中度下降。管理并发症很重要。",
      "stage-4": "第4期 (eGFR 15–29)：严重下降。是时候规划肾脏替代治疗了。",
      "stage-5": "第5期 (eGFR < 15)：肾衰竭。通常需要透析或肾移植。",
      "not-sure": "不确定您的分期？请询问医生您的eGFR数值。",
    },
    transplantLabel: "我有兴趣或正在评估肾移植。",
    transplantSubLabel: "这将在下方添加移植特定问题。",
    cancerSubtypeLabel: "哪种类型的癌症？",
    cancerSubtypeOptional: "（可选——添加具体问题）",
    cancerSubtypePlaceholder: "— 选择类型 —",
    aiPanelHeading: "为我的情况添加问题",
    aiPanelLabel: "用您自己的话描述您的情况和症状",
    aiPanelPlaceholder: '例如："我62岁，最近被诊断为{condition}，我想了解我的治疗方案。"',
    aiPanelButton: "为我推荐问题",
    aiPanelLoading: "思考中…",
    aiPanelDisclaimer: "您的描述将安全地发送到我们的服务器，并由AI服务处理来生成建议。我们不会储存您的描述。AI给出的建议问题仅用于帮助您开启对话，不能作为医疗建议。",
    aiPanelError: "出现了问题，请稍后重试。",
    safetyNoticeTitle: "现在需要帮助吗？",
    safetyNoticeLine988: "如果您正处于危机中或有伤害自己的想法，您现在就值得获得帮助。在美国，请拨打或发短信至988（自杀与危机生命线）。",
    safetyNoticeInternational: "危机资源因国家而异——请查找您所在地区的危机热线。",
    permissionDeniedTitle: "需要权限",
    permissionDeniedMessage: "Vaani 没有访问权限。请在设备的“设置”中允许，以使用此功能。",
    openSettings: "打开设置",
    languageLabel: "语言",
    aboutArticleLabel: "了解这种疾病：",
    addTopicButton: "如果以上没有您的主题，请添加",
    addTopicPlaceholder: "输入您的话题（例如：膝盖疼痛）…",
    addTopicSave: "添加话题",
    sourcesTitle: "医疗来源与参考资料",
    sourcesIntro:
      "此应用程序中的问题和信息均参考了这些值得信赖的医疗机构的指导。点击来源了解更多信息：",
  },
  conditions: [
    {
      id: "diabetes",
      label: "糖尿病",
      categories: [
        { id: "understanding", title: "了解病情", questions: ["我得的是哪种类型？", "我的关键指标是什么（糖化血红蛋白、空腹血糖）？", "我的糖化血红蛋白目标是什么？", "这种病可以控制或逆转吗？"] },
        { id: "treatment", title: "治疗", questions: ["我需要什么药物，它如何起效？", "我需要注射胰岛素吗？", "我应该注意哪些副作用？"] },
        { id: "monitoring", title: "监测", questions: ["我应该多久检查一次血糖？", "我应该使用持续血糖监测仪吗？", "我们什么时候再检查糖化血红蛋白？"] },
        { id: "lifestyle", title: "生活方式", questions: ["哪些饮食改变最有帮助？", "建议做多少运动？", "我的体重如何影响这一状况？"] },
        { id: "followup", title: "随访与并发症", questions: ["这对我的眼睛、肾脏、双脚和心脏有什么影响？", "我需要做哪些筛查，什么时候做？", "我的下次就诊是什么时候？"] },
      ],
    },
    {
      id: "high-blood-pressure",
      label: "高血压",
      categories: [
        { id: "understanding", title: "了解病情", questions: ["我的血压数值是多少，目标是多少？", "可能的原因是什么？"] },
        { id: "treatment", title: "治疗", questions: ["哪种药物，为什么？", "副作用是什么？", "我可以先尝试改变生活方式吗？"] },
        { id: "monitoring", title: "监测", questions: ["我应该在家监测吗，多久一次？", "哪些读数应该让我担忧？"] },
        { id: "lifestyle", title: "生活方式", questions: ["盐、酒精、运动、体重和压力方面有什么建议？"] },
        { id: "followup", title: "随访", questions: ["什么时候复查？", "如果控制不好，哪些器官有风险？"] },
      ],
    },
    {
      id: "skin-rash",
      label: "皮肤皮疹",
      categories: [
        { id: "what-is-it", title: "这是什么？", questions: ["可能的原因是什么？", "是传染性的还是过敏性的？", "我需要做检测或活检吗？"] },
        { id: "treatment", title: "治疗", questions: ["用什么乳膏或药物，用多久？", "如果不好转怎么办？"] },
        { id: "triggers", title: "诱发因素", questions: ["我应该避免哪些产品、食物或活动？"] },
        { id: "when-to-worry", title: "何时担忧", questions: ["哪些迹象表明病情正在加重？", "什么时候应该回来复诊或去急诊？"] },
      ],
    },
    {
      id: "skin-bump-lump",
      label: "皮肤肿块或肿物",
      categories: [
        { id: "what-is-it", title: "这是什么？", questions: ["您认为这是什么？", "我们需要活检或影像检查吗？", "可能是癌症吗？"] },
        { id: "options", title: "选择", questions: ["应该切除吗？", "切除与观察各有什么风险？"] },
        { id: "changes", title: "变化", questions: ["它可能会多快变化？", "哪些迹象意味着我应该立即回来复诊？"] },
        { id: "followup", title: "随访", questions: ["我们什么时候应该再检查？"] },
      ],
    },
    {
      id: "cancer",
      label: "癌症",
      categories: [
        { id: "diagnosis", title: "诊断", questions: ["是哪种类型和分期？", "哪些检查确认了诊断？", "它在哪里，有没有扩散？"] },
        { id: "treatment-options", title: "治疗方案", questions: ["我所有的选择是什么（手术、化疗、放疗、免疫治疗、靶向治疗、观察等待）？", "您推荐什么，为什么？", "目标是治愈还是控制？"] },
        { id: "side-effects", title: "副作用", questions: ["每种方案的副作用是什么？", "会影响生育能力吗？", "有长期影响吗？"] },
        { id: "logistics", title: "实际安排", questions: ["治疗需要多长时间？", "会如何影响工作和日常生活？", "费用和保险怎么处理？", "如何获得第二意见？"] },
        { id: "support", title: "支持", questions: ["有临床试验吗？", "我可以接受姑息治疗来减轻症状吗？", "有支持团体吗？", "谁是我的主要联系人？"] },
        { id: "followup", title: "随访", questions: ["我们如何知道治疗有效？", "扫描检查的时间表是什么？", "复发的迹象是什么？"] },
      ],
      subtypes: [
        { id: "breast", label: "乳腺", categories: [{ id: "breast-specific", title: "乳腺癌——特定问题", questions: ["我应该做基因检测（BRCA1/BRCA2）吗？", "我的激素受体（ER/PR）和HER2状态是什么？", "我的手术选择（保乳手术与乳房切除术）和重建选项是什么？", "我是否需要化疗、放疗或激素治疗，顺序是什么？", "治疗会如何影响生育能力？"] }] },
        { id: "lung", label: "肺", categories: [{ id: "lung-specific", title: "肺癌——特定问题", questions: ["是吸烟引起的吗？", "基因突变检测显示什么？", "我适合手术吗？"] }] },
        { id: "colorectal", label: "结直肠", categories: [{ id: "colorectal-specific", title: "结直肠癌——特定问题", questions: ["我需要结肠造口术吗？", "肿瘤做了基因标志物检测吗？", "我家人的筛查计划怎么安排？"] }] },
        { id: "prostate", label: "前列腺", categories: [{ id: "prostate-specific", title: "前列腺癌——特定问题", questions: ["我的Gleason评分和PSA是多少？", "主动监测是我的选择吗？", "治疗会如何影响排尿和性功能？"] }] },
        { id: "melanoma", label: "皮肤/黑色素瘤", categories: [{ id: "melanoma-specific", title: "皮肤/黑色素瘤——特定问题", questions: ["浸润深度是多少？", "我们需要检查淋巴结吗？", "我多久应该做一次全身皮肤检查？"] }] },
        { id: "cervical", label: "宫颈", categories: [{ id: "cervical-specific", title: "宫颈癌——特定问题", questions: ["分期和HPV状态是什么？", "治疗会如何影响生育能力？", "我应该遵循什么Pap/HPV随访计划？"] }] },
        { id: "leukemia", label: "白血病", categories: [{ id: "leukemia-specific", title: "白血病——特定问题", questions: ["哪种类型（急性还是慢性）？", "我现在需要治疗还是只需监测？", "我需要骨髓移植吗？"] }] },
        { id: "lymphoma", label: "淋巴瘤", categories: [{ id: "lymphoma-specific", title: "淋巴瘤——特定问题", questions: ["霍奇金还是非霍奇金，哪种亚型？", "治疗计划和时间表是什么？", "治疗的长期影响是什么？"] }] },
      ],
    },
    {
      id: "ckd",
      label: "慢性肾病 (CKD)",
      categories: [
        { id: "diagnosis-stage", title: "我的诊断与分期", questions: ["我处于哪个分期，eGFR是多少？", "我的尿白蛋白（ACR）是多少？", "我的慢性肾病是什么原因引起的？", "病情可能会加重吗，会多快？"] },
        { id: "protecting-kidneys", title: "保护我的肾脏", questions: ["我的血压目标是多少？", "我应该服用ACE抑制剂、ARB还是SGLT2抑制剂？", "我应该避免哪些药物或补充剂（例如布洛芬等NSAIDs）？", "如果我有糖尿病，血糖目标是多少？"] },
        { id: "diet-lifestyle", title: "饮食与生活方式", questions: ["我可以看肾脏营养师吗？", "适合我的蛋白质、钠、钾和磷的摄入量是多少？", "有没有需要遵循的液体限制？", "哪些补充剂是安全的？", "运动方面怎么安排？"] },
        { id: "monitoring", title: "监测", questions: ["我们多久检查一次化验和eGFR？", "我自己应该追踪哪些数值？", "哪些变化会让您担忧？"] },
        { id: "medications", title: "我的药物", questions: ["我目前的任何药物需要为了肾脏调整剂量吗？", "我应该开始或停止服用任何药物吗？"] },
        { id: "planning-ahead", title: "提前规划", questions: ["到什么时候我们要讨论透析或移植？", "我所有的选择是什么（血液透析、腹膜透析、肾移植、保守治疗）？", "我可以通过提前（预防性）肾移植来避免透析吗？"] },
        { id: "emotional-practical", title: "情感与实际", questions: ["这可能会如何影响我的精力和工作？", "有没有心理健康支持？", "您推荐哪些支持团体或肾脏组织？", "在哪里可以获得保险和费用方面的帮助？"] },
        { id: "red-flags", title: "警示信号", questions: ["哪些症状意味着我应该给您打电话或去急诊？"] },
      ],
      extraCategories: [
        {
          id: "transplant",
          triggerLabel: "我有兴趣或正在评估肾移植。",
          categories: [
            {
              id: "transplant-eval",
              title: "移植评估",
              questions: [
                "我是肾移植的候选人吗？",
                "我如何以及何时被转介到移植中心？",
                "我可以在需要透析之前接受评估吗（预防性移植）？",
                "对我来说，活体捐献者和已故捐献者有什么区别？",
                "我怎么找到活体捐献者——向家人或朋友提出请求可以吗？",
                "评估涉及哪些检查，整个过程需要多长时间？",
                "什么可能让我不符合条件，其中有没有我可以努力改善的方面？",
                "我们现在可以开始评估过程吗？",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "thyroid",
      label: "甲状腺疾病",
      categories: [
        { id: "understanding", title: "了解病情", questions: ["我的甲状腺是亢进还是减退？", "我的TSH、T3和T4水平是多少？", "是什么原因引起的（例如桥本病或格雷夫斯病）？", "这是永久性的吗？"] },
        { id: "treatment", title: "治疗", questions: ["我需要什么药物，剂量是多少？", "多久才能感觉好转？", "如果开始服药后仍然感觉不对劲怎么办？"] },
        { id: "monitoring", title: "监测", questions: ["我们多久复查一次指标？", "哪些症状表明我的剂量不对？"] },
        { id: "daily-life", title: "日常生活", questions: ["我应该如何服药（时间、饮食、其他药物）？", "这会影响我的体重、精力、情绪、头发或月经吗？", "这会影响怀孕或生育能力吗？"] },
        { id: "followup", title: "随访", questions: ["我的下次血液检查和就诊是什么时候？"] },
      ],
    },
    {
      id: "pcos-gyn",
      label: "多囊卵巢综合征/妇科",
      categories: [
        { id: "understanding", title: "了解病情", questions: ["是什么导致了我的症状？", "哪些检查可以确认（激素、超声波）？"] },
        { id: "symptoms-treatment", title: "症状与治疗", questions: ["对于月经不规律、痤疮或多毛，我有哪些选择？", "我需要避孕药、二甲双胍还是其他什么？", "副作用是什么？"] },
        { id: "fertility", title: "生育能力", questions: ["这如何影响我怀孕的能力？", "如果我想要怀孕——现在或将来——有什么可以帮助的？"] },
        { id: "long-term-health", title: "长期健康", questions: ["我患糖尿病、心脏问题或其他问题的风险是多少，我们如何监测？"] },
        { id: "lifestyle", title: "生活方式", questions: ["饮食、体重或运动改变有帮助吗，帮助多少？"] },
        { id: "general-gyn", title: "常规妇科检查", questions: ["我需要宫颈涂片或HPV检测吗，什么时候？", "这种出血/疼痛/分泌物正常吗？", "我什么时候应该回来？"] },
        { id: "followup", title: "随访与第二意见", questions: ["什么时候复查？", "如果我想要的话如何获得转诊？"] },
      ],
    },
    {
      id: "mental-health",
      label: "心理健康（抑郁/焦虑）",
      categories: [
        { id: "understanding", title: "了解情况", questions: ["您认为发生了什么？", "有没有身体方面的原因（甲状腺、维生素、睡眠、药物）在起作用？"] },
        { id: "options", title: "选择", questions: ["我的治疗选择是什么——心理治疗、药物治疗还是两者兼有？", "您推荐什么，为什么？", "多久才可能感受到变化？"] },
        { id: "medication", title: "药物", questions: ["副作用是什么？", "会产生依赖性吗？", "如果第一种药不起效怎么办？", "我怎么安全地停药，什么时候停？"] },
        { id: "therapy-support", title: "心理治疗与支持", questions: ["哪种心理治疗适合我，如何找到治疗师？", "有没有支持团体或低费用的选择？"] },
        { id: "daily-followup", title: "日常生活与随访", questions: ["我日常可以做什么？", "我们什么时候应该再次复诊？", "在此之前如果情况恶化，我联系谁？"] },
      ],
    },
    {
      id: "liver-disease",
      label: "肝脏疾病",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "我患的是哪种肝病——脂肪肝、肝炎、肝硬化还是其他？",
            "病因是什么，病因能治疗吗？",
            "我的肝脏处于哪个阶段或损伤程度？",
            "我的肝脏目前还能正常运作吗？",
            "病情能好转，还是可能随时间恶化？",
            "我应该看肝脏专科医生（肝病科医生）吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗与用药",
          questions: [
            "我需要药物治疗吗？副作用有哪些？",
            "是否有能减缓或逆转损伤的治疗方法？",
            "我是否需要做手术，如肝脏活检或内镜检查？",
            "有没有我应该了解的临床试验或新疗法？",
            "如果肝脏病情加重，我有哪些选择——包括肝移植？",
          ],
        },
        {
          id: "lifestyle",
          title: "生活方式与饮食",
          questions: [
            "我需要完全戒酒吗？",
            "有哪些食物应该多吃或需要避免？",
            "减重对肝脏有帮助吗？需要减多少？",
            "服用泰诺、布洛芬等非处方止痛药安全吗？",
            "哪些维生素或补充剂是安全的——哪些应该避免？",
            "现在运动对我来说安全且有益吗？",
          ],
        },
        {
          id: "monitoring",
          title: "监测与检查",
          questions: [
            "我需要做哪些血液检查？多久一次？",
            "我需要做超声、CT或核磁共振检查吗？多久一次？",
            "我需要筛查肝癌吗？",
            "我们怎么知道病情是在改善还是恶化？",
            "我需要接种疫苗来保护肝脏吗（甲肝、乙肝）？",
          ],
        },
        {
          id: "warning-signs",
          title: "警示信号",
          questions: [
            "出现哪些症状需要立即去急诊？",
            "在家需要注意哪些症状，并及时告知您？",
            "如果腹部肿胀或皮肤变黄，我该怎么办？",
            "我的家庭成员是否也需要检测——这是遗传性或传染性的吗？",
          ],
        },
      ],
    },
    {
      id: "heart-disease",
      label: "心脏病 / 心血管疾病",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "我确切患的是哪种心脏病？",
            "有多严重，对我的日常生活意味着什么？",
            "病因是什么——遗传、生活方式，还是其他原因？",
            "我的心脏目前泵血功能如何（射血分数或其他指标）？",
            "我需要看心脏病专科医生（心脏科医生）吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗与用药",
          questions: [
            "我需要哪些药物？有哪些副作用？",
            "我是否需要手术——如支架、搭桥手术或心脏起搏器？",
            "我怎么知道药物是否有效？",
            "如果漏服一次心脏药物会怎样？",
            "有哪些临床试验或新疗法值得了解？",
          ],
        },
        {
          id: "lifestyle",
          title: "生活方式与饮食",
          questions: [
            "哪些饮食改变对我的心脏最有帮助？",
            "盐和酒精的摄入量多少是安全的？",
            "我能做多少运动，适合什么类型的运动？",
            "压力对我的心脏有什么影响，我能做些什么？",
            "我应该戒烟吗？有什么帮助可以利用？",
            "性生活安全吗？",
          ],
        },
        {
          id: "monitoring",
          title: "监测与检查",
          questions: [
            "我需要哪些检查——心电图、超声心动图、运动负荷试验——多久一次？",
            "我在家应该监测哪些指标（血压、心率、体重）？",
            "我的胆固醇、血压和心率目标值是多少？",
            "我们如何知道病情是在好转还是恶化？",
          ],
        },
        {
          id: "warning-signs",
          title: "警示信号",
          questions: [
            "出现哪些症状需要立即拨打急救电话？",
            "哪些迹象需要及时告知您？",
            "如果我感到胸痛或胸闷，应该怎么做？",
            "我的家庭成员是否需要进行心脏病筛查？",
          ],
        },
      ],
    },
    {
      id: "joint-pain-arthritis",
      label: "关节痛 / 关节炎",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "我患的是哪种关节炎——骨关节炎、类风湿关节炎、银屑病关节炎、痛风，还是其他？",
            "我的关节损伤是什么原因造成的？",
            "目前哪些关节受到影响，会不会蔓延？",
            "我怎么知道关节损伤是否在随时间加重？",
            "我需要看风湿科医生或骨科专家吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗与用药",
          questions: [
            "我需要哪些药物——非甾体抗炎药、类固醇、DMARDs还是生物制剂？",
            "副作用有哪些？需要服药多久？",
            "是否建议我进行物理治疗或职业治疗？",
            "关节注射对我有帮助吗？多久可以注射一次？",
            "什么情况下才会考虑手术或关节置换？",
          ],
        },
        {
          id: "flares",
          title: "应对发作与疼痛",
          questions: [
            "关节发作时，我在家可以怎么处理？",
            "热敷还是冷敷对我的疼痛更有效？",
            "有护具、夹板或辅助器具可以帮助我吗？",
            "我应该避免哪些活动以保护关节？",
            "发作时什么情况需要给您打电话，而不是自己在家处理？",
          ],
        },
        {
          id: "lifestyle",
          title: "生活方式与饮食",
          questions: [
            "有哪些食物可以减轻炎症——或者使炎症加重？",
            "我可以做多少运动，哪种类型对关节最好？",
            "减重能减轻关节疼痛吗？需要减多少？",
            "有哪些补充剂有帮助——比如鱼油、姜黄或葡萄糖胺？",
          ],
        },
        {
          id: "monitoring",
          title: "监测与检查",
          questions: [
            "我需要做哪些血液检查或影像检查，多久一次？",
            "我们如何衡量治疗是否有效？",
            "我应该注意并报告哪些药物副作用？",
            "我应该多久复诊一次？",
          ],
        },
      ],
    },
    {
      id: "asthma",
      label: "哮喘",
      subtypeLabel: "哪种类型的哮喘？",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "我患的是哪种类型的哮喘？",
            "是什么诱发了我的哮喘？",
            "我的哮喘是轻度、中度还是重度？",
            "我的哮喘目前控制得好吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗与吸入器",
          questions: [
            "我的控制型吸入器和急救型吸入器有什么区别？",
            "您能看着我使用吸入器，检查我的使用方法对不对吗？",
            "多久使用一次急救吸入器才是安全的？",
            "我需要使用储雾罐吗，会有哪些副作用？",
          ],
        },
        {
          id: "monitoring",
          title: "监测与应急计划",
          questions: [
            "我应该在家监测峰流速吗？",
            "我怎么知道我的哮喘是否在加重？",
            "什么时候该启用应急计划、给您打电话或去急诊？",
            "我应该多久来复查一次？",
          ],
        },
        {
          id: "triggers-lifestyle",
          title: "诱因与日常生活",
          questions: [
            "我如何在家中和工作场所减少诱因？",
            "运动安全吗，我如何预防哮喘发作？",
            "我需要接种哪些疫苗（流感、肺炎、新冠）？",
            "吸烟或电子烟会影响我的哮喘吗？",
          ],
        },
      ],
      subtypes: [
        {
          id: "allergic",
          label: "过敏性（外源性）",
          categories: [
            {
              id: "allergic-specific",
              title: "过敏性哮喘——特定问题",
              questions: [
                "我应该做过敏原检测吗？",
                "抗过敏药物或脱敏治疗对我有帮助吗？",
                "我最应该避免哪些过敏原？",
              ],
            },
          ],
        },
        {
          id: "non-allergic",
          label: "非过敏性（内源性）",
          categories: [
            {
              id: "non-allergic-specific",
              title: "非过敏性哮喘——特定问题",
              questions: [
                "如果不是过敏，那是什么诱发了我的哮喘？",
                "感染、冷空气或压力会引发我的哮喘发作吗？",
                "对于非过敏性诱因，我能做些什么？",
              ],
            },
          ],
        },
        {
          id: "exercise-induced",
          label: "运动诱发性",
          categories: [
            {
              id: "exercise-specific",
              title: "运动诱发性哮喘——特定问题",
              questions: [
                "运动前我应该做什么来预防症状？",
                "我应该在锻炼前使用吸入器吗？",
                "哪些运动或活动对我来说最安全？",
              ],
            },
          ],
        },
        {
          id: "cough-variant",
          label: "咳嗽变异性",
          categories: [
            {
              id: "cough-specific",
              title: "咳嗽变异性哮喘——特定问题",
              questions: [
                "我长期咳嗽会是哮喘吗？",
                "哪种治疗对咳嗽变异性哮喘有帮助？",
                "咳嗽多久才能好转？",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sciatica",
      label: "坐骨神经痛 / 神经痛",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "是什么原因引起了我的坐骨神经痛？",
            "涉及哪条神经或哪个椎间盘？",
            "这种情况有可能自行好转吗？",
            "通常恢复需要多长时间？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "我在家可以做些什么来缓解疼痛？",
            "哪些止痛药对我安全，可以服用多久？",
            "物理治疗会有帮助吗？",
            "我需要打针或手术吗——如果手术，成功率是多少？",
          ],
        },
        {
          id: "activity",
          title: "活动与恢复",
          questions: [
            "我应该避免哪些动作或姿势？",
            "是休息好还是保持活动好？",
            "有哪些拉伸或运动对我有帮助？",
            "我什么时候可以恢复工作或正常活动？",
          ],
        },
        {
          id: "warning-signs",
          title: "警示信号与检查",
          questions: [
            "出现哪些症状时我应该立即给您打电话？",
            "麻木、无力或大小便失禁是紧急情况吗？",
            "我需要做哪些影像检查或化验？",
          ],
        },
      ],
    },
    {
      id: "psoriasis-eczema",
      label: "银屑病 / 湿疹",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "这是银屑病、湿疹还是其他疾病？",
            "是什么诱发了我的发作？",
            "这是终身性疾病吗？",
            "它会传染吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "我应该使用哪些乳膏或药膏，怎么用？",
            "有没有更强效的治疗方法（光疗、口服药、生物制剂）适合我？",
            "多久才能看到改善？",
            "我的治疗会有哪些副作用？",
          ],
        },
        {
          id: "daily-care",
          title: "日常皮肤护理",
          questions: [
            "您推荐什么样的护肤流程和产品？",
            "我应该避免哪些肥皂、衣物面料或食物？",
            "发作期间我该如何护理皮肤？",
            "我怎样才能减轻瘙痒？",
          ],
        },
        {
          id: "broader-health",
          title: "更广泛的健康",
          questions: [
            "我的皮肤问题与其他方面有关联吗（关节、心脏、情绪）？",
            "我应该看专科医生吗？",
            "我们如何追踪治疗是否有效？",
          ],
        },
      ],
    },
    {
      id: "gerd",
      label: "胃酸反流 / 胃食管反流病",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "是什么原因引起了我的胃酸反流？",
            "这是胃食管反流病吗，会损伤我的食管吗？",
            "我需要做检查吗，比如胃镜？",
            "这是长期性疾病吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "哪种药物适合我，要服用多久？",
            "长期服用抑酸药有风险吗？",
            "如果药物效果不够，我能做什么？",
            "如果建议手术，成功率是多少，有哪些风险？",
          ],
        },
        {
          id: "diet-lifestyle",
          title: "饮食与生活方式",
          questions: [
            "我应该避免哪些食物和饮料？",
            "进餐时间和分量如何影响反流？",
            "减重或抬高床头会有帮助吗？",
            "吸烟或饮酒会让症状加重吗？",
          ],
        },
        {
          id: "warning-signs",
          title: "警示信号",
          questions: [
            "出现哪些症状意味着我需要尽快就诊（吞咽困难、体重下降、呕血）？",
            "我的症状会不会是反流以外的其他问题？",
            "我应该多久复诊一次？",
          ],
        },
      ],
    },
    {
      id: "infertility",
      label: "不孕不育 / 备孕",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "我们俩需要做哪些检查来找出原因？",
            "可能是什么让怀孕变得更困难？",
            "我的年龄和健康状况如何影响我们的怀孕几率？",
            "在做进一步检查之前，我们应该尝试多久？",
          ],
        },
        {
          id: "treatment-options",
          title: "治疗方案",
          questions: [
            "我们有哪些选择，从最简单到最先进？",
            "对于像我们这样的情况，成功率是多少？",
            "每种方案的费用是多少，有没有保险覆盖？",
            "每种治疗有哪些风险和副作用？",
          ],
        },
        {
          id: "process",
          title: "整个过程",
          questions: [
            "每个步骤需要多长时间？",
            "在改变方案之前，通常要尝试几个周期或几次？",
            "哪些生活方式的改变可以提高我们的几率？",
            "我们应该看生殖专科医生吗？",
          ],
        },
        {
          id: "emotional-practical",
          title: "情感与实际",
          questions: [
            "对于这个过程带来的压力，有哪些支持可以利用？",
            "如果治疗不成功，我们有哪些选择？",
            "我们如何决定何时停止或改变计划？",
          ],
        },
      ],
    },
    {
      id: "multiple-sclerosis",
      label: "多发性硬化症 (MS)",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "我患的是哪种类型的多发性硬化症？",
            "我的核磁共振和检查结果显示了什么？",
            "随着时间推移，这会如何影响我？",
            "复发和病情进展有什么区别？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "哪种疾病修正治疗最适合我，为什么？",
            "这种治疗有哪些益处和风险？",
            "复发该如何治疗？",
            "我应该预期哪些副作用，我们怎么知道治疗是否有效？",
          ],
        },
        {
          id: "symptoms-daily",
          title: "症状与日常生活",
          questions: [
            "我该如何应对疲劳、疼痛或其他症状？",
            "物理治疗或职业治疗会有帮助吗？",
            "高温、压力或感染会如何影响我的多发性硬化症？",
            "我能做些什么来尽可能保持活力？",
          ],
        },
        {
          id: "planning-monitoring",
          title: "规划与监测",
          questions: [
            "我需要多久做一次核磁共振或检查？",
            "出现哪些症状时我应该立即给您打电话？",
            "多发性硬化症会如何影响工作、开车或生育计划？",
            "我可以利用哪些支持服务？",
          ],
        },
      ],
    },
    {
      id: "insomnia",
      label: "失眠 / 睡眠问题",
      categories: [
        {
          id: "understanding",
          title: "了解病情",
          questions: [
            "可能是什么原因导致了我的睡眠问题？",
            "会不会是某种健康状况或药物让我无法入睡？",
            "我需要做睡眠监测吗？",
            "我应该以多少睡眠时间为目标？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "在用药之前，我可以尝试哪些改变？",
            "失眠认知行为疗法 (CBT-I) 是一个选择吗？",
            "如果我需要安眠药，有哪些风险和副作用，应该服用多久？",
            "非处方助眠药对我安全吗？",
          ],
        },
        {
          id: "habits",
          title: "习惯与作息",
          questions: [
            "哪些日常习惯有助于或有损于我的睡眠？",
            "咖啡因、酒精和电子屏幕如何影响我的睡眠？",
            "良好的睡前作息应该是什么样的？",
            "可以午睡吗？",
          ],
        },
        {
          id: "followup",
          title: "随访",
          questions: [
            "我们如何衡量我的睡眠是否在改善？",
            "我应该记睡眠日记吗？",
            "我什么时候应该复诊？",
          ],
        },
      ],
    },
    {
      id: "uti",
      label: "尿路感染 (UTI)",
      categories: [
        {
          id: "understanding",
          title: "了解它",
          questions: [
            "这是膀胱感染还是可能涉及肾脏？",
            "是什么导致了这次感染？",
            "为什么我老是得尿路感染？",
            "我需要做尿培养或其他检查吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "我将服用哪种抗生素，需要服用多少天？",
            "如果我的症状几天内没有改善怎么办？",
            "我应该注意哪些副作用？",
            "有什么可以缓解灼热感或疼痛的吗？",
          ],
        },
        {
          id: "prevention",
          title: "预防",
          questions: [
            "我怎样才能预防未来的尿路感染？",
            "蔓越莓汁或补充剂真的有帮助吗？",
            "我每天应该喝多少水？",
            "我需要改变哪些卫生习惯吗？",
          ],
        },
        {
          id: "warning",
          title: "何时需要担心",
          questions: [
            "哪些症状表明感染正在恶化？",
            "我什么时候应该去看急诊或急诊室？",
            "发烧或背痛是否意味着肾脏感染？",
          ],
        },
      ],
    },
    {
      id: "urinary-incontinence",
      label: "尿失禁",
      categories: [
        {
          id: "understanding",
          title: "了解它",
          questions: [
            "我是哪种类型的尿失禁——压力性、急迫性还是混合性？",
            "是什么导致我漏尿？",
            "我的药物会使情况恶化吗？",
            "我需要做膀胱功能测试等检查吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗方案",
          questions: [
            "盆底（凯格尔）运动能帮助我吗——我该如何正确进行？",
            "膀胱训练或定时排尿会有帮助吗？",
            "有针对这种病的药物吗，副作用是什么？",
            "什么时候会考虑手术或介入治疗？",
          ],
        },
        {
          id: "lifestyle",
          title: "日常生活",
          questions: [
            "我应该改变饮水量或饮水时间吗？",
            "咖啡因或酒精会使情况恶化吗？",
            "您推荐哪些产品或防护措施？",
            "减肥能改善我的症状吗？",
          ],
        },
        {
          id: "referral",
          title: "专科医生",
          questions: [
            "我应该去看泌尿科医生还是妇科泌尿医生？",
            "盆底物理治疗师适合我吗？",
          ],
        },
      ],
    },
    {
      id: "blood-in-urine",
      label: "尿中带血",
      categories: [
        {
          id: "understanding",
          title: "了解它",
          questions: [
            "我的尿液带血最可能的原因是什么？",
            "这可能是感染、肾结石还是更严重的问题引起的吗？",
            "药物或食物会引起颜色变化吗？",
            "出血量与病情的严重程度有关吗？",
          ],
        },
        {
          id: "tests",
          title: "检查",
          questions: [
            "我需要做哪些检查——尿检、影像学检查还是膀胱镜检查 (cystoscopy)？",
            "每项检查会告诉我们什么？",
            "这些检查应该多久做完？",
            "您会检查我的肾功能吗？",
          ],
        },
        {
          id: "nextsteps",
          title: "下一步",
          questions: [
            "如果我在检查前再次发现出血，我该怎么办？",
            "我需要去看泌尿科医生或肾脏专科医生吗？",
            "哪些症状意味着我应该立即就医？",
            "我们什么时候能知道病因？",
          ],
        },
      ],
    },
    {
      id: "migraine",
      label: "偏头痛",
      categories: [
        {
          id: "understanding",
          title: "了解它",
          questions: [
            "我的头痛是偏头痛，还是其他类型的头痛？",
            "我最可能的诱因是什么？",
            "我应该记录头痛日记吗——我应该记录什么？",
            "我需要做脑部扫描或其他检查吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "当偏头痛发作时，我应该服用什么药物，以及多快服用？",
            "我适合服用预防性药物吗？",
            "新型偏头痛药物（CGRP 阻滞剂）怎么样——它们会对我有所帮助吗？",
            "我会过度使用止痛药吗——什么是反弹式头痛？",
          ],
        },
        {
          id: "lifestyle",
          title: "诱因与生活方式",
          questions: [
            "某些食物、睡眠变化或压力会导致我的发作吗？",
            "我的荷尔蒙在其中起作用吗？",
            "我的日常生活中哪些改变可以减少发作？",
          ],
        },
        {
          id: "warning",
          title: "何时需要担心",
          questions: [
            "哪些头痛症状是需要紧急治疗的危险信号？",
            "如果情况没有好转，我应该什么时候回来复诊？",
          ],
        },
      ],
    },
    {
      id: "epilepsy-seizures",
      label: "癫痫/癫痫发作",
      categories: [
        {
          id: "understanding",
          title: "了解它",
          questions: [
            "我正在经历哪种类型的癫痫发作？",
            "是什么导致了它们——我们知道吗？",
            "我需要做哪些检查 (EEG, MRI)？",
            "我还会再次癫痫发作吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "您推荐哪种药？为什么？",
            "我需要注意哪些副作用？",
            "如果我漏服一次药怎么办？",
            "我需要服药多久？",
          ],
        },
        {
          id: "safety",
          title: "安全与日常生活",
          questions: [
            "我能开车吗？我们州有什么规定？",
            "如果我癫痫发作，我的家人应该怎么做？",
            "我需要避免哪些活动（比如游泳、高处）？",
            "我服药期间可以喝酒吗？",
          ],
        },
        {
          id: "monitoring",
          title: "复诊",
          questions: [
            "我需要记录我的癫痫发作情况吗？哪些细节对您最有帮助？",
            "我需要验血来检查我的药物浓度吗？",
            "我什么时候需要看癫痫专科医生（神经科医生）？",
          ],
        },
      ],
    },
    {
      id: "vertigo",
      label: "眩晕 / 头晕",
      categories: [
        {
          id: "understanding",
          title: "了解病因",
          questions: [
            "我的头晕是什么原因引起的？是内耳、血压还是其他原因？",
            "这是BPPV（内耳有松动的晶体）吗？",
            "我的药物会引起头晕吗？",
            "我需要做听力测试或平衡测试吗？",
          ],
        },
        {
          id: "treatment",
          title: "治疗",
          questions: [
            "复位治疗（例如Epley手法）能治好吗？",
            "有没有药物可以帮助缓解？我应该什么时候服用？",
            "前庭（平衡）康复治疗对我有帮助吗？",
            "这种情况会持续多久？",
          ],
        },
        {
          id: "safety",
          title: "安全",
          questions: [
            "眩晕发作时我应该怎么做？",
            "我在家怎么防止摔倒？",
            "我开车安全吗？",
          ],
        },
        {
          id: "warning",
          title: "何时需要担忧",
          questions: [
            "哪些头晕症状可能预示中风或其他紧急情况？",
            "我什么时候应该立即就医？",
          ],
        },
      ],
    },
    {
      id: "fatigue",
      label: "全身疲劳",
      categories: [
        {
          id: "understanding",
          title: "寻找病因",
          questions: [
            "像我这样的疲劳最常见的原因是什么？",
            "这会是贫血、甲状腺问题、维生素缺乏或糖尿病引起的吗？",
            "我的药物会让我感到疲劳吗？",
            "睡眠不足或睡眠呼吸暂停是原因吗？",
          ],
        },
        {
          id: "tests",
          title: "检查",
          questions: [
            "我应该做哪些血液检查？",
            "我需要做睡眠监测吗？",
            "如果所有检查结果都正常，我们该怎么办？",
          ],
        },
        {
          id: "mental",
          title: "情绪与压力",
          questions: [
            "压力、焦虑或抑郁症会是其中的一部分原因吗？",
            "我们如何区分身体原因和情绪原因呢？",
          ],
        },
        {
          id: "lifestyle",
          title: "我能做些什么",
          questions: [
            "饮食、运动或睡眠方面做哪些改变帮助最大？",
            "我应该睡多长时间？",
            "我什么时候会感觉好转？如果不好转，下一步该怎么办？",
          ],
        },
      ],
    },
  ],
};

export default zh;
