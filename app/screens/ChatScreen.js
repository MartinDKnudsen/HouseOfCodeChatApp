import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import React from 'react'

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.textcsadolor}>ChatScreen</Text>
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
