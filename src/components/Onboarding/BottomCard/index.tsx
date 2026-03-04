import React from "react";
import { View } from "react-native";
import { Card } from "../../ui";
import { BottomCardProps } from "./types";
import { getBottomCardWrapStyle, getBottomCardStyle } from "./styles";

export type { BottomCardProps } from "./types";

export const BottomCard: React.FC<BottomCardProps> = ({ insets, children }) => (
  <View style={getBottomCardWrapStyle(insets)}>
    <Card style={getBottomCardStyle(insets)}>{children}</Card>
  </View>
);
