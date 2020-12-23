import AccountScreen from '../screens/AccountScreen'
import ChatScreen from '../screens/ChatScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tab = createBottomTabNavigator()

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="ChatRoom"
      component={ChatScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="chat" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
)

export default AppNavigator
