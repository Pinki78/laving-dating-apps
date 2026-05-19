import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import SwipeCard from "./swipe-card";

const { width: SW, height: SH } = Dimensions.get("window");
const THRESHOLD = 80;
const CARD_HEIGHT = SH * 0.68;

export default function TinderSwiper() {
  const { profilesStateData } = useSelector(
    (state) => state.ProfilesDataReducerStore
  );

  const [idx, setIdx] = useState(0);
 const pos = useRef(new Animated.ValueXY()).current;
const opacity = useRef(new Animated.Value(1)).current; // ✅ ADD HERE
const swiping = useRef(false);
  // Prefetch next images

useEffect(() => {
  opacity.setValue(1); // reset for new card
}, [idx]);



useEffect(() => {
  if (!profilesStateData) return;

  for (let i = 1; i <= 3; i++) {
    const img = profilesStateData[idx + i]?.image;
    if (typeof img === "string") {
      Image.prefetch(img).catch(() => {});
    }
  }
}, [idx, profilesStateData]);

  // ───── Swipe Out ─────
  const flyOut = (direction) => {
  if (swiping.current) return;
  swiping.current = true;

  console.log("👉 SWIPE START:", Date.now());
  const targets = {
    LEFT: { x: -SW * 1.4, y: 0 },
    RIGHT: { x: SW * 1.4, y: 0 },
    UP: { x: 0, y: -SH },
  };
  // 🔥 IMPORTANT: kill old card immediately
  Animated.timing(opacity, {
    toValue: 0,
    duration: 60,
    useNativeDriver: true,
  }).start();

  // show next card instantly
  setIdx((prev) => prev + 1);



  Animated.timing(pos, {
    toValue: targets[direction],
    duration: 100,
    useNativeDriver: true,
  }).start(() => {
    console.log("🏁 ANIMATION END:", Date.now());

    pos.setValue({ x: 0, y: 0 });
    opacity.setValue(1);
    swiping.current = false;
  });
};


  // ───── Snap Back ─────
  const snapBack = () => {
    Animated.spring(pos, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: true,
    }).start();
  };

  // ───── Gesture ─────
  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !swiping.current,

      onPanResponderMove: (_, { dx, dy }) => {
        pos.setValue({ x: dx * 0.9, y: dy * 0.6 });
      },

      onPanResponderRelease: (_, { dx, dy }) => {
        const absX = Math.abs(dx);
        const absY = Math.abs(dy);

        if (absX > absY) {
          if (dx > THRESHOLD) flyOut("RIGHT");
          else if (dx < -THRESHOLD) flyOut("LEFT");
          else snapBack();
        } else {
          if (dy < -THRESHOLD) flyOut("UP");
          else snapBack();
        }
      },
    })
  ).current;

  // ───── Animations ─────
  const rotate = pos.x.interpolate({
    inputRange: [-SW / 2, 0, SW / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  // const topOpacity = pos.x.interpolate({
  //   inputRange: [-SW / 2, 0, SW / 2],
  //   outputRange: [0, 1, 0],
  //   extrapolate: "clamp",
  // });

  const topOpacity = pos.x.interpolate({
  inputRange: [-SW, 0, SW],
  outputRange: [0.2, 1, 0.2], // 👈 smoother fade
  extrapolate: "clamp",
});

  const nextScale = pos.x.interpolate({
    inputRange: [-SW, 0, SW],
    outputRange: [1, 0.92, 1],
    extrapolate: "clamp",
  });

  const nextTranslateY = pos.x.interpolate({
    inputRange: [-SW, 0, SW],
    outputRange: [0, 15, 0],
    extrapolate: "clamp",
  });

  

  // ───── Guard ─────
  if (!profilesStateData || idx >= profilesStateData.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No more profiles</Text>
      </View>
    );
  }

console.log("🎯 RENDER idx:", idx);

  const current = profilesStateData[idx];
const next = profilesStateData[idx + 1];
console.log("CURRENT:", current?.id);
console.log("NEXT:", next?.id);

// useEffect(() => {
//   console.log("🟢 MOUNT card:", profile.id);

//   return () => {
//     console.log("🔴 UNMOUNT card:", profile.id);
//   };
// }, []);


  return (
    <View style={styles.root}>
      <View style={styles.stack}>

        {/* NEXT CARD */}
        {next && (
          <Animated.View
            key={next.id}
            style={[
              styles.cardWrap,
              {
                zIndex: 1,
                transform: [
                  { scale: nextScale },
                  { translateY: nextTranslateY },
                ],
              },
            ]}
          >
            <SwipeCard profile={next} />
          </Animated.View>
        )}

        {/* TOP CARD */}
        {current && (
          <Animated.View
            key={current.id}
            {...pan.panHandlers}
            style={[
              styles.cardWrap,
              {
                zIndex: 2,
                opacity: Animated.multiply(topOpacity, opacity),
                transform: [
                  { translateX: pos.x },
                  { translateY: pos.y },
                  { rotate },
                ],
              },
            ]}
          >
            <SwipeCard profile={current} />
          </Animated.View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => flyOut("LEFT")}>
          <Text style={styles.btnIconGray}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnPrimary} onPress={() => flyOut("RIGHT")}>
          <Text style={styles.btnIconWhite}>♥</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={() => flyOut("UP")}>
          <Text style={styles.btnIconGold}>★</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ───── Styles ─────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingTop: 12,
  },
  stack: {
    width: SW - 32,
    height: CARD_HEIGHT,
    position: "relative",
  },
  cardWrap: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
  buttons: {
    flexDirection: "row",
    gap: 24,
    marginTop: 20,
  },
  btnSecondary: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ff4d6d",
    alignItems: "center",
    justifyContent: "center",
  },
  btnIconGray: { fontSize: 22, color: "#888" },
  btnIconWhite: { fontSize: 30, color: "#fff" },
  btnIconGold: { fontSize: 22, color: "#FFD700" },
});