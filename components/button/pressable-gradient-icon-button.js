import { StyleSheet, Text, Pressable , Image } from 'react-native'
import { Ionicons } from "@expo/vector-icons"; // works on both
import { LinearGradient } from "expo-linear-gradient";
import { Platform } from "react-native";

/* ✅ Define Props */



const PressableIconButtonGradient = (props) => {

  const { PressableClass, ButtonTitleClass ,ButtonTitle, onPress, imageClass, imageSource, iconName, ClassiconName, altText } = props;

  return (
    <>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "#ffffff40" }}
        style={({ pressed }) => [
          styles.wrapper,
         PressableClass,
          pressed && styles.pressed,
          Platform.OS === "ios" && pressed && { opacity: 0.8 }, // 👈 opacity 0.8 on iOS
        ]}
      >
        <LinearGradient
          colors={["#E44358", "#F32944"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.gradient}
        >
          {imageSource ? (
          <Image source={imageSource} accessible={true} accessibilityLabel={altText}  style={[styles.image , imageClass ]} />
        ) : iconName ? (
          <Ionicons name={iconName} size={20} color="#fff" style={[styles.icon , ClassiconName ]}  />
        ) : null}

          <Text style={[styles.text, ButtonTitleClass]}>{ButtonTitle}</Text>
        </LinearGradient>
      </Pressable>
    </>
  )
}

export default PressableIconButtonGradient

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 30,
    overflow: "hidden", // required for ripple clipping
    marginBottom: 16,
  },
  pressed: {
    opacity: 0.8, // 👈 this is your "Opacity 8"
  },
  gradient: {
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 30,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
     fontFamily: 'Urbanist_600SemiBold',
        fontSize: 18,
  },
   image: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
  },
});
