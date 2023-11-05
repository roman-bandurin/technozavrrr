import BaseFormField from "@/components/BaseFormField.vue"

export default {
  components: {
    BaseFormField,
  },
  props: {
    value: {
      type: String,
    },
    title: {
      type: String,
    },
    error: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  computed: {
    dataValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit("input", value)
      },
    },
  },
}
