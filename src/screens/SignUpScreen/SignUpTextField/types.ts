import type { Control } from "react-hook-form";
import type { SignUpSchema } from "../../../utils/validation";
import type { SignUpTextFieldConfig } from "../formFieldsConfig";

export interface SignUpTextFieldProps {
  control: Control<SignUpSchema>;
  fieldConfig: SignUpTextFieldConfig;
  isLoading: boolean;
}
