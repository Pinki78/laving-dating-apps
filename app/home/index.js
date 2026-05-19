import { useRef, useEffect, useCallback, forwardRef } from "react";

import { shallowEqual } from "react-redux"; // ✅ prevents unnecessary re-renders

import { View,  StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, } from 'react-native-safe-area-context'
import ActionButtons from "./home-comp/action-buttons";
import SwiperSilder from "./home-comp/swiper-silder";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { addLikedProfile , addDislikedProfile } from "../../assets/react-redux-store/store-component/profile-data-slice";
import TinderSwiper from "./home-comp/swiper-silder";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SwiperBox from "./home-comp/Swiper";
import TinderSwipeCards from "./home-comp/TinderSwipeCards";



const HomeScreen = () => {


const dispatch = useDispatch();
const { profilesStateData, loading } = useSelector(
       (state) => state.ProfilesDataReducerStore
   );
const handleSwipe = (direction, index) => {
  const current = profilesStateData[index];
  if (!current) return;

  if (direction === "right") {
    dispatch(addLikedProfile(current)); // ✅ FIX
     console.log("Like", current.id);
     console.log("right");
     
      //  console.log("RIGHT swipe moved:", movedItems);
  }

  if (direction === "left") {
    dispatch(addDislikedProfile(current)); // ✅ FIX
     console.log("Dislike", current.id);
          console.log("left");
  }

  if (direction === "up") {
    console.log("Super Like", current.id);
  }

  if (direction === "down") {
    console.log("Pass", current.id);
  }
};

  return (
    
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView
        style={styles.ScrollView}
        // contentContainerStyle={{ flexGrow: 1 }}
        horizontal={false}
        directionalLockEnabled={true}
      >
        <View style={{ flex: 1, zIndex: 10 }}>
          {/* <TinderSwiper
            data={profilesStateData}
            onSwipe={handleSwipe}
          /> */}
          <SwiperBox />
          {/* <TinderSwipeCards /> */}
        </View>

        {/* <ActionButtons  
        onLike={() => handleSwipe("right", currentIndex)}
        onDislike={() => handleSwipe("left", currentIndex)}
        onSuperLike={() => handleSwipe("up", currentIndex)}
        /> */}
      </ScrollView>
    </SafeAreaView>
   
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   paddingHorizontal: 24,
  //   paddingVertical: 0,
  // },
  container: {
  flex: 1,
  backgroundColor: "#fff",
  paddingHorizontal: 0, // remove 24
},
  text: {
    fontSize: 22
  },
  ScrollView: {
    marginBottom: 90,
  }
});