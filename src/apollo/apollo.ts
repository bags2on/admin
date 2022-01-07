/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloClient, HttpLink, ApolloLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { cache } from './cache/cache'
import { decodeToken, promiseToObservable } from '../utils/helpers'
import { UserMutations } from './cache/mutations'

// 'https://api.bags2on.com.ua/graphql'
const GRAPHQL_URL = process.env.REACT_APP_API_URL + 'graphql'
const withDevTools = process.env.NODE_ENV === 'development'

const httpLink = new HttpLink({ uri: GRAPHQL_URL })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token') || ''

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  }))

  return forward(operation)
})

const refreshLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    const err = graphQLErrors[0].extensions

    switch (err?.code) {
      case '401':
        console.warn('token expired: refreshing')
        const token = decodeToken()
        if (!token) return

        const refsresh = fetch(process.env.REACT_APP_API_URL + 'refresh-token', {
          method: 'POST',
          cache: 'no-cache',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token: token.refreshToken
          })
        })
          .then((resp) => (resp.status === 401 ? Promise.reject(resp) : resp))
          .then((resp) => resp.text())
          .then((token) => {
            UserMutations.extractUserData(token)
            return token
          })
          .catch(() => {
            UserMutations.logout()
          })

        return promiseToObservable(refsresh).flatMap((token) => {
          const oldHeaders = operation.getContext().headers
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `Bearer ${token}`
            }
          })

          // retry request
          return forward(operation)
        })
    }
  }

  if (networkError) console.warn(`[Network error]: ${networkError}`)
})

const client = new ApolloClient({
  cache,
  link: from([authMiddleware, refreshLink, httpLink]),
  connectToDevTools: withDevTools
})

export default client
