import React from "react";
import { View, Image, Text } from "react-native";
import { SlideMediaProps } from "./types";
import { styles } from "./styles";

export type { SlideMediaProps } from "./types";

export const SlideMedia: React.FC<SlideMediaProps> = ({
  image,
  icon,
  style,
}) => (
  <View style={[styles.container, style]}>
    {image != null ? (
      <Image source={image} style={styles.heroImage} resizeMode="contain" />
    ) : icon ? (
      <Text style={styles.heroIcon}>{icon}</Text>
    ) : null}
  </View>
);
