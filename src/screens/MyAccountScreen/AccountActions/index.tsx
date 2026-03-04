import React from "react";
import { View } from "react-native";
import { Button } from "../../../components/ui";
import { styles } from "./styles";
import type { AccountActionsProps } from "./types";

export function AccountActions({
  onEditProfile,
  onSettings,
}: AccountActionsProps) {
  return (
    <View style={styles.container}>
      <Button
        title="Edit Profile"
        onPress={onEditProfile}
        variant="outline"
        fullWidth
        style={styles.button}
      />
      <Button
        title="Settings"
        onPress={onSettings}
        variant="secondary"
        fullWidth
        style={styles.button}
      />
    </View>
  );
}
