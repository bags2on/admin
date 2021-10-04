import { ReactiveVar } from '@apollo/client'

interface snackbarMessage {
  type: 'error' | 'success'
  message: string
}

export default (snackbarMessageVar: ReactiveVar<snackbarMessage>): (() => void) => {
  return (): void => {
    snackbarMessageVar({
      message: '',
      type: 'success'
    })
  }
}
