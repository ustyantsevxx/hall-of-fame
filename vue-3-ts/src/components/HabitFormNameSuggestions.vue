<template>
  <Slider
    :items="nameSuggestions"
    :vendor-props="{
      spaceBetween: 6,
      mousewheel: true,
      freeMode: true,
      grabCursor: true
    }"
  >
    <template #slide="{ item }">
      <button
        :key="item"
        type="button"
        class="shrink-0 rounded-10 border border-main-primary border-opacity-30 py-7 px-10 text-main-primary text-15"
        @click="habitDataStore.habit.name = item"
      >
        {{ item }}
      </button>
    </template>
  </Slider>
</template>

<script setup lang="ts">
import Slider from '@/components/Slider.vue'
import { useHabitDataStore } from '@/stores/habit-data'

const habitDataStore = useHabitDataStore()

const nameSuggestions = ['xx', 'xx', 'xx', 'xx xx']
</script>
