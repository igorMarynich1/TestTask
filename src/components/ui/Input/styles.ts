import { StyleSheet, TextStyle } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[4],
  },

  label: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: theme.typography.fontWeights.medium as TextStyle["fontWeight"],
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[2],
  },

  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: theme.sizes.inputHeight,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing[4],
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.primary,
  },

  inputFocused: {
    borderColor: theme.colors.primary[500],
    ...theme.shadows.sm,
  },

  inputError: {
    borderColor: theme.colors.error,
  },

  inputWithLeftIcon: {
    paddingLeft: theme.spacing[12],
  },

  inputWithRightIcon: {
    paddingRight: theme.spacing[12],
  },

  leftIcon: {
    position: "absolute",
    left: theme.spacing[3],
    zIndex: 1,
  },

  rightIcon: {
    position: "absolute",
    right: theme.spacing[3],
    zIndex: 1,
  },

  eyeIcon: {
    fontSize: theme.typography.fontSizes.xl,
  },

  errorText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.error,
    marginTop: theme.spacing[1],
  },

  hintText: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing[1],
  },
});
