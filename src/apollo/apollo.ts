import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client'
import { cache } from './cache/cache'

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

const client = new ApolloClient({
  cache,
  connectToDevTools: withDevTools,
  link: concat(authMiddleware, httpLink)
})

export default client
