import React, { useState, useCallback, useMemo } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { theme } from "../../../styles/theme";
import { InputProps } from "./types";
import { styles } from "./styles";
import { ShowIcon, HideIcon } from "../../icons";

export type { InputProps } from "./types";

const isActive = (value: string | undefined, focused: boolean) =>
  Boolean(value?.trim()) || focused;

const InputComponent: React.FC<InputProps> = ({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  containerStyle,
  showPasswordToggle = false,
  showHint = true,
  secureTextEntry,
  placeholder,
  value,
  onFocus,
  onBlur,
  style,
  ...props
}) => {
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  const active = isActive(value, isFocused);
  const showFloatingLabel = active && label;
  const showPlaceholderOnly = !active;

  const handleFocus = useCallback(
    (e: Parameters<NonNullable<InputProps["onFocus"]>>[0]) => {
      setIsFocused(true);
      onFocus?.(e);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (e: Parameters<NonNullable<InputProps["onBlur"]>>[0]) => {
      setIsFocused(false);
      onBlur?.(e);
    },
    [onBlur]
  );

  const handleToggleSecure = useCallback(() => {
    setIsSecure((prev) => !prev);
  }, []);

  const wrapperStyle = useMemo(
    () => [
      styles.inputWrapper,
      isFocused && styles.inputWrapperFocused,
      error && styles.inputWrapperError,
    ],
    [isFocused, error]
  );

  const innerStyle = useMemo(
    () => [
      styles.inner,
      leftIcon ? styles.innerWithLeftIcon : undefined,
      (rightIcon ?? showPasswordToggle) ? styles.innerWithRightIcon : undefined,
    ],
    [leftIcon, rightIcon, showPasswordToggle]
  );

  const passwordPlaceholder = active || label ? "" : placeholder;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={wrapperStyle}>
        {leftIcon ? <View style={styles.leftIcon}>{leftIcon}</View> : null}

        <View style={innerStyle}>
          {showPlaceholderOnly && label ? (
            <View style={styles.labelPlaceholder} pointerEvents="none">
              <Text style={styles.labelText} numberOfLines={1}>
                {placeholder ?? label}
              </Text>
            </View>
          ) : null}

          {showFloatingLabel ? (
            <View style={styles.labelFloating} pointerEvents="none">
              <Text style={styles.labelText} numberOfLines={1}>
                {label}
              </Text>
            </View>
          ) : null}

          <TextInput
            {...props}
            value={value}
            placeholder={passwordPlaceholder}
            placeholderTextColor={theme.colors.text.tertiary}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={isSecure}
            style={[styles.input, style]}
          />
        </View>

        {showPasswordToggle ? (
          <Pressable
            style={({ pressed }) => [
              styles.rightIcon,
              pressed && { opacity: 0.7 },
            ]}
            onPress={handleToggleSecure}
          >
            {isSecure ? <ShowIcon size={20} /> : <HideIcon size={20} />}
          </Pressable>
        ) : rightIcon ? (
          <View style={styles.rightIcon}>{rightIcon}</View>
        ) : null}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {hint && !error && showHint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
};

export const Input = React.memo(InputComponent);
