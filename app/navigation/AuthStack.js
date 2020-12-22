import AsyncStorage from '@react-native-community/async-storage'
import { GoogleSignin } from '@react-native-community/google-signin'
import React from 'react';

useEffect(() => {

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    }); // Add some error handling, also you can simply do setIsFirstLaunch(null)
  
    GoogleSignin.configure({
      webClientId: '515325063656-6n4qup8tccj7q5cfldht2ngn623imebs.apps.googleusercontent.com',
    });

})



















function AuthStack(props) {
    return (
        <div>
            
        </div>
    );
}

export default AuthStack;



