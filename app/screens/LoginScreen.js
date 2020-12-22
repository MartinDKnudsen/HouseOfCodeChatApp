import {
    GoogleSignin,
    GoogleSigninButton
} from '@react-native-community/google-signin'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import Facebook from './FacebookLoginScreen'
import React from 'react'
import Screen from './Screen'
import auth from '@react-native-firebase/auth'

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    this.setState({ userInfo })
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
    console.log(getCurrentUser())
  }
}

export default function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <GoogleSigninButton
        style={{
          width: '90%',
          height: 55,
          alignSelf: 'center',
          marginTop: 500,
        }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
      <Facebook />

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

