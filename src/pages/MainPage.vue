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
        :color.sync="filterColor"
        @update:categoryId="page = 1"
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
          v-if="filteredProductsCount"
          v-model="page"
          :items-count="filteredProductsCount"
          :items-per-page="productsPerPage"
        />
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios"
import products from "@/data/products.json"
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
      filterColor: null,

      productsData: null,
    }
  },
  computed: {
    filteredProducts() {
      let filteredProducts = products

      if (this.filterPriceFrom > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price > this.filterPriceFrom
        )
      }

      if (this.filterPriceTo > 0) {
        filteredProducts = filteredProducts.filter(
          (product) => product.price < this.filterPriceTo
        )
      }

      if (this.filterCategoryId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.categoryId === this.filterCategoryId
        )
      }

      if (this.filterColor) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.colors &&
            product.colors.length &&
            product.colors.includes(this.filterColor)
        )
      }
      return filteredProducts
    },
    filteredProductsCount() {
      return this.productsData?.pagination?.total ?? 0
    },
    pageProducts() {
      return (
        this.productsData?.items?.map((product) => ({
          ...product,
          image: product.image.file.url,
        })) ?? []
      )
    },
  },
  watch: {
    page: {
      handler() {
        return this.loadProducts()
      },
      immediate: true,
    },
  },
  methods: {
    loadProducts() {
      axios
        .get("products", {
          baseURL: "https://vue-study.skillbox.cc/api",
          params: {
            page: this.page,
            limit: this.productsPerPage,
          },
        })
        .then(({ data }) => (this.productsData = data))
    },
  },
}
</script>
