import React, { useCallback, useRef, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  type ViewToken,
  type ListRenderItemInfo,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { markOnboardingSeen } from "../../utils/storage";
import type { OnboardingScreenNavigationProp } from "./types";
import { styles } from "./styles";
import { onboardingData } from "./data";
import { SlideMedia } from "../../components/ui";
import {
  SkipHeader,
  BottomCard,
  SlideContent,
  SlideActions,
} from "../../components/Onboarding";
import type { OnboardingSlide } from "../../types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const getItemLayout = (_: unknown, index: number) => ({
  length: SCREEN_WIDTH,
  offset: SCREEN_WIDTH * index,
  index,
});

const keyExtractor = (_: OnboardingSlide, index: number) => index.toString();

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingSlide>>(null);

  const completeOnboarding = useCallback(() => {
    markOnboardingSeen().catch(() => {});
    navigation.replace("SignUp");
  }, [navigation]);

  const goToNext = useCallback(() => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  }, [currentIndex, completeOnboarding]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken<OnboardingSlide>[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<OnboardingSlide>) => (
      <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
        <SlideMedia icon={item.icon} />
        <BottomCard insets={insets}>
          <SlideContent
            title={item.title}
            description={item.description}
            dotsCount={onboardingData.length}
            activeIndex={currentIndex}
          />
          <SlideActions
            isLastSlide={index === onboardingData.length - 1}
            onPress={goToNext}
          />
        </BottomCard>
      </View>
    ),
    [insets, currentIndex, goToNext],
  );

  return (
    <View style={styles.container}>
      <SkipHeader insets={insets} onPress={completeOnboarding} />
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

export default OnboardingScreen;
