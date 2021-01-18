import { Divider, List } from 'react-native-paper'
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import FormButton from '../components/FormButton'
import Loading from '../components/Loading'
import { Title } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

export default function HomeScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext)
  const [chatroom, setChatRoom] = useState([])
  const [loading, setLoading] = useState(true)
  /**
   * Fetch messages from Firestore
   */
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('ChatRoom')
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
          <TouchableOpacity onPress={() => navigation.navigate('Room')}>
            <List.Item
              title={item.name}
              description="Item description"
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
