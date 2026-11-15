import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { spacing } from "@workspace/vaani-core/theme";

import type { CategoryTranslation } from "@/content";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { qKey } from "@/lib/keys";

import { QuestionRow } from "./QuestionRow";

export function CategoryCard({
  cat,
  keyPrefix,
  checkedMap,
  onToggle,
  answersMap,
  onAnswerChange,
  startIdx = 0,
  children,
}: {
  cat: CategoryTranslation;
  keyPrefix: string;
  checkedMap: Record<string, boolean>;
  onToggle: (key: string) => void;
  answersMap: Record<string, string>;
  onAnswerChange: (key: string, val: string) => void;
  startIdx?: number;
  children?: React.ReactNode;
}) {
  const colors = useColors();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderRadius: colors.radius + 2,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: colors.accentTint, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.accentForeground }]}>
          {cat.title.toUpperCase()}
        </Text>
      </View>
      <View>
        {cat.questions.map((q, i) => {
          const idx = i + startIdx;
          const key = qKey(keyPrefix, cat.id, idx);
          return (
            <QuestionRow
              key={idx}
              text={q}
              checked={!!checkedMap[key]}
              onToggle={() => onToggle(key)}
              answer={answersMap[key]}
              onAnswerChange={(val) => onAnswerChange(key, val)}
              isLast={i === cat.questions.length - 1}
            />
          );
        })}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
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
});
