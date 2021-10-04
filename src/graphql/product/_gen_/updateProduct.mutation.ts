import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type UpdateProductMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
  title: Types.Scalars['String']
  amount: Types.Scalars['Int']
  basePrice: Types.Scalars['Int']
  currentPrice?: Types.Maybe<Types.Scalars['Int']>
  instock: Types.Scalars['Boolean']
  gender: Types.Gender
  mainTag: Types.MainTag
  category: Types.CategoryType
  features: Types.ProductFeaturesInput
  description?: Types.Maybe<Types.Scalars['String']>
}>

export type UpdateProductMutation = {
  __typename?: 'Mutation'
  updateProduct?: Types.Maybe<{ __typename?: 'UpdateProductResponse'; message: string }>
}

export type UpdateProductVariables = UpdateProductMutationVariables
export type UpdateProductUpdateProduct = NonNullable<UpdateProductMutation['updateProduct']>

export const UpdateProductDocument = gql`
  mutation updateProduct(
    $id: ID!
    $title: String!
    $amount: Int!
    $basePrice: Int!
    $currentPrice: Int
    $instock: Boolean!
    $gender: Gender!
    $mainTag: MainTag!
    $category: CategoryType!
    $features: ProductFeaturesInput!
    $description: String
  ) {
    updateProduct(
      input: {
        id: $id
        title: $title
        amount: $amount
        basePrice: $basePrice
        currentPrice: $currentPrice
        gender: $gender
        instock: $instock
        mainTag: $mainTag
        category: $category
        features: $features
        description: $description
      }
    ) {
      message
    }
  }
`
export type UpdateProductMutationFn = Apollo.MutationFunction<
  UpdateProductMutation,
  UpdateProductMutationVariables
>
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<
  UpdateProductMutation,
  UpdateProductMutationVariables
>
