import { View, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
const AppHeader = ({ isHome = false }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[
        styles.header,
        { paddingTop: isHome ? 42 : 50 },
        isHome && styles.shadow

      ]}>


        <View>
          {isHome && (
            <Image
              source={require('../../assets/image/logo.png')}
              style={styles.logo}
            />
          )}
          {!isHome && (
            <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
          )}
        </View>



        {/* RIGHT — always same icons */}
        <View style={styles.right}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={22} color="#f10020" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications" size={22} color="#f10020" onPress={() => navigation.navigate("notifications")} />
          </TouchableOpacity>
          {isHome && (
            <TouchableOpacity>
              <Ionicons name="filter-outline" size={22} color="#f10020" />
            </TouchableOpacity>
          )}

        </View>

      </View>
    </>
  )
}

export default AppHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  shadow: {
    // elevation: 0,
    // shadowColor: '#0000000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity:0,
    // shadowRadius: 0,
  },
  right: { flexDirection: 'row', gap: 14 },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  backButton: {

  }
})