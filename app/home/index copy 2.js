import { useRef, useEffect, useCallback, forwardRef } from "react";

import { shallowEqual } from "react-redux"; // ✅ prevents unnecessary re-renders

import { View,  StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, } from 'react-native-safe-area-context'
import ActionButtons from "./home-comp/action-buttons";
import SwiperSilder from "./home-comp/swiper-silder";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { addLikedProfile , addDislikedProfile } from "../../assets/react-redux-store/store-component/profile-data-slice";

 
const HomeScreen = () => {
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//    const swiperRef = useRef(null);   

//     const { profilesStateData, loading } = useSelector(
//         (state) => state.ProfilesDataReducerStore
//     );


//  const profilesRef = useRef(profilesStateData);
//     useEffect(() => {
//         profilesRef.current = profilesStateData;
//     }, [profilesStateData]);

//     const handleSwipedRight = (cardIndex) => {
//         const profile = profilesRef.current[cardIndex]; // ✅ always latest data
//         if (!profile) return;
//         console.log("Liked:", profile.title);
//         dispatch(addLikedProfile(profile));             // ✅ save to redux
//     };

//     const handleSwipedLeft = (cardIndex) => {
//         const profile = profilesRef.current[cardIndex]; // ✅ always latest data
//         if (!profile) return;
//         console.log("Disliked:", profile.title);
//         dispatch(addDislikedProfile(profile));          // ✅ save to redux
//     };
//         const handleSuperLike = () => {
//         navigation.navigate("SuperLikeScreen"); // ✅ or whatever your screen name is
//     };


const dispatch = useDispatch();
    const swiperRef = useRef(null);
    const navigation = useNavigation();

    // ✅ shallowEqual prevents re-render if array content didn't actually change
    const profilesStateData = useSelector(
        state => state.ProfilesDataReducerStore?.profilesStateData ?? [],
        shallowEqual  // ✅ key fix for blinking
    );

    const profilesRef = useRef(profilesStateData);
    useEffect(() => {
        profilesRef.current = profilesStateData;
    }, [profilesStateData]);

    // ✅ useCallback prevents function recreation on every render
    const handleSwipedRight = useCallback((cardIndex) => {
        const profile = profilesRef.current[cardIndex];
        if (!profile) return;
        dispatch(addLikedProfile(profile));
    }, [dispatch]);

    const handleSwipedLeft = useCallback((cardIndex) => {
        const profile = profilesRef.current[cardIndex];
        if (!profile) return;
        dispatch(addDislikedProfile(profile));
    }, [dispatch]);

    const handleLike = useCallback(() => {
        swiperRef.current?.swipeRight();
    }, []);

    const handleDislike = useCallback(() => {
        swiperRef.current?.swipeLeft();
    }, []);

    const handleSuperLike = useCallback(() => {
        navigation.navigate("SuperLikeScreen");
    }, [navigation]);


  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView style={styles.ScrollView} contentContainerStyle={{
        flexGrow: 1, // ⭐ IMPORTANT
        // paddingBottom: keyboardHeight + 20,
      }}
      
      >
          <View style={{ flex: 0.93, position:"relative" }}>     
            <SwiperSilder 
            
              ref={swiperRef}                          // 👈 pass ref down
                   onSwipedRight={handleSwipedRight}
                    onSwipedLeft={handleSwipedLeft}
            />
          </View>
          <ActionButtons
            onLike={handleLike}
                onDislike={handleDislike}
                onSuperLike={handleSuperLike}
          />
          

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  text: {
    fontSize: 22
  },
  ScrollView: {
    marginBottom: 90,
  }
});