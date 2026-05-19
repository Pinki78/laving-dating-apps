import {
  NavigationContainer,
} from "@react-navigation/native";

import { View, ActivityIndicator } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadFonts from "../../assets/expo-font/expo-fonts";

import AppNavigatorScreen from "./navigation-component/app-navigator-screen"
import AuthStackApp from "./navigation-component/auth-stack-app"
import { setIsSigningUp, setIsAuthenticated, setOnboardingComplete, setAuthChecked } from "../../assets/react-redux-store/store-component/auth-slice";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase/firebase";
import { auth, db } from "../../assets/firebase/firebaseConfig";
import { useEffect, useState, useRef } from "react";
import { uploadProfilesFirebase, fetchLoadProfiles } from "../../assets/react-redux-store/store-component/profile-data-slice";
// import PreferStack from "./navigation-component/PreferStack";


const Stack = createNativeStackNavigator();

const NavigationContainerStack = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uploadProfilesFirebase()).then(() => {
      dispatch(fetchLoadProfiles());
    });
  }, [dispatch]);




  const { isSigningUp, isAuthenticated, } =
    useSelector((state) => state.authReducerStore);


  const fontsLoaded = LoadFonts();


  // ✅ AUTH LISTENER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      // ✅ use isSigningUp directly
      if (isSigningUp) return;

      if (!user) {
        dispatch(setIsAuthenticated(false));

        return;
      }

      

      const emailId = user.email
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, "_");
         const customId = `${emailId}_${user.uid}`;

      const userSnap = await getDoc(doc(db, "users", customId));


      const userData = userSnap.data();

      // 🔥 KEY CHANGE HERE
      if (userData?.onboardingComplete) {
        dispatch(setIsAuthenticated(true));
      } else {
        dispatch(setIsAuthenticated(false));
      }

    });

    return unsubscribe;
  }, [isSigningUp]); // ✅ IMPORTANT

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


// console.log("Checking route in:", "ComponentName", route);
  return (
    <>

      <NavigationContainer>
        {!isAuthenticated ? <AuthStackApp /> : <AppNavigatorScreen />}
      </NavigationContainer>

    </>
  )
}

export default NavigationContainerStack

