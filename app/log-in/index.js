import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import LogoText from '../../components/logo-text/logo-and-text'
import ModuleLogIn from './login-component/log-in-module';

const LogInIndexScreen = () => {


  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    });
  }, [navigation]);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);



  return (
    <>
     
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={[styles.container, { paddingTop: insets.top + 15 }]}


          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: keyboardHeight + 20,
              }}
            >
              <LogoText
                LogoHeader="Welcome Back"
                Summary='Login to continue'
                headerStyle={{
                //   fontFamily: 'Urbanist_600SemiBold',
                  fontSize: 25,
                }}
                summaryStyle={{
                  fontSize: 14,
                //   fontFamily: 'Urbanist_600SemiBold',
                }}
              />

              <ModuleLogIn/>

            </ScrollView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      
    </>
  )
}

export default LogInIndexScreen

const styles = StyleSheet.create({
      container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fdecef",
    justifyContent: 'center',
  },

})