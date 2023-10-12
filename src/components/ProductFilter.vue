<template>
  <aside class="filter">
    <h2 class="filter__title">Фильтры</h2>

    <form
      class="filter__form form"
      action="#"
      method="get"
      @submit.prevent="submit"
    >
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input
            type="text"
            v-model.number="currentPriceFrom"
            class="form__input"
          />
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input
            type="text"
            v-model.number="currentPriceTo"
            class="form__input"
          />
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
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
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li v-for="colorItem in colors" :key="colorItem" class="colors__item">
            <label class="colors__label">
              <input
                type="radio"
                v-model="currentColor"
                :value="colorItem"
                class="colors__radio sr-only"
              />
              <span
                class="colors__value"
                :style="{ 'background-color': colorItem }"
              >
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
        Применить
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
import categories from "@/data/categories.json"
import colors from "@/data/colors.json"

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
    color: {
      type: String,
    },
  },
  data() {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 0,
      currentCategoryId: null,
      currentColor: null,
    }
  },
  computed: {
    categories() {
      return categories
    },
    colors() {
      return colors
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
    color(value) {
      this.currentColor = value
    },
  },
  methods: {
    submit() {
      this.$emit("update:priceFrom", this.currentPriceFrom)
      this.$emit("update:priceTo", this.currentPriceTo)
      this.$emit("update:categoryId", this.currentCategoryId)
      this.$emit("update:color", this.currentColor)
    },
    reset() {
      this.$emit("update:priceFrom", 0)
      this.$emit("update:priceTo", 0)
      this.$emit("update:categoryId", null)
      this.$emit("update:color", null)
    },
  },
}
</script>
