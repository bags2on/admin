<template>
  <p v-if="loading">Loading...</p>
  <ul v-else class="flex flex-wrap">
    <li v-for="product in products" :key="product.id" class="mb-5x basis-3/12">
      <CatalogItem
        :id="product.id"
        :title="product.title"
        :preview="product.preview"
      />
    </li>
  </ul>
</template>

<script>
import { GetAllProductsQuery } from "@/graphql/queries/product"
import { useQuery } from "@vue/apollo-composable"
import { computed } from "vue"

export default {
  name: "ProductCatalog",

  setup() {
    const { result, loading } = useQuery(GetAllProductsQuery, {
      page: 1,
    })

    const products = computed(() => result.value.allProducts.products)

    return {
      loading,
      products,
    }
  },
}
</script>
