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

const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess()
    await GoogleSignin.signOut()
    setloggedIn(false)
    setuserInfo([])
  } catch (error) {
    console.error(error)
  }
}


export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textcsadolor}>AccountScreen</Text>
      <Button
        title="signOut"
        onPress={signOut}
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
