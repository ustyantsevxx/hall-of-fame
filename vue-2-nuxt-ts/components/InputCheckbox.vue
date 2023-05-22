<template>
  <label
    :for="uid"
    :tabindex="disabled ? -1 : 0"
    class="flex items-center hover:brightness-95 active:brightness-90 transition select-none"
    @keypress.prevent.enter.space="toggleChecked"
  >
    <input
      :id="uid"
      tabindex="-1"
      :checked="checked"
      :true-value="trueValue"
      :false-value="falseValue"
      :disabled="disabled"
      type="checkbox"
      class="sr-only"
    />

    <span
      class="text-description cursor-pointer"
      :style="iconInlineStyles"
      @click="toggleChecked"
    >
      <slot v-if="checked" name="checked-icon">
        <CheckedSVG class="w-full h-full" />
      </slot>
      <slot v-else name="unchecked-icon">
        <UncheckedSVG class="w-full h-full" />
      </slot>
    </span>

    <span
      v-if="$slots.default"
      class="ml-10 cursor-pointer"
      @click="toggleChecked"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'

import CheckedSVG from '~/assets/svg/checked.svg'
import UncheckedSVG from '~/assets/svg/unchecked.svg'
import { getUid } from '~/logic/utils'

@Component({
  components: {
    CheckedSVG,
    UncheckedSVG
  }
})
export default class InputCheckbox extends Vue {
  @Prop({ type: [Date, Number, Object, String, Boolean, Array], default: '' })
  value!: any

  @Prop({ type: [Date, Number, Object, String, Boolean, Array], default: true })
  trueValue!: any

  @Prop({
    type: [Date, Number, Object, String, Boolean, Array],
    default: false
  })
  falseValue!: any

  @Prop({ type: String, default: '16px' }) iconSize!: string
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  uid = ''

  get checked() {
    if (this.isArray) {
      const arrayValue = this.value as Array<any>
      return arrayValue.includes(this.trueValue)
    } else {
      return this.value === this.trueValue
    }
  }

  get isBoolean(): boolean {
    return typeof this.value === 'boolean'
  }

  get isArray(): boolean {
    return Array.isArray(this.value)
  }

  get valueWhenFalse() {
    if (this.isBoolean) {
      return false
    }

    if (this.isArray) {
      return [...this.value].filter(item => item !== this.trueValue)
    }

    return this.falseValue
  }

  get valueWhenTrue() {
    if (this.isBoolean) {
      return true
    }

    if (this.isArray) {
      return [...this.value, this.trueValue]
    }

    return this.trueValue
  }

  get iconInlineStyles() {
    return {
      width: this.iconSize,
      height: this.iconSize
    }
  }

  @Watch('falseValue')
  onFalseValueChanged() {
    if (!this.checked) {
      this.$emit('input', this.valueWhenFalse)
    }
  }

  @Watch('trueValue')
  onTrueValueChanged() {
    if (!this.checked) {
      this.$emit('input', this.valueWhenTrue)
    }
  }

  mounted() {
    this.uid = getUid()
  }

  toggleChecked() {
    if (this.disabled) {
      return
    }

    this.$emit('input', this.checked ? this.valueWhenFalse : this.valueWhenTrue)
  }
}
</script>
