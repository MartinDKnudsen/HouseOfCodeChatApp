import AccountScreen from '../screens/AccountScreen'
import ChatScreen from '../screens/ChatScreen'
import LoginScreen from '../screens/LoginScreen'
import React from 'react'
import WelcomeScreen from '../screens/WelcomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()


const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ headerTitleAlign: 'center' }}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerTitleAlign: 'center' }}
    />
    <Stack.Screen
      name="ChatRoom"
      component={ChatScreen}
      options={{ headerTitleAlign: 'center' }}
    />
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerTitleAlign: 'center' }}
    />
  </Stack.Navigator>
)


export default AuthNavigator;