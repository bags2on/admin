import * as Types from '../../../types'

import { gql } from '@apollo/client'
export type AllProductsQueryVariables = Types.Exact<{
  gender?: Types.Maybe<Array<Types.Maybe<Types.Gender>> | Types.Maybe<Types.Gender>>
  isHidden?: Types.Maybe<Types.Scalars['Boolean']>
  instock?: Types.Maybe<Types.Scalars['Boolean']>
  mainTag?: Types.Maybe<Types.MainTag>
  price?: Types.Maybe<Types.PriceRange>
  category?: Types.Maybe<Array<Types.Maybe<Types.CategoryType>> | Types.Maybe<Types.CategoryType>>
  page: Types.Scalars['Int']
}>

export type AllProductsQuery = {
  __typename?: 'Query'
  allProducts: {
    __typename?: 'ProductsResponse'
    priceRange: { __typename?: 'PriceRangeType'; gt: number; lt: number }
    pagination: { __typename?: 'Pagination'; totalPages: number; currentPage: number }
    products: Array<{
      __typename?: 'Product'
      id: string
      title: string
      instock: boolean
      isHidden: boolean
      currentPrice: number
      basePrice: number
      mainTag: Types.MainTag
      preview: string
    }>
  }
}

export type AllProductsVariables = AllProductsQueryVariables
export type AllProductsAllProducts = NonNullable<AllProductsQuery['allProducts']>
export type AllProductsPriceRange = NonNullable<
  NonNullable<AllProductsQuery['allProducts']>['priceRange']
>
export type AllProductsPagination = NonNullable<
  NonNullable<AllProductsQuery['allProducts']>['pagination']
>
export type AllProductsProducts = NonNullable<
  NonNullable<NonNullable<AllProductsQuery['allProducts']>['products']>[number]
>

export const AllProductsDocument = gql`
  query AllProducts(
    $gender: [Gender]
    $isHidden: Boolean
    $instock: Boolean
    $mainTag: MainTag
    $price: PriceRange
    $category: [CategoryType]
    $page: Int!
  ) {
    allProducts(
      filter: {
        gender: $gender
        isHidden: $isHidden
        instock: $instock
        mainTag: $mainTag
        price: $price
        category: $category
        page: $page
      }
    ) {
      priceRange {
        gt
        lt
      }
      pagination {
        totalPages
        currentPage
      }
      products {
        id
        title
        instock
        isHidden
        currentPrice
        basePrice
        mainTag
        preview
      }
    }
  }
`
