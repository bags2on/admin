import { ApolloClient } from '@apollo/client'
import { cache } from './cache/cache'

// const API_URL = 'https://api.bags2on.com.ua/graphql'
const GRAPHQL_URL = process.env.REACT_APP_API_URL + 'graphql'
const withDevTools = process.env.NODE_ENV === 'development'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache,
  connectToDevTools: withDevTools,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.xPzNb5Lfob-wZ8TJlvY2NRDxMOlrX7Lz4WntHnKhC04'
  }
})

export default client
