<template>
  <BaseFormField :title="title" :error="error">
    <input
      :type="type"
      v-model="dataValue"
      class="form__input"
      :placeholder="placeholder"
    />
  </BaseFormField>
</template>

<script>
import BaseFormField from "@/components/BaseFormField.vue"
import formFieldMixin from "@/mixins/formFieldMixin"

export default {
  name: "BaseFormText",
  mixins: [formFieldMixin],
  props: {
    type: {
      type: String,
      default: "text",
    },
  },
}
</script>
