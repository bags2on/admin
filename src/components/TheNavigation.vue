<template>
  <nav class="h-screen">
    <ul class="p-4">
      <li v-for="route in routes" :key="route.path" class="mb-4">
        <router-link
          :to="route.path"
          class="flex items-center font-medium text-lg"
        >
          <IconBase class="inline mr-5">
            <component :is="route.icon"></component>
          </IconBase>
          <span>{{ route.text }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
import IconDashboard from "@/components/icons/IconDashboard.vue"
import IconBoxCheck from "@/components/icons/IconBoxCheck.vue"
import IconList from "@/components/icons/IconList.vue"

export default {
  components: {
    IconDashboard,
    IconBoxCheck,
  },
  data() {
    return {
      routes: [
        {
          path: "/",
          text: "Дашборд",
          icon: IconDashboard,
        },
        {
          path: "/about",
          text: "Заказы",
          icon: IconBoxCheck,
        },
        {
          path: "/catalog",
          text: "Каталог",
          icon: IconList,
        },
      ],
    }
  },
}
</script>
<style scoped>
nav {
  background-color: #191919;
}

nav a {
  color: #fff;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
