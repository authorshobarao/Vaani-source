import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { spacing } from "@workspace/vaani-core/theme";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { useLanguage } from "@/context/LanguageContext";

import { MicButton } from "./MicButton";

export function QuestionRow({
  text,
  checked,
  onToggle,
  answer,
  onAnswerChange,
  onDelete,
  isLast,
}: {
  text: string;
  checked: boolean;
  onToggle: () => void;
  answer?: string;
  onAnswerChange?: (val: string) => void;
  onDelete?: () => void;
  isLast?: boolean;
}) {
  const colors = useColors();
  const { t } = useLanguage();

  function handleToggle() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onToggle();
  }

  return (
    <View
      style={[
        styles.wrap,
        !isLast && { borderBottomColor: colors.border, borderBottomWidth: 1 },
        checked && { backgroundColor: colors.muted },
      ]}
    >
      <View style={styles.row}>
        <Pressable
          onPress={handleToggle}
          hitSlop={8}
          accessibilityRole="checkbox"
          accessibilityState={{ checked }}
          style={[
            styles.checkbox,
            {
              borderRadius: 8,
              borderColor: checked ? colors.primary : colors.border,
              backgroundColor: checked ? colors.primary : colors.card,
            },
          ]}
        >
          {checked && <Feather name="check" size={16} color={colors.primaryForeground} />}
        </Pressable>

        <Text
          style={[
            styles.text,
            { color: checked ? colors.mutedForeground : colors.foreground },
          ]}
        >
          {text}
        </Text>

        {onDelete && (
          <Pressable
            onPress={onDelete}
            hitSlop={8}
            accessibilityLabel="Remove question"
            style={styles.deleteBtn}
          >
            <Feather name="trash-2" size={18} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>

      {checked && onAnswerChange && (
        <View style={styles.answerWrap}>
          <View style={styles.answerRow}>
            <TextInput
              value={answer ?? ""}
              onChangeText={onAnswerChange}
              placeholder={t.ui.doctorAnswer}
              placeholderTextColor={colors.mutedForeground}
              multiline
              style={[
                styles.answerInput,
                {
                  color: colors.foreground,
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  borderRadius: 8,
                },
              ]}
            />
            <MicButton
              value={answer ?? ""}
              onChangeText={onAnswerChange}
              accessibilityLabel={t.ui.dictateAnswer}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {},
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONTS.regular,
  },
  deleteBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  answerWrap: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    marginTop: -2,
  },
  answerRow: {
    flexDirection: "row",
    gap: spacing.xs,
    alignItems: "flex-start",
  },
  answerInput: {
    flex: 1,
    minHeight: 56,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    fontSize: 14,
    lineHeight: 20,
    textAlignVertical: "top",
    fontFamily: FONTS.regular,
  },
});
