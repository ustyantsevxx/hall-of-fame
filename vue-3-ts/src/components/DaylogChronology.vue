<template>
  <div class="flex-col">
    <template
      v-for="(section, sectionIndex) in preparedChronologyItemsWithMeta"
      :key="section.id"
    >
      <DaylogChronologySection
        v-if="section.id !== FAKE_PREPEND_SECTION_ID"
        :tabindex="section.editable ? '0' : '-1'"
        :item="section"
        :class="{
          'cursor-pointer transition-colors hover:bg-main-light-gray':
            section.editable,
          'bg-main-light-gray':
            activeChronologySectionIndex === sectionIndex &&
            activeChronologySectionMode === DaylogChronologySectionMode.Edit
        }"
        @click="editSectionAtIndex(sectionIndex, section)"
        @keydown.enter="editSectionAtIndex(sectionIndex, section)"
      />

      <DaylogChronologySectionActions
        :mode="activeChronologySectionMode"
        :section="section"
        :timers="timers"
        :habits="habits"
        :active="activeChronologySectionIndex === sectionIndex"
        :can-add="section.meta.canAddAfter"
        :first="
          (section.meta.first && !canAddNewSectionToStart) ||
          section.id === FAKE_PREPEND_SECTION_ID
        "
        :last="section.meta.last"
        @update-mode="value => updateMode(sectionIndex, value)"
        @save="saveSection"
        @remove="removeSection(sectionIndex)"
        @close-form="closeForm"
      />
    </template>

    <Drawer
      :title="drawerTitle"
      :opened="drawerOpened"
      @update:opened="closeForm"
    >
      <DaylogChronologyDrawerForm
        :opened="drawerOpened"
        :mode="activeChronologySectionMode"
        :section="activeChronologySection"
        :timers="timers"
        @save="saveSection"
        @remove="removeActiveSection"
        @close="closeForm"
      />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, PropType, ref } from 'vue'

import { Habit } from '@/api/modules/habits/types'
import { Timer } from '@/api/modules/timers/types'
import {
  ChronologySection,
  ChronologySectionType,
  ChronologySectionWithMeta,
  DaylogChronologySectionMode,
  DaylogChronologyTimerFormData,
  DaylogItem,
  DRAWER_OPENED_SECTION_MODES
} from '@/components/DaylogChronology.types'
import DaylogChronologyDrawerForm from '@/components/DaylogChronologyDrawerForm.vue'
import DaylogChronologySection from '@/components/DaylogChronologySection.vue'
import DaylogChronologySectionActions from '@/components/DaylogChronologySectionActions.vue'
import Drawer from '@/components/Drawer.vue'
import { useDaylogChronology } from '@/hooks/useDaylogChronology'
import { minutesFromDateStart } from '@/utils/datetime'

const FAKE_PREPEND_SECTION_ID = 'fake_section'

const props = defineProps({
  items: { type: Array as PropType<DaylogItem[]>, required: true },
  timers: { type: Array as PropType<Timer[]>, required: true },
  habits: { type: Array as PropType<Habit[]>, required: true }
})
const emit = defineEmits(['create-item', 'remove-item', 'update-item'])

const { chronologyItemsWithMeta, formDataToTimerSection, sectionToDaylogItem } =
  useDaylogChronology({
    items: props.items,
    timers: props.timers,
    habits: props.habits
  })

const activeChronologySectionIndex = ref<number | null>(null)
const activeChronologySectionMode = ref<DaylogChronologySectionMode>(
  DaylogChronologySectionMode.Default
)

const drawerOpened = computed(() =>
  DRAWER_OPENED_SECTION_MODES.includes(activeChronologySectionMode.value)
)

const drawerTitle = computed(() => {
  const config = {
    [DaylogChronologySectionMode.Edit]: 'Редактирование'
  }

  return config[activeChronologySectionMode.value] || ''
})

const activeChronologySection = computed(() => {
  return preparedChronologyItemsWithMeta.value[
    activeChronologySectionIndex.value ?? -1
  ]
})

const canAddNewSectionToStart = computed(() => {
  return chronologyItemsWithMeta.value[0]?.meta.canAddBefore
})

const fakePrependSection = computed<ChronologySectionWithMeta>(() => {
  const startOfDate = dayjs().startOf('date').toDate()
  return {
    id: FAKE_PREPEND_SECTION_ID,
    type: ChronologySectionType.Fake,
    startDatetime: startOfDate,
    endDatetime: startOfDate,
    editable: false,
    meta: {
      first: false,
      last: false,
      canAddBefore: false,
      canAddAfter: true,
      nextSection: chronologyItemsWithMeta.value[0]
    }
  }
})

const preparedChronologyItemsWithMeta = computed<ChronologySectionWithMeta[]>(
  () => {
    return canAddNewSectionToStart.value
      ? [fakePrependSection.value, ...chronologyItemsWithMeta.value]
      : chronologyItemsWithMeta.value
  }
)

const itemsOffset = computed(() => {
  return canAddNewSectionToStart.value ? 1 : 0
})

const activeChronologySectionIndexWithOffset = computed(() => {
  return activeChronologySectionIndex.value
    ? activeChronologySectionIndex.value - itemsOffset.value
    : null
})

const updateMode = (index: number, mode: DaylogChronologySectionMode) => {
  activeChronologySectionIndex.value = index
  activeChronologySectionMode.value = mode
}

const editSectionAtIndex = (index: number, section: ChronologySection) => {
  if (
    activeChronologySectionIndex.value === index &&
    activeChronologySectionMode.value === DaylogChronologySectionMode.Edit
  ) {
    closeForm()
    return
  }

  if (!section.editable) {
    return
  }

  updateMode(index, DaylogChronologySectionMode.Edit)
}

const closeForm = () => {
  activeChronologySectionIndex.value = null
  activeChronologySectionMode.value = DaylogChronologySectionMode.Default
}

const correctSectionsAccordingToSectionAtIndex = (
  targetSectionIndex: number
) => {
  correctSectionBeforeSectionAtIndex(targetSectionIndex)
  correctSectionAfterSectionAtIndex(targetSectionIndex)
}

const correctSectionBeforeSectionAtIndex = (targetSectionIndex: number) => {
  const targetSection = chronologyItemsWithMeta.value[targetSectionIndex]
  const previousSectionIndex = targetSectionIndex - 1
  const previousSection: ChronologySectionWithMeta =
    chronologyItemsWithMeta.value[previousSectionIndex]

  if (!previousSection) {
    return
  }

  const targetStartsBeforePreviousStarts =
    minutesFromDateStart(targetSection.startDatetime) <
    minutesFromDateStart(previousSection.startDatetime)
  const targetStartsBeforePreviousEnds =
    minutesFromDateStart(targetSection.startDatetime) <
    minutesFromDateStart(previousSection.endDatetime)

  if (targetStartsBeforePreviousEnds) {
    updateSection({
      index: previousSectionIndex,
      item: { ...previousSection, endDatetime: targetSection.startDatetime }
    })
  }

  if (targetStartsBeforePreviousStarts) {
    removeSection(previousSectionIndex)
    correctSectionBeforeSectionAtIndex(previousSectionIndex)
  }
}

const correctSectionAfterSectionAtIndex = (targetSectionIndex: number) => {
  const targetSection = chronologyItemsWithMeta.value[targetSectionIndex]
  const nextSectionIndex = targetSectionIndex + 1
  const nextSection: ChronologySectionWithMeta =
    chronologyItemsWithMeta.value[nextSectionIndex]

  if (!nextSection) {
    return
  }

  const targetSectionEndsAfterNextSectionEnds =
    minutesFromDateStart(targetSection.endDatetime) >
    minutesFromDateStart(nextSection.endDatetime)
  const targetSectionEndsAfterNextSectionStarts =
    minutesFromDateStart(targetSection.endDatetime) >
    minutesFromDateStart(nextSection.startDatetime)

  if (targetSectionEndsAfterNextSectionStarts) {
    updateSection({
      index: nextSectionIndex,
      item: { ...nextSection, startDatetime: targetSection.endDatetime }
    })
  }

  if (targetSectionEndsAfterNextSectionEnds) {
    removeSection(nextSectionIndex)
    correctSectionAfterSectionAtIndex(targetSectionIndex)
  }
}

const saveSection = (formData: DaylogChronologyTimerFormData) => {
  const saveCallbackByMode = {
    [DaylogChronologySectionMode.AddAfter]: () => {
      const insertAtIndex =
        (activeChronologySectionIndexWithOffset.value as number) + 1
      createSection({
        item: formDataToTimerSection(formData),
        index: insertAtIndex
      })
      correctSectionsAccordingToSectionAtIndex(insertAtIndex)
    },
    [DaylogChronologySectionMode.Edit]: () => {
      const updateAtIndex = activeChronologySectionIndexWithOffset.value || -1
      updateSection({
        item: formDataToTimerSection(formData),
        index: updateAtIndex
      })
      correctSectionsAccordingToSectionAtIndex(updateAtIndex)
    }
  }

  saveCallbackByMode[activeChronologySectionMode.value]()
}

const createSection = ({
  index,
  item
}: {
  index: number
  item: ChronologySection
}) => {
  emit('create-item', {
    item: sectionToDaylogItem(item),
    index
  })
  closeForm()
}

const updateSection = ({
  index,
  item
}: {
  index: number
  item: ChronologySection
}) => {
  emit('update-item', {
    item: sectionToDaylogItem(item),
    index
  })
  closeForm()
}

const removeSection = (index: number) => {
  emit('remove-item', { index })
  closeForm()
}

const removeActiveSection = () => {
  if (activeChronologySectionIndexWithOffset.value !== null) {
    removeSection(activeChronologySectionIndexWithOffset.value)
  }
}
</script>
