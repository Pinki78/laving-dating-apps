import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView,  } from 'react-native-safe-area-context'
import SwipeCard from "./home-comp/swipe-card";



const HomeScreen = () => {



  return (
    <SafeAreaView style={styles.container} edges={[]}>
     <ScrollView  style={styles.ScrollView}>
        <SwipeCard />

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical:0,
  },
  text: {
    fontSize: 22
  },
  ScrollView:{
    marginBottom:90,
  }
});