import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type GetProductByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetProductByIdQuery = {
  __typename?: 'Query'
  product?: Types.Maybe<{
    __typename?: 'Product'
    id: string
    title: string
    currentPrice: number
    basePrice: number
    tags: Array<string>
    images: Array<string>
    description: string
    instock: boolean
  }>
}

export type GetProductByIdVariables = GetProductByIdQueryVariables
export type GetProductByIdProduct = NonNullable<GetProductByIdQuery['product']>

export const GetProductByIdDocument = gql`
  query getProductByID($id: ID!) {
    product(id: $id) {
      id
      title
      currentPrice
      basePrice
      tags
      images
      description
      instock
    }
  }
`
