<template>
  <div>
    <section class="grid grid-cols-12 gap-x-30">
      <div class="col-span-12">
        <NuxtLink
          :to="articleListPath"
          class="flex items-center mt-22 space-x-10 w-max text-blue hover:text-red"
        >
          <SlimArrowRightSVG />
          <span>{{ goBackText }}</span>
        </NuxtLink>

        <div class="mt-26">
          <h1 class="text-h1">
            {{ article.title }}
          </h1>

          <time class="block mt-26 text-subtitle text-gray">
            {{ formattedCreateDate }}
          </time>
        </div>
      </div>
    </section>

    <section class="grid grid-cols-12 gap-x-30 mt-52">
      <div class="col-span-8">
        <figure class="block pb-26">
          <img
            width="730"
            height="440"
            class="w-full rounded-20"
            :src="article.image ? article.image.url : ''"
            :alt="article.title"
          />
        </figure>

        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="_article-content" v-html="article.content"></div>

        <div class="mt-36">
          <h2 class="mb-23 text-h2">
            Список заправок, которые участвуют в акции
          </h2>

          <ul v-if="stations && stations.length">
            <li v-for="(station, i) in stations" :key="i">
              {{ station.name }} ({{ station.address }})
            </li>
          </ul>

          <p v-else>—</p>
        </div>

        <div class="mt-36">
          <h2 class="mb-23 text-h2">Срок проведения акции</h2>
          <p>{{ formattedAvailableDates }}</p>
        </div>
      </div>

      <div class="col-span-4">
        <slot name="right-column"></slot>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import SlimArrowRightSVG from '~/assets/svg/index/slim-arrow-left.svg'
import PageHeader from '~/components/PageHeader.vue'
import { Article } from '~/logic/modules/articles'
import { Station } from '~/logic/modules/stations'
import { xDayjs } from '~/logic/utils/datetime'

@Component({
  components: {
    PageHeader,
    SlimArrowRightSVG
  }
})
export default class ArticleView extends Vue {
  @Prop({ type: Object, required: true }) article!: Article
  @Prop({ type: Array, required: true }) stations!: Station[]
  @Prop({ type: String, required: true }) articleListPath!: string
  @Prop({ type: String, default: 'Новости' }) goBackText!: string

  get formattedCreateDate() {
    return this.article?.start_at
      ? xDayjs.unix(this.article?.start_at).format('DD MMMM YYYY, HH:mm')
      : '—'
  }

  get formattedAvailableDates() {
    if (!this.article?.start_at || !this.article?.end_at) {
      return
    }

    const start = xDayjs.unix(this.article?.start_at)
    const end = xDayjs.unix(this.article?.end_at)

    const startAndEndInSameYear = start.year() === end.year()

    const format = startAndEndInSameYear ? 'D MMMM' : 'D MMMM YYYY'

    return `С ${start.format(format)} по ${end.format(format)} ${
      startAndEndInSameYear ? start.year() : ''
    }`
  }
}
</script>

<style>
/* items */

._article-content h2 {
  @apply text-h2 my-24;
}

._article-content p {
  @apply py-12;
}

._article-content a {
  @apply text-blue border-b hover:text-red;
}

._article-content blockquote {
  @apply my-46 pt-28 pb-42 px-40 text-subtitle text-blue border rounded-20;
}

/* lists */

._article-content li {
  @apply my-24;
}

._article-content ul {
  @apply list-inside pl-30;
}

._article-content ul li {
  @apply relative;
}

._article-content ul li::before {
  @apply absolute top-1/2 -translate-y-1/2 mt-1 -left-30 w-10 h-10 border border-blue rounded-full;
  content: '';
}

._article-content ol {
  @apply list-decimal pl-20;
}
</style>
