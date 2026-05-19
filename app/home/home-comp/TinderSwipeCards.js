import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import photoCards from './photoCards';

const { width, height } = Dimensions.get('window');

const SWIPE_THRESHOLD = 120;

const TinderSwipeCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const position = useRef(new Animated.ValueXY()).current;

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  const animatedCardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate },
    ],
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  const goToNextCard = () => {
    setCurrentIndex((prev) => prev + 1);
    position.setValue({ x: 0, y: 0 });
  };

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -width - 200, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => goToNextCard());
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: width + 200, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => goToNextCard());
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const handleButtonPress = (type) => {
    if (type === 'left') {
      swipeLeft();
    } else {
      swipeRight();
    }
  };

  const renderCards = () => {
    if (currentIndex >= photoCards.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreText}>No More Cards</Text>
        </View>
      );
    }

    return photoCards
      .map((item, index) => {
        if (index < currentIndex) return null;

        if (index === currentIndex) {
          return (
            <Animated.View
              key={item.key}
              style={[styles.card, animatedCardStyle]}
              {...panResponder.panHandlers}
            >
              <Image source={item.photo} style={styles.image} />

              <View style={styles.cardInfo}>
                <Text style={styles.name}>
                  {item.name}, {item.age}
                </Text>
              </View>
            </Animated.View>
          );
        }

        return (
          <View
            key={item.key}
            style={[
              styles.card,
              {
                top: 10 * (index - currentIndex),
                zIndex: -index,
              },
            ]}
          >
            <Image source={item.photo} style={styles.image} />
          </View>
        );
      })
      .reverse();
  };

  return (
    <View style={styles.container}>
      {renderCards()}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('left')}
        >
          <Text style={styles.buttonText}>NOPE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress('right')}
        >
          <Text style={styles.buttonText}>LIKE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TinderSwipeCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    alignItems: 'center',
  },

  card: {
    width: width * 0.9,
    height: height * 0.68,
    borderRadius: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    overflow: 'hidden',
    elevation: 5,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  cardInfo: {
    position: 'absolute',
    bottom: 30,
    left: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },

  buttonContainer: {
    position: 'absolute',
    bottom: 60,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    width: 120,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  noMoreCards: {
    marginTop: 200,
  },

  noMoreText: {
    fontSize: 22,
    fontWeight: '700',
  },
});