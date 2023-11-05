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
      v-if="cartLoading || cartLoadingFailed"
      :class="{
        header__count: true,
        'header__count--spin': cartLoading,
        'header__count--error': cartLoadingFailed,
      }"
    >
      &nbsp;
    </span>
    <span
      v-else-if="cartProducts && cartProducts.length"
      class="header__count"
      aria-label="Количество товаров"
    >
      {{ cartProducts.length }}
    </span>
  </router-link>
</template>

<script>
import { mapState, mapActions } from "vuex"

export default {
  name: "CartIndicator",
  computed: {
    ...mapState(["cartProducts", "cartLoading", "cartLoadingFailed"]),
  },
  methods: {
    ...mapActions(["loadCart"]),
  },
  created() {
    this.loadCart()
  },
}
</script>

<style scoped>
.header__count--spin {
  animation: spin 500ms linear infinite;
  color: #9eff00;
}

.header__count--error {
  background-color: #e60039;
  color: #e60039;
}

@keyframes spin {
  0% {
    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
  }
  50% {
    clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
  }
  100% {
    clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
  }
}
</style>
