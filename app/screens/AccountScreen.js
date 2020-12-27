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
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin'
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import GoogleData from './GoogleLoginScreen'
import UserCard from '../components/userCard'
import auth from '@react-native-firebase/auth'
import useAuth from '../auth/useAuth'

function AccountScreen() {
  const { user, setUser } = useContext(AuthContext)
  return (
    <SafeAreaView>
      <UserCard
        title={user.name}
        subTitle={user.email}
        image={(source = { uri: user.picture })}
      />
    </SafeAreaView>
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
  imagestyle: {
    height: 150,
    width: 150,
  },
})
