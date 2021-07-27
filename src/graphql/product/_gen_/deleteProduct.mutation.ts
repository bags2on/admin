import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type DeleteProductMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type DeleteProductMutation = {
  __typename?: 'Mutation'
  deleteProduct?: Types.Maybe<{ __typename?: 'DeleteProductResponse'; message: string }>
}

export type DeleteProductVariables = DeleteProductMutationVariables
export type DeleteProductDeleteProduct = NonNullable<DeleteProductMutation['deleteProduct']>

export const DeleteProductDocument = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      message
    }
  }
`
export type DeleteProductMutationFn = Apollo.MutationFunction<
  DeleteProductMutation,
  DeleteProductMutationVariables
>
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<
  DeleteProductMutation,
  DeleteProductMutationVariables
>
