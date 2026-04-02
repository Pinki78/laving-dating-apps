import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View, Image, Pressable, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons, MaterialIcons, FontAwesome, Foundation } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const SwipeCard = () => {
const navigation = useNavigation();
    const dispatch = useDispatch();

    const { profilesStateData, loading } =
        useSelector((state) => state.ProfilesDataReducerStore);

    //  console.log('DATA:', JSON.stringify(profilesStateData[0], null, 2));

    if (loading) return <Text>Loading...</Text>;

    if (!profilesStateData || profilesStateData.length === 0)
        return <Text>No profiles</Text>;

    return (
        <>
            {profilesStateData.map((profile) => {

                console.log(profile.id);


                return (
                    <View key={profile.id} style={[styles.card,]}>


                        {/* 👇 only render Image if uri is a valid string */}
                        <View>
                            <Image
                                source={profile.image}
                                style={styles.image}
                                resizeMode="cover"
                            />
                            {/* 🔥 Gradient Overlay */}
                            <LinearGradient
                                colors={["transparent", "rgba(0,0,0,0.93)"]}
                                locations={[0, 1]}
                                style={styles.gradient}
                            />
                        </View>


                        <View style={styles.infoRow}>
                            <View style={styles.infoLeft}>
                                <Text style={styles.nameTitle}>{profile.title}, {profile.age}</Text>
                                <Text style={styles.profession}>{profile.profesional}</Text>
                            </View>

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

                        </View>


                    </View>
                );
            })}
        </>
    )
}

export default SwipeCard

const styles = StyleSheet.create({

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
    gradient: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50%", // 👈 control gradient height
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    card: {

        borderRadius: 20,
        overflow: 'hidden',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'rgba(0,0,0,0.45)',
    },
    nameTitle: {
        color: "#fff",
        fontWeight: "600",
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 15,
    },
    profession: {

        fontWeight: "600",
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 11,
        color: "#9b9b9b"
    },
    image: { width: '100%', height: 450 },
    infoIcons: {
        flexDirection: 'row',
        gap: 9,
        position: 'absolute',
        top: -15,
        right: 10,
    }
});