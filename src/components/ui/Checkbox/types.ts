import { StyleProp, ViewStyle } from "react-native";

export interface CheckboxProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  /** Optional label or content to the right of the checkbox */
  children?: React.ReactNode;
}
