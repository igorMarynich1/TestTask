import type { UserAccountData } from "../../../types";

export interface DynamicContentProps {
  accountData: UserAccountData;
  onLinkPress: (url: string) => void;
}
