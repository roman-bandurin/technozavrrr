<template>
  <ul v-if="colors" class="colors">
    <li
      v-for="{ id: colorId, title, code } in colors"
      :key="colorId"
      class="colors__item"
      :title="title"
    >
      <label class="colors__label">
        <input
          type="radio"
          v-model="currentValue"
          :value="colorId"
          class="colors__radio sr-only"
        />
        <span class="colors__value" :style="{ 'background-color': code }">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProductColors",
  props: {
    value: {
      type: Number,
    },
    colors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    currentValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      },
    },
  },
}
</script>

<style scoped>
.colors {
  margin-bottom: 10px;
}
</style>
