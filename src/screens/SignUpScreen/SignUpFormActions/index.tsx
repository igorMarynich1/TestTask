import React from "react";
import { View } from "react-native";
import { Button } from "../../../components/ui";
import { COPY } from "../constants";
import { LoginPrompt } from "../LoginPrompt";
import { styles } from "./styles";
import type { SignUpFormActionsProps } from "./types";

export function SignUpFormActions({
  onSubmit,
  isLoading,
  isFormComplete,
  onSignInPress,
}: SignUpFormActionsProps) {
  return (
    <View style={styles.bottomBlock}>
      <LoginPrompt onSignInPress={onSignInPress} />
      <Button
        title={COPY.buttonTitle}
        onPress={onSubmit}
        loading={isLoading}
        disabled={isLoading || !isFormComplete}
        fullWidth={true}
        size="lg"
        style={styles.signUpButton}
      />
    </View>
  );
}
