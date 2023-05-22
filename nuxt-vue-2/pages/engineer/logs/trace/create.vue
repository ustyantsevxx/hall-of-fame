<template>
  <div class="flex grow flex-col overflow-hidden">
    <LinkBack class="ml-10" :to="previousPath" />

    <LayoutSection
      class="mt-10 flex items-center justify-between pl-28 pr-26 pb-17 pt-16"
    >
      <h1 class="pt-4 font-avenir text-h1">
        {{ $t('create-trace-request-1') }}
      </h1>

      <div class="ml-48 flex space-x-14">
        <AppTransition>
          <AppButton
            v-if="anyDataChanged"
            variant="secondary"
            @click="resetAll"
          >
            {{ $t('reset-all-0') }}
          </AppButton>
        </AppTransition>

        <AppButton
          :disabled="!createPermitted"
          :title="
            !createPermitted &&
            $t('requested-params-are-incorrect-or-complexity-is-too-high')
          "
          @click="tryCreateTraceRequest"
        >
          {{ $t('create-request') }}
        </AppButton>
      </div>
    </LayoutSection>

    <div class="mt-12 grid grow grid-cols-3 gap-x-12 overflow-hidden">
      <TraceRequestCreatePageItemsSection />
      <TraceRequestCreatePageValuesSection />
      <TraceRequestCreatePageDataSection
        ref="dataSection"
        :valid.sync="dataSectionInvalid"
        :date-invalid.sync="dateLaterThanNow"
      />
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

import AppButton from '~/components/AppButton.vue'
import AppTransition from '~/components/AppTransition.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import LinkBack from '~/components/LinkBack.vue'
import TraceRequestCreatePageDataSection from '~/components/TraceRequestCreatePageDataSection.vue'
import TraceRequestCreatePageItemsSection from '~/components/TraceRequestCreatePageItemsSection.vue'
import TraceRequestCreatePageValuesSection from '~/components/TraceRequestCreatePageValuesSection.vue'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'

export default {
  components: {
    LinkBack,
    AppButton,
    LayoutSection,
    TraceRequestCreatePageItemsSection,
    TraceRequestCreatePageValuesSection,
    TraceRequestCreatePageDataSection,
    AppTransition
  },

  async asyncData({ store }) {
    await store.dispatch('newTraceRequest/fetchMsms')
  },

  data() {
    return {
      dataSectionInvalid: true,
      dateLaterThanNow: false
    }
  },

  head() {
    return {
      title: this.$t('create-trace-request-0')
    }
  },

  computed: {
    anyDataChanged() {
      return this.$store.getters['newTraceRequest/anyDataChanged']
    },

    previousPath() {
      return (
        TraceRequestsService.getComeToCreateTraceRequestFormFrom() ||
        '/logs/trace'
      )
    },

    selectedValues() {
      return this.$store.state.newTraceRequest.data.selectedValues
    },

    complexityIsTooHigh() {
      return this.$store.getters['newTraceRequest/complexityIsTooHigh']
    },

    createPermitted() {
      return (
        !this.dataSectionInvalid &&
        this.selectedValues.length > 0 &&
        !this.complexityIsTooHigh &&
        !this.dateLaterThanNow
      )
    },

    fromAsUnix() {
      return this.$store.getters['newTraceRequest/fromAsUnix']
    }
  },

  beforeDestroy() {
    this.resetAll()
  },

  methods: {
    resetAll() {
      this.$store.commit('newTraceRequest/RESET_REQUEST_DATA')
      this.$refs.dataSection.resetValidation()
    },

    async tryCreateTraceRequest() {
      if (this.fromAsUnix > dayjs().unix()) {
        this.dateLaterThanNow = true
        return
      }

      const { success } = await this.$store.dispatch(
        'newTraceRequest/createTraceRequest'
      )

      if (success) {
        await this.$router.push({ path: this.previousPath })
      }
    }
  }
}
</script>
