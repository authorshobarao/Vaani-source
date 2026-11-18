import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import type { FeatureStrings } from "@workspace/vaani-core/content/features";
import { spacing } from "@workspace/vaani-core/theme";

import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { getDeviceId } from "@/lib/analytics";
import { reportAiContent } from "@/lib/api";

export type AiReportFeature = "suggestions" | "report" | "topic" | "medication";
type Reason = "offensive" | "harmful" | "inaccurate" | "other";

const MAX_CONTENT = 8000;

/**
 * In-app reporting for AI-generated content (Google Play AI-Generated Content
 * policy): users can flag a response to the developer without leaving the app.
 */
export function ReportAIContent({
  feature,
  content,
  lang,
  t,
}: {
  feature: AiReportFeature;
  content: string;
  lang: string;
  t: FeatureStrings;
}) {
  const colors = useColors();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<Reason | null>(null);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  if (!content.trim()) return null;

  const reasons: [Reason, string][] = [
    ["offensive", t.reportReasonOffensive],
    ["harmful", t.reportReasonHarmful],
    ["inaccurate", t.reportReasonInaccurate],
    ["other", t.reportReasonOther],
  ];

  function close() {
    setOpen(false);
    setReason(null);
    setComment("");
    setStatus("idle");
  }

  async function send() {
    if (!reason || status === "sending") return;
    setStatus("sending");
    try {
      const deviceId = await getDeviceId();
      await reportAiContent({
        deviceId,
        feature,
        reason,
        content: content.slice(0, MAX_CONTENT),
        ...(comment.trim() ? { comment: comment.trim().slice(0, 1000) } : {}),
        lang,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Pressable
        testID={`report-ai-${feature}`}
        accessibilityRole="button"
        accessibilityLabel={t.reportAi}
        onPress={() => setOpen(true)}
        hitSlop={8}
        style={styles.trigger}
      >
        <Feather name="flag" size={13} color={colors.mutedForeground} />
        <Text style={[styles.triggerText, { color: colors.mutedForeground }]}>{t.reportAi}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={close}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.backdrop}
        >
          <View style={[styles.sheet, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text accessibilityRole="header" style={[styles.title, { color: colors.foreground }]}>
              {t.reportAiTitle}
            </Text>

            {status === "sent" ? (
              <>
                <Text accessibilityRole="alert" style={[styles.body, { color: colors.foreground }]}>
                  {t.reportThanks}
                </Text>
                <Pressable
                  accessibilityRole="button"
                  onPress={close}
                  style={[styles.primary, { backgroundColor: colors.primary }]}
                >
                  <Text style={[styles.primaryText, { color: colors.primaryForeground }]}>OK</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Text style={[styles.body, { color: colors.mutedForeground }]}>{t.reportAiIntro}</Text>
                <View accessibilityRole="radiogroup" style={styles.reasons}>
                  {reasons.map(([value, label]) => {
                    const active = reason === value;
                    return (
                      <Pressable
                        key={value}
                        testID={`report-reason-${value}`}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: active }}
                        onPress={() => setReason(value)}
                        style={[
                          styles.reason,
                          {
                            borderColor: active ? colors.primary : colors.border,
                            backgroundColor: active ? colors.primaryTintStrong : colors.card,
                          },
                        ]}
                      >
                        <Feather
                          name={active ? "check-circle" : "circle"}
                          size={16}
                          color={active ? colors.primary : colors.mutedForeground}
                        />
                        <Text style={[styles.body, { flex: 1, color: colors.foreground }]}>{label}</Text>
                      </Pressable>
                    );
                  })}
                </View>
                <TextInput
                  testID="report-comment"
                  value={comment}
                  onChangeText={setComment}
                  placeholder={t.reportCommentPlaceholder}
                  placeholderTextColor={colors.mutedForeground}
                  multiline
                  maxLength={1000}
                  style={[
                    styles.input,
                    { color: colors.foreground, borderColor: colors.border, backgroundColor: colors.card },
                  ]}
                />
                {status === "error" && (
                  <Text accessibilityRole="alert" style={[styles.body, { color: colors.destructive }]}>
                    {t.reportError}
                  </Text>
                )}
                <View style={styles.actions}>
                  <Pressable accessibilityRole="button" onPress={close} style={styles.secondary}>
                    <Text style={[styles.secondaryText, { color: colors.primary }]}>{t.reportCancel}</Text>
                  </Pressable>
                  <Pressable
                    testID="report-submit"
                    accessibilityRole="button"
                    disabled={!reason || status === "sending"}
                    onPress={() => void send()}
                    style={[
                      styles.primary,
                      { backgroundColor: colors.primary, opacity: !reason || status === "sending" ? 0.5 : 1 },
                    ]}
                  >
                    {status === "sending" ? (
                      <ActivityIndicator color={colors.primaryForeground} />
                    ) : (
                      <Text style={[styles.primaryText, { color: colors.primaryForeground }]}>{t.reportSubmit}</Text>
                    )}
                  </Pressable>
                </View>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", minHeight: 32 },
  triggerText: { fontSize: 13, fontFamily: FONTS.medium, textDecorationLine: "underline" },
  backdrop: { flex: 1, justifyContent: "center", padding: spacing.lg, backgroundColor: "rgba(0,0,0,0.45)" },
  sheet: { borderWidth: 1, borderRadius: 16, padding: spacing.lg, gap: spacing.md },
  title: { fontSize: 18, lineHeight: 24, fontFamily: FONTS.semibold },
  body: { fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
  reasons: { gap: spacing.sm },
  reason: { flexDirection: "row", alignItems: "center", gap: spacing.sm, borderWidth: 1, borderRadius: 10, padding: spacing.sm, minHeight: 44 },
  input: { borderWidth: 1, borderRadius: 10, padding: spacing.sm, minHeight: 72, textAlignVertical: "top", fontSize: 14, fontFamily: FONTS.regular },
  actions: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: spacing.md },
  secondary: { minHeight: 44, justifyContent: "center", paddingHorizontal: spacing.sm },
  secondaryText: { fontSize: 15, fontFamily: FONTS.semibold },
  primary: { minHeight: 44, minWidth: 120, justifyContent: "center", alignItems: "center", borderRadius: 10, paddingHorizontal: spacing.md },
  primaryText: { fontSize: 15, fontFamily: FONTS.semibold },
});
