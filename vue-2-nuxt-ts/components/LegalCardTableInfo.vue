<template>
  <div class="inline-flex flex-col justify-center space-y-9 w-full h-full">
    <span class="text-description text-black">
      {{ number }} ({{ typeName }})
    </span>

    <span
      class="text-description text-gray-500 break-words"
      style="max-width: 200px"
      :title="name"
    >
      <template v-if="name">{{ name }}</template>
      <template v-else>
        Наименование не
        <br />
        указано
      </template>
    </span>

    <div v-if="pin" class="flex items-center space-x-3">
      <span class="w-40 text-gray-500">
        <template v-if="pinRevealed">{{ pin }}</template>
        <template v-else>****</template>
      </span>

      <button
        type="button"
        title="Переключить отображение пин-кода"
        class="overflow-hidden relative w-30 h-20"
        @click="togglePinRevealed"
      >
        <span
          class="block absolute top-1/2 left-1/2 w-45 h-45 transform -translate-x-1/2 -translate-y-1/2"
        >
          <StrokeEyeSVG v-if="pinRevealed" />
          <EyeSVG v-else />
        </span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import EyeSVG from '~/assets/svg/eye.svg'
import StrokeEyeSVG from '~/assets/svg/eye-stroke.svg'
import { BonusCardsModule, BonusCardType } from '~/logic/modules/bonus-cards'

@Component({
  components: {
    EyeSVG,
    StrokeEyeSVG
  }
})
export default class LegalCardTableInfo extends Vue {
  @Prop({ type: Number, required: true }) number!: string
  @Prop({ type: Object, required: true }) type!: BonusCardType
  @Prop({ type: String, default: null }) name!: string
  @Prop({ type: [Number, Object], default: null }) pin!: number | null

  pinRevealed = false

  togglePinRevealed() {
    this.pinRevealed = !this.pinRevealed
  }

  get typeName() {
    return this.type.id
      ? BonusCardsModule.getBonusCardNameByType(this.type.id)
      : ''
  }
}
</script>
