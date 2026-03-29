import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";

import { View, ActivityIndicator } from "react-native";

import { useDispatch , useSelector } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadFonts from "../../assets/expo-font/expo-fonts";

import AppNavigatorScreen from "./navigation-component/app-navigator-screen"
import AuthStackApp from "./navigation-component/auth-stack-app"
import { setIsAuthenticated , setOnboardingComplete} from "../../assets/react-redux-store/store-component/auth-slice";

import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase/firebase";
import { auth ,db} from "../../assets/firebase/firebaseConfig";
import { useEffect, useState, useRef } from "react";
import { uploadProfilesFirebase , fetchLoadProfiles} from "../../assets/react-redux-store/store-component/profile-data-slice";
import PreferStack from "./navigation-component/PreferStack";








const Stack = createNativeStackNavigator();

const NavigationContainerStack = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(uploadProfilesFirebase()).then(() => {
      dispatch(fetchLoadProfiles());
    });
  }, [dispatch]);




    const { isAuthenticated, loading, onboardingComplete,  hasOpenedAppBefore, } =
    useSelector((state) => state.authReducerStore);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("USER:", user);
      if (!user) {
      dispatch(setIsAuthenticated(false));
      return;
    }

     const docId = `${user.email}_${user.uid}`;
    const userRef = doc(db, "usersList", docId);
    const userSnap = await getDoc(userRef);

     if (!userSnap.exists()) {
      dispatch(setIsAuthenticated(false));
      return;
    }

     const userData = userSnap.data();
    const photos = userData?.photos || [];
    const hasPhotos = photos.some((p) => p);

    dispatch(setIsAuthenticated(hasPhotos));

      // if (user) {
      //   dispatch(setIsAuthenticated(true));

      //   const snap = await getDoc(doc(db, "users", user.uid));

      //   if (snap.exists()) {
      //     dispatch(
      //       setOnboardingComplete(snap.data().onboardingComplete || false)
      //     );
      //   } else {
      //     dispatch(setOnboardingComplete(false));
      //   }
      // } else {
      //   dispatch(setIsAuthenticated(false));
      // }
    });

    return unsubscribe;
  }, []);

    const fontsLoaded = LoadFonts();

   if (!fontsLoaded || loading || isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  
  }


  return (
    <>
{/* <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="auth-stack-app" component={AuthStackApp} />
          <Stack.Screen name="app-navigator-screen" component={AppNavigatorScreen} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <NavigationContainer>
        {isAuthenticated ? <AuthStackApp/> : <AppNavigatorScreen/>}
      </NavigationContainer>

       {/* <NavigationContainer>
      {!isAuthenticated ? (
        <AuthStackApp />
      ) : !onboardingComplete ? (
        <PreferStack />   // 👈 onboarding screens
      ) : (
        <AppNavigatorScreen /> // 👈 home
      )}
    </NavigationContainer> */}

      {/* <NavigationContainer>
        {isAuthenticated ? <AppNavigatorScreen /> : <AuthStackApp />}
      </NavigationContainer> */}
    </>
  )
}

export default NavigationContainerStack

