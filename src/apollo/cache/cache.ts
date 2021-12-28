import { InMemoryCache, makeVar } from '@apollo/client'
import { checkToken, decodeJWT } from '../../utils/helpers'

interface snackbarMessage {
  type: 'error' | 'success'
  message: string
}

// TODO: maybe snackbarEventVar
export const snackbarMessageVar = makeVar<snackbarMessage>({
  type: 'success',
  message: ''
})

export const isAuthenticatedVar = makeVar<boolean>(checkToken())

interface userData {
  id: string
  name: string
  picture: string
}

export const userDataVar = makeVar<userData>(decodeJWT())

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isAuthenticated: {
          read(): boolean {
            return isAuthenticatedVar()
          }
        },
        userData: {
          read(): userData {
            return userDataVar()
          }
        },
        snackbarMessage: {
          read(): snackbarMessage {
            return snackbarMessageVar()
          }
        }
      }
    }
  }
})

export { cache }
