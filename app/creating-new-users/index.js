import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import UsersModule from './new-users-component/users-module';
import LogoText from '../../components/logo-text/logo-and-text';

const CreatingNewUsersIndexScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
        <SafeAreaView  style={[styles.container, { paddingTop: insets.top + 15 }]}>
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: keyboardHeight + 20,
            }}
          >
            <LogoText
              LogoHeader="Welcome Back Sign In"
              Summary="Sign In to continue"
            //   headerStyle={{
            //     fontFamily: 'Urbanist_600SemiBold',
            //     fontSize: 25,
            //   }}
            //   summaryStyle={{
            //     fontSize: 14,
            //     fontFamily: 'Urbanist_600SemiBold',
            //   }}
            />

            <UsersModule />
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

export default CreatingNewUsersIndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
