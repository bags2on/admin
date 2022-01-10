import { ReactiveVar } from '@apollo/client'
import type { snackbarEvent } from '../../variables'

export default (snackbarEventVar: ReactiveVar<snackbarEvent>): (() => void) => {
  return (): void => {
    snackbarEventVar({
      message: '',
      type: 'success'
    })
  }
}
