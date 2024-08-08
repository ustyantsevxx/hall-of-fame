<template>
  <Modal
    :name="uid"
    :width="width"
    :height="height"
    :min-height="minHeight"
    :min-width="minWidth"
    :max-height="maxHeight"
    :max-width="maxWidth"
    :focus-trap="focusTrap"
    :click-to-close="clickToClose"
    :resizable="resizable"
    :adaptive="adaptive"
    :scrollable="scrollable"
    :draggable="draggable"
    :reset="reset"
    :classes="classes"
    :styles="styles"
    @before-open="$emit('before-open', $event)"
    @opened="$emit('opened', $event)"
    @before-close="$emit('before-close', $event)"
    @closed="$emit('closed', $event)"
  >
    <slot></slot>

    <button
      v-if="closeButton"
      type="button"
      title="xx xx xx"
      class="flex absolute top-15 right-15 justify-center items-center w-30 h-30"
      @click="hide"
    >
      <CloseOutlinedCircleSVG class="w-24 h-24" />
    </button>
  </Modal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import CloseOutlinedCircleSVG from '~/assets/svg/close-outlined-circle.svg'
import { getUid } from '~/logic/utils'

@Component({
  components: {
    CloseOutlinedCircleSVG
  }
})
export default class ModalBase extends Vue {
  @Prop({ type: [String, Number], default: 'auto' }) width!: string | number
  @Prop({ type: [String, Number], default: 'auto' }) height!: string | number
  @Prop({ type: Number, default: 600 }) minWidth!: number
  @Prop({ type: Number, default: 300 }) minHeight!: number

  @Prop({ type: Number, default: Number.POSITIVE_INFINITY })
  maxWidth!: number

  @Prop({ type: Number, default: Number.POSITIVE_INFINITY })
  maxHeight!: number

  @Prop({ type: Boolean, default: true }) focusTrap!: boolean
  @Prop({ type: Boolean, default: true }) clickToClose!: boolean
  @Prop({ type: Boolean, default: false }) resizable!: boolean
  @Prop({ type: Boolean, default: false }) adaptive!: boolean
  @Prop({ type: Boolean, default: false }) scrollable!: boolean
  @Prop({ type: Boolean, default: false }) reset!: boolean
  @Prop({ type: Boolean, default: false }) closeButton!: boolean

  @Prop({ type: [Boolean, String], default: false })
  draggable!: boolean | string

  @Prop({
    type: String,
    default:
      'relative pt-29 px-36 pb-27 rounded-18 shadow-none border border-gray-100 overflow-visible'
  })
  classes!: string

  @Prop({ type: [String, Array, Object], default: '' })
  styles!: string | any[] | Object

  uid = ''

  created() {
    this.uid = getUid()
  }

  show() {
    this.$modal.show(this.uid)
  }

  hide() {
    this.$modal.hide(this.uid)
  }
}
</script>
