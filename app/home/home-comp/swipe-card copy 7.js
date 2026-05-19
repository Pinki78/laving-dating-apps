import { LinearGradient } from "expo-linear-gradient";
import React, { memo, useState } from "react";
import {
    StyleSheet, Text, View,
    Image, ActivityIndicator,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SwipeCardIconInfo from "./swipe-card-icon-info";

import {  Dimensions} from "react-native";
import Animated, {
	Extrapolation,
	FadeInDown,
	interpolate,
	useSharedValue,
} from "react-native-reanimated";

const window = Dimensions.get("window");

const SwipeCard = ({ profile }) => {

	const width = window.width * 0.7;
	const height = window.height * 0.5;

    const navigation = useNavigation();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    if (!profile) return null;

    const imageSource =
        typeof profile.image === "string"
            ? { uri: profile.image }
            : profile.image;

    return (
        <Animated.View
			entering={FadeInDown.duration(300)}
			style={{ flex: 1, alignItems: "center",justifyContent: "center" }}
		>
        <View style={styles.card}>

            {/* ── Image area ── */}
            <View style={styles.imageWrapper}>

                {/* Location badge */}
                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <EvilIcons name="location" size={15} color="#fff" />
                        <Text style={styles.badgeText}>{profile.location}</Text>
                    </View>
                </View>

                {/* Loading spinner */}
                {imageLoading && !imageError && (
                    <View style={styles.imagePlaceholder}>
                        <ActivityIndicator size="large" color="#ccc" />
                    </View>
                )}

                {/* Error fallback */}
                {imageError && (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.errorText}>No Image</Text>
                    </View>
                )}

                <Image
                    source={imageSource}
                   style={[
    styles.image,
    { width, height }, // ✅ correct
    imageError && { opacity: 0 },
  ]}
                    resizeMode="cover"
                    fadeDuration={0}            // ✅ kills the built-in Android fade flash
                    onLoadStart={() => setImageLoading(true)}
                    onLoadEnd={() => setImageLoading(false)}
                    onError={() => {
                        setImageLoading(false);
                        setImageError(true);
                    }}
                    
                />
                {/* <Image
  source={imageSource}
  style={[
    styles.image,
    { width, height }, // ✅ correct
    imageError && { opacity: 0 },
  ]}
/> */}

                {/* Gradient — pointerEvents none so swipe gestures pass through */}
                <LinearGradient
                    colors={["transparent", "rgba(0,0,0,0.93)"]}
                    locations={[0.45, 1]}
                    style={styles.gradient}
                    pointerEvents="none"
                />
            </View>

            {/* ── Info row ── */}
            <View style={styles.infoRow}>
                <View style={styles.infoLeft}>
                    <Text style={styles.nameTitle} numberOfLines={1}>
                        {profile.title}, {profile.age}
                    </Text>
                    <Text style={styles.profession} numberOfLines={1}>
                        {profile.profesional}
                    </Text>
                </View>
                <SwipeCardIconInfo profile={profile} />
            </View>

        </View>
        </Animated.View>
    );
};

export default SwipeCard;

const styles = StyleSheet.create({
 card: {
  width: window.width * 0.9, // ✅ responsive
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: "#1a1a1a",
},
    imageWrapper: {
        width: "100%",
        position: "relative",
    },
    imagePlaceholder: {
        position: "absolute",
        width: "100%",
        height: 450,
        backgroundColor: "#1a1a1a",         // ✅ dark — no white flash
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    badgeContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 9,
        flexDirection: "row",
    },
    badge: {
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontFamily: "Urbanist_600SemiBold",
    },
 image: {
  width: "100%",
  height: window.height * 0.6, // ✅ same logic
},
    
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "55%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    infoRow: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        padding: 16,
        // ✅ removed backgroundColor — gradient handles darkening
    },
    infoLeft: {
        flex: 1,
        marginRight: 8,
    },
    nameTitle: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "Urbanist_600SemiBold",
    },
    profession: {
        fontSize: 11,
        fontFamily: "Urbanist_600SemiBold",
        color: "#9b9b9b",
        marginTop: 2,
    },
    errorText: {
        color: "#aaa",
        fontSize: 13,
    },
});