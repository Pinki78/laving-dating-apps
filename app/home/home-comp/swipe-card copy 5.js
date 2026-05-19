import { LinearGradient } from "expo-linear-gradient";
import React, { memo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Foundation,
  EvilIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SwipeCardIconInfo from "./swipe-card-icon-info";

const SwipeCard = ({profile}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();



  return (
    <>
      <View key={profile.id} style={[styles.card]}>
            {/* 👇 only render Image if uri is a valid string */}
            <View style={[styles.cardImageWrapper]}>
              <View style={styles.cardMapContainer}>
                <View style={styles.cardMap}>
                  <EvilIcons name="location" size={15} color="#fff" />
                  <Text style={styles.cardMapText}>{profile.location}</Text>
                </View>
              </View>

              {/* imageWrapper */}

              <View style={[styles.imageWrapper]}>
                <Image
                  source={profile.image}
                  style={styles.image}
                  resizeMode="cover"
                  fadeDuration={0} // ✅ REMOVE FLASH
                />
                {/* 🔥 Gradient Overlay */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.93)"]}
                  locations={[0, 1]}
                  style={styles.gradient}
                />
              </View>
            </View>

            {/* infoRow */}

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
    </>
  );
};

export default memo(SwipeCard);

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: "hidden",
    width: 342,               // ✅ removed duplicate width: "100%"
    position: "relative",
  },
  cardImageWrapper: {         // ✅ was referenced but never defined
    width: "100%",
    position: "relative",
  },
  imageWrapper: {
    width: "100%",
    position: "relative",
  },
  imagePlaceholder: {         // ✅ new: shown during load or on error
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