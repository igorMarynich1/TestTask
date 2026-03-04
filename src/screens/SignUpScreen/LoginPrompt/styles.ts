import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
  },
  linkText: {
    color: theme.colors.primary[600],
    fontWeight: theme.typography.fontWeights.medium,
  },
});
