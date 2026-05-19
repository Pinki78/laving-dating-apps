// swiper-slider.js
import { StyleSheet, Text, View } from 'react-native'

import Swiper from "react-native-deck-swiper";
import SwipeCard from './swipe-card'
import { useSelector } from "react-redux";

const SwiperSlider = () => {  // ✅ fixed typo: SwiperSilder → SwiperSlider

    const { profilesStateData, loading } = useSelector(
        (state) => state.ProfilesDataReducerStore,
    );

    if (loading) return <Text>Loading...</Text>;

    if (!profilesStateData || profilesStateData.length === 0)
        return <Text>No profiles</Text>;

    return (
        <View style={styles.container}>
            <Swiper
            // ref={ref} 
                cards={profilesStateData}
                renderCard={(item) => {
                    if (!item) return <View />;
                    return <SwipeCard profile={item} /> ;
                }}
                stackSize={3}
                backgroundColor="transparent"
                cardHorizontalMargin={0}
                cardVerticalMargin={50}
                // onSwipedRight={onSwipedRight}      // ✅ fires when swiped right
                // onSwipedLeft={onSwipedLeft}
            />
        </View>
    );
}

export default SwiperSlider;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: "#f8f8f8",
    //     justifyContent: "center",
    // },
});