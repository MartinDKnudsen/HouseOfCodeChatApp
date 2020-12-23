import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import React from 'react'

export default function WelcomeScreen({ navigate }) {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Button
          title="Login"
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
      <View>
        <Button
          title="AccountScreen"
          onPress={() => navigation.navigate('Account')}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 550,
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
  },
  loginButton: {
    flex: 1,
    height: 30,
  },
})
