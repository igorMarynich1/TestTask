import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

const INPUT_HEIGHT = 48;
const BORDER_RADIUS = 10;
const LABEL_TOP_PADDING = 8;
const LABEL_FONT_SIZE = 12;
const INPUT_TOP_GAP = 8;

export const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing[4],
  },

  inputWrapper: {
    position: "relative",
    minHeight: INPUT_HEIGHT,
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: BORDER_RADIUS,
    backgroundColor: theme.colors.background.primary,
  },

  inputWrapperFocused: {
    borderWidth: 1,
    borderColor: "#BBBBBB",
  },

  inputWrapperError: {
    borderColor: theme.colors.error,
  },

  inner: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: INPUT_HEIGHT,
    paddingHorizontal: theme.spacing[4],
    paddingTop: LABEL_TOP_PADDING + LABEL_FONT_SIZE + INPUT_TOP_GAP,
    paddingBottom: theme.spacing[2],
  },

  innerWithLeftIcon: {
    paddingLeft: theme.spacing[10],
  },

  innerWithRightIcon: {
    paddingRight: theme.spacing[10],
  },

  labelPlaceholder: {
    position: "absolute",
    left: theme.spacing[4],
    right: theme.spacing[4],
    top: 0,
    bottom: 0,
    justifyContent: "center",
    paddingTop: 0,
  },

  labelFloating: {
    position: "absolute",
    left: theme.spacing[4],
    top: LABEL_TOP_PADDING,
  },

  labelText: {
    fontSize: LABEL_FONT_SIZE,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text.tertiary,
  },

  input: {
    flex: 1,
    padding: 0,
    margin: 0,
    fontSize: theme.typography.fontSizes.base,
    fontWeight: theme.typography.fontWeights.medium,
    color: theme.colors.text.primary,
    minHeight: 20,
  },

  leftIcon: {
    position: "absolute",
    left: theme.spacing[3],
    top: 0,
    bottom: 0,
    zIndex: 1,
    justifyContent: "center",
  },

  rightIcon: {
    position: "absolute",
    right: theme.spacing[3],
    top: 0,
    bottom: 0,
    zIndex: 1,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
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
