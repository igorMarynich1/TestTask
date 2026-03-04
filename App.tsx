import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";

import type { RootStackParamList } from "./src/types/navigation";
import OnboardingScreen from "./src/screens/Onboarding";
import SignUpScreen from "./src/screens/SignUpScreen";
import MyAccountScreen from "./src/screens/MyAccountScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MyAccount" component={MyAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
