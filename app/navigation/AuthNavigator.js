import { AppNavigator } from './AppNavigator'
import LoginScreen from '../screens/LoginScreen'
import React from 'react'
import WelcomeScreen from '../screens/WelcomeScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerTitleAlign: 'center', headerShown: false }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerTitleAlign: 'center', headerShown: false }}
    />
  </Stack.Navigator>
)

export default AuthNavigator
