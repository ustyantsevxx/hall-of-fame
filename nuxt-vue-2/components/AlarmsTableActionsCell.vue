<template>
  <div class="mr-18 flex items-center justify-end space-x-8">
    <AppButton size="sm" :to="alarmLink" class="mx-8">
      {{ $t('open-log-0') }}
    </AppButton>

    <TableActionsPopover :actions="actions" :callback-data="alarm" />

    <ModalConfirm
      ref="closeConfirmationModal"
      class="text-white"
      :title="$t('confirm-closing')"
      :subtitle="$t('are-you-sure-you-want-to-close-this-alarm')"
      :confirm-text="$t('close-alarm')"
    />

    <ModalConfirm
      ref="archiveConfirmationModal"
      class="text-white"
      :title="$t('confirm-archiving')"
      :subtitle="$t('are-you-sure-you-want-to-archive-this-alarm')"
      :confirm-text="$t('archive-alarm')"
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
  ALARM_ACTIONS,
  ALARM_ACTIONS_BY_STATUS
} from '~/logic/modules/alarms/alarms.constants'
import { AlarmsService } from '~/logic/modules/alarms/alarms.service'

export default {
  components: {
    AppButton,
    TableActionsPopover,
    ModalConfirm
  },

  props: {
    alarm: { type: Object, required: true }
  },

  computed: {
    alarmLink() {
      return {
        path: `/logs/alarm/${this.alarm.id}`
      }
    },

    availableSecondaryActions() {
      return [
        {
          name: ALARM_ACTIONS.DOWNLOAD_CSV,
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.actionTitles[ALARM_ACTIONS.DOWNLOAD_CSV],
          icon: 'SVGIcon24Download2',
          callback: alarm => {
            this.$router.push(`/logs/alarm/${alarm.id}/export`)
          }
        },

        {
          name: ALARM_ACTIONS.ARCHIVE,
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.actionTitles[ALARM_ACTIONS.ARCHIVE],
          icon: 'SVGIcon24Archive',
          callback: async alarm => {
            const sure = await this.$refs.archiveConfirmationModal.open()
            if (!sure) {
              return
            }

            const { updatedAlarm } = await AlarmsService.archiveAlarm(alarm.id)
            this.$emit('update', updatedAlarm)
          }
        },
        {
          name: ALARM_ACTIONS.CLOSE,
          type: TABLE_ACTION_TYPES.BUTTON,
          text: this.actionTitles[ALARM_ACTIONS.CLOSE],
          icon: 'SVGIcon24Close',
          callback: async alarm => {
            const sure = await this.$refs.closeConfirmationModal.open()
            if (!sure) {
              return
            }
            const { updatedAlarm } = await AlarmsService.closeAlarm(alarm.id)
            this.$emit('update', updatedAlarm)
          }
        }
      ]
    },

    actionTitles() {
      return {
        [ALARM_ACTIONS.DOWNLOAD_CSV]: this.$t('download-csv'),
        [ALARM_ACTIONS.CLOSE]: this.$t('close'),
        [ALARM_ACTIONS.ARCHIVE]: this.$t('archive')
      }
    },

    actions() {
      return this.availableSecondaryActions.filter(action =>
        ALARM_ACTIONS_BY_STATUS[this.alarm.status]?.secondary.includes(
          action.name
        )
      )
    }
  }
}
</script>
