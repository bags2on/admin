import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type UpdateProductMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
  title: Types.Scalars['String']
  basePrice: Types.Scalars['Int']
  currentPrice?: Types.Maybe<Types.Scalars['Int']>
  instock: Types.Scalars['Boolean']
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
    $basePrice: Int!
    $currentPrice: Int
    $instock: Boolean!
    $description: String
  ) {
    updateProduct(
      input: {
        id: $id
        title: $title
        basePrice: $basePrice
        currentPrice: $currentPrice
        instock: $instock
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
