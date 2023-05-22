<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div>
        <div class="flex">
          <FormIconPreview
            :color="timerDataStore.timer.color"
            :icon="timerDataStore.timer.icon"
          />
          <FormGroup
            v-slot="{ id }"
            label="Название таймера"
            class="ml-14 flex-grow"
          >
            <Input
              :id="id"
              v-model="timerDataStore.timer.name"
              placeholder="Например, отжимания"
              variant="bottom-line"
              multiline
            />
          </FormGroup>
        </div>

        <FormIconSelector
          v-model="timerDataStore.timer.icon"
          class="mt-25 laptop:mt-20"
        />

        <FormColorSelector v-model="timerDataStore.timer.color" class="mt-15" />

        <div class="mt-32 divide-y divide-black divide-opacity-5 laptop:mt-27">
          <div class="pb-12">
            <div class="flex items-center justify-between">
              <p class="text-17 laptop:text-14">Ежедневная цель</p>
              <Switch v-model="timerDataStore.timer.dailyGoalEnabled" />
            </div>

            <div
              v-if="timerDataStore.timer.dailyGoalEnabled"
              class="mt-12 flex items-center justify-between"
            >
              <p class="w-[280px] text-black/40 text-17 laptop:text-14">
                Установленная ежедневная
                <br />
                цель
              </p>
              <InputTime v-model="timerDataStore.timer.dailyGoal" />
            </div>
          </div>

          <div class="pb-12">
            <div class="flex items-center justify-between pt-12">
              <p class="text-17 laptop:text-14">Включить уведомления</p>
              <Switch v-model="timerDataStore.timer.notificationsEnabled" />
            </div>

            <div
              v-if="timerDataStore.timer.notificationsEnabled"
              class="mt-7 flex items-center justify-between"
            >
              <p class="w-[280px] text-black/40 text-17 laptop:text-14">
                Интервал напоминаний
                <br />
                о работе таймера
              </p>
              <InputTime v-model="timerDataStore.timer.notifyAt" />
            </div>
          </div>

          <div class="pt-25">
            <p class="text-medium-17 laptop:text-medium-14">
              Завершение таймера
            </p>

            <div
              class="mt-10 divide-y divide-black divide-opacity-5 laptop:mt-0"
            >
              <div
                v-for="(setting, i) in settings"
                :key="i"
                class="flex items-center justify-between py-12 laptop:py-10"
              >
                <p class="text-17 laptop:text-14">{{ setting.title }}</p>
                <Switch v-model="setting.value" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-25">
        <ErrorList
          v-if="form.meta.value.touched"
          :errors="errorList"
          class="mb-20"
        />

        <button
          v-if="!timerDataStore.editing"
          class="rounded-12 bg-main-primary py-10 px-20 text-white text-17 laptop:px-33 laptop:py-8 laptop:text-14 xl:px-40"
        >
          Создать таймер
        </button>

        <div v-else class="flex">
          <button
            class="min-w-[200px] rounded-12 bg-main-primary py-10 px-20 text-white text-17 laptop:px-33 laptop:py-8 laptop:text-14"
          >
            Готово
          </button>

          <button
            class="ml-15 rounded-12 border border-subcolor-orange-cancel p-10 text-subcolor-orange-cancel transition-colors hover:bg-subcolor-orange-cancel hover:text-white laptop:py-6 laptop:px-8"
            title="Удалить таймер"
            type="button"
            @click="deleteTimer"
          >
            <SvgTrash />
          </button>
        </div>
      </div>
    </form>

    <DrawerModalConfirmationDelete
      :ref="registerSafeRef"
      title="Удаление таймера"
      description="Удалить таймер без возможности восстановления?"
      classes="pl-[200px] mr-62 flex justify-center items-center md:pl-0 md:justify-end"
      :max-width="290"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { string } from 'yup'

import DrawerModalConfirmationDelete from '@/components/DrawerModalConfirmationDelete.vue'
import ErrorList from '@/components/ErrorList.vue'
import FormColorSelector from '@/components/FormColorSelector.vue'
import FormGroup from '@/components/FormGroup.vue'
import FormIconPreview from '@/components/FormIconPreview.vue'
import FormIconSelector from '@/components/FormIconSelector.vue'
import Input from '@/components/Input.vue'
import InputTime from '@/components/InputTime.vue'
import { ModalConfirmationDeleteComponent } from '@/components/ModalConfirmationDelete.types'
import Switch from '@/components/Switch.vue'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'
import { useValidation } from '@/hooks/useValidation'
import { useTimerDataStore } from '@/stores/timer-data'

const emit = defineEmits<{
  (e: 'create')
  (e: 'update')
  (e: 'delete')
}>()

const { elementRef: deleteModalRef, registerSafeRef } =
  useSafeTemplateRef<ModalConfirmationDeleteComponent>()

const timerDataStore = useTimerDataStore()

const { form, onSubmit, errorList, useFormField } = useValidation({
  validationSchema: {
    name: string().required('Таймер должен иметь название')
  },
  submitCallback: () => {
    if (timerDataStore.editing) {
      emit('update')
    } else {
      emit('create')
    }
  }
})
const { value: name } = useFormField<string>('name', {
  initialValue: timerDataStore.timer.name
})

watch(
  () => timerDataStore.timer.name,
  timerName => {
    name.value = timerName
  }
)

const settings = ref([
  {
    title: 'Редактировать время',
    value: false
  },
  {
    title: 'Отслеживать настроение',
    value: false
  },
  {
    title: 'Добавить заметку',
    value: false
  }
])

const deleteTimer = async () => {
  const confirmed = await deleteModalRef.value?.show()

  if (confirmed) {
    emit('delete')
  }
}
</script>
