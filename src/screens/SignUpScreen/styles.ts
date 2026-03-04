import { StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

const STATUS_BAR_OFFSET = 72;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing[6],
    paddingTop: theme.spacing[16] + STATUS_BAR_OFFSET,
    paddingBottom: theme.spacing[8],
    justifyContent: "space-between",
  },
});
