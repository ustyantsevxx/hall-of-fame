<template>
  <div>
    <BannerUpgradeToPremium />

    <div class="mt-20 divide-y divide-black divide-opacity-5">
      <div
        v-for="(setting, i) in settings"
        :key="i"
        class="flex items-center justify-between py-12"
      >
        <p class="text-17">{{ setting.title }}</p>
        <Switch v-model="setting.value" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BannerUpgradeToPremium from '@/components/BannerUpgradeToPremium.vue'
import Switch from '@/components/Switch.vue'

const settings = ref([
  {
    title: 'Включить уведомления',
    value: false
  },
  {
    title: 'Изменить время начала дня',
    value: false
  }
])
</script>
