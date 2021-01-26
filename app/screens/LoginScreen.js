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
import Screen from './Screen'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
import { firebaseCfg } from '../auth/firebase/config'
import jwtDecode from 'jwt-decode'
import routes from '../navigation/routes'

const LoginScreen = () => {
  return (
    <Screen style={styles.container}>
      <Text style={styles.textcsadolor}>LoginScreen</Text>
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
