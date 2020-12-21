import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import React from 'react'
import Screen from './Screen'

export default function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <GoogleSigninButton
        style={{ width: '90%', height: 55, alignSelf: 'center', marginTop: 500 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
      />
      <Text style={styles.textcsadolor}>LoginScreen</Text>
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
  },
  facebookButton: {
    width: '90%',
    height: 55,
    alignSelf: 'center',
    marginTop: 600,
  },
})
