<template>
  <div class="grid grid-cols-2 gap-x-30">
    <section>
      <InputSelect
        v-model.number="dateFilterModeId"
        label="xx xx xx"
        title="xx xx"
        :options="dateFilterModeOptions"
        @change="changeDateFilterMode"
      />
    </section>

    <Transition name="fade">
      <section v-if="rangeModeSelected">
        <InputDateRange
          v-model="filters.dateRange"
          label="xx xx xx"
          placeholder="xx xx"
        />
      </section>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, mixins, Prop } from 'nuxt-property-decorator'

import InputDateRange from '~/components/InputDateRange.vue'
import InputSelect from '~/components/InputSelect.vue'
import { DateFilterMixin } from '~/mixins/date-filter-mixin'

@Component({
  components: { InputSelect, InputDateRange }
})
export default class LegalFundsPageFilters extends mixins(DateFilterMixin) {
  @Prop({ type: Object, required: true }) defaultDateRange!: any

  dateFilterModeId = this.defaultDateRange.id
}
</script>
