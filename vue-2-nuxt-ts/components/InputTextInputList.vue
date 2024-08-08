<template>
  <div class="flex flex-wrap items-center -mb-15">
    <InputDefault
      v-for="(item, itemIndex) in value"
      :key="itemIndex"
      v-model="value[itemIndex]"
      size="md"
      class="mr-15 mb-15"
      hide-label
      v-bind="inputProps"
      :input-classes="{
        'pr-25': ableToRemove,
        'text-description': false,
        'text-paragraph': true
      }"
      :disabled="disabled"
      :invalid="isItemInvalid(itemIndex)"
    >
      <template v-if="ableToRemove" #icon>
        <button class="w-20 h-20" :disabled="disabled">
          <CloseSVG class="w-full h-full" @click="removeItem(itemIndex)" />
        </button>
      </template>
    </InputDefault>

    <div class="flex mb-15">
      <Button
        v-if="value.length === 0"
        class="mr-5"
        link
        :disabled="disabled"
        @click="addItem"
      >
        {{ buttonTitle }}
      </Button>

      <button
        v-if="ableToAdd"
        type="button"
        class="py-5 px-5 text-blue hover:text-red bg-light-blue-200 rounded-8 transition-colors"
        :title="buttonTitle"
        :disabled="disabled"
        @click="addItem"
      >
        <PlusSVG />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import CloseSVG from '~/assets/svg/close-outlined-circle.svg'
import PlusSVG from '~/assets/svg/plus.svg'
import Button from '~/components/Button.vue'
import InputDefault from '~/components/InputDefault.vue'

@Component({
  components: {
    Button,
    InputDefault,
    PlusSVG,
    CloseSVG
  },

  validations: {}
})
export default class InputTextInputList extends Vue {
  @Prop({ type: Array, required: true }) value!: any[]
  @Prop({ type: String, default: undefined }) valueKey!: string
  @Prop({ type: String, default: 'xx xx' }) buttonTitle!: string
  @Prop({ type: Number, default: 1 }) minCount!: number
  @Prop({ type: Number, default: 1 }) maxCount!: number
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Object, default: undefined }) validationList!: any
  @Prop({ type: Object, required: true }) inputProps!: Object
  @Prop({
    type: Function,
    default: () => ''
  })
  createItemCallback!: () => any

  get ableToAdd() {
    return this.value.length < this.maxCount
  }

  get ableToRemove() {
    return this.value.length > this.minCount
  }

  isItemInvalid(index) {
    return this.validationList?.$each?.$iter?.[index]?.$anyError || false
  }

  addItem() {
    this.$emit('input', [...this.value, this.createItemCallback()])
  }

  removeItem(index: number) {
    const listCopy = [...this.value]
    listCopy.splice(index, 1)
    this.$emit('input', listCopy)
  }
}
</script>
