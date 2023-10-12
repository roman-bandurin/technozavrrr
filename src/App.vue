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
        <ProductList
          v-if="pageProducts && pageProducts.length"
          :products="pageProducts"
        />

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
import products from "@/data/products.json"
import ProductList from "@/components/ProductList.vue"
import BasePagination from "@/components/BasePagination.vue"
import ProductFilter from "@/components/ProductFilter.vue"

export default {
  name: "App",
  components: {
    ProductList,
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
          (product) => product.colors &&
            product.colors.length &&
            product.colors.includes(this.filterColor)
        )
      }
      return filteredProducts
    },
    filteredProductsCount() {
      return this.filteredProducts.length
    },
    pageProducts() {
      const offset = (this.page - 1) * this.productsPerPage
      return this.filteredProducts.slice(offset, offset + this.productsPerPage)
    },
  },
}
</script>
