import React, { useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { spacing } from "@workspace/vaani-core/theme";

import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { useLanguage } from "@/context/LanguageContext";
import {
  getMedicalSources,
  type MedicalSource,
} from "@/content/sources";

interface Props {
  conditionId: string;
  title: string;
  intro: string;
  customTopicLabel?: string;
  customTopicArticle?: MedicalSource;
  sourcesOverride?: MedicalSource[];
}

function SourceLink({ source }: { source: MedicalSource }) {
  const colors = useColors();
  return (
    <Pressable
      onPress={() => Linking.openURL(source.url)}
      accessibilityRole="link"
      accessibilityLabel={source.name}
      style={styles.sourceRow}
    >
      <Feather name="external-link" size={13} color={colors.primary} />
      <Text style={[styles.sourceText, { color: colors.primary }]}>
        {source.name}
      </Text>
    </Pressable>
  );
}

export function MedicalSources({
  conditionId,
  title,
  intro,
  customTopicLabel,
  customTopicArticle,
  sourcesOverride,
}: Props) {
  const colors = useColors();
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(true);

  const sources = sourcesOverride ?? getMedicalSources(conditionId, customTopicLabel, customTopicArticle).map(source =>
    customTopicLabel && source.name === `MedlinePlus — ${customTopicLabel}`
      ? { ...source, name: t.ui.sourceCondition.replace("{topic}", customTopicLabel) } : source);

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.border, backgroundColor: colors.card },
      ]}
    >
      <Pressable
        onPress={() => setExpanded((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ expanded }}
        style={styles.header}
      >
        <Feather name="book-open" size={15} color={colors.mutedForeground} />
        <Text style={[styles.title, { color: colors.foreground }]}>
          {title}
        </Text>
        <Feather
          name={expanded ? "chevron-up" : "chevron-down"}
          size={17}
          color={colors.mutedForeground}
        />
      </Pressable>
      {expanded && (
        <View style={styles.body}>
          <Text style={[styles.intro, { color: colors.mutedForeground }]}>
            {intro}
          </Text>
          {sources.map((s, i) => (
            <SourceLink key={`${s.url}-${i}`} source={s} />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    marginTop: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONTS.semibold,
  },
  body: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  intro: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: FONTS.regular,
  },
  sourceRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    paddingVertical: 2,
  },
  sourceText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FONTS.regular,
    textDecorationLine: "underline",
  },
});
