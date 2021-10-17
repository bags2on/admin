import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type AllOrdersQueryVariables = Types.Exact<{
  input: Types.OrderFilter
}>

export type AllOrdersQuery = {
  __typename?: 'Query'
  allOrders: Array<{ __typename?: 'Order'; id: string; status: string; createdAt: string }>
}

export type AllOrdersVariables = AllOrdersQueryVariables
export type AllOrdersAllOrders = NonNullable<NonNullable<AllOrdersQuery['allOrders']>[number]>

export const AllOrdersDocument = gql`
  query AllOrders($input: OrderFilter!) {
    allOrders(input: $input) {
      id
      status
      createdAt
    }
  }
`
