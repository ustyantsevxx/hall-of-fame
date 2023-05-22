<template>
  <TaskForm
    :timer-options="timerOptions"
    :initial-form-data="initialFormData"
    @save="save"
  >
    <template #name-input="{ name, setName, owner }: TaskFormSlotContent">
      <div class="mt-16 flex laptop:mt-10">
        <CheckboxRounded
          v-model="completed"
          :color="owner?.color"
          :disabled="owner === null"
          checked-title="Отменить задачу невыполненной"
          title="Отменить задачу выполненной"
          class="mt-4"
        />

        <Input
          :model-value="name"
          variant="bottom-line"
          class="ml-10"
          placeholder="Например, написать эссе"
          multiline
          @update:modelValue="setName"
        />

        <button
          class="group relative ml-15 min-h-[24px] min-w-[24px]"
          type="button"
          @click="favorite = !favorite"
        >
          <Transition name="fade">
            <SvgStarFilled
              v-if="favorite"
              class="absolute transition-colors shift-center"
            />
            <SvgStar v-else class="absolute shift-center" />
          </Transition>
        </button>
      </div>
    </template>

    <template #before-fields>
      <Collapse as="div" class="border-b border-black/10">
        <template #activator-content="{ open }">
          <div class="w-full select-none py-8">
            <div
              class="flex w-full items-center rounded-5 py-5 transition-opacity group-hover:opacity-70 group-active:opacity-90"
            >
              <div class="h-24 w-24 text-main-primary">
                <SvgStats24 />
              </div>

              <div class="ml-10 text-14">
                <span>Статистика</span>
              </div>

              <SvgArrowRight24
                class="ml-auto h-24 w-24 text-main-placeholder transition-all group-hover:text-black/30"
                :class="[{ 'rotate-90': open }]"
              />
            </div>
          </div>
        </template>

        <div class="mb-13 pl-35">
          <div class="flex text-15">
            <div class="text-black/40">Все время:</div>
            <div class="ml-4 text-main-primary">08:13:00</div>
          </div>

          <div class="flex text-15">
            <div class="text-black/40">Сегодня:</div>
            <div class="ml-4 text-main-primary">00:13:00</div>
          </div>
        </div>
      </Collapse>
    </template>

    <template #actions>
      <div class="flex">
        <Button variant="primary" class="px-38 laptop:!px-59">
          <span>Сохранить</span>
        </Button>

        <ButtonIcon
          color="#FF8181"
          title="Удалить"
          class="ml-15 laptop:!py-4 laptop:!px-8"
          @click="remove"
        >
          <SvgTrash />
        </ButtonIcon>

        <DrawerModalConfirmationDelete
          ref="deleteModalRef"
          title="Внимание!"
          description="Вы точно хотите удалить эту задачу?"
        />
      </div>
    </template>
  </TaskForm>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import Button from '@/components/Button.vue'
import ButtonIcon from '@/components/ButtonIcon.vue'
import CheckboxRounded from '@/components/CheckboxRounded.vue'
import Collapse from '@/components/Collapse.vue'
import DrawerModalConfirmationDelete from '@/components/DrawerModalConfirmationDelete.vue'
import Input from '@/components/Input.vue'
import type {
  TaskFormData,
  TaskFormSlotContent
} from '@/components/TaskForm.types'
import TaskForm from '@/components/TaskForm.vue'

const props = defineProps({
  initialFormData: { type: Object as PropType<TaskFormData>, default: null },
  timerOptions: { type: Array as PropType<Timer[]>, required: true }
})

const favorite = ref(props.initialFormData.favorite)
const completed = ref(props.initialFormData.completed)
const deleteModalRef = ref<any>(null)

const emit = defineEmits<{
  (v: 'save', e: TaskFormData)
  (e: 'remove')
}>()

const save = (formData: TaskFormData) => {
  emit('save', {
    ...formData,
    favorite: favorite.value,
    completed: completed.value
  })
}

const remove = async () => {
  const confirmed = await deleteModalRef.value?.show()
  if (confirmed) {
    emit('remove')
  }
}
</script>
