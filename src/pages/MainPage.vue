<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> 152 товара </span>
    </div>

    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceFrom"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :color-id.sync="filterColorId"
      />

      <section class="catalog">
        <ul v-if="pageProducts && pageProducts.length" class="catalog__list">
          <ProductItem
            v-for="product in pageProducts"
            :key="product.id"
            v-bind="product"
          />
        </ul>

        <BasePagination
          v-if="pagination && pagination.pages > 1"
          v-model="page"
          :items-count="pagination.total"
          :items-per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios"
import { API_BASE_URL } from "@/config"
import ProductItem from "@/components/ProductItem.vue"
import BasePagination from "@/components/BasePagination.vue"
import ProductFilter from "@/components/ProductFilter.vue"

export default {
  name: "MainPage",
  components: {
    ProductItem,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      page: 1,
      productsPerPage: 6,

      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: null,
      filterColorId: null,

      productsData: null,
      loadProductsTimer: null,
    }
  },
  computed: {
    pageProducts() {
      return (
        this.productsData?.items?.map((product) => ({
          ...product,
          image: product.image.file.url,
        })) ?? []
      )
    },
    pagination() {
      return this.productsData?.pagination
    },
  },
  watch: {
    page: {
      handler() {
        return this.loadProducts()
      },
      immediate: true,
    },
    filterPriceFrom() {
      return this.loadProducts(true)
    },
    filterPriceTo() {
      return this.loadProducts(true)
    },
    filterCategoryId() {
      return this.loadProducts(true)
    },
    filterColorId() {
      return this.loadProducts(true)
    },
  },
  methods: {
    loadProducts(isResetPage = false) {
      clearTimeout(this.loadProductsTimer)

      this.loadProductsTimer = setTimeout(
        () =>
          axios
            .get("products", {
              baseURL: API_BASE_URL,
              params: {
                page: this.page,
                limit: this.productsPerPage,
                minPrice: this.filterPriceFrom,
                maxPrice: this.filterPriceTo,
                categoryId: this.filterCategoryId,
                colorId: this.filterColorId,
              },
            })
            .then(({ data }) => (this.productsData = data))
            .then(() => (isResetPage ? (this.page = 1) : null)),
        1000
      )
    },
  },
}
</script>
