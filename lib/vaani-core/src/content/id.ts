import type { LanguageData } from "./types";
import { FEATURE_TRANSLATIONS } from "./feature-translations";

const id: LanguageData = {
  "code": "id",
  "label": "Bahasa Indonesia",
  "ui": {
    ...FEATURE_TRANSLATIONS.id,
    "appTitle": "Vaani",
    "appSubtitle": "Temukan suara Anda saat di ruang praktik dokter.",
    "heroHeading": "Persiapkan diri untuk kunjungan dokter Anda",
    "heroDescription": "Vaani membantu Anda menyiapkan pertanyaan-pertanyaan yang akan diajukan — sehingga Anda meninggalkan janji temu dengan jawaban, bukan penyesalan.",
    "tip": "Tips: Centang setiap pertanyaan yang ingin Anda ajukan — meskipun terasa sepele. Dokter Anda siap membantu.",
    "conditionSelectLabel": "Apa yang ingin Anda bicarakan dengan dokter Anda?",
    "conditionSelectPlaceholder": "— Pilih topik —",
    "printButton": "Cetak halaman ini",
    "downloadButton": "Unduh salinan",
    "savedLocallyNotice": "Disimpan hanya di perangkat ini — unduh salinannya agar tidak hilang.",
    "visitTypeLabel": "Apakah ini kunjungan pertama Anda atau kunjungan lanjutan?",
    "visitTypeFirst": "Kunjungan pertama",
    "visitTypeFollowup": "Kunjungan lanjutan",
    "followupCategory": {
      "id": "followup-visit",
      "title": "Sejak kunjungan terakhir saya",
      "questions": [
        "Bagaimana kondisi saya berubah sejak kunjungan terakhir saya?",
        "Apa yang ditunjukkan oleh hasil tes atau lab terbaru saya?",
        "Apakah obat-obatan saya saat ini masih berfungsi — apakah ada yang perlu diubah?",
        "Apakah ada efek samping yang harus terus saya perhatikan?",
        "Apakah kita perlu menyesuaikan rencana perawatan saya?",
        "Apa yang harus saya lakukan atau pantau sebelum kunjungan berikutnya?"
      ]
    },
    "uploadTitle": "Tambahkan pertanyaan dari laporan lab atau medis Anda",
    "uploadHint": "Unggah foto atau PDF laporan terbaru Anda. Ini dikirim ke AI untuk menyarankan pertanyaan, lalu dibuang — tidak disimpan.",
    "uploadButton": "Unggah laporan",
    "uploadChooseAnother": "Pilih berkas lain",
    "uploadAnalyzing": "Membaca laporan Anda…",
    "uploadError": "Tidak dapat membaca berkas itu. Harap coba foto yang jelas atau PDF.",
    "uploadTooLarge": "Berkas itu terlalu besar. Harap gunakan yang di bawah 8 MB.",
    "resetButton": "Atur ulang / mulai dari awal",
    "resetConfirmText": "Ini akan menghapus semua centang, catatan, dan pertanyaan khusus Anda.",
    "resetConfirmYes": "Ya, atur ulang",
    "resetConfirmCancel": "Batal",
    "notesLabel": "Apa yang dikatakan dokter kepada saya",
    "notesPlaceholder": "Tulis catatan di sini selama atau setelah kunjungan Anda…",
    "yourQuestionsTitle": "Pertanyaan Anda",
    "yourQuestionsPlaceholder": "Tambahkan pertanyaan Anda sendiri…",
    "yourQuestionsAdd": "Tambah",
    "disclaimer": "Alat ini membantu Anda menyiapkan pertanyaan — ini bukan nasihat medis. Selalu ikuti panduan dokter Anda.",
    "questionsSoonTitle": "Pertanyaan segera hadir",
    "questionsSoonDesc": "Pertanyaan umum untuk topik ini sedang ditambahkan. Gunakan kotak di bawah untuk menambahkan pertanyaan Anda sendiri sekarang.",
    "ckdStageLabel": "Stadium CKD saya",
    "ckdStagePlaceholder": "— Pilih stadium —",
    "ckdStageOptional": "(opsional)",
    "ckdStageNotes": {
      "stage-1": "Stadium 1 (eGFR ≥ 90): Ada kerusakan ginjal tetapi fungsinya normal atau tinggi. Fokusnya adalah melindungi ginjal dan mengobati penyebabnya.",
      "stage-2": "Stadium 2 (eGFR 60–89): Penurunan ringan. Fokusnya adalah memperlambat perkembangan penyakit.",
      "stage-3": "Stadium 3 (eGFR 30–59): Penurunan sedang. Mengelola komplikasi itu penting.",
      "stage-4": "Stadium 4 (eGFR 15–29): Penurunan parah. Saatnya merencanakan terapi pengganti ginjal.",
      "stage-5": "Stadium 5 (eGFR < 15): Gagal ginjal. Biasanya diperlukan dialisis atau transplantasi.",
      "not-sure": "Tidak yakin stadium Anda? Tanyakan kepada dokter Anda berapa angka eGFR Anda."
    },
    "transplantLabel": "Saya tertarik atau sedang dievaluasi untuk transplantasi ginjal.",
    "transplantSubLabel": "Ini akan menambahkan pertanyaan khusus transplantasi di bawah.",
    "cancerSubtypeLabel": "Jenis kanker apa?",
    "cancerSubtypeOptional": "(opsional — akan menambahkan pertanyaan spesifik)",
    "cancerSubtypePlaceholder": "— Pilih jenis —",
    "aiPanelHeading": "Tambahkan pertanyaan untuk situasi saya",
    "aiPanelLabel": "Jelaskan situasi dan gejala Anda dengan kata-kata Anda sendiri",
    "aiPanelPlaceholder": "Contoh: \"Saya 62 tahun, baru saja didiagnosis menderita {kondisi}, dan saya ingin memahami pilihan pengobatan saya.\"",
    "aiPanelButton": "Sarankan pertanyaan untuk saya",
    "aiPanelLoading": "Sedang berpikir…",
    "aiPanelDisclaimer": "Penjelasan Anda dikirim dengan aman ke server kami dan diproses oleh layanan AI untuk menghasilkan saran; penjelasan tersebut tidak disimpan. Pertanyaan yang disarankan AI hanya untuk memulai percakapan—bukan nasihat medis.",
    "aiPanelError": "Terjadi kesalahan. Silakan coba lagi sebentar lagi.",
    "safetyNoticeTitle": "Butuh bantuan sekarang?",
    "safetyNoticeLine988": "Jika Anda sedang dalam krisis atau berpikir untuk menyakiti diri sendiri, Anda berhak mendapatkan bantuan sekarang. Di AS, hubungi atau SMS 988 (Suicide & Crisis Lifeline).",
    "safetyNoticeInternational": "Sumber daya krisis bervariasi di setiap negara — harap cari nomor telepon darurat untuk wilayah Anda.",
    "permissionDeniedTitle": "Izin diperlukan",
    "permissionDeniedMessage": "Vaani tidak memiliki akses. Izinkan di Pengaturan perangkat Anda untuk menggunakan fitur ini.",
    "openSettings": "Buka Pengaturan",
    "languageLabel": "Bahasa",
    "aboutArticleLabel": "Baca tentang kondisi ini:",
    "addTopicButton": "Tambahkan topik Anda jika tidak ditemukan di atas",
    "addTopicPlaceholder": "Ketik topik Anda (misalnya: nyeri lutut)…",
    "addTopicSave": "Tambahkan topik",
    "sourcesTitle": "Sumber & Referensi Medis",
    "sourcesIntro": "Pertanyaan dan informasi dalam aplikasi ini berdasarkan panduan dari organisasi kesehatan terpercaya ini. Ketuk sumber untuk mempelajari lebih lanjut:"
  },
  "conditions": [
    {
      "id": "diabetes",
      "label": "Diabetes",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Jenis apa yang saya miliki?",
            "Berapa angka-angka penting saya (A1C, gula darah puasa)?",
            "Berapa target A1C saya?",
            "Apakah ini bisa dikelola atau dipulihkan?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Obat apa yang saya butuhkan dan bagaimana cara kerjanya?",
            "Apakah saya akan membutuhkan insulin?",
            "Efek samping apa yang harus saya perhatikan?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan",
          "questions": [
            "Seberapa sering saya harus memeriksa gula darah saya?",
            "Haruskah saya menggunakan CGM?",
            "Kapan kita akan memeriksa ulang A1C saya?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Gaya Hidup",
          "questions": [
            "Perubahan diet apa yang paling membantu?",
            "Berapa banyak olahraga yang direkomendasikan?",
            "Bagaimana berat badan saya memengaruhi ini?"
          ]
        },
        {
          "id": "followup",
          "title": "Kontrol & komplikasi",
          "questions": [
            "Bagaimana ini memengaruhi mata, ginjal, kaki, dan jantung saya?",
            "Skrining apa yang saya perlukan dan kapan?",
            "Kapan kunjungan saya berikutnya?"
          ]
        }
      ]
    },
    {
      "id": "high-blood-pressure",
      "label": "Tekanan darah tinggi",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Berapa angka saya dan berapa target saya?",
            "Apa kemungkinan penyebabnya?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Obat apa dan mengapa?",
            "Apa efek sampingnya?",
            "Bisakah saya mencoba perubahan gaya hidup terlebih dahulu?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan",
          "questions": [
            "Haruskah saya memeriksanya di rumah, dan seberapa sering?",
            "Pembacaan berapa yang harus saya khawatirkan?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Gaya hidup",
          "questions": [
            "Bagaimana dengan garam, alkohol, olahraga, berat badan, dan stres?"
          ]
        },
        {
          "id": "followup",
          "title": "Kontrol",
          "questions": [
            "Kapan kita periksa ulang?",
            "Organ apa yang berisiko jika tidak terkontrol?"
          ]
        }
      ]
    },
    {
      "id": "skin-rash",
      "label": "Ruam kulit",
      "categories": [
        {
          "id": "what-is-it",
          "title": "Apa itu?",
          "questions": [
            "Apa kemungkinan penyebabnya?",
            "Apakah menular atau alergi?",
            "Apakah saya perlu tes atau biopsi?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Krim atau obat apa, dan berapa lama?",
            "Bagaimana jika tidak kunjung sembuh?"
          ]
        },
        {
          "id": "triggers",
          "title": "Pemicu",
          "questions": [
            "Produk, makanan, atau aktivitas apa yang harus saya hindari?"
          ]
        },
        {
          "id": "when-to-worry",
          "title": "Kapan harus khawatir",
          "questions": [
            "Tanda-tanda apa yang berarti ini memburuk?",
            "Kapan saya harus kembali atau pergi ke UGD?"
          ]
        }
      ]
    },
    {
      "id": "skin-bump-lump",
      "label": "Bintil atau benjolan kulit",
      "categories": [
        {
          "id": "what-is-it",
          "title": "Apa itu?",
          "questions": [
            "Menurut Anda, ini apa?",
            "Apakah kita perlu biopsi atau pemeriksaan pencitraan?",
            "Mungkinkah ini kanker?"
          ]
        },
        {
          "id": "options",
          "title": "Pilihan",
          "questions": [
            "Haruskah ini diangkat?",
            "Apa risiko mengangkatnya dibandingkan dengan mengawasinya?"
          ]
        },
        {
          "id": "changes",
          "title": "Perubahan",
          "questions": [
            "Seberapa cepat ini bisa berubah?",
            "Tanda-tanda apa yang berarti saya harus segera kembali?"
          ]
        },
        {
          "id": "followup",
          "title": "Tindak Lanjut",
          "questions": [
            "Kapan kita harus memeriksanya kembali?"
          ]
        }
      ]
    },
    {
      "id": "cancer",
      "label": "Kanker",
      "categories": [
        {
          "id": "diagnosis",
          "title": "Diagnosis",
          "questions": [
            "Jenis dan stadium berapa ini?",
            "Tes apa yang mengkonfirmasinya?",
            "Di mana letaknya, dan apakah sudah menyebar?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Pilihan pengobatan",
          "questions": [
            "Apa SAJA pilihan saya (operasi, kemoterapi, radiasi, imunoterapi, terapi target, pantau saja/observasi)?",
            "Apa yang Anda rekomendasikan dan mengapa?",
            "Apakah tujuannya untuk menyembuhkan atau mengendalikannya?"
          ]
        },
        {
          "id": "side-effects",
          "title": "Efek samping",
          "questions": [
            "Apa saja efek samping dari setiap pilihan?",
            "Apakah ini akan memengaruhi kesuburan?",
            "Adakah efek jangka panjang?"
          ]
        },
        {
          "id": "logistics",
          "title": "Logistik",
          "questions": [
            "Berapa lama pengobatannya?",
            "Bagaimana ini akan memengaruhi pekerjaan dan kehidupan sehari-hari?",
            "Bagaimana dengan biaya dan asuransi?",
            "Bagaimana cara saya mendapatkan opini kedua?"
          ]
        },
        {
          "id": "support",
          "title": "Dukungan",
          "questions": [
            "Apakah ada uji klinis?",
            "Bisakah saya menemui perawatan paliatif untuk dukungan gejala?",
            "Apakah ada kelompok dukungan?",
            "Siapa kontak utama saya?"
          ]
        },
        {
          "id": "followup",
          "title": "Tindak Lanjut",
          "questions": [
            "Bagaimana kita akan tahu kalau ini berhasil?",
            "Bagaimana jadwal pemindaiannya?",
            "Apa saja tanda-tanda kekambuhan?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "breast",
          "label": "Payudara",
          "categories": [
            {
              "id": "breast-specific",
              "title": "Kanker payudara — pertanyaan spesifik",
              "questions": [
                "Haruskah saya menjalani tes genetik (BRCA1/BRCA2), dan apakah itu akan mengubah pengobatan saya atau pemeriksaan keluarga saya?",
                "Bagaimana status reseptor hormon (ER/PR) dan HER2 saya, dan apa artinya bagi saya?",
                "Apa saja pilihan operasi saya (lumpektomi vs. mastektomi) dan pilihan rekonstruksi?",
                "Apakah saya memerlukan kemoterapi, radiasi, atau terapi hormon, dan dalam urutan apa?",
                "Bagaimana pengobatan akan memengaruhi kesuburan, dan bisakah saya menjaga pilihan sebelum memulai?"
              ]
            }
          ]
        },
        {
          "id": "lung",
          "label": "Paru-paru",
          "categories": [
            {
              "id": "lung-specific",
              "title": "Kanker paru-paru — pertanyaan khusus",
              "questions": [
                "Apakah ini disebabkan oleh merokok, dan apakah itu mengubah pengobatan?",
                "Apa yang ditunjukkan oleh tes mutasi saya?",
                "Apakah saya calon untuk operasi?"
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
              "title": "Kanker kolorektal — pertanyaan khusus",
              "questions": [
                "Apakah saya memerlukan kolostomi?",
                "Apakah tumornya diuji untuk penanda genetik?",
                "Bagaimana dengan jadwal skrining keluarga saya?"
              ]
            }
          ]
        },
        {
          "id": "prostate",
          "label": "Prostat",
          "categories": [
            {
              "id": "prostate-specific",
              "title": "Kanker prostat — pertanyaan khusus",
              "questions": [
                "Berapa skor Gleason dan PSA saya?",
                "Apakah pengawasan aktif adalah pilihan bagi saya?",
                "Bagaimana pengobatan akan memengaruhi fungsi kemih dan seksual?"
              ]
            }
          ]
        },
        {
          "id": "melanoma",
          "label": "Kulit / Melanoma",
          "categories": [
            {
              "id": "melanoma-specific",
              "title": "Kulit / Melanoma — pertanyaan khusus",
              "questions": [
                "Seberapa dalam ini?",
                "Apakah kita perlu memeriksa kelenjar getah bening saya?",
                "Seberapa sering saya harus melakukan pemeriksaan kulit seluruh tubuh?"
              ]
            }
          ]
        },
        {
          "id": "cervical",
          "label": "Serviks",
          "categories": [
            {
              "id": "cervical-specific",
              "title": "Kanker serviks — pertanyaan khusus",
              "questions": [
                "Stadium berapa dan bagaimana status HPV saya?",
                "Bagaimana pengobatan akan memengaruhi kesuburan?",
                "Jadwal Pap/HPV tindak lanjut apa yang harus saya ikuti?"
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
              "title": "Leukemia — pertanyaan khusus",
              "questions": [
                "Tipe yang mana (akut atau kronis)?",
                "Apakah saya perlu pengobatan sekarang atau hanya pemantauan?",
                "Apakah saya memerlukan transplantasi sumsum tulang?"
              ]
            }
          ]
        },
        {
          "id": "lymphoma",
          "label": "Limfoma",
          "categories": [
            {
              "id": "lymphoma-specific",
              "title": "Limfoma — pertanyaan khusus",
              "questions": [
                "Hodgkin atau non-Hodgkin, dan subtipe yang mana?",
                "Bagaimana rencana pengobatan dan jangka waktunya?",
                "Apa efek jangka panjang dari pengobatan?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "ckd",
      "label": "Penyakit ginjal kronis (CKD)",
      "categories": [
        {
          "id": "diagnosis-stage",
          "title": "Diagnosis & stadium saya",
          "questions": [
            "Stadium berapa saya, dan berapa eGFR saya?",
            "Berapa kadar albumin urine (ACR) saya?",
            "Apa penyebab CKD saya?",
            "Apakah mungkin akan memburuk, dan seberapa cepat?"
          ]
        },
        {
          "id": "protecting-kidneys",
          "title": "Melindungi ginjal saya",
          "questions": [
            "Berapa target tekanan darah saya?",
            "Apakah saya perlu mengonsumsi ACE inhibitor, ARB, atau SGLT2 inhibitor?",
            "Obat atau suplemen apa yang harus saya hindari (misalnya, NSAID seperti ibuprofen)?",
            "Jika saya menderita diabetes, berapa target gula darah saya?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Diet & gaya hidup",
          "questions": [
            "Bisakah saya menemui ahli gizi ginjal?",
            "Berapa banyak protein, natrium, kalium, dan fosfor yang tepat untuk saya?",
            "Apakah ada batasan cairan yang harus saya ikuti?",
            "Suplemen apa yang aman?",
            "Bagaimana dengan olahraga?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan",
          "questions": [
            "Seberapa sering kita akan memeriksa hasil lab dan eGFR saya?",
            "Angka-angka mana yang harus saya pantau sendiri?",
            "Perubahan apa yang akan membuat Anda khawatir?"
          ]
        },
        {
          "id": "medications",
          "title": "Obat-obatan saya",
          "questions": [
            "Apakah ada obat-obatan saya saat ini yang memerlukan perubahan dosis untuk ginjal saya?",
            "Apakah saya perlu memulai atau menghentikan sesuatu?"
          ]
        },
        {
          "id": "planning-ahead",
          "title": "Merencanakan ke depan",
          "questions": [
            "Pada titik mana kita akan membahas dialisis atau transplantasi?",
            "Apa saja pilihan saya (hemodialisis, dialisis peritoneal, transplantasi, perawatan konservatif)?",
            "Bisakah saya menghindari dialisis dengan transplantasi dini (\"pre-emptive\")?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Emosional & praktis",
          "questions": [
            "Bagaimana ini dapat memengaruhi energi dan pekerjaan saya?",
            "Apakah ada dukungan kesehatan mental yang tersedia?",
            "Apakah ada kelompok dukungan atau organisasi ginjal yang Anda rekomendasikan?",
            "Di mana saya bisa mendapatkan bantuan terkait asuransi dan biaya?"
          ]
        },
        {
          "id": "red-flags",
          "title": "Tanda bahaya",
          "questions": [
            "Gejala apa yang berarti saya harus menghubungi Anda atau pergi ke UGD?"
          ]
        }
      ],
      "extraCategories": [
        {
          "id": "transplant",
          "triggerLabel": "Saya tertarik atau sedang dievaluasi untuk transplantasi ginjal.",
          "categories": [
            {
              "id": "transplant-eval",
              "title": "Evaluasi transplantasi",
              "questions": [
                "Apakah saya kandidat untuk transplantasi ginjal?",
                "Bagaimana dan kapan saya dirujuk ke pusat transplantasi?",
                "Bisakah saya dievaluasi sebelum saya membutuhkan dialisis (transplantasi pre-emptive)?",
                "Apa perbedaan antara donor hidup dan donor meninggal bagi saya?",
                "Bagaimana cara saya menemukan donor hidup — dan apakah boleh meminta bantuan keluarga atau teman?",
                "Tes apa saja yang terlibat dalam evaluasi, dan berapa lama seluruh prosesnya berlangsung?",
                "Apa yang bisa membuat saya tidak memenuhi syarat, dan apakah ada di antara hal-hal tersebut yang bisa saya usahakan atau perbaiki?",
                "Bisakah kita memulai proses evaluasi sekarang?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "thyroid",
      "label": "Kondisi tiroid",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahami kondisi ini",
          "questions": [
            "Apakah tiroid saya terlalu aktif atau kurang aktif?",
            "Berapa kadar TSH, T3, dan T4 saya?",
            "Apa penyebabnya (misalnya, Hashimoto's atau Graves')?",
            "Apakah ini permanen?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Obat apa yang saya perlukan, dan berapa dosisnya?",
            "Berapa lama sampai saya merasa lebih baik?",
            "Bagaimana jika saya masih merasa tidak enak badan setelah mulai mengonsumsinya?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan",
          "questions": [
            "Seberapa sering kita perlu memeriksa kembali kadar saya?",
            "Gejala apa yang menunjukkan bahwa dosis saya salah?"
          ]
        },
        {
          "id": "daily-life",
          "title": "Kehidupan sehari-hari",
          "questions": [
            "Bagaimana seharusnya saya mengonsumsi obat saya (waktu, makanan, obat lain)?",
            "Apakah ini memengaruhi berat badan, energi, suasana hati, rambut, atau menstruasi saya?",
            "Apakah ini memengaruhi kehamilan atau kesuburan?"
          ]
        },
        {
          "id": "followup",
          "title": "Tindak lanjut",
          "questions": [
            "Kapan jadwal tes darah dan kunjungan saya berikutnya?"
          ]
        }
      ]
    },
    {
      "id": "pcos-gyn",
      "label": "PCOS / Ginekologi",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahami kondisi ini",
          "questions": [
            "Apa yang menyebabkan gejala saya?",
            "Tes apa yang mengonfirmasi hal ini (hormon, USG)?"
          ]
        },
        {
          "id": "symptoms-treatment",
          "title": "Gejala & pengobatan",
          "questions": [
            "Apa saja pilihan saya untuk menstruasi tidak teratur, jerawat, atau rambut yang tidak diinginkan?",
            "Apakah saya memerlukan alat kontrasepsi, metformin, atau yang lainnya?",
            "Apa saja efek sampingnya?"
          ]
        },
        {
          "id": "fertility",
          "title": "Kesuburan",
          "questions": [
            "Bagaimana ini memengaruhi kemampuan saya untuk hamil?",
            "Apa yang bisa membantu jika saya ingin hamil — sekarang atau nanti?"
          ]
        },
        {
          "id": "long-term-health",
          "title": "Kesehatan jangka panjang",
          "questions": [
            "Apa risiko saya terhadap diabetes, masalah jantung, atau masalah lainnya, dan bagaimana cara kita memantaunya?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Gaya hidup",
          "questions": [
            "Apakah perubahan pola makan, berat badan, atau olahraga membantu, dan seberapa banyak?"
          ]
        },
        {
          "id": "general-gyn",
          "title": "Kunjungan ginekologi umum",
          "questions": [
            "Apakah saya perlu Pap smear atau tes HPV, dan kapan?",
            "Apakah pendarahan / nyeri / keputihan ini normal?",
            "Kapan saya harus kembali?"
          ]
        },
        {
          "id": "followup",
          "title": "Kontrol & pendapat kedua",
          "questions": [
            "Kapan kita perlu periksa ulang?",
            "Bagaimana cara mendapatkan rujukan jika saya menginginkannya?"
          ]
        }
      ]
    },
    {
      "id": "mental-health",
      "label": "Kesehatan mental (depresi / kecemasan)",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Menurut Anda, apa yang sedang terjadi?",
            "Apakah ada hal fisik (tiroid, vitamin, tidur, obat-obatan) yang bisa berkontribusi?"
          ]
        },
        {
          "id": "options",
          "title": "Pilihan",
          "questions": [
            "Apa saja pilihan pengobatan saya — terapi, obat-obatan, atau keduanya?",
            "Apa yang Anda sarankan dan mengapa?",
            "Berapa lama sampai saya mungkin merasakan perbedaannya?"
          ]
        },
        {
          "id": "medication",
          "title": "Obat-obatan",
          "questions": [
            "Apa efek sampingnya?",
            "Apakah ini bisa menyebabkan kecanduan?",
            "Bagaimana jika yang pertama tidak berhasil?",
            "Bagaimana dan kapan saya bisa menghentikannya dengan aman?"
          ]
        },
        {
          "id": "therapy-support",
          "title": "Terapi & dukungan",
          "questions": [
            "Terapi jenis apa yang cocok untuk saya, dan bagaimana cara menemukan terapisnya?",
            "Apakah ada kelompok dukungan atau pilihan berbiaya rendah?"
          ]
        },
        {
          "id": "daily-followup",
          "title": "Kehidupan sehari-hari & tindak lanjut",
          "questions": [
            "Apa yang bisa saya lakukan sehari-hari?",
            "Kapan kita harus memeriksa lagi?",
            "Siapa yang harus saya hubungi jika keadaan memburuk sebelum itu?"
          ]
        }
      ]
    },
    {
      "id": "liver-disease",
      "label": "Penyakit Hati",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Jenis penyakit hati apa yang saya alami — perlemakan hati, hepatitis, sirosis, atau yang lain?",
            "Apa penyebabnya, dan bisakah penyebab itu diobati?",
            "Pada tahap atau tingkat kerusakan apa hati saya?",
            "Apakah hati saya masih berfungsi normal saat ini?",
            "Bisakah ini membaik, atau kemungkinan akan memburuk seiring waktu?",
            "Haruskah saya menemui spesialis hati (hepatolog)?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan & obat-obatan",
          "questions": [
            "Apakah saya perlu obat, dan apa efek sampingnya?",
            "Apakah ada pengobatan yang bisa memperlambat atau membalikkan kerusakan?",
            "Apakah saya memerlukan prosedur apa pun, seperti biopsi hati atau endoskopi?",
            "Apakah ada uji klinis atau pengobatan baru yang harus saya ketahui?",
            "Jika kondisi hati saya memburuk, pilihan apa saja yang saya miliki — termasuk transplantasi?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Gaya hidup & pola makan",
          "questions": [
            "Haruskah saya berhenti total minum alkohol?",
            "Apakah ada makanan yang harus lebih banyak saya konsumsi, atau hindari?",
            "Apakah menurunkan berat badan akan membantu hati saya, dan seberapa banyak?",
            "Apakah aman mengonsumsi Tylenol, ibuprofen, atau obat pereda nyeri yang dijual bebas lainnya?",
            "Vitamin atau suplemen mana yang aman — dan mana yang harus saya hindari?",
            "Apakah olahraga aman dan bermanfaat untuk saya saat ini?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan & tes",
          "questions": [
            "Tes darah apa yang saya butuhkan dan seberapa sering?",
            "Apakah saya membutuhkan pemeriksaan pencitraan seperti USG, CT scan, atau MRI, dan seberapa sering?",
            "Apakah saya perlu diskrining untuk kanker hati?",
            "Bagaimana kita akan tahu apakah kondisi saya membaik atau memburuk?",
            "Apakah ada vaksin yang harus saya dapatkan untuk melindungi hati saya (hepatitis A, hepatitis B)?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Tanda-tanda peringatan",
          "questions": [
            "Gejala apa yang seharusnya membuat saya segera pergi ke unit gawat darurat?",
            "Apa yang harus saya perhatikan di rumah dan laporkan kepada Anda segera?",
            "Jika perut saya membengkak atau kulit saya menguning, apa yang harus saya lakukan?",
            "Apakah anggota keluarga saya perlu diperiksa — apakah ini ada yang bersifat keturunan atau menular?"
          ]
        }
      ]
    },
    {
      "id": "heart-disease",
      "label": "Penyakit Jantung / Kardiovaskular",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Jenis kondisi jantung apa yang sebenarnya saya alami?",
            "Seberapa serius ini, dan apa artinya bagi kehidupan sehari-hari saya?",
            "Apa penyebabnya — genetik, gaya hidup, atau hal lain?",
            "Seberapa baik jantung saya memompa saat ini (fraksi ejeksi atau ukuran lainnya)?",
            "Haruskah saya menemui ahli jantung atau spesialis jantung?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan & obat-obatan",
          "questions": [
            "Obat-obatan apa yang saya butuhkan, dan apa efek sampingnya?",
            "Apakah saya akan memerlukan prosedur — seperti stent, operasi bypass, atau alat pacu jantung?",
            "Bagaimana saya akan tahu apakah obat-obatan saya bekerja?",
            "Apa yang terjadi jika saya melewatkan satu dosis obat jantung saya?",
            "Apakah ada uji klinis atau perawatan baru yang harus saya ketahui?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Gaya hidup & diet",
          "questions": [
            "Perubahan diet apa yang paling akan membantu jantung saya?",
            "Berapa banyak garam dan alkohol yang aman?",
            "Berapa banyak olahraga yang aman untuk saya, dan jenis apa?",
            "Bagaimana stres memengaruhi jantung saya, dan apa yang bisa saya lakukan?",
            "Haruskah saya berhenti merokok, dan bantuan apa yang tersedia?",
            "Apakah aman untuk aktif secara seksual?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan & tes",
          "questions": [
            "Tes apa yang saya butuhkan — EKG, ekokardiogram, tes stres — dan seberapa sering?",
            "Angka apa yang harus saya pantau di rumah (tekanan darah, detak jantung, berat badan)?",
            "Berapa angka target kolesterol, tekanan darah, dan detak jantung saya?",
            "Bagaimana kita akan tahu apakah kondisi saya membaik atau memburuk?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Tanda-tanda Peringatan",
          "questions": [
            "Gejala apa yang menandakan saya harus segera menelepon 911?",
            "Tanda-tanda apa yang harus saya perhatikan dan laporkan kepada Anda segera?",
            "Apa yang harus saya lakukan jika saya mengalami nyeri atau tekanan di dada?",
            "Apakah ada anggota keluarga saya yang perlu diperiksa untuk penyakit jantung?"
          ]
        }
      ]
    },
    {
      "id": "joint-pain-arthritis",
      "label": "Nyeri Sendi / Radang Sendi",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Jenis radang sendi apa yang saya alami — osteoartritis, reumatoid, psoriatik, asam urat, atau yang lain?",
            "Apa yang menyebabkan kerusakan sendi dalam kasus saya?",
            "Sendi mana yang terpengaruh sekarang, dan apakah ini kemungkinan akan menyebar?",
            "Bagaimana saya tahu jika kerusakan sendi saya memburuk seiring waktu?",
            "Haruskah saya menemui reumatolog atau spesialis ortopedi?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan & Obat-obatan",
          "questions": [
            "Obat-obatan apa yang saya perlukan — NSAID, steroid, DMARD, atau biologik?",
            "Apa efek sampingnya, dan berapa lama saya perlu mengonsumsinya?",
            "Apakah terapi fisik atau terapi okupasi direkomendasikan untuk saya?",
            "Apakah suntikan sendi akan membantu, dan seberapa sering saya bisa mendapatkannya?",
            "Pada titik mana operasi atau penggantian sendi akan dipertimbangkan?"
          ]
        },
        {
          "id": "flares",
          "title": "Mengelola Serangan & Nyeri",
          "questions": [
            "Apa yang bisa saya lakukan di rumah ketika sendi saya kambuh?",
            "Apakah kompres panas atau dingin lebih baik untuk nyeri saya?",
            "Apakah ada penyangga, bidai, atau alat bantu yang akan membantu?",
            "Aktivitas apa yang harus saya hindari untuk melindungi sendi saya?",
            "Kapan serangan harus membuat saya menghubungi Anda daripada hanya mengelolanya di rumah?"
          ]
        },
        {
          "id": "lifestyle",
          "title": "Gaya Hidup & Pola Makan",
          "questions": [
            "Apakah ada makanan yang mengurangi peradangan — atau makanan yang memperburuknya?",
            "Berapa banyak olahraga yang aman, dan jenis apa yang terbaik untuk sendi saya?",
            "Apakah menurunkan berat badan akan membantu mengurangi nyeri sendi saya, dan seberapa banyak?",
            "Apakah ada suplemen yang bermanfaat — seperti minyak ikan, kunyit, atau glukosamin?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan & Tes",
          "questions": [
            "Tes darah atau pencitraan apa yang saya perlukan dan seberapa sering?",
            "Bagaimana kita akan mengukur apakah pengobatan saya berhasil?",
            "Efek samping apa dari obat-obatan saya yang harus saya perhatikan dan laporkan?",
            "Seberapa sering saya harus datang untuk pemeriksaan rutin?"
          ]
        }
      ]
    },
    {
      "id": "asthma",
      "label": "Asma",
      "subtypeLabel": "Jenis asma yang mana?",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Jenis asma apa yang saya alami?",
            "Apa yang memicu asma saya?",
            "Apakah asma saya ringan, sedang, atau parah?",
            "Apakah asma saya terkontrol dengan baik saat ini?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan & inhaler",
          "questions": [
            "Apa perbedaan antara inhaler pengendali dan inhaler penyelamat saya?",
            "Bisakah Anda melihat saya menggunakan inhaler saya untuk memeriksa teknik saya?",
            "Seberapa sering saya aman menggunakan inhaler penyelamat saya?",
            "Apakah saya memerlukan spacer, dan efek samping apa yang harus saya harapkan?"
          ]
        },
        {
          "id": "monitoring",
          "title": "Pemantauan & rencana tindakan",
          "questions": [
            "Haruskah saya memantau peak flow saya di rumah?",
            "Bagaimana saya tahu jika asma saya memburuk?",
            "Kapan saya harus menggunakan rencana tindakan saya, menghubungi Anda, atau pergi ke IGD?",
            "Seberapa sering saya harus datang untuk pemeriksaan ulang?"
          ]
        },
        {
          "id": "triggers-lifestyle",
          "title": "Pemicu & kehidupan sehari-hari",
          "questions": [
            "Bagaimana saya bisa mengurangi pemicu di rumah dan di tempat kerja?",
            "Apakah aman untuk berolahraga, dan bagaimana saya mencegah serangan?",
            "Vaksin apa saja yang saya perlukan (flu, pneumonia, COVID)?",
            "Apakah merokok atau vaping memengaruhi asma saya?"
          ]
        }
      ],
      "subtypes": [
        {
          "id": "allergic",
          "label": "Alergi (ekstrinsik)",
          "categories": [
            {
              "id": "allergic-specific",
              "title": "Asma alergi — pertanyaan khusus",
              "questions": [
                "Haruskah saya melakukan tes alergi?",
                "Apakah obat alergi atau imunoterapi akan membantu saya?",
                "Alergen apa yang paling harus saya hindari?"
              ]
            }
          ]
        },
        {
          "id": "non-allergic",
          "label": "Non-alergi (intrinsik)",
          "categories": [
            {
              "id": "non-allergic-specific",
              "title": "Asma non-alergi — pertanyaan khusus",
              "questions": [
                "Apa yang memicu asma saya jika bukan alergi?",
                "Bisakah infeksi, udara dingin, atau stres memicu serangan saya?",
                "Apa yang bisa saya lakukan terhadap pemicu non-alergi?"
              ]
            }
          ]
        },
        {
          "id": "exercise-induced",
          "label": "Dipicu oleh olahraga",
          "categories": [
            {
              "id": "exercise-specific",
              "title": "Asma yang dipicu oleh olahraga — pertanyaan khusus",
              "questions": [
                "Apa yang harus saya lakukan sebelum berolahraga untuk mencegah gejala?",
                "Haruskah saya menggunakan inhaler saya sebelum berolahraga?",
                "Olahraga atau aktivitas apa yang paling aman untuk saya?"
              ]
            }
          ]
        },
        {
          "id": "cough-variant",
          "label": "Varian batuk",
          "categories": [
            {
              "id": "cough-specific",
              "title": "Asma varian batuk — pertanyaan khusus",
              "questions": [
                "Bisakah batuk saya yang berkepanjangan itu adalah asma?",
                "Pengobatan apa yang membantu asma varian batuk?",
                "Berapa lama sampai batuk membaik?"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "sciatica",
      "label": "Saraf terjepit / Nyeri saraf",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Apa yang menyebabkan saraf terjepit saya?",
            "Saraf atau cakram mana yang terlibat?",
            "Apakah ini cenderung membaik dengan sendirinya?",
            "Berapa lama waktu pemulihan biasanya?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Apa yang bisa saya lakukan di rumah untuk meredakan nyeri?",
            "Obat pereda nyeri mana yang aman untuk saya, dan untuk berapa lama?",
            "Apakah terapi fisik akan membantu?",
            "Apakah saya memerlukan suntikan atau operasi — dan jika operasi, berapa tingkat keberhasilannya?"
          ]
        },
        {
          "id": "activity",
          "title": "Aktivitas & pemulihan",
          "questions": [
            "Gerakan atau posisi apa yang harus saya hindari?",
            "Lebih baik istirahat atau tetap aktif?",
            "Apakah ada peregangan atau latihan yang membantu?",
            "Kapan saya bisa kembali bekerja atau beraktivitas normal?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Tanda peringatan & pemeriksaan",
          "questions": [
            "Gejala apa yang berarti saya harus segera menghubungi Anda?",
            "Apakah mati rasa, kelemahan, atau kehilangan kontrol kandung kemih merupakan keadaan darurat?",
            "Pemeriksaan pencitraan atau tes apa yang saya butuhkan?"
          ]
        }
      ]
    },
    {
      "id": "psoriasis-eczema",
      "label": "Psoriasis / Eksim",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Apakah ini psoriasis, eksim, atau sesuatu yang lain?",
            "Apa yang memicu kekambuhan saya?",
            "Apakah ini kondisi seumur hidup?",
            "Apakah ini menular?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Krim atau salep mana yang harus saya gunakan, dan bagaimana caranya?",
            "Apakah ada pengobatan yang lebih kuat (terapi cahaya, pil, biologis) untuk saya?",
            "Berapa lama sampai saya melihat perbaikan?",
            "Efek samping apa yang harus saya harapkan dari pengobatan saya?"
          ]
        },
        {
          "id": "daily-care",
          "title": "Perawatan kulit harian",
          "questions": [
            "Rutinitas dan produk perawatan kulit apa yang Anda rekomendasikan?",
            "Sabun, kain, atau makanan apa yang harus saya hindari?",
            "Bagaimana cara merawat kulit saya saat kambuh?",
            "Bagaimana saya bisa mengurangi rasa gatal?"
          ]
        },
        {
          "id": "broader-health",
          "title": "Kesehatan yang lebih luas",
          "questions": [
            "Apakah kondisi kulit saya terkait dengan hal lain (sendi, jantung, suasana hati)?",
            "Haruskah saya menemui spesialis?",
            "Bagaimana kita akan melacak apakah pengobatan berhasil?"
          ]
        }
      ]
    },
    {
      "id": "gerd",
      "label": "Refluks asam / GERD",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Apa yang menyebabkan refluks asam saya?",
            "Apakah ini GERD, dan bisakah itu membahayakan kerongkongan saya?",
            "Apakah saya memerlukan tes apa pun, seperti endoskopi?",
            "Apakah ini kondisi jangka panjang?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Obat apa yang tepat untuk saya, dan berapa lama saya harus mengonsumsinya?",
            "Apakah ada risiko mengonsumsi obat penurun asam lambung dalam jangka panjang?",
            "Apa yang bisa saya lakukan jika pengobatan tidak cukup?",
            "Jika operasi disarankan, berapa tingkat keberhasilannya dan apa risikonya?"
          ]
        },
        {
          "id": "diet-lifestyle",
          "title": "Diet & gaya hidup",
          "questions": [
            "Makanan dan minuman apa yang harus saya hindari?",
            "Bagaimana waktu makan dan ukuran porsi memengaruhi refluks?",
            "Apakah menurunkan berat badan atau menaikkan posisi kepala ranjang saya dapat membantu?",
            "Apakah merokok atau alkohol memperburuk kondisi ini?"
          ]
        },
        {
          "id": "warning-signs",
          "title": "Tanda-tanda peringatan",
          "questions": [
            "Gejala apa yang berarti saya harus segera diperiksa (sulit menelan, penurunan berat badan, muntah darah)?",
            "Mungkinkah gejala saya disebabkan oleh hal lain selain refluks?",
            "Seberapa sering saya harus melakukan kontrol?"
          ]
        }
      ]
    },
    {
      "id": "infertility",
      "label": "Infertilitas / Berusaha untuk hamil",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahami kondisi ini",
          "questions": [
            "Tes apa saja yang perlu kita berdua lakukan untuk menemukan penyebabnya?",
            "Apa yang mungkin membuat lebih sulit untuk hamil?",
            "Bagaimana usia dan kesehatan saya memengaruhi peluang kita?",
            "Berapa lama kita harus terus mencoba sebelum melakukan tes lebih lanjut?"
          ]
        },
        {
          "id": "treatment-options",
          "title": "Pilihan pengobatan",
          "questions": [
            "Apa saja pilihan kita, dari yang paling sederhana hingga yang paling canggih?",
            "Berapa tingkat keberhasilan untuk seseorang seperti kita?",
            "Berapa biaya untuk setiap pilihan, dan apakah ada yang ditanggung?",
            "Apa saja risiko dan efek samping dari setiap pengobatan?"
          ]
        },
        {
          "id": "process",
          "title": "Prosesnya",
          "questions": [
            "Berapa lama setiap langkah berlangsung?",
            "Berapa banyak siklus atau percobaan yang umum dilakukan sebelum mengubah rencana?",
            "Perubahan gaya hidup apa yang dapat meningkatkan peluang kita?",
            "Haruskah kita berkonsultasi dengan spesialis kesuburan?"
          ]
        },
        {
          "id": "emotional-practical",
          "title": "Emosional & praktis",
          "questions": [
            "Dukungan apa yang tersedia untuk mengatasi stres dalam proses ini?",
            "Apa saja pilihan kita jika pengobatan tidak berhasil?",
            "Bagaimana kita memutuskan kapan harus berhenti atau mengubah rencana?"
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
          "title": "Memahami kondisi ini",
          "questions": [
            "MS jenis apa yang saya miliki?",
            "Apa yang ditunjukkan oleh hasil MRI dan tes saya?",
            "Bagaimana ini mungkin memengaruhi saya seiring waktu?",
            "Apa perbedaan antara kekambuhan dan perkembangan?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Pengobatan pengubah penyakit mana yang terbaik untuk saya, dan mengapa?",
            "Apa manfaat dan risiko dari pengobatan ini?",
            "Bagaimana kekambuhan diobati?",
            "Efek samping apa yang harus saya harapkan, dan bagaimana kita akan tahu bahwa ini berhasil?"
          ]
        },
        {
          "id": "symptoms-daily",
          "title": "Gejala & kehidupan sehari-hari",
          "questions": [
            "Bagaimana saya mengatasi kelelahan, nyeri, atau gejala lainnya?",
            "Apakah terapi fisik atau terapi okupasi akan membantu?",
            "Bagaimana panas, stres, atau infeksi memengaruhi MS saya?",
            "Apa yang bisa saya lakukan agar tetap seaktif mungkin?"
          ]
        },
        {
          "id": "planning-monitoring",
          "title": "Perencanaan & pemantauan",
          "questions": [
            "Seberapa sering saya perlu MRI atau pemeriksaan?",
            "Gejala apa yang harus membuat saya segera menelepon Anda?",
            "Bagaimana MS dapat memengaruhi pekerjaan, mengemudi, atau perencanaan keluarga?",
            "Layanan dukungan apa saja yang tersedia untuk saya?"
          ]
        }
      ]
    },
    {
      "id": "insomnia",
      "label": "Insomnia / Masalah tidur",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Apa yang mungkin menyebabkan masalah tidur saya?",
            "Apakah kondisi kesehatan atau obat-obatan dapat membuat saya terjaga?",
            "Apakah saya perlu studi tidur?",
            "Berapa banyak tidur yang harus saya targetkan?"
          ]
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Perubahan apa yang bisa saya coba sebelum minum obat?",
            "Apakah terapi perilaku kognitif untuk insomnia (CBT-I) merupakan pilihan?",
            "Jika saya membutuhkan obat tidur, apa risiko dan efek sampingnya, dan berapa lama saya harus meminumnya?",
            "Apakah alat bantu tidur yang dijual bebas aman untuk saya?"
          ]
        },
        {
          "id": "habits",
          "title": "Kebiasaan & rutinitas",
          "questions": [
            "Kebiasaan sehari-hari apa yang membantu atau merugikan tidur saya?",
            "Bagaimana kafein, alkohol, dan layar memengaruhi tidur saya?",
            "Bagaimana seharusnya rutinitas sebelum tidur yang baik?",
            "Apakah tidur siang boleh?"
          ]
        },
        {
          "id": "followup",
          "title": "Tindak lanjut",
          "questions": [
            "Bagaimana kita akan mengukur apakah tidur saya membaik?",
            "Haruskah saya menyimpan buku harian tidur?",
            "Kapan saya harus melakukan tindak lanjut?"
          ]
        }
      ]
    },
    {
      "id": "uti",
      "label": "Infeksi Saluran Kemih (UTI)",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahami Kondisi Ini",
          "questions": [
            "Apakah ini infeksi kandung kemih atau bisa juga melibatkan ginjal saya?",
            "Apa penyebab infeksi ini?",
            "Mengapa saya sering mengalami Infeksi Saluran Kemih (UTI)?",
            "Apakah saya perlu tes kultur urine atau tes lainnya?",
          ],
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Antibiotik apa yang akan saya dapatkan, dan untuk berapa hari?",
            "Bagaimana jika gejala saya tidak membaik dalam beberapa hari?",
            "Efek samping apa yang harus saya perhatikan?",
            "Adakah yang bisa saya minum untuk mengatasi rasa perih atau nyeri?",
          ],
        },
        {
          "id": "prevention",
          "title": "Pencegahan",
          "questions": [
            "Bagaimana saya bisa mencegah Infeksi Saluran Kemih (UTI) di kemudian hari?",
            "Apakah jus cranberry atau suplemen benar-benar membantu?",
            "Berapa banyak air yang harus saya minum setiap hari?",
            "Adakah kebiasaan kebersihan yang harus saya ubah?",
          ],
        },
        {
          "id": "warning",
          "title": "Kapan Harus Khawatir",
          "questions": [
            "Gejala apa yang menandakan infeksi semakin parah?",
            "Kapan saya harus pergi ke klinik darurat atau UGD?",
            "Bisakah demam atau nyeri punggung berarti infeksi ginjal?",
          ],
        },
      ],
    },
    {
      "id": "urinary-incontinence",
      "label": "Inkontinensia Urine",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahami Kondisi Ini",
          "questions": [
            "Jenis inkontinensia apa yang saya alami — stress, urge, atau campuran?",
            "Apa penyebab kebocoran urine saya?",
            "Bisakah obat-obatan saya memperburuk kondisi ini?",
            "Apakah saya memerlukan tes, seperti tes fungsi kandung kemih?",
          ],
        },
        {
          "id": "treatment",
          "title": "Pilihan Pengobatan",
          "questions": [
            "Bisakah latihan dasar panggul (Kegel) membantu saya — dan bagaimana cara melakukannya dengan benar?",
            "Apakah latihan kandung kemih atau jadwal ke toilet dapat membantu?",
            "Adakah obat untuk kondisi ini, dan apa efek sampingnya?",
            "Kapan operasi atau prosedur akan dipertimbangkan?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Kehidupan Sehari-hari",
          "questions": [
            "Haruskah saya mengubah jumlah atau waktu saya minum cairan?",
            "Apakah kafein atau alkohol memperburuk kondisi ini?",
            "Produk atau perlindungan apa yang Anda rekomendasikan?",
            "Bisakah penurunan berat badan memperbaiki gejala saya?",
          ],
        },
        {
          "id": "referral",
          "title": "Dokter Spesialis",
          "questions": [
            "Haruskah saya menemui ahli urologi atau uroginekolog?",
            "Apakah terapis fisik dasar panggul merupakan pilihan bagi saya?",
          ],
        },
      ],
    },
    {
      "id": "blood-in-urine",
      "label": "Darah dalam Urine",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Apa saja kemungkinan penyebab darah dalam urine saya?",
            "Bisakah ini disebabkan oleh infeksi, batu ginjal, atau sesuatu yang lebih serius?",
            "Bisakah obat atau makanan menyebabkan perubahan warna ini?",
            "Apakah jumlah darah berkaitan dengan tingkat keparahannya?",
          ],
        },
        {
          "id": "tests",
          "title": "Tes",
          "questions": [
            "Tes apa yang saya butuhkan — tes urine, pencitraan, atau teropong kandung kemih (sistoskopi)?",
            "Apa yang akan diberitahukan oleh setiap tes?",
            "Seberapa cepat tes ini harus dilakukan?",
            "Apakah fungsi ginjal saya juga akan diperiksa?",
          ],
        },
        {
          "id": "nextsteps",
          "title": "Langkah Selanjutnya",
          "questions": [
            "Apa yang harus saya lakukan jika saya melihat darah lagi sebelum tes saya?",
            "Apakah saya perlu menemui ahli urologi atau spesialis ginjal?",
            "Gejala apa yang berarti saya harus segera mencari pertolongan medis?",
            "Kapan kita akan mendapatkan jawaban tentang penyebabnya?",
          ],
        },
      ],
    },
    {
      "id": "migraine",
      "label": "Migrain",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Apakah sakit kepala saya benar-benar migrain, atau jenis sakit kepala lainnya?",
            "Apa saja pemicu yang paling mungkin bagi saya?",
            "Haruskah saya membuat buku harian sakit kepala — apa yang harus saya catat?",
            "Apakah saya memerlukan pemindaian otak atau tes lainnya?",
          ],
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Apa yang harus saya minum saat migrain mulai, dan seberapa cepat?",
            "Apakah saya kandidat untuk pengobatan pencegahan?",
            "Bagaimana dengan obat migrain yang lebih baru (penghambat CGRP) — apakah itu akan membantu saya?",
            "Bisakah saya menggunakan pereda nyeri secara berlebihan — apa itu sakit kepala kambuh?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Pemicu & gaya hidup",
          "questions": [
            "Apakah makanan tertentu, perubahan tidur, atau stres menyebabkan serangan saya?",
            "Apakah hormon saya berperan?",
            "Perubahan apa pada rutinitas saya yang dapat mengurangi serangan?",
          ],
        },
        {
          "id": "warning",
          "title": "Kapan harus khawatir",
          "questions": [
            "Gejala sakit kepala apa yang merupakan tanda bahaya yang memerlukan perawatan darurat?",
            "Kapan saya harus kembali jika keadaan tidak membaik?",
          ],
        },
      ],
    },
    {
      "id": "epilepsy-seizures",
      "label": "Epilepsi / Kejang",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Kejang jenis apa yang saya alami?",
            "Apa penyebabnya — apakah kita tahu?",
            "Tes apa yang saya butuhkan (EEG, MRI)?",
            "Apakah saya akan mengalami kejang lagi?",
          ],
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Obat apa yang Anda rekomendasikan dan mengapa?",
            "Efek samping apa yang harus saya perhatikan?",
            "Apa yang terjadi jika saya melewatkan satu dosis?",
            "Berapa lama saya perlu mengonsumsi obat ini?",
          ],
        },
        {
          "id": "safety",
          "title": "Keamanan & kehidupan sehari-hari",
          "questions": [
            "Bisakah saya mengemudi — bagaimana aturannya di negara bagian saya?",
            "Apa yang harus keluarga saya lakukan jika saya mengalami kejang?",
            "Apakah ada aktivitas yang harus saya hindari (berenang, tempat tinggi)?",
            "Bisakah saya minum alkohol dengan obat saya?",
          ],
        },
        {
          "id": "monitoring",
          "title": "Tindak lanjut",
          "questions": [
            "Haruskah saya mencatat kejang saya — detail apa yang paling membantu Anda?",
            "Apakah saya perlu tes darah untuk memeriksa kadar obat saya?",
            "Kapan saya harus menemui spesialis epilepsi (neurologist)?",
          ],
        },
      ],
    },
    {
      "id": "vertigo",
      "label": "Vertigo / Pusing",
      "categories": [
        {
          "id": "understanding",
          "title": "Memahaminya",
          "questions": [
            "Apa yang menyebabkan pusing saya — telinga bagian dalam, tekanan darah, atau hal lain?",
            "Apakah ini BPPV (kristal longgar di telinga bagian dalam)?",
            "Mungkinkah obat-obatan saya yang menyebabkan ini?",
            "Apakah saya perlu tes pendengaran atau tes keseimbangan?",
          ],
        },
        {
          "id": "treatment",
          "title": "Pengobatan",
          "questions": [
            "Bisakah manuver reposisi (seperti Epley) memperbaiki ini?",
            "Apakah ada obat yang membantu, dan kapan saya harus meminumnya?",
            "Apakah terapi vestibular (keseimbangan) akan membantu saya?",
            "Berapa lama ini akan berlangsung?",
          ],
        },
        {
          "id": "safety",
          "title": "Keamanan",
          "questions": [
            "Apa yang harus saya lakukan saat serangan vertigo?",
            "Bagaimana cara mencegah jatuh di rumah?",
            "Apakah aman bagi saya untuk mengemudi?",
          ],
        },
        {
          "id": "warning",
          "title": "Kapan harus khawatir",
          "questions": [
            "Gejala pusing apa yang bisa menandakan stroke atau sesuatu yang mendesak?",
            "Kapan saya harus mencari perawatan segera?",
          ],
        },
      ],
    },
    {
      "id": "fatigue",
      "label": "Kelelahan Umum",
      "categories": [
        {
          "id": "understanding",
          "title": "Mencari penyebabnya",
          "questions": [
            "Apa penyebab paling umum dari kelelahan seperti yang saya alami?",
            "Mungkinkah ini anemia, tiroid, kekurangan vitamin, atau diabetes?",
            "Mungkinkah obat-obatan saya membuat saya lelah?",
            "Mungkinkah kualitas tidur yang buruk atau sleep apnea menjadi penyebabnya?",
          ],
        },
        {
          "id": "tests",
          "title": "Tes",
          "questions": [
            "Tes darah apa yang harus saya lakukan?",
            "Apakah saya perlu studi tidur?",
            "Apa yang akan kita lakukan jika semua hasil tes normal?",
          ],
        },
        {
          "id": "mental",
          "title": "Suasana hati & stres",
          "questions": [
            "Bisakah stres, kecemasan, atau depresi menjadi bagian dari ini?",
            "Bagaimana kita membedakan penyebab fisik dari penyebab emosional?",
          ],
        },
        {
          "id": "lifestyle",
          "title": "Apa yang bisa saya lakukan",
          "questions": [
            "Perubahan apa pada pola makan, olahraga, atau tidur yang paling membantu?",
            "Berapa jam tidur yang saya butuhkan?",
            "Kapan saya bisa berharap merasa lebih baik, dan apa langkah kita selanjutnya jika saya tidak membaik?",
          ],
        },
      ],
    }
  ]
};

export default id;
