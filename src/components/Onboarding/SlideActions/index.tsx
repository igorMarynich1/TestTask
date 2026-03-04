import React from "react";
import { View } from "react-native";
import { Button } from "../../ui";
import { SlideActionsProps } from "./types";
import { styles } from "./styles";

export type { SlideActionsProps } from "./types";

export const SlideActions: React.FC<SlideActionsProps> = ({
  isLastSlide,
  onPress,
}) => (
  <View style={styles.navigationButtons}>
    <Button
      title={isLastSlide ? "Finish" : "Next"}
      onPress={onPress}
      variant="primary"
      size="lg"
      fullWidth
      style={styles.nextButton}
      textStyle={styles.nextButtonText}
    />
  </View>
);
