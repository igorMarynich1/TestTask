import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing[6],
    marginTop: theme.spacing[6],
    marginBottom: theme.spacing[4],
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: theme.sizes.avatar,
    height: theme.sizes.avatar,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.primary[500],
    justifyContent: "center",
    alignItems: "center",
    marginRight: theme.spacing[4],
    ...theme.shadows.md,
  },
  avatarText: {
    color: theme.colors.text.inverse,
    fontSize: theme.typography.fontSizes["3xl"],
    fontWeight: theme.typography.fontWeights.bold,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: theme.typography.fontSizes["2xl"],
    fontWeight: theme.typography.fontWeights.bold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing[1],
  },
  userEmail: {
    fontSize: theme.typography.fontSizes.base,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[2],
  },
  userIdContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userIdLabel: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    fontWeight: theme.typography.fontWeights.medium,
    marginRight: theme.spacing[2],
  },
  userId: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.text.tertiary,
    fontFamily: "monospace",
  },
});
