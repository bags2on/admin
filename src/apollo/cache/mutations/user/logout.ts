import { ReactiveVar } from '@apollo/client'
import history from '../../../../utils/history'
import routeNames from '../../../../utils/routeNames'

interface userData {
  id: string
  name: string
  picture: string
}

export default (
  userDataVar: ReactiveVar<userData>,
  isAuthenticatedVar: ReactiveVar<boolean>
): (() => void) => {
  return (): void => {
    localStorage.removeItem('token')
    userDataVar()
    isAuthenticatedVar(false)
    history.replace(routeNames.auth)
  }
}
