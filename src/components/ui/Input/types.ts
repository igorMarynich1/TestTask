import { TextInputProps, ViewStyle } from "react-native";

export interface InputProps extends TextInputProps {
  /** Floating label (e.g. "Name", "Password"). Shown above value when active. */
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  /** Show password visibility toggle using Show icon. Use with secureTextEntry. */
  showPasswordToggle?: boolean;
  /** When false, hint text is not rendered. Use e.g. with fieldState.isTouched to show hint only after interaction. */
  showHint?: boolean;
}
