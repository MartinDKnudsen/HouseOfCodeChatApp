import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin'
import React, { useContext, useState } from 'react'

import {AuthContext} from '../navigation/AuthProvider'
import Facebook from './FacebookLoginScreen'
import { GoogleSignin } from '@react-native-community/google-signin'
import Screen from './Screen'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
import {firebaseCfg} from '../auth/firebase/config'

GoogleSignin.configure({
  webClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
  androidClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
})

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential)
}

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
  }
}
const GetUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser()
  console.log(currentUser)
}

const GooglesignOut = async () => {
  try {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    this.setState({ user: null })
    console.log("User is now signed out")
  } catch (error) {
    console.error(error)
  }
}

const signOut = async () => {
  auth()
    .signOut()
    .then(function () {
    GooglesignOut();
    })
    .catch(function (error) {
      // An error happened.
    })
}

const LoginScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.textcsadolor}>LoginScreen</Text>
      <GoogleSigninButton
        style={{
          width: '90%',
          height: 55,
          alignSelf: 'center',
          marginTop: 500,
        }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onGoogleButtonPress().then((console.log("User is now singed in with google!")))}
      />
      <View>
        <Facebook />
      </View>
      <Button title="frank" onPress={GetUser}/>
    </Screen>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20
  },
})
