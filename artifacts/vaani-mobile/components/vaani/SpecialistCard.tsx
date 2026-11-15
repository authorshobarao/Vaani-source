import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { type Specialist } from "@workspace/vaani-core/content/specialists";
import { translatedSpecialists } from "@workspace/vaani-core/content/features";
import { useLanguage } from "@/context/LanguageContext";
import { spacing } from "@workspace/vaani-core/theme";
import { useColors } from "@/hooks/useColors";
import { FONTS } from "@/constants/fonts";

export function SpecialistCard({ specialists }: { specialists: Specialist[] }) {
  const colors = useColors();
  const { t } = useLanguage();
  return (
    <View testID="specialist-card" style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text accessibilityRole="header" style={[styles.title, { color: colors.primary }]}>{t.ui.specialistTitle}</Text>
      {translatedSpecialists(specialists, t.ui).map(specialist => (
        <Text key={specialist.name} style={[styles.body, { color: colors.foreground }]}>
          <Text style={{ fontFamily: FONTS.semibold }}>{specialist.name}: </Text>{specialist.description}
        </Text>
      ))}
      <Text style={[styles.note, { color: colors.mutedForeground, borderTopColor: colors.border }]}>
        {t.ui.specialistNote}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderRadius: 12, padding: spacing.md, gap: spacing.sm, marginTop: spacing.md },
  title: { fontFamily: FONTS.semibold, fontSize: 16 },
  body: { fontFamily: FONTS.regular, fontSize: 14, lineHeight: 21 },
  note: { fontFamily: FONTS.regular, fontSize: 12, lineHeight: 18, paddingTop: spacing.sm, borderTopWidth: 1 },
});
