<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="space-y-15">
        <div class="flex">
          <FormIconPreview
            :icon="habitDataStore.habit.icon"
            :color="habitDataStore.habit.color"
          />
          <FormGroup
            v-slot="{ id }"
            label="Название привычки"
            class="ml-14 flex-grow"
          >
            <Input
              :id="id"
              v-model="habitDataStore.habit.name"
              placeholder="Например, отжимания"
              variant="bottom-line"
              multiline
            />
          </FormGroup>
        </div>

        <HabitFormNameSuggestions
          v-if="!habitDataStore.habit.name"
          class="!-mr-30 laptop:!mt-12"
        />

        <FormIconSelector
          v-model="habitDataStore.habit.icon"
          class="!mt-25 laptop:!mt-20"
        />

        <FormColorSelector v-model="habitDataStore.habit.color" />

        <HabitFormTypeSelector class="laptop:!mt-17" />

        <HabitFormCountSection
          v-if="habitDataStore.habit.type_id === HABIT_TYPES.COUNTER"
          class="laptop:!mt-25"
        />

        <HabitFormTimeGoalSection
          v-else-if="habitDataStore.habit.type_id === HABIT_TYPES.TIME"
          class="!mt-27"
        />

        <HabitFormRepeatDaysSection />

        <HabitFormEndingSection />

        <HabitFormRemindersSection />
      </div>

      <div class="mt-25">
        <ErrorList
          v-if="form.meta.value.touched"
          :errors="errorList"
          class="mb-20"
        />

        <div class="flex">
          <button
            class="min-w-[200px] rounded-12 bg-main-primary py-10 px-20 text-white text-17 laptop:px-33 laptop:py-8 laptop:text-14"
          >
            {{ habitDataStore.editing ? 'Готово' : 'Создать привычку' }}
          </button>

          <button
            v-if="habitDataStore.editing"
            class="ml-15 rounded-12 border border-subcolor-orange-cancel p-10 text-subcolor-orange-cancel transition-colors hover:bg-subcolor-orange-cancel hover:text-white laptop:py-6 laptop:px-8"
            title="Удалить привычку"
            type="button"
            @click="showConfirmDeleteModal"
          >
            <SvgTrash />
          </button>
        </div>
      </div>
    </form>

    <DrawerModalConfirmationDelete
      :ref="registerDeleteModalSafeRef"
      title="Удаление привычки"
      description="Удалить привычку без возможности восстановления?"
      :max-width="290"
    />
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { date, number, string } from 'yup'

import { HABIT_ENDING_TYPES, HABIT_TYPES } from '@/api/modules/habits/constants'
import DrawerModalConfirmationDelete from '@/components/DrawerModalConfirmationDelete.vue'
import ErrorList from '@/components/ErrorList.vue'
import FormColorSelector from '@/components/FormColorSelector.vue'
import FormGroup from '@/components/FormGroup.vue'
import FormIconPreview from '@/components/FormIconPreview.vue'
import FormIconSelector from '@/components/FormIconSelector.vue'
import HabitFormCountSection from '@/components/HabitFormCountSection.vue'
import HabitFormEndingSection from '@/components/HabitFormEndingSection.vue'
import HabitFormNameSuggestions from '@/components/HabitFormNameSuggestions.vue'
import HabitFormRemindersSection from '@/components/HabitFormRemindersSection.vue'
import HabitFormRepeatDaysSection from '@/components/HabitFormRepeatDaysSection.vue'
import HabitFormTimeGoalSection from '@/components/HabitFormTimeGoalSection.vue'
import HabitFormTypeSelector from '@/components/HabitFormTypeSelector.vue'
import Input from '@/components/Input.vue'
import { ModalConfirmationDeleteComponent } from '@/components/ModalConfirmationDelete.types'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'
import { useValidation } from '@/hooks/useValidation'
import { useHabitDataStore } from '@/stores/habit-data'

const emit = defineEmits<{
  (e: 'create')
  (e: 'update')
  (e: 'delete')
}>()

const {
  elementRef: deleteModalRef,
  registerSafeRef: registerDeleteModalSafeRef
} = useSafeTemplateRef<ModalConfirmationDeleteComponent>()

const habitDataStore = useHabitDataStore()

const { form, onSubmit, errorList, useFormField } = useValidation({
  validationSchema: {
    endingTypeId: number(),
    name: string().required('Привычка должна иметь название'),
    endDate: date().when('endingTypeId', {
      is: HABIT_ENDING_TYPES.ON_DATE,
      then: date().required('Укажите корректную дату окончания')
    })
  },
  submitCallback: () => {
    if (habitDataStore.editing) {
      emit('update')
    } else {
      emit('create')
    }
  }
})
const { value: name } = useFormField<string>('name', {
  initialValue: habitDataStore.habit.name
})
const { value: endDate } = useFormField<Date | undefined>('endDate', {
  initialValue: habitDataStore.habit.end_date
})
const { value: endingTypeId } = useFormField<number>('endingTypeId')

watch(
  () => habitDataStore.habit.name,
  habitName => {
    name.value = habitName
  }
)

watch(
  () => habitDataStore.habit.end_date,
  habitEndDate => {
    endDate.value = habitEndDate
  }
)

watch(
  () => habitDataStore.habit.ending_type_id,
  id => {
    endingTypeId.value = id
  }
)

const showConfirmDeleteModal = async () => {
  const confirmed = await deleteModalRef.value?.show()

  if (confirmed) {
    emit('delete')
  }
}
</script>
