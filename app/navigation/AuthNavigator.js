import { AppNavigator } from './AppNavigator'
import React from 'react'
import WelcomeAndSignInScreen from '../screens/WelcomeAndSignInScreen'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="WelcomeAndSignInScreen"
      component={WelcomeAndSignInScreen}
      options={{ headerTitleAlign: 'center', headerShown: false }}
    />
  </Stack.Navigator>
)

export default AuthNavigator
