import React, { useContext } from 'react'

import AccountScreen from '../screens/AccountScreen'
import AddRoomScreen from '../screens/AddRoomScreen'
import Alert from 'react-native'
import AuthContext from '../auth/context'
import { GoogleSignin } from '@react-native-community/google-signin'
import { IconButton } from 'react-native-paper'
import MainScreen from '../screens/MainScreen'
import RoomScreen from '../screens/RoomScreen'
import auth from '@react-native-firebase/auth'
import { createStackNavigator } from '@react-navigation/stack'

const ChatAppStack = createStackNavigator()
const ModalStack = createStackNavigator()

/**
 * All chat app related screens
 */

function ChatApp() {
  const { user, setUser } = useContext(AuthContext)

  //************Sign user out of app****************
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
  const GooglesignOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      setUser(null)
      console.log('User is now signed out')
    } catch (error) {
      console.error(error)
    }
  }
  //************Sign user out of app****************

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#118793',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <ChatAppStack.Screen
        name="Main"
        component={MainScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate('AddRoom')}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="account"
              size={28}
              color="#ffffff"
              onPress={() => navigation.navigate('Account')}
            />
          ),
        })}
      />
      <ChatAppStack.Screen
        name="Account"
        component={AccountScreen}
        options={() => ({
          headerRight: () => (
            <IconButton
              icon="logout"
              size={28}
              color="#ffffff"
              onPress={() => signOut()}
            />
          ),
        })}
      />
      <ChatAppStack.Screen name="Room" component={RoomScreen} />
    </ChatAppStack.Navigator>
  )
}

export default function ChatModalStack() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name="ChatApp" component={ChatApp} />
      <ModalStack.Screen name="AddRoom" component={AddRoomScreen} />
    </ModalStack.Navigator>
  )
}
