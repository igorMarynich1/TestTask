import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import type { UserAccountData } from "../../../types";
import { theme } from "../../../styles/theme";
import { styles } from "./styles";
import type { DynamicContentProps } from "./types";

type ListSection = "features" | "links";

const SLIDE_OFFSET = 12;

const KNOWN_KEYS: (keyof UserAccountData)[] = [
  "name",
  "email",
  "id",
  "message",
  "instructions",
  "features",
  "links",
  "profile",
  "createdAt",
  "lastLogin",
];

function InfoRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, highlight && styles.infoValueHighlight]}>
        {value}
      </Text>
    </View>
  );
}

export function DynamicContent({
  accountData,
  onLinkPress,
}: DynamicContentProps) {
  const hasFeatures =
    accountData.features && accountData.features.length > 0;
  const hasLinks =
    accountData.links && Object.keys(accountData.links).length > 0;
  const showListCard = hasFeatures || hasLinks;
  const canSwitch = hasFeatures && hasLinks;

  const [activeSection, setActiveSection] = useState<ListSection>("features");

  const effectiveSection: ListSection = canSwitch
    ? activeSection
    : hasFeatures
      ? "features"
      : "links";

  const cycleSection = useCallback(() => {
    if (!canSwitch) return;
    setActiveSection((prev) => (prev === "features" ? "links" : "features"));
  }, [canSwitch]);

  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentTranslateY = useRef(new Animated.Value(0)).current;
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!showListCard) return;
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    contentOpacity.setValue(0);
    contentTranslateY.setValue(SLIDE_OFFSET);
    Animated.parallel([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: theme.animation.normal,
        useNativeDriver: true,
      }),
      Animated.timing(contentTranslateY, {
        toValue: 0,
        duration: theme.animation.normal,
        useNativeDriver: true,
      }),
    ]).start();
  }, [effectiveSection, showListCard, contentOpacity, contentTranslateY]);

  const profileRows = useMemo(() => {
    const rows: { label: string; value: string; highlight?: boolean }[] = [];

    if (accountData.profile) {
      const entries = Object.entries(accountData.profile).sort(
        ([a], [b]) => (a === "Member Since" ? 1 : b === "Member Since" ? -1 : 0)
      );
      for (const [key, value] of entries) {
        rows.push({
          label: key,
          value: String(value),
          highlight: value === "Active" || value === "Verified",
        });
      }
    }

    return rows;
  }, [accountData]);

  const otherData = useMemo(() => {
    const filtered: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(accountData)) {
      if (!KNOWN_KEYS.includes(key as keyof UserAccountData)) {
        filtered[key] = value;
      }
    }
    return Object.keys(filtered).length > 0 ? filtered : null;
  }, [accountData]);

  return (
    <View style={styles.wrapper}>
      {profileRows.length > 0 ? (
        <View style={styles.infoCard}>
          {profileRows.map((row) => (
            <InfoRow
              key={row.label}
              label={row.label}
              value={row.value}
              highlight={row.highlight}
            />
          ))}
        </View>
      ) : null}

      {showListCard ? (
        <View style={styles.listCard}>
          <Pressable
            onPress={cycleSection}
            style={styles.listHeader}
            disabled={!canSwitch}
          >
            <Text style={styles.listTitle}>
              {effectiveSection === "features"
                ? "Available Features"
                : "Quick Links"}
            </Text>
            {canSwitch ? (
              <View style={styles.listChevronCircle}>
                <Text style={styles.listChevron}>›</Text>
              </View>
            ) : (
              <View style={styles.listChevronPlaceholder} />
            )}
          </Pressable>
          <Animated.View
            style={[
              styles.listCardContent,
              {
                opacity: contentOpacity,
                transform: [{ translateY: contentTranslateY }],
              },
            ]}
          >
            {effectiveSection === "features" && hasFeatures ? (
              accountData.features!.map((feature, index) => (
                <View key={index} style={styles.listItem}>
                  <View style={styles.listAvatar}>
                    <Text style={styles.listAvatarText}>
                      {feature.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.listItemBody}>
                    <Text style={styles.listItemTitle}>{feature}</Text>
                  </View>
                </View>
              ))
            ) : null}
            {effectiveSection === "links" && hasLinks
              ? Object.entries(accountData.links!).map(([label, url]) => (
                  <Pressable
                    key={label}
                    style={({ pressed }) => [
                      styles.listItem,
                      pressed && styles.listItemPressed,
                    ]}
                    onPress={() => onLinkPress(url)}
                  >
                    <View style={styles.listAvatar}>
                      <Text style={styles.listAvatarText}>
                        {label.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View style={styles.listItemBody}>
                      <Text style={styles.listItemTitle}>{label}</Text>
                      <Text style={styles.listItemSub} numberOfLines={1}>
                        {url}
                      </Text>
                    </View>
                  </Pressable>
                ))
              : null}
          </Animated.View>
        </View>
      ) : null}

      {otherData ? (
        <View style={styles.infoCard}>
          {Object.entries(otherData).map(([key, value]) => (
            <InfoRow
              key={key}
              label={key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
              value={String(value)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
