<template>
  <article
    class="flex overflow-hidden flex-col rounded-20 border border-gray-100"
    style="height: 520px"
  >
    <Link headless tabindex="-1" :to="link">
      <img
        class="object-cover w-full rounded-20 hover:filter hover:brightness-97 transition duration-150 ease-in-out"
        style="height: 250px"
        :src="article.image && article.image.url"
        :alt="article.title"
      />
    </Link>

    <div class="flex flex-col flex-grow px-20 pt-28 pb-24">
      <Link
        :to="link"
        class="w-auto text-subtitle line-clamp-3"
        :title="article.title"
      >
        {{ article.title }}
      </Link>

      <p class="mt-8 line-clamp-3" v-html="article.content_small"></p>

      <time class="flex flex-grow items-end text-date text-gray uppercase">
        {{ startDateFormatted }}
      </time>
    </div>
  </article>
</template>

<script lang="ts">
import 'dayjs/locale/ru'

import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Link from '~/components/Link.vue'
import { ShortArticle } from '~/logic/modules/articles'
import { xDayjs } from '~/logic/utils/datetime'

@Component({
  components: { Link }
})
export default class ArticleCard extends Vue {
  @Prop({ type: Object, required: true }) article!: ShortArticle
  @Prop({ type: String, required: true }) link!: string

  get startDateFormatted() {
    return this.article.start_at
      ? xDayjs.unix(this.article.start_at).format('DD MMMM YYYY')
      : ''
  }
}
</script>
