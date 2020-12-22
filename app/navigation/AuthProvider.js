import {
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin'
import React, {createContext, useState} from 'react'

import auth from '@react-native-firebase/auth'

export const AuthContext = createContext();

export const AuthProvider = () => 
{

return (

<AuthContext.Provider
value={{


googlelogin: async () => 
{
try{
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn()
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken)

  // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);

} catch(error)
{console.log({error})}
}}}>

</AuthContext.Provider>
)
}