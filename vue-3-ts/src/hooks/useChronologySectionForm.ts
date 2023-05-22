import dayjs from 'dayjs'

import { ChronologySectionWithMeta } from '@/components/DaylogChronology.types'

export const useChronologySectionForm = (props: {
  section: ChronologySectionWithMeta | null
}) => {
  const getInitialStartDate = (): Date =>
    props.section?.endDatetime || dayjs().startOf('date').toDate()
  const getInitialEndDate = (): Date =>
    props.section?.meta.nextSection?.startDatetime || new Date()

  return {
    getInitialStartDate,
    getInitialEndDate
  }
}
