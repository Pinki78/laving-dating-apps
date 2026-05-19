import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'

import CompantHeader from '../../components/compant-header/compant-header'
import BackPreviousPaga from '../../components/back-previous-paga/back-previous-paga';
import { setEditFrom, setKeyboardHeight } from '../../assets/react-redux-store/store-component/location-data-picke-slice';
import PickeLocation from "./location-componet/picke-location";
import TouchableIconButton from "../../components/button/touchable-icon-button-gradient";
import { setOnboardingComplete, setIsAuthenticated } from "../../assets/react-redux-store/store-component/auth-slice";
import { savePreferences } from "../../assets/react-redux-store/store-component/preferences-slice";

import { auth, db } from "../../assets/firebase/firebaseConfig"; // ✅ FIX
import { doc, setDoc } from "firebase/firestore"; // ✅ FIX

const LocationPickIndex = () => {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { showBtn, keyboardHeight } = useSelector(state => state.LocationReducerStore);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    })
  }, [navigation])

  const handleBack = () => {
    navigation.navigate("upload-your-photo");
  };


  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      dispatch(setKeyboardHeight(e.endCoordinates.height));
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      dispatch(setKeyboardHeight(0));
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const handleGoHome = async () => {
    try {
      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error("User not logged in");
      }

      const emailId = user.email
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");

      const customId = `${emailId}_${user.uid}`;

      // ✅ Only update onboardingComplete
      await setDoc(
        doc(db, "users", customId),
        { onboardingComplete: true },
        { merge: true }
      );

      // ✅ Update Redux state
      // dispatch(setOnboardingComplete(true));
      dispatch(setIsAuthenticated(true));

      // ✅ Navigate to Home
      // navigation.replace("home");

    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", error.message);
    }
  };
  
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[styles.container,]}>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: keyboardHeight + 20,
            }}
          >
            <BackPreviousPaga
              icon="arrow-back-circle-outline"

              onBack={handleBack}
              BackheaderStyle={styles.backheaderStyle}

            />

            <View style={[styles.ViewContainer]}>
              <CompantHeader
                HeaderIingText="Enable your location"
                SummaryText="Choose your location to start find people around you."
              />

              {/* PickeLocation */}

              <PickeLocation />

            </View>
          </ScrollView>

          <View style={[{ display: showBtn ? "flex" : "none" }, styles.ViewButton]}>
            <TouchableIconButton
              iconName="arrow-forward-outline"
              TouchableGradient={styles.TouchableGradient}
              onPress={handleGoHome}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  )
}

export default LocationPickIndex


const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",

    flexShrink: 1,
  },
  ViewContainer: {
    paddingHorizontal: 24,
  },

  ViewButton: {
    paddingHorizontal: 24,
    position: "absolute",
    bottom: 0,
    // width:"100%",
    right: 0,
  },

  TouchableGradient: {
    width: "auto",// ✅ (rarely needed)
    display: "inline",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 30,

  }


});

