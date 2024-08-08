<template>
  <main class="container">
    <SupportRequestList
      :requests="requests"
      :meta="meta"
      :page="page"
      request-list-path="/support"
      create-new-path="/support/new"
      @page-change="handlePageChange"
    />
  </main>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import SupportRequestList from '~/components/SupportRequestList.vue'
import {
  ShortRequest,
  TechnicalSupportModule
} from '~/logic/modules/technical-support'
import { MetaPagination } from '~/logic/types/api-meta'

@Component({
  components: {
    SupportRequestList
  },

  head() {
    return {
      title: 'xx xx'
    }
  },

  watchQuery: ['p']
})
export default class extends Vue {
  requests: ShortRequest[] = []
  meta: MetaPagination | null = null
  page = 1

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
