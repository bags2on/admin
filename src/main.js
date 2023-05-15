import { createApp, provide, h } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./tailwind.css"
import client from "./apollo"
import { DefaultApolloClient } from "@vue/apollo-composable"

import CatalogItem from "./components/CatalogItem.vue"
import IconBase from "./components/IconBase.vue"

const app = createApp({
  setup() {
    provide(DefaultApolloClient, client)
  },
  render: () => h(App),
})

app.component("CatalogItem", CatalogItem)
app.component("IconBase", IconBase)

app.use(router)
app.use(store)

app.mount("#app")
