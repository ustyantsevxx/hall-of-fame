<template>
  <div class="flex flex-col justify-between h-screen">
    <LayoutHeaderWithMenu
      v-if="userLoggedIn && userRole === USER_ROLES.LEGAL"
      class="mb-80"
    />
    <LayoutHeader v-else class="mb-80" />

    <Nuxt class="flex-grow flex-shrink-0" />
    <DefaultLayoutFooter
      class="flex-shrink-0 pt-24 pb-55 mt-100 border-t border-gray-100"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import DefaultLayoutFooter from '~/components/LayoutFooter.vue'
import LayoutHeader from '~/components/LayoutHeader.vue'
import LayoutHeaderWithMenu from '~/components/LayoutHeaderWithMenu.vue'
import { USER_ROLES } from '~/logic/modules/users'

@Component({
  components: {
    LayoutHeaderWithMenu,
    LayoutHeader,
    DefaultLayoutFooter
  }
})
export default class DefaultLayout extends Vue {
  USER_ROLES = USER_ROLES

  get userRole() {
    return this.$accessor?.auth.user?.role?.id
  }

  get userLoggedIn() {
    return this.$accessor.auth.loggedIn
  }
}
</script>
