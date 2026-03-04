import React from "react";
import { View, Text } from "react-native";
import { Button } from "../../../components/ui";
import { styles } from "./styles";
import type { AccountHeaderProps } from "./types";

export function AccountHeader({ onLogout }: AccountHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Account</Text>
      <Button
        title="Logout"
        onPress={onLogout}
        variant="ghost"
        size="sm"
      />
    </View>
  );
}
