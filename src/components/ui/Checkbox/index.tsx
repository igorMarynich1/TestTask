import React from "react";
import { View, Text, Pressable } from "react-native";
import { CheckboxProps } from "./types";
import { styles } from "./styles";

export type { CheckboxProps } from "./types";

const CHECKMARK = "✓";

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onValueChange,
  disabled = false,
  style,
  children,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        style,
        pressed && { opacity: 0.7 },
      ]}
      onPress={() => !disabled && onValueChange(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
    >
      <View
        style={[
          styles.box,
          checked ? styles.boxChecked : styles.boxUnchecked,
          disabled && styles.boxDisabled,
        ]}
      >
        {checked && <Text style={styles.checkmark}>{CHECKMARK}</Text>}
      </View>
      {children != null && <View style={styles.label}>{children}</View>}
    </Pressable>
  );
};
