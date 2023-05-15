<template>
  <div class="flex">
    <div class="basis-1/4 xl:basis-1/6 shrink-0">
      <TheNavigation />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>
<script>
import TheNavigation from "@/components/TheNavigation.vue"

export default {
  components: {
    TheNavigation,
  },
}
</script>
