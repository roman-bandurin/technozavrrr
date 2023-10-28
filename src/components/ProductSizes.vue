<template>
  <ul v-if="sizes" :class="{ [baseClass]: true }">
    <li
      v-for="size in sizes"
      :key="size"
      :class="{ [`${baseClass}__item`]: true }"
    >
      <label :class="{ [`${baseClass}__label`]: true }">
        <input
          :type="type"
          v-model="currentValue"
          :value="size"
          :class="{
            [`${baseClass}__radio`]: true,
            [`${baseClass}__check`]: true,
            'sr-only': true,
          }"
        />
        <span
          :class="{
            [`${baseClass}__value`]: true,
            [`${baseClass}__desc`]: true,
          }"
        >
          {{ size }}gb
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProductSizes",
  props: {
    value: {
      type: [Number, Array],
    },
    sizes: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "radio",
    },
    baseClass: {
      type: String,
      required: true,
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
