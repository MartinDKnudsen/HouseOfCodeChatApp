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
  Alert,
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
import PushNotification from 'react-native-push-notification'
import colors from '../config/colors'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'
import useStatsBar from '../utils/useStatusBar'

var AskedUserForNotification = false
var numberOfMessagesToLoad = 0
var maxMsg = 0
export default function RoomScreen({ route }) {
  const [messages, setMessages] = useState([])
  const [filePath, setFilePath] = useState('')
  const [text, setText] = useState(null)
  const [refreshMessages, startRefreshMessages] = useState(0)
  const { user } = useContext(AuthContext)
  const { chatRoom_id } = route.params
  const { Room_Name } = route.params

  useStatsBar('light-content')
  console.log(chatRoom_id)

  async function handleSend(messages) {
    firestore()
      .collection('Chats')
      .doc(chatRoom_id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        image: filePath,
        user: {
          _id: user.name,
          email: user.email,
          avatar: user.picture,
        },
        room_Name: Room_Name,
        ChatRoom_id: chatRoom_id,
      })
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id)
      })
    // PushNotification.localNotification({
    //title: "New massage in: '" + Room_Name + "' from " + user.name,
    // message: text,
    // chatRoom_id: chatRoom_id,
    // })

    if (AskedUserForNotification == false) {
      Alert.alert(
        'Notifications?',
        'Would you like to revice notifications from this room?',
        [
          {
            text: 'Yes',
            onPress: () =>
              messaging()
                .subscribeToTopic(chatRoom_id)
                .then(() => console.log('Subscribed to topic!'))
                .then((AskedUserForNotification = true)),
          },

          {
            text: 'No',
            onPress: () =>
              messaging()
                .unsubscribeFromTopic(chatRoom_id)
                .then(() => console.log('Unsubscribed fom the topic!'))
                .then((AskedUserForNotification = true)),
          },
        ],
        { cancelable: false },
      )
    }

    //Makes sure that the room with the newest message is showed on top af the MainScreen
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
    if (user != null) {
      var maxMessages = firestore()
        .collection('Chats')
        .doc(chatRoom_id)
        .collection('MESSAGES')
        .onSnapshot((querySnapShot) => {
          if (querySnapShot != null) {
            maxMsg = querySnapShot.size
          }
        })

      // console.log('BUT NOW IT IS ' + maxMsg)

      if (maxMsg - numberOfMessagesToLoad < 0) {
        console.log('No more messages to load')
      } else {
        numberOfMessagesToLoad += 10
      }
      // console.log(numberOfMessagesToLoad)

      if (numberOfMessagesToLoad > 1) {
        const messagesListener = firestore()
          .collection('Chats')
          .doc(chatRoom_id)
          .collection('MESSAGES')
          .orderBy('createdAt', 'desc')
          .limit(numberOfMessagesToLoad)
          .onSnapshot((querySnapshot) => {
            const messagesFromFirebase = querySnapshot.docs.map((doc) => {
              const firebaseData = doc.data()
              // console.log('fb ', firebaseData)
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

            //  console.log('Messages refreshed')
            // console.log('THERE ARE CURRENTLY => ' + messagesFromFirebase.length)
            setMessages(messagesFromFirebase)

            if (messagesListener != null) {
              // console.log('NOT NULL')
            }
          })
        // Stop listening for updates whenever the component unmounts
        return () => messagesListener()
      } else {
        console.log('No more messages to load')
      }
    }
  }, [refreshMessages])

  //Renders > _______________________________________________________
  function renderBubble(props) {
    const { currentMessage } = props
    //  console.log(' props in bubble ', currentMessage)
    return (
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
          left: { color: '#000' },
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
          <IconButton icon="send-circle" size={32} color="#0078FF" />
        </View>
      </Send>
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

  function renderImageOptions(props) {
    return (
      <View>
        <View style={styles.bottomComponentContainer}>
          <IconButton
            style={styles.CameraButtonsStyle}
            icon="camera"
            size={26}
            color={colors.chatIcons}
            onPress={() => captureImage('photo')}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <IconButton
              style={styles.ImageButtonsStyle}
              icon="file"
              size={26}
              color={colors.chatIcons}
              onPress={() => chooseFile('photo')}
            />
            {filePath ? (
              <Text
                style={{
                  alignSelf: 'center',
                }}>
                {' '}
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    )
  }
  //******************Handle images*****************
  //< Renders _______________________________________________________

  function LoadEarlierMessages() {
    startRefreshMessages(refreshMessages + 1)
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color={colors.black} />
      </View>
    )
  }

  //******************Handle images  */

  //Upload image to cloudinary
  const cloudinaryUpload = (photo) => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'chatApp')
    data.append('cloud_name', 'dvya2cgfo')
    fetch('https://api.cloudinary.com/v1_1/dvya2cgfo/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data ', data)
        setText(' ')
        setFilePath(data.secure_url)
      })
      .catch((err) => {
        console.log('error is ', err)
        alert('An Error Occured While Uploading')
      })
  }
  //Request Premissions >
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
  // < Request Premissions

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
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
        const { uri, type, fileName } = response
        const name = fileName
        const source = {
          uri,
          type,
          name,
        }
        cloudinaryUpload(source)
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
      const { uri, type, fileName } = response
      const name = fileName
      const source = {
        uri,
        type,
        name,
      }
      cloudinaryUpload(source)
    })
  }

  return (
    <GiftedChat
      listViewProps={{
        style: {
          backgroundColor: colors.white,
        },
      }}
      messages={messages}
      onSend={(text) => handleSend(text)}
      user={{ _id: user.name }}
      text={text}
      onInputTextChanged={(val) => setText(val)}
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
      infiniteScroll
      loadEarlier
      onLoadEarlier={LoadEarlierMessages}
    />
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 300,
    justifyContent: 'center',
  },
  chatBackground: {
    backgroundColor: colors.chatBackgound,
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    flex: 1,
    flexDirection: 'row',
    width: 80,
  },
  ImageHandlerContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.black,
  },
  CameraButtonsStyle: {},
  ImageButtonsStyle: {
    marginLeft: -1,
  },
  systemMessageWrapper: {
    backgroundColor: colors.systemMessageWrapper,
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  UsernameText: {
    color: colors.black,
    fontSize: 12,
    textAlign: 'right',
    alignSelf: 'stretch',
  },
})
