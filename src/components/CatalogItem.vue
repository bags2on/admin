<template>
  <div class="flex">
    <img :src="preview" :alt="title" class="block max-w-xs max-h-24" />
    <p>{{ id }} - {{ title }}</p>
  </div>
</template>
<script>
export default {
  name: "CatalogItem",
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
}
</script>
<style></style>
