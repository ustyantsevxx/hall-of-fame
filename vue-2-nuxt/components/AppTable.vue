<template>
  <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
  <div class="flex grow flex-col">
    <table class="w-full" :aria-colcount="fields.length">
      <thead class="sticky top-0 z-10">
        <tr :class="headRowClass">
          <th
            v-for="(field, fieldIndex) in fields"
            :key="fieldIndex"
            :aria-colindex="fieldIndex + 1"
            class="h-64 bg-light-20 pl-24 pr-4 font-normal text-paragraph"
            :class="getThClassList(field)"
            :style="getInlineStyles(field)"
          >
            <div
              class="flex h-full w-max select-none items-center space-x-8 rounded-4 outline-none ring-offset-4 ring-offset-light-20"
              :class="[
                field.rightAligned ? 'ml-auto text-right' : 'text-left',
                {
                  'cursor-pointer': checkIfSortableAndNotCustomSort(field),
                  'opacity-0': loading,
                  'transition-opacity': !transitionsDisabled
                }
              ]"
              :tabindex="checkIfSortableAndNotCustomSort(field) ? 0 : -1"
              @click="() => sortIfSortable(field)"
              @keydown.space.enter.prevent="() => sortIfSortable(field)"
            >
              <div>
                <slot
                  :name="`head(${field.key})`"
                  :field="field"
                  :sort="setSort"
                  :sortedBy="sort.key"
                  :sortedAsc="sort.asc"
                >
                  {{ field.title }}
                </slot>
              </div>

              <figure
                v-if="checkIfSortableAndNotCustomSort(field)"
                class="x-arrow transition-transform"
                :class="{
                  'x-arrow-active': sort.key === field.sortKey,
                  'rotate-180': sort.key === field.sortKey && sort.asc
                }"
              ></figure>
            </div>
          </th>
        </tr>
      </thead>

      <AppTransition :disabled="transitionsDisabled" group tag="tbody">
        <tr
          v-for="(item, itemIndex) in items"
          :key="itemIndex"
          v-tooltip="getItemRowTooltip(item)"
          class="hover:bg-light-10"
          :class="[
            rowClass,
            getItemRowClass(item),
            {
              'transition-colors': !transitionsDisabled
            }
          ]"
          @click="$emit('row-click', item)"
        >
          <template v-for="(field, fieldIndex) in fields">
            <td
              v-if="checkIfTdShouldBeVisible(item, field)"
              :key="fieldIndex"
              :aria-colindex="fieldIndex + 1"
              class="app-table-cell border pt-22 pb-23 pl-24 text-[13px] leading-[14px]"
              :class="getTdClassList(item, field)"
              :style="getInlineStyles(field)"
              :rowspan="getRowSpan(item, field)"
              :colspan="getColSpan(item, field)"
              @click="handleCellClick(item, field)"
            >
              <div
                :class="{
                  'ml-auto w-max text-right': field.rightAligned
                }"
              >
                <slot
                  :name="`cell(${field.key})`"
                  :value="tryGetFieldValue(item, field)"
                  :item="item"
                  :definedOrHyphen="definedOrHyphen"
                >
                  {{ tryGetFieldValue(item, field) }}
                </slot>
              </div>
            </td>
          </template>
        </tr>
      </AppTransition>
    </table>

    <div
      v-if="items.length === 0 && !loading"
      class="flex grow items-center justify-center"
    >
      {{ emptyText }}
    </div>
  </div>
</template>

<script>
import AppTransition from '~/components/AppTransition.vue'
import { notUndefinedOrNull } from '~/logic/utils'

export default {
  components: { AppTransition },
  props: {
    fields: { type: Array, default: () => [] },
    items: { type: Array, default: () => [] },
    sortDesc: { type: Boolean, default: false },
    sortBy: { type: String, default: '' },
    rowClass: { type: String, default: undefined },
    cellClass: { type: String, default: undefined },
    rowClassFn: { type: Function, default: undefined },
    rowTooltipFn: { type: Function, default: undefined },
    transitionsDisabled: { type: Boolean, default: false },
    headRowClass: { type: String, default: '' },
    noHyphenInEmptyCell: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    emptyText: {
      type: String,
      default() {
        return this.$t('no-items')
      }
    }
  },

  data() {
    return {
      sort: {
        key: this.sortBy,
        asc: !this.sortDesc
      }
    }
  },

  methods: {
    getInlineStyles(field) {
      const width =
        typeof field.width === 'number' ? `${field.width}px` : field.width
      return {
        maxWidth: width,
        width,
        ...field.style
      }
    },

    getThClassList(field) {
      return [field.class, field.thClass]
    },

    getFieldTdClass(item, field) {
      switch (typeof field.tdClass) {
        case 'string':
          return field.tdClass
        case 'function':
          return field.tdClass(item)
        default:
      }
    },

    getTdClassList(item, field) {
      const fieldTdClass = this.getFieldTdClass(item, field)
      return [field.class, fieldTdClass, this.cellClass]
    },

    tryGetFieldValue(item, field) {
      let fieldValue

      if (field.formatter) {
        fieldValue = field.formatter(item)
      } else if (field.key in item) {
        fieldValue = item[field.key]
      }

      if (notUndefinedOrNull(fieldValue)) {
        return fieldValue
      } else if (!this.noHyphenInEmptyCell) {
        return '—'
      }
    },

    sortIfSortable(field) {
      if (this.checkIfSortableAndNotCustomSort(field)) {
        this.setSort(field.sortKey)
      }
    },

    setSort(key) {
      this.sort = {
        key,
        asc: this.sort && this.sort.key === key ? !this.sort.asc : false
      }
      this.$emit('sort-changed', this.sort)
    },

    checkIfSortableAndNotCustomSort(field) {
      return field.sortable && !field.customSortHandler && field.sortKey
    },

    getItemRowClass(item) {
      return this.rowClassFn?.(item)
    },

    getItemRowTooltip(item) {
      return this.rowTooltipFn?.(item)
    },

    definedOrHyphen(value) {
      return notUndefinedOrNull(value) ? value : '—'
    },

    getColSpan(item, field) {
      switch (typeof field.colspan) {
        case 'number':
          return field.colspan
        case 'function':
          return field.colspan(item)
        default:
          return 1
      }
    },

    getRowSpan(item, field) {
      switch (typeof field.rowspan) {
        case 'number':
          return field.rowspan
        case 'function':
          return field.rowspan(item)
        default:
          return 1
      }
    },

    checkIfTdShouldBeVisible(item, field) {
      return !field.hiddenIf?.(item)
    },

    handleCellClick(item, field) {
      field.onCellClick?.(item)
    }
  }
}
</script>

<style scoped>
.x-arrow {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgba(255, 255, 255, 0.4);
}

.x-arrow-active {
  border-top: 4px solid white;
}

.app-table-cell {
  border-bottom-color: theme('colors.light.20') !important;
}
</style>
