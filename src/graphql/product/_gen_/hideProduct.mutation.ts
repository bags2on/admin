import * as Types from '../../../types'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type HideProductMutationVariables = Types.Exact<{
  id: Types.Scalars['ID']
  isHidden: Types.Scalars['Boolean']
}>

export type HideProductMutation = {
  __typename?: 'Mutation'
  hideProduct?: Types.Maybe<{ __typename?: 'HideProductResponse'; isHidden: boolean }>
}

export type HideProductVariables = HideProductMutationVariables
export type HideProductHideProduct = NonNullable<HideProductMutation['hideProduct']>

export const HideProductDocument = gql`
  mutation hideProduct($id: ID!, $isHidden: Boolean!) {
    hideProduct(id: $id, isHidden: $isHidden) {
      isHidden
    }
  }
`
export type HideProductMutationFn = Apollo.MutationFunction<
  HideProductMutation,
  HideProductMutationVariables
>
export type HideProductMutationOptions = Apollo.BaseMutationOptions<
  HideProductMutation,
  HideProductMutationVariables
>
