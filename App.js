import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'

import AppNavigator from './app/navigation/AppNavigator'
import AuthContext from './app/auth/context'
import AuthNavigator from './app/navigation/AuthNavigator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import LoginScreen from './app/screens/LoginScreen'
import RNBootSplash from 'react-native-bootsplash'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase'

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

export default function App() {
  useEffect(() => {
    RNBootSplash.hide({ duration: 500, fade: true })
  }, [])

  const [user, setUser] = useState(null)
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}

// {user ? <AppNavigator /> : <AuthNavigator />}

// Set an initializing state whilst Firebase connects
//const [initializing, setInitializing] = useState(true)
//function onAuthStateChanged(user) {
// setUser(user)
// if (initializing) setInitializing(false)
//}
