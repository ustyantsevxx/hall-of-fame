<template>
  <div>
    <PageHeader>
      <template #title>
        <slot name="title">Акции и новости</slot>
      </template>
      <template #subtitle>
        <slot name="subtitle">
          Следите за акциями и новостями, участвуйте в наших акциях.
        </slot>
      </template>
    </PageHeader>

    <section
      class="grid grid-cols-3 gap-30 pb-78 mt-92"
      :class="{
        'border-b border-gray-100': pageCount > 1
      }"
    >
      <template v-if="articles.length > 0">
        <ArticleCard
          v-for="(article, i) in articles"
          :key="i"
          :article="article"
          :link="`${path}/${article.id}`"
        />
      </template>

      <p v-else class="text-subtitle text-gray">Список новостей пуст</p>
    </section>

    <section class="flex justify-center my-30">
      <Pagination
        v-if="pageCount > 1"
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

import ArticleCard from '~/components/ArticleCard.vue'
import PageHeader from '~/components/PageHeader.vue'
import Pagination from '~/components/Pagination.vue'
import { ShortArticle } from '~/logic/modules/articles'
import { MetaPagination } from '~/logic/types/api-meta'

@Component({
  components: { Pagination, ArticleCard, PageHeader }
})
export default class ArticleList extends Vue {
  @Prop({ type: Array, default: () => [] }) articles!: ShortArticle[]
  @Prop({ type: Object, default: null }) meta!: MetaPagination | null
  @Prop({ type: Number, required: true }) page!: number
  @Prop({ type: String, required: true }) path!: string

  get pageCount() {
    return this.meta?.last_page ?? 0
  }

  handlePageChange(page) {
    this.$emit('page-change', page)
  }
}
</script>
