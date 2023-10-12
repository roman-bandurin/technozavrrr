<template>
  <ul v-if="products && products.length" class="catalog__list">
    <ProductItem
      v-for="product in products"
      :key="product.id"
      v-bind="product"
    />
  </ul>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'

export default {
  name: 'ProductList',
  components: {
    ProductItem
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
}
</script>
