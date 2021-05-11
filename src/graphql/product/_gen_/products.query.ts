import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type AllProductsQueryVariables = Types.Exact<{
  gender: Types.Gender
  instock: Types.Scalars['Boolean']
}>

export type AllProductsQuery = {
  __typename?: 'Query'
  products: Array<{
    __typename?: 'Product'
    id: string
    title: string
    instock: boolean
    isHidden: boolean
    price: number
    discount: number
    mainTag: string
    preview: string
  }>
}

export type AllProductsVariables = AllProductsQueryVariables
export type AllProductsProducts = NonNullable<NonNullable<AllProductsQuery['products']>[number]>

export const AllProductsDocument = gql`
  query allProducts($gender: Gender!, $instock: Boolean!) {
    products(filter: { gender: $gender, instock: $instock }) {
      id
      title
      instock
      isHidden
      price
      discount
      mainTag
      preview
    }
  }
`
