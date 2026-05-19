import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AboutIndex = ({route}) => {
    const { profile, myProfile } = route?.params || {};
  return (
    <View>
      <Text>AboutIndex</Text>
      <Text>Profile ID: {profileId}</Text>
      <Text>Profile Name: {profile.title}</Text>
    </View>
  )
}

export default AboutIndex

const styles = StyleSheet.create({})