<template>
  <div class="form__counter">
    <button type="button" @click="change(-1)" aria-label="Убрать один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentValue" />

    <button type="button" @click="change(1)" aria-label="Добавить один товар">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "BaseCounter",
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", Math.max(+value, 0))
      },
    },
  },
  methods: {
    change(delta) {
      this.$emit("input", Math.max(+this.value + delta, 0))
    },
  },
}
</script>
