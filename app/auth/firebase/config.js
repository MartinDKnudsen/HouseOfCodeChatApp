import fb from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAlK3Sh9jK_0olIBo7HYRzhoRmJT98hstA',
  databaseURL: 'https://houseofcodetest-8d333.firebaseio.com/',
  projectId: 'houseofcodetest-8d333',
  appId: '1:515325063656:android:60beff708261e8a289b45d',
}

export const firebase = !fb.apps.length
  ? fb.initializeApp(firebaseConfig)
  : fb.app()
  