import React from "react";
import Svg, { Path } from "react-native-svg";
import { UserAvatarIconProps } from "./types";
import { DEFAULT_SIZE, DEFAULT_COLOR } from "./constants";

export type { UserAvatarIconProps } from "./types";

const VIEW_BOX = "0 0 18 20";
const PATH_D =
  "M13.3081 20L5.54194 10.9391L9.78287 20H6.84295L2.51689 10.7625L4.31542 20H2.50891L0.709039 10.749V20H0V0H0.709039V9.97775L2.53418 0H4.33538L2.50225 10.0209L6.91213 0H9.82012L5.42754 9.98449L13.4039 0H17.9614L9.71103 10.3297L18 20H13.3081Z";

export const UserAvatarIcon: React.FC<UserAvatarIconProps> = ({
  size = DEFAULT_SIZE,
  color = DEFAULT_COLOR,
}) => {
  const height = size * (20 / 18);
  return (
    <Svg width={size} height={height} viewBox={VIEW_BOX} fill="none">
      <Path d={PATH_D} fill={color} />
    </Svg>
  );
};
