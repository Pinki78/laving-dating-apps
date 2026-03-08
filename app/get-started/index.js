import { View, StyleSheet } from 'react-native'
import LetsYouIn from './com-get-started/lets-you-in'
// import COLORS from '../assets/style/color'
import { SafeAreaView } from 'react-native-safe-area-context'

const GetStartedIndex = () => {
  return (
    <>
      <SafeAreaView style={[styles.container , styles.LetYouIn]}>
      
          <LetsYouIn />
        
      </SafeAreaView>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    // backgroundColor: COLORS.whiteSmoke,
  },

  LetYouIn:{
    justifyContent:'center',
    // alignItems:'center',

  }
  
});

export default GetStartedIndex