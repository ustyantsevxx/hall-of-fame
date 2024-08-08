<template>
  <DefaultLayout>
    <div class="max-w-[555px] laptop:max-w-[457px]">
      <RadioGroupNavigation
        :items="navigationItems"
        :variant="'button-group-shadow'"
        class="!w-[457px]"
      />

      <div class="mt-20">
        <RouterView />
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  RadioGroupItem,
  RadioGroupNavigationItem
} from '@/components/RadioGroup.types'
import RadioGroupNavigation from '@/components/RadioGroupNavigation.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { settingsRoutes } from '@/router/routes'

type SettingsRadioGroupItem = RadioGroupItem & {
  path: string
}

const settingsPages: SettingsRadioGroupItem[] = [
  {
    path: settingsRoutes.profile.path,
    label: 'xx'
  },
  {
    path: settingsRoutes.preferences.path,
    label: 'xx'
  },
  {
    path: settingsRoutes.feedback.path,
    label: 'xx xx'
  }
]

const getSettingsLink = (item: SettingsRadioGroupItem): string => {
  return `/settings${item.path.length > 0 ? '/' : ''}${item.path}`
}

const navigationItems = computed<RadioGroupNavigationItem[]>(() => {
  return settingsPages.map(p => ({
    label: p.label,
    to: getSettingsLink(p)
  }))
})
</script>
