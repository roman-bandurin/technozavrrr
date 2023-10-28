import Vue from "vue"
import Vuex from "vuex"

const products = [
  {
    id: 1,
    categoryId: 4,
    image: "img/radio.jpg",
    title: "Радионяня Motorola MBP16",
    price: 3690,
    colors: ["#73B6EA", "#8BE000", "#222"],
  },
  {
    id: 2,
    categoryId: 1,
    image: "img/toothbrush.jpg",
    title: "Ультразвуковая зубная щётка Playbrush Smart Sonic",
    price: 5660,
    colors: ["#F0F0F0", "#8BE000", "#73B6EA"],
  },
]

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
