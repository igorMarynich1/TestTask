import React from "react";
import { View } from "react-native";
import { theme } from "../../../styles/theme";
import { CardProps } from "./types";
import { styles } from "./styles";

export type { CardProps } from "./types";

export const Card: React.FC<CardProps> = ({
  children,
  style,
  padding = 4,
  shadow = "base",
}) => {
  const cardStyles = [
    styles.card,
    { padding: theme.spacing[padding] },
    theme.shadows[shadow],
    style,
  ];

  return <View style={cardStyles}>{children}</View>;
};
