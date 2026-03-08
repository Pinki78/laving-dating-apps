import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const LogoText = (props) => {
    const { LogoHeader, Summary, headerStyle, summaryStyle,logoStyle } = props;
    return (
        <>
            <View style={[styles.wrapplogo]}>
                <Image source={require("../../assets/image/logo.png")} style={[
                    styles.logo,logoStyle,
                    { width: 100, height: 100 }
                ]}
                    accessible={true}
                    accessibilityLabel="logo"
                />

                <Text style={[styles.header, headerStyle]}>{LogoHeader}</Text>
                <Text style={[styles.summary, summaryStyle]}>{Summary}</Text>

            </View>
        </>
    )
}

export default LogoText

const styles = StyleSheet.create({
    wrapplogo:{
        marginBottom:20,
        textAlign:'center',
         alignItems: 'center',
        
    },
    header:{
        marginTop: 15,
    }
})