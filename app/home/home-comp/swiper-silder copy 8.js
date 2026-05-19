import React , { useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { useSelector, shallowEqual } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const TinderSwiper = () => {
  const swiperRef = useRef(null);
const currentIndex = useRef(0);
  const { profilesStateData, loading } = useSelector(
    (state) => state.ProfilesDataReducerStore,
    shallowEqual
  );

  // ✅ Preload ONLY remote images
  useEffect(() => {
    if (profilesStateData?.length) {
      profilesStateData.forEach((item) => {
        if (typeof item.image === "string") {
          Image.prefetch(item.image);
        }
      });
    }
  }, [profilesStateData]);

  // 🔥 Swipe tracking
  const swipeX = useRef(new Animated.Value(0)).current;

  // 🔥 Scale animation (SAFE)
  const scale = swipeX.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.96, 1, 0.96],
    extrapolate: "clamp",
  });

  // 🔥 Fake blur (opacity overlay)
  const overlayOpacity = swipeX.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [0.4, 0, 0.4],
    extrapolate: "clamp",
  });

  // ✅ CARD RENDER
  // ✅ CARD COMPONENT (memo outside logic)
  const Card = React.memo(({ card }) => {
    if (!card) return <View />;

    return (
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        {/* IMAGE */}
        <Image
          source={
            typeof card.image === "string"
              ? { uri: card.image }
              : card.image
          }
          style={styles.image}
          resizeMode="cover"
        />

        {/* 🔥 FAKE BLUR (NO FLICKER) */}
        <Animated.View
          style={[
            styles.blurFake,
            {
              opacity: overlayOpacity,
            },
          ]}
        />

        {/* GRADIENT */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradient}
        />

        {/* TEXT */}
        <View style={styles.cardContent}>
          <Text style={styles.name}>{card.nameTitle}</Text>
          <Text style={styles.location}>{card.location}</Text>
        </View>
      </Animated.View>
    );
  });

  // ✅ renderCard
  const renderCard = useCallback((card) => {
    return <Card card={card} />;
  }, []);

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
      {/* <Swiper
        ref={swiperRef}
        cards={profilesStateData}
        renderCard={renderCard} // ✅ FIXED (no hook inside JSX)
        cardIndex={0}

        // 🔥 TRACK SWIPE
        onSwiping={(x) => swipeX.setValue(x)}

        // ❤️ ACTIONS
        onSwipedLeft={(i) =>
          console.log("❌ Disliked:", profilesStateData[i])
        }
        onSwipedRight={(i) =>
          console.log("❤️ Liked:", profilesStateData[i])
        }

        onSwiped={() => {
  swipeX.setValue(0); // 🔥 reset animation (prevents flicker)
}}

        // 🔥 PERFORMANCE
        stackSize={2}
        stackSeparation={12}
        stackScale={5}
        disableTopSwipe
        disableBottomSwipe
        backgroundColor="transparent"

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
      /> */}

      <Swiper
        ref={swiperRef}
        cards={profilesStateData}
        renderCard={renderCard}
        cardIndex={0}

        onSwiping={(x) => swipeX.setValue(x)}
        onSwiped={() => swipeX.setValue(0)}

        onSwipedLeft={(i) =>
          console.log("❌ Disliked:", profilesStateData[i])
        }
        onSwipedRight={(i) =>
          console.log("❤️ Liked:", profilesStateData[i])
        }

        stackSize={1.1}
        stackSeparation={15}
        stackScale={10}

        disableTopSwipe
        disableBottomSwipe
        backgroundColor="transparent"

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
blurFake: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "#000",
},
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    height: 400,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  image: {
    width: "100%",
    height: 400,
  },

  blurFull: {
    ...StyleSheet.absoluteFillObject,
  },

  gradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "50%",
  },

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

  likeLabel: {
    color: "green",
    fontSize: 28,
    borderWidth: 3,
    borderColor: "green",
    padding: 10,
  },

  nopeLabel: {
    color: "red",
    fontSize: 28,
    borderWidth: 3,
    borderColor: "red",
    padding: 10,
  },
});