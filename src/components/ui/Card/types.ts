import { ViewStyle } from "react-native";
import { theme } from "../../../styles/theme";

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
  shadow?: "sm" | "base" | "md" | "lg";
}
