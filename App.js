import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'

import AuthNavigator from './app/navigation/AuthNavigator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import LoginScreen from './app/screens/LoginScreen'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import firebase from 'firebase'

const Link = () => 
{
 const navigation = useNavigation();
  return(
<Button
title = "Click"
onPress ={() => navigation.navigate('TweetDetails', {id: 1}) }
/>

)
}
const Tweets = ({navigation}) => (
  <View>
    <Text>Tweets</Text>
    <Link/>
  </View>
)
const TweetDetails = ({ route }) => (
  <View>
    <Text>Tweets Details{route.params.id}</Text>
  </View>
)

const Stack = createStackNavigator()
const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
    name="Tweets" 
    component={Tweets}
     />
    <Stack.Screen name="TweetDetails" component={TweetDetails} />
  </Stack.Navigator>
)

const Account = () => <View><Text>Account screen</Text></View>

const Tab = createBottomTabNavigator();
const TabNavigator = () =>
(
<Tab.Navigator
tabBarOptions={{
  activeBackgroundColor: "tomato",
  activeTintColor: "white",
  inactiveBackgroundColor: "#eee",
  inactiveTintColor: "black"
}}
>
<Tab.Screen name = "Feed" component={StackNavigator}
options={{tabBarIcon: ({size, color}) => <Icon name="home" size= {25} color={color}/>}}
/>
<Tab.Screen name= "Account" component={Account}/>
</Tab.Navigator>

)
export default function App(){ 
return(
 <NavigationContainer>
 <AuthNavigator/>
 </NavigationContainer>
 )
}
