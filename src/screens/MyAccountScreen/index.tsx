import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, RefreshControl, Alert, Linking } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { UserAccountData } from "../../types";
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
  const route = useRoute<MyAccountScreenRouteProp>();
  const navigation = useNavigation<MyAccountScreenNavigationProp>();
  const [accountData, setAccountData] = useState<UserAccountData>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (route.params?.userData) {
      setAccountData(route.params.userData);
    }
  }, [route.params]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  }, []);

  const handleLinkPress = useCallback((url: string) => {
    Linking.openURL(url).catch(() => {});
  }, []);

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

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
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
      <UserInfoCard accountData={accountData} />
      <DynamicContent accountData={accountData} onLinkPress={handleLinkPress} />
      <AccountActions onLogout={handleLogout} />
    </ScrollView>
  );
};

export default MyAccountScreen;
