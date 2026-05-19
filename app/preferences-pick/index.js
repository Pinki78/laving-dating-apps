import { StyleSheet, View } from 'react-native'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'

import CompantHeader from '../../components/compant-header/compant-header'
import PreferencesList from './preferences-component/preferences-list'

const PreferListIndex = () => {

  const navigation = useNavigation()
   const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      title: '',
      animation: 'fade',
    })
  }, [navigation])



  return (
    <>
      <SafeAreaView style={styles.root}>

          <View>
            <CompantHeader 
              HeaderIingText="I am Looking for..."
              SummaryText="Provide us with further insights into your preferences"
            />
            {/* PreferencesList */}
            <PreferencesList />
          </View>

      </SafeAreaView>
    </>
  )
}

export default PreferListIndex

const styles = StyleSheet.create({

 root: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center'
  },


})