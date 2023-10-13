<template>
  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
  />
</template>

<script>
import MainPage from "@/pages/MainPage.vue"
import ProductPage from "@/pages/ProductPage.vue"
import NotFoundPage from "@/pages/NotFoundPage.vue"
import eventBus from "@/eventBus"

const routes = {
  "": MainPage,
  main: MainPage,
  product: ProductPage,
}

export default {
  name: "App",
  components: {
    MainPage,
    ProductPage,
    NotFoundPage,
  },
  data() {
    return {
      currentPage: "main",
      currentPageParams: {},
    }
  },
  computed: {
    currentPageComponent() {
      return routes[this.currentPage] || "NotFoundPage"
    },
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName
      this.currentPageParams = pageParams || {}
    },
  },
  created() {
    eventBus.$on('goto-page', this.gotoPage)
  }
}
</script>
