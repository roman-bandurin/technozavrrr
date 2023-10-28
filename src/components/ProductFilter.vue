<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры<sup v-if="isDirty">*</sup></h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">
          Цена<sup v-if="isPriceDirty">*</sup>
        </legend>
        <label class="form__label form__label--price">
          <input
            type="text"
            v-model.number="currentPriceFrom"
            class="form__input"
          />
          <span class="form__value">
            От<sup v-if="priceFrom !== currentPriceFrom">*</sup>
          </span>
        </label>
        <label class="form__label form__label--price">
          <input
            type="text"
            v-model.number="currentPriceTo"
            class="form__input"
          />
          <span class="form__value">
            До<sup v-if="priceTo !== currentPriceTo">*</sup>
          </span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Категория<sup v-if="categoryId !== currentCategoryId">*</sup>
        </legend>
        <label class="form__label form__label--select">
          <select v-model="currentCategoryId" class="form__select">
            <option :value="null">Все категории</option>
            <option v-for="{ id, title } in categories" :key="id" :value="id">
              {{ title }}
            </option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">
          Цвет<sup v-if="colorId !== currentColorId">*</sup>
        </legend>

        <ProductColors v-model="currentColorId" :colors="colors" />
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>

        <ProductSizes
          v-model="currentSize"
          :sizes="[2 ** 3, 2 ** 4, 2 ** 5, 2 ** 6, 2 ** 7, 2 ** 8]"
          type="checkbox"
          base-class="check-list"
        />
      </fieldset>

      <button type="submit" class="filter__submit button button--primery">
        Применить<sup v-if="isDirty">*</sup>
      </button>
      <button
        type="button"
        @click="reset"
        class="filter__reset button button--second"
      >
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import axios from "axios"
import { API_BASE_URL } from "@/config"

import ProductColors from "@/components/ProductColors.vue"
import ProductSizes from "@/components/ProductSizes.vue"

export default {
  name: "ProductFilter",
  components: {
    ProductColors,
    ProductSizes,
  },
  props: {
    priceFrom: {
      type: Number,
      default: 0,
    },
    priceTo: {
      type: Number,
      default: 0,
    },
    categoryId: {
      type: Number,
    },
    colorId: {
      type: Number,
    },
  },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: null,
      currentColorId: null,
      currentSize: [],

      categoriesData: null,
      colorsData: null,
    }
  },
  computed: {
    categories() {
      return this.categoriesData?.items ?? []
    },
    colors() {
      return this.colorsData?.items ?? []
    },
    isPriceDirty() {
      return (
        this.priceFrom !== this.currentPriceFrom ||
        this.priceTo !== this.currentPriceTo
      )
    },
    isDirty() {
      return (
        this.priceFrom !== this.currentPriceFrom ||
        this.priceTo !== this.currentPriceTo ||
        this.categoryId !== this.currentCategoryId ||
        this.colorId !== this.currentColorId
      )
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceFrom = value
    },
    priceTo(value) {
      this.currentPriceTo = value
    },
    categoryId(value) {
      this.currentCategoryId = value
    },
    colorId(value) {
      this.currentColorId = value
    },
  },
  created() {
    this.loadCategories()
    this.loadColors()
  },
  methods: {
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom)
      this.$emit("update:priceTo", this.currentPriceTo)
      this.$emit("update:categoryId", this.currentCategoryId)
      this.$emit("update:colorId", this.currentColorId)
    },
    reset() {
      this.$emit("update:priceFrom", 0)
      this.$emit("update:priceTo", 0)
      this.$emit("update:categoryId", null)
      this.$emit("update:colorId", null)
    },
    loadCategories() {
      axios
        .get("productCategories", {
          baseURL: API_BASE_URL,
        })
        .then(({ data }) => (this.categoriesData = data))
    },
    loadColors() {
      axios
        .get("colors", {
          baseURL: API_BASE_URL,
        })
        .then(({ data }) => (this.colorsData = data))
    },
  },
}
</script>
