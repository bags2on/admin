import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type CreateProductMutationVariables = Types.Exact<{
  title: Types.Scalars['String']
  basePrice: Types.Scalars['Int']
  currentPrice?: Types.Maybe<Types.Scalars['Int']>
  instock: Types.Scalars['Boolean']
  gender: Types.Gender
  mainTag: Types.Scalars['String']
  category: Types.CategoryType
  description?: Types.Maybe<Types.Scalars['String']>
}>

export type CreateProductMutation = {
  __typename?: 'Mutation'
  createProduct?: Types.Maybe<{ __typename?: 'NewProductResponse'; id: string }>
}

export type CreateProductVariables = CreateProductMutationVariables
export type CreateProductCreateProduct = NonNullable<CreateProductMutation['createProduct']>

export const CreateProductDocument = gql`
  mutation CreateProduct(
    $title: String!
    $basePrice: Int!
    $currentPrice: Int
    $instock: Boolean!
    $gender: Gender!
    $mainTag: String!
    $category: CategoryType!
    $description: String
  ) {
    createProduct(
      input: {
        title: $title
        basePrice: $basePrice
        currentPrice: $currentPrice
        gender: $gender
        instock: $instock
        mainTag: $mainTag
        category: $category
        description: $description
      }
    ) {
      id
    }
  }
`
export type CreateProductMutationFn = Apollo.MutationFunction<
  CreateProductMutation,
  CreateProductMutationVariables
>
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<
  CreateProductMutation,
  CreateProductMutationVariables
>
