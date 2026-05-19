import * as React from "react";
import { View, Dimensions } from "react-native";

import Carousel from "react-native-reanimated-carousel";
import SwipeCard from "./swipe-card";
import Animated, {
  Extrapolation,
  interpolate,
  useSharedValue,
  runOnJS, // ✅ ADD THIS
} from "react-native-reanimated";
const window = Dimensions.get("window");

export default function TinderCard({ data, onSwipe }) {
  const headerHeight = 0;
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = window.height - PAGE_WIDTH;

  const directionAnimVal = useSharedValue(0);
  const lastTranslation = useSharedValue({ x: 0, y: 0 });

  // ✅ Only (value) — no index argument
  // ✅ Add 'index' as the second argument, even if unused
  const animationStyle = React.useCallback((value, index) => {
    "worklet";
    const translateY = interpolate(value, [0, 1], [0, -18]);
    const translateX =
      interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolation.CLAMP) *
      directionAnimVal.value;

    const rotateZ =
      interpolate(value, [-1, 0], [15, 0], Extrapolation.CLAMP) *
      directionAnimVal.value;

    const scale = interpolate(value, [0, 1], [1, 0.95]);
    const opacity = interpolate(value, [-1, -0.8, 0, 1], [0, 0.9, 1, 0.85]);

    return {
      transform: [
        { translateY },
        { translateX },
        { rotateZ: `${rotateZ}deg` },
        { scale },
      ],
      opacity,
      zIndex: Math.round(interpolate(value, [-1, 0, 1], [-10, 0, -10])),
    };
  }, [PAGE_WIDTH]);

  return (
    <View
      style={{
        width: PAGE_WIDTH,
        height: PAGE_HEIGHT,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Carousel
        loop={false}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={data}
        defaultIndex={0}
        onConfigurePanGesture={(g) => {
          g.onChange((e) => {
            "worklet";
            directionAnimVal.value = e.translationX > 0 ? 1 : -1;
            lastTranslation.value = { x: e.translationX, y: e.translationY };
          });
        }}
        onSnapToItem={(index) => {
          const { x, y } = lastTranslation.value;

          let direction = "right";

          if (Math.abs(x) > Math.abs(y)) {
            direction = x > 0 ? "right" : "left";
          } else {
            direction = y < 0 ? "up" : "down";
          }

          runOnJS(onSwipe)?.(direction, index); // ✅ send index also
        }}
        fixedDirection={undefined}
        renderItem={({ item }) => <SwipeCard profile={item} />}
        customAnimation={animationStyle}
        windowSize={5}
      />
    </View>
  );
}