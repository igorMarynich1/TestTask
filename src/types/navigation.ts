import type { UserAccountData } from './index';

/**
 * Root stack navigator param list.
 * Used for type-safe navigation across the app.
 */
export type RootStackParamList = {
  Onboarding: undefined;
  SignUp: undefined;
  MyAccount: { userData: UserAccountData };
};

