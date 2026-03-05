import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import type { UserAccountData } from "../../../types";
import { theme } from "../../../styles/theme";
import { styles } from "./styles";
import type { DynamicContentProps } from "./types";

const SLIDE_OFFSET = 12;

const KNOWN_KEYS: (keyof UserAccountData)[] = [
  "name",
  "email",
  "id",
  "message",
  "instructions",
  "recentTransactions",
  "links",
  "profile",
  "createdAt",
  "lastLogin",
];

function InfoRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor ? { color: valueColor } : undefined]}>
        {value}
      </Text>
    </View>
  );
}

function formatUnknownValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "-";
  }
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

const PAGE_SIZE = 4;

export function DynamicContent({
  accountData,
}: DynamicContentProps) {
  const hasTransactions =
    accountData.recentTransactions && accountData.recentTransactions.length > 0;

  const totalPages = hasTransactions
    ? Math.ceil(accountData.recentTransactions!.length / PAGE_SIZE)
    : 0;
  const canCycle = totalPages > 1;

  const [page, setPage] = useState(0);

  const cyclePage = useCallback(() => {
    if (!canCycle) return;
    setPage((prev) => (prev + 1) % totalPages);
  }, [canCycle, totalPages]);

  const visibleTransactions = useMemo(() => {
    if (!hasTransactions) return [];
    const start = page * PAGE_SIZE;
    return accountData.recentTransactions!.slice(start, start + PAGE_SIZE);
  }, [page, hasTransactions, accountData.recentTransactions]);

  const contentOpacity = useRef(new Animated.Value(1)).current;
  const contentTranslateY = useRef(new Animated.Value(0)).current;
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (!hasTransactions) return;
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
  }, [page, hasTransactions, contentOpacity, contentTranslateY]);

  const profileRows = useMemo(() => {
    const rows: { label: string; value: string; valueColor?: string }[] = [];

    if (accountData.profile) {
      for (const [key, value] of Object.entries(accountData.profile)) {
        let valueColor: string | undefined;

        if (key === "Available Balance") {
          const numericStr = String(value).replace(/[^0-9.-]/g, "");
          const num = parseFloat(numericStr);
          valueColor = num < 0 ? theme.colors.error : theme.colors.success;
        }

        rows.push({ label: key, value: String(value), valueColor });
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
              valueColor={row.valueColor}
            />
          ))}
        </View>
      ) : null}

      {hasTransactions ? (
        <View style={styles.listCard}>
          <Pressable
            onPress={cyclePage}
            style={styles.listHeader}
            disabled={!canCycle}
          >
            <Text style={styles.listTitle}>Recent Transactions</Text>
            {canCycle ? (
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
            {visibleTransactions.map((transaction, index) => {
              const parts = transaction.split(" · ");
              const title = parts[0];
              const subtitle = parts.length > 2 ? parts[1] : undefined;
              const amount = parts.length > 2 ? parts[2] : parts[1];
              const isPositive = amount?.startsWith("+");
              const isNegative = amount?.startsWith("-");

              return (
                <View key={index} style={styles.listItem}>
                  <View style={styles.listAvatar}>
                    <Text style={styles.listAvatarText}>
                      {title.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.listItemBody}>
                    <Text style={styles.listItemTitle}>{title}</Text>
                    {subtitle ? (
                      <Text style={styles.listItemSub}>{subtitle}</Text>
                    ) : null}
                  </View>
                  {amount ? (
                    <Text style={[
                      styles.listItemAmount,
                      isPositive && styles.listItemAmountPositive,
                      isNegative && styles.listItemAmountNegative,
                    ]}>
                      {amount}
                    </Text>
                  ) : null}
                </View>
              );
            })}
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
              value={formatUnknownValue(value)}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}
