import type { SignUpSchema } from "../../utils/validation";

type TextFieldName = keyof Pick<
  SignUpSchema,
  "name" | "email" | "password" | "confirmPassword"
>;

export interface SignUpTextFieldConfig {
  name: TextFieldName;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;
  keyboardType?: "email-address" | "default";
  autoCapitalize?: "none" | "words";
}

export const signUpTextFieldsConfig: SignUpTextFieldConfig[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter Name",
    autoCapitalize: "words",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email address",
    keyboardType: "email-address",
    autoCapitalize: "none",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Password",
    secureTextEntry: true,
    showPasswordToggle: true,
    autoCapitalize: "none",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm password",
    secureTextEntry: true,
    showPasswordToggle: true,
    autoCapitalize: "none",
  },
];
