import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { theme } from "../../../styles/theme";
import { PaginationDotsProps } from "./types";
import { styles } from "./styles";

export type { PaginationDotsProps } from "./types";

function AnimatedDot({ isActive }: { isActive: boolean }) {
  const height = useRef(
    new Animated.Value(
      isActive ? theme.pagination.dotActiveHeight : theme.pagination.dotSize,
    ),
  ).current;
  const colorProgress = useRef(
    new Animated.Value(isActive ? 1 : 0),
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: isActive
          ? theme.pagination.dotActiveHeight
          : theme.pagination.dotSize,
        duration: theme.animation.normal,
        useNativeDriver: false,
      }),
      Animated.timing(colorProgress, {
        toValue: isActive ? 1 : 0,
        duration: theme.animation.normal,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isActive, height, colorProgress]);

  const backgroundColor = colorProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      theme.colors.pagination.inactive,
      theme.colors.pagination.active,
    ],
  });

  return (
    <Animated.View style={[styles.dot, { height, backgroundColor }]} />
  );
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  count,
  activeIndex,
  style,
}) => (
  <View style={[styles.pagination, style]}>
    {Array.from({ length: count }).map((_, index) => (
      <AnimatedDot key={index} isActive={index === activeIndex} />
    ))}
  </View>
);
