import {
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin'
import React, { createContext, useState } from 'react'

import auth from '@react-native-firebase/auth'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}
