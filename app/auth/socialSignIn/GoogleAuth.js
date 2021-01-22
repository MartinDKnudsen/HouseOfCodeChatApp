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

//const nullUser = async () => {
//const { setUser } = useContext(AuthContext)
//setUser(null)
//}
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
      console.log(error)
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
        onPress={() =>
          onGoogleButtonPress().then(
            console.log('User is now singed in with google!'),
          )
        }
      />
    </View>
  )
}
export default GoogleLogin
