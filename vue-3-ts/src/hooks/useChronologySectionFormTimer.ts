import dayjs from 'dayjs'
import { onMounted, reactive, Ref, ref } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import {
  ChronologySectionWithMeta,
  ChronologyTimerSection,
  DaylogChronologyTimerFormData
} from '@/components/DaylogChronology.types'
import { DaylogChronologyFormTimerEmits } from '@/components/DaylogChronologyFormTimer.types'
import { ModalConfirmationComponent } from '@/components/ModalConfirmation.types'
import { ModalConfirmationDeleteComponent } from '@/components/ModalConfirmationDelete.types'
import { minutesFromDateStart } from '@/utils/datetime'

export const useChronologySectionFormTimer = ({
  props,
  emit,
  confirmationModalRef,
  confirmationDeleteModalRef
}: {
  props: { section: ChronologySectionWithMeta | null; timerOptions: Timer[] }
  emit: DaylogChronologyFormTimerEmits
  confirmationModalRef: Ref<ModalConfirmationComponent | undefined>
  confirmationDeleteModalRef: Ref<ModalConfirmationDeleteComponent | undefined>
}) => {
  const minTime = minutesFromDateStart(dayjs().startOf('date').toDate())
  const maxTime = minutesFromDateStart(new Date())

  const overlappingConfirmed = ref(false)

  const formData = reactive<DaylogChronologyTimerFormData>({
    id: null,
    owner: null,
    startTime: 0,
    endTime: 0,
    mood: null,
    comment: ''
  })

  const populateTimerFormDataWithInitialValues = () => {
    const initialTimerFormData =
      props.section as unknown as ChronologyTimerSection
    formData.owner = initialTimerFormData.owner || null
    formData.comment = initialTimerFormData.comment || ''
    formData.mood = initialTimerFormData.mood || null
    formData.id = initialTimerFormData.id
    formData.startTime = minutesFromDateStart(
      initialTimerFormData.startDatetime
    )
    formData.endTime = minutesFromDateStart(initialTimerFormData.endDatetime)
  }

  const handleTimerChange = (timerId: string) => {
    const selectedTimer = props.timerOptions.find(timer => timer.id === timerId)
    if (selectedTimer) {
      formData.owner = selectedTimer
    }
  }

  const showConfirmSectionOverlappingModal = () => {
    return confirmationModalRef.value?.show() || false
  }

  const tryToConfirmOverlapping = async () => {
    if (!overlappingConfirmed.value) {
      overlappingConfirmed.value = await showConfirmSectionOverlappingModal()
    }

    return overlappingConfirmed.value
  }

  const handleTimeStartChange = async (value: number) => {
    const newValueOverlapPreviousSection =
      props.section?.meta.previousSection &&
      minutesFromDateStart(props.section.meta.previousSection.endDatetime) >
        value

    const canUpdateTime = newValueOverlapPreviousSection
      ? await tryToConfirmOverlapping()
      : true

    if (!canUpdateTime) {
      return
    }

    formData.startTime = value
  }
  const handleTimeEndChange = async (value: number) => {
    const newValueOverlapNextSection =
      props.section?.meta.nextSection &&
      minutesFromDateStart(props.section.meta.nextSection.startDatetime) < value

    const canUpdateTime = newValueOverlapNextSection
      ? await tryToConfirmOverlapping()
      : true

    if (!canUpdateTime) {
      return
    }

    formData.endTime = value
  }

  const save = () => {
    const submittedFormData = { ...formData }
    emit('save', submittedFormData)
  }

  const remove = async () => {
    const removingConfirmed =
      (await confirmationDeleteModalRef.value?.show()) || false

    if (removingConfirmed) {
      emit('remove')
    }
  }

  onMounted(() => {
    if (props.section) {
      populateTimerFormDataWithInitialValues()
    }
  })

  return {
    formData,
    minTime,
    maxTime,
    save,
    remove,
    handleTimerChange,
    handleTimeEndChange,
    handleTimeStartChange
  }
}
