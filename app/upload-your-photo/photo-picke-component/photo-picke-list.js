import {
    View,
    StyleSheet,
    Pressable,
    Image,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../../assets/style/color";
import PressableIconButtonGradient from "../../../components/button/pressable-gradient-icon-button";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { removePhoto , pickImageThunk, savePhoto} from "../../../assets/react-redux-store/store-component/photos-picke-slice";

const GAP = 12;

const PhotoPickeList = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();


    const { photoListSelector } = useSelector((state) => state.PhotosPickeReducerStore);


    /* ---------------- PHOTO BOX COMPONENT ---------------- */

    const PhotoBox = ({ index, style, iconSize }) => (
        <Pressable
            style={style}
            onPress={() => dispatch(pickImageThunk(index))}
        >
            {photoListSelector[index] ? (
                <>
                    <Image
                        source={{ uri: photoListSelector[index] }}
                        style={styles.image}
                    />

                    {/* DELETE BUTTON */}
                    <Pressable
                        style={styles.deleteBtn}
                        onPress={(e) => {
                            e.stopPropagation();
                            dispatch(removePhoto(index));
                        }}

                    >
                        <Ionicons name="close" size={18} color="#fff" />
                    </Pressable>
                </>
            ) : (
                <Ionicons
                    name="add"
                    size={iconSize}
                    color={COLORS.pinkiDark}
                />
            )}
        </Pressable>
    );

/* ---------------- PHOTO seve ---------------- */
const handleContinue = async () => {
  try {
    if (!photoListSelector.some(Boolean)) {
      Alert.alert("Upload at least one photo");
      return;
    }

    // 🔥 CALL SAVE FIRST
    const resultAction = await dispatch(savePhoto());

    if (savePhoto.fulfilled.match(resultAction)) {
      console.log("Saved successfully");

      // ✅ Navigate AFTER save
      navigation.replace("location-pick");
    } else {
      Alert.alert(resultAction.payload || "Failed to save photos");
    }
  } catch (error) {
    console.log("Save error:", error);
  }
};

    return (
        <>
            <View style={styles.wrapper}>
                <View style={styles.topRow}>
                    <PhotoBox
                        index={0}
                        style={styles.bigBox}
                        iconSize={34}
                    />

                    <View style={styles.rightCol}>
                        <PhotoBox
                            index={1}
                            style={styles.rightBox}
                            iconSize={26}
                        />
                        <PhotoBox
                            index={2}
                            style={styles.rightBox}
                            iconSize={26}
                        />
                    </View>
                </View>

                <View style={styles.bottomRow}>
                    <PhotoBox
                        index={3}
                        style={styles.bottomBox}
                        iconSize={26}
                    />
                    <PhotoBox
                        index={4}
                        style={styles.bottomBox}
                        iconSize={26}
                    />
                    <PhotoBox
                        index={5}
                        style={styles.bottomBox}
                        iconSize={26}
                    />
                </View>
            </View>

            <PressableIconButtonGradient
            ButtonTitle="Continue"
            onPress={handleContinue}
            disabled={!photoListSelector.some(Boolean)}
            PressableClass={[
                { marginTop: 20 },
                !photoListSelector.some(Boolean) && { opacity: 0.5 },
            ]}
            />
        </>
    )
}

export default PhotoPickeList

const styles = StyleSheet.create({
  wrapper: {
    gap: GAP,
    marginTop: 20,
    marginBottom: 20,
  },

  topRow: {
    flexDirection: "row",
    gap: GAP,
    height: 220,
  },

  bigBox: {
    flex: 2,
    borderRadius: 18,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.pinkiDark,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  rightCol: {
    flex: 1,
    gap: GAP,
  },

  rightBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.pinkiDark,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  bottomRow: {
    flexDirection: "row",
    gap: GAP,
    height: 90,
  },

  bottomBox: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: COLORS.pinkiDark,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  deleteBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    padding: 4,
  },
});
