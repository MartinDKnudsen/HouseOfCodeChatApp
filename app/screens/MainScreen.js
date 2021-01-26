import {
  Button,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Divider, Icon, List } from 'react-native-paper'
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin'
import React, { useContext, useEffect, useState } from 'react'

import AuthContext from '../auth/context'
import Loading from '../components/Loading'
import UserCard from '../components/userCard'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import messaging from '@react-native-firebase/messaging'
import useStatsBar from '../utils/useStatusBar'

export default function MainScreen({ navigation }) {
  const { user, setUser } = useContext(AuthContext)
  const [chatroom, setChatRoom] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFetching, setFetching] = useState()
  const [refreshData, startRefreshData] = useState(0)
  useStatsBar('light-content')
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
        console.log('Chatrooms refreshed')

        setChatRoom(chatroom)

        if (loading) {
          setLoading(false)
        }
      })

    return () => unsubscribe()
  }, [refreshData])

  if (loading) {
    return <Loading />
  }

  function onRefresh() {
    startRefreshData(refreshData + 1)
    setFetching(false)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatroom}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => onRefresh()}
          />
        }
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Room', { chatRoom_id: item._id })
            }>
            <List.Item
              title={item.name}
              description={item.description}
              titleNumberOfLines={1}
              titleStyle={styles.listTitle}
              descriptionStyle={styles.listDescription}
              descriptionNumberOfLines={1}
              right={(props) => (
                <List.Icon {...props} color="#10a9e0" icon="chevron-right" />
              )}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  listTitle: {
    fontSize: 26,
    color: '#000',
  },
  listDescription: {
    fontSize: 18,
    color: '#696969',
  },
  divider: {
    height: 1,
    backgroundColor: '#10a9e0',
  },
  iconStyles: {
    color: '#10a9e0',
  },
})
