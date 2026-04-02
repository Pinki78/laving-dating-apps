import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import COLORS from "../../../assets/style/color";

import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";
import {savePreferences, setSelectedPreferences , toggleSelect} from "../../../assets/react-redux-store/store-component/preferences-slice";
import { useNavigation } from "@react-navigation/native";


const PreferencesList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {profilesStateData, loading } =
    useSelector((state) => state.ProfilesDataReducerStore);


  const {selectedPreferences } =
    useSelector((state) => state. PreferencesReducerStore);


  // ✅ Extract unique preferences safely
  const preferences = [
    ...new Set(
      profilesStateData.flatMap((p) => {
        if (Array.isArray(p.PreferencesType)) {
          return p.PreferencesType;
        }
        if (typeof p.PreferencesType === "string") {
          return [p.PreferencesType];
        }
        return [];
      })
    ),
  ];

const renderItem = ({ item }) => {
    const isSelected = selectedPreferences.includes(item);

    return (
      <Pressable
        onPress={() => dispatch(toggleSelect(item))} // ✅ correct
        style={[styles.card, isSelected && styles.activeCard]}
      >
        <Text style={styles.pref}>{item}</Text>

        <View
          style={[
            styles.radio,
            isSelected && styles.radioActive,
          ]}
        >
          {isSelected && <View style={styles.radioDot} />}
        </View>
      </Pressable>
    );
  };

  

  return (
    <>
       <FlatList
          data={preferences}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={renderItem}
        />

        <PressableIconButtonGradient
        ButtonTitle="Continue"
        onPress={async () => {
            try {
              await dispatch(savePreferences()).unwrap();

              console.log("✅ Saved successfully");

              navigation.navigate("interests-pick"); // 👈 change this
            } catch (err) {
              console.log("❌ Error:", err);
              Alert.alert("Error", err);
            }
          }}
        PressableClass={{ marginTop: 20 }}
        disabled={selectedPreferences.length === 0}
      />
    </>
  );
};

export default PreferencesList;


const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 100,
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: COLORS.greyish,
  },
  activeCard: {
    borderColor: COLORS.pinkiDark,
  },
  pref: {
    fontSize: 14,
    fontFamily: 'Mulish_700Bold',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: COLORS.pinkiDark,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.pinkiDark,
  },
})
