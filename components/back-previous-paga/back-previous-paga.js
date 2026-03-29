import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const BackPreviousPaga = (props) => {

const {
    headerTitle,
    icon,
    onBack,
    BackheaderStyle,
    showSkip = false,     // ✅ default hidden
    onSkip,
    skipTitle = "Skip",  // ✅ default text
  } = props

  const navigation = useNavigation()


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: headerTitle,
      headerRight: () => (
        <Ionicons
          name={icon}
          size={24}
          color="#000"
          style={{ marginRight: 16 }}
        />
      ),
    })
  }, [navigation, headerTitle, icon])

  return (
    <>
     <View style={[styles.header, BackheaderStyle]}>

      {/* 🔙 Back button */}
      <Pressable onPress={onBack}>
        <Ionicons name={icon} size={24} color="#000" />
      </Pressable>

      {/* 🏷 Title */}
      <Text style={styles.headerTitle}>{headerTitle}</Text>

      {/* ⏭ Skip (conditional) */}
      {showSkip ? (
        <Pressable onPress={onSkip}>
          <Text style={styles.skipTitle}>{skipTitle}</Text>
        </Pressable>
      ) : (
        <View style={{ width: 40 }} /> // keeps layout balanced
      )}

    </View>
    </>
  )
}

export default BackPreviousPaga

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  skipTitle: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
})