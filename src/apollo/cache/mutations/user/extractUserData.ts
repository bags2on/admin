import { ReactiveVar } from '@apollo/client'
import jwt from 'jwt-decode'

interface userData {
  id: string
  name: string
  picture: string
}

interface tokenData {
  userId: string
  picture: string
  username: string
}

interface snackbarMessage {
  type: 'error' | 'success'
  message: string
}

export default (
  userDataVar: ReactiveVar<userData>,
  isAuthenticatedVar: ReactiveVar<boolean>,
  snackbarMessageVar: ReactiveVar<snackbarMessage>
): ((token: string) => boolean) => {
  return (token: string): boolean => {
    try {
      const decoded = jwt<tokenData>(token)

      localStorage.setItem('token', token)

      userDataVar({
        id: decoded.userId,
        name: decoded.username,
        picture: decoded.picture
      })

      isAuthenticatedVar(true)

      return true
    } catch (error) {
      snackbarMessageVar({
        type: 'error',
        message: 'Невалидный токен'
      })
      return false
    }
  }
}
