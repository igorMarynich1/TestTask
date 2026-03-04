import React from "react";
import { View } from "react-native";
import { Button } from "../../ui";
import { SkipHeaderProps } from "./types";
import { getSkipHeaderStyle } from "./styles";

export type { SkipHeaderProps } from "./types";

export const SkipHeader: React.FC<SkipHeaderProps> = ({ insets, onPress }) => (
  <View style={getSkipHeaderStyle(insets)}>
    <Button title="Skip" onPress={onPress} variant="secondary" size="sm" />
  </View>
);
