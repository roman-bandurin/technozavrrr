<template>
  <main class="content container">
    <BaseLoading
      :loading="cartLoading"
      :failed="cartLoadingFailed"
      @retry="loadCart"
    />
    <template>
      <div class="content__top">
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item">
            <router-link :to="{ name: 'main' }" class="breadcrumbs__link">
              Каталог
            </router-link>
          </li>
          <li class="breadcrumbs__item">
            <a class="breadcrumbs__link"> Корзина </a>
          </li>
        </ul>

        <h1 class="content__title">Корзина</h1>
        <span
          v-if="cartProducts && cartProducts.length"
          class="content__info"
          aria-label="Количество товаров"
        >
          {{ cartProducts.length }} товара
        </span>
      </div>

      <section class="cart">
        <form class="cart__form form" action="#" method="POST">
          <div class="cart__field">
            <ul v-if="cartProducts && cartProducts.length" class="cart__list">
              <CartItem
                v-for="{
                  productId,
                  product: { title, image },
                  amount,
                  value,
                } in products"
                :key="productId"
                v-bind="{ productId, image, title, amount, value }"
              />
            </ul>
          </div>

          <div class="cart__block">
            <p class="cart__desc">
              Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
            </p>
            <p class="cart__price">
              Итого: <span>{{ cartTotalValue | numberFormat }} ₽</span>
            </p>

            <router-link
              v-if="cartProducts && cartProducts.length"
              tag="button"
              type="submit"
              :to="{ name: 'order' }"
              class="cart__button button button--primery"
            >
              Оформить заказ
            </router-link>
          </div>
        </form>
      </section>
    </template>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import numberFormat from "@/helpers/numberFormat"
import BaseLoading from "@/components/BaseLoading.vue"
import CartItem from "@/components/CartItem.vue"

export default {
  name: "CartPage",
  components: {
    BaseLoading,
    CartItem,
  },
  filters: {
    numberFormat,
  },
  computed: {
    ...mapState(["cartProducts", "cartLoading", "cartLoadingFailed"]),
    ...mapGetters({
      products: "cartDetailProducts",
      cartTotalValue: "cartTotalValue",
    }),
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
.content {
  position: relative;
}
</style>
