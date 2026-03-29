import { StyleSheet, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'

import CompantHeader from '../../components/compant-header/compant-header'
import BackPreviousPaga from '../../components/back-previous-paga/back-previous-paga';

import PhotoPickeList from './photo-picke-component/photo-picke-list';


const UploadPhotoScreenIndex = () => {

  const navigation = useNavigation()
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    })
  }, [navigation])

  const handleBack = () => {
    navigation.navigate("interests-pick");
  };


  return (
    <>
      <SafeAreaView style={[styles.container,]}>
        <BackPreviousPaga
          icon="arrow-back-circle-outline"

          onBack={handleBack}
          BackheaderStyle={styles.backheaderStyle}

        />

        <View style={[styles.ViewContainer]}>
          <CompantHeader
            HeaderIingText="Upload your photo"
            SummaryText=" We'd love to see you. Upload a photo for your dating journey."
          />

          {/* PhotoPickeList */}
          <PhotoPickeList />
        </View>

      </SafeAreaView>
    </>
  )
}

export default UploadPhotoScreenIndex

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",

    flexShrink: 1,
  },
  ViewContainer: {
    paddingHorizontal: 24,
  }


});
