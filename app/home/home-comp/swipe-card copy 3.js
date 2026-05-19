import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState, memo } from "react";        // ✅ memo moved here, removed unused Pressable
import { EvilIcons } from "@expo/vector-icons";
// ✅ removed unused: useNavigation, useSelector
import SwipeCardIconInfo from "./swipe-card-icon-info";

const SwipeCard = memo(({ profile }) => {

  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const imageSource =
    typeof profile.image === "string"
      ? { uri: profile.image }
      : profile.image;

  return (
    <View style={styles.card}>

      <View style={styles.cardImageWrapper}>
        <View style={styles.cardMapContainer}>
          <View style={styles.cardMap}>
            <EvilIcons name="location" size={15} color="#fff" />
            <Text style={styles.cardMapText}>{profile.location}</Text>
          </View>
        </View>

        <View style={styles.imageWrapper}>

          {imageLoading && !imageError && (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator size="large" color="#ccc" />
            </View>
          )}

          {imageError && (
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: "#aaa" }}>No Image</Text>
            </View>
          )}

          <Image
            source={imageSource}
            style={[styles.image, imageError && { opacity: 0 }]}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.93)"]}
            locations={[0, 1]}
            style={styles.gradient}
          />
        </View>
      </View>

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

// ✅ Fixed: was missing ), causing memo to not wrap correctly
// ✅ Added custom comparison — only re-renders if profile.id changes
}, (prevProps, nextProps) => prevProps.profile.id === nextProps.profile.id);

export default SwipeCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    width: 342,
    position: "relative",
  },
  cardImageWrapper: {
    width: "100%",
    position: "relative",
  },
  imageWrapper: {
    width: "100%",
    position: "relative",
  },
  imagePlaceholder: {
    width: "100%",
    height: 450,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
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
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  image: { width: "100%", height: 450 },
});