import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet, Text, View, Image, ActivityIndicator,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SwipeCardIconInfo from "./swipe-card-icon-info";
import { useState, memo, useMemo } from 'react';

const SwipeCard = memo(({ profile }) => {
 const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // ✅ useMemo prevents new object reference on every render
  const imageSource = useMemo(() => (
    typeof profile.image === 'string'
      ? { uri: profile.image }
      : profile.image
  ), [profile.image]);

  return (
    <View style={styles.card}>

      <View style={styles.cardImageWrapper}>

        {/* Location pill */}
        <View style={styles.cardMapContainer}>
          <View style={styles.cardMap}>
            <EvilIcons name="location" size={15} color="#fff" />
            <Text style={styles.cardMapText}>{profile.location}</Text>
          </View>
        </View>

        <View style={styles.imageWrapper}>

          {/* Spinner while loading */}
          {imageLoading && !imageError && (
            <View style={styles.imagePlaceholder}>
              <ActivityIndicator size="large" color="#ccc" />
            </View>
          )}

          {/* Fallback if image fails */}
          {imageError && (
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: "#aaa" }}>No Image</Text>
            </View>
          )}

          <Image
            source={imageSource}
            style={[styles.image, imageError && { opacity: 0 }]}
            resizeMode="cover"
            onLoadStart={() => setImageLoading(true)}
            onLoadEnd={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.93)"]}
            locations={[0, 1]}
            style={styles.gradient}
          />
        </View>
      </View>

      {/* Name + icons row */}
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
});

export default SwipeCard;

const styles = StyleSheet.create({
  // ✅ Card fills parent cardWrap fully
  card: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // ✅ Image area fills card
  cardImageWrapper: {
    flex: 1,
    position: 'relative',
  },

  // ✅ Image wrapper fills cardImageWrapper
  imageWrapper: {
    flex: 1,
  },

  // ✅ Image fills imageWrapper — no hardcoded height
  image: {
    width: '100%',
    flex: 1,
  },

  imagePlaceholder: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    zIndex: 1,
  },

  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  cardMapContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    gap: 8,
    zIndex: 9,
  },

  cardMap: {
    backgroundColor: '#000000a1',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  cardMapText: {
    color: '#fff',
    fontSize: 11,
    fontFamily: 'Urbanist_600SemiBold',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  infoLeft: {
    flex: 1,
  },

  nameTitle: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 15,
  },

  profession: {
    fontWeight: '600',
    fontFamily: 'Urbanist_600SemiBold',
    fontSize: 11,
    color: '#9b9b9b',
  },
});