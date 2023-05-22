<template>
  <div class="-ml-35">
    <p class="block pl-35 text-black/40 text-17 laptop:text-14">Напоминания</p>

    <div class="-mr-35 mt-10 flex space-x-15 overflow-x-auto py-4 pl-35">
      <div
        v-for="(_, i) in reminders"
        :key="_renderKeyIdentifiers[i]"
        class="flex items-center rounded-10 border border-main-primary/20 px-10 py-6"
      >
        <InputTimeHeadless
          v-model="reminders[i]"
          input-class="w-50 text-main-primary no-default-ring"
          :skip-values="reminders.filter((_, index) => index !== i)"
        />

        <button class="rounded-full" type="button" @click="removeReminder(i)">
          <SvgCancelCircle />
        </button>
      </div>

      <button
        class="shrink-0 rounded-12 border border-main-primary px-16 py-8 text-main-primary text-15 laptop:px-20 laptop:py-7 laptop:text-14"
        type="button"
        @click="addReminder"
      >
        Добавить время
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import InputTimeHeadless from '@/components/InputTimeHeadless.vue'
import { useHabitDataStore } from '@/stores/habit-data'
import { getUniqueString } from '@/utils/random'

const habitDataStore = useHabitDataStore()
const reminders = ref(habitDataStore.habit.notification_time)

const _renderKeyIdentifiers = ref<string[]>([])

const addReminder = () => {
  _renderKeyIdentifiers.value.push(getUniqueString())
  reminders.value.push(0)
}

const removeReminder = (index: number) => {
  _renderKeyIdentifiers.value.splice(index, 1)
  reminders.value.splice(index, 1)
}
</script>
