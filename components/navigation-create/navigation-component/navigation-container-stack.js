import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";

import { View, ActivityIndicator } from "react-native";

import { useDispatch , useSelector } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoadFonts from "../../assets/expo-font/expo-fonts";

import AppNavigatorScreen from "./navigation-component/app-navigator-screen"
import AuthStackApp from "./auth-stack-app";
import { setIsAuthenticated } from "../../assets/react-redux-store/store-component/auth-slice";

// import { onAuthStateChanged } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { auth, db } from "../../firebase/firebase";

import { useEffect, useState, useRef } from "react";


const Stack = createNativeStackNavigator();
const NavigationContainerStack = () => {

    const { isAuthenticated, loading } =
    useSelector((state) => state.authReducerStore);

    const fontsLoaded = LoadFonts();


    useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
  });

  return unsubscribe;
}, [dispatch]);

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
    </>
  )
}

export default NavigationContainerStack

