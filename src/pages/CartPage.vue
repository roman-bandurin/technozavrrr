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
        v-if="$store.state.cartProducts && $store.state.cartProducts.length"
        class="content__info"
        aria-label="Количество товаров"
      >
        {{ $store.state.cartProducts.length }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul
            v-if="$store.state.cartProducts && $store.state.cartProducts.length"
            class="cart__list"
          >
            <li
              v-for="({ productId, product: { image, title }, amount, priceAmount }) in products"
              :key="productId"
              class="cart__item product"
            >
              <div class="product__pic">
                <img
                  :src="image"
                  width="120"
                  height="120"
                  srcset="img/phone-square-3@2x.jpg 2x"
                  :alt="title"
                />
              </div>
              <h3 class="product__title">
                {{ title }}
              </h3>
              <span class="product__code">
                Артикул: {{ productId }}
              </span>

              <BaseCounter
                :value="amount"
                @input="
                  addProductToCard(
                    productId,
                    amount,
                    $event
                  )
                "
              />

              <b class="product__price"> {{ priceAmount | numberFormat }} ₽ </b>

              <button
                class="product__del button-del"
                type="button"
                aria-label="Удалить товар из корзины"
              >
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">Итого: <span>{{ cartTotalPrice | numberFormat }} ₽</span></p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseCounter from "@/components/BaseCounter.vue"
import numberFormat from "@/helpers/numberFormat";
import { mapGetters } from "vuex"

export default {
  name: "CartPage",
  components: {
    BaseCounter,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', cartTotalPrice: 'cartTotalPrice' })
  },
  methods: {
    addProductToCard(productId, currentAmount, amount) {
      this.$store.commit("addProductToCard", {
        productId,
        amount: +amount - currentAmount,
      })
    },
  },
}
</script>
