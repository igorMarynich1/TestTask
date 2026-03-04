import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: theme.pagination.gap,
    ...theme.pagination.marginVertical,
  },
  dot: {
    borderRadius: theme.borderRadius.full,
  },
  dotInactive: {
    width: theme.pagination.dotSize,
    height: theme.pagination.dotSize,
    backgroundColor: theme.colors.pagination.inactive,
  },
  dotActive: {
    width: theme.pagination.dotSize,
    height: theme.pagination.dotActiveHeight,
    backgroundColor: theme.colors.pagination.active,
  },
});
