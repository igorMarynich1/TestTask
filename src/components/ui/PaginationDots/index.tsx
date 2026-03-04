import React from "react";
import { View } from "react-native";
import { PaginationDotsProps } from "./types";
import { styles } from "./styles";

export type { PaginationDotsProps } from "./types";

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  count,
  activeIndex,
  style,
}) => (
  <View style={[styles.pagination, style]}>
    {Array.from({ length: count }).map((_, index) => {
      const isActive = index === activeIndex;
      return (
        <View
          key={index}
          style={[styles.dot, isActive ? styles.dotActive : styles.dotInactive]}
        />
      );
    })}
  </View>
);
