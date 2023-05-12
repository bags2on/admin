<template>
  <p v-if="loading">Loading...</p>
  <ul v-else>
    <li v-for="product in products" :key="product.id" class="mb-5x">
      <p>{{ product.title }}</p>
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
