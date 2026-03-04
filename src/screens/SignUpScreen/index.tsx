import React, { useCallback, useEffect, useMemo } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, type SignUpSchema } from "../../utils/validation";
import { DEFAULT_FORM_VALUES } from "./constants";
import { useSignUpSubmit } from "./useSignUpSubmit";
import { SignUpForm } from "./SignUpForm";
import { styles } from "./styles";

const SignUpScreen: React.FC = () => {
  const { onSignUp, openLink, isLoading } = useSignUpSubmit();

  const { control, handleSubmit, watch, trigger } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const name = watch("name");
  const email = watch("email");
  const acceptTerms = watch("acceptTerms");

  const isFormComplete = useMemo(
    () =>
      Boolean(name?.trim()) &&
      Boolean(email?.trim()) &&
      Boolean(password) &&
      Boolean(confirmPassword) &&
      acceptTerms === true,
    [name, email, password, confirmPassword, acceptTerms],
  );

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  const onSubmit = useCallback(
    () => handleSubmit(onSignUp)(),
    [handleSubmit, onSignUp],
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <SignUpForm
          control={control}
          isLoading={isLoading}
          isFormComplete={isFormComplete}
          onSubmit={onSubmit}
          onLinkPress={openLink}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
