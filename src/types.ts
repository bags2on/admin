export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Upload: any
}

export type CartItem = {
  id: Scalars['String']
  amount: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  createProduct?: Maybe<NewProductResponse>
  createOrder?: Maybe<OrderResponse>
}

export type MutationCreateProductArgs = {
  input?: Maybe<NewProductInput>
}

export type MutationCreateOrderArgs = {
  input?: Maybe<OrderInput>
}

export type NewProductInput = {
  title: Scalars['String']
  price: Scalars['Int']
  discountPrice?: Maybe<Scalars['Int']>
  preview: Scalars['Upload']
  images?: Maybe<Array<Maybe<Scalars['String']>>>
  tags?: Maybe<Array<Maybe<Scalars['String']>>>
  description?: Maybe<Scalars['String']>
}

export type NewProductResponse = {
  __typename?: 'NewProductResponse'
  message: Scalars['String']
}

export type OrderInput = {
  name: Scalars['String']
  surname: Scalars['String']
  email: Scalars['String']
  phone: Scalars['String']
  cityId: Scalars['String']
  postOfficeId: Scalars['String']
  cartItems: Array<CartItem>
}

export type OrderResponse = {
  __typename?: 'OrderResponse'
  message: Scalars['String']
}

export type Product = {
  __typename?: 'Product'
  id: Scalars['ID']
  title: Scalars['String']
  price: Scalars['Int']
  discount: Scalars['Int']
  amount: Scalars['Int']
  instock: Scalars['Boolean']
  preview: Scalars['String']
  images: Array<Scalars['String']>
  tags: Array<Scalars['String']>
  mainTag: Scalars['String']
  description: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  products: Array<Product>
  product?: Maybe<Product>
  productsByID: Array<Product>
}

export type QueryProductArgs = {
  id: Scalars['ID']
}

export type QueryProductsByIdArgs = {
  input?: Maybe<Array<CartItem>>
}

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {}
}
export default result
