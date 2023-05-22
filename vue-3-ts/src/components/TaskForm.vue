<template>
  <form class="" @submit.prevent="onSubmit">
    <SelectTimer
      :model-value="owner?.id"
      :options="timerOptions"
      track-by="id"
      placeholder="Выберите таймер"
      variant="elevated"
      class="bg-white"
      @update:model-value="handleTimerChange"
    />

    <slot name="name-input" v-bind="slotProps">
      <FormGroup v-slot="{ id }" label="Название задачи" class="mt-16">
        <Input
          :id="id"
          v-model="name"
          placeholder="Например, написать эссе"
          variant="bottom-line"
          multiline
        />
      </FormGroup>
    </slot>

    <div class="mt-12 laptop:mt-5">
      <slot name="before-fields"></slot>

      <TaskFormFieldFinishDate v-model="finishDateTime" />
      <TaskFormFieldNotificationDatetime
        v-model="notificationDateTime"
        :selected-finish-datetime="finishDateTime"
      />
      <TaskFormFieldExecutor />
    </div>

    <div class="mt-25">
      <ErrorList
        v-if="errorList.length > 0"
        class="mb-25"
        :errors="errorList"
      />

      <slot name="actions">
        <div class="flex">
          <Button variant="primary" class="px-38 laptop:!px-59">
            <span>Добавить задачу</span>
          </Button>
        </div>
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { date, object, string } from 'yup'

import { Timer } from '@/api/modules/timers/types'
import Button from '@/components/Button.vue'
import ErrorList from '@/components/ErrorList.vue'
import FormGroup from '@/components/FormGroup.vue'
import Input from '@/components/Input.vue'
import SelectTimer from '@/components/SelectTimer.vue'
import { TaskFormData } from '@/components/TaskForm.types'
import TaskFormFieldExecutor from '@/components/TaskFormFieldExecutor.vue'
import TaskFormFieldFinishDate from '@/components/TaskFormFieldFinishDatetime.vue'
import TaskFormFieldNotificationDatetime from '@/components/TaskFormFieldNotificationDatetime.vue'
import { useValidation } from '@/hooks/useValidation'

const props = defineProps({
  initialFormData: { type: Object as PropType<TaskFormData>, default: null },
  timerOptions: { type: Array as PropType<Timer[]>, required: true }
})

const emit = defineEmits<{
  (e: 'save', v: TaskFormData)
}>()

const validationSchema = {
  owner: object().nullable().required('Выберите таймер'),
  name: string()
    .required('Задача должна иметь название')
    .max(120, 'Максимальная длина названия задачи 120 символов'),
  finishDateTime: date().nullable(),
  notificationDateTime: date().nullable()
}

const { errorList, onSubmit, useFormField } = useValidation({
  validationSchema,
  submitCallback: () => {
    save()
  }
})

const { value: owner } = useFormField<Timer | null>('owner', {
  initialValue: props.initialFormData?.owner || null
})
const { value: name } = useFormField<string>('name', {
  initialValue: props.initialFormData?.name || ''
})
const { value: finishDateTime } = useFormField<Date | undefined>(
  'finishDateTime',
  {
    initialValue: props.initialFormData?.finishDateTime || undefined
  }
)
const { value: notificationDateTime } = useFormField<Date | null>(
  'notificationDateTime',
  {
    initialValue: props.initialFormData?.notificationDateTime || null
  }
)

const slotProps = computed(() => ({
  owner: owner.value,
  name: name.value,
  setName: (value: string) => (name.value = value)
}))

const handleTimerChange = (timerId: string) => {
  const selectedTimer = props.timerOptions.find(timer => timer.id === timerId)
  if (selectedTimer) {
    owner.value = selectedTimer
  }
}

const save = () => {
  if (owner.value) {
    const formData: TaskFormData = {
      name: name.value,
      owner: owner.value,
      finishDateTime: finishDateTime.value || null,
      notificationDateTime: finishDateTime.value || null
    }
    emit('save', formData)
  }
}
</script>
