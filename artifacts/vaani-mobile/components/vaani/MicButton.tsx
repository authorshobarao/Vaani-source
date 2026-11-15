import { Feather } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Alert, Linking, Pressable, StyleSheet } from "react-native";

import { useLanguage } from "@/context/LanguageContext";
import { useColors } from "@/hooks/useColors";
import { useDictation } from "@/hooks/useDictation";

export function MicButton({
  value,
  onChangeText,
  accessibilityLabel,
  size = 18,
}: {
  value: string;
  onChangeText: (t: string) => void;
  accessibilityLabel?: string;
  size?: number;
}) {
  const colors = useColors();
  const { lang, t } = useLanguage();
  const handlePermissionDenied = useCallback(() => {
    Alert.alert(t.ui.permissionDeniedTitle, t.ui.permissionDeniedMessage, [
      {
        text: t.ui.openSettings,
        onPress: () => Linking.openSettings().catch(() => {}),
      },
      { text: t.ui.resetConfirmCancel, style: "cancel" },
    ]);
  }, [t]);
  const { listening, toggle } = useDictation({
    lang,
    getBase: () => value,
    onText: onChangeText,
    onPermissionDenied: handlePermissionDenied,
  });

  return (
    <Pressable
      testID={`mic-${(accessibilityLabel ?? "dictate").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
      onPress={toggle}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? "Dictate with voice"}
      accessibilityState={{ selected: listening }}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: listening ? colors.primary : colors.card,
          borderColor: listening ? colors.primary : colors.border,
          borderRadius: colors.radius + 2,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <Feather
        name="mic"
        size={size}
        color={listening ? colors.primaryForeground : colors.mutedForeground}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 48,
    height: 48,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
