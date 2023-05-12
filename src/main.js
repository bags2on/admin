import { createApp, provide, h } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./tailwind.css"
import client from "./apollo"

import { DefaultApolloClient } from "@vue/apollo-composable"

const app = createApp({
  setup() {
    provide(DefaultApolloClient, client)
  },
  render: () => h(App),
})

app.use(router)
app.use(store)

app.mount("#app")
