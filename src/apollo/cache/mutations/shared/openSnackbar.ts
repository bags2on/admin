import { ReactiveVar } from '@apollo/client'
import type { snackbarEvent } from '../../variables'

export default (snackbarEventVar: ReactiveVar<snackbarEvent>): ((e: snackbarEvent) => void) => {
  return (newEvent: snackbarEvent): void => {
    snackbarEventVar(newEvent)
  }
}
