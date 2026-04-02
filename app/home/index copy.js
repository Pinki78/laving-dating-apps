import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../assets/firebase/firebaseConfig"; // ✅ FIX
import { doc, setDoc } from "firebase/firestore"; // ✅ FIX
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { setIsAuthenticated, setHasOpenedAppBefore } from "../../assets/react-redux-store/store-component/auth-slice";

const HomeScreen = () => {

  const navigation = useNavigation();
  const dispatch = useDispatch();




// const logoutHandler = async () => {
//   try {
//     await signOut(auth);
  
//     navigation.replace("log-in"); // go to login screen
//       // ✅ This will automatically go to login screen
//     dispatch(setIsAuthenticated(false));
//   } catch (error) {
//     console.log(error);
//   }

  
// };
const logoutHandler = async () => {
  try {
    await signOut(auth);
// navigation.replace("log-in"); 
    dispatch(setIsAuthenticated(false));

  // ✅ THIS IS IMPORTANT
    dispatch(setHasOpenedAppBefore(true));

  } catch (error) {
    console.log(error);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>


      <Text
      onPress={logoutHandler}
      style={{
        marginTop:40,
        backgroundColor:"red",
        color:"#fff",
        padding:12,
        textAlign:"center",
        borderRadius:8,
        fontWeight:"bold"
      }}
    >
      LOG OUT
    </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 22
  }
});