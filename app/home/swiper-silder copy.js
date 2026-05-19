import {useCallback,  useRef}from "react";
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

  const carouselRef = useRef(null);
const currentIndex = useRef(0);
const isSwiping = useSharedValue(false);
const prevIndex = useRef(0);
const isAutoScrolling = useRef(false);

  const headerHeight = 0;
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
    
const swipeDirection = useSharedValue(null);
// const movedItems = index - prevIndex.current;
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

onSnapToItem={(index) => {
  if (isAutoScrolling.current) {
    isAutoScrolling.current = false;
    prevIndex.current = index;
    return;
  }

  const prev = prevIndex.current;

  if (index === prev) return;

  const direction = index > prev ? "right" : "left";

  console.log("Direction:", direction);
  console.log("Previous Index:", prev);
  console.log("Current Index:", index);

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