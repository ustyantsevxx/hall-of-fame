import { DaylogChronologyTimerFormData } from '@/components/DaylogChronology.types'

export type DaylogChronologyFormTimerEmits = {
  (e: 'save', v: DaylogChronologyTimerFormData)
  (e: 'remove')
  (e: 'close')
}
