import React, { useRef } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function TinderSwiper({ data }) {
  const position = useRef(new Animated.ValueXY()).current;

  const handleSwipe = (dir) => {
    switch (dir) {
      case 'LEFT':
        console.log('👎 Dislike');
        break;
      case 'RIGHT':
        console.log('❤️ Like');
        break;
      case 'UP':
        console.log('⭐ Super Like');
        break;
      case 'DOWN':
        console.log('📥 Save / Info');
        break;
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      // 🔥 MOVE CARD SLIGHTLY WITH FINGER
      onPanResponderMove: (_, gesture) => {
        position.setValue({
          x: gesture.dx * 0.3,
          y: gesture.dy * 0.3,
        });
      },

      // 🔥 DETECT DIRECTION + SNAP BACK
      onPanResponderRelease: (_, gesture) => {
        const { dx, dy } = gesture;

        let direction = null;

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 50) direction = 'RIGHT';
          else if (dx < -50) direction = 'LEFT';
        } else {
          if (dy > 50) direction = 'DOWN';
          else if (dy < -50) direction = 'UP';
        }

        if (direction) {
          console.log('Direction:', direction);
          handleSwipe(direction);
        }

        // 🔁 SNAP BACK
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // 🔥 ROTATION (nice UI effect)
  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.card, cardStyle]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.text}>Swipe Me</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: SCREEN_HEIGHT * 0.5,
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#333',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});