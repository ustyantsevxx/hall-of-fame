<template>
  <DefaultLayout wrapper-class="overflow-hidden">
    <div
      :key="onSomeLogsTablePageNow || $route.path"
      class="flex max-h-full grow flex-col overflow-hidden"
    >
      <LayoutSection
        v-if="onSomeLogsTablePageNow"
        class="mb-12 flex w-full items-start justify-center"
      >
        <LinksNavigation link-class="pt-21 pb-16" :links="links" />
      </LayoutSection>

      <NuxtChild />
    </div>
  </DefaultLayout>
</template>

<script>
import { isSamePath } from 'ufo'

import DefaultLayout from '~/components/DefaultLayout.vue'
import LayoutSection from '~/components/LayoutSection.vue'
import LinksNavigation from '~/components/LinksNavigation.vue'

export default {
  components: {
    LinksNavigation,
    LayoutSection,
    DefaultLayout
  },

  middleware({ route, redirect }) {
    if (isSamePath(route.path, '/logs')) {
      return redirect('/logs/alarm')
    }
  },

  computed: {
    links() {
      return [
        { to: '/logs/alarm', text: this.$t('alarm-logs') },
        { to: '/logs/trace', text: this.$t('trace-logs') },
        { to: '/logs/a1', text: this.$t('continuous-logs-a1') },
        { to: '/logs/a2', text: this.$t('continuous-logs-a2') }
      ]
    },

    onSomeLogsTablePageNow() {
      return this.links.some(link => isSamePath(link.to, this.$route.path))
    }
  }
}
</script>
