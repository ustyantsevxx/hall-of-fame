<template>
  <main class="container">
    <SupportRequestList
      :requests="requests"
      :meta="metaAsObjectOrUndefined"
      :page="page"
      request-list-path="/support"
      create-new-path="/support/new"
      @page-change="handlePageChange"
    >
      <template #request-card="{ request }">
        <SupportRequestCard :request="request" class="-mr-8">
          <template #info="{ dateFormatted }">
            <div class="flex justify-between items-end mb-7">
              <p class="text-subtitle">№{{ request.id }}</p>
              <SupportRequestStatusBadge :status-id="request.status.id" />
            </div>

            <time class="mb-10 text-description text-gray">
              {{ dateFormatted }}
            </time>
            <p class="mb-35 text-description">
              <template v-if="request.topic">
                {{ request.topic.name }}
              </template>
              <template v-else>Тема не указана</template>
            </p>
          </template>
        </SupportRequestCard>
      </template>
    </SupportRequestList>
  </main>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import SupportRequestCard from '~/components/SupportRequestCard.vue'
import SupportRequestList from '~/components/SupportRequestList.vue'
import SupportRequestStatusBadge from '~/components/SupportRequestStatusBadge.vue'
import {
  ShortRequest,
  TechnicalSupportModule
} from '~/logic/modules/technical-support'
import { MetaPagination } from '~/logic/types/api-meta'

@Component({
  components: {
    SupportRequestStatusBadge,
    SupportRequestCard,
    SupportRequestList
  },

  head() {
    return {
      title: 'Служба поддержки'
    }
  },

  layout: 'legal',

  watchQuery: ['p']
})
export default class LegalSupportIndexPage extends Vue {
  requests: ShortRequest[] = []
  meta: MetaPagination | null = null
  page = 1

  get metaAsObjectOrUndefined() {
    return this.meta as object | undefined
  }

  async asyncData({ route: { query } }: Context) {
    const page = query.p ? +query.p : 1
    const requests = await TechnicalSupportModule.getMyRequests({ page })

    return {
      requests: requests?.data,
      meta: requests?.meta,
      page
    }
  }

  handlePageChange(page) {
    this.page = page
  }
}
</script>
