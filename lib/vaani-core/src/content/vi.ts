import type { LanguageData } from "./types";
import { FEATURE_TRANSLATIONS } from "./feature-translations";

const vi: LanguageData = {
  code: "vi",
  label: "Tiếng Việt",
  ui: {
    ...FEATURE_TRANSLATIONS.vi,
    appTitle: "Vaani",
    appSubtitle: "Tìm tiếng nói của bạn tại phòng khám bác sĩ.",
    heroHeading: "Chuẩn bị cho lần khám bác sĩ",
    heroDescription:
      "Vaani giúp bạn chuẩn bị những câu hỏi cần hỏi — để bạn rời khỏi cuộc hẹn với câu trả lời, không phải hối tiếc.",
    tip: "Mẹo: Đánh dấu mọi câu hỏi bạn muốn hỏi — dù nhỏ đến đâu. Bác sĩ ở đây để giúp bạn.",
    conditionSelectLabel: "Bạn muốn nói gì với bác sĩ?",
    conditionSelectPlaceholder: "— Chọn chủ đề —",
    printButton: "In trang này",
    downloadButton: "Tải xuống một bản sao",
    savedLocallyNotice: "Chỉ lưu trên thiết bị này — hãy tải xuống một bản sao để không bị mất.",
    visitTypeLabel: "Đây là lần khám đầu tiên hay tái khám?",
    visitTypeFirst: "Lần khám đầu tiên",
    visitTypeFollowup: "Tái khám",
    followupCategory: {
      id: "followup-visit",
      title: "Kể từ lần khám trước",
      questions: [
        "Tình trạng bệnh của tôi đã thay đổi như thế nào kể từ lần khám trước?",
        "Kết quả xét nghiệm gần đây nhất của tôi cho thấy điều gì?",
        "Các thuốc hiện tại của tôi còn hiệu quả không — có cần thay đổi gì không?",
        "Có tác dụng phụ nào tôi cần tiếp tục theo dõi không?",
        "Chúng ta có cần điều chỉnh kế hoạch điều trị của tôi không?",
        "Tôi nên làm gì hoặc theo dõi gì trước lần khám tới?",
      ],
    },
    uploadTitle: "Thêm câu hỏi từ kết quả xét nghiệm hoặc hồ sơ y tế của bạn",
    uploadHint: "Tải lên ảnh chụp hoặc tệp PDF kết quả gần đây nhất của bạn. Tệp được gửi an toàn đến máy chủ của chúng tôi và Google Gemini (một dịch vụ AI) để gợi ý câu hỏi. Vaani không lưu tệp này.",
    uploadButton: "Tải lên kết quả",
    uploadChooseAnother: "Chọn tệp khác",
    uploadAnalyzing: "Đang đọc kết quả của bạn…",
    uploadError: "Không đọc được tệp đó. Vui lòng thử ảnh chụp rõ ràng hoặc tệp PDF.",
    uploadTooLarge: "Tệp đó quá lớn. Vui lòng dùng tệp dưới 8 MB.",
    resetButton: "Đặt lại / Bắt đầu lại",
    resetConfirmText: "Thao tác này sẽ xóa tất cả đánh dấu, ghi chú và câu hỏi của bạn.",
    resetConfirmYes: "Có, đặt lại",
    resetConfirmCancel: "Hủy",
    notesLabel: "Bác sĩ đã nói với tôi",
    notesPlaceholder: "Ghi chú ở đây trong hoặc sau buổi khám…",
    yourQuestionsTitle: "Câu hỏi của bạn",
    yourQuestionsPlaceholder: "Thêm câu hỏi của bạn…",
    yourQuestionsAdd: "Thêm",
    disclaimer:
      "Công cụ này giúp bạn chuẩn bị câu hỏi — không phải tư vấn y tế. Luôn tuân theo hướng dẫn của bác sĩ.",
    questionsSoonTitle: "Câu hỏi sắp có",
    questionsSoonDesc:
      "Đang thêm câu hỏi chung cho chủ đề này. Hãy dùng ô bên dưới để thêm câu hỏi của bạn ngay bây giờ.",
    ckdStageLabel: "Giai đoạn CKD của tôi",
    ckdStagePlaceholder: "— Chọn giai đoạn —",
    ckdStageOptional: "(tùy chọn)",
    ckdStageNotes: {
      "stage-1": "Giai đoạn 1 (eGFR ≥ 90): Thận bị tổn thương nhưng chức năng bình thường. Tập trung bảo vệ thận.",
      "stage-2": "Giai đoạn 2 (eGFR 60–89): Giảm nhẹ. Tập trung làm chậm tiến triển.",
      "stage-3": "Giai đoạn 3 (eGFR 30–59): Giảm vừa phải. Kiểm soát biến chứng là quan trọng.",
      "stage-4": "Giai đoạn 4 (eGFR 15–29): Giảm nghiêm trọng. Đã đến lúc lên kế hoạch điều trị thay thế thận.",
      "stage-5": "Giai đoạn 5 (eGFR < 15): Suy thận. Thường cần chạy thận hoặc ghép thận.",
      "not-sure": "Không biết giai đoạn? Hãy hỏi bác sĩ số eGFR của bạn.",
    },
    transplantLabel: "Tôi quan tâm đến hoặc đang được đánh giá để ghép thận.",
    transplantSubLabel: "Thao tác này thêm câu hỏi về ghép thận bên dưới.",
    cancerSubtypeLabel: "Loại ung thư nào?",
    cancerSubtypeOptional: "(tùy chọn — thêm câu hỏi cụ thể)",
    cancerSubtypePlaceholder: "— Chọn loại —",
    aiPanelHeading: "Thêm câu hỏi cho tình huống của tôi",
    aiPanelLabel: "Mô tả tình huống và triệu chứng của bạn bằng lời của riêng bạn",
    aiPanelPlaceholder: 'Ví dụ: "Tôi 62 tuổi, vừa được chẩn đoán {condition} và muốn hiểu rõ các lựa chọn điều trị của mình."',
    aiPanelButton: "Gợi ý câu hỏi cho tôi",
    aiPanelLoading: "Đang suy nghĩ…",
    aiPanelDisclaimer: "Mô tả của bạn được gửi an toàn đến máy chủ của chúng tôi và được xử lý bởi dịch vụ AI để đưa ra gợi ý; thông tin này không được lưu trữ. Các câu hỏi do AI gợi ý chỉ mang tính gợi mở để bạn trò chuyện — không phải lời khuyên y tế.",
    aiPanelError: "Có sự cố xảy ra. Vui lòng thử lại sau.",
    safetyNoticeTitle: "Cần giúp đỡ ngay bây giờ?",
    safetyNoticeLine988:
      "Nếu bạn đang trong khủng hoảng hoặc có ý nghĩ tự làm hại bản thân, bạn xứng đáng được giúp đỡ ngay bây giờ. Tại Mỹ, hãy gọi hoặc nhắn tin tới 988 (Đường dây khủng hoảng tự tử).",
    safetyNoticeInternational:
      "Nguồn hỗ trợ khủng hoảng khác nhau theo quốc gia — vui lòng tra cứu đường dây khủng hoảng tại khu vực của bạn.",
    permissionDeniedTitle: "Cần quyền truy cập",
    permissionDeniedMessage: "Vaani chưa được cấp quyền. Vui lòng cho phép trong Cài đặt của thiết bị để dùng tính năng này.",
    openSettings: "Mở Cài đặt",
    languageLabel: "Ngôn ngữ",
    aboutArticleLabel: "Tìm hiểu về tình trạng này:",
    addTopicButton: "Thêm chủ đề của bạn nếu không tìm thấy ở trên",
    addTopicPlaceholder: "Nhập chủ đề của bạn (ví dụ: đau đầu gối)…",
    addTopicSave: "Thêm chủ đề",
    sourcesTitle: "Nguồn và tài liệu tham khảo y tế",
    sourcesIntro:
      "Các câu hỏi và thông tin trong ứng dụng này được xây dựng dựa trên hướng dẫn từ các tổ chức y tế đáng tin cậy này. Chạm vào một nguồn để tìm hiểu thêm:",
  },
  conditions: [
    {
      id: "diabetes",
      label: "Tiểu đường",
      categories: [
        { id: "understanding", title: "Hiểu bệnh", questions: ["Tôi mắc loại tiểu đường nào?", "Chỉ số của tôi là gì (A1C, đường huyết lúc đói)?", "Mục tiêu A1C của tôi là gì?", "Có thể kiểm soát hoặc đảo ngược không?"] },
        { id: "treatment", title: "Điều trị", questions: ["Tôi cần thuốc gì và thuốc đó hoạt động như thế nào?", "Tôi có cần tiêm insulin không?", "Tôi cần theo dõi tác dụng phụ nào?"] },
        { id: "monitoring", title: "Theo dõi", questions: ["Tôi nên kiểm tra đường huyết bao lâu một lần?", "Tôi có nên dùng CGM không?", "Khi nào kiểm tra lại A1C?"] },
        { id: "lifestyle", title: "Lối sống", questions: ["Thay đổi chế độ ăn nào giúp ích nhất?", "Nên tập thể dục bao nhiêu?", "Cân nặng của tôi ảnh hưởng như thế nào?"] },
        { id: "followup", title: "Theo dõi & biến chứng", questions: ["Điều này ảnh hưởng đến mắt, thận, bàn chân và tim của tôi như thế nào?", "Tôi cần tầm soát gì và khi nào?", "Lần khám tiếp theo của tôi là khi nào?"] },
      ],
    },
    {
      id: "high-blood-pressure",
      label: "Huyết áp cao",
      categories: [
        { id: "understanding", title: "Hiểu bệnh", questions: ["Chỉ số của tôi là bao nhiêu và mục tiêu là gì?", "Nguyên nhân có thể là gì?"] },
        { id: "treatment", title: "Điều trị", questions: ["Thuốc nào và tại sao?", "Tác dụng phụ là gì?", "Tôi có thể thử thay đổi lối sống trước không?"] },
        { id: "monitoring", title: "Theo dõi", questions: ["Tôi có nên đo ở nhà không và bao lâu một lần?", "Chỉ số nào nên khiến tôi lo lắng?"] },
        { id: "lifestyle", title: "Lối sống", questions: ["Muối, rượu, tập thể dục, cân nặng và căng thẳng thì sao?"] },
        { id: "followup", title: "Theo dõi", questions: ["Khi nào kiểm tra lại?", "Những cơ quan nào có nguy cơ nếu không kiểm soát được?"] },
      ],
    },
    {
      id: "skin-rash",
      label: "Phát ban da",
      categories: [
        { id: "what-is-it", title: "Đây là gì?", questions: ["Nguyên nhân có thể là gì?", "Có lây nhiễm hoặc dị ứng không?", "Tôi có cần xét nghiệm hoặc sinh thiết không?"] },
        { id: "treatment", title: "Điều trị", questions: ["Kem hoặc thuốc nào và trong bao lâu?", "Nếu không khỏi thì sao?"] },
        { id: "triggers", title: "Tác nhân gây bệnh", questions: ["Tôi nên tránh sản phẩm, thực phẩm hoặc hoạt động nào?"] },
        { id: "when-to-worry", title: "Khi nào cần lo lắng", questions: ["Dấu hiệu nào cho thấy bệnh đang nặng hơn?", "Khi nào nên quay lại hoặc đến phòng cấp cứu?"] },
      ],
    },
    {
      id: "skin-bump-lump",
      label: "U hoặc cục trên da",
      categories: [
        { id: "what-is-it", title: "Đây là gì?", questions: ["Bác sĩ nghĩ đây là gì?", "Chúng ta có cần sinh thiết hoặc chụp hình ảnh không?", "Có thể là ung thư không?"] },
        { id: "options", title: "Các lựa chọn", questions: ["Có nên cắt bỏ không?", "Rủi ro của việc cắt bỏ so với theo dõi là gì?"] },
        { id: "changes", title: "Thay đổi", questions: ["Nó có thể thay đổi nhanh như thế nào?", "Dấu hiệu nào có nghĩa là tôi cần quay lại gấp?"] },
        { id: "followup", title: "Theo dõi", questions: ["Khi nào chúng ta nên kiểm tra lại?"] },
      ],
    },
    {
      id: "cancer",
      label: "Ung thư",
      categories: [
        { id: "diagnosis", title: "Chẩn đoán", questions: ["Loại và giai đoạn nào?", "Xét nghiệm nào xác nhận?", "Nó ở đâu và đã di căn chưa?"] },
        { id: "treatment-options", title: "Phương án điều trị", questions: ["Tất cả các lựa chọn của tôi là gì (phẫu thuật, hóa trị, xạ trị, liệu pháp miễn dịch, liệu pháp nhắm mục tiêu, theo dõi)?", "Bác sĩ đề nghị gì và tại sao?", "Mục tiêu là chữa khỏi hay kiểm soát?"] },
        { id: "side-effects", title: "Tác dụng phụ", questions: ["Tác dụng phụ của mỗi lựa chọn là gì?", "Có ảnh hưởng đến khả năng sinh sản không?", "Có tác dụng lâu dài không?"] },
        { id: "logistics", title: "Hậu cần", questions: ["Điều trị kéo dài bao lâu?", "Sẽ ảnh hưởng đến công việc và cuộc sống hàng ngày như thế nào?", "Chi phí và bảo hiểm thì sao?", "Làm sao để có ý kiến thứ hai?"] },
        { id: "support", title: "Hỗ trợ", questions: ["Có thử nghiệm lâm sàng nào không?", "Tôi có thể gặp chăm sóc giảm nhẹ để hỗ trợ triệu chứng không?", "Có nhóm hỗ trợ nào không?", "Ai là đầu mối liên lạc chính của tôi?"] },
        { id: "followup", title: "Theo dõi", questions: ["Làm sao biết điều trị có hiệu quả?", "Lịch chụp scan là gì?", "Dấu hiệu tái phát là gì?"] },
      ],
      subtypes: [
        { id: "breast", label: "Vú", categories: [{ id: "breast-specific", title: "Ung thư vú — câu hỏi cụ thể", questions: ["Tôi có nên xét nghiệm gen (BRCA1/BRCA2) không?", "Tình trạng thụ thể hormone (ER/PR) và HER2 của tôi là gì?", "Các lựa chọn phẫu thuật (cắt u so với cắt vú) và tái tạo của tôi là gì?", "Tôi có cần hóa trị, xạ trị hoặc liệu pháp hormone không, và theo thứ tự nào?", "Điều trị sẽ ảnh hưởng đến khả năng sinh sản như thế nào?"] }] },
        { id: "lung", label: "Phổi", categories: [{ id: "lung-specific", title: "Ung thư phổi — câu hỏi cụ thể", questions: ["Có phải do hút thuốc gây ra không?", "Xét nghiệm đột biến cho thấy gì?", "Tôi có phải là ứng viên cho phẫu thuật không?"] }] },
        { id: "colorectal", label: "Đại trực tràng", categories: [{ id: "colorectal-specific", title: "Ung thư đại trực tràng — câu hỏi cụ thể", questions: ["Tôi có cần phẫu thuật đặt túi ruột không?", "Khối u có được xét nghiệm chỉ dấu gen không?", "Lịch tầm soát cho gia đình tôi thì sao?"] }] },
        { id: "prostate", label: "Tuyến tiền liệt", categories: [{ id: "prostate-specific", title: "Ung thư tuyến tiền liệt — câu hỏi cụ thể", questions: ["Điểm Gleason và PSA của tôi là gì?", "Theo dõi tích cực có phải là lựa chọn cho tôi không?", "Điều trị sẽ ảnh hưởng đến chức năng tiết niệu và tình dục như thế nào?"] }] },
        { id: "melanoma", label: "Da / Melanoma", categories: [{ id: "melanoma-specific", title: "Da / Melanoma — câu hỏi cụ thể", questions: ["Nó sâu bao nhiêu?", "Chúng ta có cần kiểm tra hạch bạch huyết không?", "Tôi nên kiểm tra da toàn thân bao lâu một lần?"] }] },
        { id: "cervical", label: "Cổ tử cung", categories: [{ id: "cervical-specific", title: "Ung thư cổ tử cung — câu hỏi cụ thể", questions: ["Giai đoạn và tình trạng HPV là gì?", "Điều trị sẽ ảnh hưởng đến khả năng sinh sản như thế nào?", "Tôi nên theo lịch Pap/HPV nào?"] }] },
        { id: "leukemia", label: "Bạch cầu", categories: [{ id: "leukemia-specific", title: "Bệnh bạch cầu — câu hỏi cụ thể", questions: ["Loại nào (cấp hay mãn tính)?", "Tôi có cần điều trị ngay không hay chỉ theo dõi?", "Tôi có cần ghép tủy xương không?"] }] },
        { id: "lymphoma", label: "Lymphoma", categories: [{ id: "lymphoma-specific", title: "Lymphoma — câu hỏi cụ thể", questions: ["Hodgkin hay non-Hodgkin, và loại phụ nào?", "Kế hoạch và thời gian điều trị là gì?", "Tác dụng lâu dài của điều trị là gì?"] }] },
      ],
    },
    {
      id: "ckd",
      label: "Bệnh thận mãn tính (CKD)",
      categories: [
        { id: "diagnosis-stage", title: "Chẩn đoán & giai đoạn của tôi", questions: ["Tôi đang ở giai đoạn nào và eGFR của tôi là gì?", "Albumin niệu (ACR) của tôi là gì?", "Nguyên nhân gây CKD của tôi là gì?", "Bệnh có khả năng nặng hơn không và nhanh đến mức nào?"] },
        { id: "protecting-kidneys", title: "Bảo vệ thận", questions: ["Mục tiêu huyết áp của tôi là gì?", "Tôi có nên dùng thuốc ức chế ACE, ARB hoặc SGLT2 không?", "Tôi nên tránh thuốc hoặc thực phẩm bổ sung nào (ví dụ: NSAIDs như ibuprofen)?", "Nếu tôi bị tiểu đường, mục tiêu đường huyết là gì?"] },
        { id: "diet-lifestyle", title: "Chế độ ăn & lối sống", questions: ["Tôi có thể gặp chuyên gia dinh dưỡng thận không?", "Lượng protein, natri, kali và phốt pho phù hợp cho tôi là bao nhiêu?", "Có giới hạn chất lỏng nào tôi cần tuân theo không?", "Thực phẩm bổ sung nào an toàn?", "Tập thể dục thì sao?"] },
        { id: "monitoring", title: "Theo dõi", questions: ["Chúng ta sẽ kiểm tra xét nghiệm và eGFR bao lâu một lần?", "Tôi nên tự theo dõi chỉ số nào?", "Những thay đổi nào sẽ khiến bác sĩ lo lắng?"] },
        { id: "medications", title: "Thuốc của tôi", questions: ["Có thuốc nào hiện tại cần điều chỉnh liều lượng cho thận không?", "Tôi có nên bắt đầu hoặc ngừng dùng gì không?"] },
        { id: "planning-ahead", title: "Lên kế hoạch trước", questions: ["Đến thời điểm nào chúng ta sẽ nói về lọc máu hoặc ghép thận?", "Tất cả các lựa chọn của tôi là gì (chạy thận nhân tạo, lọc màng bụng, ghép thận, chăm sóc bảo tồn)?", "Tôi có thể tránh lọc máu bằng ghép thận sớm (dự phòng) không?"] },
        { id: "emotional-practical", title: "Cảm xúc & thực tế", questions: ["Điều này có thể ảnh hưởng đến năng lượng và công việc của tôi như thế nào?", "Có hỗ trợ sức khỏe tâm thần không?", "Có nhóm hỗ trợ hoặc tổ chức thận nào bác sĩ giới thiệu không?", "Tôi có thể nhận giúp đỡ về bảo hiểm và chi phí ở đâu?"] },
        { id: "red-flags", title: "Dấu hiệu cảnh báo", questions: ["Triệu chứng nào có nghĩa là tôi nên gọi cho bác sĩ hoặc đến cấp cứu?"] },
      ],
      extraCategories: [
        {
          id: "transplant",
          triggerLabel: "Tôi quan tâm đến hoặc đang được đánh giá để ghép thận.",
          categories: [
            {
              id: "transplant-eval",
              title: "Đánh giá ghép thận",
              questions: [
                "Tôi có phải là ứng viên ghép thận không?",
                "Tôi được giới thiệu đến trung tâm ghép thận như thế nào và khi nào?",
                "Tôi có thể được đánh giá trước khi cần lọc máu không (ghép thận dự phòng)?",
                "Sự khác biệt giữa người hiến sống và người hiến đã mất đối với tôi là gì?",
                "Làm thế nào để tìm người hiến sống — và có được phép nhờ gia đình hoặc bạn bè không?",
                "Quá trình đánh giá gồm những xét nghiệm gì và mất bao lâu?",
                "Điều gì có thể khiến tôi không đủ điều kiện và tôi có thể khắc phục không?",
                "Chúng ta có thể bắt đầu quá trình đánh giá ngay bây giờ không?",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "thyroid",
      label: "Bệnh tuyến giáp",
      categories: [
        { id: "understanding", title: "Hiểu bệnh", questions: ["Tuyến giáp của tôi hoạt động quá mức hay kém?", "Chỉ số TSH, T3 và T4 của tôi là gì?", "Nguyên nhân là gì (ví dụ: Hashimoto hoặc Graves)?", "Đây có phải là vĩnh viễn không?"] },
        { id: "treatment", title: "Điều trị", questions: ["Tôi cần thuốc gì và liều lượng bao nhiêu?", "Mất bao lâu để cảm thấy tốt hơn?", "Nếu vẫn không ổn sau khi bắt đầu dùng thì sao?"] },
        { id: "monitoring", title: "Theo dõi", questions: ["Chúng ta kiểm tra lại chỉ số bao lâu một lần?", "Triệu chứng nào cho thấy liều dùng không đúng?"] },
        { id: "daily-life", title: "Cuộc sống hàng ngày", questions: ["Tôi nên uống thuốc như thế nào (thời gian, thức ăn, thuốc khác)?", "Điều này có ảnh hưởng đến cân nặng, năng lượng, tâm trạng, tóc hoặc kinh nguyệt không?", "Có ảnh hưởng đến việc mang thai hoặc khả năng sinh sản không?"] },
        { id: "followup", title: "Theo dõi", questions: ["Xét nghiệm máu và khám tiếp theo của tôi là khi nào?"] },
      ],
    },
    {
      id: "pcos-gyn",
      label: "PCOS / Phụ khoa",
      categories: [
        { id: "understanding", title: "Hiểu bệnh", questions: ["Nguyên nhân gây ra triệu chứng của tôi là gì?", "Xét nghiệm nào xác nhận (hormone, siêu âm)?"] },
        { id: "symptoms-treatment", title: "Triệu chứng & điều trị", questions: ["Các lựa chọn cho kinh nguyệt không đều, mụn trứng cá hoặc lông không mong muốn là gì?", "Tôi có cần thuốc tránh thai, metformin hoặc thứ gì khác không?", "Tác dụng phụ là gì?"] },
        { id: "fertility", title: "Khả năng sinh sản", questions: ["Điều này ảnh hưởng đến khả năng mang thai của tôi như thế nào?", "Điều gì có thể giúp nếu tôi muốn có con — ngay bây giờ hoặc sau này?"] },
        { id: "long-term-health", title: "Sức khỏe lâu dài", questions: ["Nguy cơ tiểu đường, các vấn đề về tim hoặc các vấn đề khác của tôi là gì và chúng ta theo dõi chúng như thế nào?"] },
        { id: "lifestyle", title: "Lối sống", questions: ["Thay đổi chế độ ăn, cân nặng hoặc tập thể dục có giúp ích không và bao nhiêu?"] },
        { id: "general-gyn", title: "Khám phụ khoa thường quy", questions: ["Tôi có cần xét nghiệm Pap hoặc HPV không và khi nào?", "Chảy máu / đau / dịch tiết này có bình thường không?", "Khi nào tôi nên quay lại?"] },
        { id: "followup", title: "Theo dõi & ý kiến thứ hai", questions: ["Khi nào kiểm tra lại?", "Làm sao để được chuyển viện nếu tôi muốn?"] },
      ],
    },
    {
      id: "mental-health",
      label: "Sức khỏe tâm thần (trầm cảm / lo âu)",
      categories: [
        { id: "understanding", title: "Hiểu vấn đề", questions: ["Bác sĩ nghĩ điều gì đang xảy ra?", "Có điều gì thể chất (tuyến giáp, vitamin, giấc ngủ, thuốc) đang góp phần không?"] },
        { id: "options", title: "Các lựa chọn", questions: ["Các lựa chọn điều trị của tôi là gì — liệu pháp, thuốc hoặc cả hai?", "Bác sĩ đề nghị gì và tại sao?", "Mất bao lâu để cảm thấy khác biệt?"] },
        { id: "medication", title: "Thuốc", questions: ["Tác dụng phụ là gì?", "Có gây nghiện không?", "Nếu loại đầu tiên không hiệu quả thì sao?", "Tôi sẽ ngừng thuốc an toàn như thế nào và khi nào?"] },
        { id: "therapy-support", title: "Liệu pháp & hỗ trợ", questions: ["Loại liệu pháp nào phù hợp với tôi và làm sao tìm được người trị liệu?", "Có nhóm hỗ trợ hoặc lựa chọn chi phí thấp không?"] },
        { id: "daily-followup", title: "Cuộc sống hàng ngày & theo dõi", questions: ["Tôi có thể làm gì mỗi ngày?", "Khi nào chúng ta nên kiểm tra lại?", "Tôi liên hệ với ai nếu mọi thứ trở nên tệ hơn trước đó?"] },
      ],
    },
    {
      id: "liver-disease",
      label: "Bệnh Gan",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Tôi mắc loại bệnh gan nào — gan nhiễm mỡ, viêm gan, xơ gan, hay bệnh khác?",
            "Nguyên nhân là gì và có thể điều trị nguyên nhân đó không?",
            "Gan tôi đang ở giai đoạn hoặc mức độ tổn thương nào?",
            "Gan tôi hiện vẫn hoạt động bình thường không?",
            "Bệnh có thể cải thiện, hay có khả năng xấu đi theo thời gian?",
            "Tôi có nên gặp chuyên gia gan (bác sĩ tiêu hóa gan mật) không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị & thuốc men",
          questions: [
            "Tôi có cần dùng thuốc không và tác dụng phụ là gì?",
            "Có phương pháp điều trị nào có thể làm chậm hoặc phục hồi tổn thương không?",
            "Tôi có cần làm thủ thuật như sinh thiết gan hay nội soi không?",
            "Có thử nghiệm lâm sàng hay phương pháp mới nào tôi nên biết không?",
            "Nếu gan xấu hơn, tôi có những lựa chọn nào — kể cả ghép gan?",
          ],
        },
        {
          id: "lifestyle",
          title: "Lối sống & chế độ ăn",
          questions: [
            "Tôi có cần ngừng uống rượu hoàn toàn không?",
            "Có thực phẩm nào tôi nên ăn nhiều hơn hoặc cần tránh không?",
            "Giảm cân có giúp ích cho gan không và cần giảm bao nhiêu?",
            "Có an toàn khi dùng Tylenol, ibuprofen hay thuốc giảm đau không kê đơn khác không?",
            "Vitamin hoặc thực phẩm bổ sung nào an toàn — và loại nào cần tránh?",
            "Tập thể dục hiện tại có an toàn và có ích cho tôi không?",
          ],
        },
        {
          id: "monitoring",
          title: "Theo dõi & xét nghiệm",
          questions: [
            "Tôi cần xét nghiệm máu gì và bao lâu một lần?",
            "Tôi có cần siêu âm, CT scan hay MRI không và bao lâu một lần?",
            "Tôi có cần tầm soát ung thư gan không?",
            "Làm sao biết tình trạng đang cải thiện hay xấu đi?",
            "Tôi có cần tiêm vắc-xin để bảo vệ gan (viêm gan A, viêm gan B) không?",
          ],
        },
        {
          id: "warning-signs",
          title: "Dấu hiệu cảnh báo",
          questions: [
            "Triệu chứng nào cần đến phòng cấp cứu ngay lập tức?",
            "Tôi cần theo dõi gì ở nhà và báo cáo ngay cho bác sĩ?",
            "Nếu bụng tôi sưng lên hoặc da chuyển vàng, tôi phải làm gì?",
            "Các thành viên gia đình có cần xét nghiệm không — bệnh này có di truyền hoặc lây không?",
          ],
        },
      ],
    },
    {
      id: "heart-disease",
      label: "Bệnh Tim / Tim Mạch",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Tôi mắc loại bệnh tim nào chính xác?",
            "Mức độ nghiêm trọng là bao nhiêu và ảnh hưởng đến cuộc sống hằng ngày như thế nào?",
            "Nguyên nhân là gì — di truyền, lối sống, hay điều gì khác?",
            "Tim tôi hiện đang bơm máu tốt đến mức nào (phân suất tống máu hoặc các thông số khác)?",
            "Tôi có cần gặp bác sĩ tim mạch không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị & thuốc men",
          questions: [
            "Tôi cần dùng thuốc gì và tác dụng phụ là gì?",
            "Tôi có cần làm thủ thuật — như đặt stent, phẫu thuật bắc cầu, hoặc máy tạo nhịp tim không?",
            "Làm sao biết thuốc của tôi có hiệu quả không?",
            "Nếu tôi bỏ lỡ một liều thuốc tim thì sao?",
            "Có thử nghiệm lâm sàng hay phương pháp điều trị mới nào tôi nên biết không?",
          ],
        },
        {
          id: "lifestyle",
          title: "Lối sống & chế độ ăn",
          questions: [
            "Thay đổi chế độ ăn nào giúp tim tôi nhiều nhất?",
            "Bao nhiêu muối và rượu là an toàn?",
            "Tôi có thể tập thể dục bao nhiêu và loại nào là phù hợp?",
            "Căng thẳng ảnh hưởng đến tim tôi như thế nào và tôi có thể làm gì?",
            "Tôi có nên bỏ thuốc lá không và có hỗ trợ gì không?",
            "Quan hệ tình dục có an toàn không?",
          ],
        },
        {
          id: "monitoring",
          title: "Theo dõi & xét nghiệm",
          questions: [
            "Tôi cần làm xét nghiệm nào — điện tâm đồ, siêu âm tim, kiểm tra gắng sức — và bao lâu một lần?",
            "Tôi nên theo dõi những chỉ số nào ở nhà (huyết áp, nhịp tim, cân nặng)?",
            "Mục tiêu về cholesterol, huyết áp và nhịp tim của tôi là bao nhiêu?",
            "Làm sao biết tình trạng đang cải thiện hay xấu đi?",
          ],
        },
        {
          id: "warning-signs",
          title: "Dấu hiệu cảnh báo",
          questions: [
            "Triệu chứng nào có nghĩa là tôi phải gọi cấp cứu ngay lập tức?",
            "Dấu hiệu nào cần theo dõi và báo ngay cho bác sĩ?",
            "Nếu tôi bị đau hoặc tức ngực thì phải làm gì?",
            "Có ai trong gia đình tôi cần được tầm soát bệnh tim không?",
          ],
        },
      ],
    },
    {
      id: "joint-pain-arthritis",
      label: "Đau Khớp / Viêm Khớp",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Tôi mắc loại viêm khớp nào — thoái hóa khớp, viêm khớp dạng thấp, viêm khớp vảy nến, gout, hay loại khác?",
            "Nguyên nhân gây tổn thương khớp trong trường hợp của tôi là gì?",
            "Hiện tại các khớp nào bị ảnh hưởng và liệu có thể lan rộng không?",
            "Làm sao tôi biết tình trạng khớp đang xấu dần theo thời gian?",
            "Tôi có nên gặp bác sĩ thấp khớp hoặc chuyên khoa chỉnh hình không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị & thuốc men",
          questions: [
            "Tôi cần dùng thuốc nào — thuốc chống viêm, corticosteroid, DMARDs, hay thuốc sinh học?",
            "Tác dụng phụ là gì và tôi cần dùng bao lâu?",
            "Tôi có được khuyên vật lý trị liệu hoặc liệu pháp nghề nghiệp không?",
            "Tiêm khớp có giúp ích không và tôi có thể tiêm bao lâu một lần?",
            "Ở giai đoạn nào thì phẫu thuật hoặc thay khớp được xem xét?",
          ],
        },
        {
          id: "flares",
          title: "Quản lý đợt bùng phát & đau",
          questions: [
            "Khi khớp bùng phát, tôi có thể làm gì tại nhà?",
            "Chườm nóng hay chườm lạnh tốt hơn cho cơn đau của tôi?",
            "Có nẹp, thanh đỡ hoặc dụng cụ hỗ trợ nào giúp ích không?",
            "Tôi nên tránh hoạt động nào để bảo vệ khớp?",
            "Khi nào trong một đợt bùng phát tôi nên gọi cho bạn thay vì tự xử lý ở nhà?",
          ],
        },
        {
          id: "lifestyle",
          title: "Lối sống & chế độ ăn",
          questions: [
            "Có thực phẩm nào giảm viêm — hoặc làm nặng hơn không?",
            "Tôi có thể tập thể dục bao nhiêu và loại nào tốt nhất cho khớp?",
            "Giảm cân có giúp giảm đau khớp không và cần giảm bao nhiêu?",
            "Có thực phẩm bổ sung nào hữu ích không — như dầu cá, nghệ, hay glucosamine?",
          ],
        },
        {
          id: "monitoring",
          title: "Theo dõi & xét nghiệm",
          questions: [
            "Tôi cần xét nghiệm máu hay chụp chiếu gì và bao lâu một lần?",
            "Chúng ta sẽ đo lường hiệu quả điều trị như thế nào?",
            "Tôi cần theo dõi tác dụng phụ nào từ thuốc và báo cáo ngay?",
            "Tôi nên đến khám định kỳ bao lâu một lần?",
          ],
        },
      ],
    },
    {
      id: "asthma",
      label: "Hen suyễn",
      subtypeLabel: "Loại hen suyễn nào?",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Tôi mắc loại hen suyễn nào?",
            "Điều gì kích hoạt cơn hen của tôi?",
            "Hen của tôi ở mức nhẹ, vừa hay nặng?",
            "Hiện tại hen của tôi có được kiểm soát tốt không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị & thuốc hít",
          questions: [
            "Sự khác biệt giữa thuốc hít kiểm soát và thuốc hít cắt cơn của tôi là gì?",
            "Bác sĩ có thể xem tôi dùng thuốc hít để kiểm tra kỹ thuật của tôi không?",
            "Tôi có thể dùng thuốc hít cắt cơn bao lâu một lần thì an toàn?",
            "Tôi có cần buồng đệm không và tôi nên lường trước tác dụng phụ nào?",
          ],
        },
        {
          id: "monitoring",
          title: "Theo dõi & kế hoạch hành động",
          questions: [
            "Tôi có nên đo lưu lượng đỉnh tại nhà không?",
            "Làm sao tôi biết hen của mình đang nặng hơn?",
            "Khi nào tôi nên dùng kế hoạch hành động, gọi cho bác sĩ hoặc đến cấp cứu?",
            "Tôi nên đến tái khám bao lâu một lần?",
          ],
        },
        {
          id: "triggers-lifestyle",
          title: "Tác nhân kích hoạt & cuộc sống hằng ngày",
          questions: [
            "Làm sao tôi giảm các tác nhân kích hoạt ở nhà và nơi làm việc?",
            "Tập thể dục có an toàn không và làm sao để phòng ngừa cơn hen?",
            "Tôi cần tiêm vắc-xin nào (cúm, viêm phổi, COVID)?",
            "Hút thuốc lá hay thuốc lá điện tử có ảnh hưởng đến hen của tôi không?",
          ],
        },
      ],
      subtypes: [
        {
          id: "allergic",
          label: "Hen dị ứng (ngoại sinh)",
          categories: [
            {
              id: "allergic-specific",
              title: "Hen dị ứng — câu hỏi cụ thể",
              questions: [
                "Tôi có nên làm xét nghiệm dị ứng không?",
                "Thuốc dị ứng hoặc liệu pháp miễn dịch có giúp ích cho tôi không?",
                "Tôi nên tránh những dị nguyên nào nhất?",
              ],
            },
          ],
        },
        {
          id: "non-allergic",
          label: "Hen không dị ứng (nội sinh)",
          categories: [
            {
              id: "non-allergic-specific",
              title: "Hen không dị ứng — câu hỏi cụ thể",
              questions: [
                "Điều gì khởi phát cơn hen của tôi nếu không phải do dị ứng?",
                "Nhiễm trùng, không khí lạnh hay căng thẳng có thể kích hoạt cơn hen của tôi không?",
                "Tôi có thể làm gì với các tác nhân không phải dị ứng?",
              ],
            },
          ],
        },
        {
          id: "exercise-induced",
          label: "Hen do gắng sức",
          categories: [
            {
              id: "exercise-specific",
              title: "Hen do gắng sức — câu hỏi cụ thể",
              questions: [
                "Tôi nên làm gì trước khi tập luyện để phòng ngừa triệu chứng?",
                "Tôi có nên dùng thuốc hít trước khi tập không?",
                "Môn thể thao hoặc hoạt động nào an toàn nhất cho tôi?",
              ],
            },
          ],
        },
        {
          id: "cough-variant",
          label: "Hen thể ho",
          categories: [
            {
              id: "cough-specific",
              title: "Hen thể ho — câu hỏi cụ thể",
              questions: [
                "Cơn ho kéo dài của tôi có thể là hen suyễn không?",
                "Phương pháp điều trị nào giúp cho hen thể ho?",
                "Mất bao lâu thì cơn ho mới cải thiện?",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "sciatica",
      label: "Đau thần kinh tọa / Đau dây thần kinh",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Nguyên nhân gây đau thần kinh tọa của tôi là gì?",
            "Dây thần kinh hoặc đĩa đệm nào bị ảnh hưởng?",
            "Bệnh này có khả năng tự khỏi không?",
            "Thường mất bao lâu để hồi phục?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Tôi có thể làm gì tại nhà để giảm đau?",
            "Thuốc giảm đau nào an toàn cho tôi và dùng trong bao lâu?",
            "Vật lý trị liệu có giúp ích không?",
            "Tôi có cần tiêm hoặc phẫu thuật không — và nếu phẫu thuật thì tỷ lệ thành công là bao nhiêu?",
          ],
        },
        {
          id: "activity",
          title: "Vận động & hồi phục",
          questions: [
            "Tôi nên tránh những cử động hoặc tư thế nào?",
            "Nghỉ ngơi hay tiếp tục vận động thì tốt hơn?",
            "Có bài kéo giãn hoặc bài tập nào giúp ích không?",
            "Khi nào tôi có thể trở lại làm việc hoặc sinh hoạt bình thường?",
          ],
        },
        {
          id: "warning-signs",
          title: "Dấu hiệu cảnh báo & xét nghiệm",
          questions: [
            "Triệu chứng nào có nghĩa là tôi nên gọi cho bác sĩ ngay?",
            "Tê, yếu cơ hoặc mất kiểm soát tiểu tiện có phải là tình trạng cấp cứu không?",
            "Tôi cần chụp chiếu hoặc xét nghiệm gì?",
          ],
        },
      ],
    },
    {
      id: "psoriasis-eczema",
      label: "Vảy nến / Chàm (Eczema)",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Đây là vảy nến, chàm hay bệnh khác?",
            "Điều gì kích hoạt các đợt bùng phát của tôi?",
            "Đây có phải là bệnh suốt đời không?",
            "Bệnh này có lây không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Tôi nên dùng kem hoặc thuốc mỡ nào và dùng như thế nào?",
            "Có phương pháp điều trị mạnh hơn nào (liệu pháp ánh sáng, thuốc uống, thuốc sinh học) phù hợp với tôi không?",
            "Mất bao lâu thì tôi thấy cải thiện?",
            "Tôi nên lường trước tác dụng phụ nào từ phương pháp điều trị?",
          ],
        },
        {
          id: "daily-care",
          title: "Chăm sóc da hằng ngày",
          questions: [
            "Bác sĩ khuyên dùng quy trình và sản phẩm chăm sóc da nào?",
            "Tôi nên tránh loại xà phòng, vải vóc hoặc thực phẩm nào?",
            "Tôi chăm sóc da như thế nào trong một đợt bùng phát?",
            "Làm sao tôi giảm ngứa?",
          ],
        },
        {
          id: "broader-health",
          title: "Sức khỏe tổng thể",
          questions: [
            "Bệnh da của tôi có liên quan đến vấn đề nào khác không (khớp, tim, tâm trạng)?",
            "Tôi có nên gặp bác sĩ chuyên khoa không?",
            "Chúng ta sẽ theo dõi xem điều trị có hiệu quả không như thế nào?",
          ],
        },
      ],
    },
    {
      id: "gerd",
      label: "Trào ngược axit / GERD",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Nguyên nhân gây trào ngược axit của tôi là gì?",
            "Đây có phải là GERD và có thể gây hại cho thực quản của tôi không?",
            "Tôi có cần làm xét nghiệm nào không, như nội soi?",
            "Đây có phải là bệnh lâu dài không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Thuốc nào phù hợp với tôi và dùng trong bao lâu?",
            "Dùng thuốc giảm axit lâu dài có rủi ro gì không?",
            "Tôi có thể làm gì nếu dùng thuốc vẫn chưa đủ?",
            "Nếu được đề nghị phẫu thuật, tỷ lệ thành công là bao nhiêu và có rủi ro gì?",
          ],
        },
        {
          id: "diet-lifestyle",
          title: "Chế độ ăn & lối sống",
          questions: [
            "Tôi nên tránh những thực phẩm và đồ uống nào?",
            "Thời điểm ăn và khẩu phần ăn ảnh hưởng đến trào ngược như thế nào?",
            "Giảm cân hoặc kê cao đầu giường có giúp ích không?",
            "Hút thuốc lá hoặc uống rượu có làm bệnh nặng hơn không?",
          ],
        },
        {
          id: "warning-signs",
          title: "Dấu hiệu cảnh báo",
          questions: [
            "Triệu chứng nào cần được khám sớm (khó nuốt, sụt cân, nôn ra máu)?",
            "Triệu chứng của tôi có thể là bệnh khác chứ không phải trào ngược không?",
            "Tôi nên tái khám bao lâu một lần?",
          ],
        },
      ],
    },
    {
      id: "infertility",
      label: "Hiếm muộn / Mong có con",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về vấn đề",
          questions: [
            "Cả hai chúng tôi cần làm những xét nghiệm gì để tìm nguyên nhân?",
            "Điều gì có thể khiến việc thụ thai khó khăn hơn?",
            "Tuổi tác và sức khỏe của tôi ảnh hưởng đến cơ hội của chúng tôi như thế nào?",
            "Chúng tôi nên tiếp tục thử trong bao lâu trước khi làm thêm xét nghiệm?",
          ],
        },
        {
          id: "treatment-options",
          title: "Phương án điều trị",
          questions: [
            "Chúng tôi có những lựa chọn nào, từ đơn giản nhất đến tiên tiến nhất?",
            "Tỷ lệ thành công đối với trường hợp như chúng tôi là bao nhiêu?",
            "Mỗi lựa chọn tốn bao nhiêu chi phí và có được bảo hiểm chi trả không?",
            "Rủi ro và tác dụng phụ của mỗi phương pháp điều trị là gì?",
          ],
        },
        {
          id: "process",
          title: "Quá trình thực hiện",
          questions: [
            "Mỗi bước mất bao lâu?",
            "Thường thực hiện bao nhiêu chu kỳ hoặc lần thử trước khi đổi hướng?",
            "Thay đổi lối sống nào có thể cải thiện cơ hội của chúng tôi?",
            "Chúng tôi có nên gặp bác sĩ chuyên khoa hiếm muộn không?",
          ],
        },
        {
          id: "emotional-practical",
          title: "Cảm xúc & thực tế",
          questions: [
            "Có hỗ trợ nào cho căng thẳng trong quá trình này không?",
            "Chúng tôi có những lựa chọn nào nếu điều trị không thành công?",
            "Chúng tôi quyết định khi nào nên dừng lại hoặc thay đổi kế hoạch như thế nào?",
          ],
        },
      ],
    },
    {
      id: "multiple-sclerosis",
      label: "Đa xơ cứng (MS)",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về bệnh",
          questions: [
            "Tôi mắc loại đa xơ cứng nào?",
            "Kết quả MRI và xét nghiệm của tôi cho thấy điều gì?",
            "Bệnh này có thể ảnh hưởng đến tôi theo thời gian như thế nào?",
            "Sự khác biệt giữa đợt tái phát và tiến triển bệnh là gì?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Phương pháp điều trị điều chỉnh bệnh nào tốt nhất cho tôi và tại sao?",
            "Lợi ích và rủi ro của phương pháp điều trị này là gì?",
            "Một đợt tái phát được điều trị như thế nào?",
            "Tôi nên lường trước tác dụng phụ nào và làm sao biết điều trị có hiệu quả?",
          ],
        },
        {
          id: "symptoms-daily",
          title: "Triệu chứng & cuộc sống hằng ngày",
          questions: [
            "Tôi kiểm soát mệt mỏi, đau hoặc các triệu chứng khác như thế nào?",
            "Vật lý trị liệu hoặc liệu pháp nghề nghiệp có giúp ích không?",
            "Nhiệt độ, căng thẳng hoặc nhiễm trùng ảnh hưởng đến bệnh MS của tôi như thế nào?",
            "Tôi có thể làm gì để duy trì hoạt động tốt nhất có thể?",
          ],
        },
        {
          id: "planning-monitoring",
          title: "Lên kế hoạch & theo dõi",
          questions: [
            "Tôi cần chụp MRI hoặc khám định kỳ bao lâu một lần?",
            "Triệu chứng nào khiến tôi nên gọi cho bác sĩ ngay?",
            "MS có thể ảnh hưởng đến công việc, lái xe hoặc kế hoạch sinh con như thế nào?",
            "Tôi có thể tiếp cận những dịch vụ hỗ trợ nào?",
          ],
        },
      ],
    },
    {
      id: "insomnia",
      label: "Mất ngủ / Rối loạn giấc ngủ",
      categories: [
        {
          id: "understanding",
          title: "Hiểu về vấn đề",
          questions: [
            "Điều gì có thể gây ra vấn đề về giấc ngủ của tôi?",
            "Một tình trạng sức khỏe hoặc thuốc nào đó có thể khiến tôi mất ngủ không?",
            "Tôi có cần làm nghiên cứu giấc ngủ không?",
            "Tôi nên ngủ bao nhiêu là đủ?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Tôi có thể thử những thay đổi nào trước khi dùng thuốc?",
            "Liệu pháp nhận thức hành vi cho chứng mất ngủ (CBT-I) có phải là một lựa chọn không?",
            "Nếu tôi cần thuốc ngủ, rủi ro và tác dụng phụ là gì, và tôi nên dùng trong bao lâu?",
            "Thuốc hỗ trợ giấc ngủ không kê đơn có an toàn cho tôi không?",
          ],
        },
        {
          id: "habits",
          title: "Thói quen & nề nếp",
          questions: [
            "Thói quen hằng ngày nào giúp ích hoặc gây hại cho giấc ngủ của tôi?",
            "Caffeine, rượu và màn hình điện tử ảnh hưởng đến giấc ngủ của tôi như thế nào?",
            "Một nề nếp đi ngủ tốt nên như thế nào?",
            "Ngủ trưa có ổn không?",
          ],
        },
        {
          id: "followup",
          title: "Theo dõi",
          questions: [
            "Chúng ta sẽ đo lường xem giấc ngủ của tôi có cải thiện không như thế nào?",
            "Tôi có nên ghi nhật ký giấc ngủ không?",
            "Khi nào tôi nên tái khám?",
          ],
        },
      ],
    },
    {
      id: "uti",
      label: "Nhiễm trùng đường tiết niệu (UTI)",
      categories: [
        {
          id: "understanding",
          title: "Tìm hiểu về bệnh",
          questions: [
            "Đây có phải là nhiễm trùng bàng quang hay có thể liên quan đến thận của tôi không?",
            "Nguyên nhân nào gây ra nhiễm trùng này?",
            "Tại sao tôi cứ bị (UTI) tái phát?",
            "Tôi có cần cấy nước tiểu hoặc các xét nghiệm khác không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Tôi sẽ dùng loại kháng sinh nào và trong bao nhiêu ngày?",
            "Nếu các triệu chứng của tôi không cải thiện trong vài ngày thì sao?",
            "Tôi nên chú ý đến những tác dụng phụ nào?",
            "Có thuốc nào tôi có thể dùng để giảm cảm giác nóng rát hoặc đau không?",
          ],
        },
        {
          id: "prevention",
          title: "Phòng ngừa",
          questions: [
            "Làm thế nào tôi có thể ngăn ngừa (UTI) tái phát trong tương lai?",
            "Nước ép nam việt quất hoặc thực phẩm bổ sung có thực sự giúp ích không?",
            "Tôi nên uống bao nhiêu nước mỗi ngày?",
            "Có thói quen vệ sinh nào tôi nên thay đổi không?",
          ],
        },
        {
          id: "warning",
          title: "Khi nào cần lo lắng",
          questions: [
            "Những triệu chứng nào cho thấy nhiễm trùng đang trở nên nghiêm trọng hơn?",
            "Khi nào tôi nên đến phòng khám cấp cứu hoặc khoa cấp cứu?",
            "Sốt hoặc đau lưng có thể là dấu hiệu của nhiễm trùng thận không?",
          ],
        },
      ],
    },
    {
      id: "urinary-incontinence",
      label: "Tiểu không tự chủ",
      categories: [
        {
          id: "understanding",
          title: "Tìm hiểu về bệnh",
          questions: [
            "Tôi mắc loại tiểu không tự chủ nào — tiểu không tự chủ do gắng sức, do thôi thúc, hay hỗn hợp?",
            "Điều gì đang gây ra tình trạng rò rỉ nước tiểu của tôi?",
            "Các loại thuốc tôi đang dùng có thể làm tình trạng này tệ hơn không?",
            "Tôi có cần xét nghiệm nào không, ví dụ như xét nghiệm chức năng bàng quang?",
          ],
        },
        {
          id: "treatment",
          title: "Các lựa chọn điều trị",
          questions: [
            "Bài tập sàn chậu (Kegel) có thể giúp tôi không — và làm thế nào để tập đúng cách?",
            "Tập luyện bàng quang hoặc đi vệ sinh theo lịch trình có giúp ích không?",
            "Có loại thuốc nào cho tình trạng này không, và tác dụng phụ là gì?",
            "Khi nào thì phẫu thuật hoặc thủ thuật được cân nhắc?",
          ],
        },
        {
          id: "lifestyle",
          title: "Cuộc sống hàng ngày",
          questions: [
            "Tôi có nên thay đổi lượng hoặc thời điểm uống nước không?",
            "Caffeine hoặc rượu có làm tình trạng này tệ hơn không?",
            "Bạn đề xuất sản phẩm hoặc biện pháp bảo vệ nào?",
            "Giảm cân có thể cải thiện các triệu chứng của tôi không?",
          ],
        },
        {
          id: "referral",
          title: "Chuyên gia",
          questions: [
            "Tôi có nên gặp bác sĩ tiết niệu hay bác sĩ niệu phụ khoa không?",
            "Chuyên gia vật lý trị liệu sàn chậu có phải là một lựa chọn cho tôi không?",
          ],
        },
      ],
    },
    {
      id: "blood-in-urine",
      label: "Tiểu ra máu",
      categories: [
        {
          id: "understanding",
          title: "Tìm hiểu",
          questions: [
            "Những nguyên nhân nào có khả năng nhất gây ra máu trong nước tiểu của tôi?",
            "Tình trạng này có thể do nhiễm trùng, sỏi thận hay nguyên nhân nào đó nghiêm trọng hơn không?",
            "Có phải do thuốc hay thức ăn gây ra sự thay đổi màu sắc này không?",
            "Lượng máu có phản ánh mức độ nghiêm trọng của vấn đề không?",
          ],
        },
        {
          id: "tests",
          title: "Các xét nghiệm",
          questions: [
            "Tôi cần làm những xét nghiệm nào — xét nghiệm nước tiểu, chụp chiếu hình ảnh, hay nội soi bàng quang (cystoscopy)?",
            "Mỗi xét nghiệm sẽ cho chúng ta biết điều gì?",
            "Các xét nghiệm này nên được thực hiện sớm đến mức nào?",
            "Bác sĩ có kiểm tra chức năng thận của tôi không?",
          ],
        },
        {
          id: "nextsteps",
          title: "Các bước tiếp theo",
          questions: [
            "Tôi nên làm gì nếu tôi thấy máu lại trước khi làm các xét nghiệm?",
            "Tôi có cần gặp bác sĩ tiết niệu hay bác sĩ chuyên khoa thận không?",
            "Những triệu chứng nào cho thấy tôi cần đi khám ngay lập tức?",
            "Khi nào chúng ta sẽ có câu trả lời về nguyên nhân?",
          ],
        },
      ],
    },
    {
      id: "migraine",
      label: "Đau nửa đầu (Migraine)",
      categories: [
        {
          id: "understanding",
          title: "Tìm hiểu",
          questions: [
            "Cơn đau đầu của tôi có phải là đau nửa đầu (migraine) thật sự, hay là một loại đau đầu khác?",
            "Những yếu tố kích hoạt phổ biến nhất của tôi là gì?",
            "Tôi có nên ghi nhật ký đau đầu không — tôi nên theo dõi những gì?",
            "Tôi có cần chụp não hay các xét nghiệm khác không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Tôi nên dùng gì khi cơn đau nửa đầu (migraine) bắt đầu, và nhanh đến mức nào?",
            "Tôi có phải là đối tượng phù hợp để dùng thuốc dự phòng không?",
            "Còn về các loại thuốc đau nửa đầu (migraine) mới hơn (thuốc ức chế CGRP) — chúng có giúp ích gì cho tôi không?",
            "Tôi có thể dùng quá liều thuốc giảm đau không — đau đầu do lạm dụng thuốc là gì?",
          ],
        },
        {
          id: "lifestyle",
          title: "Yếu tố kích hoạt & lối sống",
          questions: [
            "Có phải một số loại thực phẩm, sự thay đổi giấc ngủ, hay căng thẳng gây ra các cơn đau của tôi không?",
            "Hormone của tôi có đóng vai trò gì không?",
            "Những thay đổi nào trong thói quen hàng ngày có thể giúp giảm các cơn đau?",
          ],
        },
        {
          id: "warning",
          title: "Khi nào cần lo lắng",
          questions: [
            "Những triệu chứng đau đầu nào là dấu hiệu cảnh báo cần chăm sóc y tế khẩn cấp?",
            "Khi nào tôi nên quay lại nếu tình trạng không cải thiện?",
          ],
        },
      ],
    },
    {
      id: "epilepsy-seizures",
      label: "Động kinh / Co giật",
      categories: [
        {
          id: "understanding",
          title: "Tìm hiểu",
          questions: [
            "Tôi đang bị loại co giật nào?",
            "Nguyên nhân gây ra chúng là gì — chúng ta có biết không?",
            "Tôi cần làm những xét nghiệm nào (EEG, MRI)?",
            "Tôi có sẽ bị thêm các cơn co giật nữa không?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Bạn khuyên tôi dùng loại thuốc nào và tại sao ạ?",
            "Tôi cần lưu ý những tác dụng phụ nào ạ?",
            "Điều gì sẽ xảy ra nếu tôi quên một liều thuốc ạ?",
            "Tôi sẽ cần uống thuốc trong bao lâu ạ?",
          ],
        },
        {
          id: "safety",
          title: "An toàn và cuộc sống hàng ngày",
          questions: [
            "Tôi có thể lái xe không — quy định ở bang tôi là gì ạ?",
            "Gia đình tôi nên làm gì nếu tôi bị động kinh (seizure) ạ?",
            "Có những hoạt động nào tôi nên tránh không (bơi lội, độ cao) ạ?",
            "Tôi có thể uống rượu khi đang dùng thuốc không ạ?",
          ],
        },
        {
          id: "monitoring",
          title: "Tái khám",
          questions: [
            "Tôi có nên theo dõi các cơn động kinh (seizure) của mình không — chi tiết nào hữu ích nhất cho bác sĩ ạ?",
            "Tôi có cần xét nghiệm máu để kiểm tra nồng độ thuốc không ạ?",
            "Khi nào tôi nên gặp chuyên gia động kinh (bác sĩ thần kinh) ạ?",
          ],
        },
      ],
    },
    {
      id: "vertigo",
      label: "Chóng mặt / Choáng váng",
      categories: [
        {
          id: "understanding",
          title: "Tìm hiểu về bệnh",
          questions: [
            "Điều gì đang gây ra tình trạng chóng mặt của tôi — tai trong, huyết áp, hay nguyên nhân nào khác ạ?",
            "Đây có phải là BPPV (sỏi tai trong lỏng lẻo) không ạ?",
            "Thuốc tôi đang dùng có thể gây ra tình trạng này không ạ?",
            "Tôi có cần kiểm tra thính lực hay kiểm tra thăng bằng không ạ?",
          ],
        },
        {
          id: "treatment",
          title: "Điều trị",
          questions: [
            "Thủ thuật tái định vị (như Epley) có thể khắc phục tình trạng này không ạ?",
            "Có loại thuốc nào giúp ích không, và tôi nên dùng khi nào ạ?",
            "Vật lý trị liệu tiền đình (thăng bằng) có giúp ích cho tôi không ạ?",
            "Tình trạng này sẽ kéo dài bao lâu ạ?",
          ],
        },
        {
          id: "safety",
          title: "An toàn",
          questions: [
            "Tôi nên làm gì trong cơn chóng mặt (vertigo) ạ?",
            "Làm thế nào để tôi có thể ngăn ngừa té ngã tại nhà ạ?",
            "Tôi lái xe có an toàn không ạ?",
          ],
        },
        {
          id: "warning",
          title: "Khi nào cần lo lắng",
          questions: [
            "Những triệu chứng chóng mặt nào có thể báo hiệu đột quỵ (stroke) hoặc điều gì đó khẩn cấp ạ?",
            "Khi nào tôi nên tìm kiếm sự chăm sóc y tế ngay lập tức ạ?",
          ],
        },
      ],
    },
    {
      id: "fatigue",
      label: "Mệt mỏi tổng quát",
      categories: [
        {
          id: "understanding",
          title: "Tìm nguyên nhân",
          questions: [
            "Những nguyên nhân phổ biến nhất gây ra tình trạng mệt mỏi như của tôi là gì ạ?",
            "Đây có thể là thiếu máu (anemia), tuyến giáp (thyroid), thiếu vitamin, hoặc tiểu đường (diabetes) không ạ?",
            "Thuốc tôi đang dùng có thể làm tôi mệt mỏi không ạ?",
            "Giấc ngủ kém hoặc chứng ngưng thở khi ngủ (sleep apnea) có thể là nguyên nhân không ạ?",
          ],
        },
        {
          id: "tests",
          title: "Xét nghiệm",
          questions: [
            "Tôi nên làm những xét nghiệm máu nào ạ?",
            "Tôi có cần làm nghiên cứu giấc ngủ (sleep study) không ạ?",
            "Chúng ta sẽ làm gì nếu tất cả các xét nghiệm đều bình thường?",
          ],
        },
        {
          id: "mental",
          title: "Tâm trạng & căng thẳng",
          questions: [
            "Liệu căng thẳng, lo âu hay trầm cảm có phải là một phần nguyên nhân của vấn đề này không?",
            "Làm thế nào để phân biệt nguyên nhân thể chất với nguyên nhân tinh thần?",
          ],
        },
        {
          id: "lifestyle",
          title: "Những gì tôi có thể làm",
          questions: [
            "Những thay đổi nào về chế độ ăn uống, tập thể dục hoặc giấc ngủ sẽ giúp ích nhất?",
            "Tôi nên ngủ bao nhiêu là đủ?",
            "Khi nào tôi có thể mong đợi cảm thấy tốt hơn, và bước tiếp theo của chúng ta là gì nếu tôi không khá hơn?",
          ],
        },
      ],
    },
  ],
};

export default vi;
