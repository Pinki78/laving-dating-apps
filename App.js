import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from "react-redux";
import NavigationContainerStack  from './components/navigation-create/navigation-container-stack';
import { store } from './assets/react-redux-store/store';

import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainerStack  />
      </SafeAreaProvider>
    </Provider>
  );
}