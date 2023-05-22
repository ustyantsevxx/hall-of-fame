<script>
import dayjs from 'dayjs'

export default {
  methods: {
    getDayjsInstance(unixTimestamp) {
      return dayjs.unix(unixTimestamp)
    },

    formatDate(date) {
      return this.getDayjsInstance(date).format('YYYY-MM-DD')
    },

    formatTime(date) {
      return this.getDayjsInstance(date).format('HH:mm:ss')
    },

    formatDateTime(date) {
      return this.getDayjsInstance(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },

  render() {
    const { $scopedSlots, formatDate, formatTime, formatDateTime } = this

    return $scopedSlots.default({
      formatDate,
      formatTime,
      formatDateTime
    })
  }
}
</script>
