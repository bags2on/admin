import gql from "graphql-tag"

export const GetAllProductsQuery = gql`
  query AllProducts(
    $gender: [Gender]
    $isHidden: Boolean = false
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
        currentPrice
        basePrice
        preview
        mainTag
      }
    }
  }
`
