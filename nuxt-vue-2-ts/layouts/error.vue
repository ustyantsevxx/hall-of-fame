<template>
  <main class="container">
    <PageHeader>
      <template #title>{{ title }}</template>
    </PageHeader>

    <Link href="/" self>Перейти на главную</Link>
  </main>
</template>

<script lang="ts">
import { NuxtError } from '@nuxt/types'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import Button from '~/components/Button.vue'
import Link from '~/components/Link.vue'
import PageHeader from '~/components/PageHeader.vue'

@Component({
  components: {
    Link,
    Button,
    PageHeader
  }
})
export default class Error404 extends Vue {
  @Prop({ type: Object, required: true }) error!: NuxtError

  get title() {
    return this.error.statusCode === 404
      ? 'Страница не найдена'
      : 'Произошла ошибка'
  }

  head() {
    return {
      title: this.title
    }
  }
}
</script>
