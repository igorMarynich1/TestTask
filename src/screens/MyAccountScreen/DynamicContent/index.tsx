import React, { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import type { Transaction } from "../../../types";
import { theme } from "../../../styles/theme";
import { styles } from "./styles";
import type { DynamicContentProps } from "./types";

const SLIDE_OFFSET = 12;
const PAGE_SIZE = 4;

function formatCurrency(amount: number, currency: string): string {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString("en-NG");
  const prefix = amount >= 0 ? "+" : "-";
  const symbol = currency === "NGN" ? "N" : currency;
  return `${prefix}${symbol}${formatted}`;
}

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
      <Text
        style={[styles.infoValue, valueColor ? { color: valueColor } : undefined]}
      >
        {value}
      </Text>
    </View>
  );
}

function TransactionItem({
  transaction,
  currency,
}: {
  transaction: Transaction;
  currency: string;
}) {
  const isPositive = transaction.amount >= 0;
  const formattedAmount = formatCurrency(transaction.amount, currency);

  return (
    <View style={styles.listItem}>
      <View style={styles.listAvatar}>
        <Text style={styles.listAvatarText}>
          {transaction.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <View style={styles.listItemBody}>
        <Text style={styles.listItemTitle}>{transaction.name}</Text>
        <Text style={styles.listItemSub}>
          {transaction.bank} {transaction.time}
        </Text>
      </View>
      <Text
        style={[
          styles.listItemAmount,
          isPositive && styles.listItemAmountPositive,
          !isPositive && styles.listItemAmountNegative,
        ]}
      >
        {formattedAmount}
      </Text>
    </View>
  );
}

export function DynamicContent({ accountData }: DynamicContentProps) {
  const profileRows = useMemo(() => {
    if (!accountData) return [];
    const balanceStr = formatCurrency(
      accountData.availableBalance,
      accountData.currency,
    );
    const balanceColor =
      accountData.availableBalance >= 0
        ? theme.colors.success
        : theme.colors.error;

    return [
      { label: "Type of account", value: accountData.accountType },
      { label: "Account No", value: accountData.accountNumber },
      {
        label: "Available Balance",
        value: balanceStr,
        valueColor: balanceColor,
      },
      { label: "Date added", value: accountData.dateAdded },
    ];
  }, [accountData]);

  const transactions = accountData?.transactions;
  const hasTransactions = Boolean(transactions && transactions.length > 0);
  const totalPages = hasTransactions
    ? Math.ceil(transactions!.length / PAGE_SIZE)
    : 0;
  const canCycle = totalPages > 1;

  const [page, setPage] = useState(0);

  const cyclePage = useCallback(() => {
    if (!canCycle) return;
    setPage((prev) => (prev + 1) % totalPages);
  }, [canCycle, totalPages]);

  const visibleTransactions = useMemo(() => {
    if (!transactions || transactions.length === 0) return [];
    const start = page * PAGE_SIZE;
    return transactions.slice(start, start + PAGE_SIZE);
  }, [page, transactions]);

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

  if (!accountData) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
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
            {visibleTransactions.map((transaction, index) => (
              <TransactionItem
                key={`${transaction.name}-${index}`}
                transaction={transaction}
                currency={accountData.currency}
              />
            ))}
          </Animated.View>
        </View>
      ) : null}
    </View>
  );
}
