import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { FAQ_CONTENT } from "@workspace/vaani-core/information";
import { spacing } from "@workspace/vaani-core/theme";

import { InfoPageShell } from "@/components/vaani/InfoPageShell";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";

type FaqItem = (typeof FAQ_CONTENT.items)[number];

function FaqRow({ item }: { item: FaqItem }) {
  const colors = useColors();
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.item, { borderBottomColor: colors.border }]}>
      <Pressable
        onPress={() => setExpanded((value) => !value)}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={item.question}
        accessibilityHint={expanded ? "Collapses the answer" : "Expands the answer"}
        testID={`faq-item-${item.id}`}
        style={({ pressed }) => [styles.questionButton, { opacity: pressed ? 0.65 : 1 }]}
      >
        <Text style={[styles.question, { color: colors.foreground }]}>{item.question}</Text>
        <Feather
          name={expanded ? "chevron-up" : "chevron-down"}
          size={21}
          color={colors.primary}
        />
      </Pressable>
      {expanded ? (
        <Text
          accessibilityLiveRegion="polite"
          style={[styles.answer, { color: colors.mutedForeground }]}
        >
          {item.answer}
        </Text>
      ) : null}
    </View>
  );
}

export default function FaqScreen() {
  const colors = useColors();

  return (
    <InfoPageShell screenTitle={FAQ_CONTENT.navTitle}>
      <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
        {FAQ_CONTENT.title}
      </Text>
      <Text style={[styles.introduction, { color: colors.mutedForeground }]}>
        {FAQ_CONTENT.introduction}
      </Text>
      <View style={styles.list}>
        {FAQ_CONTENT.items.map((item) => (
          <FaqRow key={item.id} item={item} />
        ))}
      </View>
    </InfoPageShell>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  introduction: {
    fontFamily: FONTS.regular,
    fontSize: 17,
    lineHeight: 25,
    marginBottom: spacing.xl,
  },
  list: { width: "100%" },
  item: { borderBottomWidth: 1, paddingVertical: 5 },
  questionButton: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  question: {
    flex: 1,
    fontFamily: FONTS.semibold,
    fontSize: 17,
    lineHeight: 24,
  },
  answer: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 24,
    paddingBottom: spacing.lg,
    paddingRight: spacing.lg,
  },
});