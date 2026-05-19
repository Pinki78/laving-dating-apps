import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { useSelector, shallowEqual } from "react-redux";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");


// ✅ CARD COMPONENT (prevents flicker)
const CardItem = React.memo(({ item }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      
      {/* IMAGE */}
      <Image
        source={
          typeof item.image === "string"
            ? { uri: item.image, cache: "force-cache" }
            : item.image
        }
        style={styles.image}
        resizeMode="cover"
      />

      {/* 🔥 GRADIENT */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.gradient}
      />

      {/* 🔥 BLUR */}
      <BlurView intensity={40} style={styles.blur} />

      {/* TEXT */}
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nameTitle}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>

    </Animated.View>
  );
});


const TinderSwiper = () => {
  const swiperRef = useRef(null);

  const { profilesStateData, loading } = useSelector(
    (state) => state.ProfilesDataReducerStore,
    shallowEqual
  );

  // 👉 Loading
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  // 👉 Empty
  if (!profilesStateData || profilesStateData.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No profiles found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SwiperFlatList
        ref={swiperRef}
        data={profilesStateData}
        renderItem={({ item }) => <CardItem item={item} />}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }

        showPagination={false}
        horizontal

        // 🔥 Performance (no flicker)
        removeClippedSubviews={false}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
    </View>
  );
};

export default TinderSwiper;


// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // CARD
  card: {
    width: width,
    height: height * 0.75,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  // GRADIENT
  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
  },

  // BLUR
  blur: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 120,
  },

  // TEXT
  cardContent: {
    position: "absolute",
    bottom: 25,
    left: 20,
  },

  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },

  location: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
});