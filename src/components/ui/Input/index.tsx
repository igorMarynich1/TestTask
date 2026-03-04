import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../../styles/theme";
import { InputProps } from "./types";
import { styles } from "./styles";

export type { InputProps } from "./types";

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerStyle,
  showPasswordToggle = false,
  secureTextEntry,
  style,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const handleToggleSecure = () => {
    setIsSecure(!isSecure);
  };

  const inputStyles = [
    styles.input,
    isFocused ? styles.inputFocused : undefined,
    error ? styles.inputError : undefined,
    leftIcon ? styles.inputWithLeftIcon : undefined,
    rightIcon || showPasswordToggle ? styles.inputWithRightIcon : undefined,
    style,
  ].filter(Boolean);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}

        <TextInput
          {...props}
          style={inputStyles}
          secureTextEntry={isSecure}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.text.tertiary}
        />

        {showPasswordToggle && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={handleToggleSecure}
          >
            <Text style={styles.eyeIcon}>{isSecure ? "👁️‍🗨️" : "👁️"}</Text>
          </TouchableOpacity>
        )}

        {rightIcon && !showPasswordToggle && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {hint && !error && <Text style={styles.hintText}>{hint}</Text>}
    </View>
  );
};
