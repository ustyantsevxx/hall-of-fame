<template>
  <InputDefault
    :value="value"
    :placeholder="placeholder"
    :label="label"
    :invalid="invalid"
    :hide-label="hideLabel"
    :type="inputType"
    :max-length="maxLength"
    @input="$emit('input', $event)"
  >
    <template #icon>
      <button
        type="button"
        title="Переключить отображение пароля"
        class="flex justify-center items-center w-full h-full"
        @click="togglePasswordRevealed"
      >
        <StrokeEyeSVG v-if="passwordRevealed" />
        <EyeSVG v-else />
      </button>
    </template>
  </InputDefault>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator'

import EyeSVG from '~/assets/svg/eye.svg'
import StrokeEyeSVG from '~/assets/svg/eye-stroke.svg'
import InputBaseValidatable from '~/components/InputBaseValidatable.vue'
import InputDefault from '~/components/InputDefault.vue'

@Component({
  components: {
    InputDefault,
    EyeSVG,
    StrokeEyeSVG
  }
})
export default class InputPassword extends InputBaseValidatable {
  passwordRevealed = false

  get inputType() {
    return this.passwordRevealed ? 'text' : 'password'
  }

  togglePasswordRevealed() {
    this.passwordRevealed = !this.passwordRevealed
  }
}
</script>
