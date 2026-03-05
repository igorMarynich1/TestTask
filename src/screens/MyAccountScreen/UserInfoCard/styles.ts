import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: theme.spacing[6],
    paddingBottom: theme.spacing[5],
  },
  avatarBox: {
    width: 72,
    height: 72,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface.avatarDark,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing[3],
    ...theme.shadows.md,
  },
  userName: {
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text.primary,
  },
});
