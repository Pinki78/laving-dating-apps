import {
  View,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'

import CompantHeader from '../../components/compant-header/compant-header'
import BackPreviousPaga from '../../components/back-previous-paga/back-previous-paga';
import { setEditFrom, setKeyboardHeight } from '../../assets/react-redux-store/store-component/location-data-picke-slice';
import PickeLocation from "./location-componet/picke-location";





const LocationPickIndex = () => {

  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { showBtn, keyboardHeight } = useSelector(state => state.LocationReducerStore);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    })
  }, [navigation])

  const handleBack = () => {
    navigation.navigate("upload-your-photo");
  };


  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", (e) => {
      dispatch(setKeyboardHeight(e.endCoordinates.height));
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      dispatch(setKeyboardHeight(0));
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);


  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={[styles.container,]}>

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: keyboardHeight + 20,
            }}
          >
            <BackPreviousPaga
              icon="arrow-back-circle-outline"

              onBack={handleBack}
              BackheaderStyle={styles.backheaderStyle}

            />

            <View style={[styles.ViewContainer]}>
              <CompantHeader
                HeaderIingText="Enable your location"
                SummaryText="Choose your location to start find people around you."
              />

              {/* PickeLocation */}

              <PickeLocation />

            </View>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  )
}

export default LocationPickIndex


const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",

    flexShrink: 1,
  },
  ViewContainer: {
    paddingHorizontal: 24,
  }


});

