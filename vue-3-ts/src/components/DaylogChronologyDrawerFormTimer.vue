<template>
  <div>
    <form class="pt-15" @submit.prevent="save">
      <SelectTimer
        :model-value="formData.owner?.id"
        :options="timerOptions"
        track-by="id"
        placeholder="xx xx"
        variant="elevated"
        class="bg-white"
        @update:model-value="handleTimerChange"
      />

      <DaylogChronologyDrawerFormSection
        class="mt-25 px-15 py-20 pb-36 laptop:pb-12 laptop:pt-16"
      >
        <TimeRangeSelector
          :time-start="formData.startTime"
          :time-end="formData.endTime"
          :min-time-start="minTime"
          :max-time-start="formData.endTime"
          :min-time-end="formData.startTime"
          :max-time-end="maxTime"
          @update:timeStart="handleTimeStartChange"
          @update:timeEnd="handleTimeEndChange"
        />
      </DaylogChronologyDrawerFormSection>

      <DaylogChronologyDrawerFormSection class="mt-20 h-[115px] px-15 py-13">
        <Textarea
          v-model="formData.comment"
          class="h-full w-full resize-none"
          placeholder="xx xx xx"
        />
      </DaylogChronologyDrawerFormSection>

      <MoodSelector v-model="formData.mood" class="mt-15" />

      <div class="mt-25 flex">
        <div class="w-[190px]">
          <Button
            type="submit"
            variant="primary"
            class="w-full laptop:!py-6 laptop:!text-[14px] laptop:!leading-[25px]"
          >
            xx
          </Button>
        </div>

        <ButtonIcon
          v-if="mode === DaylogChronologySectionMode.Edit"
          color="#FF8181"
          title="xx"
          class="ml-15 laptop:!py-4 laptop:!px-8"
          @click="remove"
        >
          <SvgTrash />
        </ButtonIcon>
      </div>
    </form>

    <DrawerModalConfirmationDelete
      :ref="registerDeleteModalSafeRef"
      title="xx!"
      description="xx xx xx xx xx xx?"
    />

    <DrawerModalConfirmation
      :ref="registerConfirmationModalSafeRef"
      title="xx"
      description="xx xx xx xx xx xx xx xx xx xx. xx?"
      confirm-text="xx"
      cancel-text="xx"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import Button from '@/components/Button.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import {
  ChronologySectionWithMeta,
  DaylogChronologySectionMode,
  DaylogChronologyTimerFormData
} from '@/components/DaylogChronology.types'
import DaylogChronologyDrawerFormSection from '@/components/DaylogChronologyDrawerFormSection.vue'
import DrawerModalConfirmation from '@/components/DrawerModalConfirmation.vue'
import DrawerModalConfirmationDelete from '@/components/DrawerModalConfirmationDelete.vue'
import { ModalConfirmationComponent } from '@/components/ModalConfirmation.types'
import { ModalConfirmationDeleteComponent } from '@/components/ModalConfirmationDelete.types'
import MoodSelector from '@/components/MoodSelector.vue'
import SelectTimer from '@/components/SelectTimer.vue'
import Textarea from '@/components/Textarea.vue'
import TimeRangeSelector from '@/components/TimeRangeSelector.vue'
import { useChronologySectionFormTimer } from '@/hooks/useChronologySectionFormTimer'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

const props = defineProps({
  section: {
    type: Object as PropType<ChronologySectionWithMeta | null>,
    default: null
  },
  timerOptions: { type: Array as PropType<Timer[]>, required: true },
  mode: {
    type: Number as PropType<DaylogChronologySectionMode>,
    required: true
  }
})
const emit = defineEmits<{
  (e: 'save', v: DaylogChronologyTimerFormData)
  (e: 'remove')
  (e: 'close')
}>()

const {
  elementRef: confirmationModalRef,
  registerSafeRef: registerConfirmationModalSafeRef
} = useSafeTemplateRef<ModalConfirmationComponent>()

const {
  elementRef: deleteModalRef,
  registerSafeRef: registerDeleteModalSafeRef
} = useSafeTemplateRef<ModalConfirmationDeleteComponent>()

const {
  formData,
  minTime,
  maxTime,
  save,
  remove,
  handleTimeEndChange,
  handleTimerChange,
  handleTimeStartChange
} = useChronologySectionFormTimer({
  props,
  emit,
  confirmationModalRef,
  confirmationDeleteModalRef: deleteModalRef
})
</script>
