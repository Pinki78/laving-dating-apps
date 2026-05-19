import React, { useRef, useState } from 'react'
import { Animated, View, StyleSheet } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import photoCards from './photoCards'
import Card from './Card'
import OverlayLabel from './OverlayLabel'
import IconButton from './IconButton'

const SwiperBox = () => {
  const swiperRef = useRef(null)
  const dragX = useRef(new Animated.Value(0)).current
  const currentIndexRef = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const renderCount = useRef({})
  const swipedTime = useRef(null)

  const handleOnSwipedLeft = () => swiperRef.current?.swipeLeft()
  const handleOnSwipedTop = () => swiperRef.current?.swipeTop()
  const handleOnSwipedRight = () => swiperRef.current?.swipeRight()

  // ✅ Safe helper — never crashes on undefined card
  const safeCardLog = (card) => {
    if (!card) return 'No card'
    return JSON.stringify(card)
  }

  const cardOpacity = dragX.interpolate({
    inputRange: [-200, -50, 0, 50, 200],
    outputRange: [0.6, 0.8, 1, 0.8, 0.6],
    extrapolate: 'clamp',
  })

  const renderCard = (card, index) => {
    if (!card) return null  // ✅ guard undefined card

    const isCurrentCard = index === currentIndexRef.current
    const isOldCard = index < currentIndexRef.current
    const isNextCard = index === currentIndexRef.current + 1

    if (!renderCount.current[index]) renderCount.current[index] = 0
    renderCount.current[index] += 1

    const now = Date.now()
    const timeSinceSwipe = swipedTime.current
      ? `${now - swipedTime.current}ms after swipe`
      : 'before any swipe'

    const currentCardData = photoCards[currentIndexRef.current]
    const nextCardData = photoCards[currentIndexRef.current + 1]

    if (isOldCard) {
      console.log('----------------------------------')
      console.log(`🔴 OLD CARD SHOWING`)
      console.log(`   Card Index      : ${index}`)
      console.log(`   Card Data       : ${safeCardLog(card)}`)
      console.log(`   Current Index   : ${currentIndexRef.current}`)
      console.log(`   Render Count    : ${renderCount.current[index]} times`)
      console.log(`   Time Since Swipe: ${timeSinceSwipe}`)
      console.log('----------------------------------')
    }

    if (isCurrentCard) {
      console.log(`🟢 CURRENT CARD : index ${index} | renders: ${renderCount.current[index]} | ${timeSinceSwipe}`)
      console.log(`   👤 Showing Now : ${safeCardLog(currentCardData)}`)
      console.log(`   👁  Next Up    : ${safeCardLog(nextCardData)}`)
    }

    if (isNextCard) {
      console.log(`🔵 NEXT CARD    : index ${index} | renders: ${renderCount.current[index]} | ${timeSinceSwipe}`)
      console.log(`   📋 Next Data  : ${safeCardLog(card)}`)
    }

    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: isOldCard ? 0 : isCurrentCard ? cardOpacity : 1,
        }}
        pointerEvents={isOldCard ? 'none' : 'auto'}
      >
        <Card card={card} />
      </Animated.View>
    )
  }

  return (
    <>
      <Swiper
        ref={swiperRef}
        cards={photoCards}
        renderCard={renderCard}

        keyExtractor={(card, index) => {
          if (!card) return `card-${index}`                          // ✅ guard undefined card
          if (card.id !== undefined && card.id !== null)             // ✅ guard undefined id
            return `card-${card.id.toString()}`
          return `card-${index}`                                     // ✅ fallback
        }}

        onSwiping={(x) => {
          if (!swipedTime.current) {
            swipedTime.current = Date.now()
            console.log(`⚡ SWIPE STARTED : ${new Date().toISOString()}`)
            console.log(`   📤 Swiping Away : ${safeCardLog(photoCards[currentIndexRef.current])}`)
            console.log(`   📥 Coming Next  : ${safeCardLog(photoCards[currentIndexRef.current + 1])}`)
          }
          dragX.setValue(x)
        }}

        onSwiped={(index) => {
          const now = Date.now()
          console.log(`✅ SWIPED DONE   : card ${index} | took ${swipedTime.current ? now - swipedTime.current : 'unknown'}ms`)
          console.log(`   🗑  Removed Card : ${safeCardLog(photoCards[index])}`)
          console.log(`   🟢 Now Showing  : ${safeCardLog(photoCards[index + 1])}`)
          console.log(`   🔵 Next In Line : ${safeCardLog(photoCards[index + 2])}`)

          swipedTime.current = null
          dragX.setValue(0)
          currentIndexRef.current = index + 1
          setCurrentIndex(index + 1)
        }}

        onSwipedAborted={() => {
          // ✅ safeCardLog handles undefined — no more crash here
          console.log(`❌ SWIPE ABORTED`)
          console.log(`   ↩️  Back To : ${safeCardLog(photoCards[currentIndexRef.current])}`)

          swipedTime.current = null
          Animated.spring(dragX, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }}

        cardIndex={0}
        backgroundColor="transparent"
        stackSize={3}
        stackSeparation={0}
        showSecondCard={true}
        animateCardOpacity
        animateOverlayLabelsOpacity
        useViewOverflow={false}
        containerStyle={styles.container}
        overlayOpacityHorizontalThreshold={10}
        overlayOpacityVerticalThreshold={10}
        swipeAnimationDuration={350}
        overlayLabels={{
          left: {
            title: 'NOPE',
            element: <OverlayLabel label="NOPE" color="#E5566D" />,
            style: { wrapper: styles.overlayWrapper },
          },
          right: {
            title: 'LIKE',
            element: <OverlayLabel label="LIKE" color="#4CCC93" />,
            style: {
              wrapper: {
                ...styles.overlayWrapper,
                alignItems: 'flex-start',
                marginLeft: 30,
              },
            },
          },
        }}
        onSwipedAll={() => {
          console.log('🏁 ALL CARDS DONE')
          console.log(`   Total Cards Swiped: ${photoCards.length}`)
        }}
      />

      <View style={styles.buttonsContainer}>
        <IconButton
          name="close"
          onPress={handleOnSwipedLeft}
          color="white"
          backgroundColor="#E5566D"
        />
        <IconButton
          name="star"
          onPress={handleOnSwipedTop}
          color="white"
          backgroundColor="#3CA3FF"
        />
        <IconButton
          name="heart"
          onPress={handleOnSwipedRight}
          color="white"
          backgroundColor="#4CCC93"
        />
      </View>
    </>
  )
}

export default SwiperBox

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  overlayWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    marginTop: 30,
    marginLeft: -30,
  },
})