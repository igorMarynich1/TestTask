export interface AcceptTermsProps {
  checked: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  onLinkPress: (url: string) => void;
  errorMessage?: string;
}
