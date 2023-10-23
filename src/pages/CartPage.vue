<template>
  <main class="content container">
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
                product: { image, title },
                amount,
                priceAmount,
              } in products"
              :key="productId"
              v-bind="{ productId, image, title, amount, priceAmount }"
            />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import CartItem from "@/components/CartItem.vue"
import numberFormat from "@/helpers/numberFormat"

export default {
  name: "CartPage",
  components: {
    CartItem,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(["cartProducts"]),
    ...mapGetters({
      products: "cartDetailProducts",
      cartTotalPrice: "cartTotalPrice",
    }),
  },
}
</script>
