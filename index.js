/**
 * @format
 */

import { NavigationContainer, useNavigation } from '@react-navigation/native'

import App from './App'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'

AppRegistry.registerComponent(appName, () => App)
