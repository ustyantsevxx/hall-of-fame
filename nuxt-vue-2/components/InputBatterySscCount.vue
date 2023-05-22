<template>
  <AppFormGroup v-slot="{ id }" label="SSC">
    <InputNumberHorizontal
      :id="id"
      :value="value"
      :invalid="invalid"
      :min="1"
      :max="10"
      @input="v => $emit('input', v)"
    />
  </AppFormGroup>
</template>

<script>
import AppFormGroup from '~/components/AppFormGroup.vue'
import InputNumberHorizontal from '~/components/InputNumberHorizontal.vue'

export default {
  components: {
    AppFormGroup,
    InputNumberHorizontal
  },

  props: {
    value: { type: Number, default: 0 },
    invalid: { type: Boolean, default: false }
  }
}
</script>
