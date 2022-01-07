import { openSnackbar, closeSnackbar } from './ui'
import { extractUserData, logout } from './user'

import { snackbarMessageVar, userDataVar, isAuthenticatedVar } from '../cache'

export const UiMutations = {
  // TODO: maybe SharedMutations
  openSnackbar: openSnackbar(snackbarMessageVar),
  closeSnackbar: closeSnackbar(snackbarMessageVar)
}

export const UserMutations = {
  extractUserData: extractUserData(userDataVar, isAuthenticatedVar, snackbarMessageVar),
  logout: logout(userDataVar, isAuthenticatedVar)
}
