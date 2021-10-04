import { InMemoryCache, makeVar } from '@apollo/client'

interface snackbarMessage {
  type: 'error' | 'success'
  message: string
}

export const snackbarMessageVar = makeVar<snackbarMessage>({
  type: 'success',
  message: ''
})

const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
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
