<template>
  <div
    class="grid grid-cols-2 grid-rows-2 pt-28 pr-35 pb-40 pl-40 rounded-20 card"
  >
    <div>
      <div class="mt-4">
        <p class="text-white text-opacity-50">
          <slot name="card-type"></slot>
        </p>
        <p class="mt-2 text-h2 text-white">
          <slot name="card-number"></slot>
        </p>
        <p class="mt-4 text-white text-opacity-50">
          <slot name="status"></slot>
        </p>
      </div>
    </div>

    <div class="flex justify-end items-start mr-5">
      <button
        class="flex items-center space-x-10 leading-none"
        @click="$emit('show-info')"
      >
        <CircleInfoSVG />
        <span class="text-white">Информация о карте</span>
      </button>
    </div>

    <div class="self-end">
      <div class="flex">
        <p class="text-white value">
          <slot name="value"></slot>
        </p>

        <div class="flex flex-col justify-between ml-21">
          <p class="mt-6 text-white uppercase value-unit text-2xl">
            <slot name="value-unit"></slot>
          </p>

          <p class="mb-2 text-white text-opacity-50">
            <slot name="value-unit-hint"></slot>
          </p>
        </div>
      </div>
    </div>

    <div v-if="cardCount > 1" class="place-self-end">
      <div class="flex space-x-20">
        <button title="Предыдущая карта" @click="$emit('next')">
          <CircleArrowLeftSVG />
        </button>
        <button title="Следующая карта" @click="$emit('prev')">
          <CircleArrowRightSVG />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import CircleArrowLeftSVG from '~/assets/svg/index/circle-arrow-left.svg'
import CircleArrowRightSVG from '~/assets/svg/index/circle-arrow-right.svg'
import CircleInfoSVG from '~/assets/svg/index/circle-info.svg'

@Component({
  components: {
    CircleArrowRightSVG,
    CircleArrowLeftSVG,
    CircleInfoSVG
  }
})
export default class IndexPageCardTemplate extends Vue {
  get cardCount() {
    return this.$accessor.bonusCards.length
  }
}
</script>

<style scoped>
.card {
  min-height: 320px;
  height: 100%;
}

.value {
  font-size: 70px;
  line-height: 70px;
}

.value-unit {
  font-size: 24px;
  line-height: 25px;
}
</style>
