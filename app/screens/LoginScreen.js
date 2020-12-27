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
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import Facebook from './FacebookLoginScreen'
import Google from './GoogleLoginScreen'
import Screen from './Screen'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
import { firebaseCfg } from '../auth/firebase/config'
import jwtDecode from 'jwt-decode'
import routes from '../navigation/routes'

GoogleSignin.configure({
  webClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
  androidClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
})

const GooglesignOut = async () => {
  try {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    console.log('User is now signed out')
  } catch (error) {
    console.error(error)
  }
}

const signOut = async () => {
  auth()
    .signOut()
    .then(function () {
      GooglesignOut()
    })
    .catch(function (error) {
      // An error happened.
    })
}

const LoginScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.textcsadolor}>LoginScreen</Text>
      <Google />
      <View>
        <Facebook />
      </View>
    </Screen>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
})
