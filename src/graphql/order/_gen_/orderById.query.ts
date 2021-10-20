import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type OrderByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type OrderByIdQuery = {
  __typename?: 'Query'
  order?: Types.Maybe<
    | {
        __typename: 'Order'
        id: string
        receiverName: string
        receiverSurname: string
        receiverEmail: string
        receiverPhone: string
        cityId: string
        postOfficeId: string
        status: string
        createdAt: string
        cartItems: Array<{ __typename?: 'CartItemType'; id: string; amount: number }>
        products: Array<{
          __typename?: 'Product'
          id: string
          title: string
          preview: string
          instock: boolean
          mainTag: Types.MainTag
          currentPrice: number
          basePrice: number
        }>
      }
    | { __typename: 'NotFound'; message: string }
  >
}

type DiscriminateUnion<T, U> = T extends U ? T : never

export type OrderByIdVariables = OrderByIdQueryVariables
export type OrderByIdOrder = NonNullable<OrderByIdQuery['order']>
export type OrderByIdOrderInlineFragment = DiscriminateUnion<
  NonNullable<OrderByIdQuery['order']>,
  { __typename?: 'Order' }
>
export type OrderByIdCartItems = NonNullable<
  NonNullable<
    DiscriminateUnion<NonNullable<OrderByIdQuery['order']>, { __typename?: 'Order' }>['cartItems']
  >[number]
>
export type OrderByIdProducts = NonNullable<
  NonNullable<
    DiscriminateUnion<NonNullable<OrderByIdQuery['order']>, { __typename?: 'Order' }>['products']
  >[number]
>
export type OrderByIdNotFoundInlineFragment = DiscriminateUnion<
  NonNullable<OrderByIdQuery['order']>,
  { __typename?: 'NotFound' }
>

export const OrderByIdDocument = gql`
  query OrderById($id: ID!) {
    order(id: $id) {
      __typename
      ... on Order {
        id
        receiverName
        receiverSurname
        receiverEmail
        receiverPhone
        cityId
        postOfficeId
        status
        createdAt
        cartItems {
          id
          amount
        }
        products {
          id
          title
          preview
          instock
          mainTag
          currentPrice
          basePrice
        }
      }
      ... on NotFound {
        message
      }
    }
  }
`
