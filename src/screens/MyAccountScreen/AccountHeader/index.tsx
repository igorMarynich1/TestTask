import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import type { AccountHeaderProps } from "./types";

const DEFAULT_TITLE = "My Account";

export function AccountHeader({ title = DEFAULT_TITLE }: AccountHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.placeholder} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}
