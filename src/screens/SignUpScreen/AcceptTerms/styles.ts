import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const TERMS_ERROR_LEFT_INSET = theme.spacing[6] + theme.spacing[3];

export const styles = StyleSheet.create({
  termsRow: {
    marginTop: theme.spacing[4],
    marginBottom: theme.spacing[2],
    width: "100%",
  },
  termsCheckbox: {
    marginBottom: 0,
    width: "100%",
  },
  termsLabel: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 14,
    fontWeight: theme.typography.fontWeights.medium,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.text.secondary,
  },
  termsLink: {
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeights.medium,
  },
  termsError: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.error,
    marginTop: theme.spacing[1],
    marginLeft: TERMS_ERROR_LEFT_INSET,
  },
});
