<template>
  <DaylogChronologyDivider
    v-if="!active || !actionFormVisible"
    class="w-full"
    :line-up="actionsActivatorLineUp"
    :line-down="actionsActivatorLineDown"
  >
    <DaylogChronologyButtonAdd v-if="canAdd" @click="openAddTimeSectionForm" />
  </DaylogChronologyDivider>

  <template v-else>
    <DaylogChronologyDivider v-if="!first" line-up line-down />

    <DaylogChronologySectionForm
      :ref="registerSafeRef"
      :timers="timers"
      :section="section"
      :mode="mode"
      @save="value => emit('save', value)"
      @remove="emit('remove')"
      @close="emit('close-form')"
    />

    <DaylogChronologyDivider v-if="!last" line-up line-down />
  </template>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, computed, PropType, watch } from 'vue'

import { Habit } from '@/api/modules/habits/types'
import { Timer } from '@/api/modules/timers/types'
import {
  ACTION_FORM_VISIBLE_SECTION_MODES,
  ChronologySectionWithMeta,
  DaylogChronologySectionMode
} from '@/components/DaylogChronology.types'
import DaylogChronologyButtonAdd from '@/components/DaylogChronologyButtonAdd.vue'
import DaylogChronologyDivider from '@/components/DaylogChronologyDivider.vue'
import DaylogChronologySectionForm from '@/components/DaylogChronologySectionForm.vue'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'
import { sleep } from '@/utils'

const props = defineProps({
  timers: { type: Array as PropType<Timer[]>, required: true },
  habits: { type: Array as PropType<Habit[]>, required: true },
  section: {
    type: Object as PropType<ChronologySectionWithMeta>,
    default: null
  },
  mode: {
    type: Number as PropType<DaylogChronologySectionMode>,
    required: true
  },
  active: { type: Boolean, default: false },
  first: { type: Boolean, default: false },
  last: { type: Boolean, default: false },
  canAdd: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (e: 'save', v: any)
  (e: 'remove')
  (e: 'close-form')
  (e: 'update-mode', v: DaylogChronologySectionMode)
}>()

const actionFormVisible = computed(() =>
  ACTION_FORM_VISIBLE_SECTION_MODES.includes(props.mode)
)

const actionsActivatorLineUp = computed(() => {
  return !props.first && !(props.last && !props.canAdd)
})
const actionsActivatorLineDown = computed(() => {
  return !props.last
})

const openAddTimeSectionForm = () => {
  emit('update-mode', DaylogChronologySectionMode.AddAfter)
}

const { elementRef: sectionFormRef, registerSafeRef } =
  useSafeTemplateRef<ComponentPublicInstance>()
watch(sectionFormRef, async formRef => {
  if (props.active && formRef?.$el) {
    await sleep(75)
    formRef.$el.scrollIntoView()
  }
})
</script>
