<template>
  <div class="mr-14 flex items-center justify-end space-x-8 pr-4">
    <AppButton
      style="width: 200px"
      size="sm"
      :loading="primaryActionExecuting"
      :to="hrefIfActionIsLink"
      @click="executePrimaryAction"
    >
      {{ primaryActionButtonTitle }}
    </AppButton>

    <TableActionsPopover
      :actions="secondaryActions"
      :callback-data="traceRequest"
    />

    <ModalConfirm
      ref="deleteConfirmationModal"
      :title="$t('confirm-delete')"
      :subtitle="$t('you-really-want-to-delete-your-request')"
      :confirm-text="$t('delete-request')"
    />
  </div>
</template>

<script>
import AppButton from '~/components/AppButton.vue'
import ModalConfirm from '~/components/ModalConfirm.vue'
import TableActionsPopover, {
  TABLE_ACTION_TYPES
} from '~/components/TableActionsPopover.vue'
import {
  TRACE_REQUEST_ACTIONS as ACTIONS,
  TRACE_REQUEST_ACTIONS_BY_STATUS as ACTIONS_BY_STATUS
} from '~/logic/modules/trace-requests/trace-requests.constants'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'

export default {
  components: {
    AppButton,
    TableActionsPopover,
    ModalConfirm
  },

  props: {
    traceRequest: { type: Object, required: true }
  },

  data() {
    return {
      primaryActionExecuting: false
    }
  },

  computed: {
    availableSecondaryActions() {
      return [
        {
          name: ACTIONS.DOWNLOAD_CSV,
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.actionTitles[ACTIONS.DOWNLOAD_CSV],
          icon: 'SVGIcon24Download2',
          callback: traceRequest => {
            this.$router.push(`/logs/trace/${traceRequest.id}/export`)
          }
        },
        {
          name: ACTIONS.COPY,
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.actionTitles[ACTIONS.COPY],
          icon: 'SVGIcon24Copy',
          callback() {
            // eslint-disable-next-line no-console
            console.log('not implemented')
          }
        },
        {
          name: ACTIONS.ARCHIVE,
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.actionTitles[ACTIONS.ARCHIVE],
          icon: 'SVGIcon24Archive',
          callback: async request => {
            const {
              updatedRequest
            } = await TraceRequestsService.archiveRequest(request.id)
            this.$emit('update-request', updatedRequest)
          }
        },
        {
          name: ACTIONS.DELETE,
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.actionTitles[ACTIONS.DELETE],
          icon: 'SVGIcon24Delete',
          callback: async request => {
            const confirmed = await this.$refs.deleteConfirmationModal.open()
            if (confirmed) {
              await TraceRequestsService.deleteRequest(request.id)
              this.$emit('delete-request', request.id)
            }
          }
        }
      ]
    },

    actionTitles() {
      return {
        [ACTIONS.DOWNLOAD_CSV]: this.$t('download-csv-0'),
        [ACTIONS.OPEN]: this.$t('open-trace-log'),
        [ACTIONS.COPY]: this.$t('copy-trace-log'),
        [ACTIONS.CANCEL]: this.$t('cancel-request'),
        [ACTIONS.ARCHIVE]: this.$t('archive-trace-log'),
        [ACTIONS.UNARCHIVE]: this.$t('unarchive-trace-log'),
        [ACTIONS.DELETE]: this.$t('delete-trace-log'),
        [ACTIONS.RETURN]: this.$t('return-request')
      }
    },

    primaryActionButtonTitle() {
      return this.actionTitles[
        ACTIONS_BY_STATUS[this.traceRequest.status].primary
      ]
    },

    hrefIfActionIsLink() {
      return ACTIONS_BY_STATUS[this.traceRequest.status].primary ===
        ACTIONS.OPEN
        ? `/logs/trace/${this.traceRequest.id}`
        : undefined
    },

    secondaryActions() {
      return this.availableSecondaryActions.filter(action =>
        ACTIONS_BY_STATUS[this.traceRequest.status]?.secondary.includes(
          action.name
        )
      )
    }
  },

  methods: {
    async executePrimaryAction() {
      this.primaryActionExecuting = true
      const {
        updatedRequest
      } = await TraceRequestsService.callPrimaryActionByRequestStatus(
        this.traceRequest.id,
        this.traceRequest.status
      )
      this.$emit('update-request', updatedRequest)
      this.primaryActionExecuting = false
    }
  }
}
</script>
