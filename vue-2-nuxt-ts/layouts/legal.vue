<template>
  <div class="flex flex-col justify-between h-screen">
    <LayoutHeaderWithMenu class="mb-40" />

    <div v-if="activeAnnouncement" class="container mb-45">
      <CardAlert class="whitespace-pre-line">
        <template #icon>
          <NotificationCircledSVG class="text-white" />
        </template>

        <template #content>{{ activeAnnouncement }}</template>
      </CardAlert>
    </div>

    <Nuxt class="flex-grow flex-shrink-0" />

    <LayoutFooter
      class="flex-shrink-0 pt-24 pb-55 mt-100 border-t border-gray-100"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import NotificationCircledSVG from '~/assets/svg/notification-circled.svg'
import CardAlert from '~/components/CardAlert.vue'
import LayoutFooter from '~/components/LayoutFooter.vue'
import LayoutHeaderWithMenu from '~/components/LayoutHeaderWithMenu.vue'

@Component({
  components: {
    CardAlert,
    LayoutHeaderWithMenu,
    LayoutFooter,
    NotificationCircledSVG
  }
})
export default class LegalLayout extends Vue {
  get activeAnnouncement() {
    return this.$accessor.activeAnnouncement
  }
}
</script>
