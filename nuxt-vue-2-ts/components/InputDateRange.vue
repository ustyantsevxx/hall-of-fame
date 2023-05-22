<template>
  <div
    class="flex flex-col border-b transition-colors duration-150 ease-in-out"
    :class="{
      'border-gray-100 ': !opened,
      'border-blue': opened
    }"
  >
    <p class="text-description text-gray">{{ label }}</p>
    <div class="flex relative flex-grow mt-3">
      <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
      <label class="flex-grow">
        <Datepicker
          id="datepicker"
          v-model="dates"
          class="flex-grow"
          :class="{
            'time-selection-active': timePanelVisible
          }"
          range
          :append-to-body="false"
          title-format="DD.MM.YYYY"
          time-title-format="DD.MM.YYYY"
          :clearable="false"
          :editable="false"
          range-separator="—"
          type="datetime"
          :format="format"
          :lang="locale"
          :default-value="previousMonthDate"
          :placeholder="placeholder"
          :show-time-panel="timePanelVisible"
          @change="handleChange"
          @open="opened = true"
          @close="opened = false"
        >
          <template v-if="editTime" #footer>
            <div class="flex justify-end py-10 px-15">
              <Button link @click="toggleTimePanelVisible">
                <span class="font-normal">
                  {{ timePanelVisible ? 'Выбрать дату' : 'Выбрать время' }}
                </span>
              </Button>
            </div>
          </template>
        </Datepicker>
      </label>
      <button class="absolute top-10 right-0">
        <DropdownArrowSVG
          class="mx-10 transition-transform duration-150 ease-in-out transform cursor-pointer"
          :class="{ 'rotate-180': opened }"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue, Watch } from 'nuxt-property-decorator'
import Datepicker from 'vue2-datepicker'

import DropdownArrowSVG from '~/assets/svg/dropdown-arrow.svg'
import Button from '~/components/Button.vue'
import { IDateRange } from '~/logic/types/dates'
import { xDayjs } from '~/logic/utils/datetime'

const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

@Component({
  components: {
    Button,
    DropdownArrowSVG,
    Datepicker
  }
})
export default class InputDateRange extends Vue {
  @Model('change', { type: Object }) value!: IDateRange

  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: 'DD.MM.YYYY' }) format!: string
  @Prop({ type: Boolean, default: false }) editTime!: boolean

  dates?: Date[] = []

  opened = false

  timePanelVisible = false

  locale = {
    formatLocale: {
      months,
      monthsShort: months,
      weekdays: [
        'воскресенье',
        'понедельник',
        'вторник',
        'среда',
        'четверг',
        'пятница',
        'суббота'
      ],
      weekdaysShort: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
      weekdaysMin: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
      firstDayOfWeek: 1,
      firstWeekContainsDate: 1
    }
  }

  @Watch('opened')
  onOpenedChanged() {
    this.timePanelVisible = false
  }

  get previousMonthDate() {
    // used to open range-calendar with current month on the right side
    return xDayjs().subtract(1, 'months').toDate()
  }

  emitChange(value: IDateRange) {
    this.$emit('change', value)
    this.dates = [value.startDate, value.endDate]
  }

  emitNewDatesWithDefaultTime() {
    this.emitChange({
      startDate: xDayjs(this.dates?.[0]).startOf('days').toDate(),
      endDate: xDayjs(this.dates?.[1]).endOf('days').toDate()
    })
  }

  emitNewTime() {
    this.emitChange({
      startDate: this.dates?.[0],
      endDate: this.dates?.[1]
    })
  }

  handleChange() {
    this.timePanelVisible
      ? this.emitNewTime()
      : this.emitNewDatesWithDefaultTime()
  }

  toggleTimePanelVisible() {
    this.timePanelVisible = !this.timePanelVisible
  }
}
</script>

<style>
/*datepicker plugin styles override*/

.mx-datepicker-main {
  @apply bg-white select-none;
  top: 73px !important;
  left: unset !important;
  right: 0;
  z-index: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.mx-datepicker {
  @apply relative;
}

.mx-range-wrapper {
  @apply flex;
}

.mx-range-wrapper .mx-calendar {
  @apply flex flex-col p-20;
  width: 330px;
}

.mx-range-wrapper .mx-calendar:first-child {
  @apply border-r border-gray-100;
}

.mx-zoom-in-down-enter-active,
.mx-zoom-in-down-leave-active {
  @apply transition  opacity-100 transform-none;
}

.mx-zoom-in-down-enter,
.mx-zoom-in-down-enter-from,
.mx-zoom-in-down-leave-to {
  @apply opacity-0 transform-none;
}

.mx-datepicker-main .mx-calendar-content {
  @apply flex-grow;
}

.mx-datepicker-main table {
  @apply w-full h-full;
}

.mx-datepicker-main thead th {
  @apply text-date text-gray-300 font-normal;
  width: 40px !important;
  height: 40px !important;
}

.mx-datepicker-main td {
  @apply text-center cursor-pointer rounded-full transition-colors duration-200;
  width: 40px !important;
  height: 40px;
}

.mx-table td.active {
  @apply text-blue;
}

.mx-table-date td.active {
  @apply bg-blue text-white;
}

.mx-table-date td.in-range {
  @apply text-blue;
}

.mx-datepicker-main td.not-current-month:not(.in-range) {
  @apply text-gray-300 pointer-events-none;
}

.mx-calendar-header {
  @apply flex items-center mb-10 px-10;
}

.mx-btn-icon-double-right,
.mx-btn-icon-double-left {
  @apply hidden;
}

.mx-calendar-header-label {
  @apply space-x-5 flex-1 text-center text-blue;
}

.mx-btn-icon-right {
  @apply order-1;
}

.mx-calendar-header-label .mx-btn {
  width: auto;
  height: auto;
}

.mx-btn-icon-right,
.mx-btn-icon-left {
  height: 40px;
}

.mx-btn-icon-left:before {
  content: url('~/assets/svg/calendar-left-arrow.svg?inline');
}

.mx-btn-icon-right:before {
  content: url('~/assets/svg/calendar-right-arrow.svg?inline');
}

.mx-icon-calendar {
  @apply hidden;
}

.mx-input {
  @apply cursor-pointer pb-20 w-full flex-grow text-subtitle text-blue outline-none placeholder-blue;
}

.time-selection-active .mx-calendar-panel-date {
  display: none !important;
}

.mx-calendar-time {
  width: 100%;
  height: 100%;
}

.mx-time {
  width: 240px;
  @apply bg-white;
}

.mx-range-wrapper .mx-time {
  @apply border-r border-gray-100;
}

.mx-time-header {
  @apply flex justify-center py-14 border-b border-gray-100;
}

.mx-time-header-title {
  @apply text-blue;
}

.mx-time-content {
  @apply overflow-hidden mb-15;
  height: 330px;
}

.mx-time-columns {
  @apply flex w-full h-full overflow-hidden;
}

.mx-time-column {
  @apply flex-grow relative text-center  border-l border-gray-100;
}

.mx-time-column:first-child {
  @apply border-l-0;
}

.mx-scrollbar {
  @apply h-full;
}

.mx-scrollbar-wrap {
  @apply overflow-x-hidden overflow-y-auto h-full py-10;
}

.mx-time-column .mx-time-list {
  @apply flex flex-col items-center list-none p-0 m-0;
}

.mx-time-column .mx-time-item {
  @apply flex items-center justify-center cursor-pointer rounded-full transition-colors duration-200 py-5;
  width: 40px !important;
  height: 40px;
}

.mx-time-column .mx-time-item.active {
  @apply bg-blue text-white;
}
</style>
