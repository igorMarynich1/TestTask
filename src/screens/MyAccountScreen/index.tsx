import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, RefreshControl, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { fetchAccountData } from "../../utils/api";
import { theme } from "../../styles/theme";
import { AccountHeader } from "./AccountHeader";
import { UserInfoCard } from "./UserInfoCard";
import { DynamicContent } from "./DynamicContent";
import { AccountActions } from "./AccountActions";
import { styles } from "./styles";
import type {
  MyAccountScreenRouteProp,
  MyAccountScreenNavigationProp,
} from "./types";

const MyAccountScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const route = useRoute<MyAccountScreenRouteProp>();
  const navigation = useNavigation<MyAccountScreenNavigationProp>();
  const userData = route.params?.userData;

  const [accountData, setAccountData] = useState(userData?.account);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (!userData) {
      navigation.reset({ index: 0, routes: [{ name: "SignUp" }] });
    }
  }, [userData, navigation]);

  const credentials = userData?.credentials;

  const handleRefresh = useCallback(async () => {
    if (!credentials) return;
    setIsRefreshing(true);
    try {
      const freshData = await fetchAccountData(
        credentials.username,
        credentials.password,
      );
      setAccountData(freshData);
    } catch (error) {
      if (__DEV__) {
        console.error("Refresh error:", error);
      }
      Alert.alert("Refresh Failed", "Could not refresh account data.");
    } finally {
      setIsRefreshing(false);
    }
  }, [credentials]);

  const handleLogout = useCallback(() => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () =>
          navigation.reset({ index: 0, routes: [{ name: "SignUp" }] }),
      },
    ]);
  }, [navigation]);

  if (!userData) {
    return null;
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + 16 },
      ]}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={theme.colors.primary[500]}
        />
      }
      showsVerticalScrollIndicator={false}
    >
      <AccountHeader />
      <UserInfoCard name={userData?.name} />
      <DynamicContent accountData={accountData} />
      <AccountActions onLogout={handleLogout} />
    </ScrollView>
  );
};

export default MyAccountScreen;
