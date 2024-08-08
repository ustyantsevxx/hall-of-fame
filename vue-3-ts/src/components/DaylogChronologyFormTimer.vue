<template>
  <Card>
    <form class="px-15 pt-20 pb-15" @submit.prevent="save">
      <div class="flex justify-between">
        <div class="text-medium-17 laptop:text-medium-16">{{ title }}</div>

        <DaylogChronologyFormClose @click="emit('close')" />
      </div>

      <div class="mt-15">
        <SelectTimer
          :model-value="formData.owner?.id"
          :options="timerOptions"
          track-by="id"
          placeholder="xx xx"
          variant="elevated"
          @update:model-value="handleTimerChange"
        />

        <div class="mt-15 grid grid-cols-2 gap-x-15 laptop:gap-x-10">
          <DaylogChronologyFormSection
            class="px-15 pb-36 pt-20 laptop:pb-12 laptop:pt-16"
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
          </DaylogChronologyFormSection>

          <div class="flex flex-col">
            <DaylogChronologyFormSection class="grow">
              <div class="h-full p-15">
                <Textarea
                  v-model="formData.comment"
                  class="h-full w-full"
                  placeholder="xx xx xx"
                />
              </div>
            </DaylogChronologyFormSection>

            <DaylogChronologyFormSection class="mt-15 py-5 laptop:mt-10">
              <MoodSelector v-model="formData.mood" />
            </DaylogChronologyFormSection>
          </div>
        </div>
      </div>

      <div class="mt-15 flex">
        <ButtonIcon
          v-if="mode === DaylogChronologySectionMode.Edit"
          color="#FF8181"
          title="xx"
          class="mr-15"
          @click="remove"
        >
          <SvgTrash />
        </ButtonIcon>

        <div class="w-[240px]">
          <Button
            type="submit"
            variant="primary"
            class="w-full laptop:!py-6 laptop:!text-[14px] laptop:!leading-[25px]"
          >
            xx
          </Button>
        </div>
      </div>
    </form>

    <ModalConfirmationDelete
      :ref="registerDeleteModalSafeRef"
      title="xx!"
      description="xx xx xx xx xx xx?"
      classes="flex justify-center items-center"
      :max-width="350"
    />

    <ModalConfirmation
      :ref="registerConfirmationModalSafeRef"
      title="xx"
      description="xx xx xx xx xx xx xx xx xx xx. xx?"
      classes="flex justify-center items-center"
      confirm-text="xx"
      cancel-text="xx"
      :max-width="350"
    />
  </Card>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import Button from '@/components/Button.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import Card from '@/components/Card.vue'
import {
  ChronologySectionWithMeta,
  DaylogChronologySectionMode,
  DaylogChronologyTimerFormData
} from '@/components/DaylogChronology.types'
import DaylogChronologyFormClose from '@/components/DaylogChronologyFormClose.vue'
import DaylogChronologyFormSection from '@/components/FormSection.vue'
import { ModalConfirmationComponent } from '@/components/ModalConfirmation.types'
import ModalConfirmation from '@/components/ModalConfirmation.vue'
import { ModalConfirmationDeleteComponent } from '@/components/ModalConfirmationDelete.types'
import ModalConfirmationDelete from '@/components/ModalConfirmationDelete.vue'
import MoodSelector from '@/components/MoodSelector.vue'
import SelectTimer from '@/components/SelectTimer.vue'
import Textarea from '@/components/Textarea.vue'
import TimeRangeSelector from '@/components/TimeRangeSelector.vue'
import { useChronologySectionFormTimer } from '@/hooks/useChronologySectionFormTimer'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

const props = defineProps({
  title: { type: String, required: true },
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
