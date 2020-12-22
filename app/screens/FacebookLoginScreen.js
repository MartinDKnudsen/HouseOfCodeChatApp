import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginButton,
} from 'react-native-fbsdk'
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import React, { Component } from 'react'

export default class App extends Component {
  state = { userInfo: {} }

  getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name, picture',
      },
    }
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error)
        } else {
          this.setState({ userInfo: result })
          console.log('result:', result)
        }
      },
    )
    new GraphRequestManager().addRequest(profileRequest).start()
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton 
          style={{
            width: '88%',
            height: 50,
            alignSelf: 'center',
          }}
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error)
            } else if (result.isCancelled) {
              console.log('login is cancelled.')
            } else {
              AccessToken.getCurrentAccessToken().then((data) => {
                const accessToken = data.accessToken.toString()
                this.getInfoFromToken(accessToken)
                console.log(accessToken)
              })
            }
          }}
          onLogoutFinished={() => this.setState({ userInfo: {} })}
        />
        {this.state.userInfo.name && (
          <Text style={{ fontSize: 16, marginVertical: 16 }}>
            Logged in As {this.state.userInfo.name}
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: "100%",
    height: 80
  },
  buttonTextStyle: {
    color: '#000'
  },
})
