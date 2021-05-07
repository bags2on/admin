import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type AllProductsQueryVariables = Types.Exact<{ [key: string]: never }>

export type AllProductsQuery = {
  __typename?: 'Query'
  products: Array<{
    __typename?: 'Product'
    id: string
    title: string
    instock: boolean
    price: number
    discount: number
    mainTag: string
    preview: string
  }>
}

export type AllProductsVariables = AllProductsQueryVariables
export type AllProductsProducts = NonNullable<NonNullable<AllProductsQuery['products']>[number]>

export const AllProductsDocument = gql`
  query allProducts {
    products {
      id
      title
      instock
      price
      discount
      mainTag
      preview
    }
  }
`
