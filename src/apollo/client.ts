import { ApolloClient } from '@apollo/client'
import { cache } from './cache'

export default new ApolloClient({
  uri: 'localhost:8000/',
  cache
})
