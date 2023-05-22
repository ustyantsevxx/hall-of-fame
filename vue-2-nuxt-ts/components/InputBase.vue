<script lang="ts">
import { Component, Model, Prop, Vue } from 'nuxt-property-decorator'

import { getUid } from '~/logic/utils'

@Component
export default class InputBase extends Vue {
  @Model('input', { type: [String, Number] }) value!: string | number

  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: 'text' }) type!: string
  @Prop({ type: String, default: undefined }) name!: string
  @Prop({ type: String, default: undefined }) autocomplete!: string
  @Prop({ type: Boolean, default: false }) hideLabel!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Number, default: -1 }) maxLength!: number
  @Prop({ type: Number, default: Number.POSITIVE_INFINITY }) max!: number
  @Prop({ type: Number, default: Number.NEGATIVE_INFINITY }) min!: number
  @Prop({ type: Number, default: 1 }) step!: number

  uid = ''

  mounted() {
    this.uid = getUid()
  }

  emitInput(event: InputEvent & { target: { value: string } }) {
    this.$emit('input', event.target.value)
  }

  emitChange(event: InputEvent & { target: { value: string } }) {
    this.$emit('change', event.target.value)
  }

  emitBlur() {
    this.$emit('blur')
  }
}
</script>
