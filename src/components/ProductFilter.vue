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
        <ul class="colors">
          <li
            v-for="{ id, title, code } in colors"
            :key="id"
            class="colors__item"
            :title="title"
          >
            <label class="colors__label">
              <input
                type="radio"
                v-model="currentColorId"
                :value="id"
                class="colors__radio sr-only"
              />
              <span class="colors__value" :style="{ 'background-color': code }">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Объемб в ГБ</legend>
        <ul class="check-list">
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="8"
                checked=""
              />
              <span class="check-list__desc">
                8
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="16"
              />
              <span class="check-list__desc">
                16
                <span>(461)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="32"
              />
              <span class="check-list__desc">
                32
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="64"
              />
              <span class="check-list__desc">
                64
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="128"
              />
              <span class="check-list__desc">
                128
                <span>(313)</span>
              </span>
            </label>
          </li>
          <li class="check-list__item">
            <label class="check-list__label">
              <input
                class="check-list__check sr-only"
                type="checkbox"
                name="volume"
                value="264"
              />
              <span class="check-list__desc">
                264
                <span>(313)</span>
              </span>
            </label>
          </li>
        </ul>
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

export default {
  name: "ProductFilter",
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
