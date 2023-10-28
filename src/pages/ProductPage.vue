<template>
  <main class="content container">
    <BaseLoading
      :loading="productLoading"
      :failed="productLoadingFailed"
      style="position: static; margin-top: 60px"
      @retry="loadProduct"
    />
    <template v-if="product">
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
              {{ category.title }}
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> {{ product.title }} </a>
          </li>
        </ul>
      </div>

      <section class="item">
        <div class="item__pics pics">
          <div class="pics__wrapper">
            <img width="570" height="570" :src="image" :alt="product.title" />
          </div>
          <ul class="pics__list">
            <li class="pics__item">
              <a href="" class="pics__link pics__link--current">
                <img width="98" height="98" :src="image" :alt="product.title" />
              </a>
            </li>
          </ul>
        </div>

        <div class="item__info">
          <span class="item__code">Артикул: {{ product.id }}</span>
          <h2 class="item__title">{{ product.title }}</h2>
          <div class="item__form">
            <form
              action="#"
              method="POST"
              @submit.prevent="addProduct"
              class="form"
            >
              <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>

              <fieldset class="form__block">
                <legend class="form__legend">Цвет:</legend>

                <ProductColors v-model="colorId" :colors="product.colors" />
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Объем в ГБ:</legend>

                <ProductSizes
                  v-model="size"
                  :sizes="[2 ** 3, 2 ** 4, 2 ** 5, 2 ** 6, 2 ** 7, 2 ** 8]"
                  type="radio"
                  base-class="sizes"
                  class="sizes--primery"
                />
              </fieldset>

              <div class="item__row">
                <BaseCounter v-model.number="productAmount" />

                <button class="button button--primery" type="submit">
                  В корзину
                </button>
              </div>
            </form>
          </div>
        </div>

        <div class="item__desc">
          <ul class="tabs">
            <li class="tabs__item">
              <a class="tabs__link tabs__link--current"> Описание </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#"> Характеристики </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#"> Гарантия </a>
            </li>
            <li class="tabs__item">
              <a class="tabs__link" href="#"> Оплата и доставка </a>
            </li>
          </ul>

          <div class="item__content">
            <p>
              {{ product.title }}
            </p>

            <a href="#"> Все характеристики </a>

            <h3>Что это?</h3>

            <p>
              {{ product.title }}
            </p>

            <h3>Дизайн</h3>

            <p>
              {{ product.title }}
            </p>
          </div>
        </div>
      </section>
    </template>
    <div v-else></div>
  </main>
</template>

<script>
import { mapMutations } from "vuex"
import axios from "axios"
import { API_BASE_URL } from "@/config"

import numberFormat from "@/helpers/numberFormat"

import BaseCounter from "@/components/BaseCounter.vue"
import BaseLoading from "@/components/BaseLoading.vue"

import ProductColors from "@/components/ProductColors.vue"
import ProductSizes from "@/components/ProductSizes.vue"

export default {
  name: "ProductPage",
  filters: {
    numberFormat,
  },
  components: {
    BaseCounter,
    BaseLoading,
    ProductColors,
    ProductSizes,
  },
  data() {
    return {
      colorId: null,
      size: null,
      productAmount: 1,

      productData: null,
      productLoading: false,
      productLoadingFailed: false,
    }
  },
  computed: {
    product() {
      return this.productData
    },
    category() {
      return this.productData?.category
    },
    image() {
      return this.productData?.image?.file?.url
    },
  },
  watch: {
    "$route.params.id": {
      handler() {
        return this.loadProduct()
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations(["addProductToCart"]),
    addProduct() {
      this.addProductToCart({
        productId: this.product.id,
        amount: +this.productAmount,
      })
      this.productAmount = 1
    },
    loadProduct() {
      clearTimeout(this.loadProductTimer)
      this.productLoading = true
      this.productLoadingFailed = false

      this.loadProductTimer = setTimeout(
        () =>
          axios
            .get(`products/${encodeURIComponent(+this.$route.params.id)}`, {
              baseURL: API_BASE_URL,
            })
            .then(({ data }) => (this.productData = data))
            .catch(() => (this.productLoadingFailed = true))
            .then(() => (this.productLoading = false)),
        1000
      )
    },
  },
}
</script>

<style scoped>
img {
  aspect-ratio: 0.75;
  object-position: center;
}
</style>
