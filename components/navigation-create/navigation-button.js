import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";


import AppNavigatorScreen from "./navigation-component/app-navigator-screen"
import AuthStackApp from "./navigation-component/auth-stack-app"

const Stack = createNativeStackNavigator();
const NavigationButton = () => {
  return (
    <>
       <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth-stack-app" component={AuthStackApp} />
        <Stack.Screen name="app-navigator-screen" component={AppNavigatorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  )
}

export default NavigationButton

