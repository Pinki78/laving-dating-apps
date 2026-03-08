import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { SafeAreaProvider } from "react-native-safe-area-context";

import HomeScreen from "./app/home";
import ProfileScreen from "./app/profile";
import NavigationButton from './components/navigation-create/navigation-button';


// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }
// export type RootTabParamList = {
//   Home: undefined;
//   Profile: undefined;
// };

// const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    //  <SafeAreaProvider>
    // {/* <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={({ route }) => ({
    //      headerShown: false,
    //         tabBarActiveTintColor: "#ff4d6d",
    //         tabBarInactiveTintColor: "gray",
    //         tabBarStyle: {
    //           height: 90,
    //           paddingBottom: 10,
              
    //         },
    //         tabBarIcon: ({ color, size }) => {
    //           let iconName: any = "home";

    //           if (route.name === "Home") {
    //             iconName = "home";
    //           } else if (route.name === "Profile") {
    //             iconName = "person";
    //           }

    //           return <Ionicons name={iconName} size={size} color={color} />;
    //         }
    //       })}
    //   >
    //     <Tab.Screen name="Home" component={HomeScreen} />
    //     <Tab.Screen name="Profile" component={ProfileScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer> */}

    // </SafeAreaProvider>
    <>
    <NavigationButton />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
