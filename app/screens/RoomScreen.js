import {
  Actions,
  ActionsProps,
  Bubble,
  GiftedChat,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat'
import { ActivityIndicator, Icon, StyleSheet, Text, View } from 'react-native'
import {
  ImagePicker,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import { IconButton } from 'react-native-paper'
import colors from '../config/colors'
import firestore from '@react-native-firebase/firestore'
import useStatsBar from '../utils/useStatusBar'

export default function RoomScreen({ route }) {
  const [messages, setMessages] = useState([])
  const [imageUri, setImageUri] = useState()
  const { user } = useContext(AuthContext)
  const { chatRoom_id } = route.params
  useStatsBar('light-content')

  async function handleSend(messages) {
    const text = messages[0].text
    firestore()
      .collection('Chats')
      .doc(chatRoom_id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.name,
          email: user.email,
          avatar: user.picture,
        },
      })

    async function handleImageSend(messages) {
      const image = message[0].image
      firestore()
        .collection('Chats')
        .doc(chatRoom_id)
        .collection('MESSAGES')
        .add({
          image,
          createdAt: new Date().getTime(),
          user: {
            _id: user.name,
            email: user.email,
            avatar: user.picture,
          },
        })
    }

    const selectImage = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync()
      } catch (error) {
        console.log(error)
      }
    }

    await firestore()
      .collection('Chats')
      .doc(chatRoom_id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        { merge: true },
      )
  }

  useEffect(() => {
    const messagesListener = firestore()
      .collection('Chats')
      .doc(chatRoom_id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .limit(50)
      .onSnapshot((querySnapshot) => {
        const messagesFromFirebase = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data()

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          }

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user._id,
            }
          }

          return data
        })

        setMessages(messagesFromFirebase)
      })

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener()
  }, [])

  function renderBubble(props) {
    return (
      <View>
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: colors.rightBubble,
            },
            left: { backgroundColor: colors.leftBubble },
          }}
          textStyle={{
            right: {
              color: '#fff',
            },
            left: { color: '#fff' },
          }}
        />
      </View>
    )
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
      </View>
    )
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#0078FF" />
        </View>
      </Send>
    )
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#000" />
      </View>
    )
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    )
  }

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary()
    } catch (error) {}
    console.log(result)
  }

  function handleImgSend(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    )
  }

  function renderActions(props) {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton
          icon="camera"
          size={26}
          color="#0078FF"
          onPress={handlePickImage}
        />
      </View>
    )
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: user.name }}
      placeholder="Type your message here..."
      alwaysShowSend
      showUserAvatar
      renderUsernameOnMessage
      showAvatarForEveryMessage
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      renderActions={renderActions}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
      renderScrollComponent
      loadEarlier
    />
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#000000',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  UsernameText: {
    color: '#000',
    fontSize: 12,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
})
