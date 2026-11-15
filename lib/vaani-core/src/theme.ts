/**
 * Framework-agnostic Vaani design tokens shared by web and native clients.
 * Keep this module limited to serializable primitives so it never pulls a UI
 * runtime into shared content consumers.
 */
export const themeColors = {
  background: "#FDF3E7",
  primary: "#0F6E6E",
  secondary: "#F2884B",
  text: "#3A342E",
  surface: "#FFFFFF",
  primaryForeground: "#FFFFFF",
  secondaryForeground: "#3A342E",
  muted: "#F8E9DA",
  mutedText: "#746B63",
  border: "#E5D5C5",
  primarySoft: "#E6F0EF",
  primaryBorder: "#A9CFCC",
  secondarySoft: "#FCE4D5",
} as const;

/**
 * A 4px-based spacing scale matching the website's common Tailwind spacing.
 */
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  huge: 48,
  jumbo: 64,
} as const;

export const theme = {
  colors: themeColors,
  spacing,
} as const;

export type ThemeColors = typeof themeColors;
export type Spacing = typeof spacing;