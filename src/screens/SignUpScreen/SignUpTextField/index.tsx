import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "../../../components/ui";
import type { SignUpTextFieldProps } from "./types";

export function SignUpTextField({
  control,
  fieldConfig,
  isLoading,
}: SignUpTextFieldProps) {
  return (
    <Controller
      control={control}
      name={fieldConfig.name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Input
          label={fieldConfig.label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          placeholder={fieldConfig.placeholder}
          keyboardType={fieldConfig.keyboardType}
          secureTextEntry={fieldConfig.secureTextEntry}
          showPasswordToggle={fieldConfig.showPasswordToggle}
          autoCapitalize={fieldConfig.autoCapitalize ?? "none"}
          autoCorrect={false}
          editable={!isLoading}
          error={error?.message}
        />
      )}
    />
  );
}
