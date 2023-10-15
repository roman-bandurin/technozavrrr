import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

/** @type { VueRouter['options']['routes'] } */
const routes = [
  {
    path: "/",
    name: "main",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "main" */ "@/pages/MainPage.vue"),
  },
  {
    path: "/product/:id",
    name: "product",
    component: () =>
      import(/* webpackChunkName: "product" */ "@/pages/ProductPage.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import(/* webpackChunkName: "product" */ "@/pages/CartPage.vue"),
  },
  {
    path: "*",
    name: "not-found",
    component: () =>
      import(/* webpackChunkName: "not-found" */ "@/pages/NotFoundPage.vue"),
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
})

export default router
