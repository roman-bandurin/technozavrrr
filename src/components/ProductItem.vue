<template>
  <li class="catalog__item">
    <router-link :to="{ name: 'product', params: { id } }">
      <img :src="image" :alt="title" />

      <h3 class="catalog__title">
        {{ title }}
      </h3>
    </router-link>

    <span class="catalog__price"> {{ price | numberFormat }} ₽ </span>

    <ul v-if="colors" class="colors colors--black">
      <li
        v-for="{ id: colorId, title, code } in colors"
        :key="colorId"
        class="colors__item"
        title="title"
      >
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" :value="colorId" />
          <span class="colors__value" :style="{ backgroundColor: code }">
          </span>
        </label>
      </li>
    </ul>

    <!-- <ul v-if="sizes" class="sizes">
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
    </ul> -->
  </li>
</template>

<script>
import numberFormat from "@/helpers/numberFormat"

export default {
  name: "ProductItem",
  props: ["id", "image", "title", "price", "colors", "sizes"],
  filters: {
    numberFormat,
  },
}
</script>
