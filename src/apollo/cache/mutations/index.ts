import { openSnackbar, closeSnackbar } from './shared'
import { extractUserData, logout } from './user'

import { snackbarEventVar, userDataVar, isAuthenticatedVar } from '../variables'

export const SharedMutations = {
  openSnackbar: openSnackbar(snackbarEventVar),
  closeSnackbar: closeSnackbar(snackbarEventVar)
}

export const UserMutations = {
  extractUserData: extractUserData(userDataVar, isAuthenticatedVar, snackbarEventVar),
  logout: logout(userDataVar, isAuthenticatedVar)
}
