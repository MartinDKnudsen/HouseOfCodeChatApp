import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import React, { useContext } from 'react'

import AuthContext from '../auth/context'
import { GoogleSignin } from '@react-native-community/google-signin'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import auth from '@react-native-firebase/auth'

function userCard({
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  const { user, setUser } = useContext(AuthContext)
  const signOut = async () => {
    auth()
      .signOut()
      .then(function () {
        GooglesignOut()
      })
      .catch(function (error) {
        // An error happened.
      })
  }
  const GooglesignOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      setUser(null)
      console.log('User is now signed out')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {IconComponent}
        {image && <Image style={styles.image} source={source} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          {subTitle && (
            <Text style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </Text>
          )}
        </View>
        <Button title="SignOut" onPress={signOut} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  safeContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#234',
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: '#000',
  },
  title: {
    fontWeight: '500',
  },
})

export default userCard
