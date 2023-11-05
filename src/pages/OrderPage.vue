<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html"> Каталог </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html"> Корзина </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> Оформление заказа </a>
        </li>
      </ul>

      <h1 class="content__title">Корзина</h1>
      <span class="content__info">
        {{ cartTotalAmount | numberFormat }} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormText
              type="text"
              v-model="formData.name"
              title="ФИО"
              :error="formError.name"
              placeholder="Введите ваше полное имя"
            />

            <BaseFormText
              type="text"
              v-model="formData.address"
              title="Адрес доставки"
              :error="formError.address"
              placeholder="Введите ваш адрес"
            />

            <BaseFormText
              type="tel"
              v-model="formData.phone"
              title="Телефон"
              :error="formError.phone"
              placeholder="Введите ваш телефон"
            />

            <BaseFormText
              type="email"
              v-model="formData.email"
              title="Email"
              :error="formError.email"
              placeholder="Введи ваш Email"
            />

            <BaseFormTextarea
              v-model="formData.comments"
              title="Комментарий к заказу"
              :error="formError.comments"
              placeholder="Ваши пожелания"
            />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li
                v-for="{ id, title, highlight } in deliveries"
                :key="id"
                class="options__item"
              >
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="delivery"
                    v-model="delivery"
                    :value="id"
                  />
                  <span class="options__value">
                    {{ title }} <b>{{ highlight }}</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li
                v-for="{ id, title } in pays[delivery]"
                :key="id"
                class="options__item"
              >
                <label class="options__label">
                  <input
                    class="options__radio sr-only"
                    type="radio"
                    name="pay"
                    v-model="pay"
                    :value="id"
                  />
                  <span class="options__value"> {{ title }} </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <BaseLoading
            :loading="cartLoading"
            :failed="cartLoadingFailed"
            @retry="loadCart"
          />
          <template v-if="cartProducts && cartProducts.length">
            <ul class="cart__orders">
              <li
                v-for="{
                  productId,
                  product: { title },
                  amount,
                  value,
                } in products"
                :key="productId"
                class="cart__order"
              >
                <h3>{{ title }} ({{ amount | numberFormat }})</h3>
                <b>{{ value | numberFormat }} ₽</b>
                <span>Артикул: {{ productId }}</span>
              </li>
            </ul>

            <div class="cart__total">
              <p>
                Доставка: <b>{{ currentDelivery?.highlight }}</b>
              </p>
              <p>
                Итого: <b>{{ cartTotalAmount | numberFormat }}</b> товара на
                сумму
                <b>{{ cartTotalValue | numberFormat }} ₽</b>
              </p>
            </div>

            <button type="submit" class="cart__button button button--primery">
              Оформить заказ
            </button>
          </template>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или
            перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex"
import numberFormat from "@/helpers/numberFormat"
import BaseFormField from "@/components/BaseFormField.vue"
import BaseFormText from "@/components/BaseFormText.vue"
import BaseFormTextarea from "@/components/BaseFormTextarea.vue"
import BaseLoading from "@/components/BaseLoading.vue"

export default {
  name: "OrderPage",
  components: {
    BaseFormField,
    BaseFormText,
    BaseFormTextarea,
    BaseLoading,
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      formData: {},
      formError: {
        phone: "Неверный формат телефона",
      },
      deliveries: [
        { id: 0, title: "Самовывоз", highlight: "бесплатно" },
        { id: 500, title: "Курьером", highlight: "500 ₽" },
      ],
      delivery: 0,
      pay: "card",
      pays: {
        0: [
          { id: "card", title: "Картой при получении" },
          { id: "cash", title: "Наличными при получении" },
        ],
        500: [{ id: "cash", title: "Наличными при получении" }],
      },
    }
  },
  computed: {
    ...mapState(["cartProducts", "cartLoading", "cartLoadingFailed"]),
    ...mapGetters({
      products: "cartDetailProducts",
      cartTotalAmount: "cartTotalAmount",
      cartTotalValue: "cartTotalValue",
    }),
    currentDelivery() {
      return this.deliveries.find(({ id }) => this.delivery === id)
    },
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
.cart__block {
  position: relative;
}
</style>
