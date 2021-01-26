import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React, { Component, useContext, useEffect, useState } from 'react'

import AppNavigator from '../../navigation/AppNavigator'
import AuthContext from '../context'
import Screen from '../../screens/Screen'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
import { firebaseCfg } from '../firebase/config'
import jwtDecode from 'jwt-decode'

GoogleSignin.configure({
  webClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
  androidClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
})

const GoogleLogin = () => {
  const [user, setUser] = useState()
  const authContext = useContext(AuthContext)
  const [IsAuthorised, SetAuthorised] = useState(false)
  const navigation = useNavigation()

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn()
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)

      // Sign-in the user with the credential
      const response = await auth().signInWithCredential(googleCredential)
      SetAuthorised(true)

      const user = jwtDecode(idToken)
      console.log(user)
      authContext.setUser(user)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Signin cancelled')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign in is in progress already')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated')
      } else {
        Alert.alert('Unknown error encountered - login cancelled')
      }
    }
  }

  return (
    <View>
      <GoogleSigninButton
        style={{
          width: '100%',
          height: 60,
          alignSelf: 'center',
          marginTop: 0,
        }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onGoogleButtonPress()}
      />
    </View>
  )
}
export default GoogleLogin
