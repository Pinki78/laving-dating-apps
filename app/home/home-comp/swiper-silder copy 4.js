import React, { useRef, useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import Swiper from "react-native-deck-swiper";
import SwipeCard from "./swipe-card";

const SwipeScreen = ({profiles}) => {
  const swiperRef = useRef(null);

  // ✅ Keep profiles in a stable ref — never reset mid-swipe
//   const [profiles] = useState([
//     {
//       id: "1",
//       image: require("../../../assets/image/profiles/girls/aaradhya.jpg"),
//       title: "Ayesha",
//       age: 24,
//       profesional: "UI Designer",
//       location: "Dhaka",
//     },
//     {
//       id: "2",
//       image: require("../../../assets/image/profiles/girls/chakrika.jpg"),
//       title: "Riya",
//       age: 22,
//       profesional: "Developer",
//       location: "Chittagong",
//     },
//     {
//       id: "3",
//       iimage: require("../../../assets/image/profiles/girls/bhakti.jpg"),
//       title: "Mim",
//       age: 26,
//       profesional: "Doctor",
//       location: "Sylhet",
//     },
//   ]);

  // ✅ Track index without causing Swiper to remount
  const [cardIndex, setCardIndex] = useState(0);
  const [swiped, setSwiped] = useState(false); // shows "no more cards" UI

  // ✅ useCallback prevents re-render of Swiper on parent state change
  const handleSwipedLeft = useCallback((index) => {
    console.log("Disliked:", profiles[index]?.title);
    // dispatch(dislikeProfile(profiles[index].id)); ← your Redux here
  }, [profiles]);

  const handleSwipedRight = useCallback((index) => {
    console.log("Liked:", profiles[index]?.title);
    // dispatch(likeProfile(profiles[index].id)); ← your Redux here
  }, [profiles]);

  const handleSwipedAll = useCallback(() => {
    setSwiped(true);
  }, []);

  const renderCard = useCallback((profile) => {
    if (!profile) return null; // ✅ prevents blank card render
    return <SwipeCard profile={profile} />;
  }, []);

  return (
    <View style={styles.container}>
      {!swiped ? (
        <Swiper
          ref={swiperRef}
          cards={profiles}
          cardIndex={cardIndex}          // ✅ stable — never reset mid-swipe
          renderCard={renderCard}
          onSwipedLeft={handleSwipedLeft}
          onSwipedRight={handleSwipedRight}
          onSwipedAll={handleSwipedAll}
          onSwipedAborted={() => {}}     // ✅ prevents ghost card on cancel

          // ✅ Stack config — fixes overlap & position bugs
          stackSize={2}                  // only render 2 cards deep
          stackSeparation={0}            // no vertical offset between cards
          stackScale={0}                 // no scale difference on stack

          // ✅ Disable unwanted swipe directions
          disableTopSwipe
          disableBottomSwipe

          // ✅ Animation tuning — prevents flicker
          animateCardOpacity
          animateOverlayLabelsOpacity
          useViewOverflow={false}        // ✅ critical on Android
          infinite={false}              // ✅ never loop back to card 1

          // ✅ Overlay labels (optional — good UX)
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "red",
                  color: "white",
                  fontSize: 24,
                  borderRadius: 8,
                  padding: 8,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  backgroundColor: "green",
                  color: "white",
                  fontSize: 24,
                  borderRadius: 8,
                  padding: 8,
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}

          backgroundColor="transparent"
          cardVerticalMargin={0}
          cardHorizontalMargin={0}

          outputRotationRange={["-10deg", "0deg", "10deg"]}
          inputRotationRange={[-80, 0, 80]}
        />
      ) : (
        <View style={styles.empty}>
          {/* Your "no more profiles" UI here */}
        </View>
      )}
    </View>
  );
};

export default SwipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f50",
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});