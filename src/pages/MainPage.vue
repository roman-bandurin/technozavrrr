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
        <div
          v-if="productsLoading || productsLoadingFailed"
          class="catalog__message-backdrop"
        >
          <div class="catalog__message-content">
            <div v-if="productsLoading" class="preloader"></div>
            <div v-if="productsLoadingFailed" class="filter">
              <p class="filter__title">Произошла ошибка при загрузке товаров</p>
              <button
                type="button"
                class="filter__submit button button--primery"
                @click.prevent="loadProducts(true)"
              >
                Попробовать еще раз
              </button>
            </div>
          </div>
        </div>

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
      productsLoading: false,
      productsLoadingFailed: false,
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
      this.productsLoading = true
      this.productsLoadingFailed = false

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
            .then(() => (isResetPage ? (this.page = 1) : null))
            .catch(() => (this.productsLoadingFailed = true))
            .then(() => (this.productsLoading = false)),
        1000
      )
    },
  },
}
</script>

<style scoped>
.catalog {
  position: relative;
}

.catalog__message-backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 2;
}

.preloader {
  animation: spin 1s linear infinite;
  height: 10px;
  width: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -5px;
}

@keyframes spin {
  0% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #9eff00,
      10px 30px #9eff00, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  6.25% {
    box-shadow: 0px -30px transparent, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #000,
      10px 30px #9eff00, 0px 30px #9eff00, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  12.5% {
    box-shadow: 0px -30px transparent, 10px -30px transparent, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #000,
      10px 30px #000, 0px 30px #9eff00, -10px 30px #9eff00,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  18.75% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px #000, 30px 0px #000, 30px 10px #000,
      20px 20px #000, 10px 30px #000, 0px 30px #000, -10px 30px #9eff00,
      -20px 20px #9eff00, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  25% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px #000,
      30px 10px #000, 20px 20px #000, 10px 30px #000, 0px 30px #000,
      -10px 30px #000, -20px 20px #9eff00, -30px 10px #9eff00,
      -30px 0px transparent, -30px -10px transparent, -20px -20px transparent,
      -10px -30px transparent;
  }
  31.25% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px #000, 20px 20px #000, 10px 30px #000, 0px 30px #000,
      -10px 30px #000, -20px 20px #000, -30px 10px #9eff00, -30px 0px #9eff00,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
  37.5% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px #000, 10px 30px #000, 0px 30px #000,
      -10px 30px #000, -20px 20px #000, -30px 10px #000, -30px 0px #9eff00,
      -30px -10px #9eff00, -20px -20px transparent, -10px -30px transparent;
  }
  43.75% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px transparent, 10px 30px #000,
      0px 30px #000, -10px 30px #000, -20px 20px #000, -30px 10px #000,
      -30px 0px #000, -30px -10px #9eff00, -20px -20px #9eff00,
      -10px -30px transparent;
  }
  50% {
    box-shadow: 0px -30px transparent, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px transparent, 10px 30px transparent,
      0px 30px #000, -10px 30px #000, -20px 20px #000, -30px 10px #000,
      -30px 0px #000, -30px -10px #000, -20px -20px #9eff00, -10px -30px #9eff00;
  }
  56.25% {
    box-shadow: 0px -30px #9eff00, 10px -30px transparent,
      20px -20px transparent, 30px -10px transparent, 30px 0px transparent,
      30px 10px transparent, 20px 20px transparent, 10px 30px transparent,
      0px 30px transparent, -10px 30px #000, -20px 20px #000, -30px 10px #000,
      -30px 0px #000, -30px -10px #000, -20px -20px #000, -10px -30px #9eff00;
  }
  62.5% {
    box-shadow: 0px -30px #9eff00, 10px -30px #9eff00, 20px -20px transparent,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px #000, -30px 10px #000, -30px 0px #000,
      -30px -10px #000, -20px -20px #000, -10px -30px #000;
  }
  68.75% {
    box-shadow: 0px -30px #000, 10px -30px #9eff00, 20px -20px #9eff00,
      30px -10px transparent, 30px 0px transparent, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px #000,
      -30px 0px #000, -30px -10px #000, -20px -20px #000, -10px -30px #000;
  }
  75% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #9eff00,
      30px -10px #9eff00, 30px 0px transparent, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent,
      -30px 0px #000, -30px -10px #000, -20px -20px #000, -10px -30px #000;
  }
  81.25% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #9eff00, 30px 0px #9eff00, 30px 10px transparent,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent,
      -30px 0px transparent, -30px -10px #000, -20px -20px #000,
      -10px -30px #000;
  }
  87.5% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #9eff00, 30px 10px #9eff00,
      20px 20px transparent, 10px 30px transparent, 0px 30px transparent,
      -10px 30px transparent, -20px 20px transparent, -30px 10px transparent,
      -30px 0px transparent, -30px -10px transparent, -20px -20px #000,
      -10px -30px #000;
  }
  93.75% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #9eff00, 20px 20px #9eff00,
      10px 30px transparent, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px #000;
  }
  100% {
    box-shadow: 0px -30px #000, 10px -30px #000, 20px -20px #000,
      30px -10px #000, 30px 0px #000, 30px 10px #000, 20px 20px #9eff00,
      10px 30px #9eff00, 0px 30px transparent, -10px 30px transparent,
      -20px 20px transparent, -30px 10px transparent, -30px 0px transparent,
      -30px -10px transparent, -20px -20px transparent, -10px -30px transparent;
  }
}

.filter__submit.button.button--primery {
  margin: 15px;
  width: -webkit-fill-available;
}
</style>
