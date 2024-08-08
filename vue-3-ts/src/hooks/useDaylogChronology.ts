import dayjs from 'dayjs'
import { computed, onMounted, onUnmounted, ref } from 'vue'

import { Habit } from '@/api/modules/habits/types'
import { Timer } from '@/api/modules/timers/types'
import {
  ChronologyHabitSection,
  ChronologySection,
  ChronologySectionType,
  ChronologySectionWithMeta,
  ChronologyTimerSection,
  DaylogChronologyTimerFormData,
  DaylogItem
} from '@/components/DaylogChronology.types'
import { dateToUnixSeconds, minutesFromDateStartToDate } from '@/utils/datetime'
import { getUniqueString } from '@/utils/random'

const getItemType = item => {
  return item.timer_id !== null
    ? ChronologySectionType.TimerTimeInterval
    : ChronologySectionType.HabitSection
}

const createChronologyTimerSection = ({
  item,
  timers
}): ChronologyTimerSection => {
  const itemType = ChronologySectionType.TimerTimeInterval
  const owner = timers.find(timer => timer.id === item.timer_id)

  return {
    id: item.id,
    type: itemType,
    editable: true,
    comment: item.comment,
    mood: item.mood,
    startDatetime: dayjs.unix(item.start_time).toDate(),
    endDatetime: dayjs.unix(item.end_time).toDate(),
    owner
  }
}

const createChronologyHabitSection = ({
  item,
  habits
}): ChronologyHabitSection => {
  const itemType = ChronologySectionType.HabitSection
  const owner = habits.find(habit => habit.id === item.habit_id)

  return {
    id: item.id,
    type: itemType,
    editable: false,
    value: item.value,
    startDatetime: dayjs.unix(item.date).toDate(),
    endDatetime: dayjs.unix(item.date).toDate(),
    owner
  }
}

const createChronologySection = ({
  item,
  timers,
  habits
}): ChronologySection => {
  const itemType = getItemType(item)

  const createCallbackByItemType = {
    [ChronologySectionType.TimerTimeInterval]: createChronologyTimerSection,
    [ChronologySectionType.HabitSection]: createChronologyHabitSection
  }

  return createCallbackByItemType[itemType]({ item, timers, habits })
}

const sortChronologySections = (sections: ChronologySection[]) => {
  return sections.sort(
    (a, b) =>
      a.startDatetime.getMilliseconds() - b.startDatetime.getMilliseconds()
  )
}

const checkIsEnoughTimeDifferenceToAddNewSection = (
  endDate: Date,
  startDate: Date
) => {
  const MIN_TIME_DIFFERENCE = 1000 * 60
  return endDate.getTime() - startDate.getTime() >= MIN_TIME_DIFFERENCE
}

const checkCanAddBeforeSection = ({
  currentSection,
  previousSection,
  nextSection,
  first
}: {
  currentSection: ChronologySection
  previousSection?: ChronologySection
  nextSection: ChronologySection
  first: boolean
}): boolean => {
  // TODO xx xx xx xx
  const canInsertSectionBetweenCurrentAndPrevious = previousSection
    ? checkIsEnoughTimeDifferenceToAddNewSection(
        previousSection.endDatetime,
        currentSection.startDatetime
      )
    : false
  const canInsertSectionBetweenFirstAndDayStart =
    first &&
    (nextSection
      ? checkIsEnoughTimeDifferenceToAddNewSection(
          nextSection.startDatetime,
          dayjs().startOf('date').toDate()
        )
      : true)

  return (
    canInsertSectionBetweenCurrentAndPrevious ||
    canInsertSectionBetweenFirstAndDayStart
  )
}
const checkCanAddAfterSection = ({
  currentSection,
  nextSection,
  last,
  currentTime
}: {
  currentSection: ChronologySection
  nextSection?: ChronologySection
  last: boolean
  currentTime: Date
}): boolean => {
  // TODO xx xx xx xx
  const canInsertSectionBetweenNextSectionAndCurrentTime =
    last &&
    checkIsEnoughTimeDifferenceToAddNewSection(
      currentTime,
      currentSection.startDatetime
    )

  const canInsertSectionBetweenCurrentAndNext = nextSection
    ? checkIsEnoughTimeDifferenceToAddNewSection(
        nextSection.startDatetime,
        currentSection.endDatetime
      )
    : false

  return (
    canInsertSectionBetweenCurrentAndNext ||
    canInsertSectionBetweenNextSectionAndCurrentTime
  )
}

const formDataToTimerSection = (
  formData: DaylogChronologyTimerFormData
): ChronologyTimerSection => {
  return {
    id: formData.id ?? getUniqueString(),
    startDatetime: minutesFromDateStartToDate(formData.startTime),
    endDatetime: minutesFromDateStartToDate(formData.endTime),
    comment: formData.comment ?? undefined,
    mood: formData.mood ?? undefined,
    owner: formData.owner || undefined,
    type: ChronologySectionType.TimerTimeInterval,
    editable: true
  }
}

const sectionToDaylogItem = (section: ChronologySection): DaylogItem => {
  const config = {
    [ChronologySectionType.TimerTimeInterval]: (): DaylogItem => {
      const timerSection: ChronologyTimerSection = section

      return {
        id: timerSection.id,
        start_time: dateToUnixSeconds(timerSection.startDatetime),
        end_time: dateToUnixSeconds(timerSection.endDatetime),
        comment: timerSection.comment,
        mood: timerSection.mood,
        timer_id: timerSection.owner?.id
      }
    },
    [ChronologySectionType.HabitSection]: (): DaylogItem => {
      const habitSection: ChronologyHabitSection = section

      return {
        id: habitSection.id,
        date: dateToUnixSeconds(habitSection.startDatetime),
        value: habitSection.value,
        habit_id: habitSection.owner?.id
      }
    }
  }

  return config[section.type]()
}

const sectionsToSectionsWithMeta = (
  sections: ChronologySection[],
  { currentTime }: { currentTime: Date }
): ChronologySectionWithMeta[] => {
  return sections.map((currentSection, sectionIndex) => {
    const previousSection = sections[sectionIndex - 1]
    const nextSection = sections[sectionIndex + 1]

    const first = sectionIndex === 0
    const last = sectionIndex === sections.length - 1

    const canAddBefore = checkCanAddBeforeSection({
      currentSection,
      previousSection,
      nextSection,
      first
    })
    const canAddAfter = checkCanAddAfterSection({
      currentSection,
      nextSection,
      last,
      currentTime
    })

    return {
      ...currentSection,
      meta: {
        canAddAfter,
        canAddBefore,
        first,
        last,
        previousSection,
        nextSection
      }
    }
  })
}

export const useDaylogChronology = ({
  items,
  timers,
  habits
}: {
  items: DaylogItem[]
  timers: Timer[]
  habits: Habit[]
}) => {
  const currentTime = ref(new Date())
  let currentTimeUpdateInterval

  onMounted(() => {
    currentTimeUpdateInterval = setInterval(() => {
      currentTime.value = new Date()
    }, 1000 * 60)
  })
  onUnmounted(() => clearInterval(currentTimeUpdateInterval))

  const chronologySections = computed<ChronologySection[]>(() => {
    return sortChronologySections(
      items.map(item => createChronologySection({ item, timers, habits }))
    )
  })

  const chronologyItemsWithMeta = computed<ChronologySectionWithMeta[]>(() =>
    sectionsToSectionsWithMeta(chronologySections.value, {
      currentTime: currentTime.value
    })
  )

  return {
    chronologyItemsWithMeta,
    formDataToTimerSection,
    sectionToDaylogItem
  }
}
