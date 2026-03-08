
import { StyleSheet, Text, View, FlatList, Pressable, Image, Linking } from 'react-native'
import { Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
const ContinueWith = ({ textUsesrNameLink, headerText, handlePressurl, usesrUp2 }) => {
    const navigation = useNavigation();

    const handlePress = () => navigation.navigate(handlePressurl);
    let Idsocial = 0;

  

    return (
        <>
            <View>
                
                <View style={styles.headerRow}>
                    <View style={styles.line} />
                    <Text style={styles.headerText}>{headerText}</Text>
                    <View style={styles.line} />
                </View>
                
                <View style={[styles.usesrUp, usesrUp2]}>
                    <Text style={[styles.signUptext,]}>Don’t have an account?</Text>

                    <Pressable
                        onPress={handlePress}
                        style={({ pressed }) => [
                            styles.resetHereBtn,
                            {
                                opacity: pressed ? 0.55 : 1,
                                transform: [{ scale: pressed ? 0.97 : 1 }],
                            },
                        ]}
                    >
                        {({ pressed }) => (
                            <Text
                                style={[
                                    styles.btnTextStyles,
                                    { color: pressed ? '#E94057' : '#2A3E93' },
                                ]}
                            >
                                {textUsesrNameLink}
                            </Text>
                        )}
                    </Pressable>


                </View>


            </View>
        </>
    )
}

export default ContinueWith

const styles = StyleSheet.create({

    usesrUp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    signUptext: {
        fontFamily: 'Urbanist_600SemiBold',
        marginRight: 6,
        color: '#555',
    },
    btnTextStyles: {
        fontFamily: 'Urbanist_600SemiBold',
        backgroundColor: 'transparent',
        color: '#E94057',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    headerText: {
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Inter_400Regular',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },

    iconBtn: {
        textAlign: 'center',
        // marginBottom:20,
        borderRadius: 56,
        shadowOffset: { width: 0, height: 8 },
        backgroundColor: "#fdf9f9",
        padding: 10,
        marginRight: 15

    },
    socialRow: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    // btnTextStyles: {
    //     fontFamily: 'Inter_600SemiBold',
    //     textAlign: 'left',
    //     width: '75%',
    // },

    pressed: {
        opacity: 0.75,
    },
    pressedPathe: {
        opacity: 0.55,
    }


});