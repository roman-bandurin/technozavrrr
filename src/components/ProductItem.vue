<template>
  <li class="catalog__item">
    <a href="#" @click.prevent="gotoPage('product', { id })">
      <img :src="image" :alt="title" />

      <h3 class="catalog__title">
        {{ title }}
      </h3>
    </a>

    <span class="catalog__price"> {{ price | numberFormat }} ₽ </span>

    <ul v-if="colors" class="colors colors--black">
      <li v-for="color in colors" :key="color" class="colors__item">
        <label class="colors__label">
          <input
            class="colors__radio sr-only"
            type="radio"
            :name="`color-${id}`"
            :value="color"
            checked=""
          />
          <span class="colors__value" :style="{ backgroundColor: color }">
          </span>
        </label>
      </li>
    </ul>

    <ul v-if="sizes" class="sizes">
      <li v-for="size in sizes" :key="size" class="sizes__item">
        <label class="sizes__label">
          <input
            class="sizes__radio sr-only"
            type="radio"
            :name="`sizes-${id}`"
            :value="size"
          />
          <span class="sizes__value"> {{ size }}gb </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import gotoPage from "@/helpers/gotoPage"
import numberFormat from "@/helpers/numberFormat"

export default {
  name: "ProductItem",
  props: ["id", "image", "title", "price", "colors", "sizes"],
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
}
</script>
