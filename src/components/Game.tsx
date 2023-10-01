import { PanGestureHandler } from 'react-native-gesture-handler'
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native'

import Header from './Header'
import Board from './Board'
import Snake from './Snake'
import Food from './Food'
import { colors } from '../styles/theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Game() {
  const insets = useSafeAreaInsets()

  return (
    <PanGestureHandler>
      <SafeAreaView style={styles.container}>
        <Header
          top={insets.top}
          score={0}
          paused={true}
          pause={() => {}}
          reload={() => {}}
        />
        <Board />
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
