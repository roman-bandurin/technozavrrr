<template>
  <li class="cart__item product">
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
    <span class="product__code"> Артикул: {{ productId }} </span>

    <BaseCounter v-model="currentAmount" />

    <b class="product__price"> {{ value | numberFormat }} ₽</b>

    <button
      type="button"
      :disabled="productDeleteSending"
      @click.prevent="deleteCurrentCartProduct"
      class="product__del button-del"
      aria-label="Удалить товар из корзины"
    >
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import { mapActions } from "vuex"
import BaseCounter from "@/components/BaseCounter.vue"
import numberFormat from "@/helpers/numberFormat"

export default {
  name: "CartItem",
  components: {
    BaseCounter,
  },
  props: {
    productId: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    amount: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    numberFormat,
  },
  data() {
    return {
      productDeleteSending: false,
    }
  },
  computed: {
    currentAmount: {
      get() {
        return this.amount
      },
      set(value) {
        this.updateCartProductAmount({
          productId: this.productId,
          amount: +value,
        })
      },
    },
  },
  methods: {
    ...mapActions(["updateCartProductAmount", "deleteCartProduct"]),
    deleteCurrentCartProduct() {
      this.productDeleteSending = true

      this.deleteCartProduct({ productId: this.productId }).then(
        () => (this.productDeleteSending = false)
      )
    },
  },
}
</script>
