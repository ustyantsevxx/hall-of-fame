<template>
  <footer class="footer">
    <div class="container grid grid-cols-12 gap-x-30 text-description">
      <div class="col-span-4">
        <p class="inline-block text-gray">
          &copy; xx «XXX», 2012—{{ currentYear }}
        </p>
        <Link :href="PRIVACY_POLICY_LINK" class="inline-block mt-10">
          xx xx
        </Link>
      </div>

      <div class="flex col-span-5 col-start-5 items-start">
        <Link :href="MAIN_WEBSITE_LINK">xx xx xx xx</Link>
      </div>

      <div class="flex col-span-3 justify-end items-start">
        <span class="mr-20 text-gray">xx xx:</span>
        <div class="flex items-center space-x-24">
          <Link :href="SOCIAL_LINKS.OK" title="xx xx xx">
            <OkSVG />
          </Link>
          <Link :href="SOCIAL_LINKS.VK" title="xx xx xx">
            <VkSVG />
          </Link>
          <Link :href="SOCIAL_LINKS.INSTAGRAM" title="xx xx xx">
            <InstagramSVG />
          </Link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import InstagramSVG from '~/assets/svg/footer/instagram.svg'
import OkSVG from '~/assets/svg/footer/ok.svg'
import VkSVG from '~/assets/svg/footer/vk.svg'
import Link from '~/components/Link.vue'
import {
  MAIN_WEBSITE_LINK,
  PRIVACY_POLICY_LINK,
  SOCIAL_LINKS
} from '~/logic/constants'

@Component({
  components: {
    Link,
    InstagramSVG,
    OkSVG,
    VkSVG
  }
})
export default class LayoutFooter extends Vue {
  MAIN_WEBSITE_LINK = MAIN_WEBSITE_LINK
  SOCIAL_LINKS = SOCIAL_LINKS
  PRIVACY_POLICY_LINK = PRIVACY_POLICY_LINK

  get currentYear() {
    return new Date().getFullYear()
  }
}
</script>
