import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type GetProductByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetProductByIdQuery = {
  __typename?: 'Query'
  product?: Types.Maybe<
    | {
        __typename: 'Product'
        id: string
        title: string
        amount: number
        basePrice: number
        currentPrice: number
        gender: Types.Gender
        instock: boolean
        isHidden: boolean
        mainTag: Types.MainTag
        category: Types.CategoryType
        description: string
        preview: string
        features: {
          __typename?: 'ProductFeatures'
          material: string
          color: string
          gender: Types.Gender
          category: Types.CategoryType
        }
      }
    | { __typename: 'NotFound'; message: string }
  >
}

type DiscriminateUnion<T, U> = T extends U ? T : never

export type GetProductByIdVariables = GetProductByIdQueryVariables
export type GetProductByIdProduct = NonNullable<GetProductByIdQuery['product']>
export type GetProductByIdProductInlineFragment = DiscriminateUnion<
  NonNullable<GetProductByIdQuery['product']>,
  { __typename?: 'Product' }
>
export type GetProductByIdFeatures = NonNullable<
  DiscriminateUnion<
    NonNullable<GetProductByIdQuery['product']>,
    { __typename?: 'Product' }
  >['features']
>
export type GetProductByIdNotFoundInlineFragment = DiscriminateUnion<
  NonNullable<GetProductByIdQuery['product']>,
  { __typename?: 'NotFound' }
>

export const GetProductByIdDocument = gql`
  query getProductByID($id: ID!) {
    product(id: $id) {
      __typename
      ... on Product {
        id
        title
        amount
        basePrice
        currentPrice
        gender
        instock
        isHidden
        mainTag
        category
        description
        preview
        features {
          material
          color
          gender
          category
        }
      }
      ... on NotFound {
        message
      }
    }
  }
`
