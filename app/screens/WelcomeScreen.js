import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import Google from '../auth/socialSignIn/GoogleAuth'
import React from 'react'
import Screen from './Screen'

export default function WelcomeScreen({ navigate }) {
  const navigation = useNavigation()
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
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 200,
    height: 70,
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
  },
  loginButton: {
    height: 30,
  },
  imageStyle: {
    height: 600,
    width: '100%',
  },
})
