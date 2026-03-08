import { StyleSheet, Text, View, } from 'react-native'
import PressableIconButtonGradient from '../../../components/button/pressable-gradient-icon-button'
import { useNavigation } from '@react-navigation/native'
import LogoText from '../../../components/logo-text/logo-and-text';
// import SocialMeadia from './social-meadia'

const LetsYouIn = () => {

    const navigation = useNavigation();

    return (

        <>
            <View>

                <LogoText
                    LogoHeader="Let’s You In"
                    summaryStyle={{ display: "none" }}
                    headerStyle={{
                        fontSize: 16,
                        fontFamily: 'Urbanist_600SemiBold',
                        fontSize: 25,
                    }}
                />

            </View>

            <View>

                <PressableIconButtonGradient
                    ButtonTitle="Log In"
                    onPress={() => navigation.navigate("log-in")}  // change target screen name
                    ButtonTitleClass={[
                        styles.btnTextStylesClass,
                    ]}
                />
                <PressableIconButtonGradient
                    ButtonTitle="Sign In"
                    onPress={() => navigation.navigate("creating-new-users")}  // change target screen name
                    ButtonTitleClass={[
                        styles.btnTextStylesClass,
                    ]}
                />
            </View>
        </>
    )
};

export default LetsYouIn

const styles = StyleSheet.create({
    or: {
        textAlign: 'center',
        marginTop: 24,
        marginBottom: 15
    },
    btnTextStylesClass: {
        fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
    }
})