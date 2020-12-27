import {
  Button,
  Image,
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
      <Image style={styles.imageStyle} source={require('../Images/logo.png')} />
      <View style={styles.container}>
        <Button
          title="Login"
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    justifyContent: 'center',
    marginTop: 40,
    height: 70,
  },
  textcsadolor: {
    color: '#000',
    fontWeight: 'bold',
  },
  loginButton: {
    height: 30,
  },
  imageStyle: {
    height: 500,
    width: '100%',
  },
})
