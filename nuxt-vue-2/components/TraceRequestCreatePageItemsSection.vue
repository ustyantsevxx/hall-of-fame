<template>
  <LayoutSection class="flex flex-col overflow-hidden">
    <div class="flex space-x-12 p-32 pb-16">
      <h2 class="text-h1">{{ $t('items') }}</h2>

      <p
        class="text-white/60 text-h1"
        :aria-label="$t('items-selected')"
        :aria-valuenow="selectedItemsCount"
      >
        {{ selectedItemsCount }}
      </p>
    </div>

    <CustomScrollbarWrapper class="h-[calc(100%-81px)] grow pt-8 pb-32 pl-32">
      <AppSelect
        v-model="msm"
        :options="msms"
        label-key="serial"
        :placeholder="$t('select-battery')"
        style="width: 220px"
      />

      <AppTransition>
        <div v-if="msm" class="ml-12">
          <div
            v-for="sscIndex in sscs"
            :key="sscIndex"
            class="expand-base border-l pt-12"
            :class="{
              'border-gray-border': sscIndex !== sscs.length - 1
            }"
          >
            <div class="ml-16">
              <CheckboxListExpandable
                :key="sscIndex"
                v-model="selectedModules"
                button-container-class="expand-container"
                offset-class="w-30"
                :value-array="getModuleValueArray(sscIndex)"
                @array-added="selectSscIfModuleSelected"
              >
                <template #expand-button-label>
                  <AppCheckbox
                    class="flex items-center text-main"
                    check-color="#000"
                    bg-color="#fff"
                    :array.sync="selectedSscIndexes"
                    :array-value="sscIndex"
                    @update:array="
                      newSelectedIndexes =>
                        unselectAllModulesIfSscUnselected(
                          newSelectedIndexes,
                          sscIndex
                        )
                    "
                  >
                    SSC{{ sscIndex + 1 }}
                  </AppCheckbox>
                </template>

                <template #checkbox-label="{ item }">
                  M{{ item.moduleIndex + 1 }}
                </template>
              </CheckboxListExpandable>
            </div>
          </div>
        </div>
      </AppTransition>
    </CustomScrollbarWrapper>
  </LayoutSection>
</template>

<script>
import { range } from 'lodash-es'

import AppCheckbox from '~/components/AppCheckbox.vue'
import AppSelect from '~/components/AppSelect.vue'
import AppTransition from '~/components/AppTransition.vue'
import CheckboxListExpandable from '~/components/CheckboxListExpandable.vue'
import CustomScrollbarWrapper from '~/components/CustomScrollbarWrapper.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import { parseNumberOrNull } from '~/logic/utils'

export default {
  components: {
    CheckboxListExpandable,
    LayoutSection,
    AppCheckbox,
    AppTransition,
    CustomScrollbarWrapper,
    AppSelect
  },

  computed: {
    msm: {
      get() {
        return this.$store.state.newTraceRequest.data.msm
      },

      set(msm) {
        this.$store.commit('newTraceRequest/SET_MSM', msm)
      }
    },

    selectedSscIndexes: {
      get() {
        return this.$store.state.newTraceRequest.data.selectedSscIndexes
      },

      set(value) {
        this.$store.commit('newTraceRequest/SET_SELECTED_SSC_IDS', value)
      }
    },

    selectedModules: {
      get() {
        return this.$store.state.newTraceRequest.data.selectedModules
      },

      set(value) {
        this.$store.commit('newTraceRequest/SET_SELECTED_MODULES', value)
      }
    },

    msms() {
      return this.$store.state.newTraceRequest.msms
    },

    selectedItemsCount() {
      return this.$store.getters['newTraceRequest/selectedItemsCount']
    },

    sscs() {
      return range(0, this.msm.sscs_count)
    }
  },

  mounted() {
    const msmId = parseNumberOrNull(this.$route.query.msmId)

    if (msmId) {
      this.msm = this.msms.find(msm => msm.id === msmId)
      this.$router.replace({ query: { msmId: undefined } })
    }
  },

  methods: {
    getModuleValueArray(sscIndex) {
      return range(0, this.msm.modules_per_ssc_count).map(moduleIndex => ({
        sscIndex,
        moduleIndex
      }))
    },

    selectSscIfModuleSelected(module) {
      if (!this.selectedSscIndexes.includes(module.sscIndex)) {
        this.selectedSscIndexes = [...this.selectedSscIndexes, module.sscIndex]
      }
    },

    unselectAllModulesIfSscUnselected(newSelectedIndexes, sscIndex) {
      if (!newSelectedIndexes.includes(sscIndex)) {
        this.selectedModules = this.selectedModules.filter(
          module => module.sscIndex !== sscIndex
        )
      }
    }
  }
}
</script>

<style>
.expand-base:not(:last-child) .expand-container::before {
  @apply bg-gray-border;
  content: '';
  height: 1px;
  width: 16px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
}

.expand-base:last-child .expand-container::before {
  @apply border-gray-border;
  width: 18px;
  content: '';
  height: 24px;
  position: absolute;
  top: -13px;
  left: 1px;
  border-radius: 0 6px 0 6px;
  border-width: 1px;
  border-style: solid;
  border-top-color: transparent;
  border-right-color: transparent;
  transform: translateX(-100%);
}
</style>
