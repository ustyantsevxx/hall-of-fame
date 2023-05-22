<template>
  <main v-if="article" class="container pb-30">
    <ArticleView
      :article="article"
      :stations="stations"
      go-back-text="Акции и новости"
      article-list-path="/articles"
    >
      <template #right-column>
        <AppsPromoBlock />
      </template>
    </ArticleView>
  </main>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue } from 'nuxt-property-decorator'

import AppsPromoBlock from '~/components/AppsPromoBlock.vue'
import ArticleView from '~/components/ArticleView.vue'
import { Article, ArticlesModule } from '~/logic/modules/articles'
import { Station, StationsModule } from '~/logic/modules/stations'

@Component({
  components: {
    ArticleView,
    AppsPromoBlock
  }
})
export default class extends Vue {
  article!: Article
  stations!: Station[]

  head() {
    return {
      title: this.article?.title ?? undefined
    }
  }

  async asyncData(context: Context) {
    const articleId = +context.route.params.id

    if (Number.isNaN(articleId)) {
      return context.redirect('/articles')
    }

    const [article, stations] = await Promise.all([
      ArticlesModule.getById(articleId),
      StationsModule.getStations({ articleId })
    ])

    return {
      article,
      stations
    }
  }
}
</script>
