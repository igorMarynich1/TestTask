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
    width: theme.pagination.dotSize,
    borderRadius: theme.borderRadius.full,
  },
});
