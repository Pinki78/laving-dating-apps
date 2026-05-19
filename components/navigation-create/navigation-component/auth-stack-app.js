import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";

import GetStartedIndexScreen from "../../../app/get-started";
import LogInIndexScreen from "../../../app/log-in";
import CreatingNewUsersIndexScreen from "../../../app/creating-new-users";

import PreferListIndex from "../../../app/preferences-pick";
import InterestsPickIndex from "../../../app/interests-pick";
import UploadPhotoScreenIndex from "../../../app/upload-your-photo";
import LocationPickIndex from "../../../app/location-pick";
import MarialStatusindex from "../../../app/marial-status";

const AuthStack = createNativeStackNavigator();

const AuthStackApp = () => {

  const dispatch = useDispatch();


  const { onboardingComplete, hasOpenedAppBefore } =
    useSelector((state) => state.authReducerStore);

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}

      initialRouteName={
        hasOpenedAppBefore ? "log-in" : "get-started"
      }

    >
     <AuthStack.Screen
        name="get-started"
        component={GetStartedIndexScreen}
      />
      <AuthStack.Screen
        name="log-in"
        component={LogInIndexScreen}
      />
      <AuthStack.Screen
        name="creating-new-users"
        component={CreatingNewUsersIndexScreen}
      />

      <AuthStack.Screen
        name="preferences-pick"
        component={PreferListIndex}
      />
      <AuthStack.Screen
        name="interests-pick"
        component={InterestsPickIndex}
      /> 

      <AuthStack.Screen
        name="marial-status-pick"
        component={MarialStatusindex}
      />

      <AuthStack.Screen
        name="upload-your-photo"
        component={UploadPhotoScreenIndex}
      />
      <AuthStack.Screen
        name="location-pick"
        component={LocationPickIndex}
      /> 



    </AuthStack.Navigator>
  );
};

export default AuthStackApp;

const styles = StyleSheet.create({});