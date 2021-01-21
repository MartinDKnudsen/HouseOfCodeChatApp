import {
  Actions,
  ActionsProps,
  Bubble,
  GiftedChat,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat'
import {
  ActivityIndicator,
  Icon,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native'
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
  const [filePath, setFilePath] = useState({})
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
    console.log(filePath)
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
            image: '',
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

  //******************Handle images  */
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        )
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        return false
      }
    } else return true
  }

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        )
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
        alert('Write permission err', err)
      }
      return false
    } else return true
  }

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    }
    let isCameraPermitted = await requestCameraPermission()
    let isStoragePermitted = await requestExternalWritePermission()
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response)

        if (response.didCancel) {
          alert('User cancelled camera picker')
          return
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device')
          return
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied')
          return
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage)
          return
        }
        console.log('base64 -> ', response.base64)
        console.log('uri -> ', response.uri)
        console.log('width -> ', response.width)
        console.log('height -> ', response.height)
        console.log('fileSize -> ', response.fileSize)
        console.log('type -> ', response.type)
        console.log('fileName -> ', response.fileName)
        setFilePath(respone.uri)
      })
    }
  }

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    }
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        alert('User cancelled camera picker')
        return
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device')
        return
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied')
        return
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage)
        return
      }
      console.log('base64 -> ', response.base64)
      console.log('uri -> ', response.uri)
      console.log('width -> ', response.width)
      console.log('height -> ', response.height)
      console.log('fileSize -> ', response.fileSize)
      console.log('type -> ', response.type)
      console.log('fileName -> ', response.fileName)
      setFilePath(response.uri)
    })
  }

  function renderImageOptions(props) {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton
          style={styles.CameraButtonsStyle}
          icon="camera"
          size={26}
          color="#0078FF"
          onPress={() => captureImage('photo')}
        />
        <IconButton
          style={styles.ImageButtonsStyle}
          icon="file"
          size={26}
          color="#0078FF"
          onPress={() => chooseFile('photo')}
        />
      </View>
    )
  }
  //******************Handle images*****************

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
      renderActions={renderImageOptions}
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
    flex: 1,
    flexDirection: 'row',
  },
  CameraButtonsStyle: {},
  ImageButtonsStyle: {
    marginLeft: -10,
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
