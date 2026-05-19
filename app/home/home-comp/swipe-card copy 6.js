import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome,
  Foundation,
  EvilIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SwipeCardIconInfo from "./swipe-card-icon-info";

const SwipeCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

//   const { profilesStateData, loading } = useSelector(
//     (state) => state.ProfilesDataReducerStore,
//   );

  //  console.log('DATA:', JSON.stringify(profilesStateData[0], null, 2));

//   if (loading) return <Text>Loading...</Text>;

//   if (!profilesStateData || profilesStateData.length === 0)
//     return <Text>No profiles</Text>;

  return (
    <>
      {profilesStateData.map((profile) => {
        // console.log(profile.id);

        return (
          <View key={profile.id} style={[styles.card]}>
            {/* 👇 only render Image if uri is a valid string */}
            <View style={[styles.cardImageWrapper]}>
              <View style={styles.cardMapContainer}>
                <View style={styles.cardMap}>
                  <EvilIcons name="location" size={15} color="#fff" />
                  <Text style={styles.cardMapText}>{profile.location}</Text>
                </View>
              </View>

              {/* imageWrapper */}

              <View style={[styles.imageWrapper]}>
                <Image
                  source={profile.image}
                  style={styles.image}
                  resizeMode="cover"
                />
                {/* 🔥 Gradient Overlay */}
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.93)"]}
                  locations={[0, 1]}
                  style={styles.gradient}
                />
              </View>
            </View>

            {/* infoRow */}

            <View style={styles.infoRow}>
              <View style={styles.infoLeft}>
                <Text style={styles.nameTitle}>
                  {profile.title}, {profile.age}
                </Text>
                <Text style={styles.profession}>{profile.profesional}</Text>
              </View>

              <SwipeCardIconInfo profile={profile} />
            </View>
          </View>
        );
      })}
    </>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  cardMapContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    gap: 8,
    zIndex: 9,
  },
  cardMap: {
    backgroundColor: "#000000a1",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    flexDirection: "row", // 👈 IMPORTANT
    alignItems: "center",
    gap: 4,
  },

  cardMapText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Urbanist_600SemiBold",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%", // 👈 control gradient height
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  nameTitle: {
    color: "#fff",
    fontWeight: "600",
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 15,
  },
  profession: {
    fontWeight: "600",
    fontFamily: "Urbanist_600SemiBold",
    fontSize: 11,
    color: "#9b9b9b",
  },
  image: { width: "100%", height: 450 },
});
