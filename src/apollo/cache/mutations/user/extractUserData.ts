import { ReactiveVar } from '@apollo/client'
import jwt from 'jwt-decode'
import type { userData, snackbarEvent } from '../../variables'

interface tokenData {
  userId: string
  picture: string
  username: string
}

export default (
  userDataVar: ReactiveVar<userData>,
  isAuthenticatedVar: ReactiveVar<boolean>,
  snackbarEventVar: ReactiveVar<snackbarEvent>
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
      snackbarEventVar({
        type: 'error',
        message: 'Невалидный токен'
      })
      return false
    }
  }
}
