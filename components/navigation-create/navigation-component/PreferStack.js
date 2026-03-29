import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreferListIndex from "../../../app/preferences-pick";
import InterestsPickIndex from "../../../app/interests-pick";
import UploadPhotoScreenIndex from "../../../app/upload-your-photo";
import LocationPickIndex from "../../../app/location-pick";

const Stack = createNativeStackNavigator();

const PreferStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="preferences-pick"
        component={PreferListIndex}
      />
      <Stack.Screen
        name="interests-pick"
        component={InterestsPickIndex}
      />
      <Stack.Screen
        name="upload-your-photo"
        component={UploadPhotoScreenIndex}
      />
      <Stack.Screen
        name="location-pick"
        component={LocationPickIndex}
      /> 
    </Stack.Navigator>
  );
};

export default PreferStack;