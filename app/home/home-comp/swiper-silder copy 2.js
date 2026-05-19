import { forwardRef, useCallback, useEffect, useState, useRef } from "react";
import Swiper from "react-native-deck-swiper";
import SwipeCard from "./swipe-card";
import { useSelector, shallowEqual } from "react-redux";
import { StyleSheet, View, ActivityIndicator, Image, Animated } from "react-native";

const SwiperSlider = forwardRef(({ onSwipedRight, onSwipedLeft }, ref) => {

    const profilesStateData = useSelector(
        state => state.ProfilesDataReducerStore?.profilesStateData ?? [],
        shallowEqual
    );

    const loading = useSelector(
        state => state.ProfilesDataReducerStore?.loading
    );

    const [deckKey, setDeckKey] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // ✅ Separate animations
    const outgoingAnim = useRef(new Animated.Value(1)).current;
    const incomingAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (profilesStateData.length > 0) {
            profilesStateData.forEach(profile => {
                if (typeof profile.image === "string") {
                    Image.prefetch(profile.image);
                }
            });
        }
    }, [profilesStateData]);

    // ✅ Proper 2-phase animation
    const triggerSwipeAnimation = useCallback((callback, cardIndex) => {

        // 🔥 PHASE 1 → fade OUT current card
        outgoingAnim.setValue(1);

        Animated.timing(outgoingAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {

            // ✅ call original callback
            callback && callback(cardIndex);

            // 🔥 PHASE 2 → move index & fade IN next card
            setCurrentIndex(prev => {
                const nextIndex = prev + 1;

                incomingAnim.setValue(0);

                Animated.timing(incomingAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();

                return nextIndex;
            });

            // ✅ reset outgoing
            outgoingAnim.setValue(1);
        });

    }, [outgoingAnim, incomingAnim]);

    const handleSwipedRight = useCallback((index) => {
        triggerSwipeAnimation(onSwipedRight, index);
    }, [onSwipedRight, triggerSwipeAnimation]);

    const handleSwipedLeft = useCallback((index) => {
        triggerSwipeAnimation(onSwipedLeft, index);
    }, [onSwipedLeft, triggerSwipeAnimation]);

    const handleSwipedAll = useCallback(() => {
        setDeckKey(prev => prev + 1);
        setCurrentIndex(0);
        outgoingAnim.setValue(1);
        incomingAnim.setValue(1);
    }, []);

    const renderCard = useCallback((item, index) => {
        if (!item) return <View />;

        const isCurrent = index === currentIndex;
        const isPrevious = index === currentIndex - 1;

        return (
            <Animated.View
                style={{
                    opacity: isCurrent
                        ? incomingAnim     // ✅ fade IN new front card
                        : isPrevious
                            ? outgoingAnim // ✅ fade OUT old card
                            : 1,
                }}
            >
                <SwipeCard profile={item} />
            </Animated.View>
        );
    }, [currentIndex, outgoingAnim, incomingAnim]);

    if (loading) return <ActivityIndicator size="large" color="#ccc" />;

    if (!profilesStateData || profilesStateData.length === 0)
        return <ActivityIndicator size="large" color="#ccc" />;

    return (
        <View style={styles.container}>
            <Swiper
                key={deckKey}
                ref={ref}
                cards={profilesStateData}
                renderCard={renderCard}
                onSwipedRight={handleSwipedRight}
                onSwipedLeft={handleSwipedLeft}
                onSwipedAll={handleSwipedAll}
                stackSize={3}
                backgroundColor="transparent"
                cardHorizontalMargin={0}
                cardVerticalMargin={50}
                useViewOverflow={false}
                swipeAnimationDuration={200} // match outgoing
                outputRotationRange={["-10deg", "0deg", "10deg"]}
                infinite={false}
                disableTopSwipe
                disableBottomSwipe
            />
        </View>
    );
});

export default SwiperSlider;


const styles = StyleSheet.create({
    container: { flex: 1 },
});