<template>
  <Modal
    :model-value="visible"
    :attach="attach"
    focus-trap
    content-class="rounded-13 overflow-hidden w-[355px] bg-white py-25 pl-16 pr-12"
    classes="pl-[200px] mr-30 flex justify-center items-center md:pl-0 md:justify-end"
    @update:model-value="updateVisible"
  >
    <form @submit.prevent="submit">
      <div class="flex items-center">
        <div class="h-24 w-24 text-main-primary">
          <SvgPerson />
        </div>

        <div class="ml-10 truncate text-medium-17">Исполнитель</div>

        <TaskFormModalDatePickerClearButton
          title="Очистить значение"
          class="ml-auto"
        />
      </div>

      <div class="mt-16">
        <Input
          v-model="searchString"
          variant="outline"
          placeholder="Введите email"
        />
      </div>

      <div class="mt-8 space-y-12">
        <div
          class="flex cursor-pointer select-none items-center rounded-5 transition-colors hover:bg-black/5 active:bg-black/10"
        >
          <div
            class="flex h-35 w-35 items-center justify-center rounded-full bg-[#F2F2F2]"
          >
            <div>ID</div>
          </div>
          <div class="ml-8 text-15">ivan.dorofeev@mail.ru</div>
        </div>
      </div>

      <div class="mt-35 flex">
        <Button
          variant="stroke-primary"
          class="w-[135px]"
          type="button"
          @click="cancel"
        >
          Отменить
        </Button>
        <Button variant="primary" class="ml-12 flex-grow">Назначить</Button>
      </div>
    </form>
  </Modal>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'

import Button from '@/components/Button.vue'
import TaskFormModalDatePickerClearButton from '@/components/ButtonCircleClear.vue'
import Input from '@/components/Input.vue'
import Modal from '@/components/Modal.vue'
import { SuggestionsSliderItem } from '@/components/SuggestionsSlider.types'

defineProps({
  modelValue: { type: Date, default: null },
  visible: { type: Boolean, default: false },
  attach: { type: String, default: undefined },
  dateVariants: {
    type: Array as PropType<SuggestionsSliderItem[]>,
    default: () => []
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date | null)
  (e: 'update:visible', v: boolean)
}>()

const searchString = ref('')

const updateVisible = (value: boolean) => emit('update:visible', value)
const submit = () => {
  emit('update:modelValue', null)
  updateVisible(false)
}
const cancel = () => updateVisible(false)
</script>
