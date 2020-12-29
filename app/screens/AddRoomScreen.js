import { IconButton, Title } from 'react-native-paper'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import firestore from '@react-native-firebase/firestore'
import useStatsBar from '../utils/useStatusBar'

export default function AddRoomScreen({ navigation }) {
  useStatsBar('dark-content')
  const [roomName, setRoomName] = useState('')

  /**
   * Create a new Firestore collection to save threads
   */
  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('Chats')
        .add({
          name: roomName,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection('MESSAGES').add({
            text: `This is room: ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true,
          })
          navigation.navigate('Main')
        })
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color="#6646ee"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new chat room</Title>
        <FormInput
          labelName="Room Name"
          value={roomName}
          onChangeText={(text) => setRoomName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="Create"
          modeValue="contained"
          labelStyle={styles.buttonLabel}
          onPress={() => handleButtonPress()}
          disabled={roomName.length === 0}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginBottom: 80,
  },
  closeButtonContainer: {
    top: 30,
    right: 0,
    marginLeft: 300,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#118793',
    fontWeight: 'bold',
  },
  buttonLabel: {
    fontSize: 22,
  },
})
