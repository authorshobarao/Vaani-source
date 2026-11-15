import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { spacing } from "@workspace/vaani-core/theme";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import type { UIStrings } from "@/content";
import { FONTS } from "@/constants/fonts";
import type { CustomQuestion } from "@/context/PrepContext";
import { useColors } from "@/hooks/useColors";
import { qKey } from "@/lib/keys";

import { MicButton } from "./MicButton";
import { QuestionRow } from "./QuestionRow";

export function CustomQuestionsCard({
  conditionId,
  questions,
  checkedMap,
  onToggle,
  onAdd,
  onRemove,
  answersMap,
  onAnswerChange,
  t,
}: {
  conditionId: string;
  questions: CustomQuestion[];
  checkedMap: Record<string, boolean>;
  onToggle: (key: string) => void;
  onAdd: (text: string) => void;
  onRemove: (id: string) => void;
  answersMap: Record<string, string>;
  onAnswerChange: (key: string, val: string) => void;
  t: UIStrings;
}) {
  const colors = useColors();
  const [draft, setDraft] = useState("");

  function handleAdd() {
    if (!draft.trim()) return;
    onAdd(draft);
    setDraft("");
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
        <Text style={[styles.title, { color: colors.primary }]}>
          {t.yourQuestionsTitle.toUpperCase()}
        </Text>
      </View>

      {questions.length > 0 && (
        <View>
          {questions.map((q, idx) => {
            const key = qKey(conditionId, "custom", q.id);
            return (
              <QuestionRow
                key={q.id}
                text={q.text}
                checked={!!checkedMap[key]}
                onToggle={() => onToggle(key)}
                onDelete={() => onRemove(q.id)}
                answer={answersMap[key]}
                onAnswerChange={(val) => onAnswerChange(key, val)}
                isLast={idx === questions.length - 1}
              />
            );
          })}
        </View>
      )}

      <View style={styles.addRow}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={handleAdd}
          placeholder={t.yourQuestionsPlaceholder}
          placeholderTextColor={colors.mutedForeground}
          maxLength={200}
          style={[
            styles.input,
            {
              color: colors.foreground,
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: colors.radius + 2,
            },
          ]}
        />
        <MicButton
          value={draft}
          onChangeText={setDraft}
          accessibilityLabel={t.yourQuestionsAdd}
        />
        <Pressable
          onPress={handleAdd}
          disabled={!draft.trim()}
          style={({ pressed }) => [
            styles.addBtn,
            {
              backgroundColor: colors.primary,
              borderRadius: colors.radius + 2,
              opacity: !draft.trim() ? 0.4 : pressed ? 0.85 : 1,
            },
          ]}
          accessibilityLabel={t.yourQuestionsAdd}
        >
          <Feather name="plus" size={18} color={colors.primaryForeground} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 12,
    letterSpacing: 0.6,
    fontFamily: FONTS.semibold,
  },
  addRow: {
    flexDirection: "row",
    gap: spacing.xs,
    padding: spacing.md,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  addBtn: {
    width: 52,
    alignItems: "center",
    justifyContent: "center",
  },
});
