import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import React from 'react'

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textcsadolor}>AccountScreen</Text>
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
