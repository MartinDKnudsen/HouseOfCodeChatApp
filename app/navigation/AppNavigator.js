import AccountScreen from '../screens/AccountScreen'
import AddRoomScreen from '../screens/AddRoomScreen'
import ChatScreen from '../screens/ChatScreen'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React from 'react'
import RoomScreen from '../screens/RoomScreen'
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
    <Tab.Screen name="AddRoom" component={AddRoomScreen} />
    <Tab.Screen name="Room" component={RoomScreen} />
  </Tab.Navigator>
)

export default AppNavigator
