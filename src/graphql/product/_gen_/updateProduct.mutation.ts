import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type UpdateProductMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
  title: Types.Scalars['String']
  price: Types.Scalars['Int']
  discount: Types.Scalars['Int']
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
    $price: Int!
    $discount: Int!
    $instock: Boolean!
    $description: String
  ) {
    updateProduct(
      input: {
        id: $id
        title: $title
        price: $price
        discount: $discount
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
