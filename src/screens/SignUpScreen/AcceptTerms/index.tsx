import React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "../../../components/ui";
import { COPY, URLS } from "../constants";
import { styles } from "./styles";
import type { AcceptTermsProps } from "./types";

export function AcceptTerms({
  checked,
  onValueChange,
  disabled,
  onLinkPress,
  errorMessage,
}: AcceptTermsProps) {
  return (
    <View style={styles.termsRow}>
      <Checkbox
        checked={checked}
        onValueChange={onValueChange}
        disabled={disabled}
        style={styles.termsCheckbox}
      >
        <Text style={styles.termsLabel}>
          {COPY.termsPrefix}
          <Text
            style={styles.termsLink}
            onPress={() => !disabled && onLinkPress(URLS.terms)}
          >
            {COPY.termsLink}
          </Text>
        </Text>
      </Checkbox>
      {errorMessage ? (
        <Text style={styles.termsError}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}
