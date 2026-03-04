import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import type { FormHeaderProps } from "./types";

export function FormHeader({ title, subtitle }: FormHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
