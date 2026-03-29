import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';


import { Provider } from "react-redux";

import NavigationButton from './components/navigation-create/navigation-container-stack';
import { Host} from '@expo/ui/swift-ui';


import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (

    <>
    <Provider >
    <Host>
    <NavigationButton />
    </Host>
    </Provider>
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
