import { StyleSheet, Animated } from "react-native";
import { theme } from "../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    paddingTop: theme.layout.screenPaddingTop,
  },
});

export const getContainerStyle = (fadeAnim: Animated.Value) => [
  styles.container,
  { opacity: fadeAnim },
];
