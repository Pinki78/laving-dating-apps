import React, { useRef, useState, useEffect } from 'react';
import {
  Animated, PanResponder, StyleSheet,
  View, Text, Dimensions, TouchableOpacity, SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import SwipeCard from './swipe-card';
const { width: SW, height: SH } = Dimensions.get('window');
const THRESHOLD = 80;
const FLY_MS = 280;

export default function TinderSwiper() {
  const { profilesStateData } = useSelector(s => s.ProfilesDataReducerStore);
  const [idx, setIdx] = useState(0);

  const pos = useRef(new Animated.ValueXY()).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;
  const flashColor = useRef('#ff4d6e0');
  const swiping = useRef(false);

  useEffect(() => {
    pos.setValue({ x: 0, y: 0 });
    flashOpacity.setValue(0);
    swiping.current = false;
  }, [idx]);

  const triggerFlash = (color, cb) => {
    flashColor.current = color;
    Animated.sequence([
      Animated.timing(flashOpacity, { toValue: 0.55, duration: 80,  useNativeDriver: true }),
      Animated.timing(flashOpacity, { toValue: 0,    duration: 180, useNativeDriver: true }),
    ]).start(cb);
  };

  const flyOut = (direction) => {
    if (swiping.current) return;
    swiping.current = true;
    const targets = {
      LEFT:  { x: -SW * 1.6, y: 0 },
      RIGHT: { x:  SW * 1.6, y: 0 },
      UP:    { x: 0, y: -SH  },
    };
    const colors = { LEFT: '#555', RIGHT: '#ff4d6d', UP: '#FFD700' };
    triggerFlash(colors[direction], () => {
      Animated.timing(pos, {
        toValue: targets[direction],
        duration: FLY_MS,
        useNativeDriver: false,
      }).start(() => setIdx(p => p + 1));
    });
  };

  const snapBack = () =>
    Animated.spring(pos, { toValue: { x: 0, y: 0 }, friction: 5, useNativeDriver: false }).start();

  const pan = useRef(PanResponder.create({
    onStartShouldSetPanResponder: () => !swiping.current,
    onPanResponderMove: (_, { dx, dy }) => pos.setValue({ x: dx * 0.65, y: dy * 0.4 }),
    onPanResponderRelease: (_, { dx, dy }) => {
      const ax = Math.abs(dx), ay = Math.abs(dy);
      if (ax > ay) {
        if (dx > THRESHOLD)       flyOut('RIGHT');
        else if (dx < -THRESHOLD) flyOut('LEFT');
        else snapBack();
      } else {
        if (dy < -THRESHOLD)      flyOut('UP');
        else snapBack();
      }
    },
  })).current;

  const rotate = pos.x.interpolate({
    inputRange: [-SW / 2, 0, SW / 2],
    outputRange: ['-12deg', '0deg', '12deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity  = pos.x.interpolate({ inputRange: [0, 80],   outputRange: [0, 1], extrapolate: 'clamp' });
  const nopeOpacity  = pos.x.interpolate({ inputRange: [-80, 0],  outputRange: [1, 0], extrapolate: 'clamp' });
  const superOpacity = pos.y.interpolate({ inputRange: [-80, 0],  outputRange: [1, 0], extrapolate: 'clamp' });

  if (!profilesStateData || idx >= profilesStateData.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No more profiles</Text>
      </View>
    );
  }

  const profiles = profilesStateData.slice(idx, idx + 3);

  return (
    <View  style={styles.root}>

      {/* Flash overlay */}
      <Animated.View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: flashColor.current, opacity: flashOpacity, zIndex: 99 },
        ]}
      />

      {/* Card stack — takes all remaining space */}
      <View style={styles.stack}>
        {[...profiles].reverse().map((profile, ri) => {
          const i = profiles.length - 1 - ri;

          if (i === 0) {
            return (
              <Animated.View
                key={profile.id}
                style={[styles.cardWrap, {
                  transform: [
                    { translateX: pos.x },
                    { translateY: pos.y },
                    { rotate },
                  ],
                  zIndex: 10,
                }]}
                {...pan.panHandlers}
              >
                {/* Stamps */}
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
                bottom: 0,                        // ✅ same top as front card
                transform: [
                  { scale: 1 - i * 0.07 },    // ✅ slightly smaller = looks behind
                ],
                zIndex: 10 - i,
              }]}
            >
              <SwipeCard profile={profile} />
            </Animated.View>
          );
        })}
      </View>

      {/* Action buttons — pinned to bottom */}
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

const CARD_HEIGHT = SH * 0.58; // ✅ card takes 72% of screen height
const PEEK = 14;       
const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 12,
  },
  stack: {
    width: SW - 32,
    height: CARD_HEIGHT + PEEK * 2,   // ✅ extra room so peek is visible
    position: 'relative',
  },
  cardWrap: {
    position: 'absolute',
    width: '100%',
    height: CARD_HEIGHT,              // ✅ fixed height
    left: 0,
    borderRadius: 20,
    overflow: 'hidden',               // ✅ clips the card corners
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
    overflow: 'hidden',
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