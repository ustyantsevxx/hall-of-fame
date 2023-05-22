import dayjs from 'dayjs'
import FileSaver from 'file-saver'

export const downloadLogCSVFile = (logName, data) => {
  FileSaver.saveAs(
    new Blob([data]),
    `${logName}_${dayjs().format('YYYY_MM_DD_HH_mm_ss')}.csv`
  )
}
