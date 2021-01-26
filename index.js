/**
 * @format
 */

import App from './App'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'

try {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage)
  })

  messaging()
    .getToken()
    .then((token) => {
      console.log('FIREBASE TOKEN =>' + token)
    })
  console.log(auth().currentUser.uid)
} catch (error) {
  console.log(error)
}

AppRegistry.registerComponent(appName, () => App)
