<template>
  <div class="-mr-35 flex justify-between" v-bind="$attrs">
    <div class="flex max-w-full">
      <HabitAddButton @click="handleAddHabitButtonClick" />

      <Slider
        v-if="habits"
        :items="habits"
        :vendor-props="{
          spaceBetween: 10,
          mousewheel: true,
          freeMode: true,
          grabCursor: true
        }"
        class="!ml-10"
      >
        <template #slide="{ item }">
          <HabitElement :habit="item" @click="handleHabitClick(item)" />
        </template>
      </Slider>

      <!--      <figure class="bg-main-placeholder h-76 w-2"></figure>-->

      <!--      <Slider-->
      <!--        v-if="habits"-->
      <!--        :items="habits"-->
      <!--        :vendor-props="{-->
      <!--          spaceBetween: 10,-->
      <!--          mousewheel: true,-->
      <!--          freeMode: true,-->
      <!--          grabCursor: true-->
      <!--        }"-->
      <!--        class="!ml-auto"-->
      <!--      >-->
      <!--        <template #slide="{ item }">-->
      <!--          <HabitElement :habit="item" @click="handleHabitClick(item)" />-->
      <!--        </template>-->
      <!--      </Slider>-->
    </div>

    <!--    <div class="flex">-->
    <!--      <figure class="bg-white/50 h-76 mr-25 w-2"></figure>-->

    <!--      <div class="flex space-x-16">-->
    <!--        <HabitElement v-for="habit in habits" :key="habit.id" :habit="habit" />-->
    <!--      </div>-->
    <!--    </div>-->
  </div>

  <Drawer v-model:opened="drawerOpened" :title="drawerTitle">
    <template #before-close>
      <Transition name="fade" mode="out-in">
        <div v-if="drawerStatus === DrawerStatus.Info" class="mr-20 flex">
          <button
            type="button"
            title="Редактировать привычку"
            @click="startEditingHabit"
          >
            <SvgEdit29 />
          </button>
        </div>
      </Transition>
    </template>

    <Transition name="fade" mode="out-in">
      <HabitView v-if="drawerStatus === DrawerStatus.Info" />

      <HabitForm
        v-else
        class="mt-15"
        @create="create"
        @update="update"
        @delete="remove"
      />
    </Transition>
  </Drawer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { useHabits } from '@/api/modules/habits/hooks'
import { Habit } from '@/api/modules/habits/types'
import Drawer from '@/components/Drawer.vue'
import HabitAddButton from '@/components/HabitAddButton.vue'
import HabitElement from '@/components/HabitElement.vue'
import HabitForm from '@/components/HabitForm.vue'
import HabitView from '@/components/HabitView.vue'
import Slider from '@/components/Slider.vue'
import { useBoolean } from '@/hooks/useBoolean'
import { DrawerStatus } from '@/pages/IndexPageHabits.types'
import { useHabitDataStore } from '@/stores/habit-data'

const [drawerOpened, { setTrue: openDrawer, setFalse: closeDrawer }] =
  useBoolean(false)
const drawerStatus = ref(DrawerStatus.Info)

const habitDataStore = useHabitDataStore()

const drawerTitle = computed(() => {
  const titleByStatus = {
    [DrawerStatus.Create]: 'Новая привычка',
    [DrawerStatus.Edit]: 'Редактирование привычки',
    [DrawerStatus.Info]: 'Привычка'
  }

  return titleByStatus[drawerStatus.value]
})

const handleAddHabitButtonClick = () => {
  drawerStatus.value = DrawerStatus.Create
  habitDataStore.$reset()
  openDrawer()
}

const showHabitInfo = () => {
  drawerStatus.value = DrawerStatus.Info
  openDrawer()
}

const startEditingHabit = async () => {
  drawerStatus.value = DrawerStatus.Edit
  habitDataStore.editing = true
}

const handleHabitClick = (habit: Habit) => {
  habitDataStore.populateState(habit)
  showHabitInfo()
}

const { habits, createHabit, updateHabit, deleteHabit } = useHabits()

const create = () => {
  createHabit(habitDataStore.getRequestBody())
  closeDrawer()
}

const update = () => {
  updateHabit(habitDataStore.getRequestBody())
  closeDrawer()
}

const remove = () => {
  deleteHabit(habitDataStore.habit.id)
  closeDrawer()
}
</script>
