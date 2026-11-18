import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { spacing } from "@workspace/vaani-core/theme";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import type { UIStrings } from "@/content";
import { FONTS } from "@/constants/fonts";
import { useColors } from "@/hooks/useColors";
import { analyzeReport } from "@/lib/api";
import { mobileApiError } from "@/lib/api-errors";
import { track } from "@/lib/analytics";
import { ReportAIContent } from "./ReportAIContent";

import { MAX_UPLOAD_BYTES } from "@workspace/vaani-core";
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

interface PickedFile {
  uri: string;
  name: string;
  mediaType: string;
  size?: number;
  base64?: string;
}

export function ReportUploadPanel({
  conditionLabel,
  lang,
  onAdd,
  t,
}: {
  conditionLabel: string;
  lang: string;
  onAdd: (text: string) => void;
  t: UIStrings;
}) {
  const colors = useColors();
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState<Set<number>>(new Set());

  function guessMediaType(uri: string, fallback?: string): string {
    if (fallback && fallback !== "image") return fallback;
    const ext = uri.split(".").pop()?.toLowerCase();
    if (ext === "png") return "image/png";
    if (ext === "webp") return "image/webp";
    if (ext === "gif") return "image/gif";
    if (ext === "pdf") return "application/pdf";
    return "image/jpeg";
  }

  async function processFile(file: PickedFile) {
    setError(null);
    setQuestions([]);
    setAdded(new Set());

    if (!ACCEPTED_TYPES.includes(file.mediaType)) {
      setFileName(null);
      setError(t.uploadError);
      return;
    }

    // Determine size deterministically even when the picker omits it:
    // base64 length gives byte size, otherwise stat the file on disk.
    let size = file.size ?? null;
    if (size == null && file.base64) {
      size = Math.floor((file.base64.length * 3) / 4);
    }
    if (size == null) {
      try {
        const info = await FileSystem.getInfoAsync(file.uri);
        if (info.exists && typeof info.size === "number") size = info.size;
      } catch {
        /* fall through — cannot determine size */
      }
    }
    if (size != null && size > MAX_UPLOAD_BYTES) {
      setFileName(null);
      setError(t.uploadTooLarge);
      return;
    }

    setFileName(file.name);
    setLoading(true);
    try {
      const data =
        file.base64 ??
        (await FileSystem.readAsStringAsync(file.uri, {
          encoding: FileSystem.EncodingType.Base64,
        }));
      const result = await analyzeReport({
        condition: conditionLabel,
        lang,
        file: { mediaType: file.mediaType, data },
      });
      setQuestions(result);
      track("report_analyzed", { count: result.length }, lang);
    } catch (error) {
      setError(mobileApiError(error, t.uploadError, false, t));
    } finally {
      setLoading(false);
    }
  }

  function showPermissionDenied() {
    Alert.alert(t.permissionDeniedTitle, t.permissionDeniedMessage, [
      {
        text: t.openSettings,
        onPress: () => Linking.openSettings().catch(() => {}),
      },
      { text: t.resetConfirmCancel, style: "cancel" },
    ]);
  }

  async function pickFromLibrary(useCamera: boolean) {
    try {
      const perm = useCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!perm.granted) {
        showPermissionDenied();
        return;
      }

      const res = useCamera
        ? await ImagePicker.launchCameraAsync({ base64: true, quality: 0.8 })
        : await ImagePicker.launchImageLibraryAsync({
            base64: true,
            quality: 0.8,
            mediaTypes: ["images"],
          });
      if (res.canceled || !res.assets?.[0]) return;
      const asset = res.assets[0];
      await processFile({
        uri: asset.uri,
        name: asset.fileName ?? "report.jpg",
        mediaType: guessMediaType(asset.uri, asset.mimeType),
        size: asset.fileSize,
        base64: asset.base64 ?? undefined,
      });
    } catch {
      setError(t.uploadError);
    }
  }

  async function pickDocument() {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "image/*"],
        copyToCacheDirectory: true,
      });
      if (res.canceled || !res.assets?.[0]) return;
      const asset = res.assets[0];
      await processFile({
        uri: asset.uri,
        name: asset.name,
        mediaType: guessMediaType(asset.uri, asset.mimeType),
        size: asset.size,
      });
    } catch {
      setError(t.uploadError);
    }
  }

  function handleUploadPress() {
    const options = [
      { text: "Take photo", onPress: () => pickFromLibrary(true) },
      { text: "Choose photo", onPress: () => pickFromLibrary(false) },
      { text: "Choose PDF / file", onPress: () => pickDocument() },
    ];
    // Android dialogs render at most three buttons (extra ones are silently
    // dropped), so there we omit the explicit Cancel and let the user dismiss
    // with back / tap-outside instead.
    if (Platform.OS === "android") {
      Alert.alert(t.uploadTitle, undefined, options, { cancelable: true });
      return;
    }
    Alert.alert(t.uploadTitle, undefined, [
      ...options,
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function handleAddQuestion(q: string, idx: number) {
    onAdd(q);
    setAdded((prev) => new Set([...prev, idx]));
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.primaryTint,
          borderColor: colors.primaryBorder,
          borderRadius: colors.radius + 2,
        },
      ]}
    >
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.primaryTintStrong,
            borderBottomColor: colors.primaryBorder,
          },
        ]}
      >
        <Feather name="file-text" size={16} color={colors.primary} />
        <Text style={[styles.headerText, { color: colors.primary }]}>
          {t.uploadTitle}
        </Text>
      </View>

      <View style={styles.body}>
        <Text style={[styles.hint, { color: colors.mutedForeground }]}>
          {t.uploadHint}
        </Text>

        <Pressable
          onPress={handleUploadPress}
          disabled={loading}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: colors.primary,
              borderRadius: colors.radius + 2,
              opacity: loading ? 0.5 : pressed ? 0.85 : 1,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.primaryForeground} />
          ) : (
            <Feather name="upload" size={16} color={colors.primaryForeground} />
          )}
          <Text style={[styles.buttonText, { color: colors.primaryForeground }]}>
            {loading
              ? t.uploadAnalyzing
              : questions.length > 0 || fileName
                ? t.uploadChooseAnother
                : t.uploadButton}
          </Text>
        </Pressable>

        {fileName && !error && (
          <Text
            numberOfLines={1}
            style={[styles.fileName, { color: colors.mutedForeground }]}
          >
            {fileName}
          </Text>
        )}

        {error && (
          <Text style={[styles.error, { color: colors.destructive }]}>
            {error}
          </Text>
        )}

        {questions.map((q, idx) => (
          <View
            key={idx}
            style={[
              styles.resultRow,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: colors.radius + 2,
              },
            ]}
          >
            <Text style={[styles.resultText, { color: colors.foreground }]}>
              {q}
            </Text>
            <Pressable
              onPress={() => handleAddQuestion(q, idx)}
              disabled={added.has(idx)}
              style={({ pressed }) => [
                styles.addChip,
                {
                  backgroundColor: colors.primaryTintStrong,
                  borderColor: colors.primaryBorder,
                  opacity: added.has(idx) ? 0.5 : pressed ? 0.8 : 1,
                },
              ]}
            >
              <Feather
                name={added.has(idx) ? "check" : "plus"}
                size={14}
                color={colors.primary}
              />
            </Pressable>
          </View>
        ))}

        {questions.length > 0 && (
          <ReportAIContent feature="report" content={questions.join("\n")} lang={lang} t={t} />
        )}

        <Text style={[styles.disclaimer, { color: colors.mutedForeground }]}>
          {t.aiPanelDisclaimer}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, overflow: "hidden" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  headerText: { fontSize: 14, fontFamily: FONTS.semibold },
  body: { padding: spacing.md, gap: spacing.md },
  hint: { fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    alignSelf: "flex-start",
  },
  buttonText: { fontSize: 14, fontFamily: FONTS.semibold },
  fileName: { fontSize: 12, fontFamily: FONTS.regular },
  error: { fontSize: 14, fontFamily: FONTS.regular },
  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  resultText: { flex: 1, fontSize: 14, lineHeight: 20, fontFamily: FONTS.regular },
  addChip: {
    width: 34,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  disclaimer: { fontSize: 12, lineHeight: 17, fontFamily: FONTS.regular },
});
