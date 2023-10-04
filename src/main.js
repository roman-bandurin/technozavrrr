import Vue from 'vue'
import App from './App.vue'

import { game1, game2 } from './constants'
import out from './utils'

out(game1)
out(game2)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')