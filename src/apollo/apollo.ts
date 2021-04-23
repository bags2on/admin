import { ApolloClient } from '@apollo/client'
import { cache } from './cache/cache'

const API_URL = process.env.REACT_APP_API_URL
const withDevTools = process.env.NODE_ENV === 'development'

const client = new ApolloClient({
  uri: API_URL,
  cache,
  connectToDevTools: withDevTools
})

export default client
