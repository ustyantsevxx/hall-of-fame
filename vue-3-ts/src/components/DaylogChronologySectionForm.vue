<template>
  <Component
    :is="formComponentConfigByMode.component"
    v-bind="formComponentConfigByMode.componentAttrs"
    @save="save"
    @remove="remove"
    @close="close"
  />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import {
  ChronologySectionWithMeta,
  DaylogChronologySectionMode
} from '@/components/DaylogChronology.types'
import DaylogChronologyFormTimer from '@/components/DaylogChronologyFormTimer.vue'
import { FormComponentConfig } from '@/components/DaylogChronologySectionForm.types'
import { useChronologySectionForm } from '@/hooks/useChronologySectionForm'

const props = defineProps({
  mode: {
    type: Number as PropType<DaylogChronologySectionMode>,
    required: true
  },
  timers: { type: Array as PropType<Timer[]>, required: true },
  section: {
    type: Object as PropType<ChronologySectionWithMeta | null>,
    default: null
  }
})
const emit = defineEmits<{
  (e: 'save', v: any)
  (e: 'remove')
  (e: 'close')
}>()

const { getInitialStartDate, getInitialEndDate } =
  useChronologySectionForm(props)

const formComponentConfigByMode = computed<FormComponentConfig>(() => {
  const config = {
    [DaylogChronologySectionMode.AddAfter]: () => {
      return {
        component: DaylogChronologyFormTimer,
        componentAttrs: {
          title: 'xx',
          timerOptions: props.timers,
          section: {
            startDatetime: getInitialStartDate(),
            endDatetime: getInitialEndDate(),
            meta: {
              previousSection: props.section,
              nextSection: props.section?.meta.nextSection
            }
          },
          mode: props.mode
        }
      }
    },
    [DaylogChronologySectionMode.Edit]: () => {
      return {
        component: DaylogChronologyFormTimer,
        componentAttrs: {
          title: 'xx',
          timerOptions: props.timers,
          section: props.section,
          mode: props.mode
        }
      }
    }
  }

  return config[props.mode]()
})

const save = formData => emit('save', formData)
const remove = () => emit('remove')
const close = () => emit('close')
</script>
