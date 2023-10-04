<template>
    <li class="catalog__item">
      <a class="catalog__pic" href="#">
        <img :src="image" alt="Название товара" />
      </a>

      <h3 class="catalog__title">
        <a href="#">
          {{ title }}
        </a>
      </h3>

      <span class="catalog__price">
        {{ price }} ₽
      </span>

      <ul v-if="colors" class="colors colors--black">
        <li v-for="color in colors" :key="color" class="colors__item">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" :name="`color-${title.replaceAll(' ', '')}`" :value="color" checked="">
            <span class="colors__value" :style="{ backgroundColor: color }">
            </span>
          </label>
        </li>
      </ul>

      <ul v-if="sizes" class="sizes">
        <li v-for="size in sizes" :key="size" class="sizes__item">
          <label class="sizes__label">
            <input class="sizes__radio sr-only" type="radio" :name="`sizes-${title.replaceAll(' ', '')}`" :value="size">
            <span class="sizes__value">
              {{ size }}gb
            </span>
          </label>
        </li>
      </ul>
    </li>
</template>

<script>
export default {
  name: 'ProductItem',
  props: ['image', 'title', 'price', 'colors', 'sizes']
}
</script>
