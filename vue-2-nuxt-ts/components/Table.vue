<template>
  <div class="relative">
    <Transition name="fade">
      <span
        v-if="loading"
        class="absolute inset-0 bg-white bg-opacity-70"
      ></span>
    </Transition>

    <table :class="tableClass">
      <thead>
        <tr class="align-bottom" :class="headRowClass">
          <th
            v-for="(field, fieldIndex) in fields"
            :key="fieldIndex"
            class="pr-20 pb-24 text-description font-normal text-left text-gray"
            :class="getThClassList(field)"
            :style="getInlineStyles(field)"
          >
            <span :style="getInlineStyles(field)">{{ field.title }}</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="!hideBodyBorderRow">
          <td
            :colspan="fields.length"
            class="pb-13 border-t border-gray-100"
          ></td>
        </tr>

        <template v-for="(item, itemIndex) in items">
          <slot name="body-row" :item="item" :index="itemIndex">
            <tr :key="itemIndex" class="align-top" :class="bodyRowClass">
              <td
                v-for="(field, fieldIndex) in fields"
                :key="fieldIndex"
                class="py-10 pr-20"
                :class="getTdClassList(field)"
                :style="getInlineStyles(field)"
              >
                <slot
                  :name="`cell(${field.key})`"
                  :value="tryGetFieldValue(item, field)"
                  :item="item"
                >
                  {{ tryGetFieldValue(item, field) }}
                </slot>
              </td>
            </tr>
          </slot>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

export type XTableField = {
  key: string
  title?: string
  class?: string
  thClass?: string
  tdClass?: string
  formatter?: (item: any) => any
  style?: Partial<CSSStyleDeclaration>
  width?: string | number
}

@Component
export default class Table extends Vue {
  @Prop({ type: String, default: undefined }) headRowClass!: string
  @Prop({ type: Array, required: true }) fields!: XTableField[]
  @Prop({ type: Array, required: true }) items!: any[]
  @Prop({ type: Boolean, default: false }) hideBodyBorderRow!: boolean
  @Prop({ type: Boolean, default: false }) loading!: boolean
  @Prop({ type: Boolean, default: false }) useStrictColumnWidth!: boolean
  @Prop({ type: String, default: '' }) bodyRowClass!: string
  @Prop({ type: String, default: 'w-full text-description' })
  tableClass!: string

  getInlineStyles(field: XTableField) {
    const width =
      typeof field.width === 'number' ? `${field.width}px` : field.width
    return {
      width,
      maxWidth: this.useStrictColumnWidth ? width : undefined,
      minWidth: this.useStrictColumnWidth ? width : undefined,
      ...field.style
    }
  }

  getThClassList(field: XTableField) {
    return [field.class, field.thClass].join(' ')
  }

  getTdClassList(field: XTableField) {
    return [field.class, field.tdClass].join(' ')
  }

  tryGetFieldValue(item, field: XTableField) {
    let fieldValue

    if (field.formatter) {
      fieldValue = field.formatter(item)
    } else if (field.key in item) {
      fieldValue = item[field.key]
    }

    const fieldValueDefined = fieldValue !== null && fieldValue !== undefined

    return fieldValueDefined ? fieldValue : '—'
  }
}
</script>

<style scoped>
td:last-child,
th:last-child {
  padding-right: 0 !important;
}
</style>
