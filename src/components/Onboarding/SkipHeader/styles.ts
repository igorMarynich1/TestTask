import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  skipHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 10,
    paddingTop: theme.spacing[2],
    paddingRight: theme.spacing[4],
  },
});

export const getSkipHeaderStyle = (insets: { top: number }) => [
  styles.skipHeader,
  { paddingTop: insets.top + theme.spacing[2] },
];
