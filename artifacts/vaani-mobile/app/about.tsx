import { Feather } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import { ABOUT_CONTENT } from "@workspace/vaani-core/information";
import { spacing } from "@workspace/vaani-core/theme";

import { InfoPageShell } from "@/components/vaani/InfoPageShell";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";

export default function AboutScreen() {
  const colors = useColors();

  return (
    <InfoPageShell screenTitle={ABOUT_CONTENT.navTitle}>
      <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
        {ABOUT_CONTENT.title}
      </Text>
      <Text style={[styles.mission, { color: colors.mutedForeground }]}>
        {ABOUT_CONTENT.mission}
      </Text>

      <View style={styles.paragraphs}>
        {ABOUT_CONTENT.paragraphs.map((paragraph) => (
          <Text key={paragraph} style={[styles.body, { color: colors.foreground }]}>
            {paragraph}
          </Text>
        ))}
      </View>

      <View
        style={[
          styles.founderCard,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderRadius: colors.radius + 6,
          },
        ]}
      >
        <Feather name="message-circle" size={24} color={colors.primary} />
        <Text style={[styles.cardTitle, { color: colors.foreground }]}>
          {ABOUT_CONTENT.founderNoteTitle}
        </Text>
        {ABOUT_CONTENT.founderNote.map((paragraph) => (
          <Text key={paragraph} style={[styles.quote, { color: colors.mutedForeground }]}>
            {paragraph}
          </Text>
        ))}
        <View style={styles.signature}>
          <Text style={[styles.signatureDash, { color: colors.foreground }]}>— </Text>
          <Pressable
            onPress={() => void Linking.openURL(ABOUT_CONTENT.founderUrl)}
            accessibilityRole="link"
            accessibilityLabel={`${ABOUT_CONTENT.founderName}'s website`}
            accessibilityHint="Opens in your browser"
            hitSlop={8}
          >
            <Text style={[styles.founderLink, { color: colors.primary }]}>
              {ABOUT_CONTENT.founderName}
            </Text>
          </Pressable>
        </View>
      </View>
    </InfoPageShell>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    lineHeight: 36,
    marginBottom: spacing.md,
  },
  mission: {
    fontFamily: FONTS.medium,
    fontSize: 18,
    lineHeight: 27,
    marginBottom: spacing.xl,
  },
  paragraphs: { gap: spacing.lg },
  body: { fontFamily: FONTS.regular, fontSize: 16, lineHeight: 25 },
  founderCard: {
    borderWidth: 1,
    padding: spacing.lg,
    marginTop: spacing.xxl,
    gap: spacing.sm,
  },
  cardTitle: { fontFamily: FONTS.bold, fontSize: 20, lineHeight: 26 },
  quote: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: "italic",
  },
  signature: { flexDirection: "row", alignItems: "center", marginTop: spacing.xxs },
  signatureDash: { fontFamily: FONTS.semibold, fontSize: 15 },
  founderLink: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
    textDecorationLine: "underline",
  },
});