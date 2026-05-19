import { useRef, useEffect, useCallback, forwardRef } from "react";

import { shallowEqual } from "react-redux"; // ✅ prevents unnecessary re-renders

import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView, } from 'react-native-safe-area-context'
import ActionButtons from "./home-comp/action-buttons";
import SwiperSilder from "./home-comp/swiper-silder";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { addLikedProfile, addDislikedProfile } from "../../assets/react-redux-store/store-component/profile-data-slice";


const HomeScreen = () => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const navigation = useNavigation();

  const profilesStateData = useSelector(
    state => state.ProfilesDataReducerStore?.profilesStateData ?? [],
    shallowEqual
  );

  const profilesRef = useRef(profilesStateData);
  useEffect(() => {
    profilesRef.current = profilesStateData;
  }, [profilesStateData]);

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

  const handleLike = useCallback(() => swiperRef.current?.swipeRight(), []);
  const handleDislike = useCallback(() => swiperRef.current?.swipeLeft(), []);
  const handleSuperLike = useCallback(() => navigation.navigate("SuperLikeScreen"), [navigation]);


  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView
        style={styles.ScrollView}
        contentContainerStyle={{ flexGrow: 1 }}
        // ✅ These two lines fix the gesture conflict
        horizontal={false}
        directionalLockEnabled={true}

      >
        <View style={{ flex: 0.93, position: "relative" }}>
          <SwiperSilder
            ref={swiperRef}
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