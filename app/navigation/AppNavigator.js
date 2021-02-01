import {
  NavigationContainer,
  createStackNavigator,
  useLinking,
} from "@react-navigation/stack"
import React, { useContext } from "react"

import AccountScreen from "../screens/AccountScreen"
import AddRoomScreen from "../screens/AddRoomScreen"
import AuthContext from "../auth/context"
import { Button } from "react-native"
import { GoogleSignin } from "@react-native-community/google-signin"
import { IconButton } from "react-native-paper"
import MainScreen from "../screens/MainScreen"
import RoomScreen from "../screens/RoomScreen"
import auth from "@react-native-firebase/auth"
import colors from "../config/colors"
import firestore from "@react-native-firebase/firestore"

const ChatAppStack = createStackNavigator()
const ModalStack = createStackNavigator()
function ChatApp() {
  const { user, setUser } = useContext(AuthContext)

  //************Sign user out of app****************
  const signOut = async () => {
    try {
      auth()
        .signOut()
        .then(function () {
          GooglesignOut()
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }
  const GooglesignOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      if (user != null) {
        setUser(null)
      }
      console.log("User is now signed out")
    } catch (error) {
      console.error(error)
    }
  }
  //************Sign user out of app****************

  return (
    <ChatAppStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.headerStyle_backgroundColor,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 22,
        },
      }}>
      <ChatAppStack.Screen
        name="Home"
        component={MainScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <IconButton
              icon="message-plus"
              size={28}
              color={colors.white}
              onPress={() => navigation.navigate("AddRoom")}
            />
          ),
          headerLeft: () => (
            <IconButton
              icon="account"
              size={28}
              color={colors.white}
              onPress={() => navigation.navigate("Account")}
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
              color={colors.white}
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
