import { ReactiveVar } from '@apollo/client'

interface snackbarMessage {
  type: 'error' | 'success'
  message: string
}

export default (
  snackbarMessageVar: ReactiveVar<snackbarMessage>
): ((message: snackbarMessage) => void) => {
  return (message: snackbarMessage): void => {
    snackbarMessageVar(message)
  }
}
