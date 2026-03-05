import React from "react";
import { View } from "react-native";
import { Button } from "../../../components/ui";
import { styles } from "./styles";
import type { AccountActionsProps } from "./types";

export function AccountActions({ onLogout }: AccountActionsProps) {
  return (
    <View style={styles.container}>
      <Button
        title="Logout"
        onPress={onLogout}
        variant="ghost"
        fullWidth
      />
    </View>
  );
}
