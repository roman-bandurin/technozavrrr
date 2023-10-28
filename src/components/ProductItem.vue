<template>
  <li class="catalog__item">
    <router-link :to="{ name: 'product', params: { id } }">
      <img :src="image" :alt="title" />

      <h3 class="catalog__title">
        {{ title }}
      </h3>
    </router-link>

    <span class="catalog__price"> {{ price | numberFormat }} ₽ </span>

    <ProductColors v-model="colorId" :colors="colors" />

    <ProductSizes
      v-model="size"
      :sizes="[2 ** 5, 2 ** 6, 2 ** 7, 2 ** 8]"
      type="radio"
      base-class="sizes"
    />
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat"

import ProductColors from "@/components/ProductColors.vue"
import ProductSizes from "@/components/ProductSizes.vue"

export default {
  name: "ProductItem",
  components: {
    ProductColors,
    ProductSizes,
  },
  props: ["id", "image", "title", "price", "colors", "sizes"],
  filters: {
    numberFormat,
  },
  data() {
    return {
      colorId: null,
      size: null,
    }
  },
}
</script>

<style scoped>
img {
  aspect-ratio: 0.75;
  object-position: center;
}
</style>
