<template>
  <BaseFormField :title="title" :error="error">
    <textarea
      v-model="dataValue"
      class="form__input form__input--area"
      :placeholder="placeholder"
    ></textarea>
  </BaseFormField>
</template>

<script>
import BaseFormField from "@/components/BaseFormField.vue"
import formFieldMixin from "@/mixins/formFieldMixin"

export default {
  name: "BaseFormText",
  mixins: [formFieldMixin],
}
</script>
