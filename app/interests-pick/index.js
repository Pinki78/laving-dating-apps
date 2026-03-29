import { StyleSheet, View } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'

import CompantHeader from '../../components/compant-header/compant-header'
import BackPreviousPaga from '../../components/back-previous-paga/back-previous-paga';

import InterestsList from './interests-componet/interests-list';



const InterestsPickIndex = () => {

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
    navigation.navigate("preferences-pick");
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
              HeaderIingText="Your interests"
              SummaryText="Tell us what piques your curiosity and passions"
            />

            {/* InterestsList */}

            <InterestsList />
           
          </View>

      </SafeAreaView>
    </>
  )
}

export default InterestsPickIndex

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    
    flexShrink: 1,
  },
  ViewContainer:{
    paddingHorizontal: 24,
  }


});
