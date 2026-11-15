import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { spacing } from "@workspace/vaani-core/theme";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { UIStrings } from "@/content";
import { suggestionDescription } from "@workspace/vaani-core";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { suggestQuestions } from "@/lib/api";
import { mobileApiError } from "@/lib/api-errors";
import { track } from "@/lib/analytics";

export function AISuggestPanel({
  conditionLabel,
  lang,
  onAdd,
  t,
  extraContext,
}: {
  conditionLabel: string;
  lang: string;
  onAdd: (text: string) => void;
  t: UIStrings;
  extraContext?: string;
}) {
  const colors = useColors();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<number>>(new Set());

  async function handleSuggest() {
    if (!description.trim() || loading) return;
    setLoading(true);
    setError(null);
    setQuestions([]);
    setAdded(new Set());
    try {
      const result = await suggestQuestions({
        condition: conditionLabel,
        description: suggestionDescription(description, extraContext),
        lang,
      });
      setQuestions(result);
      track("ai_suggestions_used", { count: result.length }, lang);
    } catch (error) {
      setError(mobileApiError(error, t.aiPanelError, false, t));
    } finally {
      setLoading(false);
    }
  }

  function handleAddQuestion(q: string, idx: number) {
    onAdd(q);
    setAdded((prev) => new Set([...prev, idx]));
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.primaryTint,
          borderColor: colors.primaryBorder,
          borderRadius: colors.radius + 2,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.primaryTintStrong,
            borderBottomColor: colors.primaryBorder,
          },
        ]}
      >
        <Ionicons name="sparkles" size={16} color={colors.primary} />
        <Text style={[styles.headerText, { color: colors.primary }]}>
          {t.aiPanelHeading}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.label, { color: colors.foreground }]}>
          {t.aiPanelLabel}
        </Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder={t.aiPanelPlaceholder.replace("{condition}", conditionLabel)}
          placeholderTextColor={colors.mutedForeground}
          multiline
          maxLength={500}
          style={[
            styles.textarea,
            {
              color: colors.foreground,
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: colors.radius + 2,
            },
          ]}
        />

        <Pressable
          onPress={handleSuggest}
          disabled={!description.trim() || loading}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: colors.primary,
              borderRadius: colors.radius + 2,
              opacity: !description.trim() || loading ? 0.5 : pressed ? 0.85 : 1,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.primaryForeground} />
          ) : (
            <Ionicons name="sparkles" size={16} color={colors.primaryForeground} />
          )}
          <Text style={[styles.buttonText, { color: colors.primaryForeground }]}>
            {loading ? t.aiPanelLoading : t.aiPanelButton}
          </Text>
        </Pressable>

        {error && (
          <Text style={[styles.error, { color: colors.destructive }]}>
            {error}
          </Text>
        )}

        {questions.map((q, idx) => (
          <View
            key={idx}
            style={[
              styles.resultRow,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius + 2,
              },
            ]}
          >
            <Text style={[styles.resultText, { color: colors.foreground }]}>
              {q}
            </Text>
            <Pressable
              onPress={() => handleAddQuestion(q, idx)}
              disabled={added.has(idx)}
              style={({ pressed }) => [
                styles.addChip,
                {
                  backgroundColor: colors.primaryTintStrong,
                  borderColor: colors.primaryBorder,
                  opacity: added.has(idx) ? 0.5 : pressed ? 0.8 : 1,
                },
              ]}
            >
              <Feather
                name={added.has(idx) ? "check" : "plus"}
                size={14}
                color={colors.primary}
              />
            </Pressable>
          </View>
        ))}

        <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
          {t.aiPanelDisclaimer}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, overflow: "hidden" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  headerText: { fontSize: 14, fontFamily: FONTS.semibold },
  body: { padding: spacing.md, gap: spacing.md },
  label: { fontSize: 14, fontFamily: FONTS.medium },
  textarea: {
    minHeight: 84,
    borderWidth: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: "top",
    fontFamily: FONTS.regular,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignSelf: "flex-start",
  },
  buttonText: { fontSize: 14, fontFamily: FONTS.semibold },
  error: { fontSize: 14, fontFamily: FONTS.regular },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  resultText: { flex: 1, fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
  addChip: {
    width: 34,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  disclaimer: { fontSize: 12, lineHeight: 17, fontFamily: FONTS.regular },
});
