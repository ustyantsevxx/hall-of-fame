<template>
  <LayoutSection class="flex flex-col overflow-hidden">
    <div class="flex space-x-12 p-32 pb-16">
      <h2 class="text-h1">{{ $t('values') }}</h2>

      <p class="text-white/60 text-h1">
        {{ selectedValues.length }}
      </p>
    </div>

    <CustomScrollbarWrapper class="h-[calc(100%-81px)]">
      <div class="space-y-20 border-t pt-12 pb-32 pl-32 transition-colors">
        <template v-for="(group, i) in valueGroups">
          <CheckboxListExpandable
            v-if="group.activeIf"
            :key="i"
            v-model="selectedValues"
            :value-array="group.values"
          >
            <template #expand-button-label>{{ group.label }}</template>

            <template #checkbox-label="{ item }">
              <p>{{ item.name }}</p>
              <p class="mt-4 text-white/60">{{ item.description }}</p>
            </template>
          </CheckboxListExpandable>
        </template>
      </div>
    </CustomScrollbarWrapper>
  </LayoutSection>
</template>

<script>
import CheckboxListExpandable from '~/components/CheckboxListExpandable.vue'
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import {
  CREATE_BCC_VALUES,
  CREATE_MSM_VALUES,
  CREATE_SSC_VALUES,
  CREATE_T_VALUES
} from '~/logic/modules/trace-requests/trace-requests.constants'

export default {
  components: {
    CheckboxListExpandable,
    LayoutSection,
    CustomScrollbarWrapper
  },

  computed: {
    selectedValues: {
      get() {
        return this.$store.state.newTraceRequest.data.selectedValues
      },

      set(value) {
        this.$store.commit('newTraceRequest/SET_SELECTED_VALUES', value)
      }
    },

    selectedMsmId() {
      return this.$store.state.newTraceRequest.data.msmId
    },

    selectedSscIndexesCount() {
      return this.$store.state.newTraceRequest.data.selectedSscIndexes.length
    },

    selectedModulesCount() {
      return this.$store.state.newTraceRequest.data.selectedModules.length
    },

    valueGroups() {
      return [
        this.msmValueGroup,
        this.sscValueGroup,
        this.bccValueGroup,
        this.tValueGroup
      ]
    },

    msmValueGroup() {
      return {
        activeIf: this.selectedMsmId,
        values: CREATE_MSM_VALUES,
        label: 'MSM'
      }
    },

    sscValueGroup() {
      return {
        activeIf: this.selectedSscIndexesCount > 0,
        values: CREATE_SSC_VALUES,
        label: 'SSC'
      }
    },

    bccValueGroup() {
      return {
        activeIf: this.selectedModulesCount > 0,
        values: CREATE_BCC_VALUES,
        label: 'BCC'
      }
    },

    tValueGroup() {
      return {
        activeIf: this.selectedModulesCount > 0,
        values: CREATE_T_VALUES,
        label: 'TEMS / CELLS'
      }
    }
  },

  watch: {
    msmValueGroup: 'removeAllGroupSelectedValuesIfNotActive',
    sscValueGroup: 'removeAllGroupSelectedValuesIfNotActive',
    bccValueGroup: 'removeAllGroupSelectedValuesIfNotActive',
    tValueGroup: 'removeAllGroupSelectedValuesIfNotActive'
  },

  methods: {
    removeAllGroupSelectedValuesIfNotActive(group) {
      if (!group.activeIf) {
        const selectedValuesWithoutGroupValues = this.selectedValues.filter(
          v => !group.values.includes(v)
        )

        this.selectedValues = selectedValuesWithoutGroupValues
      }
    }
  }
}
</script>
