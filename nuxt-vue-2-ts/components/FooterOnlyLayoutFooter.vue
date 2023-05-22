<template>
  <footer class="footer">
    <div class="container grid grid-cols-3 text-description">
      <div>
        <Link :href="MAIN_WEBSITE_LINK">Перейти на основной сайт</Link>
      </div>

      <div class="flex justify-center">
        <p class="block text-gray">
          &copy; ООО «XXX», 2012—{{ currentYear }}
        </p>
      </div>

      <div class="flex justify-end">
        <Link :href="PRIVACY_POLICY_LINK">Политика конфиденциальности</Link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import Link from '~/components/Link.vue'
import { MAIN_WEBSITE_LINK, PRIVACY_POLICY_LINK } from '~/logic/constants'

@Component({
  components: {
    Link
  }
})
export default class FooterOnlyLayoutFooter extends Vue {
  MAIN_WEBSITE_LINK = MAIN_WEBSITE_LINK
  PRIVACY_POLICY_LINK = PRIVACY_POLICY_LINK

  get currentYear() {
    return new Date().getFullYear()
  }
}
</script>
