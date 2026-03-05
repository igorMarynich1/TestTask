import React, { useEffect, useState, useRef, useCallback } from "react";
import { Animated, PanResponder } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { markOnboardingSeen } from "../../utils/storage";
import { OnboardingScreenNavigationProp } from "./types";
import { getContainerStyle } from "./styles";
import { onboardingData } from "./data";
import { SlideMedia } from "../../components/ui";
import {
  SkipHeader,
  BottomCard,
  SlideContent,
  SlideActions,
} from "../../components/Onboarding";

const SWIPE_THRESHOLD = 50;

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const completeOnboarding = useCallback(() => {
    markOnboardingSeen().catch(() => {});
    navigation.replace("SignUp");
  }, [navigation]);

  const goToNext = useCallback(() => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      completeOnboarding();
    }
  }, [currentIndex, completeOnboarding]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  const swipeLeftRef = useRef(goToNext);
  const swipeRightRef = useRef(goToPrev);
  swipeLeftRef.current = goToNext;
  swipeRightRef.current = goToPrev;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dx) > 10,
      onPanResponderRelease: (_, gs) => {
        if (gs.dx < -SWIPE_THRESHOLD) {
          swipeLeftRef.current();
        } else if (gs.dx > SWIPE_THRESHOLD) {
          swipeRightRef.current();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      style={getContainerStyle(fadeAnim)}
      {...panResponder.panHandlers}
    >
      <SkipHeader insets={insets} onPress={completeOnboarding} />

      {/* eslint-disable-next-line @typescript-eslint/no-require-imports -- static assets in RN use require() */}
      <SlideMedia image={require("../../assets/img/Onboarding.png")} />

      <BottomCard insets={insets}>
        <SlideContent
          title={onboardingData[currentIndex].title}
          description={onboardingData[currentIndex].description}
          dotsCount={onboardingData.length}
          activeIndex={currentIndex}
        />
        <SlideActions
          isLastSlide={currentIndex === onboardingData.length - 1}
          onPress={goToNext}
        />
      </BottomCard>
    </Animated.View>
  );
};

export default OnboardingScreen;
