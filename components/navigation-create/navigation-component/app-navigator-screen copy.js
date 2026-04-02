import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../../app/home";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import FooterTab from "./footer-tab/footer-tab";
import AppHeader from "../../app-header/app-header";
// import Header from "../header/header";
import AboutIndex from "../../../app/about-us";
import { StyleSheet } from "react-native";



const Stack = createNativeStackNavigator();

const AppNavigatorScreen = () => {
  return (
    <>
      {/* <Header /> */}
      <SafeAreaView style={[styles.container, { flex: 1, backgroundColor: "#fff" }]} edges={[]}>
        <Stack.Navigator screenOptions={{ animation: 'fade' }}  sceneContainerStyle={{ backgroundColor: '#fff' }}>
          


          

          <Stack.Screen name="MainTabs" component={FooterTab}  options={{headerShown: false,}}  />
          {/* <Stack.Screen name="home" component={HomeScreen } 
          
              options={{
                headerShown: true,
                headerBackVisible: false,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
                header: () => <AppHeader isHome={true} />

              }}
                  
          
          /> */}
          <Stack.Screen name="about-us" component={AboutIndex} />
        </Stack.Navigator>
      </SafeAreaView>

    </>
  );
};

export default AppNavigatorScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingHorizontal: 24,
    // backgroundColor: COLORS.whiteSmoke,
  },

})