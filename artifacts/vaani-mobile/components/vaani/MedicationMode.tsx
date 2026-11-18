import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as Print from "expo-print";
import { useCustomTopicQuestions, type CustomTopicResult } from "@workspace/api-client-react";
import { escapeHtml } from "@workspace/vaani-core";
import { spacing } from "@workspace/vaani-core/theme";
import type { UIStrings } from "@/content/types";
import { GENERAL_SOURCES, type MedicalSource } from "@/content/sources";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { qKey } from "@/lib/keys";
import { topicKey } from "@/lib/topic-results";
import { mobileApiError } from "@/lib/api-errors";
import { medicationSectionTitles } from "@workspace/vaani-core/content/features";
import { CategoryCard } from "./CategoryCard";
import { MedicalSources } from "./MedicalSources";
import { MicButton } from "./MicButton";
import { ReportAIContent } from "./ReportAIContent";


function verifiedSource(source: MedicalSource): boolean {
  try {
    const url = new URL(source.url);
    return url.protocol === "https:" && ["dailymed.nlm.nih.gov", "fda.gov", "www.fda.gov"].includes(url.hostname);
  } catch { return false; }
}

/** Native adapter for the existing medication endpoint; no browser or shared UI. */
export function MedicationMode({ lang, t }: { lang: string; t: UIStrings }) {
  const SECTIONS = Object.entries(medicationSectionTitles(t)).filter(([key]) => key !== "interactions");
  const NO_VERIFIED = t.noVerifiedInteractions;
  const NOT_COMPLETE = t.interactionsNote;
  const colors = useColors();
  const [drugName, setDrugName] = useState("");
  const [results, setResults] = useState<Record<string, CustomTopicResult & { drug: string }>>({});
  const currentKey = topicKey("medication", lang, drugName);
  const result = results[currentKey] ?? null;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState("");
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState("");
  const requestId = useRef(0);
  const mutation = useCustomTopicQuestions();
  useEffect(() => () => { requestId.current += 1; }, []);

  function clear() {
    requestId.current += 1;
    setResults({});
    setLoading(false);
    setError(null);
    setChecked({});
    setAnswers({});
    setNotes("");
    setMedications([]);
    setNewMedication("");
  }

  async function submit(languageChange = false) {
    const drug = drugName.trim();
    if (!drug) return;
    if (languageChange) {
      requestId.current += 1;
      setResults({});
      setError(null);
      setChecked({});
      setAnswers({});
    } else clear();
    const id = requestId.current;
    setLoading(true);
    try {
      const data = await mutation.mutateAsync({ data: { topic: drug, lang, mode: "medication" } });
      if (id !== requestId.current) return;
      if (!data?.sections || !SECTIONS.some(([key]) => Array.isArray(data.sections[key]) && data.sections[key].length)) throw new Error("Invalid or empty medication response");
      setResults({ [topicKey("medication", lang, drug)]: { ...data, drug } });
    } catch (err) {
      const message = mobileApiError(err, t.aiPanelError, true, t);
      if (id !== requestId.current) return;
      setError(message);
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }
  const previousLanguage = useRef(lang);
  useEffect(() => {
    if (previousLanguage.current === lang) return;
    previousLanguage.current = lang;
    requestId.current += 1;
    setError(null);
    if (drugName.trim()) void submit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const inputStyle = [styles.input, { color: colors.foreground, backgroundColor: colors.card, borderColor: colors.border }];
  const sources = result?.medication?.sources?.filter(source => source && typeof source.name === "string" && verifiedSource(source)) ?? [];
  const food = sources.length ? result?.medication?.foodAlcohol ?? [] : [];
  const drugs = sources.length ? result?.medication?.otherDrugs ?? [] : [];
  const article = { name: t.aboutTopic.replace("{topic}", result?.drug ?? ""), url: result?.article?.url ?? "https://medlineplus.gov/" };
  const seen = new Set<string>();
  const references = (result ? [article, ...sources, ...GENERAL_SOURCES] : GENERAL_SOURCES).filter(source => {
    if (seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });

  async function print() {
    if (!result) return;
    const sections = SECTIONS.map(([id, title]) => `<h2>${escapeHtml(title)}</h2><ul>${
      (result.sections[id] ?? []).map((question, index) => {
        const key = qKey("medication", id, index);
        return `<li>${checked[key] ? "[x]" : "[ ]"} ${escapeHtml(question)}<p>${escapeHtml(answers[key] ?? "")}</p></li>`;
      }).join("")
    }</ul>`).join("");
    try {
      await Print.printAsync({ html: `<html><body><h1>Vaani — ${escapeHtml(result.drug)}</h1>${sections}
        <h2>${escapeHtml(t.mobilePrintList)}</h2><ul>${medications.map(m => `<li>${escapeHtml(m)}</li>`).join("")}</ul>
        <h2>${escapeHtml(t.keyInteractions)}</h2>${food.length || drugs.length ? [...food, ...drugs].map(x => `<p>${escapeHtml(x)}</p>`).join("") : `<p>${escapeHtml(NO_VERIFIED)}</p>`}
        <p>${escapeHtml(NOT_COMPLETE)}</p><h2>${escapeHtml(t.notesLabel)}</h2><p>${escapeHtml(notes)}</p>
        <h2>${escapeHtml(t.sourcesTitle)}</h2>${references.map(s => `<p><a href="${escapeHtml(s.url)}">${escapeHtml(s.name)}</a></p>`).join("")}
        <p>${escapeHtml(t.disclaimer)}</p></body></html>` });
    } catch { /* Native print sheet dismissed. */ }
  }

  const button = (label: string, onPress: () => void, testID?: string, disabled = false) => (
    <Pressable testID={testID} accessibilityRole="button" disabled={disabled} onPress={onPress}
      style={[styles.button, { backgroundColor: colors.primary, opacity: disabled ? 0.5 : 1 }]}>
      <Text style={{ color: colors.primaryForeground, fontFamily: FONTS.semibold }}>{label}</Text>
    </Pressable>
  );
  const heading = (text: string) => <Text style={[styles.heading, { color: colors.foreground }]}>{text}</Text>;
  return (
    <View testID="medication-mode" style={styles.stack}>
      {heading(t.medicationPrompt)}
      <Text style={[styles.body, { color: colors.mutedForeground }]}>
        {t.medicationDisclaimer} {t.disclaimer} {t.dosingDisclaimer}
      </Text>
      <View style={styles.row}>
      <TextInput testID="input-medication" accessibilityLabel={t.medicationName}
        value={drugName} onChangeText={value => { clear(); setDrugName(value); }}
        placeholder={t.medicationPlaceholder} placeholderTextColor={colors.mutedForeground}
        maxLength={200} autoCapitalize="none" onSubmitEditing={() => void submit()} returnKeyType="go" style={[inputStyle, { flex: 1, minWidth: 0, width: 0 }]} />
      <MicButton value={drugName} onChangeText={value => { clear(); setDrugName(value); }} accessibilityLabel={t.dictateMedication} />
      </View>
      {button(loading ? t.aiPanelLoading : t.aiPanelButton, () => void submit(), "submit-medication", loading || !drugName.trim())}
      {loading && <ActivityIndicator accessibilityLabel={t.aiPanelLoading} color={colors.primary} />}
      {error && <View style={styles.stack}>
        <Text testID="error-medication" accessibilityRole="alert" style={{ color: colors.destructive }}>{error}</Text>
        {button(t.retry, () => void submit())}
      </View>}
      {result && <>
        {heading(result.drug)}
        <Pressable accessibilityRole="link" testID="link-about-medication" onPress={() => void Linking.openURL(article.url)}>
          <Text style={[styles.body, { color: colors.primary, textDecorationLine: "underline" }]}>
            {t.readMedication} {article.name}
          </Text>
        </Pressable>
        {button(t.printButton, () => void print(), "print-medication")}
        {SECTIONS.map(([id, title]) => (
          <React.Fragment key={id}>
            {id === "monitoring" && <View style={[styles.panel, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {heading(t.interactionsTitle)}
              {heading(t.medicationListTitle)}
              <Text style={[styles.body, { color: colors.foreground }]}>
                {t.medicationListHelp}
              </Text>
              {medications.map((item, index) => <View key={index} style={styles.row}>
                <Text style={[styles.body, { flex: 1, color: colors.foreground }]}>{item}</Text>
                <Pressable accessibilityRole="button" accessibilityLabel={t.removeItem.replace("{name}", item)}
                  onPress={() => setMedications(items => items.filter((_, i) => i !== index))} style={styles.remove}>
                  <Text style={{ color: colors.primary }}>{t.remove}</Text>
                </Pressable>
              </View>)}
              <View style={styles.row}>
              <TextInput accessibilityLabel={t.otherMedicationInput} testID="input-other-medication"
                placeholder={t.otherMedicationPlaceholder} placeholderTextColor={colors.mutedForeground}
                value={newMedication} onChangeText={setNewMedication} maxLength={200} style={[inputStyle, { flex: 1, minWidth: 0, width: 0 }]} />
              <MicButton value={newMedication} onChangeText={setNewMedication} accessibilityLabel={t.dictateOtherMedication} />
              </View>
              {button(t.addToList, () => {
                if (!newMedication.trim()) return;
                setMedications(items => [...items, newMedication.trim()]);
                setNewMedication("");
              }, "add-other-medication", !newMedication.trim())}
            </View>}
            <CategoryCard cat={{ id, title, questions: result.sections[id] ?? [] }} keyPrefix="medication"
              checkedMap={checked} answersMap={answers}
              onToggle={key => setChecked(map => ({ ...map, [key]: !map[key] }))}
              onAnswerChange={(key, value) => setAnswers(map => ({ ...map, [key]: value }))} />
          </React.Fragment>
        ))}
        <ReportAIContent feature="medication" lang={lang} t={t}
          content={[result.drug, ...SECTIONS.flatMap(([id, title]) => [`${title}:`, ...(result.sections[id] ?? [])])].join("\n")} />
        <View testID="key-interactions" style={[styles.panel, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {heading(t.keyInteractions)}
          {food.length || drugs.length ? <>
            <Text style={[styles.body, { color: colors.mutedForeground }]}>
              {lang === "en" ? t.verbatimNote : t.translatedExcerptNote} {t.productFormNote}
            </Text>
            {sources.map(source => <Pressable key={source.url} accessibilityRole="link" onPress={() => void Linking.openURL(source.url)}>
              <Text style={{ color: colors.primary, textDecorationLine: "underline" }}>{source.name}</Text>
            </Pressable>)}
            {([[t.foodAlcohol, food], [t.otherDrugs, drugs]] as const).map(([title, excerpts]) => <View key={title} style={styles.stack}>
              {heading(title)}
              {excerpts.length ? excerpts.map((excerpt, i) => <Text key={i} style={[styles.body, { color: colors.foreground }]}>{excerpt}</Text>)
                : <Text style={{ color: colors.mutedForeground }}>{t.noExcerpt}</Text>}
            </View>)}
          </> : <Text style={[styles.body, { color: colors.foreground }]}>{NO_VERIFIED}</Text>}
          <Text style={[styles.body, { color: colors.mutedForeground }]}>{NOT_COMPLETE}</Text>
        </View>
        {heading(t.notesLabel)}
        <TextInput testID="medication-notes" accessibilityLabel={t.notesLabel} multiline value={notes} onChangeText={setNotes}
          placeholder={t.notesPlaceholder} placeholderTextColor={colors.mutedForeground} style={[inputStyle, styles.notes]} />
        <MicButton value={notes} onChangeText={setNotes} accessibilityLabel={t.notesLabel} />
      </>}
      {!loading && !error && <MedicalSources conditionId="" title={t.sourcesTitle} intro={t.sourcesIntro} sourcesOverride={references} />}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { gap: spacing.sm },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  heading: { fontFamily: FONTS.semibold, fontSize: 16, lineHeight: 23 },
  body: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21 },
  input: { borderWidth: 1, borderRadius: 12, padding: spacing.sm, fontFamily: FONTS.regular, fontSize: 15, minHeight: 48 },
  notes: { minHeight: 100, textAlignVertical: "top" },
  button: { minHeight: 44, padding: spacing.sm, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  remove: { minHeight: 44, justifyContent: "center" },
  panel: { padding: spacing.md, borderRadius: 12, borderWidth: 1, gap: spacing.sm },
});
