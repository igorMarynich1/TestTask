import { useState } from "react";
import { Alert, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { SignUpSchema } from "../../utils/validation";
import type { ApiResponse } from "../../types";
import { signUpUser } from "../../utils/api";
import type { SignUpScreenNavigationProp } from "./types";

export function useSignUpSubmit() {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const onSignUp = async (data: SignUpSchema) => {
    setIsLoading(true);
    try {
      const signUpData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const response: ApiResponse = await signUpUser(signUpData);
      if (__DEV__) {
        console.log("Backend response:", JSON.stringify(response, null, 2));
      }

      if (response.success && response.data) {
        navigation.reset({
          index: 0,
          routes: [{ name: "MyAccount", params: { userData: response.data } }],
        });
      } else {
        Alert.alert(
          "Sign Up Failed",
          response.message || "Please try again later.",
        );
      }
    } catch (error) {
      if (__DEV__) {
        console.error("Sign up error:", error);
      }
      Alert.alert(
        "Network Error",
        "Unable to connect to server. Please check your internet connection and try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => {
      if (__DEV__) {
        console.error("Failed to open URL:", err);
      }
    });
  };

  return { onSignUp, openLink, isLoading };
}
