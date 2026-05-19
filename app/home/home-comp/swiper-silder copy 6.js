import React, { useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector, shallowEqual } from "react-redux";

const { width, height } = Dimensions.get("window");
import { BlurView } from "expo-blur";
// import { EffectCards } from 'swiper/modules';
import { Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const TinderSwiper = () => {
  const swiperRef = useRef(null);

  const { profilesStateData, loading } = useSelector(
    (state) => state.ProfilesDataReducerStore,
    shallowEqual
  );


const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 400,
    useNativeDriver: true,
  }).start();
}, [profilesStateData]);


  // ✅ FIX: define hook BEFORE any return
 const renderCard = useCallback((card) => {
  if (!card) return <View />;

  return (
    <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
      
      {/* ✅ IMAGE */}
      <Image
        source={
          typeof card.image === "string"
            ? { uri: card.image }
            : card.image
        }
        style={styles.image}
        resizeMode="cover"
      />

      {/* 🔥 GRADIENT OVERLAY (Tinder style) */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)"]}
        style={styles.gradient}
      />

      {/* 🔥 BLUR EFFECT (bottom only) */}
      <BlurView intensity={40} style={styles.blur} />

      {/* TEXT */}
      <View style={styles.cardContent}>
        <Text style={styles.name}>{card.nameTitle}</Text>
        <Text style={styles.location}>{card.location}</Text>
      </View>
    </Animated.View>
  );
}, []);

  // 👉 NOW conditions are safe
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }

  if (!profilesStateData || profilesStateData.length === 0) {
    return (
      <View style={styles.loader}>
        <Text>No profiles found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={profilesStateData}
        renderCard={renderCard}
        cardIndex={0}
        stackSize={1.1}
        stackSeparation={15}
        animateOverlayLabelsOpacity
        animateCardOpacity
        disableTopSwipe
        disableBottomSwipe
        cardVerticalMargin={0}
        cardHorizontalMargin={0}
        backgroundColor="transparent"
        removeClippedSubviews={false}

         effect={'cards'}
          grabCursor={true}
        // modules={[EffectCards]}

        onSwipedLeft={(index) =>
          console.log("❌ Disliked:", profilesStateData[index])
        }
        onSwipedRight={(index) =>
          console.log("❤️ Liked:", profilesStateData[index])
        }

        overlayLabels={{
          left: {
            title: "NOPE",
            style: { label: styles.nopeLabel },
          },
          right: {
            title: "LIKE",
            style: { label: styles.likeLabel },
          },
        }}
      />
    </View>
  );
};

export default TinderSwiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
gradient: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "50%",
},

blur: {
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: 100,
},
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // ✅ MAIN CARD
card: {
  position: "relative",
  height: height * 0.72,
  borderRadius: 20,
  overflow: "hidden",
  backgroundColor: "#000", // ✅ fixed
},
image: {
  width: "100%",
  height: "100%",   // 🔥 fill card
  borderRadius: 20,
},
  // ✅ DARK OVERLAY
  overlay: {
position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  },

  // ✅ TEXT CONTAINER
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

  // ✅ LABELS
  likeLabel: {
    color: "green",
    fontSize: 26,
    borderWidth: 2,
    borderColor: "green",
    padding: 10,
  },

  nopeLabel: {
    color: "red",
    fontSize: 26,
    borderWidth: 2,
    borderColor: "red",
    padding: 10,
  },
});