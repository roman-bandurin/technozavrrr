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
              v-for="cartProduct in $store.state.cartProducts"
              :key="cartProduct.productId"
              class="cart__item product"
            >
              <div class="product__pic">
                <img
                  src="img/phone-square-3.jpg"
                  width="120"
                  height="120"
                  srcset="img/phone-square-3@2x.jpg 2x"
                  alt="Название товара"
                />
              </div>
              <h3 class="product__title">
                Смартфон Xiaomi Redmi Note 7 Pro 6/128GB
              </h3>
              <p class="product__info">Объем: <span>128GB</span></p>
              <span class="product__code">
                Артикул: {{ cartProduct.productId }}
              </span>

              <BaseCounter
                :value="cartProduct.amount"
                @input="
                  addProductToCard(
                    cartProduct.productId,
                    cartProduct.amount,
                    $event
                  )
                "
              />

              <b class="product__price"> 18 990 ₽ </b>

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
          <p class="cart__price">Итого: <span>32 970 ₽</span></p>

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

export default {
  name: "CartPage",
  components: {
    BaseCounter,
  },
  data() {
    return {}
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
