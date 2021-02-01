import {
  Image,
  StyleSheet,
  View,
} from 'react-native'

import Google from '../auth/socialSignIn/GoogleAuth'
import React from 'react'
import Screen from './Screen'

export default function WelcomeScreen() {
  return (
    <Screen>
      <View>
        <Image
          style={styles.imageStyle}
          source={require('../Images/logo.png')}
        />
        <Google />
      </View>
    </Screen>
  )
}
const styles = StyleSheet.create({
  imageStyle: {
    height: 600,
    width: '100%',
  },
})
