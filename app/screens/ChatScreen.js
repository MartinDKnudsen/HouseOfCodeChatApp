import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { GoogleSignin } from '@react-native-community/google-signin'
import React from 'react'

const GetUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser()
  console.log(currentUser.user.email)
}

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textcsadolor}>ChatScreen</Text>
      <Button title="See email" onPress={GetUser} />
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
