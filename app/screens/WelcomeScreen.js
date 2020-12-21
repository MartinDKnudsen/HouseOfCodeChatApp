import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import React from 'react';

export default function WelcomeScreen({navigate}) {
    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate("Login")}/>
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
