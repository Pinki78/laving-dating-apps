import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CommpantText = (props) => {
     const {HeaderIingText, SummaryText, headerTextStyle, summaryStyle, } = props;
  return (
    <>
    <View style={[styles.wrappText]}>
        
        <Text style={[styles.header, headerTextStyle]}>{HeaderIingText}</Text>
        <Text style={[styles.summary, summaryStyle]}>{SummaryText}</Text>

    </View>
    </>
  )
}

export default CommpantText


const styles = StyleSheet.create({
    wrappText:{
        marginBottom:50,
        textAlign:'center',
         alignItems: 'center',
        
    },
    header:{
        marginBottom: 15,
        fontSize:25,
        fontFamily:'Urbanist_700Bold'
    },
    summary:
    {
        fontFamily:'Mulish_400Regular',
        textAlign:'center',
        fontSize:12,
    }
})