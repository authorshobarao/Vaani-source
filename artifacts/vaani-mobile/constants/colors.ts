import { spacing, themeColors } from "@workspace/vaani-core/theme";

const colors = {
  light: {
    // Legacy aliases (kept for backward compatibility)
    text: themeColors.text,
    tint: themeColors.primary,

    // Core surfaces
    background: themeColors.background,
    foreground: themeColors.text,

    // Cards / elevated surfaces
    card: themeColors.surface,
    cardForeground: themeColors.text,

    // Brand actions
    primary: themeColors.primary,
    primaryForeground: themeColors.primaryForeground,

    // Secondary / less-emphasis interactive surfaces
    secondary: themeColors.secondary,
    secondaryForeground: themeColors.secondaryForeground,

    // Muted / subdued elements
    muted: themeColors.muted,
    mutedForeground: themeColors.mutedText,

    // Accent highlights
    accent: themeColors.secondarySoft,
    accentForeground: themeColors.text,

    // Destructive actions
    destructive: "#dc3428",
    destructiveForeground: "#ffffff",

    // Borders and input outlines
    border: themeColors.border,
    input: themeColors.border,
    ring: themeColors.primary,

    // Derived soft surfaces
    primaryTint: themeColors.primarySoft,
    primaryTintStrong: themeColors.primaryBorder,
    primaryBorder: themeColors.primaryBorder,
    accentTint: themeColors.secondarySoft,
    destructiveTint: "rgba(220,52,40,0.06)",
    destructiveBorder: "rgba(220,52,40,0.28)",
  },

  // Border radius (px). Synced from web --radius: 0.625rem (10px).
  radius: 10,
  spacing,
};

export default colors;
