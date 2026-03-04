import React, { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { Card } from "../../../components/ui";
import type { UserAccountData } from "../../../types";
import { styles } from "./styles";
import type { DynamicContentProps } from "./types";

const KNOWN_KEYS: (keyof UserAccountData)[] = [
  "name",
  "email",
  "id",
  "message",
  "instructions",
  "features",
  "links",
  "profile",
];

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </Card>
  );
}

export function DynamicContent({
  accountData,
  onLinkPress,
}: DynamicContentProps) {
  const otherData = useMemo(() => {
    const filtered: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(accountData)) {
      if (!KNOWN_KEYS.includes(key as keyof UserAccountData)) {
        filtered[key] = value;
      }
    }
    return Object.keys(filtered).length > 0 ? filtered : null;
  }, [accountData]);

  const hasMinimalData = Object.keys(accountData).length <= 3;

  return (
    <View style={styles.wrapper}>
      {accountData.message ? (
        <SectionCard icon="💬" title="Welcome Message">
          <Text style={styles.bodyText}>{accountData.message}</Text>
        </SectionCard>
      ) : null}

      {accountData.instructions ? (
        <SectionCard icon="📋" title="Getting Started">
          <Text style={styles.bodyText}>{accountData.instructions}</Text>
        </SectionCard>
      ) : null}

      {accountData.features ? (
        <SectionCard icon="✨" title="Available Features">
          <View style={styles.featuresGrid}>
            {accountData.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.featureBullet}>•</Text>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {accountData.links ? (
        <SectionCard icon="🔗" title="Quick Links">
          <View style={styles.linksContainer}>
            {Object.entries(accountData.links).map(([label, url]) => (
              <Pressable
                key={label}
                style={({ pressed }) => [
                  styles.linkItem,
                  pressed && { opacity: 0.7 },
                ]}
                onPress={() => onLinkPress(url)}
              >
                <Text style={styles.linkText}>{label}</Text>
                <Text style={styles.linkArrow}>→</Text>
              </Pressable>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {accountData.profile ? (
        <SectionCard icon="👤" title="Profile Information">
          <View style={styles.profileGrid}>
            {Object.entries(accountData.profile).map(([key, value]) => (
              <View key={key} style={styles.profileItem}>
                <Text style={styles.profileLabel}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Text>
                <Text style={styles.profileValue}>{String(value)}</Text>
              </View>
            ))}
          </View>
        </SectionCard>
      ) : null}

      {otherData ? (
        <SectionCard icon="📄" title="Additional Information">
          <View style={styles.jsonContainer}>
            <Text style={styles.jsonText}>
              {JSON.stringify(otherData, null, 2)}
            </Text>
          </View>
        </SectionCard>
      ) : null}

      {hasMinimalData ? (
        <SectionCard icon="🎉" title="Account Created Successfully!">
          <Text style={styles.bodyText}>
            Welcome to our platform! Your account has been created and you can
            now access all features.
          </Text>
        </SectionCard>
      ) : null}
    </View>
  );
}
