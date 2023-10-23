<template>
  <router-link
    :to="{ name: 'cart' }"
    class="header__cart"
    aria-label="Корзина с товарами"
  >
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span
      v-if="cartProducts && cartProducts.length"
      class="header__count"
      aria-label="Количество товаров"
    >
      {{ cartProducts.length }}
    </span>
  </router-link>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "CartIndicator",
  computed: {
    ...mapState(["cartProducts"]),
  },
}
</script>
