import React from "react";
import { View, Text, Pressable } from "react-native";
import { COPY } from "../constants";
import { styles } from "./styles";
import type { LoginPromptProps } from "./types";

export function LoginPrompt({ onSignInPress }: LoginPromptProps) {
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginText}>{COPY.loginPrompt}</Text>
      <Pressable onPress={onSignInPress}>
        <Text style={styles.linkText}>{COPY.loginLink}</Text>
      </Pressable>
    </View>
  );
}
