import React, { useEffect, useState, useRef } from "react";
import { Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

  const goToNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Animated.View style={getContainerStyle(fadeAnim)}>
      <SkipHeader insets={insets} onPress={handleGetStarted} />

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
