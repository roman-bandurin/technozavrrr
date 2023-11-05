import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { API_BASE_URL } from "@/config"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartProductsData: undefined,

    userAccessKey: localStorage.getItem("userAccessKey"),
    cartProducts: [],

    loadCartTimer: null,
    cartLoading: false,
    cartLoadingFailed: false,
  },
  getters: {
    cartDetailProducts({
      cartProducts,
      cartProductsData: { items: products } = {},
    }) {
      return cartProducts
        .map((item) => ({
          ...item,
          product: products.find(
            ({ product: { id: productId } }) => productId === item.productId
          )?.product,
        }))
        .map(({ productId, product, amount }) => ({
          productId,
          product: {
            ...product,
            image: product.image.file.url,
          },
          price: product.price,
          amount,
          value: product.price * amount,
        }))
    },
    cartTotalAmount({}, { cartDetailProducts }) {
      return cartDetailProducts.reduce((acc, { amount }) => acc + amount, 0)
    },
    cartTotalValue({}, { cartDetailProducts }) {
      return cartDetailProducts.reduce((acc, { value }) => acc + value, 0)
    },
  },
  mutations: {
    updateCartProductAmount({ cartProducts }, { productId, amount }) {
      const cartProduct = cartProducts.find(
        (item) => item.productId === productId
      )

      if (cartProduct) {
        if (+amount > 0) {
          cartProduct.amount = +amount
        }
      }
    },

    updateCartProductsData(state, data) {
      state.cartProductsData = data
    },
    syncUserAccessKey(state) {
      const {
        userAccessKey,
        cartProductsData: {
          user: { accessKey },
        },
      } = state
      if (!userAccessKey) {
        localStorage.setItem("userAccessKey", accessKey)
        state.userAccessKey = accessKey
      }
    },
    syncCartProducts(state) {
      const {
        cartProductsData: { items },
      } = state
      state.cartProducts = items.map(
        ({ product: { id: productId }, quantity: amount }) => ({
          productId,
          amount,
        })
      )
    },

    updateCartLoadTimer(
      state,
      { cartLoading, cartLoadingFailed, loadCartTimer, isClear }
    ) {
      cartLoading !== null ? (state.cartLoading = cartLoading) : null
      cartLoadingFailed !== null ? (state.cartLoadingFailed = cartLoadingFailed) : null
      loadCartTimer ? (state.loadCartTimer = loadCartTimer) : null
      isClear ? clearTimeout(state.loadCartTimer) : null
    },
    resetCart(state) {
      state.cartProductsData = undefined
      state.cartProducts = []
    },
  },
  actions: {
    loadCart({ commit, state: { userAccessKey } }) {
      commit("updateCartLoadTimer", {
        cartLoading: true,
        cartLoadingFailed: false,
        loadCartTimer: null,
        isClear: true,
      })

      this.loadCartTimer = setTimeout(
        () =>
          axios
            .get("baskets", {
              baseURL: API_BASE_URL,
              params: {
                userAccessKey,
              },
            })
            .then(
              ({ data }) => (
                commit("updateCartProductsData", data),
                commit("syncUserAccessKey"),
                commit("syncCartProducts")
              )
            )
            .catch(() =>
              commit("updateCartLoadTimer", {
                cartLoading: null,
                cartLoadingFailed: true,
                loadCartTimer: null,
                isClear: false,
              })
            )
            .then(() =>
              commit("updateCartLoadTimer", {
                cartLoading: false,
                cartLoadingFailed: null,
                loadCartTimer: null,
                isClear: false,
              })
            ),
        5000
      )
    },
    addProductToCart(
      { commit, state: { userAccessKey } },
      { productId, amount: quantity }
    ) {
      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
        axios
          .post(
            "baskets/products",
            {
              productId,
              quantity,
            },
            {
              baseURL: API_BASE_URL,
              params: {
                userAccessKey,
              },
            }
          )
          .then(
            ({ data }) => (
              commit("updateCartProductsData", data), commit("syncCartProducts")
            )
          )
      )
    },
    updateCartProductAmount(
      { commit, state: { userAccessKey } },
      { productId, amount }
    ) {
      commit("updateCartProductAmount", { productId, amount })

      if (!(amount > 0)) return

      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
        axios
          .put(
            "baskets/products",
            {
              productId,
              quantity: amount,
            },
            {
              baseURL: API_BASE_URL,
              params: {
                userAccessKey,
              },
            }
          )
          .then(({ data }) => commit("updateCartProductsData", data))
          .catch(() => commit("syncCartProducts"))
      )
    },
    deleteCartProduct({ commit, state: { userAccessKey } }, { productId }) {
      commit("updateCartLoadTimer", {
        cartLoading: true,
        cartLoadingFailed: false,
        loadCartTimer: null,
        isClear: true,
      })

      return new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
        axios
          .delete("baskets/products", {
            baseURL: API_BASE_URL,
            params: {
              userAccessKey,
            },
            data: {
              productId,
            },
          })
          .then(
            ({ data }) => (
              commit("updateCartProductsData", data), commit("syncCartProducts")
            )
          )
          .catch(() =>
            commit("updateCartLoadTimer", {
              cartLoading: null,
              cartLoadingFailed: true,
              loadCartTimer: null,
              isClear: false,
            })
          )
          .then(() =>
            commit("updateCartLoadTimer", {
              cartLoading: false,
              cartLoadingFailed: null,
              loadCartTimer: null,
              isClear: false,
            })
          )
      )
    },
  },
})
