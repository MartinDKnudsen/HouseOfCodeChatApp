import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Divider, List } from 'react-native-paper'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin'
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import GoogleData from './GoogleLoginScreen'
import Loading from '../components/Loading'
import UserCard from '../components/userCard'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default function MainScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext)
  const [chatroom, setChatRoom] = useState([])
  const [loading, setLoading] = useState(true)
  /**
   * Fetch messages from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Chats')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const chatroom = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),
          }
        })

        setChatRoom(chatroom)

        if (loading) {
          setLoading(false)
        }
      })

    /**
     * unsubscribe listener
     */
    return () => unsubscribe()
  }, [])

  if (loading) {
    return <Loading />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatroom}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Room', { chatRoom_id: item.name })
            }>
            <List.Item
              title={item.name}
              description="Chat room description"
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  listTitle: {
    fontSize: 22,
  },
  listDescription: {
    fontSize: 16,
  },
})
