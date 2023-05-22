export type TaskFormDatePickerModalSlotProps = {
  selectDate: (date: Date) => void
  selectTime: (time: number) => void
  date: Date | null
  time: number | null
}
