import React, { useRef, useState, useEffect } from 'react';
import {
  Animated, PanResponder, StyleSheet,
  View, Text, Dimensions, TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import SwipeCard from './swipe-card';

const { width: SW, height: SH } = Dimensions.get('window');
const THRESHOLD = 80;
const FLY_MS = 280;
const CARD_HEIGHT = SH * 0.68;

export default function TinderSwiper() {
  const { profilesStateData } = useSelector(s => s.ProfilesDataReducerStore);
  const [idx, setIdx] = useState(0);

  // ✅ Use separate X and Y values — allows useNativeDriver: true
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const swiping = useRef(false);

  useEffect(() => {
    translateX.setValue(0);
    translateY.setValue(0);
    swiping.current = false;
  }, [idx]);

  const flyOut = (direction) => {
    if (swiping.current) return;
    swiping.current = true;

    const targets = {
      LEFT:  { x: -SW * 1.6, y: 0 },
      RIGHT: { x:  SW * 1.6, y: 0 },
      UP:    { x: 0,          y: -SH },
    };

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: targets[direction].x,
        duration: FLY_MS,
        useNativeDriver: true, // ✅ native thread — no flicker
      }),
      Animated.timing(translateY, {
        toValue: targets[direction].y,
        duration: FLY_MS,
        useNativeDriver: true, // ✅
      }),
    ]).start(() => setIdx(p => p + 1));
  };

  const snapBack = () => {
    Animated.parallel([
      Animated.spring(translateX, { toValue: 0, friction: 5, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, friction: 5, useNativeDriver: true }),
    ]).start();
  };

  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => !swiping.current,
    onPanResponderMove: (_, { dx, dy }) => {
      translateX.setValue(dx * 0.65);
      translateY.setValue(dy * 0.4);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      const ax = Math.abs(dx), ay = Math.abs(dy);
      if (ax > ay) {
        if (dx > THRESHOLD)       flyOut('RIGHT');
        else if (dx < -THRESHOLD) flyOut('LEFT');
        else snapBack();
      } else {
        if (dy < -THRESHOLD) flyOut('UP');
        else snapBack();
      }
    },
  })).current;

  // ✅ All interpolations from native-driven values
  const rotate = translateX.interpolate({
    inputRange: [-SW / 2, 0, SW / 2],
    outputRange: ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = translateX.interpolate({
    inputRange: [0, 80],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = translateX.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const superOpacity = translateY.interpolate({
    inputRange: [-80, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (!profilesStateData || idx >= profilesStateData.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No more profiles</Text>
      </View>
    );
  }

  const profiles = profilesStateData.slice(idx, idx + 3);

  return (
    <View style={styles.root}>
      <View style={styles.stack}>
        {[...profiles].reverse().map((profile, ri) => {
          const i = profiles.length - 1 - ri;

          if (i === 0) {
            return (
              <Animated.View
                key={profile.id}
                style={[styles.cardWrap, {
                  transform: [
                    { translateX },   // ✅ native driver
                    { translateY },   // ✅ native driver
                    { rotate },       // ✅ interpolated from native value
                  ],
                  zIndex: 10,
                }]}
                {...pan.panHandlers}
              >
                <Animated.View style={[styles.stamp, styles.likeStamp, { opacity: likeOpacity }]}>
                  <Text style={styles.likeText}>LIKE</Text>
                </Animated.View>
                <Animated.View style={[styles.stamp, styles.nopeStamp, { opacity: nopeOpacity }]}>
                  <Text style={styles.nopeText}>NOPE</Text>
                </Animated.View>
                <Animated.View style={[styles.stamp, styles.superStamp, { opacity: superOpacity }]}>
                  <Text style={styles.superText}>SUPER</Text>
                </Animated.View>

                <SwipeCard profile={profile} />
              </Animated.View>
            );
          }

          return (
            <Animated.View
              key={profile.id}
              pointerEvents="none"
              style={[styles.cardWrap, {
                bottom: 0,
                transform: [{ scale: 1 - i * 0.05 }],
                zIndex: 10 - i,
              }]}
            >
              <SwipeCard profile={profile} />
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => flyOut('LEFT')}>
          <Text style={styles.btnIconGray}>✕</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnPrimary} onPress={() => flyOut('RIGHT')}>
          <Text style={styles.btnIconWhite}>♥</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnSecondary} onPress={() => flyOut('UP')}>
          <Text style={styles.btnIconGold}>★</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 12,
  },

  // ✅ Fixed height container — buttons always know where they are
  stack: {
    width: SW - 32,
    height: CARD_HEIGHT,
    position: 'relative',
  },

  // ✅ Cards absolutely fill the stack
  cardWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: '#999' },

  stamp: {
    position: 'absolute',
    top: 40,
    zIndex: 20,
    borderWidth: 3,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  likeStamp:  { left: 20,  borderColor: '#ff4d6d', transform: [{ rotate: '-15deg' }] },
  nopeStamp:  { right: 20, borderColor: '#444',    transform: [{ rotate: '15deg'  }] },
  superStamp: { alignSelf: 'center', borderColor: '#FFD700' },
  likeText:  { color: '#ff4d6d', fontWeight: '800', fontSize: 28, letterSpacing: 2 },
  nopeText:  { color: '#444',    fontWeight: '800', fontSize: 28, letterSpacing: 2 },
  superText: { color: '#FFD700', fontWeight: '800', fontSize: 28, letterSpacing: 2 },

  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 20,
  },
  btnSecondary: {
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: '#fff',
    alignItems: 'center', justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8,
  },
  btnPrimary: {
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: '#ff4d6d',
    alignItems: 'center', justifyContent: 'center',
    elevation: 6,
    shadowColor: '#ff4d6d', shadowOpacity: 0.4, shadowRadius: 14,
  },
  btnIconGray:  { fontSize: 22, color: '#888' },
  btnIconWhite: { fontSize: 30, color: '#fff' },
  btnIconGold:  { fontSize: 22, color: '#FFD700' },
});