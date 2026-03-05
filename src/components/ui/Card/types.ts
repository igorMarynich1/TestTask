import type { StyleProp, ViewStyle } from "react-native";
import { theme } from "../../../styles/theme";

export interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: keyof typeof theme.spacing;
  shadow?: "sm" | "base" | "md" | "lg";
}
