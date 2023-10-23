import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"

import { game1, game2 } from "./constants"
import out from "./utils"

// out(game1)
// out(game2)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app")
