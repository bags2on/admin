import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type LogInRootQueryVariables = Types.Exact<{
  keyWord: Types.Scalars['String']
}>

export type LogInRootQuery = {
  __typename?: 'Query'
  logInRoot?: Types.Maybe<{ __typename?: 'LogInRsponse'; token: string }>
}

export type LogInRootVariables = LogInRootQueryVariables
export type LogInRootLogInRoot = NonNullable<LogInRootQuery['logInRoot']>

export const LogInRootDocument = gql`
  query LogInRoot($keyWord: String!) {
    logInRoot(input: { keyWord: $keyWord }) {
      token
    }
  }
`
