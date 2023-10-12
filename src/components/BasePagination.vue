<template>
  <ul v-if="itemsCount > 0" class="catalog__pagination pagination">
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': minPage >= page }"
        aria-label="Предыдущая страница"
        @click.prevent="paginate(page - 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': page === minPage }"
        @click.prevent="paginate(minPage)"
      >
        {{ minPage }}
      </a>
    </li>
    <li v-if="dotsBegin" class="pagination__item">
      <span class="pagination__link">...</span>
    </li>
    <li v-for="pageNumber in pages" :key="pageNumber" class="pagination__item">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': page === pageNumber }"
        @click.prevent="paginate(pageNumber)"
      >
        {{ pageNumber }}
      </a>
    </li>
    <li v-if="dotsEnd" class="pagination__item">
      <span class="pagination__link">...</span>
    </li>
    <li v-if="minPage < maxPage" class="pagination__item">
      <a
        href="#"
        class="pagination__link"
        :class="{ 'pagination__link--current': page === maxPage }"
        @click.prevent="paginate(maxPage)"
      >
        {{ maxPage }}
      </a>
    </li>
    <li class="pagination__item">
      <a
        href="#"
        class="pagination__link pagination__link--arrow"
        :class="{ 'pagination__link--disabled': page >= maxPage }"
        aria-label="Следующая страница"
        @click.prevent="paginate(page + 1)"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BasePagination",
  model: {
    prop: "page",
    event: "paginate",
  },
  props: {
    itemsCount: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      default: 6,
    },
    spread: {
      type: Number,
      default: 2,
    },
  },
  computed: {
    minPage() {
      return this.itemsCount > 0 ? 1 : 0
    },
    maxPage() {
      return Math.ceil(this.itemsCount / this.itemsPerPage)
    },
    dotsBegin() {
      return this.minPage + 1 < this.page - this.spread
    },
    dotsEnd() {
      return this.page + this.spread < this.maxPage - 1
    },
    pages() {
      return Array.from(Array(5).keys())
        .map((page) => this.page + page - this.spread)
        .filter((page) => this.minPage < page && page < this.maxPage)
    },
  },
  methods: {
    paginate(page) {
      if (this.minPage <= page && page !== this.page && page <= this.maxPage) {
        this.$emit("paginate", page)
      }
    },
  },
}
</script>
