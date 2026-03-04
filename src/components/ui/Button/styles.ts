import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.borderRadius.md,
    flexDirection: "row",
    ...theme.shadows.sm,
  },

  primary: {
    backgroundColor: theme.colors.primary.brand,
  },
  secondary: {
    backgroundColor: theme.colors.background.primary,
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.border.medium,
  },
  ghost: {
    backgroundColor: "transparent",
  },

  sm: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[2],
    ...theme.sizes.buttonSm,
    borderRadius: theme.borderRadius.lg,
  },
  md: {
    paddingHorizontal: theme.spacing[4],
    paddingVertical: theme.spacing[3],
    ...theme.sizes.buttonMd,
  },
  lg: {
    paddingHorizontal: theme.spacing[8],
    paddingVertical: theme.spacing[4],
    ...theme.sizes.buttonLg,
    borderRadius: theme.borderRadius.pill,
  },

  disabled: {
    backgroundColor: theme.colors.background.disabled,
  },
  fullWidth: {
    width: "100%",
  },

  baseText: {
    fontWeight: theme.typography.fontWeights.semibold,
    textAlign: "center",
  },

  primaryText: {
    color: theme.colors.text.inverse,
  },
  secondaryText: {
    color: theme.colors.text.onSecondary,
  },
  outlineText: {
    color: theme.colors.primary[600],
  },
  ghostText: {
    color: theme.colors.primary[600],
  },

  smText: {
    fontSize: theme.typography.fontSizes.sm,
    lineHeight: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium,
  },
  mdText: {
    fontSize: theme.typography.fontSizes.base,
  },
  lgText: {
    fontSize: theme.typography.fontSizes.lg,
  },
});
