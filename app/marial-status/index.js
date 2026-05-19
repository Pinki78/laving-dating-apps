import { StyleSheet, View, ScrollView } from 'react-native'
import { SafeAreaView, } from 'react-native-safe-area-context'
import { useLayoutEffect, useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native'


import MarialList from './marial-status-comp/marial-status-list'
import BackPreviousPaga from '../../components/back-previous-paga/back-previous-paga';
import CompantHeader from '../../components/compant-header/compant-header';

const MarialStatusindex = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch();

    const handleBack = () => {
        navigation.navigate("interests-pick");
    };

    return (
        <>
            <SafeAreaView style={[styles.container,]}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <BackPreviousPaga
                        icon="arrow-back-circle-outline"

                        onBack={handleBack}
                        BackheaderStyle={styles.backheaderStyle}

                    />

                    <View style={[styles.ViewContainer]}>
                        <CompantHeader
                            HeaderIingText="Marial Status"
                            SummaryText="Tell us what piques your curiosity and passions"
                        />

                        {/* MarialList */}

                        <MarialList />

                    </View>
                </ScrollView>

            </SafeAreaView>

        </>
    )
}

export default MarialStatusindex

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",

        flexShrink: 1,
    },
    ViewContainer: {
        paddingHorizontal: 24,
    }


});


