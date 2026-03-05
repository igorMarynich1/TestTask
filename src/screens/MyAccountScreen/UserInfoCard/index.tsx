import React from "react";
import { View, Text } from "react-native";
import { UserAvatarIcon } from "../../../components/icons";
import { styles } from "./styles";
import type { UserInfoCardProps } from "./types";

export function UserInfoCard({ accountData }: UserInfoCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarBox}>
        <UserAvatarIcon />
      </View>
      <Text style={styles.userName}>{accountData.name || "User"}</Text>
    </View>
  );
}
