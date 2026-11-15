import React, { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { getPmfStrings } from "@/content/pmf";
import type { LangCode } from "@/content";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { submitPmfSurvey, track } from "@/lib/analytics";
import { markSurveyAnswered } from "@/lib/pmf-survey";

type Answer = "very" | "somewhat" | "not";

export function PmfSurveyModal({
  visible,
  lang,
  onClose,
}: {
  visible: boolean;
  lang: LangCode;
  onClose: () => void;
}) {
  const colors = useColors();
  const s = getPmfStrings(lang);
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function reset() {
    setAnswer(null);
    setFeedback("");
    setSubmitted(false);
    setSending(false);
  }

  function handleDismiss() {
    track("pmf_survey_dismissed", undefined, lang);
    reset();
    onClose();
  }

  async function handleSubmit() {
    if (!answer || sending) return;
    setSending(true);
    track("pmf_survey_submitted", { disappointment: answer }, lang);
    await markSurveyAnswered();
    // Fire-and-forget: even if the network fails, don't re-nag the user.
    void submitPmfSurvey({
      disappointment: answer,
      feedback: feedback.trim() || undefined,
      lang,
    });
    setSubmitted(true);
    setSending(false);
    setTimeout(() => {
      reset();
      onClose();
    }, 1600);
  }

  const options: { value: Answer; label: string }[] = [
    { value: "very", label: s.very },
    { value: "somewhat", label: s.somewhat },
    { value: "not", label: s.not },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleDismiss}
    >
      <View style={styles.backdrop}>
        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderRadius: colors.radius + 6 },
          ]}
        >
          {submitted ? (
            <Text style={[styles.thanks, { color: colors.foreground }]}>
              {s.thanks}
            </Text>
          ) : (
            <>
              <Text style={[styles.title, { color: colors.mutedForeground }]}>
                {s.title}
              </Text>
              <Text style={[styles.question, { color: colors.foreground }]}>
                {s.question}
              </Text>
              {options.map((opt) => {
                const active = answer === opt.value;
                return (
                  <Pressable
                    key={opt.value}
                    onPress={() => setAnswer(opt.value)}
                    accessibilityRole="button"
                    style={[
                      styles.option,
                      {
                        borderRadius: colors.radius + 2,
                        borderColor: active ? colors.primary : colors.border,
                        backgroundColor: active
                          ? colors.primary
                          : colors.background,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        {
                          color: active
                            ? colors.primaryForeground
                            : colors.foreground,
                        },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </Pressable>
                );
              })}
              <Text style={[styles.feedbackLabel, { color: colors.mutedForeground }]}>
                {s.feedbackLabel}
              </Text>
              <TextInput
                value={feedback}
                onChangeText={setFeedback}
                placeholder={s.feedbackPlaceholder}
                placeholderTextColor={colors.mutedForeground}
                multiline
                style={[
                  styles.input,
                  {
                    borderColor: colors.border,
                    color: colors.foreground,
                    borderRadius: colors.radius + 2,
                    backgroundColor: colors.background,
                  },
                ]}
              />
              <View style={styles.row}>
                <Pressable
                  onPress={handleDismiss}
                  accessibilityRole="button"
                  style={styles.skipBtn}
                >
                  <Text style={[styles.skipText, { color: colors.mutedForeground }]}>
                    {s.skip}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSubmit}
                  accessibilityRole="button"
                  disabled={!answer || sending}
                  style={[
                    styles.submitBtn,
                    {
                      borderRadius: colors.radius + 2,
                      backgroundColor: colors.primary,
                      opacity: !answer || sending ? 0.5 : 1,
                    },
                  ]}
                >
                  <Text style={[styles.submitText, { color: colors.primaryForeground }]}>
                    {s.submit}
                  </Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    padding: 22,
  },
  title: {
    fontFamily: FONTS.semibold,
    fontSize: 12,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  question: {
    fontFamily: FONTS.semibold,
    fontSize: 17,
    lineHeight: 24,
    marginBottom: 14,
  },
  option: {
    borderWidth: 1.5,
    paddingVertical: 11,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  optionText: {
    fontFamily: FONTS.medium,
    fontSize: 15,
  },
  feedbackLabel: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    marginTop: 10,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    minHeight: 64,
    padding: 10,
    fontFamily: FONTS.regular,
    fontSize: 14,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  skipBtn: {
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  skipText: {
    fontFamily: FONTS.medium,
    fontSize: 14,
  },
  submitBtn: {
    paddingVertical: 11,
    paddingHorizontal: 26,
  },
  submitText: {
    fontFamily: FONTS.semibold,
    fontSize: 15,
  },
  thanks: {
    fontFamily: FONTS.semibold,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 12,
  },
});
