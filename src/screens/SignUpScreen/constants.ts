import type { SignUpSchema } from "../../utils/validation";

export const DEFAULT_FORM_VALUES: SignUpSchema = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export const URLS = {
  terms: "https://example.com/terms",
  signIn: "https://example.com",
} as const;

export const COPY = {
  title: "Create account",
  subtitle: "Complete the sign up to get started",
  buttonTitle: "Create Account",
  loginPrompt: "Already have an account? ",
  loginLink: "Sign In",
  termsPrefix: "By signing up, you agree to the ",
  termsLink: "Terms of Service and Privacy Policy",
} as const;
