<template>
  <section
    class="flex flex-col items-center py-30 px-20 rounded-20 border border-gray-100"
  >
    <figure class="w-full border-b border-gray-100">
      <PromoPhoneSVG class="mx-auto" />
    </figure>

    <p class="mt-23 text-subtitle text-center">xx xx xx</p>

    <p class="mt-20 mb-23 text-center text-gray">
      xx xx xx xx xx, xx xx xx xx xx xx
    </p>

    <div class="mb-30 space-y-20">
      <Link
        headless
        :href="APP_LINKS.APP_STORE"
        class="block"
        title="xx xx App Store"
      >
        <AppStoreDownloadSVG />
      </Link>

      <Link
        headless
        :href="APP_LINKS.GOOGLE_PLAY"
        target="_blank"
        class="block"
        title="xx xx Google Play"
      >
        <GooglePlayDownloadSVG />
      </Link>

      <figure>
        <img
          width="180"
          height="180"
          src="~/assets/images/index-qr.png"
          alt="xx XXX"
        />
      </figure>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import AppStoreDownloadSVG from '~/assets/svg/app-store-download.svg'
import GooglePlayDownloadSVG from '~/assets/svg/google-play-download.svg'
import PromoPhoneSVG from '~/assets/svg/index/promo-phone.svg'
import Link from '~/components/Link.vue'
import { APP_LINKS } from '~/logic/constants'

@Component({
  components: {
    Link,
    GooglePlayDownloadSVG,
    AppStoreDownloadSVG,
    PromoPhoneSVG
  }
})
export default class AppsPromoBlock extends Vue {
  APP_LINKS = APP_LINKS
}
</script>
