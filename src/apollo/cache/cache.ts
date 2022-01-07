import { InMemoryCache, makeVar } from '@apollo/client'
import { decodeToken } from '../../utils/helpers'

interface snackbarMessage {
  type: 'error' | 'success'
  message: string
}

// TODO: maybe snackbarEventVar
export const snackbarMessageVar = makeVar<snackbarMessage>({
  type: 'success',
  message: ''
})

export const isAuthenticatedVar = makeVar<boolean>(!!decodeToken())

interface userData {
  id: string
  name: string
  picture: string
}

const raw = {
  id: '',
  name: '',
  picture: ''
}

export const userDataVar = makeVar<userData>(decodeToken() || raw)

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
