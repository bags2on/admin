import { openSnackbar, closeSnackbar } from './ui'

import { snackbarMessageVar } from '../cache'

export const UiMutations = {
  openSnackbar: openSnackbar(snackbarMessageVar),
  closeSnackbar: closeSnackbar(snackbarMessageVar)
}
