import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { HOW_IT_WORKS_CONTENT } from "@workspace/vaani-core/information";
import { spacing } from "@workspace/vaani-core/theme";

import { InfoPageShell } from "@/components/vaani/InfoPageShell";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";

const stepIcons = ["file-text", "star", "activity"] as const;

export default function HowItWorksScreen() {
  const colors = useColors();

  return (
    <InfoPageShell screenTitle={HOW_IT_WORKS_CONTENT.navTitle}>
      <View style={styles.intro}>
        <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
          {HOW_IT_WORKS_CONTENT.title}
        </Text>
        <Text style={[styles.introduction, { color: colors.mutedForeground }]}>
          {HOW_IT_WORKS_CONTENT.introduction}
        </Text>
      </View>

      <View style={styles.steps}>
        {HOW_IT_WORKS_CONTENT.steps.map((step, index) => (
          <View key={step.id} style={styles.step}>
            <View
              style={[
                styles.iconCircle,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.primaryBorder,
                },
              ]}
            >
              <Feather
                name={stepIcons[index] ?? "circle"}
                size={30}
                color={index === 1 ? colors.secondary : colors.primary}
              />
            </View>
            <View style={styles.stepCopy}>
              <Text style={[styles.stepTitle, { color: colors.foreground }]}>
                {step.title}
              </Text>
              <Text style={[styles.body, { color: colors.mutedForeground }]}>
                {step.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        onPress={() => router.replace("/")}
        accessibilityRole="button"
        testID="button-start-prep"
        style={({ pressed }) => [
          styles.callToAction,
          {
            backgroundColor: colors.primary,
            borderRadius: colors.radius + 2,
            opacity: pressed ? 0.85 : 1,
          },
        ]}
      >
        <Text style={[styles.callToActionText, { color: colors.primaryForeground }]}>
          {HOW_IT_WORKS_CONTENT.callToAction}
        </Text>
      </Pressable>
    </InfoPageShell>
  );
}

const styles = StyleSheet.create({
  intro: { alignItems: "center", marginBottom: spacing.xxl },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 30,
    lineHeight: 36,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  introduction: {
    fontFamily: FONTS.regular,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
  },
  steps: { gap: spacing.xl },
  step: { flexDirection: "row", gap: spacing.md, alignItems: "flex-start" },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCopy: { flex: 1, paddingTop: 3 },
  stepTitle: {
    fontFamily: FONTS.bold,
    fontSize: 19,
    lineHeight: 25,
    marginBottom: spacing.xs,
  },
  body: { fontFamily: FONTS.regular, fontSize: 15, lineHeight: 23 },
  callToAction: {
    marginTop: spacing.xxxl,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  callToActionText: { fontFamily: FONTS.semibold, fontSize: 16 },
});