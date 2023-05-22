<template>
  <div class="flex items-center h-30">
    <div style="width: 105px">
      <InputSelect
        :value="limitTypeId"
        title="Тип лимита"
        size="sm"
        placeholder="Тип лимита"
        hide-underline
        :selected-option-classes="{ 'text-black': true }"
        :options="limitTypeOptions"
        @change="e => $emit('update:limit-type-id', e)"
      />
    </div>

    <div class="flex items-center ml-15 space-x-8 w-[80px]">
      <template v-if="valueInputVisible">
        <InputDefault
          :value="limit"
          label="Лимит"
          size="sm"
          style="width: 62px"
          rounded
          hide-label
          type="number"
          :step="0.01"
          :min="0"
          :input-classes="{ 'text-center': true }"
          @input="e => $emit('update:limit', +e)"
        />

        <span class="text-description text-gray-500">
          {{ suffix }}
        </span>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import InputDefault from '~/components/InputDefault.vue'
import InputSelect from '~/components/InputSelect.vue'
import { BonusCardLimitType } from '~/logic/modules/bonus-cards'

@Component({
  components: {
    InputSelect,
    InputDefault
  }
})
export default class InputCardLimit extends Vue {
  @Prop({ type: Number, default: undefined }) limit!: number
  @Prop({ type: Number, default: undefined }) limitTypeId!: number
  @Prop({ type: String, default: undefined }) suffix!: string
  @Prop({ type: Boolean, default: false }) valueInputVisible!: boolean
  @Prop({ type: Array, default: () => [] }) limitTypes!: BonusCardLimitType[]

  get limitTypeOptions() {
    return this.limitTypes.map(l => ({
      label: l.name_translate,
      value: l.id
    }))
  }
}
</script>
