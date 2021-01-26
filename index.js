/**
 * @format
 */

import App from './App'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage)
})

messaging().onNotificationOpenedApp(async (remoteMessage) => {
  console.log('NOTIFICAION OPENED')
})

messaging()
  .getToken()
  .then((token) => {
    console.log('FIREBASE TOKEN => ' + token)
  })
console.log('Current user id on firebase: ' + auth().currentUser.uid)

AppRegistry.registerComponent(appName, () => App)
