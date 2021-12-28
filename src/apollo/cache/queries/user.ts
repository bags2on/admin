import { gql } from '@apollo/client'

export const GET_AUTHENTICATION_STATE = gql`
  query GetAuthenticationState {
    isAuthenticated @client
  }
`

export const GET_USER_DATA = gql`
  query GetUserData {
    userData @client
  }
`
