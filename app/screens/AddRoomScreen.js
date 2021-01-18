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
  const [description, setDescription] = useState('')
  function handleButtonPress() {
    if (roomName.length > 0) {
      firestore()
        .collection('Chats')
        .add({
          name: roomName,
          description,
          latestMessage: {
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
          },
        })
        .then((docRef) => {
          docRef.collection('MESSAGES').add({
            text: `You have joined the room ${roomName}.`,
            createdAt: new Date().getTime(),
            system: true,
          })
          navigation.navigate('Home')
        })
    }
  }
  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close"
          size={45}
          color="#3c7d52"
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
        <FormInput
          labelName="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
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
    top: 2,
    marginLeft: 325,
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
    color: '#118793',
  },
})
