import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import type { PropsWithChildren } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { spacing } from "@workspace/vaani-core/theme";

import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";

export function InfoPageShell({
  children,
  screenTitle,
}: PropsWithChildren<{ screenTitle: string }>) {
  const colors = useColors();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={[
        styles.safe,
        {
          backgroundColor: colors.background,
          paddingTop: Platform.OS === "web" ? 67 : 0,
          paddingBottom: Platform.OS === "web" ? 34 : 0,
        },
      ]}
    >
      <StatusBar style="dark" />
      <View
        style={[
          styles.header,
          { backgroundColor: colors.card, borderBottomColor: colors.border },
        ]}
      >
        <Pressable
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          testID="button-info-back"
          hitSlop={12}
          style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.55 : 1 }]}
        >
          <Feather name="arrow-left" size={24} color={colors.foreground} />
        </Pressable>
        <Text
          accessibilityRole="header"
          numberOfLines={1}
          style={[styles.headerTitle, { color: colors.foreground }]}
        >
          {screenTitle}
        </Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    minHeight: 56,
    borderBottomWidth: 1,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 44,
    minHeight: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: FONTS.semibold,
    fontSize: 17,
  },
  headerSpacer: { width: 44 },
  scroll: { flex: 1 },
  content: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.huge,
  },
});