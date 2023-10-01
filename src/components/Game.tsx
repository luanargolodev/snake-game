import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState } from 'react'

import Header from './Header'
import Board from './Board'
import Snake from './Snake'
import Food from './Food'
import { colors } from '../styles/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  COLS,
  FOOD_START,
  HEADER_HEIGHT,
  PIXEL,
  SNAKE_START,
  SPEED,
} from '../consts'
import { Coordinate, Direction } from '../../@types/types'

const { height } = Dimensions.get('window')

export default function Game() {
  const insets = useSafeAreaInsets()
  const ROWS = Math.floor(
    (height - insets.top - insets.bottom - HEADER_HEIGHT) / PIXEL
  )

  const [direction, setDirection] = useState<Direction>(Direction.Right)
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_START)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGamePaused, setIsGamePaused] = useState(false)

  function resetGame() {
    setSnake(SNAKE_START)
    // setFood(FOOD_START)
    setDirection(Direction.Right)
    // setScore(0)
  }

  // useEffect(() => {
  //   if (!isGameOver) {
  //     const speedInterval = setInterval(() => {
  //       !isGamePaused && moveSnake()
  //     }, SPEED)
  //     return () => clearInterval(speedInterval)
  //   } else {
  //     resetGame()
  //   }
  // }, [snake, isGameOver, isGamePaused])

  function handleGesture(event: PanGestureHandlerGestureEvent) {
    const { translationX, translationY } = event.nativeEvent

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(Direction.Right)
      } else {
        setDirection(Direction.Left)
      }
    } else {
      if (translationY > 0) {
        setDirection(Direction.Down)
      } else {
        setDirection(Direction.Up)
      }
    }
  }

  function moveSnake() {
    const head = { ...snake[0] }

    switch (direction) {
      case Direction.Right:
        head.x += 1
        break

      case Direction.Left:
        head.x -= 1
        break

      case Direction.Down:
        head.y += 1
        break

      case Direction.Up:
        head.y -= 1
        break

      default:
        break
    }

    if (testGameOver(head, limits)) {
      setIsGameOver(true)
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
      return
    }
  }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header
          top={insets.top}
          score={0}
          paused={true}
          pause={() => {}}
          reload={() => {}}
        />
        <Board top={insets.top} rows={ROWS} cols={COLS} />
        <Snake top={insets.top} snake={snake} />
        <Food />
      </SafeAreaView>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.p6,
  },
})
