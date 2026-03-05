export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

/** Account data returned from signup / account API. */
export interface UserAccountData {
  id?: string;
  name?: string;
  email?: string;
  message?: string;
  instructions?: string;
  recentTransactions?: string[];
  features?: string[];
  links?: Record<string, string>;
  profile?: Record<string, string>;
  createdAt?: string;
  lastLogin?: string;
}

export interface ApiResponse<T = UserAccountData> {
  success: boolean;
  message?: string;
  data?: T;
}

/** Slide item for onboarding carousel. */
export interface OnboardingSlide {
  title: string;
  description: string;
}