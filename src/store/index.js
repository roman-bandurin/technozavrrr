import Vue from "vue"
import Vuex from "vuex"

import products from "@/data/products.json"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartProducts: [{ productId: 1, amount: 1 }],
  },
  getters: {
    cartDetailProducts({ cartProducts }) {
      return cartProducts
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.productId),
        }))
        .map((item) => ({
          ...item,
          priceAmount: item.product.price * item.amount,
        }))
    },
    cartTotalPrice({}, { cartDetailProducts }) {
      return cartDetailProducts.reduce(
        (acc, { priceAmount }) => acc + priceAmount,
        0
      )
    },
  },
  mutations: {
    addProductToCart({ cartProducts }, { productId, amount }) {
      const cartProduct = cartProducts.find(
        (item) => item.productId === productId
      )

      if (cartProduct) {
        this.commit("updateCartProductAmount", {
          productId,
          amount: cartProduct.amount + +amount,
        })
      } else {
        cartProducts.push({
          productId,
          amount,
        })
      }
    },
    updateCartProductAmount({ cartProducts }, { productId, amount }) {
      const cartProduct = cartProducts.find(
        (item) => item.productId === productId
      )

      if (cartProduct) {
        if (+amount > 0) {
          cartProduct.amount = +amount
        } else {
          this.commit("deleteCartProduct", { productId })
        }
      }
    },
    deleteCartProduct(state, { productId }) {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.productId !== productId
      )
    },
  },
})
