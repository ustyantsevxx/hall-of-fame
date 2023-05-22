<template>
  <form class="space-y-20" @submit.prevent="save">
    <TimerActiveFormInfoCard :timer="timer" />

    <FormSection v-if="mode !== TimerActiveFormMode.Editing" class="p-16 pb-8">
      <TimeRangeSelector
        v-model:time-start="formData.timeStart"
        v-model:time-end="formData.timeEnd"
      />
    </FormSection>

    <FormSection class="h-[115px] px-15 py-13">
      <Textarea
        v-model="formData.comment"
        placeholder="Комментарий к таймеру"
        class="w-full"
      />
    </FormSection>

    <MoodSelector v-model="formData.mood" class="!mt-13" />

    <Button :variant="'primary'" class="!mt-28 !px-59 !py-8 !text-14">
      Сохранить
    </Button>
  </form>
</template>

<script setup lang="ts">
import { PropType, reactive } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import Button from '@/components/Button.vue'
import FormSection from '@/components/FormSection.vue'
import MoodSelector from '@/components/MoodSelector.vue'
import Textarea from '@/components/Textarea.vue'
import { TimerActiveFormMode } from '@/components/TimerActiveForm.types'
import TimerActiveFormInfoCard from '@/components/TimerActiveFormInfoCard.vue'
import TimeRangeSelector from '@/components/TimeRangeSelector.vue'

defineProps({
  timer: { type: Object as PropType<Timer>, required: true },
  mode: { type: Number as PropType<TimerActiveFormMode>, required: true }
})

const formData = reactive({
  timeStart: 0,
  timeEnd: 0,
  comment: '',
  mood: null
})

const emit = defineEmits<{
  (e: 'save')
}>()

const save = () => {
  emit('save')
}
</script>
