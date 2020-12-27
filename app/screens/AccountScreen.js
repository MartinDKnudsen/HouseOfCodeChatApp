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
} from '@react-native-community/google-signin'
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import GoogleData from './GoogleLoginScreen'
import auth from '@react-native-firebase/auth'
import { signOut } from './GoogleLoginScreen'

const GetUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser()
  const userEmail = currentUser.user.email
}

function AccountScreen() {
  const authContext = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Text style={styles.textcsadolor}>AccountScreen</Text>
      <Button title="signOut" />
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 30,
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
  },
})
