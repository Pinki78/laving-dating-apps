import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated , Text} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
// import COLORS from '../../../assets/style/color';
export default function ActionButtons(props) {
  const { onDislike, onLike, onSuperLike } = props;
  return (
    <>
      <View style={styles.container}>
        {/* Dislike */}
        <TouchableOpacity
          style={[styles.btn, styles.small , styles.close]}
          onPress={onDislike}
          activeOpacity={0.8}
        >
          <Ionicons name="close" size={24} color="#f10020"/>
        </TouchableOpacity>

        {/* Like - big pink */}
        <TouchableOpacity
          style={[styles.btn, styles.large, styles.heart]}
          onPress={onLike}
          activeOpacity={0.8}
        >
          <Ionicons name="heart" size={34} color="#fff" />
        </TouchableOpacity>

        {/* Super like */}
        <TouchableOpacity
          style={[styles.btn, styles.small , styles.star]}
          onPress={onSuperLike}
          activeOpacity={0.8}
        >
          <AntDesign name="star" size={22} color="#f10020"/>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 16,
    // marginTop:-20,
  },
  btn: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#fff",
    shadowColor: '#000',
    shadowOffset: { width: 0, height:5 },
    shadowOpacity: 0.18,
    shadowRadius: 3.84,
    elevation: 10,
    borderWidth:0,
  },
  small: {
    width: 54,
    height: 54,
    color:"#f10020"
  },
  large: {
    width: 72,
    height: 72,
    backgroundColor:"#f10020"
    // backgroundColor: COLORS.primary,
    // ...SHADOW.button,
  },
});
