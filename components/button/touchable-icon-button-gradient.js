import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons"; // works on both
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";
const TouchableIconButton = (props) => {

  const {Touchabletext, TouchableGradient , ButtonTitle, onPress, imageClass, imageSource, iconName, ClassiconName, altText } = props;

  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        android_ripple={{ color: "#ffffff40" }}
         activeOpacity={0.7} // ✅ THIS is the correct way

        style={({ pressed }) => [
          styles.wrapper,
          pressed && styles.buttonHovered, //
          // Platform.OS === "ios" && pressed && { opacity: 0.7 },
          //  Platform.OS === "android" && pressed && { opacity: 0.7 },
        ]}
      >
        <LinearGradient
          colors={["#E44358", "#F32944"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={[styles.gradient, TouchableGradient]} // ✅ Apply buttonGradient style
        >
          <Ionicons name={iconName} size={20} color="#fff" style={[styles.icon, ClassiconName]} />
          {ButtonTitle ? (
            <Text style={[styles.text, Touchabletext]}>
              {ButtonTitle}
            </Text>
          ) : null}
        </LinearGradient>
      </TouchableOpacity>
    </>
  )
}

export default TouchableIconButton

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    overflow: "hidden", // 👈 required for ripple clipping
    marginBottom: 16,
  },

  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 30,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center"
  },

  text: {
    color: "#fff",
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "600",

  },

})