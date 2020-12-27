import AuthContext from './context'
import jwtDecode from 'jwt-decode'
import { useContext } from 'react'

export default useAuth = () => {
  const { user, setUser } = useContext(AuthContext)

  const logIn = (authToken) => {
    const user = jwtDecode(authToken)
    setUser(user)
  }

  const logOut = () => {
    setUser(null)
  }

  return { user, logIn }
}
