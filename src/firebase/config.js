import Firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyAlK3Sh9jK_0olIBo7HYRzhoRmJT98hstA',
  databaseURL: 'https://houseofcodetest-8d333.firebaseio.com/',
  projectId: 'houseofcodetest-8d333',
  appId: '1:515325063656:android:44055c0ead41ae6389b45d',
}

export default Firebase.initializeApp(firebaseConfig)
