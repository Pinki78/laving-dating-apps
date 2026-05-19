import { useRef, useCallback } from "react";
import { View, Dimensions } from "react-native";

import Carousel from "react-native-reanimated-carousel";
import SwipeCard from "./swipe-card";
import Animated, {
  Extrapolation,
  interpolate,
  useSharedValue,
  runOnJS,
} from "react-native-reanimated";

const window = Dimensions.get("window");

export default function TinderCard({ data, onSwipe }) {
  const carouselRef = useRef(null);
const currentIndex = useRef(0);
  const PAGE_WIDTH = window.width;
  const PAGE_HEIGHT = window.height - PAGE_WIDTH;

  const directionAnimVal = useSharedValue(0);
  const lastTranslation = useSharedValue({ x: 0, y: 0 });

  // 🎯 Animation
  const animationStyle = useCallback((value) => {
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
  }, []);
const isSwiping = useSharedValue(false);
const prevIndex = useRef(0);
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
      ref={carouselRef}
        loop={false}
        width={PAGE_WIDTH}
        height={PAGE_HEIGHT}
        data={data}
        defaultIndex={0}
          pagingEnabled={true}   // ✅ force snap per page
  snapEnabled={true}
  overscrollEnabled={false}
  // maxScrollDistancePerSwipe={PAGE_WIDTH} // 🔥 prevent multi-skip


        // 🔥 BLOCK RIGHT SWIPE HERE
       onConfigurePanGesture={(g) => {
  g.onBegin(() => {
    "worklet";
    isSwiping.value = false;
  });

  g.onChange((e) => {
    "worklet";

    const isHorizontal = Math.abs(e.translationX) > Math.abs(e.translationY);

    // 🚨 BLOCK VERTICAL SWIPE COMPLETELY
    if (!isHorizontal) {
      return;
    }

    // ❌ block right swipe
    if (e.translationX > 0) {
      return;
    }

    // 🚨 prevent multiple triggers
    if (isSwiping.value) return;

    directionAnimVal.value = -1;

    lastTranslation.value = {
      x: e.translationX,
      y: e.translationY,
    };

    // 🔥 threshold
    if (Math.abs(e.translationX) > 50) {
      isSwiping.value = true;
    }
  });
}}

        // ✅ ONLY HANDLE LEFT SWIPE
     onSnapToItem={(index) => {
  const { x, y } = lastTranslation.value;

  let direction;

  if (Math.abs(x) > Math.abs(y)) {
    direction = x > 0 ? "right" : "left";
  } else {
    direction = y < 0 ? "up" : "down";
  }

  const movedItems = index - prevIndex.current;

  console.log("Direction:", direction);
  console.log("Previous Index:", prevIndex.current);
  console.log("Current Index:", index);
  console.log("Items moved:", movedItems);

  // 🚨 RIGHT SWIPE → STAY SAME CARD
if (direction === "right" || direction === "left") {
  setTimeout(() => {
    carouselRef.current?.scrollTo({
      index: prevIndex.current,
      animated: false,
    });
  }, 0);

  return; // ❌ STOP movement
}

  // ✅ LEFT swipe → update index
  prevIndex.current = index;

  runOnJS(onSwipe)?.(direction, index);
}}
        renderItem={({ item }) => <SwipeCard profile={item} />}
        customAnimation={animationStyle}
        windowSize={5}
      />
    </View>
  );
}