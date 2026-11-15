import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { spacing } from "@workspace/vaani-core/theme";

import type { UIStrings } from "@/content";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";

export function MentalHealthNotice({ t }: { t: UIStrings }) {
  const colors = useColors();
  return (
    <View
      style={[
        styles.wrap,
        {
          backgroundColor: colors.destructiveTint,
          borderColor: colors.destructiveBorder,
          borderRadius: colors.radius + 2,
        },
      ]}
      accessibilityLabel="Crisis support information"
    >
      <Feather name="phone-call" size={20} color={colors.destructive} />
      <View style={styles.textCol}>
        <Text style={[styles.title, { color: colors.destructive }]}>
          {t.safetyNoticeTitle}
        </Text>
        <Text style={[styles.line, { color: colors.foreground }]}>
          {t.safetyNoticeLine988}
        </Text>
        <Text style={[styles.subtle, { color: colors.mutedForeground }]}>
          {t.safetyNoticeInternational}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: spacing.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  textCol: { flex: 1, gap: spacing.xxs },
  title: { fontSize: 14, fontFamily: FONTS.semibold },
  line: { fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
  subtle: { fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
});
