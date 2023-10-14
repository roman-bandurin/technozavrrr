<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a
            href="#"
            @click.prevent="gotoPage('main')"
            class="breadcrumbs__link"
          >
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a
            href="#"
            @click.prevent="gotoPage('main')"
            class="breadcrumbs__link"
          >
            {{ category.title }}
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link"> {{ product.title }} </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image"
            :alt="product.title"
          />
        </div>
        <ul class="pics__list">
          <li class="pics__item">
            <a href="" class="pics__link pics__link--current">
              <img
                width="98"
                height="98"
                :src="product.image"
                :alt="product.title"
              />
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ product.id }}</span>
        <h2 class="item__title">{{ product.title }}</h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <b class="item__price"> {{ product.price | numberFormat }} ₽ </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul v-if="product.colors" class="colors">
                <li
                  v-for="color in product.colors"
                  :key="color"
                  class="colors__item"
                >
                  <label class="colors__label">
                    <input
                      class="colors__radio sr-only"
                      type="radio"
                      :name="`color-${product.id}`"
                      :value="color"
                    />
                    <span
                      class="colors__value"
                      :style="{ backgroundColor: color }"
                    >
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объем в ГБ:</legend>

              <ul v-if="product.sizes" class="sizes sizes--primery">
                <li
                  v-for="size in product.sizes"
                  :key="size"
                  class="sizes__item"
                >
                  <label class="sizes__label">
                    <input
                      class="sizes__radio sr-only"
                      type="radio"
                      name="sizes-item"
                      :name="`sizes-${product.id}`"
                      :value="size"
                    />
                    <span class="sizes__value"> {{ size }}gb </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <div class="form__counter">
                <button type="button" aria-label="Убрать один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" value="1" name="count" />

                <button type="button" aria-label="Добавить один товар">
                  <svg width="12" height="12" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current"> Описание </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Характеристики </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Гарантия </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#"> Оплата и доставка </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            {{ product.title }}
          </p>

          <a href="#"> Все характеристики </a>

          <h3>Что это?</h3>

          <p>
            {{ product.title }}
          </p>

          <h3>Дизайн</h3>

          <p>
            {{ product.title }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import products from "@/data/products.json"
import categories from "@/data/categories.json"

import gotoPage from "@/helpers/gotoPage"
import numberFormat from "@/helpers/numberFormat"

export default {
  name: "ProductPage",
  props: {
    pageParams: {
      type: Object,
      required: true,
    },
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return products.find((product) => product.id === this.pageParams.id)
    },
    category() {
      return categories.find(
        (category) => category.id === this.product.categoryId
      )
    },
  },
  methods: {
    gotoPage,
  },
}
</script>
