/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactiveVar } from '@apollo/client'
import jwt from 'jwt-decode'
import history from '../../../../utils/history'
import routeNames from '../../../../utils/routeNames'

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
): ((token: string) => void) => {
  return (token: string): void => {
    try {
      const decoded = jwt<tokenData>(token)

      localStorage.setItem('token', token)

      userDataVar({
        id: decoded.userId,
        name: decoded.username,
        picture: decoded.picture
      })

      isAuthenticatedVar(true)

      history.push(routeNames.orders)
    } catch (error) {
      snackbarMessageVar({
        type: 'error',
        message: 'Невалидный токен'
      })
    }
  }
}
