import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AISuggestPanel } from "@/components/vaani/AISuggestPanel";
import { CategoryCard } from "@/components/vaani/CategoryCard";
import { QuestionRow } from "@/components/vaani/QuestionRow";
import { CustomQuestionsCard } from "@/components/vaani/CustomQuestionsCard";
import { MedicalSources } from "@/components/vaani/MedicalSources";
import { MedicationMode } from "@/components/vaani/MedicationMode";
import { SpecialistCard } from "@/components/vaani/SpecialistCard";
import { useConditionResults } from "@/hooks/useConditionResults";
import { getConditionSpecialists, sanitizeSpecialists } from "@workspace/vaani-core/content/specialists";
import { topicKey, type ConditionResult } from "@/lib/topic-results";
import { MentalHealthNotice } from "@/components/vaani/MentalHealthNotice";
import { MicButton } from "@/components/vaani/MicButton";
import { PickerField } from "@/components/vaani/PickerField";
import { PmfSurveyModal } from "@/components/vaani/PmfSurveyModal";
import { ReportUploadPanel } from "@/components/vaani/ReportUploadPanel";
import { VaaniHeader } from "@/components/vaani/VaaniHeader";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import type { CategoryTranslation } from "@/content";
import { getAboutArticle } from "@/content/sources";
import { FONTS } from "@/constants/fonts";
import { useLanguage } from "@/context/LanguageContext";
import { usePrep } from "@/context/PrepContext";
import { useColors } from "@/hooks/useColors";
import { customTopicQuestions } from "@/lib/api";
import { mobileApiError } from "@/lib/api-errors";
import { conditionSectionTitles } from "@workspace/vaani-core/content/features";
import { flush, track } from "@/lib/analytics";
import { recordExportAndCheckSurvey } from "@/lib/pmf-survey";
import { qKey } from "@/lib/keys";

import { ABOUT_CONTENT, CKD_STAGES, FAQ_CONTENT, HOW_IT_WORKS_CONTENT, composeVisit, collectVisitSections, topicCategories, escapeHtml as esc, type ExportSection } from "@workspace/vaani-core";
import { spacing, themeColors } from "@workspace/vaani-core/theme";

export default function HomeScreen() {
  const colors = useColors();
  const { lang, setLang, t } = useLanguage();
  const {
    state,
    storageError,
    selection,
    selectionActions,
    toggleChecked,
    setNote,
    setAnswer,
    addCustomQuestion,
    removeCustomQuestion,
    addCustomTopic,
    setCustomTopicData,
    resetAll,
  } = usePrep();
  const { checkedMap, notesMap, customQuestionsMap, answersMap, customTopics } =
    state;

  const { selectedId, selectedSubtypeId, ckdStage, transplantChecked, visitType } = selection;
  const { selectCondition, setSelectedSubtypeId, setCkdStage, setTransplantChecked, setVisitType } =
    selectionActions;
  const [addingTopic, setAddingTopic] = useState(false);
  const [mode, setMode] = useState<"condition" | "medication">("condition");
  const [medicationReset, setMedicationReset] = useState(0);
  const [newTopicLabel, setNewTopicLabel] = useState("");
  const [topicLoading, setTopicLoading] = useState(false);
  const [topicError, setTopicError] = useState<string | false>(false);
  const [surveyVisible, setSurveyVisible] = useState(false);
  const conditionResults = useConditionResults(lang, t.ui);
  const topicRequestId = useRef(0);

  const invalidateTopicRequest = useCallback(() => {
    topicRequestId.current += 1;
    setTopicLoading(false);
    setTopicError(false);
  }, []);

  useEffect(() => {
    track("app_opened", undefined, lang);
    void flush();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const savedTopic = customTopics.find(topic => topic.id === selectedId);
  const cachedResult = savedTopic ? conditionResults.forTopic(savedTopic.label) : undefined;
  const localizedTopics = customTopics.map(topic => topic.id === selectedId ? {
    ...topic, categories: cachedResult?.categories.map(category => ({
      ...category, title: conditionSectionTitles(t.ui)[category.id] ?? category.title,
    })) ?? [], article: cachedResult?.article,
  } : topic);
  const visit = composeVisit(t, selectedId, selectedSubtypeId, localizedTopics, transplantChecked, visitType);
  const { customTopic, selected, hasSubtypes, selectedSubtype, isCKD, isMentalHealth, hasGeneralQuestions, isPlaceholder } = visit;
  const customQuestions = customQuestionsMap[selectedId] ?? [];

  const conditionLabel = selected?.label ?? "";
  const subtypeLabel = selectedSubtype ? ` — ${selectedSubtype.label}` : "";
  const currentArticle = cachedResult?.article ?? customTopic?.article;
  const aboutArticle = getAboutArticle(selectedId, customTopic ? { article: currentArticle } : undefined);
  const referralCategory = {
    id: "specialist-referral", title: t.ui.referralTitle,
    questions: [t.ui.specialistQuestion],
  };

  const handleConditionChange = useCallback(
    (value: string) => {
      invalidateTopicRequest();
      selectCondition(value);
      if (value) {
        track(
          "condition_selected",
          { condition: value.startsWith("custom-") ? "custom" : value },
          lang
        );
      }
    },
    [invalidateTopicRequest, lang, selectCondition]
  );

  // Once per selected condition: mark that the user actively prepared
  // questions (checked at least one).
  const preparedTracked = useRef<Set<string>>(new Set());
  const toggleCheckedTracked = useCallback(
    (key: string) => {
      toggleChecked(key);
      if (selectedId && !preparedTracked.current.has(selectedId)) {
        preparedTracked.current.add(selectedId);
        track("questions_prepared", undefined, lang);
      }
    },
    [toggleChecked, selectedId, lang]
  );

  const noteTracked = useRef<Set<string>>(new Set());
  const setNoteTracked = useCallback(
    (conditionId: string, value: string) => {
      setNote(conditionId, value);
      if (value.trim() && !noteTracked.current.has(conditionId)) {
        noteTracked.current.add(conditionId);
        track("note_recorded", undefined, lang);
      }
    },
    [setNote, lang]
  );

  const collectSections = () => [
    ...collectVisitSections(visit, state, t, false),
    ...(selected ? [{
      title: referralCategory.title,
      items: referralCategory.questions.map((text, index) => {
        const key = qKey(selectedId, referralCategory.id, index);
        return { text, checked: !!checkedMap[key], answer: answersMap[key] ?? "" };
      }),
    }] : []),
  ];

  const today = useMemo(() => new Date().toLocaleDateString(), []);
  const note = notesMap[selectedId];

  function buildText(sections: ExportSection[]): string {
    const lines: string[] = [];
    lines.push(`Vaani — ${conditionLabel}${subtypeLabel}`);
    lines.push(today);
    lines.push("");
    sections.forEach((sec) => {
      lines.push(sec.title.toUpperCase());
      sec.items.forEach((it) => {
        lines.push(`${it.checked ? "[x]" : "[ ]"} ${it.text}`);
        if (it.answer) lines.push(`    ↳ ${it.answer}`);
      });
      lines.push("");
    });
    if (note && note.trim()) {
      lines.push(t.ui.notesLabel.toUpperCase());
      lines.push(note.trim());
      lines.push("");
    }
    lines.push("—");
    lines.push(t.ui.disclaimer);
    return lines.join("\n");
  }

  function buildHtml(sections: ExportSection[]): string {
    const secHtml = sections
      .map((sec) => {
        const items = sec.items
          .map(
            (it) =>
              `<li><span class="box">${it.checked ? "&#10003;" : ""}</span><span class="q">${esc(
                it.text
              )}</span>${
                it.answer
                  ? `<div class="a">${esc(it.answer)}</div>`
                  : ""
              }</li>`
          )
          .join("");
        return `<h2>${esc(sec.title)}</h2><ul>${items}</ul>`;
      })
      .join("");
    const noteHtml =
      note && note.trim()
        ? `<h2>${esc(t.ui.notesLabel)}</h2><p>${esc(note.trim())}</p>`
        : "";
    return `<!DOCTYPE html><html><head><meta charset="utf-8" />
<style>
  body { font-family: -apple-system, Roboto, sans-serif; color: ${themeColors.text}; padding: 28px; }
  h1 { font-size: 22px; margin: 0 0 2px; color: ${themeColors.primary}; }
  .date { color: ${themeColors.mutedText}; font-size: 13px; margin-bottom: 18px; }
  h2 { font-size: 12px; letter-spacing: 0.6px; text-transform: uppercase; color: ${themeColors.text}; margin: 20px 0 8px; }
  ul { list-style: none; padding: 0; margin: 0; }
  li { display: flex; flex-wrap: wrap; align-items: flex-start; padding: 7px 0; border-bottom: 1px solid ${themeColors.border}; }
  .box { display: inline-block; width: 18px; height: 18px; border: 2px solid ${themeColors.primary}; border-radius: 4px; margin-right: 10px; text-align: center; line-height: 18px; color: ${themeColors.primary}; font-size: 13px; }
  .q { flex: 1; font-size: 14px; line-height: 20px; }
  .a { width: 100%; padding: 4px 0 0 28px; color: ${themeColors.text}; font-size: 13px; }
  .disclaimer { margin-top: 24px; color: ${themeColors.mutedText}; font-size: 12px; }
</style></head><body>
  <h1>Vaani — ${esc(conditionLabel)}${esc(subtypeLabel)}</h1>
  <div class="date">${esc(today)}</div>
  ${secHtml}
  ${noteHtml}
  <p class="disclaimer">${esc(t.ui.disclaimer)}</p>
</body></html>`;
  }

  async function handleShare() {
    if (!selected) return;
    try {
      const text = buildText(collectSections());
      const safeName =
        (conditionLabel || "visit")
          .replace(/[^\p{L}\p{N}]+/gu, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase() || "visit";
      const safeDate = today.replace(/[^\p{L}\p{N}]+/gu, "-");
      const path = `${FileSystem.cacheDirectory}vaani-${safeName}-${safeDate}.txt`;
      await FileSystem.writeAsStringAsync(path, text);
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(path, {
          mimeType: "text/plain",
          dialogTitle: `Vaani — ${conditionLabel}`,
        });
        await afterExport("share");
      }
    } catch {
      /* user cancelled or share unavailable */
    }
  }

  async function afterExport(method: "share" | "print") {
    track("prep_exported", { method }, lang);
    void flush();
    if (await recordExportAndCheckSurvey()) {
      track("pmf_survey_shown", undefined, lang);
      setSurveyVisible(true);
    }
  }

  async function handlePrint() {
    if (!selected) return;
    try {
      await Print.printAsync({ html: buildHtml(collectSections()) });
      await afterExport("print");
    } catch {
      /* user cancelled */
    }
  }

  const conditionOptions = [
    ...t.conditions.map((c) => ({ value: c.id, label: c.label })),
    ...customTopics.map((ct) => ({ value: ct.id, label: ct.label })),
  ];

  const fetchTopicSections = useCallback(
    async (
      topic: string
    ): Promise<ConditionResult> => {
      // Match web's condition request. The explicit "condition" flag selects
      // a different, stricter generation path that can reject otherwise valid
      // results; it is not needed to distinguish medication requests.
      const { sections, article, specialists } = await customTopicQuestions({ topic, lang, includeSpecialists: true });
      const categories = topicCategories(sections, conditionSectionTitles(t.ui));
      return { categories, article: article ?? undefined, specialists: sanitizeSpecialists(specialists) };
    },
    [lang]
  );

  async function handleSaveTopic() {
    const topic = newTopicLabel.trim();
    if (!topic) return;
    const requestId = ++topicRequestId.current;
    setTopicLoading(true);
    setTopicError(false);
    selectCondition("");
    try {
      const result = await fetchTopicSections(topic);
      if (requestId !== topicRequestId.current) return;
      const key = topicKey("condition", lang, topic);
      const existing = customTopics.find(saved => topicKey("condition", lang, saved.label) === key);
      // Reuse the original preparation identity for differently-cased retries,
      // retaining saved question/answer associations instead of duplicating it.
      const categories = conditionResults.forTopic(topic)?.categories ?? result.categories;
      conditionResults.remember(topic, { ...result, categories });
      const id = existing?.id ?? addCustomTopic(topic, categories, result.article);
      if (existing) setCustomTopicData(existing.id, categories, result.article);
      track("custom_topic_created", undefined, lang);
      if (id) {
        setNewTopicLabel("");
        setAddingTopic(false);
        handleConditionChange(id);
      }
    } catch (error) {
      const message = mobileApiError(error, t.ui.aiPanelError, false, t.ui);
      if (requestId === topicRequestId.current) setTopicError(message);
    } finally {
      if (requestId === topicRequestId.current) setTopicLoading(false);
    }
  }

  // Enrich legacy saved topics without replacing their questions or answer keys.
  const backfillAttempted = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (mode !== "condition" || !conditionResults.loaded || !customTopic || cachedResult) return;
    const key = topicKey("condition", lang, customTopic.label);
    if (backfillAttempted.current.has(key)) return;
    backfillAttempted.current.add(key);
    let active = true;
    const requestId = topicRequestId.current;
    setTopicLoading(true);
    setTopicError(false);
    void (async () => {
      try {
        const result = await fetchTopicSections(customTopic.label);
        if (!active || requestId !== topicRequestId.current) return;
        conditionResults.remember(customTopic.label, {
          ...result,
          categories: result.categories,
        });
      } catch (error) {
        const message = mobileApiError(error, t.ui.aiPanelError, false, t.ui);
        if (active && requestId === topicRequestId.current) setTopicError(message);
      } finally {
        if (active && requestId === topicRequestId.current) setTopicLoading(false);
      }
    })();
    return () => {
      active = false;
      backfillAttempted.current.delete(key);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customTopic?.id, mode, lang, conditionResults.loaded]);
  const ckdOptions = CKD_STAGES.map((s) => ({ value: s.id, label: s.label }));
  const subtypeOptions =
    selected?.subtypes?.map((s) => ({ value: s.id, label: s.label })) ?? [];

  return (
    <SafeAreaView
      style={[styles.safe, { backgroundColor: colors.background }]}
      edges={["top"]}
    >
      <StatusBar style="dark" />
      {storageError && <Text accessibilityRole="alert" style={{ padding: spacing.md, color: colors.foreground }}>{storageError}</Text>}
      {conditionResults.error && <Text accessibilityRole="alert" style={{ padding: spacing.md, color: colors.foreground }}>{conditionResults.error}</Text>}
      <VaaniHeader
        lang={lang}
        setLang={(value) => {
          invalidateTopicRequest();
          setAddingTopic(false);
          setNewTopicLabel("");
          setLang(value);
        }}
        onReset={() => {
          setMedicationReset((value) => value + 1);
          setAddingTopic(false);
          setNewTopicLabel("");
          conditionResults.clear();
          resetAll();
          handleConditionChange("");
        }}
        t={t.ui}
        subtitle={t.ui.appSubtitle}
      />

      <View style={[styles.infoLinks, { borderBottomColor: colors.border }]}>
        {([
          ["/how-it-works", HOW_IT_WORKS_CONTENT.navTitle],
          ["/about", ABOUT_CONTENT.navTitle],
          ["/faq", FAQ_CONTENT.navTitle],
          ["/privacy", "Privacy Policy"],
        ] as const).map(([href, label]) => (
          <Pressable
            key={href}
            onPress={() => router.push(href)}
            accessibilityRole="link"
            style={{ minHeight: 44, justifyContent: "center", paddingHorizontal: spacing.sm }}
          >
            <Text style={[styles.infoLink, { color: colors.primary }]}>{label}</Text>
          </Pressable>
        ))}
      </View>

      <KeyboardAwareScrollViewCompat
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
      >
        {/* Hero */}
        <View style={styles.section}>
          <Text style={[styles.heroHeading, { color: colors.foreground }]}>
            {t.ui.heroHeading}
          </Text>
          <Text style={[styles.heroDesc, { color: colors.mutedForeground }]}>
            {t.ui.heroDescription}
          </Text>
        </View>

        {/* Tip */}
        <View
          style={[
            styles.tip,
            { backgroundColor: colors.accent, borderRadius: colors.radius + 2 },
          ]}
        >
          <Feather name="info" size={18} color={colors.accentForeground} />
          <Text style={[styles.tipText, { color: colors.accentForeground }]}>
            {t.ui.tip}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.label, { fontSize: 18, color: colors.foreground }]}>
            {t.ui.selectorHeading}
          </Text>
          <View style={styles.visitRow}>
            {(["condition", "medication"] as const).map((value) => (
              <Pressable
                key={value}
                testID={`tab-${value}`}
                accessibilityRole="tab"
                accessibilityState={{ selected: mode === value }}
                onPress={() => {
                  if (mode === value) return;
                  invalidateTopicRequest();
                  selectCondition("");
                  setAddingTopic(false);
                  setNewTopicLabel("");
                  setMode(value);
                }}
                style={[styles.visitBtn, {
                  backgroundColor: mode === value ? colors.primary : colors.card,
                  borderColor: mode === value ? colors.primary : colors.border,
                  borderRadius: colors.radius + 2,
                }]}
              >
                <Text style={[styles.visitText, {
                  color: mode === value ? colors.primaryForeground : colors.foreground,
                }]}>{value === "condition" ? t.ui.conditionTab : t.ui.medicationTab}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {mode === "medication" ? (
          <MedicationMode key={medicationReset} lang={lang} t={t.ui} />
        ) : (
        <>
        {/* Visit type */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.foreground }]}>
            {t.ui.visitTypeLabel}
          </Text>
          <View style={styles.visitRow}>
            {(["first", "followup"] as const).map((vt) => {
              const active = visitType === vt;
              return (
                <Pressable
                  key={vt}
                  onPress={() => setVisitType(vt)}
                  style={[
                    styles.visitBtn,
                    {
                      borderRadius: colors.radius + 2,
                      backgroundColor: active ? colors.primary : colors.card,
                      borderColor: active ? colors.primary : colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.visitText,
                      {
                        color: active
                          ? colors.primaryForeground
                          : colors.foreground,
                      },
                    ]}
                  >
                    {vt === "first" ? t.ui.visitTypeFirst : t.ui.visitTypeFollowup}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Condition selector */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.foreground }]}>
            {t.ui.conditionSelectLabel}
          </Text>
          <PickerField
            value={selectedId}
            placeholder={t.ui.chooseCondition}
            options={conditionOptions}
            onChange={handleConditionChange}
            title={t.ui.conditionSelectLabel}
          />
          {!addingTopic ? (
            <Pressable
              onPress={() => {
                handleConditionChange("");
                setAddingTopic(true);
              }}
              accessibilityRole="button"
              style={{
                marginTop: 10,
                alignSelf: "flex-start",
                borderWidth: 1,
                borderColor: colors.primaryBorder,
                backgroundColor: colors.card,
                borderRadius: colors.radius + 2,
                paddingHorizontal: 14,
                paddingVertical: 9,
              }}
            >
              <Text
                style={{
                  fontFamily: FONTS.medium,
                  fontSize: 14,
                  color: colors.primary,
                }}
              >
                {t.ui.missingCondition}
              </Text>
            </Pressable>
          ) : (
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TextInput
                  testID="input-custom-condition"
                  accessibilityLabel={t.ui.conditionSelectLabel}
                  value={newTopicLabel}
                  onChangeText={(value) => {
                    invalidateTopicRequest();
                    setNewTopicLabel(value);
                  }}
                  placeholder={t.ui.conditionSelectLabel}
                  maxLength={200}
                  placeholderTextColor={colors.mutedForeground}
                  autoFocus
                  onSubmitEditing={() => void handleSaveTopic()}
                  returnKeyType="done"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    width: 0,
                    fontFamily: FONTS.regular,
                    fontSize: 15,
                    color: colors.foreground,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: colors.radius + 2,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                  }}
                />
                <MicButton
                  key={`custom-condition:${lang}`}
                  value={newTopicLabel}
                  onChangeText={(value) => {
                    invalidateTopicRequest();
                    setNewTopicLabel(value);
                  }}
                    accessibilityLabel={t.ui.dictateCondition}
                />
                <Pressable
                  testID="submit-custom-condition"
                  onPress={() => void handleSaveTopic()}
                  disabled={!newTopicLabel.trim() || topicLoading}
                  accessibilityRole="button"
                  style={{
                    backgroundColor:
                      newTopicLabel.trim() && !topicLoading
                        ? colors.primary
                        : colors.border,
                    borderRadius: colors.radius + 2,
                    paddingHorizontal: 14,
                    justifyContent: "center",
                  }}
                >
                  {topicLoading ? (
                    <ActivityIndicator
                      size="small"
                      color={colors.primaryForeground}
                    />
                  ) : (
                    <Text
                      style={{
                        fontFamily: FONTS.medium,
                        fontSize: 14,
                        color: colors.primaryForeground,
                      }}
                    >
                      {t.ui.addTopicSave}
                    </Text>
                  )}
                </Pressable>
              </View>
              {topicError && (
                <Text
                  style={{
                    marginTop: 8,
                    fontFamily: FONTS.regular,
                    fontSize: 13,
                    color: colors.destructive,
                  }}
                >
                  {topicError}
                </Text>
              )}
            </View>
          )}
        </View>

        {topicLoading && <ActivityIndicator testID="condition-loading" accessibilityLabel={t.ui.conditionLoading} color={colors.primary} />}
        {topicError && !addingTopic && <Text accessibilityRole="alert" style={{ color: colors.destructive }}>{topicError}</Text>}
        {selected && !topicLoading && (
          <View key={topicKey("condition", lang, conditionLabel)}>
            {/* Divider */}
            <View style={styles.divider}>
              <View style={[styles.line, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerLabel, { color: colors.mutedForeground }]}>
                {selected.label.toUpperCase()}
              </Text>
              <View style={[styles.line, { backgroundColor: colors.border }]} />
            </View>

            {aboutArticle && (
              <Pressable
                onPress={() => Linking.openURL(aboutArticle.url)}
                style={{ marginBottom: 16, alignItems: "center" }}
                accessibilityRole="link"
              >
                <Text
                  style={{
                    fontFamily: FONTS.regular,
                    fontSize: 13,
                    color: colors.mutedForeground,
                    textAlign: "center",
                  }}
                >
                  {customTopic ? t.ui.readCondition : t.ui.aboutArticleLabel}{" "}
                  <Text style={{ color: colors.primary, textDecorationLine: "underline" }}>
                    {customTopic ? t.ui.aboutTopic.replace("{topic}", customTopic.label) : aboutArticle.name}
                  </Text>
                </Text>
              </Pressable>
            )}

            {isMentalHealth && (
              <View style={{ marginBottom: 20 }}>
                <MentalHealthNotice t={t.ui} />
              </View>
            )}

            {/* Saved-locally notice */}
            <View
              style={[
                styles.savedNotice,
                {
                  backgroundColor: colors.muted,
                  borderColor: colors.border,
                  borderRadius: colors.radius + 2,
                },
              ]}
            >
              <Feather name="smartphone" size={16} color={colors.mutedForeground} />
              <Text style={[styles.savedText, { color: colors.mutedForeground }]}>
                {t.ui.savedLocallyNotice}
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionRow}>
              <Pressable
                onPress={handleShare}
                style={({ pressed }) => [
                  styles.actionPrimary,
                  {
                    backgroundColor: colors.primary,
                    borderRadius: colors.radius + 2,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Feather name="download" size={16} color={colors.primaryForeground} />
                <Text style={[styles.actionText, { color: colors.primaryForeground }]}>
                  {t.ui.downloadButton}
                </Text>
              </Pressable>
              <Pressable
                onPress={handlePrint}
                style={({ pressed }) => [
                  styles.actionSecondary,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderRadius: colors.radius + 2,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Feather name="printer" size={16} color={colors.foreground} />
                <Text style={[styles.actionText, { color: colors.foreground }]}>
                  {t.ui.printButton}
                </Text>
              </Pressable>
            </View>

            {/* CKD controls */}
            {isCKD && (
              <View style={{ gap: 16, marginBottom: 24 }}>
                <View
                  style={[
                    styles.ckdBox,
                    {
                      backgroundColor: colors.primaryTint,
                      borderColor: colors.primaryBorder,
                      borderRadius: colors.radius + 2,
                    },
                  ]}
                >
                  <Text style={[styles.label, { color: colors.foreground }]}>
                    {t.ui.ckdStageLabel}{" "}
                    <Text style={{ color: colors.mutedForeground, fontFamily: FONTS.regular }}>
                      {t.ui.ckdStageOptional}
                    </Text>
                  </Text>
                  <PickerField
                    value={ckdStage}
                    placeholder={t.ui.ckdStagePlaceholder}
                    options={ckdOptions}
                    onChange={setCkdStage}
                    title={t.ui.ckdStageLabel}
                  />
                  {ckdStage && t.ui.ckdStageNotes[ckdStage] ? (
                    <Text
                      style={[
                        styles.ckdNote,
                        {
                          color: colors.accentForeground,
                          backgroundColor: colors.accentTint,
                          borderRadius: 8,
                        },
                      ]}
                    >
                      {t.ui.ckdStageNotes[ckdStage]}
                    </Text>
                  ) : null}
                </View>

                <Pressable
                  onPress={() => setTransplantChecked((v) => !v)}
                  style={[
                    styles.transplant,
                    {
                      backgroundColor: colors.primaryTint,
                      borderColor: colors.primaryBorder,
                      borderRadius: colors.radius + 2,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.transplantBox,
                      {
                        borderColor: transplantChecked ? colors.primary : colors.border,
                        backgroundColor: transplantChecked ? colors.primary : colors.card,
                      },
                    ]}
                  >
                    {transplantChecked && (
                      <Feather name="check" size={16} color={colors.primaryForeground} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.transplantLabel, { color: colors.foreground }]}>
                      {t.ui.transplantLabel}
                    </Text>
                    <Text style={[styles.transplantSub, { color: colors.mutedForeground }]}>
                      {t.ui.transplantSubLabel}
                    </Text>
                  </View>
                </Pressable>
              </View>
            )}

            {/* Placeholder */}
            {isPlaceholder && (
              <View
                style={[
                  styles.placeholder,
                  {
                    borderColor: colors.border,
                    backgroundColor: colors.muted,
                    borderRadius: colors.radius + 2,
                  },
                ]}
              >
                <Feather name="alert-circle" size={30} color={colors.mutedForeground} />
                <Text style={[styles.placeholderTitle, { color: colors.foreground }]}>
                  {t.ui.questionsSoonTitle}
                </Text>
                <Text style={[styles.placeholderDesc, { color: colors.mutedForeground }]}>
                  {t.ui.questionsSoonDesc}
                </Text>
              </View>
            )}

            {/* Follow-up */}
            {visit.followup.visible && (
              <View style={{ gap: 16, marginBottom: 16 }}>
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: colors.radius + 2,
                    padding: 16,
                    gap: 10,
                  }}
                >
                  <Text style={[styles.label, { color: colors.foreground }]}>
                    {visit.followup.label}
                  </Text>
                  <TextInput
                    value={answersMap[visit.followup.key] ?? ""}
                    onChangeText={(v) =>
                      setAnswer(visit.followup.key, v)
                    }
                    placeholder={visit.followup.placeholder}
                    placeholderTextColor={colors.mutedForeground}
                    multiline
                    maxLength={1000}
                    style={{
                      minHeight: 72,
                      fontFamily: FONTS.regular,
                      fontSize: 15,
                      lineHeight: 21,
                      color: colors.foreground,
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                      borderWidth: 1,
                      borderRadius: colors.radius + 2,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      textAlignVertical: "top",
                    }}
                  />
                  <MicButton value={answersMap[visit.followup.key] ?? ""} onChangeText={(value) => setAnswer(visit.followup.key, value)}
                    accessibilityLabel={t.ui.dictateChanges} />
                </View>
                <CategoryCard
                  cat={visit.followup.category}
                  startIdx={visit.followup.startIdx}
                  keyPrefix={visit.prefixes.followup}
                  checkedMap={checkedMap}
                  onToggle={toggleCheckedTracked}
                  answersMap={answersMap}
                  onAnswerChange={setAnswer}
                >
                  <QuestionRow text={referralCategory.questions[0]}
                    checked={!!checkedMap[qKey(selectedId, referralCategory.id, 0)]}
                    onToggle={() => toggleCheckedTracked(qKey(selectedId, referralCategory.id, 0))}
                    answer={answersMap[qKey(selectedId, referralCategory.id, 0)]}
                    onAnswerChange={(value) => setAnswer(qKey(selectedId, referralCategory.id, 0), value)}
                    isLast />
                </CategoryCard>
                <ReportUploadPanel
                  key={selectedId}
                  conditionLabel={conditionLabel}
                  lang={lang}
                  onAdd={(text) => addCustomQuestion(selectedId, text)}
                  t={t.ui}
                />
              </View>
            )}

            {/* General questions */}
            {hasGeneralQuestions && (
              <View style={{ gap: 16 }}>
                {visit.general.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    cat={cat}
                    keyPrefix={selectedId}
                    checkedMap={checkedMap}
                    onToggle={toggleCheckedTracked}
                    answersMap={answersMap}
                    onAnswerChange={setAnswer}
                  />
                ))}
              </View>
            )}

            {/* CKD transplant extra */}
            {visit.extras.length > 0 && (
              <View style={{ gap: 16, marginTop: 16 }}>
                {visit.extras.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      cat={cat}
                      keyPrefix={visit.prefixes.extras}
                      checkedMap={checkedMap}
                      onToggle={toggleCheckedTracked}
                      answersMap={answersMap}
                      onAnswerChange={setAnswer}
                    />
                  ))}
              </View>
            )}

            {/* Subtype */}
            {hasSubtypes && (
              <View style={{ marginTop: 24 }}>
                <View
                  style={[
                    styles.ckdBox,
                    {
                      backgroundColor: colors.primaryTint,
                      borderColor: colors.primaryBorder,
                      borderRadius: colors.radius + 2,
                    },
                  ]}
                >
                  <Text style={[styles.label, { color: colors.foreground }]}>
                    {selected.subtypeLabel ?? t.ui.cancerSubtypeLabel}{" "}
                    <Text style={{ color: colors.mutedForeground, fontFamily: FONTS.regular }}>
                      {t.ui.cancerSubtypeOptional}
                    </Text>
                  </Text>
                  <PickerField
                    value={selectedSubtypeId}
                    placeholder={t.ui.cancerSubtypePlaceholder}
                    options={subtypeOptions}
                    onChange={setSelectedSubtypeId}
                    title={selected.subtypeLabel ?? t.ui.cancerSubtypeLabel}
                  />
                </View>

                {selectedSubtype && (
                  <View style={{ gap: 16, marginTop: 16 }}>
                    {visit.subtype.map((cat) => (
                      <CategoryCard
                        key={cat.id}
                        cat={cat}
                        keyPrefix={visit.prefixes.subtype}
                        checkedMap={checkedMap}
                        onToggle={toggleCheckedTracked}
                        answersMap={answersMap}
                        onAnswerChange={setAnswer}
                      />
                    ))}
                  </View>
                )}
              </View>
            )}

            {/* Custom questions */}
            {!visit.followup.visible && <View style={{ marginTop: spacing.md }}>
              <CategoryCard cat={referralCategory} keyPrefix={selectedId}
                checkedMap={checkedMap} onToggle={toggleCheckedTracked}
                answersMap={answersMap} onAnswerChange={setAnswer} />
            </View>}
            <View style={{ marginTop: 16 }}>
              <CustomQuestionsCard
                conditionId={selectedId}
                questions={customQuestions}
                checkedMap={checkedMap}
                onToggle={toggleCheckedTracked}
                onAdd={(text) => addCustomQuestion(selectedId, text)}
                onRemove={(id) => removeCustomQuestion(selectedId, id)}
                answersMap={answersMap}
                onAnswerChange={setAnswer}
                t={t.ui}
              />
            </View>

            {/* AI suggest */}
            <View style={{ marginTop: 16 }}>
              <AISuggestPanel
                key={selectedId}
                conditionLabel={conditionLabel}
                lang={lang}
                onAdd={(text) => addCustomQuestion(selectedId, text)}
                t={t.ui}
                extraContext={
                  visit.followup.visible
                    ? answersMap[visit.followup.key]
                    : undefined
                }
              />
            </View>

            {/* Notes */}
            <View style={{ marginTop: 24 }}>
              <Text style={[styles.label, { color: colors.foreground }]}>
                {t.ui.notesLabel}
              </Text>
              <View style={styles.notesRow}>
                <TextInput
                  value={notesMap[selectedId] ?? ""}
                  onChangeText={(v) => setNoteTracked(selectedId, v)}
                  placeholder={t.ui.notesPlaceholder}
                  placeholderTextColor={colors.mutedForeground}
                  multiline
                  style={[
                    styles.notes,
                    {
                      flex: 1,
                      color: colors.foreground,
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      borderRadius: colors.radius + 2,
                    },
                  ]}
                />
                <MicButton
                  value={notesMap[selectedId] ?? ""}
                  onChangeText={(v) => setNoteTracked(selectedId, v)}
                  accessibilityLabel={t.ui.notesLabel}
                />
              </View>
            </View>
          </View>
        )}

        {/* Medical sources (Guideline 1.4.1 citations) */}
        {selected && !topicLoading && <SpecialistCard specialists={customTopic
          ? cachedResult?.specialists ?? sanitizeSpecialists(null)
          : getConditionSpecialists(selectedId)} />}
        <MedicalSources
          conditionId={topicLoading ? "" : selectedId}
          title={t.ui.sourcesTitle}
          intro={t.ui.sourcesIntro}
          customTopicLabel={topicLoading ? undefined : customTopic?.label}
          customTopicArticle={topicLoading ? undefined : currentArticle}
        />
        </>
        )}

        {/* Footer */}
        <View style={[styles.footer, { borderTopColor: colors.border }]}>
          <View style={styles.footerRow}>
            <Feather name="heart" size={15} color={colors.mutedForeground} />
            <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
              {t.ui.disclaimer}
            </Text>
          </View>
          <View style={styles.copyrightRow}>
            <Text style={[styles.copyright, { color: colors.mutedForeground }]}>
              © 2026{" "}
            </Text>
            <Pressable
              onPress={() => Linking.openURL("https://yourvoicefirst.org")}
              hitSlop={8}
            >
              <Text
                style={[
                  styles.copyright,
                  {
                    color: colors.mutedForeground,
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Your voice First
              </Text>
            </Pressable>
            <Text style={[styles.copyright, { color: colors.mutedForeground }]}>
              . All rights reserved.
            </Text>
          </View>
          <Text
            testID="link-privacy-policy"
            accessibilityRole="link"
            style={[styles.copyright, { color: colors.mutedForeground }]}
            onPress={() => router.push("/privacy")}
          >
            <Text style={{ textDecorationLine: "underline" }}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollViewCompat>
      <PmfSurveyModal
        visible={surveyVisible}
        lang={lang}
        onClose={() => setSurveyVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  content: { paddingHorizontal: spacing.md, paddingTop: spacing.xl, paddingBottom: spacing.xxxl },
  section: { marginBottom: spacing.xl },
  heroHeading: { fontSize: 28, lineHeight: 34, fontFamily: FONTS.bold, marginBottom: spacing.xs },
  heroDesc: { fontSize: 16, lineHeight: 24, fontFamily: FONTS.regular },
  tip: {
    flexDirection: "row",
    gap: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.xl,
    alignItems: "flex-start",
  },
  tipText: { flex: 1, fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
  label: { fontSize: 16, fontFamily: FONTS.semibold, marginBottom: spacing.sm },
  visitRow: { flexDirection: "row", gap: spacing.sm },
  visitBtn: {
    flex: 1,
    borderWidth: 2,
    paddingVertical: 14,
    alignItems: "center",
  },
  visitText: { fontSize: 14, fontFamily: FONTS.semibold },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginVertical: spacing.xl,
  },
  line: { flex: 1, height: 1 },
  dividerLabel: { fontSize: 12, letterSpacing: 1, fontFamily: FONTS.semibold },
  savedNotice: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
    borderWidth: 1,
    padding: 14,
    marginBottom: spacing.md,
  },
  savedText: { flex: 1, fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  actionPrimary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  actionSecondary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  actionText: { fontSize: 14, fontFamily: FONTS.medium },
  ckdBox: { borderWidth: 1, padding: spacing.md },
  ckdNote: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONTS.regular,
  },
  transplant: {
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    borderWidth: 1,
    padding: spacing.md,
  },
  transplantBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  transplantLabel: { fontSize: 16, fontFamily: FONTS.semibold, lineHeight: 22 },
  transplantSub: { fontSize: 14, marginTop: 4, fontFamily: FONTS.regular },
  placeholder: {
    borderWidth: 2,
    borderStyle: "dashed",
    paddingVertical: spacing.xxxl,
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    gap: spacing.xs,
  },
  placeholderTitle: { fontSize: 16, fontFamily: FONTS.medium },
  placeholderDesc: { fontSize: 14, textAlign: "center", fontFamily: FONTS.regular },
  notesRow: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "flex-start",
  },
  notes: {
    minHeight: 120,
    borderWidth: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: "top",
    fontFamily: FONTS.regular,
  },
  footer: {
    marginTop: 40,
    paddingTop: 24,
    borderTopWidth: 1,
    alignItems: "center",
    gap: 12,
  },
  footerRow: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  disclaimer: { flex: 1, fontSize: 13, lineHeight: 19, fontFamily: FONTS.regular },
  copyright: { fontSize: 12, textAlign: "center", fontFamily: FONTS.regular },
  copyrightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  infoLinks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    borderBottomWidth: 1,
    paddingHorizontal: 8,
  },
  infoLink: {
    fontSize: 14,
    fontFamily: FONTS.medium,
  },
});
