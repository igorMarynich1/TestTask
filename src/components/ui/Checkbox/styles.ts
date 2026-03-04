import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const SIZE = 16;
const BORDER_WIDTH = 1;
const BORDER_RADIUS = 4;
const LABEL_VERTICAL_ALIGN = -3;

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    maxWidth: "100%",
  },
  box: {
    width: SIZE,
    height: SIZE,
    borderRadius: BORDER_RADIUS,
    borderWidth: BORDER_WIDTH,
    justifyContent: "center",
    alignItems: "center",
  },
  boxUnchecked: {
    backgroundColor: theme.colors.background.primary,
    borderColor: theme.colors.border.medium,
  },
  boxChecked: {
    backgroundColor: theme.colors.primary.brand,
    borderColor: theme.colors.primary.brand,
  },
  boxDisabled: {
    opacity: 0.6,
  },
  checkmark: {
    color: theme.colors.text.inverse,
    fontSize: 10,
    fontWeight: theme.typography.fontWeights.bold,
  },
  label: {
    flex: 1,
    minWidth: 0,
    flexShrink: 1,
    marginLeft: theme.spacing[3],
    marginTop: LABEL_VERTICAL_ALIGN,
  },
});
