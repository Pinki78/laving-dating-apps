import { StyleSheet, View,  Pressable, Platform, Text } from 'react-native'
import {  FontAwesome, Foundation, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SwipeCardIconInfo = ({ profile }) => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.infoIcons}>

                <Pressable style={({ pressed }) => [
                    styles.wrapperIocon,
                    pressed && styles.pressedIcon,
                    pressed && Platform.OS === "ios" && { opacity: 0.8 },
                ]}
                    android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: true }}
                >
                    <Foundation name="video" size={15} color="#fff" />
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("messages")}
                    style={({ pressed }) => [
                        styles.wrapperIocon,
                        pressed && styles.pressedIcon,
                        pressed && Platform.OS === "ios" && { opacity: 0.8 },
                    ]}
                    android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: true }}>
                    <Foundation name="comment" size={15} color="#fff" />
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate("about-us", { profileId: profile.id, profile })}
                    style={({ pressed }) => [
                        styles.wrapperIocon,
                        styles.infoIocon,
                        pressed && styles.pressedIcon,
                        pressed && Platform.OS === "ios" && { opacity: 0.8 },
                    ]}
                    android_ripple={{ color: "rgba(255,255,255,0.2)", borderless: true }}>
                    <FontAwesome name="info" size={15} color="#fff" />
                </Pressable>

            </View>
        </>
    )
}

export default SwipeCardIconInfo

const styles = StyleSheet.create({
    infoIcons: {
        flexDirection: 'row',
        gap: 9,
        position: 'absolute',
        top: -15,
        right: 10,
    },
     wrapperIocon: {
        padding: 5,
        paddingHorizontal: 7,
        borderRadius: 50,
        backgroundColor: "#f10020", // 👈 glass effect
        justifyContent: "center",
        alignItems: "center",
    },
    infoIocon: {
        paddingHorizontal: 10,
    },
    pressedIcon: {
        transform: [{ scale: 0.95 }],
        opacity: 0.7,
    },

})