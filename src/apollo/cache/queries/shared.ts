import { gql } from '@apollo/client'

export const GET_SNACKBAR_EVENT = gql`
  query GetSnackbarEvent {
    snackbarEvent @client
  }
`
