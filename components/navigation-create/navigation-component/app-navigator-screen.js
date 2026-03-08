import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../../app/home";

import FooterTab from "./footer-tab/footer-tab";
// import Header from "../header/header";

const Stack = createNativeStackNavigator();

const AppNavigatorScreen = () => {
  return (
    <>
    {/* <Header /> */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen } />
        {/* <Stack.Screen name="about" component={AboutIndex} /> */}
      </Stack.Navigator>

      {/* Footer only inside App */}
      <FooterTab />
    </>
  );
};

export default AppNavigatorScreen;