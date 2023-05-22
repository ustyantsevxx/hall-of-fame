<template>
  <section class="mt-70">
    <p class="text-h2">Акции и новости</p>

    <div class="grid grid-cols-2 gap-30 mt-32">
      <ArticleCard
        v-for="(article, i) in articles"
        :key="i"
        :article="article"
        :link="`/articles/${article.id}`"
      />
    </div>

    <Link
      to="/articles"
      button
      class="flex justify-center items-center mt-40 space-x-11 w-full"
    >
      <span>Все акции и новости</span>
      <SlimArrowRightSVG />
    </Link>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import SlimArrowRightSVG from '~/assets/svg/index/slim-arrow-right.svg'
import ArticleCard from '~/components/ArticleCard.vue'
import Link from '~/components/Link.vue'
import { ShortArticle } from '~/logic/modules/articles'

@Component({
  components: {
    Link,
    SlimArrowRightSVG,
    ArticleCard
  }
})
export default class IndexPageArticles extends Vue {
  @Prop({ type: Array, required: true }) articles!: ShortArticle[]
}
</script>
