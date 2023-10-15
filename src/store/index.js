import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 1 }
    ],
  },
  getters: {},
  mutations: {
    addProductToCard({ cartProducts }, { productId, amount }) {
      const cartProduct = cartProducts.find(
        (item) => item.productId === productId
      )

      if (cartProduct) {
        cartProduct.amount += +amount
      } else {
        cartProducts.push({
          productId,
          amount,
        })
      }
    },
  },
  actions: {
  },
  modules: {
  },
})
