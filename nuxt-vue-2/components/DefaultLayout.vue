<template>
  <div
    class="relative mx-auto flex h-full max-w-[1440px] flex-col sm:overscroll-contain sm:p-12"
    :class="roleData.class"
  >
    <DefaultLayoutHeader
      :hide-mobile-navigation="hideMobileNavigation"
      :links="roleData.links"
      class="mb-16 sm:mb-12"
    />

    <main class="flex grow flex-col" :class="wrapperClass">
      <slot></slot>
    </main>

    <BadgeLoaderConnection
      v-if="$nuxt.isOffline"
      class="absolute left-1/2 -translate-x-1/2"
      style="top: 350px; z-index: 1337"
    />
  </div>
</template>

<script>
import BadgeLoaderConnection from '~/components/BadgeLoaderConnection.vue'
import DefaultLayoutHeader from '~/components/DefaultLayoutHeader.vue'
import { CURRENT_ROLE, ROLES } from '~/logic/core/runtime'

export default {
  components: {
    DefaultLayoutHeader,
    BadgeLoaderConnection
  },

  props: {
    wrapperClass: { type: null, default: undefined },
    hideMobileNavigation: { type: Boolean, default: false }
  },

  computed: {
    dataByRole() {
      return {
        [ROLES.CUSTOMER]: {
          links: [
            {
              to: '/',
              text: this.$t('dashboard-1'),
              exact: !this.$route.path.startsWith('/batteries')
            },
            {
              to: '/support',
              text: this.$t('support-contacts-0')
            }
          ]
        },

        [ROLES.ENGINEER]: {
          class: 'container',
          links: [
            {
              to: '/',
              text: this.$t('dashboard-0'),
              exact: true
            },
            {
              to: '/customers',
              text: this.$t('customers')
            },
            {
              to: '/logs',
              text: this.$t('logs'),
              exact: false,
              slot: 'logsLink'
            }
          ]
        }
      }
    },

    roleData() {
      return this.dataByRole[CURRENT_ROLE]
    }
  }
}
</script>
