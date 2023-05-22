<template>
  <ToggleButton
    :value="value"
    :height="height"
    :width="width"
    :color="colors"
    :disabled="disabled"
    class="app-switch"
    sync
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'nuxt-property-decorator'
import { ToggleButton } from 'vue-js-toggle-button'

@Component({
  components: {
    ToggleButton
  }
})
export default class InputSwitch extends Vue {
  @Model('input', { type: Boolean, default: false }) value!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Number, default: undefined }) height!: number
  @Prop({ type: Number, default: undefined }) width!: number

  colors = {
    checked: '#5390BE',
    unchecked: 'rgba(0, 0, 0, 0.2)',
    disabled: '#CCCCCC'
  }
}
</script>

<style>
.app-switch .v-switch-button {
  @apply !transition;
}

.app-switch:hover .v-switch-button {
  @apply brightness-97;
}

.app-switch:active .v-switch-button {
  @apply brightness-95;
}

.app-switch .v-switch-input[data-focus-visible-added] + .v-switch-core {
  outline: -webkit-focus-ring-color auto 1px;
}
</style>
