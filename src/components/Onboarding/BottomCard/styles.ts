import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  bottomCardWrap: {
    width: "100%",
    paddingHorizontal: theme.spacing[5],
  },
  bottomCard: {
    width: "100%",
    marginBottom: 0,
    borderRadius: theme.borderRadius["3xl"],
    backgroundColor: theme.colors.background.primary,
    paddingTop: theme.layout.cardPaddingVertical,
    paddingRight: theme.layout.cardPaddingHorizontal,
    paddingLeft: theme.layout.cardPaddingHorizontal,
    borderWidth: 0,
    ...theme.shadows.card,
  },
});

export const getBottomCardWrapStyle = (insets: { bottom: number }) => [
  styles.bottomCardWrap,
  { paddingBottom: insets.bottom },
];

export const getBottomCardStyle = (insets: { bottom: number }) => [
  styles.bottomCard,
  { paddingBottom: insets.bottom },
];
