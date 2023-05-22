<template>
  <main class="container">
    <ArticleList
      :articles="articles"
      :meta="meta"
      :page="page"
      path="/articles"
      @page-change="handlePageChange"
    >
      <template #title>Новости</template>
    </ArticleList>
  </main>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import ArticleCard from '~/components/ArticleCard.vue'
import ArticleList from '~/components/ArticleList.vue'
import PageHeader from '~/components/PageHeader.vue'
import Pagination from '~/components/Pagination.vue'
import { ArticlesModule, ShortArticle } from '~/logic/modules/articles'
import { MetaPagination } from '~/logic/types/api-meta'

@Component({
  components: { ArticleList, Pagination, ArticleCard, PageHeader },

  head: {
    title: 'Новости'
  },
  layout: 'legal',

  watchQuery: ['p']
})
export default class LegalArticlesPage extends Vue {
  articles: ShortArticle[] = []
  meta: MetaPagination | null = null
  page = 1

  async asyncData({ route: { query } }: Context) {
    const page = query.p ? +query.p : 1
    const articles = await ArticlesModule.getArticles({ page })

    return {
      articles: articles?.data,
      meta: articles?.meta,
      page
    }
  }

  handlePageChange(page) {
    this.page = page
  }
}
</script>
