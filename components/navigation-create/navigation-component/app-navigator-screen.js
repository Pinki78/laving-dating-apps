import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { StyleSheet } from "react-native";

import MainBottomTabs from "./footer-tab/main-bottom-tabs";
import AppHeader from "../../app-header/app-header";
// import Header from "../header/header";
import AboutIndex from "../../../app/about-us";
import NotificationsIndex from "../../../app/notifications";


import MessagesIndex from "../../../app/messages";



const Stack = createNativeStackNavigator();

const AppNavigatorScreen = () => {
  return (
    <>
      {/* <Header /> */}
     
        <Stack.Navigator screenOptions={{ animation: 'fade' }}  sceneContainerStyle={{ backgroundColor: '#fff' }}>
          
          <Stack.Screen name="MainTabs" component={MainBottomTabs}  options={{headerShown: false,}}  />
          {/* <Stack.Screen name="home" component={HomeScreen } 
          
              options={{
                headerShown: true,
                headerBackVisible: false,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
                header: () => <AppHeader isHome={true} />

              }}
                  
          
          /> */}
          <Stack.Screen name="about-us" component={AboutIndex} 
           options={{
                headerShown: true,
                headerBackVisible: true,
                headerShadowVisible: true,  
                headerStyle: { backgroundColor: 'transparent' },
                header: () => <AppHeader isHome={false} />

              }}
          
          
          />

          <Stack.Screen name="notifications" component={NotificationsIndex} 
           options={{
                headerShown: true,
                headerBackVisible: true,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
               

              }}
          
          
          />

          <Stack.Screen name="messages" component={MessagesIndex} 
           options={{
                headerShown: true,
                headerBackVisible: true,
                headerShadowVisible: false,  
                headerStyle: { backgroundColor: 'transparent' },
               

              }}
          
          
          />





        </Stack.Navigator>
     

    </>
  );
};

export default AppNavigatorScreen;

const styles = StyleSheet.create({

  // container: {
  //   flex: 1,
  //   paddingHorizontal: 24,
  //   // backgroundColor: COLORS.whiteSmoke,
  // },

})