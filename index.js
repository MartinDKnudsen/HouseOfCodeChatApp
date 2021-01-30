/**
 * @format
 */

import { NavigationContainer, useNavigation } from '@react-navigation/native'

import App from './App'
import { AppRegistry } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { name as appName } from './app.json'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token)
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("ON NOTIFICATION:", notification.data.room_id)
  },

  onAction: function (notification) {
    // console.log('ACTION:', notification.action)
    //console.log('NOTIFICATION:', notification)
    console.log("OPEND Notifiction: ", notification.data.room_id)
    // process the action
  },
})

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
 // console.log('Message handled in the background!', remoteMessage)
  console.log("new message")
})

PushNotification.createChannel(
  {
    channelId: 'channel-id', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
)

AppRegistry.registerComponent(appName, () => App)
