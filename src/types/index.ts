export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

/** Response from POST /signup */
export interface SignUpResponse {
  message: string;
  nextStep: string;
  basicAuthCredentials: {
    username: string;
    password: string;
  };
}

/** Transaction item from GET /interview/account */
export interface Transaction {
  name: string;
  bank: string;
  time: string;
  amount: number;
}

/** Account data from GET /interview/account */
export interface AccountData {
  accountType: string;
  accountNumber: string;
  availableBalance: number;
  currency: string;
  dateAdded: string;
  transactions: Transaction[];
}

/** Combined user data passed to MyAccount screen */
export interface UserAccountData {
  name: string;
  email: string;
  account: AccountData;
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