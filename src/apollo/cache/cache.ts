import { InMemoryCache } from '@apollo/client'
import { isAuthenticatedVar, userDataVar, snackbarEventVar } from './variables'
import type { userData, snackbarEvent } from './variables'

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
        snackbarEvent: {
          read(): snackbarEvent {
            return snackbarEventVar()
          }
        }
      }
    }
  }
})

export { cache }
