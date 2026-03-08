import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch , useSelector } from "react-redux";

import GetStartedIndex from "../../../app/get-started";
import LogInIndex from "../../../app/log-in";
// import CreatingNewUsersIndex from "../../creating-new-users";
// import PreferListIndex from "../../prefer-list";
// import YourInterestsIndex from "../../your-interests";
// import LocationIndex from "../../location";
// import UploadPhotoScreen from "../../upload-your-photo";

const AuthStack = createNativeStackNavigator();

const AuthStackApp = () => {

//  const dispatch = useDispatch();


//   const { hasOpenedAppBefore  } = useSelector(
//     (state) => state.goHomesliceHandlerStore
//   );

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} 
    // initialRouteName={
    //     hasOpenedAppBefore ? "log-in" : "GetStartedIndex"
    //   }
      >
      <AuthStack.Screen
        name="get-started"
        component={GetStartedIndex}
      />
      <AuthStack.Screen
        name="log-in"
        component={LogInIndex}
      />
      {/* <AuthStack.Screen
        name="creating-new-users"
        component={CreatingNewUsersIndex}
      /> */}
     {/*  <AuthStack.Screen
        name="prefer-list"
        component={PreferListIndex}
      />
      <AuthStack.Screen
        name="your-interests"
        component={YourInterestsIndex}
      />
      <AuthStack.Screen
        name="upload-your-photo"
        component={UploadPhotoScreen}
      />
      <AuthStack.Screen
        name="location"
        component={LocationIndex}
      /> */}
    </AuthStack.Navigator>
  );
};

export default AuthStackApp;

const styles = StyleSheet.create({});