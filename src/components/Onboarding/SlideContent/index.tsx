import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { PaginationDots } from "../../ui";
import { SlideContentProps } from "./types";
import { styles } from "./styles";

const FADE_DURATION = 280;
const SLIDE_OFFSET = 12;

export type { SlideContentProps } from "./types";

export const SlideContent: React.FC<SlideContentProps> = ({
  title,
  description,
  dotsCount,
  activeIndex,
}) => {
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    opacity.setValue(0);
    translateY.setValue(SLIDE_OFFSET);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [title, description, opacity, translateY]);

  return (
    <View>
      <Animated.View
        style={[
          styles.textContent,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </Animated.View>
      <PaginationDots count={dotsCount} activeIndex={activeIndex} />
    </View>
  );
};
