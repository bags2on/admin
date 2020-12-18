import { ApolloClient } from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { cache } from './cache'

const API_URL = process.env.REACT_APP_API_URL

export default new ApolloClient({
  link: createUploadLink({ uri: API_URL }),
  cache
})
