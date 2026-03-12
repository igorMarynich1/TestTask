import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    marginBottom: theme.spacing[8],
  },
  title: {
    fontSize: theme.typography.fontSizes.h1,
    fontWeight: theme.typography.fontWeights.bold,
    lineHeight: 40,
    color: theme.colors.primary.brand,
    marginBottom: theme.spacing[2],
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.medium,
    lineHeight: 24,
    color: theme.colors.text.muted,
  },
});
