import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View, Image, ActivityIndicator, Animated } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import SwipeCardIconInfo from "./swipe-card-icon-info";
import { useState, memo, useMemo, useRef } from "react";
import { useEffect } from "react";
// Module-level URI cache — persists for entire app session
const loadedUriCache = new Set();

const SwipeCard = memo(({ profile }) => {
  const uri = typeof profile.image === "string" ? profile.image : null;

useEffect(() => {
  const mountTime = Date.now();
  console.log("🟢 NEW CARD MOUNT:", profile?.id, mountTime);

  return () => {
    console.log("🔴 OLD CARD UNMOUNT:", profile?.id, Date.now());
  };
}, []);



  const imageSource = useMemo(
    () => (uri ? { uri } : profile.image),
    [profile.image]
  );

  // Because TinderSwiper passes key={profile.id} to this component,
  // React fully unmounts + remounts SwipeCard every time the profile changes.
  // That means imageOpacity is always initialized fresh — no stale old-face flicker.
  const isCached = uri ? loadedUriCache.has(uri) : false;

  const imageOpacity = useRef(new Animated.Value(isCached ? 1 : 0)).current;
  const [imageError, setImageError] = useState(false);
  const [showSpinner, setShowSpinner] = useState(!isCached);

  const handleLoad = () => {
     console.log("✅ IMAGE LOADED:", profile.id);
    if (uri) loadedUriCache.add(uri);
    setShowSpinner(false);
    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleError = () => {
      console.log("❌ IMAGE ERROR:", profile.id);
    setShowSpinner(false);
    setImageError(true);
    imageOpacity.setValue(0);
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardImageWrapper}>

        {/* Location pill */}
        <View style={styles.cardMapContainer}>
          <View style={styles.cardMap}>
            <EvilIcons name="location" size={15} color="#fff" />
            <Text style={styles.cardMapText}>{profile.location}</Text>
          </View>
        </View>

        <View style={styles.imageWrapper}>

          {/* Dark background — always rendered underneath, visible when image is hidden */}
          <View style={styles.imagePlaceholder}>
            {showSpinner && !imageError && (
              <ActivityIndicator size="large" color="#ccc" />
            )}
            {imageError && (
              <Text style={{ color: "#aaa" }}>No Image</Text>
            )}
          </View>

          {/* Image fades in on top of dark background */}
          <Animated.Image
            key={profile.id}
            source={imageSource}
            style={[styles.image, { opacity: imageOpacity }]}
            resizeMode="cover"
            onLoad={handleLoad}
            onError={handleError}
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.93)"]}
            locations={[0, 1]}
            style={styles.gradient}
          />
        </View>
      </View>

      {/* Name + info row */}
      <View style={styles.infoRow}>
        <View style={styles.infoLeft}>
          <Text style={styles.nameTitle}>
            {profile.title}, {profile.age}
          </Text>
          <Text style={styles.profession}>{profile.profesional}</Text>
        </View>
        <SwipeCardIconInfo profile={profile} />
      </View>
    </View>
  );
});

export default SwipeCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  cardImageWrapper: {
    flex: 1,
    position: "relative",
  },
  imageWrapper: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a1a",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  cardMapContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    gap: 8,
    zIndex: 9,
  },
  cardMap: {
    backgroundColor: "#000000a1",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardMapText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Urbanist_600SemiBold",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  infoLeft: {
    flex: 1,
  },
  nameTitle: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 15,
  },
  profession: {
    fontWeight: "600",
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 11,
    color: "#9b9b9b",
  },
});