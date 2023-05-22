<template>
  <div class="py-8 px-12 text-description rounded-18" :class="statusClasses">
    <slot :statusName="statusName">
      {{ statusName }}
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import {
  REQUEST_STATUS_NAMES,
  REQUEST_STATUSES
} from '~/logic/modules/technical-support'

const classesByStatus = {
  [REQUEST_STATUSES.NEW]: 'bg-green text-white',
  [REQUEST_STATUSES.ACTIVE]: 'bg-gradient text-white',
  [REQUEST_STATUSES.CLOSE]: 'bg-white text-blue border border-blue'
}

@Component
export default class SupportRequestStatusBadge extends Vue {
  @Prop({ type: Number, required: true }) statusId!: number

  get statusClasses() {
    return classesByStatus[this.statusId]
  }

  get statusName() {
    return REQUEST_STATUS_NAMES[this.statusId]
  }
}
</script>
