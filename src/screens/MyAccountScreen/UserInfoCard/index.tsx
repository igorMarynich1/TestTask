import React from "react";
import { View, Text } from "react-native";
import { Card } from "../../../components/ui";
import { styles } from "./styles";
import type { UserInfoCardProps } from "./types";

export function UserInfoCard({ accountData }: UserInfoCardProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(accountData.name || "U").charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.userDetails}>
          <Text style={styles.userName}>
            {accountData.name || "User"}
          </Text>
          <Text style={styles.userEmail}>
            {accountData.email || "No email provided"}
          </Text>
          {accountData.id ? (
            <View style={styles.userIdContainer}>
              <Text style={styles.userIdLabel}>ID:</Text>
              <Text style={styles.userId}>{accountData.id}</Text>
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
