import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import NavigationContainerStack from './components/navigation-create/navigation-container-stack';
import { store } from './assets/react-redux-store/store';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {

useEffect(() => {
    if (Platform.OS === 'android') {
      // 1. Set the background color
      NavigationBar.setBackgroundColorAsync("#ffffff"); // Change to your color

      // 2. Set the button/gesture handle color 
      // Use 'dark' if your background is light, 'light' if your background is dark
      NavigationBar.setButtonStyleAsync("dark");
      
      // 3. Optional: Set position to 'relative' to ensure the app doesn't 
      // draw underneath the bar (keeps the bar solid)
      NavigationBar.setPositionAsync('relative');
    }
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainerStack />
      </SafeAreaProvider>
    </Provider>
  );
}