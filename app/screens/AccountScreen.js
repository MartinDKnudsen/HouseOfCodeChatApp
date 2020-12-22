import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin'

import React from 'react'
import auth from '@react-native-firebase/auth'

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textcsadolor}>AccountScreen</Text>
      <Button
        title="signOut"
           />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 30,
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
  },
})
