<template>
  <article
    class="flex flex-col px-30 pt-20 hover:bg-gray-10 rounded-20 border border-gray-100 divide-y divide-gray-100 transition active:!bg-gray-20"
    style="min-height: 320px"
  >
    <div>
      <slot name="info" :dateFormatted="dateFormatted">
        <div class="flex justify-between items-end mb-7">
          <p class="text-subtitle">№{{ request.id }}</p>
          <SupportRequestStatusBadge :status-id="request.status.id" />
        </div>

        <time class="mb-10 text-description text-gray">
          {{ dateFormatted }}
        </time>
        <address class="mb-35 text-description">
          <template v-if="request.station">
            {{ request.station.name }} ({{ request.station.address }})
          </template>
          <template v-else>xx xx xx xx</template>
        </address>
      </slot>
    </div>

    <div class="pt-24">
      <div class="flex items-center mb-5 space-x-5 text-description">
        <p class="text-blue">{{ lastMessageSender }}</p>
        <div
          v-if="request.unread_message_count > 0"
          class="py-2 px-6 text-white bg-blue rounded-18"
        >
          +{{ request.unread_message_count }}
        </div>
      </div>

      <p class="line-clamp-3">
        <span v-if="request.last_message_text">
          {{ request.last_message_text }}
        </span>
        <span v-else class="text-gray">xx xx</span>
      </p>
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Link from '~/components/Link.vue'
import SupportRequestStatusBadge from '~/components/SupportRequestStatusBadge.vue'
import {
  ShortRequest,
  TechnicalSupportModule
} from '~/logic/modules/technical-support'
import { fullDateFromUnix } from '~/logic/utils/datetime'

@Component({
  components: {
    Link,
    SupportRequestStatusBadge
  }
})
export default class SupportRequestCard extends Vue {
  @Prop({ type: Object, required: true }) request!: ShortRequest

  get lastMessageSender() {
    return TechnicalSupportModule.getLastMessageSender(this.request)
  }

  get dateFormatted() {
    return this.request.created_at
      ? fullDateFromUnix(this.request.created_at)
      : ''
  }
}
</script>
