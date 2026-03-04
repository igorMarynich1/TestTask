import React from "react";
import { View } from "react-native";
import { Controller } from "react-hook-form";
import { signUpTextFieldsConfig } from "../formFieldsConfig";
import { COPY, URLS } from "../constants";
import { FormHeader } from "../FormHeader";
import { SignUpTextField } from "../SignUpTextField";
import { AcceptTerms } from "../AcceptTerms";
import { SignUpFormActions } from "../SignUpFormActions";
import { styles } from "./styles";
import type { SignUpFormProps } from "./types";

export function SignUpForm({
  control,
  isLoading,
  isFormComplete,
  onSubmit,
  onLinkPress,
}: SignUpFormProps) {
  return (
    <>
      <FormHeader title={COPY.title} subtitle={COPY.subtitle} />

      <View style={styles.form}>
        {signUpTextFieldsConfig.map((field) => (
          <SignUpTextField
            key={field.name}
            control={control}
            fieldConfig={field}
            isLoading={isLoading}
          />
        ))}

        <Controller
          control={control}
          name="acceptTerms"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <AcceptTerms
              checked={value}
              onValueChange={onChange}
              disabled={isLoading}
              onLinkPress={onLinkPress}
              errorMessage={error?.message}
            />
          )}
        />
      </View>

      <SignUpFormActions
        onSubmit={onSubmit}
        isLoading={isLoading}
        isFormComplete={isFormComplete}
        onSignInPress={() => onLinkPress(URLS.signIn)}
      />
    </>
  );
}
