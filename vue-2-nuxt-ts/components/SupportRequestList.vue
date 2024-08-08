<template>
  <div>
    <PageHeader>
      <template #title>xx xx</template>

      <template #subtitle-raw>
        <p class="text-subtitle text-gray">
          {{ subtitleText }}
        </p>
      </template>
    </PageHeader>

    <Link :to="createNewPath" gradient class="mt-32">
      xx xx xx
    </Link>

    <section class="grid grid-cols-3 gap-30 mt-60">
      <Link
        v-for="request in requests"
        :key="request.id"
        headless
        :to="`${requestListPath}/${request.id}`"
      >
        <slot name="request-card" :request="request">
          <SupportRequestCard :request="request" class="-mr-8" />
        </slot>
      </Link>
    </section>

    <section v-if="pageCount > 1" class="flex justify-center my-30">
      <Pagination
        :value="page"
        :page-count="pageCount"
        use-query
        @input="handlePageChange"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import Link from '~/components/Link.vue'
import PageHeader from '~/components/PageHeader.vue'
import Pagination from '~/components/Pagination.vue'
import SupportRequestCard from '~/components/SupportRequestCard.vue'
import { ShortRequest } from '~/logic/modules/technical-support'
import { MetaPagination } from '~/logic/types/api-meta'

@Component({
  components: {
    Pagination,
    SupportRequestCard,
    Link,
    PageHeader,
    Button
  }
})
export default class SupportRequestList extends Vue {
  @Prop({ type: Array, default: () => [] }) requests!: ShortRequest[]
  @Prop({ type: Object, default: () => null }) meta!: MetaPagination | null
  @Prop({ type: Number, default: 1 }) page!: number
  @Prop({ type: String, required: true }) requestListPath!: string
  @Prop({ type: String, required: true }) createNewPath!: string

  get pageCount() {
    return this.meta?.last_page ?? 0
  }

  get subtitleText() {
    return this.requests.length > 0
      ? 'xx xx xx xx xx xx'
      : 'xx xx xx xx xx xx xx xx xx'
  }

  handlePageChange(page) {
    this.$emit('page-change', page)
  }
}
</script>
