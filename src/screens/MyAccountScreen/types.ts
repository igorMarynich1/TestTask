import type { RouteProp } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../types/navigation";

export type MyAccountScreenRouteProp = RouteProp<
  RootStackParamList,
  "MyAccount"
>;

export type MyAccountScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyAccount"
>;
