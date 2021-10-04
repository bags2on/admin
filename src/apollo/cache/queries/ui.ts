import { gql } from '@apollo/client'

export const GET_SNACKBAR_MESSAGE = gql`
  query GetSnackbarMessage {
    snackbarMessage @client
  }
`
