import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  textContent: {
    alignItems: "center",
    paddingHorizontal: 0,
    marginBottom: theme.spacing[4],
  },
  title: {
    fontSize: theme.typography.fontSizes["2xl"],
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: theme.typography.fontSizes["2xl"],
    letterSpacing: theme.typography.letterSpacing.tight,
    color: theme.colors.primary.brand,
    textAlign: "center",
    marginBottom: theme.spacing[4],
  },
  description: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
    lineHeight:
      theme.typography.fontSizes.sm * theme.typography.lineHeights.normal,
    letterSpacing: theme.typography.letterSpacing.normal,
    color: theme.colors.text.muted,
    textAlign: "center",
  },
});
