import { ActivityIndicator, StyleSheet, View } from 'react-native'
import {
  Bubble,
  GiftedChat,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat'
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import { IconButton } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

export default function RoomScreen({ route }) {
  const [messages, setMessages] = useState([])
  const { user } = useContext(AuthContext)
  const { chatRoom_id } = route.params

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
        },
      })

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
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
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
              name: firebaseData.user.email,
            }
          }

          return data
        })

        setMessages(messages)
      })

    // Stop listening for updates whenever the component unmounts
    return () => messagesListener()
  }, [])

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
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
          <IconButton icon="send-circle" size={32} color="#6646ee" />
        </View>
      </Send>
    )
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
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

  return (
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: user.name }}
      placeholder="Type your message here..."
      alwaysShowSend
      showUserAvatar
      showAvatarForEveryMessage
      scrollToBottom
      renderBubble={renderBubble}
      renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
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
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
})
