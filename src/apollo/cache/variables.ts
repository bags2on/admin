import { makeVar } from '@apollo/client'
import { decodeToken } from '../../utils/helpers'

interface snackbarEvent {
  type: 'error' | 'success'
  message: string
}

export const snackbarEventVar = makeVar<snackbarEvent>({
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

export type { snackbarEvent, userData }
