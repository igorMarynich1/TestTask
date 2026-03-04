import type { Control } from "react-hook-form";
import type { SignUpSchema } from "../../../utils/validation";

export interface SignUpFormProps {
  control: Control<SignUpSchema>;
  isLoading: boolean;
  isFormComplete: boolean;
  onSubmit: () => void;
  onLinkPress: (url: string) => void;
}
