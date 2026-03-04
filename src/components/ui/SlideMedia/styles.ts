import { StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.spacing[6],
  },
  heroImage: {
    width: "100%",
    maxHeight: "100%",
  },
  heroIcon: {
    fontSize: theme.sizes.heroIcon,
  },
});
