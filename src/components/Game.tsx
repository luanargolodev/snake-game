import {
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler'
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native'

import Header from './Header'
import Board from './Board'
import Snake from './Snake'
import Food from './Food'
import { colors } from '../styles/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLS, HEADER_HEIGHT, PIXEL } from '../consts'

const { height } = Dimensions.get('window')

export default function Game() {
  const insets = useSafeAreaInsets()
  const ROWS = Math.floor(
    (height - insets.top - insets.bottom - HEADER_HEIGHT) / PIXEL
  )

  function handleGesture(event: PanGestureHandlerGestureEvent) {
    const { translationX, translationY } = event.nativeEvent

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        console.log('right')
      } else {
        console.log('left')
      }
    } else {
      if (translationY > 0) {
        console.log('down')
      } else {
        console.log('up')
      }
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
        <Snake />
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
