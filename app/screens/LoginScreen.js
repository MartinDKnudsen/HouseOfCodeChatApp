import * as Progress from 'react-native-progress'

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

import { AuthContext } from '../navigation/AuthProvider'
import Facebook from './FacebookLoginScreen'
import Screen from './Screen'
import auth from '@react-native-firebase/auth'
import firebase from 'firebase'
import { firebaseCfg } from '../auth/firebase/config'
import routes from '../navigation/routes'

GoogleSignin.configure({
  webClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
  androidClientId:
    '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
})

const GetUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser()
  console.log(currentUser.user.email)
}

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
      console.log(response)
      console.log(idToken)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (IsAuthorised) {
      //navigation.navigate(routes.CHAT_SCREEN)
    }
  }, [IsAuthorised])

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
        onPress={() =>
          onGoogleButtonPress().then(
            console.log('User is now singed in with google!'),
          )
        }
      />
      <View>
        <Facebook />
      </View>
      <Button title="frank" onPress={GetUser} />
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
