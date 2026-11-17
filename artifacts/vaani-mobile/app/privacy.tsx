import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { privacyPolicy } from "@workspace/vaani-core/content/privacy";
import { spacing } from "@workspace/vaani-core/theme";

import { InfoPageShell } from "@/components/vaani/InfoPageShell";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";

export default function PrivacyScreen() {
  const colors = useColors();

  return (
    <InfoPageShell screenTitle="Privacy Policy">
      <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
        Privacy Policy
      </Text>
      <Text style={[styles.meta, { color: colors.mutedForeground }]}>
        Effective date: {privacyPolicy.effectiveDate} · Applies to the Vaani mobile app and the Vaani website
      </Text>
      <Text style={[styles.body, { color: colors.foreground }]}>
        Operator: {privacyPolicy.operator}
      </Text>
      <View style={[styles.notice, { backgroundColor: colors.accent, borderColor: colors.border }]}>
        <Text style={[styles.body, { color: colors.foreground }]}>{privacyPolicy.notice}</Text>
      </View>
      {privacyPolicy.sections.map((section) => (
        <View key={section.id} style={styles.section} testID={`privacy-section-${section.id}`}>
          <Text accessibilityRole="header" style={[styles.heading, { color: colors.foreground }]}>
            {section.title}
          </Text>
          {section.paragraphs.map((paragraph) => (
            <Text key={paragraph} selectable style={[styles.body, { color: colors.foreground }]}>
              {paragraph}
            </Text>
          ))}
          {section.items?.map((item) => (
            <Text key={item} selectable style={[styles.body, { color: colors.foreground }]}>
              • {item}
            </Text>
          ))}
        </View>
      ))}
      <View style={styles.section}>
        <Text accessibilityRole="header" style={[styles.heading, { color: colors.foreground }]}>
          Contact
        </Text>
        <Text style={[styles.body, { color: colors.foreground }]}>
          For privacy questions or requests, email Your Voice First at {privacyPolicy.contactEmail} or contact us through our website.
        </Text>
        <Pressable
          testID="link-privacy-email"
          accessibilityRole="link"
          accessibilityLabel={`Email ${privacyPolicy.contactEmail}`}
          accessibilityHint="Opens your email app"
          onPress={() => void Linking.openURL(`mailto:${privacyPolicy.contactEmail}`).catch(() => {})}
          style={styles.contact}
        >
          <Text style={[styles.link, { color: colors.primary }]}>{privacyPolicy.contactEmail}</Text>
        </Pressable>
        <Pressable
          testID="link-privacy-contact"
          accessibilityRole="link"
          accessibilityLabel="Your Voice First website"
          accessibilityHint="Opens in your browser"
          onPress={() => void Linking.openURL(privacyPolicy.contactUrl)}
          style={styles.contact}
        >
          <Text style={[styles.link, { color: colors.primary }]}>Your Voice First</Text>
        </Pressable>
      </View>
    </InfoPageShell>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: FONTS.bold, fontSize: 28, lineHeight: 36, marginBottom: spacing.md },
  meta: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 22, marginBottom: spacing.sm },
  body: { fontFamily: FONTS.regular, fontSize: 16, lineHeight: 25 },
  notice: { borderWidth: 1, borderRadius: 10, padding: spacing.md, marginTop: spacing.lg },
  section: { marginTop: spacing.xxl, gap: spacing.md },
  heading: { fontFamily: FONTS.bold, fontSize: 22, lineHeight: 29 },
  contact: { minHeight: 44, justifyContent: "center", alignSelf: "flex-start" },
  link: { fontFamily: FONTS.semibold, fontSize: 16, textDecorationLine: "underline" },
});
