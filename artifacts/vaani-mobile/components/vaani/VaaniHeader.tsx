import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { spacing, themeColors } from "@workspace/vaani-core/theme";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { LANGUAGES } from "@/content";
import type { LangCode, UIStrings } from "@/content";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";

function VaaniMark() {
  return (
    <View style={[styles.mark, { backgroundColor: themeColors.surface, overflow: "hidden" }]}>
      <Image
        source={require("@/assets/images/vaani-logo.png")}
        accessibilityLabel="Ask Vaani logo"
        style={styles.markImage}
        resizeMode="cover"
      />
    </View>
  );
}

export function VaaniHeader({
  lang,
  setLang,
  onReset,
  t,
  subtitle,
}: {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  onReset: () => void;
  t: UIStrings;
  subtitle: string;
}) {
  const colors = useColors();
  const [langOpen, setLangOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang);

  function selectLang(code: LangCode) {
    Haptics.selectionAsync().catch(() => {});
    setLang(code);
    setLangOpen(false);
  }

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.logoRow}>
        <VaaniMark />
        <View style={styles.titleCol}>
          <Text style={[styles.appName, { color: colors.foreground }]}>
            Vaani
          </Text>
          <Text
            style={[styles.subtitle, { color: colors.mutedForeground }]}
          >
            {subtitle}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => setLangOpen(true)}
          style={({ pressed }) => [
            styles.langBtn,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderRadius: colors.radius,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          accessibilityLabel={t.languageLabel}
        >
          <Feather name="globe" size={15} color={colors.mutedForeground} />
          <Text
            numberOfLines={1}
            style={[styles.langText, { color: colors.foreground }]}
          >
            {current?.label ?? "English"}
          </Text>
        </Pressable>

        {confirming ? (
          <View style={styles.confirmRow}>
            <Pressable
              onPress={() => {
                onReset();
                setConfirming(false);
              }}
              style={[
                styles.confirmBtn,
                { backgroundColor: colors.destructive, borderRadius: colors.radius },
              ]}
            >
              <Text
                style={[styles.confirmText, { color: colors.destructiveForeground }]}
              >
                {t.resetConfirmYes}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setConfirming(false)}
              style={[
                styles.confirmBtn,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: 1,
                  borderRadius: colors.radius,
                },
              ]}
            >
              <Text style={[styles.confirmText, { color: colors.foreground }]}>
                {t.resetConfirmCancel}
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => setConfirming(true)}
            hitSlop={6}
            style={({ pressed }) => [
              styles.resetBtn,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
            accessibilityLabel={t.resetButton}
          >
            <Feather name="rotate-ccw" size={16} color={colors.mutedForeground} />
          </Pressable>
        )}
      </View>

      <Modal
        visible={langOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setLangOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setLangOpen(false)}>
          <Pressable
            style={[
              styles.sheet,
              { backgroundColor: colors.card, borderColor: colors.border },
            ]}
            onPress={(e) => e.stopPropagation()}
          >
            <View
              style={[styles.sheetHeader, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.sheetTitle, { color: colors.foreground }]}>
                {t.languageLabel}
              </Text>
              <Pressable onPress={() => setLangOpen(false)} hitSlop={10}>
                <Feather name="x" size={22} color={colors.mutedForeground} />
              </Pressable>
            </View>
            <ScrollView style={{ maxHeight: 440 }}>
              {LANGUAGES.map((l) => {
                const active = l.code === lang;
                return (
                  <Pressable
                    key={l.code}
                    onPress={() => selectLang(l.code)}
                    style={({ pressed }) => [
                      styles.option,
                      { backgroundColor: pressed ? colors.muted : "transparent" },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: active ? colors.primary : colors.foreground,
                          fontFamily: active ? FONTS.semibold : FONTS.regular,
                        },
                      ]}
                    >
                      {l.label}
                    </Text>
                    {active && (
                      <Feather name="check" size={18} color={colors.primary} />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flex: 1,
    flexShrink: 1,
  },
  mark: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  markImage: {
    width: 40,
    height: 40,
    transform: [{ scale: 2.4 }, { translateY: 5 }],
  },
  titleCol: { flex: 1, flexShrink: 1 },
  appName: { fontSize: 20, fontFamily: FONTS.bold, letterSpacing: -0.3 },
  subtitle: { fontSize: 12, fontFamily: FONTS.regular },
  actions: { flexDirection: "row", alignItems: "center", gap: spacing.xs },
  langBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    maxWidth: 120,
  },
  langText: { fontSize: 13, fontFamily: FONTS.medium, flexShrink: 1 },
  resetBtn: {
    width: 38,
    height: 38,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmRow: { flexDirection: "row", gap: spacing.xs },
  confirmBtn: { paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  confirmText: { fontSize: 13, fontFamily: FONTS.semibold },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    paddingBottom: spacing.xl,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  sheetTitle: { flex: 1, fontSize: 16, fontFamily: FONTS.semibold },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  optionText: { flex: 1, fontSize: 16 },
});
