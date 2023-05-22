<template>
  <AppButton
    :title="buttonTitle"
    :to="traceRequestCreatePageLink"
    @click.native="savePreviousLocation"
  >
    {{ $t('create-trace-request') }}
  </AppButton>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'

export default {
  components: {
    AppButton
  },

  props: {
    forMsmId: { type: [Number, String], default: undefined }
  },

  computed: {
    traceRequestCreatePageLink() {
      return {
        path: '/logs/trace/create',
        query: {
          msmId: this.forMsmId
        }
      }
    },

    buttonTitle() {
      return this.forMsmId
        ? this.$t('create-trace-request-for-this-battery')
        : this.$t('create-trace-request-2')
    }
  },

  methods: {
    savePreviousLocation() {
      TraceRequestsService.saveComeToCreateTraceRequestFormFrom(
        this.$route.fullPath
      )
    }
  }
}
</script>
