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
import {
    saveMarialStatus, setSelectedMarialStatus,
    toggleMarialStatus,
    clearMarialStatus,
} from "../../../assets/react-redux-store/store-component/marial-status-slice";



const MarialList = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { profilesStateData, loading } =
        useSelector((state) => state.ProfilesDataReducerStore);

    const { selectedMarialStatus } = useSelector(
        state => state.MarialStatusReducerStore
    )

    // const marialStatusList = useMemo(() =>{

    //     const map = new Map();
    //     profilesStateData.forEach(item => {

    //     })

    // },[profilesStateData])  

    const marialStatusList = [
        ...new Set(profilesStateData.map(item => item.marialStatus).filter(Boolean))
    ]

    const renderItem = ({ item }) => {
        const isSelected = selectedMarialStatus.includes(item);

        return (
            <Pressable
                onPress={() => dispatch(toggleMarialStatus(item))} // ✅ correct
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
                data={marialStatusList}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                nestedScrollEnabled={true}
            />

            <PressableIconButtonGradient
                ButtonTitle="Continue"
                PressableClass={styles.PressableClass}
                onPress={async () => {
                    try {
                        await dispatch(saveMarialStatus()).unwrap();

                        // console.log("✅ Saved successfully");

                        navigation.navigate("upload-your-photo"); // 👈 change this
                    } catch (err) {
                        console.log("❌ Error:", err);
                        Alert.alert("Error", err);
                    }
                }}
                disabled={selectedMarialStatus.length === 0}
            />
        </>
    )
}

export default MarialList


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

    PressableClass:{
        marginTop:20,
    }
})
