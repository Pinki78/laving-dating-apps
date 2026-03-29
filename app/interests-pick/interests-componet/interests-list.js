import {
    View,
    Text,
    StyleSheet,
    Pressable,
    FlatList,
} from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import COLORS from "../../../assets/style/color";
import { Ionicons } from "@expo/vector-icons";

import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";
import { saveInterests, setSelectedInterests, toggleInterest } from "../../../assets/react-redux-store/store-component/interests-data-slice";




const InterestsList = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { profilesStateData, loading } =
        useSelector((state) => state.ProfilesDataReducerStore);

    const { selectedInterests } = useSelector(
        state => state.InterestsReducerStore
    )

    // 🔹 Build unique interest list
    const interestsList = useMemo(() => {
        const map = new Map();
        profilesStateData.forEach(profile => {
            (profile.ProInterests ?? []).forEach(interest => {
                map.set(interest.id, interest);
            });
        });
        return Array.from(map.values());
    }, [profilesStateData]);


    const renderItem = ({ item }) => {
        const isSelected = selectedInterests.includes(item.id);
        return (
            <Pressable
                onPress={() => dispatch(toggleInterest(item.id))}
                style={[styles.item, isSelected && styles.selectedItem]}
            >
                <Ionicons
                    name={item.icon}
                    size={16}
                    color={isSelected ? "#fff" : COLORS.pinkiDark}
                    style={[styles.Ionicons]}
                />
                <Text style={[styles.text, isSelected && styles.selectedText]}>
                    {item.name}
                </Text>
            </Pressable>
        );
    };






    return (
        <>
            <FlatList
                data={interestsList}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{ padding: 12 }}
            />

            <PressableIconButtonGradient
                ButtonTitle="Continue"

                onPress={async () => {
                    try {
                        await dispatch(saveInterests()).unwrap();

                        console.log("✅ Saved successfully");

                        navigation.navigate("upload-your-photo"); // 👈 change this
                    } catch (err) {
                        console.log("❌ Error:", err);
                        Alert.alert("Error", err);
                    }
                }}
                disabled={selectedInterests.length === 0}
            />
        </>
    )
}

export default InterestsList


const styles = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        padding: 12,
        margin: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedItem: {
        backgroundColor: COLORS.pinkiDark,
        borderColor: COLORS.pinkiDark,
    },
    text: {
        fontSize: 14,
        color: "#000",
    },
    selectedText: {
        color: "#fff",
    },

    Ionicons:{
        color:COLORS.pinkiDark,
    }
});
